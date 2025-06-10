interface ToolSubmissionData {
  name: string
  url: string
  summary: string
  description?: string
  tags?: string[]
  promptTips?: string
}

interface WebhookResponse {
  success: boolean
  message?: string
  error?: string
}

export async function postToWebhook(data: ToolSubmissionData): Promise<WebhookResponse> {
  const webhookUrl = 'http://localhost:5678/webhook/mode-collapse-submit'
  
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        submittedAt: new Date().toISOString(),
        source: 'mode-collapse-website'
      })
    })

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error')
      throw new Error(`Webhook request failed: ${response.status} ${response.statusText} - ${errorText}`)
    }

    // Try to parse JSON response, but don't fail if it's not JSON
    let result
    try {
      result = await response.json()
    } catch {
      // If response isn't JSON, treat as success if status is ok
      result = { success: true, message: 'Tool submitted successfully' }
    }

    return {
      success: true,
      message: result.message || 'Tool submitted successfully to automation pipeline'
    }

  } catch (error) {
    console.error('Webhook submission error:', error)
    
    // Handle different types of errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return {
        success: false,
        error: 'Unable to connect to automation service. Please ensure n8n is running locally.'
      }
    }
    
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message
      }
    }
    
    return {
      success: false,
      error: 'An unexpected error occurred while submitting the tool'
    }
  }
}

export function validateToolSubmission(data: Partial<ToolSubmissionData>): string | null {
  if (!data.name || data.name.trim().length === 0) {
    return 'Tool name is required'
  }
  
  if (!data.url || data.url.trim().length === 0) {
    return 'Website URL is required'
  }
  
  if (!data.summary || data.summary.trim().length === 0) {
    return 'One-line summary is required'
  }
  
  // Validate URL format
  try {
    new URL(data.url)
  } catch {
    return 'Please enter a valid website URL (including https://)'
  }
  
  // Validate summary length
  if (data.summary.length > 150) {
    return 'Summary must be 150 characters or less'
  }
  
  return null // No validation errors
}