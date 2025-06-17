# Debugging Guide for Mode Collapse

## 🔧 Quick Debugging Checklist

### Before You Start
- [ ] Check browser console for errors
- [ ] Verify Node.js version (18+) and package versions
- [ ] Ensure environment variables are set correctly
- [ ] Clear browser cache and restart dev server

### Common Issues Quick Fixes
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Type check
npm run typecheck

# Lint check
npm run lint

# Build check
npm run build
```

## 🐛 TypeScript Debugging

### Type Errors
**Common Issue**: `Property 'X' does not exist on type 'Y'`

**Solution Pattern**:
```typescript
// Check type definitions in types/index.ts
interface Tool {
  slug: string;
  name: string;
  // ... ensure all properties are defined
}

// Use type assertion if needed (sparingly)
const tool = data as Tool;

// Better: Use type guards
function isTool(obj: any): obj is Tool {
  return obj && typeof obj.slug === 'string' && typeof obj.name === 'string';
}
```

### Import Errors
**Common Issue**: Module not found or path resolution

**Debug Steps**:
1. Check `tsconfig.json` path mappings:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./"]
    }
  }
}
```

2. Verify file extensions (.ts, .tsx)
3. Check if file exists at expected path
4. Restart TypeScript server in VS Code (Cmd+Shift+P → "TypeScript: Restart TS Server")

## ⚛️ React Component Debugging

### Component Not Rendering
**Debug Steps**:
```typescript
// Add console logs to track component lifecycle
const ComponentName = ({ prop1, prop2 }) => {
  console.log('Component rendering with props:', { prop1, prop2 });
  
  // Check if conditional rendering is blocking
  if (!prop1) {
    console.log('Prop1 is missing, component will not render');
    return null;
  }
  
  return <div>Content</div>;
};
```

### State Not Updating
**Common Issues**:
```typescript
// ❌ Mutating state directly
const [tools, setTools] = useState([]);
tools.push(newTool); // This won't trigger re-render

// ✅ Creating new state
setTools(prevTools => [...prevTools, newTool]);

// ❌ Object mutation
const [tool, setTool] = useState(initialTool);
tool.name = 'New Name'; // Won't trigger re-render

// ✅ Creating new object
setTool(prevTool => ({ ...prevTool, name: 'New Name' }));
```

### Infinite Re-renders
**Common Cause**: Missing dependencies in useEffect

```typescript
// ❌ Missing dependency
useEffect(() => {
  fetchData(userId);
}, []); // userId should be in dependency array

// ✅ Correct dependencies
useEffect(() => {
  fetchData(userId);
}, [userId]);

// ❌ Object/function in dependency
const handleClick = () => { /* ... */ };
useEffect(() => {
  // This creates infinite loop
}, [handleClick]);

// ✅ Use useCallback
const handleClick = useCallback(() => {
  // Implementation
}, []);
```

## 🎨 Styling & CSS Debugging

### TailwindCSS Not Working
**Debug Steps**:
1. Check `tailwind.config.js` content paths:
```javascript
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ]
}
```

2. Verify class names are correct (no typos)
3. Check if custom classes are defined in `globals.css`
4. Restart dev server after config changes

### Responsive Design Issues
**Debug Tools**:
```typescript
// Add breakpoint indicator component for debugging
const BreakpointIndicator = () => (
  <div className="fixed top-0 left-0 z-50 bg-red-500 text-white p-2">
    <span className="sm:hidden">XS</span>
    <span className="hidden sm:inline md:hidden">SM</span>
    <span className="hidden md:inline lg:hidden">MD</span>
    <span className="hidden lg:inline xl:hidden">LG</span>
    <span className="hidden xl:inline">XL</span>
  </div>
);
```

### CSS Specificity Issues
**Debug Pattern**:
```css
/* Use CSS custom properties for debugging */
.debug-component {
  border: 2px solid red !important;
  background: yellow !important;
}

/* Check computed styles in DevTools */
/* Elements → Computed tab → Filter by property */
```

## 📡 API & Data Debugging

### Airtable API Issues
**Debug Steps**:
```typescript
// Add detailed logging
const fetchAirtableData = async () => {
  try {
    console.log('Fetching from Airtable...', {
      baseId: process.env.AIRTABLE_BASE_ID,
      hasApiKey: !!process.env.AIRTABLE_API_KEY
    });
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`
      }
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Parsed data:', data);
    return data;
    
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
```

### n8n Webhook Issues
**Debug Checklist**:
- [ ] Webhook URL is correct and accessible
- [ ] Request payload matches expected format
- [ ] Network tab shows request being sent
- [ ] n8n workflow is active and not erroring

```typescript
// Test webhook with curl
const testWebhook = async () => {
  const testData = {
    toolName: 'Test Tool',
    toolUrl: 'https://example.com',
    description: 'Test description'
  };
  
  try {
    const response = await fetch(process.env.N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });
    
    console.log('Webhook test result:', await response.text());
  } catch (error) {
    console.error('Webhook test failed:', error);
  }
};
```

## 📱 Performance Debugging

### Slow Page Load
**Debug Tools**:
```bash
# Analyze bundle size
npm run build
npm run analyze # if configured

