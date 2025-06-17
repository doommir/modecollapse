# Integration Notes

## = External Integrations

### Airtable CMS Integration
**File**: `lib/airtable.ts`

```typescript
// Key functions
export async function getToolsFromAirtable(): Promise<Tool[]>
export async function createToolInAirtable(tool: Partial<Tool>): Promise<void>
```

**Configuration**:
- Base ID: Stored in environment variables
- Table: "Tools" with structured fields
- Fields: name, summary, description, url, tags, consciousnessScore, etc.

**Usage Pattern**:
```typescript
// Fetch tools from Airtable
const airtableTools = await getToolsFromAirtable();
// Merge with local tools data
const allTools = [...localTools, ...airtableTools];
```

### n8n Webhook Integration
**File**: `lib/postToWebhook.ts`

```typescript
export async function postToWebhook(data: any): Promise<void>
```

**Workflow**:
1. Tool submission form ’ POST to n8n webhook
2. n8n processes submission (validation, screenshot capture)
3. Tool added to Airtable or local storage
4. Optional notification sent

**Webhook URL**: Environment variable `N8N_WEBHOOK_URL`

### Screenshot Automation
**File**: `n8n-screenshot-workflow.json`

**Process**:
1. Receive tool URL from webhook
2. Use Puppeteer to navigate and capture screenshot
3. Optimize image (resize, compress)
4. Store in `/public/screenshots/` or cloud storage
5. Update tool record with screenshot URL

## <¨ Shadcn/ui Component Integration

### Setup
- **Config**: `components.json` defines aliases and paths
- **Installation**: `npx shadcn-ui@latest add [component]`
- **Customization**: Tailored for dark cyberpunk theme

### Key Components Used
```typescript
// Essential UI components
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
```

### Theme Customization
**File**: `app/globals.css`
- Custom CSS variables for brand colors
- Dark mode optimizations
- Cyberpunk aesthetic overrides

## =Ê Data Integration Patterns

### Tool Data Sources
1. **Local Data** (`lib/tools.ts`): Primary tool definitions
2. **Airtable**: Dynamic/community-submitted tools
3. **FutureTools JSON** (`data/futuretools/`): Research data (read-only)

### Data Merging Strategy
```typescript
// Combine multiple data sources
export function getAllTools(): Tool[] {
  const localTools = getLocalTools();
  const airtableTools = getAirtableTools();
  
  // Local tools take precedence for duplicates
  return mergeDedupe([localTools, airtableTools], 'slug');
}
```

### Search Integration
**File**: `components/tools/ToolSearchBar.tsx`

```typescript
// Real-time search across multiple fields
const filteredTools = tools.filter(tool => 
  tool.name.toLowerCase().includes(query) ||
  tool.description.toLowerCase().includes(query) ||
  tool.tags.some(tag => tag.toLowerCase().includes(query))
);
```

## =¼ Image Integration

### Screenshot Handling
**Pattern**: Graceful fallback system
```typescript
// In ToolCard component
const imageSrc = tool.screenshotUrl || '/placeholder.svg';

// With Next.js Image optimization
<Image
  src={imageSrc}
  alt={tool.name}
  width={400}
  height={240}
  className="aspect-[5/3] object-cover"
  onError={() => setImageError(true)}
/>
```

### Image Sources Priority
1. Local screenshots (`/public/screenshots/`)
2. Remote URLs (Airtable or n8n processed)
3. Placeholder fallback (`/placeholder.svg`)

## = API Integration Patterns

### Internal APIs
**Health Check**: `/api/health`
```typescript
// Simple endpoint for monitoring
export async function GET() {
  return Response.json({ status: 'ok', timestamp: new Date().toISOString() });
}
```

**Tool Submission**: `/api/submit-tool`
```typescript
// Handles form submissions and webhook forwarding
export async function POST(request: Request) {
  const data = await request.json();
  await postToWebhook(data);
  return Response.json({ success: true });
}
```

### External API Considerations
- **Rate Limiting**: Implement for Airtable calls
- **Error Handling**: Graceful degradation when services unavailable
- **Caching**: Consider Redis or Vercel KV for frequently accessed data

## =' Development Integration

### TypeScript Integration
**File**: `types/index.ts`
- Centralized type definitions
- Shared interfaces across components
- Strict typing for data consistency

### Build Integration
- **Static Generation**: Pre-render tool pages for SEO
- **Image Optimization**: Automatic WebP conversion
- **Bundle Analysis**: Monitor for performance regressions

### Testing Integration Points
- API endpoints (`/api/*`)
- Component rendering with real data
- Search functionality
- Form submissions
- Image loading fallbacks