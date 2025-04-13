'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

export default function ParallaxBackground() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  
  // Transform values for different parallax speeds
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]) // Slow
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 400]) // Medium
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 600]) // Fast
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden -z-10">
      {/* Grid lines - move slowly */}
      <motion.div 
        className="absolute inset-0 bg-grid-pattern opacity-10"
        style={{ 
          y: y1,
          opacity,
          backgroundImage: `linear-gradient(to right, rgba(100, 255, 218, 0.1) 1px, transparent 1px), 
                           linear-gradient(to bottom, rgba(100, 255, 218, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* Top left shape - move at medium speed */}
      <motion.div 
        className="absolute -top-40 -left-20 w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-3xl dark:bg-primary/10"
        style={{ y: y2 }}
      />
      
      {/* Bottom right shape - move at medium speed */}
      <motion.div 
        className="absolute -bottom-60 -right-40 w-[60vw] h-[60vw] rounded-full bg-secondary/5 blur-3xl dark:bg-secondary/10"
        style={{ y: y2 }}
      />
      
      {/* Center accent - move faster */}
      <motion.div 
        className="absolute top-[30%] left-[50%] transform -translate-x-1/2 w-[20vw] h-[20vw] rounded-full bg-primary/10 blur-3xl mix-blend-screen"
        style={{ y: y3 }}
      />
      
      {/* Particles - small dots that move at different speeds */}
      <ParticleLayer count={20} maxSize={4} speed={y3} variant="primary" />
      <ParticleLayer count={15} maxSize={3} speed={y2} variant="secondary" />
    </div>
  )
}

type ParticleProps = {
  count: number;
  maxSize: number;
  speed: MotionValue<number>; // Use MotionValue type instead of any
  variant: 'primary' | 'secondary';
}

function ParticleLayer({ count, maxSize, speed, variant }: ParticleProps) {
  const particles = Array.from({ length: count }).map((_, i) => ({
    id: i,
    size: Math.random() * maxSize + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    initialY: Math.random() * 100,
  }))
  
  const color = variant === 'primary' ? 'rgba(100, 255, 218, 0.5)' : 'rgba(187, 134, 252, 0.5)'
  
  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.initialY}%`,
            backgroundColor: color,
            y: speed,
            opacity: 0.3 + Math.random() * 0.7,
            boxShadow: `0 0 ${particle.size * 2}px ${color}`
          }}
        />
      ))}
    </>
  )
} 