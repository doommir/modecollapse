# Third-Party API Documentation

## =Ä Airtable CMS API

### Configuration
**Base URL**: `https://api.airtable.com/v0/{BASE_ID}`
**Authentication**: Bearer token in headers

**Environment Variables**:
```bash
AIRTABLE_API_KEY=your_api_key_here
AIRTABLE_BASE_ID=your_base_id_here
AIRTABLE_TABLE_NAME=Tools
```

### Table Schema
**Table**: "Tools"

| Field Name | Type | Description |
|------------|------|-------------|
| `name` | Single line text | Tool name |
| `slug` | Single line text | URL-friendly identifier |
| `summary` | Single line text | Brief description |
| `description` | Long text | Detailed description |
| `url` | URL | Tool website |
| `tags` | Multiple select | Category tags |
| `consciousnessScore` | Number | 1-5 rating |
| `curatorNote` | Long text | Editorial commentary |
| `featured` | Checkbox | Homepage featured |
| `screenshotUrl` | URL | Preview image |
| `dateAdded` | Date | Submission date |
| `status` | Single select | pending/approved/rejected |

### API Operations

#### Fetch All Tools
```typescript
// GET request to fetch approved tools
const url = `https://api.airtable.com/v0/${BASE_ID}/Tools?filterByFormula=AND({status}='approved')`;

const response = await fetch(url, {
  headers: {
    'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
```

#### Create New Tool
```typescript
// POST request to add new tool
const url = `https://api.airtable.com/v0/${BASE_ID}/Tools`;

const response = await fetch(url, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    fields: {
      name: 'New Tool',
      slug: 'new-tool',
      summary: 'Brief description',
      url: 'https://example.com',
      status: 'pending'
    }
  })
});
```

### Rate Limits
- **Standard**: 5 requests per second
- **Enterprise**: Higher limits available
- **Recommendation**: Implement exponential backoff

### Error Handling
```typescript
interface AirtableError {
  error: {
    type: string;
    message: string;
  };
}

// Common error responses
// 401: Invalid API key
// 404: Base or table not found
// 422: Invalid request format
// 429: Rate limit exceeded
```

## = n8n Webhook API

### Webhook Configuration
**URL**: Environment variable `N8N_WEBHOOK_URL`
**Method**: POST
**Content-Type**: application/json

### Request Payload
```typescript
interface WebhookPayload {
  toolName: string;
  toolUrl: string;
  description: string;
  submitterEmail?: string;
  tags: string[];
  requestedBy: 'form' | 'api' | 'admin';
  timestamp: string;
}
```

### Workflow Steps
1. **Validation**: Check required fields and URL format
2. **Screenshot**: Navigate to URL and capture image
3. **Processing**: Resize and optimize screenshot
4. **Storage**: Save to `/public/screenshots/` or cloud storage
5. **Database**: Add tool record to Airtable
6. **Notification**: Send confirmation email (optional)

### Response Format
```typescript
interface WebhookResponse {
  success: boolean;
  toolId?: string;
  screenshotUrl?: string;
  error?: string;
  processingTime: number;
}
```

### Error Scenarios
- **Invalid URL**: Tool URL not accessible
- **Screenshot Failed**: Page load timeout or errors
- **Storage Error**: Unable to save image file
- **Database Error**: Airtable write failure

## =¼ Screenshot Service (Puppeteer)

### Configuration
**Engine**: Puppeteer via n8n workflow
**Viewport**: 1200x800 (desktop)
**Format**: PNG ’ optimized JPEG
**Timeout**: 10 seconds

### Screenshot Parameters
```typescript
interface ScreenshotConfig {
  url: string;
  width: 1200;
  height: 800;
  format: 'jpeg';
  quality: 80;
  fullPage: boolean;
  delay: number; // Wait time after load
}
```

### Optimization Process
1. **Capture**: Full page screenshot at 1200x800
2. **Crop**: Focus on main content area
3. **Resize**: Scale to 400x240 for thumbnails
4. **Compress**: JPEG quality 80 for web optimization
5. **Fallback**: Generate placeholder if capture fails

### Usage in Components
```typescript
// Graceful fallback system
const getImageSrc = (tool: Tool): string => {
  if (tool.screenshotUrl) return tool.screenshotUrl;
  return '/placeholder.svg';
};

// Error handling for broken images
const [imageError, setImageError] = useState(false);

<Image
  src={imageError ? '/placeholder.svg' : getImageSrc(tool)}
  onError={() => setImageError(true)}
  alt={tool.name}
/>
```

## =ç Email Notifications (Optional)

### SMTP Configuration
**Service**: SendGrid, Resend, or SMTP
**Templates**: HTML email templates
**Triggers**: Tool submission, approval, rejection

### Email Types
1. **Submission Confirmation**: Sent to tool submitter
2. **Admin Notification**: New tool pending review
3. **Approval Notification**: Tool approved and live
4. **Rejection Notification**: Tool rejected with reason

## = Search Enhancement APIs

### Algolia (Future Enhancement)
**Use Case**: Advanced search with typo tolerance
**Features**: Faceted search, analytics, personalization

### Elasticsearch (Alternative)
**Use Case**: Self-hosted search solution
**Features**: Full-text search, aggregations, real-time

## =Ê Analytics APIs

### Vercel Analytics
**Built-in**: Page views, unique visitors
**Custom Events**: Tool clicks, search queries

### Google Analytics (Optional)
**Events**: Tool interactions, form submissions
**Goals**: Conversion tracking for tool submissions

## = Authentication APIs (Future)

### NextAuth.js
**Providers**: Google, GitHub, email
**Database**: User accounts and preferences
**Features**: Tool bookmarks, personal recommendations

### API Routes Structure
```typescript
// /api/auth/[...nextauth].ts
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    session: async ({ session, token }) => {
      // Custom session data
    }
  }
});
```

## =á Security Considerations

### API Key Management
- Store in environment variables
- Rotate keys regularly
- Use different keys for dev/prod

### Rate Limiting
```typescript
// Simple rate limiting for API routes
const rateLimiter = new Map();

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 10;
  
  const requests = rateLimiter.get(ip) || [];
  const validRequests = requests.filter(time => now - time < windowMs);
  
  if (validRequests.length >= maxRequests) {
    return false; // Rate limited
  }
  
  validRequests.push(now);
  rateLimiter.set(ip, validRequests);
  return true; // Allow request
}
```

### Input Validation
```typescript
// Sanitize user inputs before API calls
import DOMPurify from 'isomorphic-dompurify';

export function sanitizeInput(input: string): string {
  return DOMPurify.sanitize(input.trim());
}

// Validate URLs before screenshot capture
export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}
```