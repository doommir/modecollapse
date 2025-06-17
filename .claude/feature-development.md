# Feature Development Prompts

## 🚀 New Feature Development Prompt

```
Develop a new feature for Mode Collapse with full implementation:

**Feature**: [FEATURE_NAME]
**Description**: [DETAILED_DESCRIPTION]

**Implementation Requirements**:

### 1. Planning Phase
- Create specification in `specs/[feature-name].md`
- Define user stories and acceptance criteria
- Identify integration points with existing code
- Plan database/data structure changes

### 2. Component Development
- Design component architecture
- Create TypeScript interfaces in `types/index.ts`
- Build React components following existing patterns
- Implement responsive design for all screen sizes

### 3. Integration Points
- Airtable CMS integration (if applicable)
- n8n webhook automation (if applicable)
- API routes in `app/api/`
- Data utilities in `lib/`

### 4. Testing Strategy
- Unit tests for components and utilities
- Integration tests for API endpoints
- Manual testing across devices
- Accessibility testing

### 5. Documentation
- Update `ai-docs/custom-patterns.md` with new patterns
- Add component documentation
- Update project overview if significant

**Technical Constraints**:
- Maintain cyberpunk dark theme consistency
- Ensure mobile-first responsive design
- Follow TypeScript best practices
- Use existing component patterns
- Optimize for Core Web Vitals

**File Structure**:
```
components/[feature]/
├── FeatureComponent.tsx
├── FeatureSubComponent.tsx
└── index.ts

lib/[feature].ts (utilities)
app/[feature]/ (pages if needed)
types/[feature].ts (if complex types)
```

Please provide complete implementation with proper error handling, loading states, and user feedback.
```

## 📊 Data Feature Prompt

```
Implement a data-driven feature for Mode Collapse:

**Data Requirements**:
- Source: [Airtable/Local/API]
- Structure: [Define data schema]
- Caching: [Strategy for performance]
- Real-time updates: [If applicable]

**Implementation Pattern**:

### 1. Data Layer
```typescript
// Define types
interface FeatureData {
  id: string;
  // ... other properties
}

// Create utilities
export async function getFeatureData(): Promise<FeatureData[]> {
  // Implementation with error handling
}

export function processFeatureData(data: FeatureData[]): ProcessedData {
  // Data transformation logic
}
```

### 2. React Integration
```typescript
const useFeatureData = () => {
  const [data, setData] = useState<FeatureData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Fetch and handle data
  }, []);
  
  return { data, loading, error, refetch };
};
```

### 3. Component Implementation
- Loading states with skeleton screens
- Error boundaries for graceful degradation
- Empty states with clear messaging
- Pagination or infinite scroll for large datasets

### 4. Performance Optimization
- Memoization for expensive calculations
- Virtual scrolling for large lists
- Image lazy loading
- Debounced search/filtering

**Integration with Existing Systems**:
- Use established patterns from `lib/tools.ts`
- Follow Airtable integration patterns
- Maintain consistency with search/filter systems
- Preserve existing component styling

Include comprehensive error handling and user feedback throughout the implementation.
```

## 🎨 UI/UX Feature Prompt

```
Create a new UI/UX feature for Mode Collapse:

**Feature**: [UI_FEATURE_NAME]
**User Experience Goal**: [UX_OBJECTIVE]

**Design Requirements**:

### 1. Visual Design
- Cyberpunk dark theme with electric blue/magenta accents
- Smooth animations and transitions (200ms)
- Hover effects and micro-interactions
- Consistent with existing component library

### 2. Responsive Behavior
```css
/* Mobile-first approach */
.feature-component {
  @apply flex flex-col gap-4;
  @apply md:flex-row md:gap-6;
  @apply lg:gap-8;
}
```

### 3. Accessibility
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast ratios (4.5:1 minimum)
- Focus management for modals/overlays

### 4. Interaction Patterns
- Touch-friendly on mobile (44px minimum targets)
- Progressive disclosure for complex interfaces
- Clear visual feedback for actions
- Consistent navigation patterns

**Component Architecture**:
```typescript
interface FeatureProps {
  // Define clear, minimal props
  data: FeatureData;
  onAction?: (action: ActionType) => void;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

const Feature: React.FC<FeatureProps> = ({
  data,
  onAction,
  variant = 'default',
  className
}) => {
  // Implementation with proper state management
  // Include loading, error, and success states
  // Use cn() utility for className composition
};
```

**Animation & Transitions**:
- Use Tailwind transition classes
- Implement enter/exit animations for dynamic content
- Consider reduced motion preferences
- Smooth page transitions

**Testing Requirements**:
- Cross-browser compatibility
- Touch device testing
- Keyboard-only navigation
- Screen reader testing with NVDA/VoiceOver

Ensure the feature enhances the overall user experience while maintaining the distinctive Mode Collapse aesthetic.
```

## 🔗 Integration Feature Prompt

```
Build a feature that integrates with Mode Collapse's external systems:

**Integration Type**: [Airtable/n8n/External API]
**Feature Purpose**: [INTEGRATION_GOAL]

**Implementation Requirements**:

### 1. API Integration Layer
```typescript
// Create dedicated service file
// lib/[service-name].ts

export interface ServiceConfig {
  apiKey: string;
  baseUrl: string;
  timeout: number;
}

export class ServiceIntegration {
  private config: ServiceConfig;
  
