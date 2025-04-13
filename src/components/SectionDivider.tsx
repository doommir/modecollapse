'use client'

import { motion } from 'framer-motion'

type SectionDividerProps = {
  className?: string;
}

export default function SectionDivider({ className = '' }: SectionDividerProps) {
  return (
    <div className={`w-full overflow-hidden py-10 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div 
          className="h-px bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        />
      </div>
    </div>
  )
} 