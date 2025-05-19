'use client'

import PremiumNewsletterSignup from '@/components/PremiumNewsletterSignup'
import ScrollRevealSection from '@/components/ScrollRevealSection'
import { motion } from 'framer-motion'

export default function PremiumNewsletterPage() {
  return (
    <div className="py-20">
      <div className="max-w-2xl mx-auto px-6">
        <ScrollRevealSection>
          <motion.h1
            className="text-3xl md:text-4xl font-heading mb-6 text-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Premium Newsletter
          </motion.h1>
          <motion.p
            className="text-lg text-textSecondary mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Support Mode Collapse and receive exclusive monthly insights.
          </motion.p>
        </ScrollRevealSection>
        <ScrollRevealSection>
          <PremiumNewsletterSignup />
        </ScrollRevealSection>
      </div>
    </div>
  )
}