# Check for large images
ls -la public/screenshots/

# Profile with React DevTools
# Install React Developer Tools browser extension
# Use Profiler tab to record renders
```

### Memory Leaks
**Common Causes**:
```typescript
// ❌ Not cleaning up event listeners
useEffect(() => {
  const handleScroll = () => { /* ... */ };
  window.addEventListener('scroll', handleScroll);
  // Missing cleanup!
}, []);

// ✅ Proper cleanup
useEffect(() => {
  const handleScroll = () => { /* ... */ };
  window.addEventListener('scroll', handleScroll);
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);

// ❌ Not cleaning up timers
useEffect(() => {
  const timer = setInterval(() => { /* ... */ }, 1000);
  // Missing cleanup!
}, []);

// ✅ Proper cleanup
useEffect(() => {
  const timer = setInterval(() => { /* ... */ }, 1000);
  
  return () => {
    clearInterval(timer);
  };
}, []);
```

## 🖼️ Image Loading Issues

### Images Not Displaying
**Debug Steps**:
```typescript
// Add error handling to Image components
const [imageError, setImageError] = useState(false);

<Image
  src={imageError ? '/placeholder.svg' : tool.screenshotUrl}
  alt={tool.name}
  onError={() => {
    console.error('Image failed to load:', tool.screenshotUrl);
    setImageError(true);
  }}
  onLoad={() => {
    console.log('Image loaded successfully:', tool.screenshotUrl);
  }}
/>
```

### Image Optimization Issues
**Check**:
- Image file paths are correct
- Images exist in `public/` directory
- Image formats are supported (jpg, png, webp)
- Next.js Image component props are correct

## 🔍 Search & Filter Debugging

### Search Not Working
**Debug Pattern**:
```typescript
const searchTools = (query: string, tools: Tool[]) => {
  console.log('Searching for:', query);
  console.log('In tools:', tools.length);
  
  const filtered = tools.filter(tool => {
    const matches = tool.name.toLowerCase().includes(query.toLowerCase());
    console.log(`${tool.name}: ${matches ? 'MATCH' : 'NO MATCH'}`);
    return matches;
  });
  
  console.log('Search results:', filtered.length);
  return filtered;
};
```

### Filter State Issues
**Debug State Changes**:
```typescript
const [filters, setFilters] = useState(initialFilters);

// Add logging to state updates
const updateFilters = (newFilters) => {
  console.log('Updating filters from:', filters);
  console.log('Updating filters to:', newFilters);
  setFilters(newFilters);
};

// Log when filters change
useEffect(() => {
  console.log('Filters changed:', filters);
}, [filters]);
```

## 🌐 Browser-Specific Issues

### Safari Issues
- Check for CSS flexbox/grid compatibility
- Test touch events on mobile Safari
- Verify WebP image support fallbacks

### Firefox Issues
- Check for CSS custom property support
- Test WebGL/Canvas features if used
- Verify font loading behavior

### Chrome DevTools Tips
```javascript
// Console debugging helpers
console.table(tools); // Display array as table
console.group('Tool Processing'); // Group related logs
console.time('search'); // Start performance timer
console.timeEnd('search'); // End performance timer

// Break on property changes
$0 // Reference to selected element
monitorEvents($0, 'click'); // Monitor specific events
```

## 🔄 Build & Deployment Issues

### Build Failures
**Common Issues**:
```bash
# TypeScript errors in build
npm run typecheck

# ESLint errors
npm run lint

# Missing environment variables
# Check .env.local exists and has required vars

# Memory issues during build
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

### Vercel Deployment Issues
**Debug Steps**:
1. Check build logs in Vercel dashboard
2. Verify environment variables are set in Vercel
3. Check function timeout limits
4. Verify file size limits aren't exceeded

## 📋 Debugging Workflow

### Systematic Approach
1. **Reproduce**: Consistently recreate the issue
2. **Isolate**: Identify minimal code that causes the problem
3. **Hypothesize**: Form theories about the cause
4. **Test**: Verify hypotheses with targeted changes
5. **Document**: Record solution for future reference

### Documentation Pattern
```markdown
## Bug: [Brief Description]

**Issue**: [Detailed description of the problem]

**Reproduction Steps**:
1. Navigate to /tools
2. Search for "ai"
3. Click on first result
4. Error occurs

**Expected Behavior**: Should navigate to tool detail page

**Actual Behavior**: Page crashes with TypeError

**Root Cause**: Missing null check for tool.screenshotUrl

**Solution**: Added optional chaining and fallback
```typescript
// Before
<Image src={tool.screenshotUrl} />

// After
<Image src={tool.screenshotUrl || '/placeholder.svg'} />
```

**Files Changed**: 
- components/tools/ToolCard.tsx

**Testing**: Verified with tools that have/don't have screenshots
```