'use client'

import ScrollRevealSection from '@/components/ScrollRevealSection'
import { motion } from 'framer-motion'

export default function PremiumNewsletterCancel() {
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
            Subscription Canceled
          </motion.h1>
          <motion.p
            className="text-lg text-textSecondary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Your payment was canceled. You have not been subscribed.
          </motion.p>
        </ScrollRevealSection>
      </div>
    </div>
  )
}
