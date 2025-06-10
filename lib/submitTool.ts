interface ToolSubmission {
  name: string
  url: string
  summary: string
  description: string
  tags: string[]
  promptTips: string
}

interface AirtableRecord {
  fields: {
    name: string
    url: string
    summary: string
    description: string
    tags: string
    promptTips: string
    submittedAt: string
  }
}

export async function submitToolToAirtable(submission: ToolSubmission): Promise<void> {
  const apiKey = process.env.AIRTABLE_API_KEY
  const baseId = process.env.AIRTABLE_BASE_ID
  
  if (!apiKey || !baseId) {
    throw new Error('Airtable configuration missing')
  }

  const record: AirtableRecord = {
    fields: {
      name: submission.name,
      url: submission.url,
      summary: submission.summary,
      description: submission.description,
      tags: submission.tags.join(', '), // Convert array to comma-separated string
      promptTips: submission.promptTips,
      submittedAt: new Date().toISOString()
    }
  }

  const response = await fetch(`https://api.airtable.com/v0/${baseId}/Submitted%20Tools`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ records: [record] })
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(
      errorData.error?.message || 
      `Airtable API error: ${response.status} ${response.statusText}`
    )
  }
}

export async function triggerN8nWebhook(submission: ToolSubmission): Promise<void> {
  const webhookUrl = process.env.N8N_WEBHOOK_URL
  
  if (!webhookUrl) {
    // If no webhook is configured, skip this step
    return
  }

  const payload = {
    ...submission,
    submittedAt: new Date().toISOString(),
    source: 'mode-collapse-website'
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      console.error('N8N webhook failed:', response.status, response.statusText)
      // Don't throw error for webhook failures to not block the main submission
    }
  } catch (error) {
    console.error('N8N webhook error:', error)
    // Don't throw error for webhook failures to not block the main submission
  }
}

export async function submitTool(submission: ToolSubmission): Promise<void> {
  // Validate required fields
  if (!submission.name || !submission.url || !submission.summary || !submission.tags.length) {
    throw new Error('Missing required fields: name, url, summary, and at least one tag are required')
  }

  // Validate URL format
  try {
    new URL(submission.url)
  } catch {
    throw new Error('Invalid URL format')
  }

  // Submit to Airtable (required)
  await submitToolToAirtable(submission)

  // Trigger N8N webhook (optional)
  await triggerN8nWebhook(submission)
}