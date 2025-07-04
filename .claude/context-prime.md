# Mode Collapse - Context Prime

## <� Project Context
You are working on **Mode Collapse**, a consciousness-expanding AI tools directory built with Next.js 15. This is a dark cyberpunk-themed website that curates premium AI tools with human-tested reviews and consciousness ratings.

## <� Technical Stack & Structure

### Core Technologies
- **Framework**: Next.js 15 with App Router (`app/` directory)
- **Styling**: TailwindCSS with custom dark cyberpunk theme
- **UI Components**: Shadcn/ui component library
- **TypeScript**: Full type safety throughout the codebase
- **Deployment**: Vercel with auto-deploy from `main` branch

### Key File Locations
```
app/                          # Next.js App Router pages
   api/health/route.ts       # Health check endpoint
   api/submit-tool/route.ts  # Tool submission API
   tools/[slug]/page.tsx     # Individual tool pages
   tools/page.tsx            # Tools directory
   submit-tool/page.tsx      # Tool submission form
   layout.tsx                # Root layout
   page.tsx                  # Homepage

components/                   # React components
   layout/                   # Navigation, hero, footer sections
   tools/                    # Tool-specific components (ToolCard, ToolDetail, etc.)
   forms/                    # Form components (ToolSubmitForm)
   ui/                       # Shadcn/ui components

lib/                          # Core utilities and data
   tools.ts                  # Main tools data and utility functions
   airtable.ts               # Airtable CMS integration
   postToWebhook.ts          # n8n webhook integration
   submitTool.ts             # Tool submission logic
   utils.ts                  # General utilities (cn, etc.)

public/screenshots/           # Tool preview images
types/index.ts               # TypeScript type definitions
```

### Data Structure
The core `Tool` interface is defined in `types/index.ts`:
```typescript
interface Tool {
  slug: string;                    // URL-friendly identifier
  name: string;                    // Tool name
  summary: string;                 // Brief description
  description: string;             // Detailed description
  url: string;                     // Tool website
  tags: string[];                  // Category tags
  consciousnessScore: number;      // 1-5 rating for AI awareness
  curatorNote: string;             // Editorial commentary
  promptTips: PromptTip[];         // Usage tips and tricks
  featured?: boolean;              // Homepage featured status
  screenshotUrl?: string;          // Preview image URL
}
```

## <� Design System & Brand

