import { Tool, PromptTip, PricingModel } from '@/types';
import { getToolsFromAirtable, getToolBySlugFromAirtable } from './airtable';

export const tools: Tool[] = [
  {
    slug: "cursor-ai",
    name: "Cursor AI",
    summary: "AI-powered code editor that thinks with you",
    description: "Cursor AI is a pair-programming tool that integrates GPT into your coding workflow. It offers real-time suggestions, custom commands, and context-aware completions that understand your entire codebase.",
    url: "https://www.cursor.so",
    tags: ["Coding", "Automation", "Pro"],
    consciousnessScore: 4,
    curatorNote: "This is a flow-state amplifier for devs. Clean interface. High agency. 4/5 stars.",
    screenshotUrl: "/screenshots/cursor-ai.png",
    pricingModel: "Freemium" as PricingModel,
    dateAdded: "2024-12-15",
    isCuratorPick: true,
    specialOffer: {
      code: "CONSCIOUSNESS25",
      description: "Get 25% off Cursor Pro for awakened developers",
      discount: "25% off",
      expiryDate: "2025-01-31"
    },
    votes: { upvotes: 47, downvotes: 3, userVote: null },
    promptTips: [
      {
        title: "Refactor Legacy Code",
        snippet: "Refactor this legacy function using best practices → [paste code]"
      },
      {
        title: "Explain This Logic",
        snippet: "Explain what this code does, line-by-line, as if I'm a junior dev."
      },
      {
        title: "Generate Tests",
        snippet: "Write comprehensive unit tests for this component with edge cases"
      }
    ]
  },
  {
    slug: "claude-ai",
    name: "Claude AI",
    summary: "Constitutional AI that reasons with nuance",
    description: "Claude is an AI assistant created by Anthropic to be helpful, harmless, and honest. It excels at complex reasoning, analysis, and creative tasks with a focus on safety and alignment.",
    url: "https://claude.ai",
    tags: ["Writing", "Analysis", "Pro"],
    consciousnessScore: 5,
    curatorNote: "Peak consciousness simulator. Thinks before it speaks. Rare combo of intelligence + humility.",
    screenshotUrl: "/screenshots/claude-ai.png",
    pricingModel: "Freemium" as PricingModel,
    dateAdded: "2024-12-10",
    isCuratorPick: true,
    votes: { upvotes: 89, downvotes: 2, userVote: null },
    promptTips: [
      {
        title: "Deep Analysis",
        snippet: "Analyze this problem from multiple angles and identify potential blind spots"
      },
      {
        title: "Creative Synthesis",
        snippet: "Combine these disparate concepts into a unified framework"
      }
    ]
  },
  {
    slug: "midjourney",
    name: "Midjourney",
    summary: "Visual consciousness through AI imagery",
    description: "Midjourney transforms text prompts into stunning visual art through advanced AI image generation. It's particularly known for its artistic style and ability to create emotionally resonant imagery.",
    url: "https://midjourney.com",
    tags: ["Visual", "Creative", "Pro"],
    consciousnessScore: 3,
    curatorNote: "Dreams made manifest. Sometimes hits transcendent beauty, sometimes generic AI slop. 3/5 stars.",
    screenshotUrl: "/screenshots/midjourney.png",
    pricingModel: "Paid" as PricingModel,
    dateAdded: "2024-12-05",
    consciousnessWarning: {
      level: "medium",
      message: "⚠️ Potential for mindless content generation",
      reason: "While powerful for creativity, can encourage dependency over developing personal artistic vision. Use mindfully to enhance rather than replace your creative process."
    },
    votes: { upvotes: 34, downvotes: 12, userVote: null },
    promptTips: [
      {
        title: "Cinematic Portraits",
        snippet: "portrait of [subject], cinematic lighting, shallow depth of field, --ar 16:9 --stylize 500"
      },
      {
        title: "Abstract Concepts",
        snippet: "visualize [concept] as surreal landscape, ethereal atmosphere, pastel colors"
      }
    ]
  },
  {
    slug: "gemini-ai-mode",
    name: "Gemini AI Mode",
    summary: "Converse with your world in real time — camera, voice, AI combine to break the scroll trance.",
    description: "Gemini AI Mode enables real-time conversations with your environment through camera, voice, and AI integration. Break free from the endless scroll and engage with the world around you through intelligent visual and audio processing.",
    url: "https://gemini.google.com",
    tags: ["Search", "Live", "Multimodal"],
    consciousnessScore: 5,
    curatorNote: "Reality augmentation at its finest. Live AI that sees what you see and responds in real-time.",
    featured: true,
    screenshotUrl: "/screenshots/gemini-ai-mode.png",
    pricingModel: "Free" as PricingModel,
    dateAdded: "2025-01-10",
    isCuratorPick: true,
    specialOffer: {
      code: "CONSCIOUSNESS25",
      description: "Enhanced reality perception mode - exclusive early access"
    },
    votes: { upvotes: 156, downvotes: 8, userVote: null },
    promptTips: [
      {
        title: "Live Environment Analysis",
        snippet: "What's happening in my environment right now? Analyze what you can see."
      },
      {
        title: "Real-time Problem Solving",
        snippet: "Help me solve this problem I'm looking at using the visual context"
      }
    ]
  },
  {
    slug: "veo-3",
    name: "Veo 3",
    summary: "Generate life‑like video & sound with a single prompt—cinematic shovels in minutes.",
    description: "Veo 3 transforms text prompts into high-quality video content with synchronized audio. Create cinematic experiences in minutes with advanced AI video generation that understands narrative structure and visual storytelling.",
    url: "https://deepmind.google/technologies/veo/veo-3/",
    tags: ["Video", "Creative", "Generation"],
    consciousnessScore: 4,
    curatorNote: "Video generation that actually looks real. Still in preview but the demos are mind-bending.",
    featured: true,
    screenshotUrl: "/screenshots/veo-3.png",
    pricingModel: "Free" as PricingModel,
    dateAdded: "2025-01-08",
    isCuratorPick: true,
    votes: { upvotes: 92, downvotes: 5, userVote: null },
    promptTips: [
      {
        title: "Cinematic Sequences",
        snippet: "Create a 30-second cinematic sequence showing [your concept] with dramatic lighting"
      },
      {
        title: "Product Demos",
        snippet: "Generate a product demonstration video showing [product] in use, professional quality"
      }
    ]
  },
  {
    slug: "notebooklm-plus",
    name: "NotebookLM Plus",
    summary: "Turn your docs into audio summaries, insights & instant research—your AI tutor in a notebook.",
    description: "NotebookLM Plus transforms your documents into interactive audio summaries and research insights. Upload your materials and get an AI tutor that understands your specific content and can generate personalized learning experiences.",
    url: "https://notebooklm.google.com",
    tags: ["Research", "Audio", "Learning"],
    consciousnessScore: 4,
    curatorNote: "Your personal research assistant that actually reads everything. The audio summaries are eerily good.",
    featured: true,
    screenshotUrl: "/screenshots/notebooklm-plus.png",
    pricingModel: "Free" as PricingModel,
    dateAdded: "2025-01-06",
    votes: { upvotes: 73, downvotes: 4, userVote: null },
    promptTips: [
      {
        title: "Document Synthesis",
        snippet: "Create an audio summary highlighting the key insights from these documents"
      },
      {
        title: "Research Deep Dive",
        snippet: "Generate follow-up questions and research directions based on this material"
      }
    ]
  },
  {
    slug: "project-mariner",
    name: "Project Mariner",
    summary: "Automate browsing, forms & shopping like a cyborg assistant—cleanup your digital flow.",
    description: "Project Mariner automates web browsing tasks including form filling, shopping, and data collection. It acts as your cyborg assistant, handling repetitive digital tasks so you can focus on higher-level thinking and creativity.",
    url: "https://deepmind.google/discover/blog/project-mariner/",
    tags: ["Automation", "Browsing", "Assistant"],
    consciousnessScore: 5,
    curatorNote: "The future of web automation. Watches you browse once, then does it forever. Still experimental but promising.",
    featured: true,
    screenshotUrl: "/screenshots/project-mariner.png",
    pricingModel: "Free" as PricingModel,
    dateAdded: "2025-01-04",
    isCuratorPick: true,
    votes: { upvotes: 128, downvotes: 12, userVote: null },
    promptTips: [
      {
        title: "Shopping Automation",
        snippet: "Help me find and compare prices for [product] across multiple websites"
      },
      {
        title: "Form Automation",
        snippet: "Fill out this form with the information from my profile/document"
      }
    ]
  }
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find(tool => tool.slug === slug);
}

