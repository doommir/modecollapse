# Mode Collapse - AI Tools Directory

## Project Overview
Mode Collapse is a consciousness-expanding AI tools directory built with Next.js 15, featuring a dark cyberpunk aesthetic and cult-coded messaging. The site curates premium AI tools with human-tested reviews and consciousness ratings.

## Tech Stack
- **Framework**: Next.js 15 with App Router
- **Styling**: TailwindCSS with custom dark theme
- **UI Components**: Shadcn/ui components library
- **TypeScript**: Full type safety throughout
- **Deployment**: Vercel (auto-deploys from main branch)
- **Tools Data**: Local TypeScript files with structured interfaces

## Site Structure

### Pages
- `/` - Homepage with hero, search, Google I/O featured section, and tools grid
- `/tools` - Full tools directory with filtering, search, and sorting
- `/tools/[slug]` - Individual tool detail pages
- `/submit-tool` - Tool submission form (integrates with n8n webhook)

### Key Components
- **Navigation** - Fixed header with responsive hamburger menu
- **ToolCard** - Reusable component with thumbnail support and hover effects
- **ToolSearchBar** - Live search with real-time filtering
- **SubmitToolCTA** - Call-to-action section for tool submissions
- **GoogleIOSection** - Featured showcase of latest Google AI tools

## Data Structure

### Tool Interface
```typescript
interface Tool {
  slug: string;
  name: string;
  summary: string;
  description: string;
  url: string;
  tags: string[];
  consciousnessScore: number; // 1-5 rating
  curatorNote: string;
  promptTips: PromptTip[];
  featured?: boolean; // For Google I/O showcase
  screenshotUrl?: string; // Thumbnail images
}
```

### Current Tools
- **Google I/O Featured**: Gemini AI Mode, Veo 3, NotebookLM Plus, Project Mariner
- **Core Directory**: Claude AI, Cursor AI, Midjourney, Perplexity Pro, RunwayML, GitHub Copilot, ElevenLabs, Notion AI, Stable Diffusion XL, Suno AI, Anthropic Claude, Vercel v0

## Features

### Visual Design
- **Dark Theme**: Deep purple background with electric blue and neon magenta accents
- **Consciousness Ratings**: 1-5 star system for tool awareness/agency
- **Thumbnail Previews**: 400x240 aspect-ratio images with hover zoom effects
- **Gradient Effects**: Subtle gradients and glow effects throughout
- **Responsive Design**: Mobile-first with breakpoints for tablet/desktop

### User Experience
- **Live Search**: Real-time filtering across tool names, descriptions, and tags
- **Advanced Filtering**: Tag-based filters with visual pill interface
- **Sorting Options**: By relevance, recent, or editor's picks
- **Hover Animations**: Scale effects, color transitions, image zoom
- **Loading States**: Skeleton screens and smooth transitions

### Content Philosophy
- **Cult-Coded Messaging**: "Escape the algorithmic trance", "consciousness-expanding tools"
- **Human Curation**: Every tool tested by humans who understand AI mastery
- **Quality Over Quantity**: Focused on genuinely useful, consciousness-expanding tools
- **Anti-Algorithm**: Positioned against endless feeds and mindless scrolling

## Development Commands

### Build & Test
```bash
npm run build     # Production build
npm run dev       # Development server
npm run lint      # Code linting
npm run typecheck # TypeScript checking
```

### Deployment
- **Auto-deploy**: Pushes to `main` branch automatically deploy to Vercel
- **Build time**: ~30-45 seconds
- **Static generation**: Most pages pre-rendered for performance

## File Locations

### Core Files
- `lib/tools.ts` - Main tools data and utility functions
- `components/ToolCard.tsx` - Reusable tool display component
- `components/Navigation.tsx` - Fixed header navigation
- `app/page.tsx` - Homepage with all main sections
- `app/tools/page.tsx` - Tools directory with filtering
- `app/globals.css` - Custom styles and theme variables

### Assets
- `public/placeholder.svg` - Fallback image for missing thumbnails
- `public/mode-collapse-logo.svg` - Site logo
- `public/screenshots/` - Directory for local tool screenshots (currently empty)

## Integration Points

### Tool Submission
- **Form**: `/submit-tool` page with comprehensive tool details form
- **Backend**: Direct n8n webhook integration (bypasses API routes)
- **Automation**: Submissions trigger screenshot capture and processing workflow

### Screenshot Automation
- **n8n Workflow**: Automated screenshot capture using Puppeteer
- **Storage**: Images can be local `/public/screenshots/` or remote URLs
- **Fallback**: Graceful degradation to placeholder images

## Recent Updates
- ✅ Global navigation system with mobile responsiveness
- ✅ Google I/O 2025 featured section with four premium tools
- ✅ ToolCard component with thumbnail support and hover effects
- ✅ Live search functionality above the fold
- ✅ Tool submission form with n8n integration
- ✅ Responsive grid layouts for all screen sizes

## Brand Voice
- **Target Audience**: AI-aware individuals seeking genuine tool recommendations
- **Tone**: Mysterious, intelligent, slightly rebellious against mainstream AI hype
- **Messaging**: Focus on consciousness, agency, and breaking free from algorithmic control
- **Aesthetic**: Dark cyberpunk with subtle sci-fi elements