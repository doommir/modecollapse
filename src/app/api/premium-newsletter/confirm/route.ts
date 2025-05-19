import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const PREMIUM_FILE_PATH = path.join(process.cwd(), 'data', 'premium-subscribers.json')

const ensureDirectoryExists = (filePath: string) => {
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

const loadEmails = (): string[] => {
  try {
    if (!fs.existsSync(PREMIUM_FILE_PATH)) return []
    return JSON.parse(fs.readFileSync(PREMIUM_FILE_PATH, 'utf8'))
  } catch (err) {
    console.error('Error loading premium emails:', err)
    return []
  }
}

const saveEmails = (emails: string[]) => {
  try {
    ensureDirectoryExists(PREMIUM_FILE_PATH)
    fs.writeFileSync(PREMIUM_FILE_PATH, JSON.stringify(emails, null, 2))
  } catch (err) {
    console.error('Error saving premium emails:', err)
  }
}

export async function POST(request: Request) {
  const { session_id } = await request.json()
  const stripeSecret = process.env.STRIPE_SECRET_KEY
  if (!stripeSecret) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
  }

  if (!session_id) {
    return NextResponse.json({ error: 'session_id required' }, { status: 400 })
  }

  const sessionRes = await fetch(`https://api.stripe.com/v1/checkout/sessions/${session_id}`, {
    headers: {
      Authorization: `Bearer ${stripeSecret}`
    }
  })

  if (!sessionRes.ok) {
    const text = await sessionRes.text()
    console.error('Stripe session fetch error:', text)
    return NextResponse.json({ error: 'Failed to retrieve session' }, { status: 500 })
  }

  const session = await sessionRes.json() as any
  const email = session.customer_details?.email || session.customer_email
  if (!email) {
    return NextResponse.json({ error: 'Email not found in session' }, { status: 500 })
  }

  const emails = loadEmails()
  if (!emails.includes(email)) {
    emails.push(email)
    saveEmails(emails)
  }

  return NextResponse.json({ success: true })
}
