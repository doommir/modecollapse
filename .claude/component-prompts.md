# Component Development Prompts

## 🧩 Component Creation Prompt

```
Create a [COMPONENT_TYPE] component for Mode Collapse with the following requirements:

**Component Purpose**: [DESCRIPTION]

**Technical Requirements**:
- TypeScript with proper interfaces from types/index.ts
- TailwindCSS styling with cyberpunk dark theme
- Responsive design (mobile-first)
- Use Shadcn/ui components where applicable
- Include loading states and error handling

**Visual Design**:
- Dark purple background (#1a0b2e) with electric blue (#00d9ff) and magenta (#ff0080) accents
- Hover effects with scale transforms (105%)
- Smooth transitions (200ms duration)
- Consistent spacing and typography

**Functionality**:
[SPECIFIC_REQUIREMENTS]

**File Location**: components/[CATEGORY]/[ComponentName].tsx

Please include:
1. TypeScript interface definitions
2. Responsive className patterns using cn() utility
3. Error boundaries and loading states
4. Accessibility considerations (ARIA labels, keyboard navigation)
5. Performance optimizations (memoization if needed)

Follow the existing component patterns in the codebase, especially ToolCard.tsx and Navigation.tsx for styling consistency.
```

## 🔍 Search Feature Prompt

```
Implement a search feature for Mode Collapse with these specifications:

**Search Scope**: Tool names, descriptions, tags, and curator notes
**Performance**: Real-time search with 300ms debouncing
**UI**: Clean input field with search icon and clear button
**Results**: Highlight matching terms in results

**Technical Implementation**:
- Use React hooks (useState, useEffect, useMemo)
- Implement debouncing to prevent excessive API calls
- Include search analytics tracking
- Support keyboard shortcuts (Cmd/Ctrl + K to focus)

**Visual Design**:
- Consistent with cyberpunk theme
- Subtle glow effect on focus
- Loading spinner during search
- Empty state for no results

**Code Pattern**:
```typescript
const [query, setQuery] = useState('');
const [results, setResults] = useState<Tool[]>([]);

const debouncedSearch = useMemo(
  () => debounce((searchQuery: string) => {
    // Search implementation
  }, 300),
  []
);
```

Include proper TypeScript types and follow the existing search patterns in ToolSearchBar.tsx.
```

## 📱 Responsive Component Prompt

```
Make this component fully responsive for Mode Collapse:

**Breakpoints**:
- Mobile: < 640px (sm)
- Tablet: 640px - 1024px (md/lg)
- Desktop: > 1024px (xl)

**Mobile Optimizations**:
- Touch-friendly buttons (44px minimum)
- Simplified layouts and reduced content density
- Drawer/sheet components for complex interactions
- Optimized image loading

**Tablet Optimizations**:
- 2-3 column layouts
- Balanced content density
- Hover states for touch devices

**Desktop Optimizations**:
- Full feature set with hover effects
- Multi-column layouts
- Advanced interactions

**TailwindCSS Pattern**:
```css
.responsive-component {
  @apply flex flex-col gap-4;
  @apply md:flex-row md:gap-6;
  @apply lg:gap-8;
}
```

Test across all breakpoints and ensure consistent brand aesthetics on all devices.
```

## 🎨 Styling & Theme Prompt

```
Apply Mode Collapse's cyberpunk theme to this component:

**Color Palette**:
- Background: Deep purple (#1a0b2e / bg-gray-950)
- Primary: Electric blue (#00d9ff / text-blue-400)
- Accent: Neon magenta (#ff0080 / text-pink-500)
- Text: High contrast whites and light grays
- Borders: Subtle blue/purple with opacity

**Visual Effects**:
- Subtle gradients for depth
- Glow effects on interactive elements
- Scale transforms on hover (transform-scale-105)
- Smooth transitions (transition-all duration-200)

**Component Styling Pattern**:
```css
.cyberpunk-component {
  @apply bg-gray-900/50 backdrop-blur border border-blue-500/20;
  @apply rounded-xl p-6;
  @apply hover:border-blue-400/40 hover:shadow-lg hover:shadow-blue-500/10;
  @apply transition-all duration-200;
}
```

**Interactive States**:
- Hover: Subtle glow and scale increase
- Focus: Electric blue ring
- Active: Slight scale decrease
- Disabled: Reduced opacity and no interactions

Use the cn() utility for className composition and follow existing component patterns for consistency.
```

## 🔄 Integration Prompt

