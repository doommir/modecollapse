# Custom Patterns & Conventions

## <� Component Patterns

### Tool Card Pattern
**File**: `components/tools/ToolCard.tsx`

```typescript
// Reusable tool card with consistent styling
interface ToolCardProps {
  tool: Tool;
  showDescription?: boolean;
  variant?: 'default' | 'featured' | 'compact';
}

// Usage pattern
<ToolCard tool={tool} variant="featured" showDescription={true} />
```

**Visual Elements**:
- 400x240 aspect ratio thumbnails
- Hover scale animations (105%)
- Consciousness star ratings
- Tag pills with hover effects
- Gradient overlays for featured tools

### Layout Composition Pattern
**Directory**: `components/layout/`

```typescript
// Homepage sections as composable components
<HeroSection />
<GoogleIOSection />
<FeaturedToolsGrid tools={featuredTools} />
<SubmitToolCTA />
<Footer />
```

**Benefits**:
- Modular, testable components
- Consistent spacing and styling
- Easy to reorder or conditional render

### Search Integration Pattern
**File**: `components/tools/ToolSearchBar.tsx`

```typescript
// Live search with debouncing and state management
const [query, setQuery] = useState('');
const [filteredTools, setFilteredTools] = useState(tools);

// Debounced search effect
useEffect(() => {
  const timer = setTimeout(() => {
    // Filter logic
  }, 300);
  return () => clearTimeout(timer);
}, [query, tools]);
```

## = Data Patterns

### Tool Data Structure
**File**: `lib/tools.ts`

```typescript
// Centralized tool definitions with consistent structure
export const tools: Tool[] = [
  {
    slug: 'claude-ai',
    name: 'Claude AI',
    summary: 'Constitutional AI assistant',
    description: 'Advanced reasoning and writing...',
    url: 'https://claude.ai',
    tags: ['writing', 'coding', 'reasoning'],
    consciousnessScore: 5,
    curatorNote: 'The most aware AI assistant...',
    promptTips: [
      {
        category: 'Writing',
        tip: 'Ask Claude to think step-by-step...'
      }
    ],
    screenshotUrl: '/screenshots/claude-ai.png'
  }
];
```

### Data Access Pattern
```typescript
// Consistent data access methods
export function getToolBySlug(slug: string): Tool | undefined
export function getToolsByTag(tag: string): Tool[]
export function getFeaturedTools(): Tool[]
export function searchTools(query: string): Tool[]
```

### State Management Pattern
```typescript
// React state for search and filtering
interface ToolsState {
  query: string;
  selectedTags: string[];
  sortBy: 'name' | 'recent' | 'consciousness';
  filteredTools: Tool[];
}

// Custom hook for tools state
export function useToolsState(initialTools: Tool[]): ToolsState
```

## <� Styling Patterns

### Cyberpunk Theme Variables
**File**: `app/globals.css`

```css
:root {
  /* Brand colors */
  --background: 220 13% 9%;        /* Deep purple */
  --primary: 197 100% 50%;         /* Electric blue */
  --accent: 320 100% 50%;          /* Neon magenta */
  --consciousness: 45 100% 70%;     /* Gold stars */
  
  /* Gradients */
  --gradient-primary: linear-gradient(135deg, var(--primary), var(--accent));
  --glow-primary: 0 0 20px hsl(var(--primary) / 0.3);
}
```

### Component Styling Pattern
```typescript
// Consistent className patterns with cn() utility
import { cn } from "@/lib/utils";

<div className={cn(
  "base-styles",
  variant === "featured" && "featured-styles",
  className // Allow external overrides
)} />
```

### Responsive Design Pattern
```css
/* Mobile-first responsive approach */
.tool-grid {
  @apply grid grid-cols-1 gap-6;
  @apply md:grid-cols-2 md:gap-8;
  @apply lg:grid-cols-3 xl:grid-cols-4;
}

/* Consistent breakpoints */
/* sm: 640px */
/* md: 768px */
/* lg: 1024px */
/* xl: 1280px */
```

## =' Next.js Patterns

