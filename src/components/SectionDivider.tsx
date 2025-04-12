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
        
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="w-3 h-3 rounded-full bg-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-neon" />
          
          <svg className="w-full h-full text-primary/20" viewBox="0 0 100 100">
            <circle 
              cx="50" 
              cy="50" 
              r="40" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              strokeDasharray="6 4" 
            />
          </svg>
        </motion.div>
      </div>
    </div>
  )
} 