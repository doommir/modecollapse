# Mode Collapse 🧠

A consciousness-driven AI tools directory and workshop community.

## Features

- 🔥 **AI Tool Directory** - Curated collection of consciousness-expanding AI tools
- 🌟 **Dynamic Tool Pages** - Individual pages for each tool with ratings and prompt tips
- 🔄 **n8n Integration** - Automated data sync from Airtable to TypeScript
- 🎨 **Dark Theme** - Neon-accented design with glowing consciousness scores
- ⚡ **Next.js 15** - Built with React 19 and Tailwind CSS

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Tool Management

This project uses n8n for automated content management:

1. **Airtable → n8n → TypeScript** pipeline
2. Updates `lib/tools.ts` automatically
3. Supports manual or scheduled sync (daily 3am)

### Tool Data Structure

```typescript
interface Tool {
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
```

## Available Routes

- `/` - Homepage
- `/tools` - Tools directory
- `/tools/[slug]` - Individual tool pages

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Automation**: n8n
- **Data Source**: Airtable
- **Deployment**: Vercel

## Contributing

1. Update tool data in Airtable
2. Run n8n workflow to sync
3. Tools automatically appear on site

---

*Breaking free from the algorithmic prison, one consciousness-expanding tool at a time.*