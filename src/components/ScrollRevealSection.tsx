'use client'

import React, { ReactNode } from 'react'
import { motion, Variants } from 'framer-motion'

type ScrollRevealSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  distance?: number;
  once?: boolean;
  stagger?: boolean;
  staggerChildren?: number;
}

export default function ScrollRevealSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.5,
  distance = 50,
  once = true,
  stagger = false,
  staggerChildren = 0.1,
}: ScrollRevealSectionProps) {
  // Set initial and animate states based on direction
  let initial = {}
  
  switch (direction) {
    case 'up':
      initial = { y: distance, opacity: 0 }
      break
    case 'down':
      initial = { y: -distance, opacity: 0 }
      break
    case 'left':
      initial = { x: distance, opacity: 0 }
      break
    case 'right':
      initial = { x: -distance, opacity: 0 }
      break
    case 'none':
      initial = { opacity: 0 }
      break
  }
  
  // Create variants for the container
  const containerVariants: Variants = {
    hidden: { 
      ...initial,
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Cubic bezier for smoother motion
        ...(stagger && { staggerChildren, delayChildren: delay })
      }
    }
  }
  
  // Create variants for children if staggering is enabled
  const childVariants: Variants = stagger ? {
    hidden: {
      ...initial,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  } : {}
  
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-100px" }}
    >
      {stagger 
        ? React.Children.map(children, (child) => (
            <motion.div variants={childVariants}>{child}</motion.div>
          ))
        : children
      }
    </motion.div>
  )
} 