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
  featured?: boolean;
  screenshotUrl?: string;
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
    screenshotUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=240&fit=crop",
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
    screenshotUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=240&fit=crop",
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
    screenshotUrl: "https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=400&h=240&fit=crop",
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
    screenshotUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=240&fit=crop",
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
    screenshotUrl: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=240&fit=crop",
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
    screenshotUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=240&fit=crop",
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
    screenshotUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=240&fit=crop",
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

export function getFeaturedGoogleTools(): Tool[] {
  return tools.filter(tool => tool.featured);
}