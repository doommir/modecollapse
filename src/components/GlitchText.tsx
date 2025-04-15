'use client'

import { useState, useMemo } from 'react'
import { motion, Variants } from 'framer-motion'

type GlitchTextProps = {
  text: string;
  className?: string;
  as?: React.ElementType;
}

export default function GlitchText({ 
  text, 
  className = '', 
  as: Component = 'span'
}: GlitchTextProps) {
  const [isHovering, setIsHovering] = useState(false)
  
  // Generate a deterministic random number using the character index
  const deterministicRandom = (min: number, max: number, seed: number) => {
    // Simple deterministic algorithm using prime numbers
    const value = Math.abs(Math.sin(seed * 7919)) * (max - min) + min;
    return Math.floor(value);
  }
  
  // Pre-compute character variants with deterministic values
  const characterVariants = useMemo(() => {
    return text.split('').map((_, index) => {
      // Create deterministic values for this character based on its index
      const xOffset = deterministicRandom(-2, 2, index);
      const yOffset = deterministicRandom(-2, 2, index + 100);
      
      // Create variants that conform to the Variants type
      const variants: Variants = {
        hover: {
          x: xOffset,
          y: yOffset,
          color: [
            'rgba(100, 255, 218, 1)', // primary
            'rgba(255, 255, 255, 1)', // normal
            'rgba(187, 134, 252, 1)', // secondary
            'rgba(255, 255, 255, 1)', // normal
          ],
          transition: {
            duration: 0.1, 
            repeat: 3, 
            repeatType: "mirror" as const,
            ease: "easeInOut" 
          }
        },
        initial: {
          x: 0,
          y: 0,
          color: 'inherit',
        }
      };
      
      return variants;
    });
  }, [text]);
  
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
            variants={characterVariants[index]}
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