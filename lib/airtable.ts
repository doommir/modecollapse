import Airtable from 'airtable';
import { Tool, PromptTip, PricingModel, VoteStats } from '@/types';

// Initialize Airtable conditionally
let airtable: Airtable | null = null;
let base: any = null;

function initializeAirtable() {
  if (!airtable && process.env.AIRTABLE_API_KEY) {
    airtable = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY,
    });
    base = airtable.base(process.env.AIRTABLE_BASE_ID || '');
  }
  return { airtable, base };
}

function isAirtableConfigured(): boolean {
  return !!(process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID);
}

// Define the table names
const TOOLS_TABLE = 'Tools';
const PROMPT_TIPS_TABLE = 'Prompt Tips';

// Airtable field mappings
interface AirtableToolRecord {
  id: string;
  fields: {
    Name: string;
    Slug: string;
    Summary: string;
    Description: string;
    URL: string;
    Tags: string[];
    'Consciousness Score': number;
    'Curator Note': string;
    'Screenshot URL': string;
    'Pricing Model': PricingModel;
    'Date Added': string;
    'Is Curator Pick': boolean;
    'Featured': boolean;
    'Upvotes': number;
    'Downvotes': number;
    'Special Offer Code': string;
    'Special Offer Description': string;
    'Special Offer URL': string;
    'Consciousness Warning Level': 'low' | 'medium' | 'high';
    'Consciousness Warning Message': string;
    'Consciousness Warning Reason': string;
    'Status': 'Published' | 'Draft' | 'Archived';
  };
}

interface AirtablePromptTipRecord {
  id: string;
  fields: {
    Title: string;
    Snippet: string;
    'Tool Slug': string[];
  };
}

// Transform Airtable record to Tool interface
function transformAirtableToTool(record: AirtableToolRecord, promptTips: PromptTip[] = []): Tool {
  const fields = record.fields;
  
  return {
    slug: fields.Slug || fields.Name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name: fields.Name,
    summary: fields.Summary || '',
    description: fields.Description || '',
    url: fields.URL || '',
    tags: fields.Tags || [],
    consciousnessScore: fields['Consciousness Score'] || 3,
    curatorNote: fields['Curator Note'] || '',
    promptTips: promptTips,
    featured: fields.Featured || false,
    screenshotUrl: fields['Screenshot URL'] || undefined,
    pricingModel: fields['Pricing Model'] || 'Free',
    dateAdded: fields['Date Added'] || new Date().toISOString().split('T')[0],
    isCuratorPick: fields['Is Curator Pick'] || false,
    specialOffer: fields['Special Offer Code'] ? {
      code: fields['Special Offer Code'],
      description: fields['Special Offer Description'] || '',
      url: fields['Special Offer URL'] || undefined,
    } : undefined,
    consciousnessWarning: fields['Consciousness Warning Level'] ? {
      level: fields['Consciousness Warning Level'],
      message: fields['Consciousness Warning Message'] || '',
      reason: fields['Consciousness Warning Reason'] || '',
    } : undefined,
    votes: {
      upvotes: fields.Upvotes || 0,
      downvotes: fields.Downvotes || 0,
      userVote: null,
    },
  };
}

// Fetch all published tools from Airtable
export async function getToolsFromAirtable(): Promise<Tool[]> {
  if (!isAirtableConfigured()) {
    console.warn('Airtable not configured, returning empty array');
    return [];
  }

  try {
    const { base: airtableBase } = initializeAirtable();
    if (!airtableBase) {
      return [];
    }

    // Fetch tools
    const toolsResponse = await airtableBase(TOOLS_TABLE)
      .select({
        filterByFormula: "{Status} = 'Published'",
        sort: [{ field: 'Date Added', direction: 'desc' }],
      })
      .all();

    // Fetch prompt tips
    const promptTipsResponse = await airtableBase(PROMPT_TIPS_TABLE)
      .select()
      .all();

    // Group prompt tips by tool slug
    const promptTipsByTool: Record<string, PromptTip[]> = {};
    promptTipsResponse.forEach((record) => {
      const tipRecord = record as unknown as AirtablePromptTipRecord;
      const toolSlugs = tipRecord.fields['Tool Slug'] || [];
      const promptTip: PromptTip = {
        title: tipRecord.fields.Title,
        snippet: tipRecord.fields.Snippet,
      };

      toolSlugs.forEach((slug) => {
        if (!promptTipsByTool[slug]) {
          promptTipsByTool[slug] = [];
        }
        promptTipsByTool[slug].push(promptTip);
      });
    });

    // Transform tools and add prompt tips
    const tools = toolsResponse.map((record) => {
      const toolRecord = record as unknown as AirtableToolRecord;
      const slug = toolRecord.fields.Slug || toolRecord.fields.Name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const promptTips = promptTipsByTool[slug] || [];
      return transformAirtableToTool(toolRecord, promptTips);
    });

    return tools;
  } catch (error) {
    console.error('Error fetching tools from Airtable:', error);
    // Return empty array if Airtable fails
    return [];
  }
}

