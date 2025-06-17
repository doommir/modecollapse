#!/usr/bin/env ts-node

import { BulkToolImporter } from '../lib/bulk-import';
// import { getAllTools } from '../lib/tools'; // Avoiding airtable dependency for now

// CLI colors for better output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function colorize(text: string, color: keyof typeof colors): string {
  return `${colors[color]}${text}${colors.reset}`;
}

function createProgressBar(current: number, total: number, width: number = 40): string {
  const percentage = Math.floor((current / total) * 100);
  const filled = Math.floor((current / total) * width);
  const empty = width - filled;
  
  const bar = '█'.repeat(filled) + '░'.repeat(empty);
  return `[${bar}] ${percentage}% (${current}/${total})`;
}

async function main() {
  console.log(colorize('\n🚀 Mode Collapse - Bulk Tool Import', 'cyan'));
  console.log(colorize('=====================================', 'cyan'));
  
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const verbose = args.includes('--verbose');
  const batchSize = parseInt(args.find(arg => arg.startsWith('--batch-size='))?.split('=')[1] || '10');
  
  if (dryRun) {
    console.log(colorize('🔍 Running in DRY RUN mode - no files will be saved', 'yellow'));
  }
  
  console.log(colorize(`⚙️ Configuration:`, 'blue'));
  console.log(`   Batch size: ${batchSize}`);
  console.log(`   Dry run: ${dryRun}`);
  console.log(`   Verbose: ${verbose}`);
  console.log('');

  let lastProgressUpdate = 0;

  try {
    const results = await BulkToolImporter.importFromFutureTools({
      batchSize,
      delayBetweenBatches: 50,
      dryRun,
      onProgress: (progress) => {
        // Update progress every 5% or every 10 files
        const progressPercent = (progress.processed / progress.total) * 100;
        if (progressPercent - lastProgressUpdate >= 5 || progress.processed % 10 === 0) {
          process.stdout.write('\r'); // Clear line
          process.stdout.write(
            colorize('📊 Progress: ', 'blue') + 
            createProgressBar(progress.processed, progress.total) +
            colorize(` | ✅ ${progress.successful} success | ❌ ${progress.failed} failed`, 'reset')
          );
          lastProgressUpdate = progressPercent;
        }
        
        if (verbose && progress.currentFile) {
          console.log(`\n   Processing: ${progress.currentFile}`);
        }
      },
      onComplete: (results) => {
        console.log('\n'); // New line after progress bar
        console.log(colorize('✅ Import completed!', 'green'));
        console.log('');
        
        // Display summary
        console.log(colorize('📊 Import Summary:', 'magenta'));
        console.log(`   Total files processed: ${results.summary.totalFiles}`);
        console.log(`   Successfully parsed: ${colorize(results.summary.successfulParsed.toString(), 'green')}`);
        console.log(`   Failed to parse: ${colorize(results.summary.failedParsed.toString(), 'red')}`);
        console.log(`   New tools added: ${colorize(results.summary.newToolsAdded.toString(), 'cyan')}`);
        console.log('');

        // Display tool categories
        if (results.tools.length > 0) {
          const categories: Record<string, number> = {};
          const pricingModels: Record<string, number> = {};
          
          results.tools.forEach(tool => {
            const category = tool.category || 'Uncategorized';
            categories[category] = (categories[category] || 0) + 1;
            
            pricingModels[tool.pricingModel] = (pricingModels[tool.pricingModel] || 0) + 1;
          });

          console.log(colorize('📂 Categories:', 'blue'));
          Object.entries(categories)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10)
            .forEach(([category, count]) => {
              console.log(`   ${category}: ${count}`);
            });
          console.log('');

          console.log(colorize('💰 Pricing Models:', 'blue'));
          Object.entries(pricingModels)
            .sort(([,a], [,b]) => b - a)
            .forEach(([model, count]) => {
              console.log(`   ${model}: ${count}`);
            });
          console.log('');
        }

        // Display errors if any
        if (results.progress.errors.length > 0) {
          console.log(colorize('❌ Errors encountered:', 'red'));
          results.progress.errors.slice(0, 10).forEach(({ file, error }) => {
            console.log(`   ${file}: ${error}`);
          });
          if (results.progress.errors.length > 10) {
            console.log(`   ... and ${results.progress.errors.length - 10} more errors`);
          }
          console.log('');
        }

        // Display sample tools
        if (results.tools.length > 0) {
          console.log(colorize('🔍 Sample imported tools:', 'yellow'));
          results.tools.slice(0, 5).forEach(tool => {
            console.log(`   ${colorize(tool.name, 'bright')} (${tool.category || 'Uncategorized'})`);
            console.log(`     ${tool.summary}`);
            console.log(`     ${colorize(`⭐ ${tool.consciousnessScore}/5`, 'yellow')} | ${colorize(tool.pricingModel, 'cyan')} | ${colorize(`👍 ${tool.votes.upvotes}`, 'green')}`);
            console.log('');
          });
        }
      }
    });

    // Validate and enhance tools
    if (!dryRun && results.tools.length > 0) {
      console.log(colorize('🔍 Validating and enhancing tools...', 'blue'));
      const enhancedTools = await BulkToolImporter.validateAndEnhanceTools(results.tools);
      
      // Skip merging for now to avoid airtable dependency
      // console.log(colorize('🔄 Merging with existing tools...', 'blue'));
      // const existingTools = getAllTools();
      // const mergedTools = await BulkToolImporter.mergeWithExistingTools(enhancedTools, existingTools);
      
      console.log(colorize(`✅ Enhanced ${enhancedTools.length} tools`, 'green'));
    }

  } catch (error) {
    console.error(colorize('\n❌ Import failed:', 'red'), error);
    process.exit(1);
  }
}

// Handle CLI arguments and help
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(colorize('\nMode Collapse - Bulk Tool Import', 'cyan'));
  console.log(colorize('=================================', 'cyan'));
  console.log('\nUsage: npm run import-tools [options]');
  console.log('\nOptions:');
  console.log('  --dry-run              Run without saving files');
  console.log('  --verbose              Show detailed progress');
  console.log('  --batch-size=N         Process N files at once (default: 10)');
  console.log('  --help, -h             Show this help message');
  console.log('\nExamples:');
  console.log('  npm run import-tools');
  console.log('  npm run import-tools -- --dry-run --verbose');
  console.log('  npm run import-tools -- --batch-size=20');
  console.log('');
  process.exit(0);
}

// Run the import
main().catch(error => {
  console.error(colorize('💥 Fatal error:', 'red'), error);
  process.exit(1);
});