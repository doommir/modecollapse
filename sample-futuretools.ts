import { Tool, PromptTip } from '@/types';

// Sample tools extracted from FutureTools data for Mode Collapse integration
export const futuretoolsSample: Tool[] = [
  {
    slug: "coopa-ai",
    name: "Coopa AI",
    summary: "AI-powered marketing tool to replace traditional agencies",
    description: "Coopa is an AI-powered marketing tool designed to replace traditional marketing agencies by delivering high-impact content and campaigns with speed and precision. It generates ad copy, blog posts, visuals, cold outreach emails, and launch materials based on your raw ideas. Coopa identifies the strongest angles for positioning, discards weak messaging, and tailors content that resonates with your target audience.",
    url: "https://futuretools.link/coopa-ai",
    tags: ["Marketing", "Content", "Automation"],
    consciousnessScore: 3,
    curatorNote: "Warning flagged for gaming upvotes. Promising concept but under review for shady practices.",
    screenshotUrl: "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68477dffad249029e04d4d38_fa0MDPEjU4FujGy0xK8taWpxdE.jpeg",
    promptTips: [
      {
        title: "Campaign Strategy",
        snippet: "Create a marketing campaign for [product] targeting [audience] with focus on [key benefit]"
      },
      {
        title: "Ad Copy Generation", 
        snippet: "Generate 5 variations of ad copy for [product] that highlight emotional benefits"
      }
    ]
  },
  {
    slug: "nimblr-ai",
    name: "Nimblr.ai", 
    summary: "Healthcare practice scheduling and patient communications",
    description: "A comprehensive tool for healthcare practice scheduling and patient communications. Streamlines appointment management, automates patient reminders, and enhances communication workflows for medical practices.",
    url: "https://futuretools.link/nimblr-ai",
    tags: ["Productivity", "Healthcare", "Automation"],
    consciousnessScore: 4,
    curatorNote: "Solid healthcare automation. Clean interface, practical features for medical practices.",
    screenshotUrl: "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68436041574c2a9c6509e318_Holly%2520Easy%2520AI%2520for%2520Healthcare.png",
    promptTips: [
      {
        title: "Patient Communication",
        snippet: "Draft a patient reminder message for [appointment type] that's friendly and informative"
      },
      {
        title: "Scheduling Optimization",
        snippet: "Suggest optimal scheduling blocks for [procedure type] considering patient flow"
      }
    ]
  },
  {
    slug: "vomyra",
    name: "Vomyra",
    summary: "NoCode platform for multilingual AI voice agents",
    description: "A nocode platform for creating multilingual AI voice agents for customer interactions. Build sophisticated voice agents without coding that can handle customer service, sales inquiries, and support across multiple languages.",
    url: "https://futuretools.link/vomyra", 
    tags: ["Voice Modulation", "NoCode", "Customer Service"],
    consciousnessScore: 4,
    curatorNote: "Impressive multilingual voice tech. NoCode approach makes it accessible to non-technical teams.",
    screenshotUrl: "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68484ff9051b317bf4e871d6_vomyra-com-logo.png",
    promptTips: [
      {
        title: "Voice Agent Design", 
        snippet: "Create a voice agent script for [business type] that handles [common inquiry] professionally"
      },
      {
        title: "Multilingual Setup",
        snippet: "Configure voice responses for [language] that maintain brand tone while being culturally appropriate"
      }
    ]
  },
  {
    slug: "wuko-ai",
    name: "Wuko AI",
    summary: "Summarize and answer questions from emailed content",
    description: "A tool to summarize and answer questions from emailed content. Processes emails and documents to extract key insights, generate summaries, and provide intelligent responses to questions about the content.",
    url: "https://futuretools.link/wuko-ai",
    tags: ["Research", "Email", "Productivity"],
    consciousnessScore: 3,
    curatorNote: "Useful for email overload but not groundbreaking. Good execution of a simple concept.",
    screenshotUrl: "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/68484e82a0eb76998d7ecc29_wuko-ai-logo.png",
    promptTips: [
      {
        title: "Email Summarization",
        snippet: "Summarize this email thread focusing on action items and decisions made"
      },
      {
        title: "Content Analysis",
        snippet: "Extract the key insights from this document and highlight important details"
      }
    ]
  },
  {
    slug: "purecode-ai", 
    name: "PureCode.ai",
    summary: "Automate coding tasks through codebase-aware generation",
    description: "A tool to automate coding tasks through codebase-aware code generation. Understands your existing codebase context and generates relevant code that follows your patterns and conventions. Accelerates development while maintaining code quality.",
    url: "https://futuretools.link/purecode-ai",
    tags: ["Generative Code", "Automation", "Development"],
    consciousnessScore: 4,
    curatorNote: "Strong codebase awareness sets it apart from generic code generators. Actually understands context.",
    screenshotUrl: "https://cdn.prod.website-files.com/63994dae1033718bee6949ce/6843603fb8ed96126b65ef92_opengraph-image.png",
    promptTips: [
      {
        title: "Context-Aware Coding",
        snippet: "Generate a [component/function] that follows the existing patterns in this codebase"
      },
      {
        title: "Code Refactoring",
        snippet: "Refactor this code to improve performance while maintaining the same API"
      }
    ]
  }
];

// Utility functions matching existing tools.ts structure
export function getFutureToolBySlug(slug: string): Tool | undefined {
  return futuretoolsSample.find(tool => tool.slug === slug);
}

export function getAllFutureTools(): Tool[] {
  return futuretoolsSample;
}

// Category breakdown from FutureTools
export const futuretoolsCategories = [
  "AI Detection", "Aggregators", "Avatar", "Chat", "Copywriting", 
  "Finance", "For Fun", "Gaming", "Generative Art", "Generative Code",
  "Generative Video", "Image Improvement", "Image Scanning", 
  "Inspiration", "Marketing", "Motion Capture", "Music", "Podcasting",
  "Productivity", "Prompt Guides", "Research", "Self-Improvement",
  "Social Media", "Speech-To-Text", "Text-To-Speech", "Text-To-Video",
  "Translation", "Video Editing", "Voice Modulation"
];