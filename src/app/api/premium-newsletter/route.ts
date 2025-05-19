import { NextResponse } from 'next/server'

// Create a Stripe Checkout session for the premium newsletter
export async function POST(request: Request) {
  const body = await request.json()
  const { email } = body

  const stripeSecret = process.env.STRIPE_SECRET_KEY
  const priceId = process.env.STRIPE_PRICE_ID
  const domain = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  if (!stripeSecret || !priceId) {
    return NextResponse.json({ error: 'Stripe is not configured' }, { status: 500 })
  }

  const params = new URLSearchParams()
  params.append('success_url', `${domain}/premium-newsletter/success?session_id={CHECKOUT_SESSION_ID}`)
  params.append('cancel_url', `${domain}/premium-newsletter/cancel`)
  params.append('mode', 'subscription')
  params.append('payment_method_types[]', 'card')
  params.append('line_items[0][price]', priceId)
  params.append('line_items[0][quantity]', '1')
  if (email) {
    params.append('customer_email', email)
  }

  const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${stripeSecret}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
  })

  if (!stripeRes.ok) {
    const text = await stripeRes.text()
    console.error('Stripe error:', text)
    return NextResponse.json({ error: 'Failed to create Stripe session' }, { status: 500 })
  }

  const session = await stripeRes.json()
  return NextResponse.json({ url: session.url })
}