### App Router File Structure
```
app/
   page.tsx                 # Homepage (/)
   layout.tsx              # Root layout
   tools/
      page.tsx           # Tools directory (/tools)
      [slug]/
          page.tsx       # Individual tool (/tools/claude-ai)
   submit-tool/
      page.tsx          # Submit form (/submit-tool)
   api/
       health/
          route.ts      # Health check API
       submit-tool/
           route.ts      # Form submission API
```

### Static Generation Pattern
```typescript
// Generate static params for tool pages
export async function generateStaticParams() {
  return tools.map(tool => ({
    slug: tool.slug
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const tool = getToolBySlug(params.slug);
  return {
    title: `${tool?.name} - Mode Collapse`,
    description: tool?.summary
  };
}
```

### Image Optimization Pattern
```typescript
// Consistent image handling with fallbacks
import Image from 'next/image';

<Image
  src={tool.screenshotUrl || '/placeholder.svg'}
  alt={tool.name}
  width={400}
  height={240}
  className="aspect-[5/3] object-cover rounded-lg"
  priority={featured}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
/>
```

## =� Form Patterns

### Form Validation Pattern
**File**: `components/forms/ToolSubmitForm.tsx`

```typescript
// React Hook Form with Zod validation
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const toolSchema = z.object({
  name: z.string().min(1, 'Tool name is required'),
  url: z.string().url('Must be a valid URL'),
  description: z.string().min(10, 'Description must be at least 10 characters')
});

type ToolFormData = z.infer<typeof toolSchema>;

const form = useForm<ToolFormData>({
  resolver: zodResolver(toolSchema)
});
```

### Form UI Pattern
```typescript
// Consistent form styling with Shadcn/ui
<Form {...form}>
  <FormField
    control={form.control}
    name="name"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Tool Name</FormLabel>
        <FormControl>
          <Input placeholder="Enter tool name..." {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
</Form>
```

## = Search & Filter Patterns

### Tag Filter Pattern
```typescript
// Multi-select tag filtering
const [selectedTags, setSelectedTags] = useState<string[]>([]);

const filteredByTags = tools.filter(tool =>
  selectedTags.length === 0 || 
  selectedTags.some(tag => tool.tags.includes(tag))
);

// Tag UI component
<Badge
  variant={selectedTags.includes(tag) ? "default" : "outline"}
  className="cursor-pointer hover:scale-105 transition-transform"
  onClick={() => toggleTag(tag)}
>
  {tag}
</Badge>
```

### Sort Pattern
```typescript
// Sorting utilities
const sortingOptions = {
  name: (a: Tool, b: Tool) => a.name.localeCompare(b.name),
  consciousness: (a: Tool, b: Tool) => b.consciousnessScore - a.consciousnessScore,
  recent: (a: Tool, b: Tool) => new Date(b.dateAdded) - new Date(a.dateAdded)
};

const sortedTools = [...filteredTools].sort(sortingOptions[sortBy]);
```

## =� Performance Patterns

### Loading States Pattern
```typescript
// Skeleton loading for better UX
import { Skeleton } from "@/components/ui/skeleton";

{isLoading ? (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 9 }).map((_, i) => (
      <Skeleton key={i} className="h-64 w-full rounded-lg" />
    ))}
  </div>
) : (
  <ToolsGrid tools={tools} />
)}
```

### Lazy Loading Pattern
```typescript
// Dynamic imports for code splitting
const ToolDetailModal = dynamic(
  () => import('@/components/tools/ToolDetailModal'),
  { 
    loading: () => <Skeleton className="h-96 w-full" />,
    ssr: false 
  }
);
```

## = Error Handling Patterns

### API Error Pattern
```typescript
// Consistent error handling for API calls
export async function apiRequest<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}
```

### Component Error Boundary Pattern
```typescript
// Error boundaries for graceful degradation
export function ToolCardWithErrorBoundary({ tool }: { tool: Tool }) {
  return (
    <ErrorBoundary fallback={<ToolCardSkeleton />}>
      <ToolCard tool={tool} />
    </ErrorBoundary>
  );
}
```