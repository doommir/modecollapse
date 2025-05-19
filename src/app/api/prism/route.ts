import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null

export async function POST(req: Request) {
  try {
    if (!openai) {
      return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 503 })
    }
    const { content } = await req.json()
    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 })
    }
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are Perspective Prism, an AI that refracts any text into five distinct viewpoints: Skeptic, Optimist, Historian, Futurist, and Neutral summarizer. Respond in JSON with keys skeptic, optimist, historian, futurist, neutral.' },
        { role: 'user', content }
      ],
      response_format: { type: 'json_object' }
    })
    const lenses = JSON.parse(completion.choices[0].message.content || '{}')
    return NextResponse.json({ lenses })
  } catch (error: any) {
    console.error('Prism API error:', error)
    return NextResponse.json({ error: error.message || 'Internal error' }, { status: 500 })
  }
}
