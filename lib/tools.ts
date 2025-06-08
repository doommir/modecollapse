export interface PromptTip {
  title: string;
  snippet: string;
}

export interface Tool {
  slug: string;
  name: string;
  summary: string;
  description: string;
  url: string;
  tags: string[];
  consciousnessScore: number;
  curatorNote: string;
  promptTips: PromptTip[];
}

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
  }
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find(tool => tool.slug === slug);
}

export function getAllTools(): Tool[] {
  return tools;
}