  constructor(config: ServiceConfig) {
    this.config = config;
  }
  
  async fetchData(): Promise<ServiceData[]> {
    // Implementation with proper error handling
    // Include retry logic for network failures
    // Add request/response logging
  }
  
  async submitData(data: SubmissionData): Promise<ServiceResponse> {
    // Implementation with validation
    // Include progress tracking if applicable
  }
}
```

### 2. Error Handling Strategy
```typescript
// Define custom error types
export class ServiceError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public retryable: boolean = false
  ) {
    super(message);
    this.name = 'ServiceError';
  }
}

// Implement retry logic
const retryWithBackoff = async (
  operation: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> => {
  // Exponential backoff implementation
};
```

### 3. State Management
```typescript
// Create custom hook for integration state
const useServiceIntegration = () => {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
    lastSynced: null
  });
  
  const sync = useCallback(async () => {
    // Sync logic with error handling
  }, []);
  
  return { ...state, sync };
};
```

### 4. User Interface
- Clear loading indicators during API calls
- Detailed error messages with retry options
- Success confirmations with next steps
- Progress indicators for long operations

### 5. Configuration & Environment
```typescript
// Environment variable validation
const validateConfig = () => {
  const required = ['API_KEY', 'BASE_URL'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};
```

**Security Considerations**:
- Never expose API keys in client-side code
- Validate all user inputs before API calls
- Implement rate limiting for API requests
- Use HTTPS for all external communications

**Testing Strategy**:
- Mock API responses for unit tests
- Integration tests with test environments
- Error scenario testing (network failures, invalid responses)
- Performance testing under load

Include comprehensive logging and monitoring for production debugging.
```

## 🔄 Workflow Automation Prompt

```
Create an automated workflow feature for Mode Collapse:

**Workflow**: [WORKFLOW_NAME]
**Trigger**: [USER_ACTION/SCHEDULE/EVENT]
**Outcome**: [AUTOMATED_RESULT]

**n8n Integration**:

### 1. Workflow Design
```json
{
  "workflow": {
    "name": "Feature Workflow",
    "nodes": [
      {
        "name": "Webhook Trigger",
        "type": "n8n-nodes-base.webhook",
        "parameters": {
          "path": "feature-webhook",
          "httpMethod": "POST"
        }
      },
      {
        "name": "Process Data",
        "type": "n8n-nodes-base.code",
        "parameters": {
          "jsCode": "// Processing logic"
        }
      }
    ]
  }
}
```

### 2. Webhook Integration
```typescript
// lib/workflow-webhook.ts
export interface WorkflowPayload {
  action: string;
  data: Record<string, any>;
  timestamp: string;
  userId?: string;
}

export async function triggerWorkflow(
  payload: WorkflowPayload
): Promise<WorkflowResponse> {
  const webhookUrl = process.env.N8N_WORKFLOW_WEBHOOK_URL;
  
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Source': 'mode-collapse'
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      throw new Error(`Workflow failed: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Workflow trigger failed:', error);
    throw error;
  }
}
```

### 3. UI Integration
```typescript
const WorkflowTrigger: React.FC<WorkflowTriggerProps> = ({
  onStart,
  onComplete,
  onError
}) => {
  const [status, setStatus] = useState<'idle' | 'running' | 'complete' | 'error'>('idle');
  
  const executeWorkflow = async () => {
    try {
      setStatus('running');
      onStart?.();
      
      const result = await triggerWorkflow({
        action: 'feature-action',
        data: workflowData,
        timestamp: new Date().toISOString()
      });
      
      setStatus('complete');
      onComplete?.(result);
    } catch (error) {
      setStatus('error');
      onError?.(error);
    }
  };
  
  return (
    <div className="workflow-trigger">
      <Button
        onClick={executeWorkflow}
        disabled={status === 'running'}
        className="relative"
      >
        {status === 'running' && <Spinner className="mr-2" />}
        {getStatusText(status)}
      </Button>
      
      {status === 'error' && (
        <Alert variant="destructive" className="mt-4">
          Workflow failed. Please try again.
        </Alert>
      )}
    </div>
  );
};
```

### 4. Progress Tracking
```typescript
// Optional: WebSocket connection for real-time updates
const useWorkflowProgress = (workflowId: string) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  
  useEffect(() => {
    // WebSocket or polling implementation
    // for real-time workflow progress
  }, [workflowId]);
  
  return { progress, currentStep };
};
```

**Workflow Steps Documentation**:
1. **Trigger**: User action or scheduled event
2. **Validation**: Input data validation and sanitization
3. **Processing**: Core workflow logic (screenshot, API calls, etc.)
4. **Storage**: Save results to appropriate systems
5. **Notification**: User feedback and admin alerts
6. **Cleanup**: Temporary file removal, cache clearing

**Error Handling & Recovery**:
- Implement retry logic for transient failures
- Provide clear error messages to users
- Log detailed error information for debugging
- Offer manual retry options for failed workflows

**Monitoring & Analytics**:
- Track workflow execution times
- Monitor success/failure rates
- Alert on unusual patterns or failures
- Provide workflow performance metrics

Include comprehensive testing for all workflow scenarios and edge cases.
```

## 📈 Analytics Feature Prompt

```
Implement an analytics feature for Mode Collapse:

**Analytics Type**: [USER_BEHAVIOR/PERFORMANCE/BUSINESS]
**Metrics**: [SPECIFIC_METRICS_TO_TRACK]

**Implementation Strategy**:

### 1. Event Tracking System
```typescript
// lib/analytics.ts
interface AnalyticsEvent {
  event: string;
  properties: Record<string, any>;
  timestamp: string;
  userId?: string;
  sessionId: string;
}

class Analytics {
  private events: AnalyticsEvent[] = [];
  
  track(event: string, properties: Record<string, any> = {}) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties,
      timestamp: new Date().toISOString(),
      sessionId: this.getSessionId()
    };
    
    this.events.push(analyticsEvent);
    this.sendEvent(analyticsEvent);
  }
  
  private async sendEvent(event: AnalyticsEvent) {
    // Send to analytics service (Vercel Analytics, Google Analytics, etc.)
  }
}

export const analytics = new Analytics();
```

### 2. React Hook Integration
```typescript
// hooks/useAnalytics.ts
export const useAnalytics = () => {
  const trackEvent = useCallback((event: string, properties?: Record<string, any>) => {
    analytics.track(event, properties);
  }, []);
  
  const trackPageView = useCallback((page: string) => {
    analytics.track('Page View', { page });
  }, []);
  
  const trackToolClick = useCallback((toolSlug: string, location: string) => {
    analytics.track('Tool Click', { tool: toolSlug, location });
  }, []);
  
  return { trackEvent, trackPageView, trackToolClick };
};
```

### 3. Component Integration
```typescript
// Automatic tracking in components
const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const { trackToolClick } = useAnalytics();
  
  const handleClick = () => {
    trackToolClick(tool.slug, 'homepage');
    // Navigate to tool page
  };
  
  return (
    <Card onClick={handleClick}>
      {/* Tool card content */}
    </Card>
  );
};
```

### 4. Dashboard Component (Optional)
```typescript
// components/analytics/AnalyticsDashboard.tsx
const AnalyticsDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchAnalyticsData().then(setMetrics);
  }, []);
  
  return (
    <div className="analytics-dashboard">
      <div className="metrics-grid">
        <MetricCard
          title="Page Views"
          value={metrics?.pageViews}
          change={metrics?.pageViewsChange}
        />
        <MetricCard
          title="Tool Clicks"
          value={metrics?.toolClicks}
          change={metrics?.toolClicksChange}
        />
        {/* More metrics */}
      </div>
      
      <div className="charts-section">
        <TimeSeriesChart data={metrics?.pageViewsOverTime} />
        <TopToolsChart data={metrics?.topTools} />
      </div>
    </div>
  );
};
```

**Key Metrics to Track**:
- **User Engagement**: Page views, session duration, bounce rate
- **Tool Performance**: Click rates, conversion to external sites
- **Search Behavior**: Popular queries, result click positions
- **Form Conversion**: Submission rates, completion rates
- **Performance**: Page load times, error rates

**Privacy Considerations**:
- Implement cookie consent if required
- Anonymize personal data
- Provide opt-out mechanisms
- Follow GDPR/CCPA compliance requirements

**Visualization Options**:
- Simple metrics cards for key numbers
- Time series charts for trends
- Heatmaps for user interaction patterns
- Funnel analysis for conversion paths

Include proper data retention policies and user privacy protections in the implementation.
```