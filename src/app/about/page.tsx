'use client'

import { motion } from 'framer-motion'
import ScrollRevealSection from '@/components/ScrollRevealSection'

export default function AboutPage() {
  return (
    <div className="py-20">
      <ScrollRevealSection className="max-w-4xl mx-auto px-6">
        <motion.h1 
          className="text-3xl md:text-4xl font-heading mb-8 text-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Modecollapse
        </motion.h1>
        
        <div className="space-y-6">
          <ScrollRevealSection direction="up" delay={0.1}>
            <p className="text-lg text-textSecondary leading-relaxed">
              Modecollapse is founded on the belief that AI can accelerate 
              humanity&apos;s progress if implemented with care, curiosity, and creativity.
            </p>
          </ScrollRevealSection>
          
          <ScrollRevealSection direction="up" delay={0.2}>
            <p className="text-lg text-textSecondary leading-relaxed">
              Our mission is to provide educators, business leaders, and lifelong 
              learners the knowledge and tools they need to co-create a future where 
              technology elevates human consciousness.
            </p>
          </ScrollRevealSection>
          
          <ScrollRevealSection direction="up" delay={0.3}>
            <p className="text-lg text-textSecondary leading-relaxed">
              We believe that AI technologies should be accessible, understandable, 
              and beneficial to all. Through education, research, and practical implementation, 
              we aim to demystify AI and showcase its potential as a force for good.
            </p>
          </ScrollRevealSection>
          
          <ScrollRevealSection direction="up" delay={0.4}>
            <div className="mt-10 p-6 border border-textSecondary/10 rounded-lg bg-darkBg/30 dark:bg-darkBg/30">
              <h3 className="text-xl font-bold mb-4 text-primary">Our Values</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-textSecondary">Ethical consideration in all AI implementations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-textSecondary">Accessibility and inclusivity across educational contexts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-textSecondary">Human-centered approaches to technology integration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-textSecondary">Continuous learning and adaptation in a rapidly evolving field</span>
                </li>
              </ul>
            </div>
          </ScrollRevealSection>
        </div>
      </ScrollRevealSection>
    </div>
  )
} 