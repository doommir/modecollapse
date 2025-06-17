# Submit Tool Flow Specification

## 📋 Overview
The Submit Tool flow enables community-driven tool submissions through a comprehensive form that integrates with n8n automation for processing and review.

## 🎯 Objectives
- **Community Engagement**: Enable users to contribute valuable tools
- **Quality Control**: Ensure submitted tools meet curation standards
- **Automation**: Streamline review and approval process
- **User Experience**: Simple, intuitive submission process

## 🔄 User Flow

### 1. Discovery Phase
**Entry Points**:
- Homepage CTA button "Submit Tool"
- Navigation menu "Submit Tool" link
- Footer "Submit" link
- Direct URL: `/submit-tool`

### 2. Form Completion
**Location**: `/submit-tool` page
**Component**: `components/forms/ToolSubmitForm.tsx`

**Required Fields**:
- Tool Name
- Tool URL
- Short Description (50-200 characters)
- Detailed Description (200-1000 characters)
- Category Tags (multi-select)
- Submitter Email

**Optional Fields**:
- Consciousness Rating (1-5 estimate)
- Why this tool is valuable
- Personal experience/use case
- Additional notes for reviewers

### 3. Validation & Submission
**Client-Side Validation**:
- URL format validation
- Character count limits
- Required field checks
- Email format validation

**Server-Side Processing**:
- Sanitize all inputs
- Verify URL accessibility
- Check for duplicate submissions
- Rate limiting by IP/email

### 4. Automation Workflow
**n8n Webhook Processing**:
1. Receive form data
2. Screenshot capture attempt
3. Store in review queue (Airtable)
4. Send confirmation email
5. Notify administrators

### 5. Confirmation
**Success State**:
- Thank you message
- Expected review timeline
- Email confirmation sent
- Option to submit another tool

## 🏗️ Technical Implementation

### Form Component Structure
**File**: `components/forms/ToolSubmitForm.tsx`

```typescript
interface ToolSubmissionData {
  toolName: string;
  toolUrl: string;
  shortDescription: string;
  detailedDescription: string;
  tags: string[];
  submitterEmail: string;
  consciousnessRating?: number;
  valueProposition?: string;
  personalExperience?: string;
  reviewerNotes?: string;
}
```

### Validation Schema
```typescript
import * as z from 'zod';

const submitToolSchema = z.object({
  toolName: z.string()
    .min(1, 'Tool name is required')
    .max(100, 'Tool name must be under 100 characters'),
  
  toolUrl: z.string()
    .url('Must be a valid URL')
    .refine(url => url.startsWith('http'), 'URL must start with http:// or https://'),
  
  shortDescription: z.string()
    .min(50, 'Short description must be at least 50 characters')
    .max(200, 'Short description must be under 200 characters'),
  
  detailedDescription: z.string()
    .min(200, 'Detailed description must be at least 200 characters')
    .max(1000, 'Detailed description must be under 1000 characters'),
  
  tags: z.array(z.string())
    .min(1, 'Select at least one tag')
    .max(5, 'Select no more than 5 tags'),
  
  submitterEmail: z.string()
    .email('Must be a valid email address'),
  
  consciousnessRating: z.number()
    .min(1)
    .max(5)
    .optional(),
  
  valueProposition: z.string()
    .max(500, 'Value proposition must be under 500 characters')
    .optional(),
  
  personalExperience: z.string()
    .max(500, 'Personal experience must be under 500 characters')
    .optional(),
  
  reviewerNotes: z.string()
    .max(300, 'Reviewer notes must be under 300 characters')
    .optional()
});
```

### API Route Implementation
**File**: `app/api/submit-tool/route.ts`

```typescript
export async function POST(request: Request) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = submitToolSchema.parse(body);
    
    // Rate limiting check
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(clientIP)) {
      return Response.json(
        { error: 'Too many submissions. Please wait before submitting again.' },
        { status: 429 }
      );
    }
    
    // Check for duplicate submissions
    const isDuplicate = await checkDuplicateSubmission(validatedData.toolUrl);
    if (isDuplicate) {
      return Response.json(
        { error: 'This tool has already been submitted.' },
        { status: 409 }
      );
    }
    
    // Send to n8n webhook
    await postToWebhook({
      ...validatedData,
      submissionDate: new Date().toISOString(),
      status: 'pending',
      source: 'website_form'
    });
    
    return Response.json({
      success: true,
      message: 'Tool submitted successfully! We\'ll review it and get back to you.'
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('Tool submission error:', error);
    return Response.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
```

## 🎨 UI/UX Design

### Form Layout
**Desktop Layout**:
- Two-column form with logical grouping
- Progress indicator (if multi-step)
- Real-time validation feedback
- Character counters for text fields

**Mobile Layout**:
- Single-column stacked layout
- Larger touch targets (44px minimum)
- Collapsible sections for organization
- Fixed submit button at bottom

