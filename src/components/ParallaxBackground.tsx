'use client'

import { useRef, useState, useEffect } from 'react'
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
  
  // Client-side only rendering for particles
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
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
        className="absolute -bottom-40 right-0 w-[40vw] h-[40vw] rounded-full bg-secondary/5 blur-3xl dark:bg-secondary/10"
        style={{ y: y2 }}
      />
      
      {/* Center accent - move faster */}
      <motion.div 
        className="absolute top-[30%] left-[50%] transform -translate-x-1/2 w-[20vw] h-[20vw] rounded-full bg-primary/10 blur-3xl mix-blend-screen"
        style={{ y: y3 }}
      />
      
      {/* Particles - small dots that move at different speeds (client-side only) */}
      {isClient && (
        <>
          <ParticleLayer count={20} maxSize={4} speed={y3} variant="primary" />
          <ParticleLayer count={15} maxSize={3} speed={y2} variant="secondary" />
        </>
      )}
      
      {/* Bottom indicator - properly positioned */}
      <div className="w-full flex justify-center">
        <div className="absolute bottom-6 z-10 flex justify-center w-full">
          <motion.div
            className="relative flex items-center justify-center w-10 h-10"
            animate={{ 
              y: [0, -6, 0],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut"
            }}
          >
            <div className="w-2 h-2 rounded-full bg-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-neon" />
            
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
    </div>
  )
}

type ParticleProps = {
  count: number;
  maxSize: number;
  speed: MotionValue<number>;
  variant: 'primary' | 'secondary';
}

function ParticleLayer({ count, maxSize, speed, variant }: ParticleProps) {
  // Create deterministic particles with a set seed to ensure client/server match
  const generateParticles = () => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: (Math.sin(i * 7919) * 0.5 + 0.5) * maxSize + 1, // Using prime numbers for pseudo-randomness
      x: (Math.cos(i * 7907) * 0.5 + 0.5) * 100,
      y: (Math.sin(i * 7901) * 0.5 + 0.5) * 100,
      initialY: (Math.cos(i * 7883) * 0.5 + 0.5) * 100,
      opacity: 0.3 + (Math.sin(i * 7879) * 0.5 + 0.5) * 0.7,
    }));
  };
  
  const particles = generateParticles();
  const color = variant === 'primary' ? 'rgba(100, 255, 218, 0.5)' : 'rgba(187, 134, 252, 0.5)';
  
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
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px ${color}`
          }}
        />
      ))}
    </>
  )
} 