// Update vote count in Airtable
export async function updateToolVotes(slug: string, upvotes: number, downvotes: number): Promise<void> {
  if (!isAirtableConfigured()) {
    console.warn('Airtable not configured, skipping vote update');
    return;
  }

  try {
    const { base: airtableBase } = initializeAirtable();
    if (!airtableBase) {
      return;
    }

    // Find the tool record by slug
    const records = await airtableBase(TOOLS_TABLE)
      .select({
        filterByFormula: `{Slug} = '${slug}'`,
        maxRecords: 1,
      })
      .all();

    if (records.length > 0) {
      const recordId = records[0].id;
      await airtableBase(TOOLS_TABLE).update(recordId, {
        'Upvotes': upvotes,
        'Downvotes': downvotes,
      });
    }
  } catch (error) {
    console.error('Error updating tool votes in Airtable:', error);
  }
}

// Submit a new tool to Airtable
export async function submitToolToAirtable(toolData: {
  name: string;
  url: string;
  description: string;
  tags: string[];
  submitterEmail?: string;
}): Promise<string> {
  if (!isAirtableConfigured()) {
    console.warn('Airtable not configured, unable to submit tool');
    throw new Error('Airtable not configured');
  }

  try {
    const { base: airtableBase } = initializeAirtable();
    if (!airtableBase) {
      throw new Error('Failed to initialize Airtable');
    }

    const slug = toolData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    const record = await airtableBase(TOOLS_TABLE).create({
      'Name': toolData.name,
      'Slug': slug,
      'Summary': toolData.description.substring(0, 150) + (toolData.description.length > 150 ? '...' : ''),
      'Description': toolData.description,
      'URL': toolData.url,
      'Tags': toolData.tags,
      'Status': 'Draft', // New submissions start as drafts
      'Date Added': new Date().toISOString().split('T')[0],
      'Consciousness Score': 3, // Default score
      'Pricing Model': 'Free', // Default pricing
      'Upvotes': 0,
      'Downvotes': 0,
    });

    return record.id;
  } catch (error) {
    console.error('Error submitting tool to Airtable:', error);
    throw new Error('Failed to submit tool');
  }
}

// Get a single tool by slug
export async function getToolBySlugFromAirtable(slug: string): Promise<Tool | null> {
  if (!isAirtableConfigured()) {
    console.warn('Airtable not configured, returning null');
    return null;
  }

  try {
    const { base: airtableBase } = initializeAirtable();
    if (!airtableBase) {
      return null;
    }

    const records = await airtableBase(TOOLS_TABLE)
      .select({
        filterByFormula: `{Slug} = '${slug}'`,
        maxRecords: 1,
      })
      .all();

    if (records.length === 0) {
      return null;
    }

    // Fetch prompt tips for this tool
    const promptTipsResponse = await airtableBase(PROMPT_TIPS_TABLE)
      .select({
        filterByFormula: `FIND('${slug}', ARRAYJOIN({Tool Slug}, ',')) > 0`,
      })
      .all();

    const promptTips = promptTipsResponse.map((record) => {
      const tipRecord = record as unknown as AirtablePromptTipRecord;
      return {
        title: tipRecord.fields.Title,
        snippet: tipRecord.fields.Snippet,
      };
    });

    const toolRecord = records[0] as unknown as AirtableToolRecord;
    return transformAirtableToTool(toolRecord, promptTips);
  } catch (error) {
    console.error('Error fetching tool by slug from Airtable:', error);
    return null;
  }
}