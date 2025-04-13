'use client'

import { motion } from 'framer-motion'

export default function ScrollIndicator() {
  return (
    <div className="w-full flex justify-center">
      <div className="fixed bottom-8 z-10 flex flex-col items-center">
        {/* Animated Circle */}
        <motion.div
          className="relative flex items-center justify-center w-14 h-14"
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            ease: "easeInOut"
          }}
        >
          {/* Outer circle */}
          <svg className="w-full h-full text-primary/30" viewBox="0 0 100 100">
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
          
          {/* Inner glowing dot */}
          <div className="w-3 h-3 rounded-full bg-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-neon" />
          
          {/* Down arrow */}
          <motion.div 
            className="absolute -bottom-8"
            animate={{ 
              y: [0, 5, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 10L0 0H20L10 10Z" fill="#FFEA00" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 