# Mode Collapse - Project Overview

## 🎯 Mission
A consciousness-expanding AI tools directory built with Next.js 15, featuring a dark cyberpunk aesthetic and cult-coded messaging. Curates premium AI tools with human-tested reviews and consciousness ratings.

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Styling**: TailwindCSS with custom dark theme
- **UI Components**: Shadcn/ui components library
- **TypeScript**: Full type safety throughout
- **Deployment**: Vercel (auto-deploys from main branch)
- **Data**: Local TypeScript files with structured interfaces

### Key File Structure
```
app/                    # Next.js App Router pages
├── api/               # API routes (health, submit-tool)
├── tools/             # Tools directory and individual tool pages
├── submit-tool/       # Tool submission form
└── page.tsx          # Homepage

components/            # React components
├── layout/           # Header, footer, navigation
├── tools/            # Tool-specific components
├── forms/            # Form components
└── ui/              # Shadcn/ui components

lib/                  # Utilities and data
├── tools.ts          # Main tools data and functions
├── airtable.ts       # Airtable CMS integration
└── utils.ts         # Utility functions

public/              # Static assets
└── screenshots/     # Tool preview images
```

## 🎨 Design System

### Color Palette
- **Primary**: Deep purple (#1a0b2e) background
- **Accent**: Electric blue (#00d9ff) and neon magenta (#ff0080)
- **Text**: High contrast whites and light grays
- **Consciousness Stars**: Gold/yellow gradient

### Typography
- **Headings**: Bold, high contrast
- **Body**: Clean, readable sans-serif
- **Code**: Monospace for technical elements

### UI Patterns
- **Tool Cards**: 400x240 aspect-ratio thumbnails with hover effects
- **Consciousness Ratings**: 1-5 star system
- **Search**: Live filtering with real-time results
- **Navigation**: Fixed header with mobile hamburger menu

## 🔄 Data Flow

### Tool Data Structure
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
  featured?: boolean;
  screenshotUrl?: string;
}
```

### Content Management
- **Local Data**: Primary tool data in `lib/tools.ts`
- **Airtable CMS**: Optional integration for dynamic content
- **Screenshot Automation**: n8n workflow for capturing tool previews

## 🚀 Key Features

### User Experience
1. **Homepage**: Hero section, live search, featured tools grid
2. **Tools Directory**: Full catalog with advanced filtering
3. **Tool Detail Pages**: Comprehensive tool information
4. **Tool Submission**: Community-driven tool additions

### Technical Features
1. **Live Search**: Real-time filtering across names, descriptions, tags
2. **Image Optimization**: Next.js Image component with fallbacks
3. **Responsive Design**: Mobile-first with progressive enhancement
4. **SEO Optimization**: Static generation for performance

## 🎭 Brand Philosophy

### Voice & Tone
- **Target**: AI-aware individuals seeking genuine recommendations
- **Personality**: Mysterious, intelligent, anti-mainstream AI hype
- **Messaging**: Focus on consciousness, agency, breaking algorithms

### Content Strategy
- **Quality over Quantity**: Curated, tested tools only
- **Human-First**: Real reviews from AI practitioners
- **Anti-Algorithm**: Positioned against endless feeds

## 🔧 Development Workflow

### Commands
```bash
npm run dev        # Development server
npm run build      # Production build
npm run lint       # Code linting
npm run typecheck  # TypeScript checking
```

### Deployment
- **Auto-deploy**: `main` branch → Vercel
- **Build time**: ~30-45 seconds
- **Environment**: Production optimized with static generation

## 📈 Current Status

### Implemented
- ✅ Homepage with hero, search, and tools grid
- ✅ Tools directory with filtering and search
- ✅ Individual tool detail pages
- ✅ Tool submission form with n8n integration
- ✅ Responsive design across all breakpoints
- ✅ Airtable CMS integration

### In Progress
- 🔄 Screenshot automation workflow
- 🔄 Enhanced search functionality
- 🔄 User engagement features

### Planned
- 📋 User accounts and personalization
- 📋 Tool rating and review system
- 📋 Advanced analytics and insights