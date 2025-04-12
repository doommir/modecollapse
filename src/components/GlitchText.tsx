'use client'

import { useState } from 'react'
import { motion, Variants } from 'framer-motion'

type GlitchTextProps = {
  text: string;
  className?: string;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div';
}

export default function GlitchText({ 
  text, 
  className = '', 
  as: Component = 'span'
}: GlitchTextProps) {
  const [isHovering, setIsHovering] = useState(false)
  
  // Generate random number between min and max
  const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)
  
  // Glitch variants for Framer Motion
  const glitchVariants: Variants = {
    hover: {
      // This will create a rapid staggered animation
      transition: {
        staggerChildren: 0.02,
        staggerDirection: -1,
      }
    },
    initial: {}
  }
  
  // Individual character variants
  const charVariants: Variants = {
    hover: {
      // Fixed values for the animation
      x: random(-2, 2),
      y: random(-2, 2),
      // Color animation sequence
      color: [
        'rgba(100, 255, 218, 1)', // primary
        'rgba(255, 255, 255, 1)', // normal
        'rgba(187, 134, 252, 1)', // secondary
        'rgba(255, 255, 255, 1)', // normal
      ],
      transition: {
        // Quick rapid changes
        duration: 0.1, 
        repeat: 3, 
        repeatType: "mirror",
        ease: "easeInOut"
      }
    },
    initial: {
      x: 0,
      y: 0,
      color: 'inherit',
    }
  }
  
  // Split text into individual characters
  const characters = text.split('')
  
  return (
    <Component 
      className={className}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.span
        variants={glitchVariants}
        initial="initial"
        animate={isHovering ? "hover" : "initial"}
        className="inline-block relative"
      >
        {/* Text with the glitch effect */}
        <span aria-hidden="true" className="sr-only">{text}</span>
        
        {/* Each character gets its own animation */}
        {characters.map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            variants={charVariants}
            className="inline-block relative"
            style={{ 
              // Create a subtle text shadow effect
              textShadow: isHovering ? `
                0.05em 0 0 rgba(255, 0, 0, 0.75), 
                -0.025em -0.05em 0 rgba(0, 255, 0, 0.75), 
                0.025em 0.05em 0 rgba(0, 0, 255, 0.75)
              ` : 'none'
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  )
} 