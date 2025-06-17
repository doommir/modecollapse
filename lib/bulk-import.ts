import fs from 'fs/promises';
import path from 'path';
import { Tool } from '@/types';
import { FutureToolsParser } from './futuretools-parser';

interface ImportProgress {
  total: number;
  processed: number;
  successful: number;
  failed: number;
  errors: Array<{ file: string; error: string }>;
  currentFile?: string;
}

interface ImportOptions {
  batchSize?: number;
  delayBetweenBatches?: number;
  onProgress?: (progress: ImportProgress) => void;
  onComplete?: (results: ImportResults) => void;
  dryRun?: boolean;
}

interface ImportResults {
  tools: Tool[];
  progress: ImportProgress;
  summary: {
    totalFiles: number;
    successfulParsed: number;
    failedParsed: number;
    duplicatesSkipped: number;
    newToolsAdded: number;
  };
}

export class BulkToolImporter {
  private static readonly DATA_DIR = path.join(process.cwd(), 'data/futuretools');
  private static readonly OUTPUT_DIR = path.join(process.cwd(), 'data/imported');

  /**
   * Import all FutureTools data files and convert to Mode Collapse format
   */
  static async importFromFutureTools(options: ImportOptions = {}): Promise<ImportResults> {
    const {
      batchSize = 10,
      delayBetweenBatches = 100,
      onProgress,
      onComplete,
      dryRun = false
    } = options;

    console.log('🚀 Starting bulk import from FutureTools data...');

    // Ensure output directory exists
    if (!dryRun) {
      await fs.mkdir(this.OUTPUT_DIR, { recursive: true });
    }

    // Get all JSON files
    const files = await this.getDataFiles();
    
    const progress: ImportProgress = {
      total: files.length,
      processed: 0,
      successful: 0,
      failed: 0,
      errors: []
    };

    const importedTools: Tool[] = [];
    const existingSlugs = new Set<string>();

    console.log(`📁 Found ${files.length} files to process`);

    // Process files in batches
    for (let i = 0; i < files.length; i += batchSize) {
      const batch = files.slice(i, i + batchSize);
      
      await Promise.all(
        batch.map(async (file) => {
          try {
            progress.currentFile = file;
            onProgress?.(progress);

            const result = await this.processFile(file, existingSlugs);
            
            if (result) {
              importedTools.push(result);
              existingSlugs.add(result.slug);
              progress.successful++;
            } else {
              progress.failed++;
              progress.errors.push({
                file,
                error: 'Failed to parse tool data'
              });
            }
          } catch (error) {
            progress.failed++;
            progress.errors.push({
              file,
              error: error instanceof Error ? error.message : 'Unknown error'
            });
          } finally {
            progress.processed++;
          }
        })
      );

      // Progress callback
      onProgress?.(progress);

      // Delay between batches to avoid overwhelming the system
      if (i + batchSize < files.length && delayBetweenBatches > 0) {
        await new Promise(resolve => setTimeout(resolve, delayBetweenBatches));
      }
    }

    // Save results
    if (!dryRun) {
      await this.saveImportedTools(importedTools);
      await this.saveImportReport(progress, importedTools);
    }

    const results: ImportResults = {
      tools: importedTools,
      progress,
      summary: {
        totalFiles: files.length,
        successfulParsed: progress.successful,
        failedParsed: progress.failed,
        duplicatesSkipped: 0, // We prevent duplicates during processing
        newToolsAdded: importedTools.length
      }
    };

    console.log('✅ Import completed!');
    console.log(`📊 Results: ${results.summary.successfulParsed} successful, ${results.summary.failedParsed} failed`);

    onComplete?.(results);
    return results;
  }

  /**
   * Validate and enhance imported tools
   */
  static async validateAndEnhanceTools(tools: Tool[]): Promise<Tool[]> {
    console.log('🔍 Validating and enhancing imported tools...');

    const enhanced = await Promise.all(
      tools.map(async (tool) => {
        try {
          // Validate required fields
          const validated = this.validateTool(tool);
          
          // Enhance with AI if needed
          const enhanced = await this.enhanceToolWithAI(validated);
          
          return enhanced;
        } catch (error) {
          console.warn(`⚠️ Failed to enhance tool ${tool.name}:`, error);
          return tool; // Return original if enhancement fails
        }
      })
    );

    console.log('✅ Tool validation and enhancement completed');
    return enhanced;
  }

  /**
   * Merge imported tools with existing tools
   */
  static async mergeWithExistingTools(newTools: Tool[], existingTools: Tool[]): Promise<Tool[]> {
    const existingSlugs = new Set(existingTools.map(t => t.slug));
    const uniqueNewTools = newTools.filter(tool => !existingSlugs.has(tool.slug));
    
    console.log(`🔄 Merging ${uniqueNewTools.length} new tools with ${existingTools.length} existing tools`);
    
    return [...existingTools, ...uniqueNewTools];
  }

  // Private helper methods
  private static async getDataFiles(): Promise<string[]> {
    try {
      const files = await fs.readdir(this.DATA_DIR);
      return files.filter(file => file.endsWith('.json') && file.includes('futuretools.io'));
    } catch (error) {
      console.error('Error reading data directory:', error);
      return [];
    }
  }

