import { Tool, PricingModel, ToolCategory, VoteStats } from '@/types';

// Raw FutureTools data structure
interface FutureToolsData {
  markdown: string;
  metadata: {
    title?: string;
    description?: string;
    ogImage?: string;
    sourceURL?: string;
    [key: string]: any;
  };
}

interface ParsedToolData {
  name: string;
  description: string;
  imageUrl?: string;
  url?: string;
  tags: string[];
  upvotes?: number;
  pricing?: string;
  isMattsPick?: boolean;
  hasSpecialOffer?: boolean;
  isWarning?: boolean;
  warningMessage?: string;
  slug?: string;
}

// Tag mapping from FutureTools to Mode Collapse categories
const TAG_MAPPING: Record<string, ToolCategory> = {
  'marketing': 'Marketing',
  'productivity': 'Productivity', 
  'generative-code': 'Coding',
  'generative-art': 'Visual',
  'generative-video': 'Video',
  'voice-modulation': 'Audio',
  'speech-to-text': 'Audio',
  'text-to-speech': 'Audio',
  'research': 'Research',
  'chat': 'Chat',
  'copywriting': 'Writing',
  'translation': 'Writing',
  'avatar': 'Visual',
  'video-editing': 'Video',
  'image-improvement': 'Visual',
  'podcasting': 'Audio',
  'music': 'Audio',
  'design': 'Design',
  'automation': 'Automation',
  'analysis': 'Analysis'
};

// Pricing model normalization
const PRICING_MAPPING: Record<string, PricingModel> = {
  'free': 'Free',
  'freemium': 'Freemium', 
  'paid': 'Paid',
  'github': 'GitHub',
  'google colab': 'Google Colab',
  'open source': 'Open Source'
};

export class FutureToolsParser {
  /**
   * Parse a single FutureTools JSON file
   */
  static parseToolData(data: FutureToolsData): ParsedToolData | null {
    try {
      const markdown = data.markdown;
      const metadata = data.metadata;

      // Extract tool name from title or markdown
      const name = this.extractToolName(markdown, metadata);
      if (!name) return null;

      // Extract description
      const description = this.extractDescription(markdown, metadata);
      if (!description) return null;

      // Extract other data
      const imageUrl = this.extractImageUrl(markdown, metadata);
      const url = this.extractToolUrl(markdown);
      const tags = this.extractTags(markdown);
      const upvotes = this.extractUpvotes(markdown);
      const pricing = this.extractPricing(markdown);
      const isMattsPick = this.checkMattsPick(markdown);
      const hasSpecialOffer = this.checkSpecialOffer(markdown);
      const warningInfo = this.extractWarning(markdown);
      
      return {
        name,
        description,
        imageUrl,
        url,
        tags,
        upvotes,
        pricing,
        isMattsPick: isMattsPick,
        hasSpecialOffer,
        isWarning: warningInfo.hasWarning,
        warningMessage: warningInfo.message,
        slug: this.generateSlug(name)
      };

    } catch (error) {
      console.error('Error parsing FutureTools data:', error);
      return null;
    }
  }

  /**
   * Convert parsed data to Mode Collapse Tool format
   */
  static convertToModeTool(parsed: ParsedToolData): Partial<Tool> {
    const consciousnessScore = this.calculateConsciousnessScore(parsed);
    const category = this.mapCategory(parsed.tags);
    const pricingModel = this.mapPricing(parsed.pricing);
    
    return {
      slug: parsed.slug || this.generateSlug(parsed.name),
      name: parsed.name,
      summary: this.generateSummary(parsed.description),
      description: this.enhanceDescription(parsed.description),
      url: parsed.url || '',
      tags: this.normalizeTags(parsed.tags),
      consciousnessScore,
      curatorNote: this.generateCuratorNote(parsed, consciousnessScore),
      screenshotUrl: parsed.imageUrl,
      pricingModel,
      dateAdded: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      isCuratorPick: parsed.isMattsPick,
      isVerified: false, // Will be verified manually
      linkHealth: 'healthy' as const,
      category,
      popularity: Math.max(parsed.upvotes || 0, 1),
      trendingScore: this.calculateTrendingScore(parsed),
      reviewStatus: 'pending' as const,
      votes: {
        upvotes: parsed.upvotes || 0,
        downvotes: 0,
        userVote: null
      } as VoteStats,
      promptTips: this.generatePromptTips(parsed),
      // Warning system
      consciousnessWarning: parsed.isWarning ? {
        level: 'medium' as const,
        message: '⚠️ Use mindfully',
        reason: parsed.warningMessage || 'Tool flagged for potential misuse or quality issues'
      } : undefined,
      // Special offer
      specialOffer: parsed.hasSpecialOffer ? {
        code: 'FUTURETOOLS',
        description: 'Special offer available - check tool page for details'
      } : undefined
    };
  }