```
Integrate this component with Mode Collapse's data systems:

**Airtable Integration** (if applicable):
- Use functions from lib/airtable.ts
- Handle loading states and errors gracefully
- Implement proper TypeScript typing for API responses

**n8n Webhook Integration** (if applicable):
- Use postToWebhook function from lib/postToWebhook.ts
- Include proper error handling and user feedback
- Track submission metrics

**Local Data Integration**:
- Use tools data from lib/tools.ts
- Implement proper filtering and search functions
- Follow existing data access patterns

**Code Pattern**:
```typescript
import { Tool } from '@/types';
import { getToolBySlug, searchTools } from '@/lib/tools';

// For API integrations
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

const handleSubmit = async (data: FormData) => {
  try {
    setLoading(true);
    await postToWebhook(data);
    // Success handling
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

Include proper error boundaries and loading states for all external integrations.
```

## 🧪 Testing Prompt

```
Add comprehensive testing for this Mode Collapse component:

**Test Categories**:
1. **Functionality Tests**: Core component behavior
2. **Integration Tests**: API calls and data flow
3. **Accessibility Tests**: Screen readers, keyboard navigation
4. **Performance Tests**: Rendering speed, memory usage
5. **Visual Tests**: Responsive design, theme consistency

**Test Implementation**:
```typescript
// Example test structure
describe('ComponentName', () => {
  it('renders with required props', () => {
    // Test basic rendering
  });
  
  it('handles user interactions correctly', () => {
    // Test click events, form submissions, etc.
  });
  
  it('displays loading and error states', () => {
    // Test async state handling
  });
  
  it('is accessible via keyboard navigation', () => {
    // Test tab order, ARIA labels, focus management
  });
  
  it('responds to different screen sizes', () => {
    // Test responsive behavior
  });
});
```

**Manual Testing Checklist**:
- [ ] Component renders correctly on all screen sizes
- [ ] All interactive elements respond appropriately
- [ ] Loading states display during async operations
- [ ] Error states provide clear user feedback
- [ ] Keyboard navigation works properly
- [ ] Colors and contrast meet accessibility standards

Include edge cases like empty data, network failures, and unusual user inputs.
```

## 🚀 Performance Prompt

```
Optimize this Mode Collapse component for performance:

**React Optimizations**:
- Use React.memo for components that re-render frequently
- Implement useMemo for expensive calculations
- Use useCallback for event handlers passed as props
- Lazy load components that aren't immediately visible

**Code Pattern**:
```typescript
import React, { memo, useMemo, useCallback } from 'react';

const OptimizedComponent = memo(({ tools, onToolClick }) => {
  const filteredTools = useMemo(() => {
    return tools.filter(/* expensive filtering logic */);
  }, [tools, /* other dependencies */]);
  
  const handleClick = useCallback((tool) => {
    onToolClick(tool);
  }, [onToolClick]);
  
  return (
    // Component JSX
  );
});
```

**Image Optimizations**:
- Use Next.js Image component with proper sizing
- Implement lazy loading for images below the fold
- Include blur placeholders for smooth loading
- Optimize image formats (WebP, AVIF when supported)

**Bundle Optimizations**:
- Dynamic imports for code splitting
- Tree-shaking compatible exports
- Minimal dependency usage

**Performance Monitoring**:
- Add performance marks for key interactions
- Monitor render times and memory usage
- Test with React DevTools Profiler

Aim for < 100ms interaction response times and minimal layout shifts.
```

## 📝 Documentation Prompt

```
Create comprehensive documentation for this Mode Collapse component:

**Documentation Structure**:

### Component Overview
- Purpose and use cases
- Visual examples or screenshots
- Integration points with other components

### API Reference
```typescript
interface ComponentProps {
  // Document all props with descriptions
  requiredProp: string;        // Required prop description
  optionalProp?: boolean;      // Optional prop description
  onEvent?: (data: T) => void; // Event handler description
}
```

### Usage Examples
```typescript
// Basic usage
<ComponentName requiredProp="value" />

// Advanced usage with all props
<ComponentName
  requiredProp="value"
  optionalProp={true}
  onEvent={(data) => console.log(data)}
/>

// Integration with other components
<ParentComponent>
  <ComponentName />
</ParentComponent>
```

### Styling Customization
- Available CSS classes and their purposes
- Theming options and custom styles
- Responsive behavior documentation

### Accessibility Features
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility

### Performance Considerations
- Rendering optimization notes
- Memory usage characteristics
- Best practices for integration

Update the component documentation in ai-docs/custom-patterns.md with this information.
```