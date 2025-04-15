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
  
  // Split text into words to preserve spaces
  const words = text.split(' ');
  
  // Pre-compute character variants with deterministic values for each character
  const processCharacters = (word: string, startIndex: number) => {
    return word.split('').map((_, index) => {
      const actualIndex = startIndex + index;
      // Create deterministic values for this character based on its index
      const xOffset = deterministicRandom(-2, 2, actualIndex);
      const yOffset = deterministicRandom(-2, 2, actualIndex + 100);
      
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
      
      return {
        char: word[index],
        variants
      };
    });
  };
  
  // Process all words
  const processedWords = useMemo(() => {
    let characterIndex = 0;
    return words.map(word => {
      const processedChars = processCharacters(word, characterIndex);
      characterIndex += word.length;
      return processedChars;
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
        className="inline-block"
      >
        {/* Text with the glitch effect */}
        <span aria-hidden="true" className="sr-only">{text}</span>
        
        {/* Render words with proper spacing */}
        {processedWords.map((word, wordIndex) => (
          <span key={`word-${wordIndex}`} className="inline-block">
            {/* Characters in this word */}
            {word.map((charData, charIndex) => (
              <motion.span
                key={`char-${wordIndex}-${charIndex}`}
                variants={charData.variants}
                className="inline-block"
                style={{ 
                  textShadow: isHovering ? `
                    0.05em 0 0 rgba(255, 0, 0, 0.75), 
                    -0.025em -0.05em 0 rgba(0, 255, 0, 0.75), 
                    0.025em 0.05em 0 rgba(0, 0, 255, 0.75)
                  ` : 'none'
                }}
              >
                {charData.char}
              </motion.span>
            ))}
            {/* Add space after each word except the last one */}
            {wordIndex < processedWords.length - 1 && (
              <span className="inline-block" style={{ marginRight: '0.25em' }}>&nbsp;</span>
            )}
          </span>
        ))}
      </motion.span>
    </Component>
  )
} 