export function getAllTools(): Tool[] {
  return tools;
}

// New Airtable-powered functions
export async function getAllToolsAsync(): Promise<Tool[]> {
  try {
    const airtableTools = await getToolsFromAirtable();
    // If Airtable returns tools, use them; otherwise fall back to static tools
    return airtableTools.length > 0 ? airtableTools : tools;
  } catch (error) {
    console.error('Failed to fetch from Airtable, using static data:', error);
    return tools;
  }
}

export async function getToolBySlugAsync(slug: string): Promise<Tool | undefined> {
  try {
    const airtableTool = await getToolBySlugFromAirtable(slug);
    if (airtableTool) {
      return airtableTool;
    }
    // Fall back to static data
    return tools.find(tool => tool.slug === slug);
  } catch (error) {
    console.error('Failed to fetch tool from Airtable, using static data:', error);
    return tools.find(tool => tool.slug === slug);
  }
}

export function getFeaturedGoogleTools(): Tool[] {
  return tools.filter(tool => tool.featured);
}

export function getCuratorPicks(): Tool[] {
  return tools.filter(tool => tool.isCuratorPick);
}

export function getToolsByPricing(pricingModel: PricingModel): Tool[] {
  return tools.filter(tool => tool.pricingModel === pricingModel);
}

export function getToolsWithWarnings(): Tool[] {
  return tools.filter(tool => tool.consciousnessWarning);
}

export function getToolsWithSpecialOffers(): Tool[] {
  return tools.filter(tool => tool.specialOffer);
}

export function sortToolsByVotes(tools: Tool[]): Tool[] {
  return [...tools].sort((a, b) => {
    const aScore = a.votes.upvotes - a.votes.downvotes;
    const bScore = b.votes.upvotes - b.votes.downvotes;
    return bScore - aScore;
  });
}

export function sortToolsByDate(tools: Tool[], direction: 'newest' | 'oldest' = 'newest'): Tool[] {
  return [...tools].sort((a, b) => {
    const dateA = new Date(a.dateAdded).getTime();
    const dateB = new Date(b.dateAdded).getTime();
    return direction === 'newest' ? dateB - dateA : dateA - dateB;
  });
}

export function sortToolsByConsciousness(tools: Tool[]): Tool[] {
  return [...tools].sort((a, b) => b.consciousnessScore - a.consciousnessScore);
}

export function getAllUniqueTagsFromTools(tools: Tool[]): string[] {
  const tags = new Set<string>();
  tools.forEach(tool => {
    tool.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
}