  private static async processFile(filename: string, existingSlugs: Set<string>): Promise<Tool | null> {
    try {
      const filePath = path.join(this.DATA_DIR, filename);
      const content = await fs.readFile(filePath, 'utf-8');
      const data = JSON.parse(content);

      // Parse with FutureTools parser
      const parsed = FutureToolsParser.parseToolData(data);
      if (!parsed || !parsed.name) {
        return null;
      }

      // Convert to Mode Collapse format
      const tool = FutureToolsParser.convertToModeTool(parsed) as Tool;
      
      // Skip if slug already exists
      if (existingSlugs.has(tool.slug)) {
        return null;
      }

      // Validate tool has minimum required data
      if (!tool.name || !tool.description || tool.description.length < 20) {
        return null;
      }

      return tool;
    } catch (error) {
      console.warn(`Failed to process file ${filename}:`, error);
      return null;
    }
  }

  private static validateTool(tool: Tool): Tool {
    // Ensure required fields exist and are valid
    const validated = { ...tool };

    // Validate and fix name
    if (!validated.name || validated.name.length < 2) {
      throw new Error('Invalid tool name');
    }

    // Validate and fix description
    if (!validated.description || validated.description.length < 20) {
      throw new Error('Description too short');
    }

    // Validate and fix URL
    if (!validated.url || !this.isValidUrl(validated.url)) {
      console.warn(`Invalid URL for tool ${validated.name}: ${validated.url}`);
      validated.linkHealth = 'warning';
    }

    // Ensure consciousness score is valid
    if (validated.consciousnessScore < 1 || validated.consciousnessScore > 5) {
      validated.consciousnessScore = 3;
    }

    // Ensure tags exist
    if (!validated.tags || validated.tags.length === 0) {
      validated.tags = ['Tools'];
    }

    // Ensure votes exist
    if (!validated.votes) {
      validated.votes = { upvotes: 0, downvotes: 0, userVote: null };
    }

    return validated;
  }

  private static async enhanceToolWithAI(tool: Tool): Promise<Tool> {
    // This would integrate with an AI service to enhance descriptions, generate prompt tips, etc.
    // For now, we'll just ensure the tool has basic prompt tips
    
    if (!tool.promptTips || tool.promptTips.length === 0) {
      tool.promptTips = this.generateBasicPromptTips(tool);
    }

    // Enhance summary if needed
    if (!tool.summary || tool.summary === tool.description) {
      tool.summary = this.generateSummary(tool.description);
    }

    return tool;
  }

  private static generateBasicPromptTips(tool: Tool): Array<{title: string; snippet: string}> {
    const category = tool.category || tool.tags[0] || 'general';
    const toolName = tool.name;

    const tips = [
      {
        title: 'Getting Started',
        snippet: `Help me get started with ${toolName} for [your specific use case]`
      },
      {
        title: 'Best Practices',
        snippet: `What are the best practices for using ${toolName} effectively?`
      }
    ];

    // Add category-specific tip
    if (category.toLowerCase().includes('writing')) {
      tips.push({
        title: 'Content Creation',
        snippet: `Create [type of content] using ${toolName} for [target audience]`
      });
    } else if (category.toLowerCase().includes('code')) {
      tips.push({
        title: 'Code Generation',
        snippet: `Generate [type of code] that does [specific task] using ${toolName}`
      });
    } else {
      tips.push({
        title: 'Workflow Integration',
        snippet: `How can I integrate ${toolName} into my [workflow/process]?`
      });
    }

    return tips;
  }

  private static generateSummary(description: string): string {
    const sentences = description.split(/[.!?]+/);
    const firstSentence = sentences[0]?.trim();
    
    if (firstSentence && firstSentence.length <= 120) {
      return firstSentence + (firstSentence.endsWith('.') ? '' : '.');
    }
    
    return description.slice(0, 100).trim() + '...';
  }

  private static isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  private static async saveImportedTools(tools: Tool[]): Promise<void> {
    const outputPath = path.join(this.OUTPUT_DIR, 'imported-tools.json');
    await fs.writeFile(outputPath, JSON.stringify(tools, null, 2));
    console.log(`💾 Saved ${tools.length} imported tools to ${outputPath}`);
  }

  private static async saveImportReport(progress: ImportProgress, tools: Tool[]): Promise<void> {
    const report = {
      timestamp: new Date().toISOString(),
      progress,
      summary: {
        totalFiles: progress.total,
        successful: progress.successful,
        failed: progress.failed,
        toolsImported: tools.length,
        categories: this.getCategories(tools),
        pricingModels: this.getPricingModels(tools)
      },
      errors: progress.errors
    };

    const reportPath = path.join(this.OUTPUT_DIR, 'import-report.json');
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
    console.log(`📋 Saved import report to ${reportPath}`);
  }

  private static getCategories(tools: Tool[]): Record<string, number> {
    const categories: Record<string, number> = {};
    tools.forEach(tool => {
      const category = tool.category || 'Uncategorized';
      categories[category] = (categories[category] || 0) + 1;
    });
    return categories;
  }

  private static getPricingModels(tools: Tool[]): Record<string, number> {
    const pricing: Record<string, number> = {};
    tools.forEach(tool => {
      const model = tool.pricingModel;
      pricing[model] = (pricing[model] || 0) + 1;
    });
    return pricing;
  }
}

export default BulkToolImporter;