# Homepage Specification

## 📋 Overview
The Mode Collapse homepage serves as the primary entry point, combining brand introduction, tool discovery, and user engagement in a dark cyberpunk aesthetic.

## 🎯 Objectives
- **Brand Introduction**: Establish Mode Collapse as a consciousness-expanding AI tools curator
- **Tool Discovery**: Enable immediate tool search and browsing
- **User Engagement**: Drive tool submissions and directory exploration
- **SEO Performance**: Rank for AI tools directory keywords

## 🏗️ Component Structure

### Header Navigation
**Component**: `components/layout/Navigation.tsx`
**Location**: Fixed at top, 64px height

**Elements**:
- Mode Collapse logo (left)
- Navigation menu: Tools, Submit Tool, About (center)
- Mobile hamburger menu (responsive)

**Styling**:
- Dark purple background with subtle transparency
- Electric blue accent on hover states
- Smooth transitions and animations

### Hero Section  
**Component**: `components/layout/HeroSection.tsx`
**Location**: Above the fold, ~400px height

**Content**:
- **Headline**: "Escape the Algorithmic Trance"
- **Subheading**: "Consciousness-expanding AI tools, curated by humans who understand AI mastery"
- **CTA Button**: "Explore Tools" → `/tools`

**Visual Design**:
- Gradient background with subtle animation
- Typography: Bold, high-contrast white text
- Button: Electric blue with glow effect

### Live Search Bar
**Component**: `components/tools/ToolSearchBar.tsx`
**Location**: Below hero, prominent placement

**Functionality**:
- Real-time search across tool names, descriptions, tags
- Debounced input (300ms delay)
- Display results in grid below
- Clear search functionality

**Implementation**:
```typescript
const [query, setQuery] = useState('');
const [results, setResults] = useState<Tool[]>([]);

// Debounced search effect
useEffect(() => {
  const timer = setTimeout(() => {
    if (query.trim()) {
      setResults(searchTools(query));
    } else {
      setResults([]);
    }
  }, 300);
  return () => clearTimeout(timer);
}, [query]);
```

### Google I/O Featured Section
**Component**: `components/layout/GoogleIOSection.tsx`
**Location**: After search, premium placement

**Content**:
- **Section Title**: "Google I/O 2025 Highlights"
- **Featured Tools**: 4 premium tools in 2x2 grid
- **Tool Cards**: Enhanced with "Featured" badge

**Tools Displayed**:
1. Gemini AI Mode
2. Veo 3 
3. NotebookLM Plus
4. Project Mariner

**Styling**:
- Distinct section with border/gradient
- Larger tool cards with enhanced hover effects
- Gold "Featured" badges

### Featured Tools Grid
**Component**: `components/layout/FeaturedToolsGrid.tsx`
**Location**: Main content area

**Content**:
- **Section Title**: "Editor's Picks"
- **Tool Grid**: 8-12 curated tools
- **Load More**: Pagination or infinite scroll

**Grid Layout**:
- Desktop: 4 columns
- Tablet: 2-3 columns  
- Mobile: 1 column
- Consistent spacing and alignment

### Submit Tool CTA
**Component**: `components/SubmitToolCTA.tsx`
**Location**: Between featured tools and footer

**Content**:
- **Headline**: "Know a consciousness-expanding tool?"
- **Description**: "Help fellow AI practitioners discover powerful tools"
- **CTA Button**: "Submit Tool" → `/submit-tool`

**Design**:
- Contrasting background section
- Centered content with clear hierarchy
- Prominent call-to-action button

### Footer
**Component**: `components/layout/Footer.tsx`
**Location**: Bottom of page

**Content**:
- **Brand**: Mode Collapse logo and tagline
- **Links**: Tools, Submit, About, Contact
- **Social**: Links to community channels
- **Legal**: Privacy, Terms (if applicable)

## 🎨 Visual Design Requirements

### Color Palette
- **Background**: Deep purple (#1a0b2e)
- **Primary**: Electric blue (#00d9ff)
- **Accent**: Neon magenta (#ff0080)
- **Text**: High contrast whites and grays
- **Consciousness**: Gold/yellow for ratings

### Typography
- **Headlines**: Bold, 32-48px, high contrast
- **Subheadings**: Medium, 18-24px
- **Body**: Regular, 16px, readable
- **Code/Technical**: Monospace font

### Interactive Elements
- **Hover Effects**: Scale 105%, color transitions
- **Animations**: Subtle, performance-conscious
- **Loading States**: Skeleton screens, smooth transitions
- **Focus States**: Keyboard navigation support

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px (1-column layout)
- **Tablet**: 768px - 1024px (2-column layout)
- **Desktop**: > 1024px (3-4 column layout)

### Mobile Optimizations
- Hamburger navigation menu
- Touch-friendly button sizes (44px minimum)
- Optimized image loading and sizing
- Simplified animations for performance

## ⚡ Performance Requirements

### Core Web Vitals
- **LCP**: < 2.5 seconds (hero section)
- **FID**: < 100ms (interactive elements)
- **CLS**: < 0.1 (stable layout)

### Optimization Strategies
- Image optimization with Next.js Image component
- Static generation for tool data
- Critical CSS inlining
- Lazy loading for below-fold content

## 🔍 SEO Requirements

### Meta Tags
```html
<title>Mode Collapse - AI Tools Directory | Consciousness-Expanding AI</title>
<meta name="description" content="Discover consciousness-expanding AI tools curated by experts. Break free from algorithmic feeds with our premium AI tools directory." />
<meta name="keywords" content="AI tools, artificial intelligence, AI directory, consciousness, productivity" />
```

### Structured Data
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Mode Collapse",
  "description": "AI Tools Directory",
  "url": "https://modecollapse.ai"
}
```

### Open Graph
```html
<meta property="og:title" content="Mode Collapse - AI Tools Directory" />
<meta property="og:description" content="Consciousness-expanding AI tools curated by experts" />
<meta property="og:image" content="/og-image.png" />
<meta property="og:type" content="website" />
```

## 🧪 Testing Requirements

### Functionality Tests
- Search functionality with various queries
- Navigation between sections
- Responsive layout across devices
- Tool card interactions and hover states
- Form submission flow (submit tool CTA)

### Performance Tests
- Page load speed across devices
- Image loading and optimization
- JavaScript bundle size analysis
- Lighthouse audit scores

### Accessibility Tests
- Keyboard navigation support
- Screen reader compatibility
- Color contrast ratios
- Focus management and indicators

## 📊 Analytics Requirements

### Key Metrics
- **Page Views**: Homepage traffic
- **Search Queries**: Popular search terms
- **Tool Clicks**: Which tools get clicked
- **CTA Clicks**: Submit tool button clicks
- **Scroll Depth**: User engagement levels

### Implementation
```typescript
// Track search queries
const trackSearch = (query: string) => {
  analytics.track('Search', {
    query,
    timestamp: new Date().toISOString()
  });
};

// Track tool clicks
const trackToolClick = (toolSlug: string) => {
  analytics.track('Tool Click', {
    tool: toolSlug,
    location: 'homepage'
  });
};
```

## 🚀 Future Enhancements

### Phase 2 Features
- **Personalization**: Recommended tools based on usage
- **User Accounts**: Save favorites and bookmarks
- **Advanced Filters**: Category, rating, date filters
- **Tool Comparison**: Side-by-side tool comparison

### Phase 3 Features
- **Community Features**: User reviews and ratings
- **Tool Collections**: Curated tool bundles
- **API Access**: Developer API for tool data
- **Premium Features**: Advanced analytics, early access