### Visual Identity
- **Primary Colors**: Deep purple background (#1a0b2e), electric blue (#00d9ff), neon magenta (#ff0080)
- **Typography**: Bold headings, clean sans-serif body text
- **Aesthetic**: Dark cyberpunk with subtle gradients and glow effects
- **Consciousness Ratings**: Gold/yellow star system (1-5 stars)

### Component Patterns
- **Tool Cards**: 400x240 aspect-ratio thumbnails with hover scale effects
- **Search**: Real-time filtering with debounced input (300ms)
- **Navigation**: Fixed header with mobile hamburger menu
- **Responsive**: Mobile-first design with breakpoints

### CSS Patterns
Use the `cn()` utility from `lib/utils.ts` for className composition:
```typescript
import { cn } from "@/lib/utils";

<div className={cn(
  "base-styles",
  variant === "featured" && "featured-styles",
  className
)} />
```

## = Integration Points

### Airtable CMS Integration
- **File**: `lib/airtable.ts`
- **Purpose**: Dynamic tool management and community submissions
- **Key Functions**: `getToolsFromAirtable()`, `createToolInAirtable()`
- **Environment Variables**: `AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID`

### n8n Automation Workflow
- **File**: `lib/postToWebhook.ts`
- **Purpose**: Automated tool processing (screenshot capture, validation)
- **Trigger**: Tool submission form � webhook � processing pipeline
- **Environment Variable**: `N8N_WEBHOOK_URL`

### Screenshot System
- **Location**: `/public/screenshots/` for local images
- **Fallback**: `/placeholder.svg` for missing images
- **Processing**: Automated via n8n workflow with Puppeteer
- **Format**: Optimized JPEG, 400x240 aspect ratio

## =� Development Guidelines

### Code Style
- **Components**: Use TypeScript with proper interface definitions
- **Styling**: TailwindCSS classes with responsive modifiers
- **State Management**: React hooks (useState, useEffect, useMemo)
- **Error Handling**: Graceful degradation with fallback UI
- **Performance**: Lazy loading, memoization, and image optimization

### File Organization
- **Components**: One component per file, named exports
- **Utilities**: Pure functions in `lib/` directory
- **Types**: Centralized in `types/index.ts`
- **Styles**: Global styles in `app/globals.css`

### Testing Approach
- **Development Commands**: `npm run dev`, `npm run build`, `npm run lint`, `npm run typecheck`
- **Build**: Static generation for tool pages, optimized for performance
- **Deployment**: Auto-deploy to Vercel on `main` branch pushes

## <� Key Features & Functionality

### Homepage (`app/page.tsx`)
- Hero section with consciousness-focused messaging
- Live search bar above the fold
- Google I/O 2025 featured tools section (4 premium tools)
- General featured tools grid
- Submit tool CTA section

### Tools Directory (`app/tools/page.tsx`)
- Comprehensive tool catalog with search and filtering
- Tag-based filtering system
- Sorting options (relevance, consciousness score, alphabetical)
- Responsive grid layout with tool cards

### Tool Submission (`app/submit-tool/page.tsx`)
- Comprehensive form with validation
- Integration with n8n webhook for automated processing
- Community-driven tool additions

### Individual Tool Pages (`app/tools/[slug]/page.tsx`)
- Detailed tool information with screenshots
- Consciousness ratings and curator notes
- Prompt tips and usage guidance
- Direct links to tools

## >� Brand Voice & Philosophy

### Target Audience
AI-aware individuals seeking genuine tool recommendations, not mainstream AI hype followers.

### Messaging Principles
- **Anti-Algorithm**: Position against endless feeds and mindless scrolling
- **Consciousness-Focused**: Emphasize AI awareness, agency, and consciousness expansion
- **Quality Over Quantity**: Curated, human-tested tools only
- **Mysterious/Intelligent**: Slightly rebellious tone against mainstream AI marketing

### Content Guidelines
- Use "consciousness-expanding" rather than generic descriptors
- Emphasize human curation and testing
- Include "escape the algorithmic trance" messaging
- Focus on practical AI mastery, not theoretical hype

## =� Current Development Status

### Implemented Features
-  Complete homepage with all sections
-  Tools directory with search and filtering
-  Individual tool detail pages
-  Tool submission form with n8n integration
-  Responsive design across all breakpoints
-  Airtable CMS integration
-  Image optimization and fallback system

### Key Data
- **Current Tools**: 12+ curated AI tools including Claude AI, Cursor AI, Midjourney, etc.
- **Featured Tools**: Google I/O 2025 highlights (Gemini AI Mode, Veo 3, NotebookLM Plus, Project Mariner)
- **Screenshots**: Local images in `/public/screenshots/` with automated capture workflow

## =� Development Tips

### When Working on Components
1. **Check existing patterns** in similar components before creating new ones
2. **Use TypeScript interfaces** from `types/index.ts` for type safety
3. **Follow responsive design** with mobile-first approach
4. **Implement loading states** and error boundaries for better UX
5. **Test with real data** from `lib/tools.ts`

### When Adding New Features
1. **Update specifications** in `specs/` folder for complex features
2. **Consider integration points** (Airtable, n8n, etc.)
3. **Maintain brand consistency** with cyberpunk aesthetic
4. **Test responsive behavior** across all device sizes
5. **Document patterns** in `ai-docs/custom-patterns.md`

### When Debugging
1. **Check browser console** for TypeScript errors
2. **Verify API endpoints** using dev tools network tab
3. **Test with empty states** and error conditions
4. **Validate responsive behavior** using device emulation
5. **Review build output** for optimization issues

Remember: Mode Collapse is about consciousness expansion through carefully curated AI tools. Every feature should serve the goal of helping users discover and master genuinely useful AI capabilities, not just consume content mindlessly.