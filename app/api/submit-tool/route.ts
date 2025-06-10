import { NextRequest, NextResponse } from 'next/server'
import { submitTool } from '@/lib/submitTool'

interface ToolSubmission {
  name: string
  url: string
  summary: string
  description: string
  tags: string[]
  promptTips: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ToolSubmission = await request.json()

    // Validate required fields
    if (!body.name || !body.url || !body.summary || !body.tags || !Array.isArray(body.tags) || body.tags.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Missing required fields: name, url, summary, and at least one tag are required' 
        },
        { status: 400 }
      )
    }

    // Validate URL format
    try {
      new URL(body.url)
    } catch {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid URL format' 
        },
        { status: 400 }
      )
    }

    // Validate summary length
    if (body.summary.length > 120) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Summary must be 120 characters or less' 
        },
        { status: 400 }
      )
    }

    // Sanitize and validate tags
    const sanitizedTags = body.tags
      .filter(tag => typeof tag === 'string' && tag.trim().length > 0)
      .map(tag => tag.trim())
      .slice(0, 10) // Limit to 10 tags

    if (sanitizedTags.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'At least one valid tag is required' 
        },
        { status: 400 }
      )
    }

    const submission: ToolSubmission = {
      name: body.name.trim(),
      url: body.url.trim(),
      summary: body.summary.trim(),
      description: body.description?.trim() || '',
      tags: sanitizedTags,
      promptTips: body.promptTips?.trim() || ''
    }

    // Submit to Airtable and optionally trigger N8N webhook
    await submitTool(submission)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Tool submitted successfully' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Tool submission error:', error)
    
    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('Airtable configuration missing')) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'Server configuration error. Please try again later.' 
          },
          { status: 500 }
        )
      }
      
      if (error.message.includes('Airtable API error')) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'Failed to save submission. Please try again later.' 
          },
          { status: 500 }
        )
      }
      
      return NextResponse.json(
        { 
          success: false, 
          message: error.message 
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'An unexpected error occurred. Please try again.' 
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      message: 'Tool submission endpoint. Use POST to submit a tool.' 
    },
    { status: 405 }
  )
}