'use client'

import { useState } from 'react'

export default function PremiumNewsletterSignup() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/premium-newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to create checkout session')
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubscribe} className="bg-primary/5 p-6 rounded-lg border border-primary/20 space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-primary mb-2">Premium Newsletter</h2>
        <p className="text-textSecondary">Get exclusive articles and resources for $5/month.</p>
      </div>
      <input
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Your email address"
        className="w-full bg-darkBg/40 border border-textSecondary/20 rounded-md px-4 py-2 text-textPrimary focus:border-primary focus:ring-1 focus:ring-primary outline-none"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-2 bg-primary text-darkBg rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-70"
      >
        {loading ? 'Redirecting...' : 'Subscribe for $5/month'}
      </button>
    </form>
  )
}
