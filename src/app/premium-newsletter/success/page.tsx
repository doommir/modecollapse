'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import ScrollRevealSection from '@/components/ScrollRevealSection'
import { motion } from 'framer-motion'

export default function PremiumNewsletterSuccess() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    const confirm = async () => {
      if (!sessionId) {
        setStatus('error')
        return
      }
      try {
        const res = await fetch('/api/premium-newsletter/confirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ session_id: sessionId })
        })
        if (!res.ok) throw new Error('Failed to confirm subscription')
        setStatus('success')
      } catch (err) {
        console.error(err)
        setStatus('error')
      }
    }
    confirm()
  }, [sessionId])

  return (
    <div className="py-20">
      <div className="max-w-xl mx-auto px-6 text-center">
        <ScrollRevealSection>
          <motion.h1
            className="text-3xl md:text-4xl font-heading mb-6 text-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {status === 'success' ? 'Subscription Confirmed' : status === 'loading' ? 'Confirming...' : 'Subscription Error'}
          </motion.h1>
          <motion.p
            className="text-lg text-textSecondary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {status === 'success'
              ? 'Thank you for supporting Mode Collapse!'
              : 'There was a problem confirming your subscription.'}
          </motion.p>
        </ScrollRevealSection>
      </div>
    </div>
  )
}