  // Private helper methods
  private static extractToolName(markdown: string, metadata: any): string | null {
    // Try to extract from title
    if (metadata.title) {
      const match = metadata.title.match(/Future Tools - (.+)/);
      if (match) return match[1].trim();
    }

    // Try to extract from markdown heading
    const headingMatch = markdown.match(/^# (.+)$/m);
    if (headingMatch) return headingMatch[1].trim();

    // Try to extract from link text
    const linkMatch = markdown.match(/\[([^\]]+)\]\(https:\/\/www\.futuretools\.io\/tools\/[^)]+\)/);
    if (linkMatch) return linkMatch[1].trim();

    return null;
  }

  private static extractDescription(markdown: string, metadata: any): string | null {
    // Try metadata description first
    if (metadata.description && metadata.description.length > 20) {
      return metadata.description;
    }

    // Extract from "Description:" section
    const descMatch = markdown.match(/### Description:\s*\n\n(.+?)(?=\n\n|\n###|\n🚩|$)/s);
    if (descMatch) return descMatch[1].trim();

    // Extract first paragraph after tool name
    const paragraphMatch = markdown.match(/^[A-Z].{50,500}$/m);
    if (paragraphMatch) return paragraphMatch[0].trim();

    return null;
  }

  private static extractImageUrl(markdown: string, metadata: any): string | undefined {
    // Try og:image first
    if (metadata.ogImage) return metadata.ogImage;

    // Extract from markdown image syntax
    const imageMatch = markdown.match(/!\[.*?\]\((https:\/\/cdn\.prod\.website-files\.com\/[^)]+)\)/);
    if (imageMatch) return imageMatch[1];

    return undefined;
  }

  private static extractToolUrl(markdown: string): string | undefined {
    // Look for futuretools.link redirect
    const linkMatch = markdown.match(/\[Visit[^)]*\]\((https:\/\/futuretools\.link\/[^)]+)\)/);
    if (linkMatch) return linkMatch[1];

    // Look for direct tool URLs
    const directMatch = markdown.match(/https:\/\/(?!futuretools\.io|cdn\.prod\.website-files\.com)[^\s)]+/);
    if (directMatch) return directMatch[0];

    return undefined;
  }

  private static extractTags(markdown: string): string[] {
    const tags: string[] = [];
    
    // Extract from Tags: section
    const tagsMatch = markdown.match(/Tags:\s*\n\n(.+?)(?=\n\n|\n\[|$)/s);
    if (tagsMatch) {
      const tagMatches = tagsMatch[1].match(/\[([^\]]+)\]/g);
      if (tagMatches) {
        tags.push(...tagMatches.map(t => t.slice(1, -1).toLowerCase()));
      }
    }

    return tags;
  }

  private static extractUpvotes(markdown: string): number | undefined {
    const voteMatch = markdown.match(/\\\\\n(\d+)\]/);
    if (voteMatch) return parseInt(voteMatch[1]);
    return undefined;
  }

  private static extractPricing(markdown: string): string | undefined {
    if (markdown.includes('**Pricing Model:**')) {
      if (markdown.includes('Free')) return 'free';
      if (markdown.includes('Freemium')) return 'freemium';
      if (markdown.includes('Paid')) return 'paid';
      if (markdown.includes('GitHub')) return 'github';
      if (markdown.includes('Google Colab')) return 'google colab';
      if (markdown.includes('Open Source')) return 'open source';
    }
    return 'paid'; // Default assumption
  }

  private static checkMattsPick(markdown: string): boolean {
    return markdown.includes("Matt's Pick") || markdown.includes("Matt's picks");
  }

  private static checkSpecialOffer(markdown: string): boolean {
    return markdown.includes('Special Offer') || markdown.includes('Use Coupon Code');
  }

  private static extractWarning(markdown: string): { hasWarning: boolean; message?: string } {
    if (markdown.includes('🚩 **WARNING:**')) {
      const warningMatch = markdown.match(/🚩 \*\*WARNING:\*\* (.+?)(?=\n\n|\n[A-Z])/s);
      return {
        hasWarning: true,
        message: warningMatch ? warningMatch[1].trim() : undefined
      };
    }
    return { hasWarning: false };
  }

  private static generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  private static calculateConsciousnessScore(parsed: ParsedToolData): number {
    let score = 3; // Base score

    // Decrease for warning flags
    if (parsed.isWarning) score -= 1;

    // Increase for Matt's picks
    if (parsed.isMattsPick) score += 1;

    // Adjust based on category
    const category = parsed.tags[0];
    if (['research', 'productivity', 'analysis'].includes(category)) score += 0.5;
    if (['marketing', 'social-media'].includes(category)) score -= 0.5;

    // Ensure score is between 1-5
    return Math.max(1, Math.min(5, Math.round(score)));
  }

  private static mapCategory(tags: string[]): ToolCategory | undefined {
    for (const tag of tags) {
      if (TAG_MAPPING[tag]) return TAG_MAPPING[tag];
    }
    return undefined;
  }

  private static mapPricing(pricing?: string): PricingModel {
    if (!pricing) return 'Paid';
    return PRICING_MAPPING[pricing.toLowerCase()] || 'Paid';
  }

  private static normalizeTags(tags: string[]): string[] {
    const normalized = tags
      .map(tag => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase())
      .filter(tag => tag.length > 2);
    
    return normalized.slice(0, 5); // Limit to 5 tags
  }

  private static generateSummary(description: string): string {
    // Extract first sentence or truncate to ~100 chars
    const sentences = description.split(/[.!?]+/);
    const firstSentence = sentences[0].trim();
    
    if (firstSentence.length <= 120) {
      return firstSentence + (firstSentence.endsWith('.') ? '' : '.');
    }
    
    return description.slice(0, 100).trim() + '...';
  }

  private static enhanceDescription(description: string): string {
    // Clean up the description
    return description
      .replace(/\*\*/g, '') // Remove markdown bold
      .replace(/\n+/g, ' ') // Replace newlines with spaces
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
  }

  private static generateCuratorNote(parsed: ParsedToolData, consciousnessScore: number): string {
    const notes = [
      'Solid AI tool for practical use.',
      'Useful for specific workflows.',
      'Good integration capabilities.',
      'Worth exploring for your toolkit.',
      'Decent option in its category.'
    ];

    if (parsed.isMattsPick) {
      return 'Matt Wolfe pick - worth the attention. Proven quality in real-world use.';
    }

    if (consciousnessScore >= 4) {
      return 'High-quality tool with good consciousness potential. Recommended for mindful use.';
    }

    if (parsed.isWarning) {
      return 'Use with caution - flagged for potential issues. Consider alternatives first.';
    }

    return notes[Math.floor(Math.random() * notes.length)];
  }

  private static calculateTrendingScore(parsed: ParsedToolData): number {
    let score = 0.5; // Base score

    // Recent tools (if we had date data)
    if (parsed.upvotes && parsed.upvotes > 10) score += 0.2;
    if (parsed.isMattsPick) score += 0.3;
    if (parsed.hasSpecialOffer) score += 0.1;

    return Math.max(0, Math.min(1, score));
  }

  private static generatePromptTips(parsed: ParsedToolData): Array<{title: string; snippet: string}> {
    const category = parsed.tags[0] || 'general';
    const toolName = parsed.name;

    // Category-specific prompt templates
    const templates: Record<string, Array<{title: string; snippet: string}>> = {
      marketing: [
        { title: 'Campaign Brief', snippet: `Create a marketing campaign for [product] targeting [audience] with ${toolName}` },
        { title: 'Copy Generation', snippet: `Generate compelling copy for [platform] that converts for [goal]` }
      ],
      productivity: [
        { title: 'Workflow Setup', snippet: `Help me set up an automated workflow for [task] using ${toolName}` },
        { title: 'Task Optimization', snippet: `Optimize my daily [workflow] to be more efficient` }
      ],
      'generative-code': [
        { title: 'Code Generation', snippet: `Generate a [function/component] that does [specific task] in [language]` },
        { title: 'Code Review', snippet: `Review this code for best practices and suggest improvements` }
      ],
      research: [
        { title: 'Research Query', snippet: `Research [topic] and provide key insights and data points` },
        { title: 'Data Analysis', snippet: `Analyze this data set and identify important patterns or trends` }
      ]
    };

    const categoryTemplates = templates[category] || [
      { title: 'General Use', snippet: `Help me use ${toolName} effectively for [your specific goal]` },
      { title: 'Best Practices', snippet: `What are the best practices for using ${toolName} in [context]?` }
    ];

    return categoryTemplates.slice(0, 3); // Limit to 3 tips
  }
}

export default FutureToolsParser;