### Visual Design Elements
```css
/* Form styling patterns */
.submit-form {
  @apply max-w-4xl mx-auto p-8;
  @apply bg-gray-900/50 backdrop-blur rounded-xl;
  @apply border border-blue-500/20;
}

.form-section {
  @apply mb-8 p-6;
  @apply border-l-2 border-blue-500/30;
  @apply bg-gray-800/30 rounded-lg;
}

.form-field {
  @apply mb-6;
}

.form-label {
  @apply block text-sm font-medium text-gray-200 mb-2;
}

.form-input {
  @apply w-full px-4 py-3;
  @apply bg-gray-800 border border-gray-600;
  @apply rounded-lg text-white;
  @apply focus:border-blue-500 focus:ring-1 focus:ring-blue-500;
  @apply transition-colors duration-200;
}

.form-error {
  @apply text-red-400 text-sm mt-1;
}

.character-counter {
  @apply text-xs text-gray-400 mt-1;
}

.submit-button {
  @apply w-full py-4 px-6;
  @apply bg-gradient-to-r from-blue-500 to-purple-600;
  @apply text-white font-semibold rounded-lg;
  @apply hover:from-blue-600 hover:to-purple-700;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
  @apply transition-all duration-200;
}
```

### Interactive Elements
- **Tag Selection**: Multi-select with visual pills
- **URL Validation**: Real-time check with loading indicator
- **Character Counters**: Live updates for text fields
- **Preview Mode**: Optional tool preview before submission
- **Auto-save**: Draft saving to localStorage

## 🔧 Backend Processing

### n8n Workflow Steps
1. **Receive Webhook**: Parse incoming form data
2. **Data Validation**: Server-side validation and sanitization
3. **Duplicate Check**: Query existing tools database
4. **URL Verification**: Check if tool URL is accessible
5. **Screenshot Capture**: Automated screenshot generation
6. **Image Processing**: Resize and optimize images
7. **Database Insert**: Add to Airtable review queue
8. **Email Notifications**: Confirmation and admin alerts
9. **Slack Notification**: Alert review team (optional)

### Airtable Integration
**Table**: "Tool Submissions"
**Status Flow**: pending → reviewing → approved/rejected

| Field | Type | Purpose |
|-------|------|---------|
| `submissionId` | Auto-number | Unique identifier |
| `toolName` | Single line text | Tool name |
| `toolUrl` | URL | Tool website |
| `shortDescription` | Single line text | Brief summary |
| `detailedDescription` | Long text | Full description |
| `tags` | Multiple select | Category tags |
| `submitterEmail` | Email | Contact information |
| `consciousnessRating` | Number | Submitter's rating |
| `valueProposition` | Long text | Why it's valuable |
| `personalExperience` | Long text | User experience |
| `reviewerNotes` | Long text | Internal notes |
| `screenshotUrl` | URL | Generated screenshot |
| `status` | Single select | pending/reviewing/approved/rejected |
| `submissionDate` | Date | When submitted |
| `reviewDate` | Date | When reviewed |
| `reviewer` | Single line text | Who reviewed |
| `rejectionReason` | Long text | If rejected, why |

## 📧 Email Communications

### Confirmation Email (Immediate)
**Subject**: "Tool Submission Received - Mode Collapse"

**Content**:
```
Hi there!

Thanks for submitting [Tool Name] to Mode Collapse. 

We've received your submission and our team will review it within 3-5 business days. We'll email you once we've made a decision.

What happens next:
• Our team tests and evaluates the tool
• We capture a screenshot and write editorial notes
• If approved, your tool goes live on modecollapse.ai
• If we need more info, we'll reach out

Thanks for helping expand consciousness in the AI space!

The Mode Collapse Team
```

### Approval Email
**Subject**: "Your Tool Submission is Live! - Mode Collapse"

### Rejection Email  
**Subject**: "Tool Submission Update - Mode Collapse"

## 🧪 Testing Strategy

### Form Validation Tests
- Required field validation
- URL format validation
- Character limit enforcement
- Email format validation
- Tag selection limits

### Integration Tests
- API endpoint functionality
- n8n webhook processing
- Airtable data insertion
- Email delivery
- Screenshot generation

### User Experience Tests
- Form completion flow
- Error message clarity
- Mobile responsiveness
- Loading states and feedback
- Success/failure scenarios

### Security Tests
- Input sanitization
- Rate limiting effectiveness
- CSRF protection
- SQL injection prevention
- XSS vulnerability scanning

## 📊 Success Metrics

### Submission Metrics
- **Submission Rate**: Forms completed vs. started
- **Approval Rate**: Submissions approved vs. total
- **Time to Review**: Average review turnaround
- **Quality Score**: Approved tools' consciousness ratings

### User Experience Metrics
- **Form Abandonment**: Where users drop off
- **Validation Errors**: Most common field errors
- **Mobile vs. Desktop**: Completion rates by device
- **Return Submissions**: Users who submit multiple tools

### Technical Metrics
- **API Response Times**: Form submission performance
- **Error Rates**: Failed submissions and reasons
- **Screenshot Success**: Automated capture success rate
- **Email Delivery**: Notification delivery rates

## 🚀 Future Enhancements

### Phase 2 Features
- **Bulk Submissions**: CSV upload for multiple tools
- **Draft Saving**: Auto-save form progress
- **Submission History**: User account with submission tracking
- **Preview Mode**: Live preview of tool card before submission

### Phase 3 Features
- **Collaborative Review**: Community voting on submissions
- **AI-Assisted Screening**: Automated initial review
- **Integration Partnerships**: Direct submissions from tool makers
- **Submission Analytics**: Detailed insights for submitters