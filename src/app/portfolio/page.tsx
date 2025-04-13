'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import SectionDivider from '@/components/SectionDivider'
import ScrollRevealSection from '@/components/ScrollRevealSection'
import GlitchText from '@/components/GlitchText'
import { useRef } from 'react'
import Link from 'next/link'

// Define types for project data
type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  iframe?: string;
  image?: string;
  link?: string;
}

export default function PortfolioPage() {
  // Ref for the portfolio section to track scroll position
  const sectionRef = useRef(null)
  
  // Get scroll progress for this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  // Use scroll position to create a parallax header effect
  const headerY = useTransform(scrollYProgress, [0, 0.5], [0, -50])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0.6])
  
  // Sample project data
  const projects: Project[] = [
    {
      id: 1,
      title: "Restorative Assignment Generator",
      description: "AI-powered tool that helps educators create restorative assignments for students.",
      tags: ["Restorative", "Assignment", "Generator"],
      image: "/images/restorativethumbnail.png",
      link: "/tools/assignment-generator"
    },
    {
      id: 2,
      title: "AI Teaching Assistant",
      description: "An AI companion that helps teachers grade assignments, answer student questions, and create personalized learning plans.",
      tags: ["Education", "AI", "LLM"]
    },
    {
      id: 3,
      title: "Ethics Framework",
      description: "A comprehensive framework for implementing AI in educational settings with equity and ethical considerations at the forefront.",
      tags: ["Ethics", "Policy", "Guidelines"]
    },
    {
      id: 4,
      title: "Curriculum Builder",
      description: "Tool for educators to build AI-enhanced curriculum materials aligned with educational standards.",
      tags: ["Curriculum", "Planning", "K-12"]
    },
    {
      id: 5,
      title: "Student Analysis Dashboard",
      description: "Data visualization tool that helps identify learning patterns and opportunities for intervention.",
      tags: ["Analytics", "Data", "Dashboard"]
    },
    {
      id: 6,
      title: "AI Literacy Course",
      description: "Online course teaching the fundamentals of AI for educators and administrators with no technical background.",
      tags: ["Course", "Literacy", "Training"]
    },
    {
      id: 7,
      title: "Research Repository",
      description: "Collection of research papers and case studies on the impact of AI in educational settings globally.",
      tags: ["Research", "Papers", "Case Studies"]
    }
  ]

  return (
    <div ref={sectionRef}>
      {/* Header section with parallax effect */}
      <section className="relative py-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute top-0 inset-x-0 h-60 bg-gradient-to-b from-secondary/5 via-primary/5 to-transparent dark:from-secondary/10 dark:via-primary/5 dark:to-transparent" />
        
        {/* Grid overlay - subtle visual texture */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{ 
            backgroundImage: `linear-gradient(to right, rgba(100, 255, 218, 0.1) 1px, transparent 1px), 
                             linear-gradient(to bottom, rgba(100, 255, 218, 0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div style={{ y: headerY, opacity: headerOpacity }}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading mb-4 text-primary">
              Our Portfolio
            </h1>
            
            <motion.p
              className="text-textSecondary dark:text-textSecondary text-lg max-w-3xl mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              Explore our collection of AI tools, frameworks, and resources designed to transform education and empower learners and educators.
            </motion.p>
          </motion.div>
          
          <ScrollRevealSection
            stagger={true}
            staggerChildren={0.1}
            distance={30}
            direction="up"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative bg-darkBg/30 dark:bg-darkBg/30 border border-textSecondary/10 rounded-lg overflow-hidden h-full"
              >
                {/* Top border highlight on hover */}
                <div className="absolute inset-x-0 top-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                
                {/* Wrap the entire card in a Link if project has a link */}
                {project.link ? (
                  <Link href={project.link} className="block h-full">
                    <motion.div 
                      className="p-6 flex flex-col h-full"
                      whileHover={{ y: -8 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <h3 className="text-xl font-bold mb-3 text-textPrimary dark:text-textPrimary group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-textSecondary dark:text-textSecondary mb-5 flex-grow">
                        {project.description}
                      </p>
                      {project.iframe && (
                        <div className="mb-5 w-full">
                          <iframe 
                            src={project.iframe} 
                            className="w-full"
                            height="700px" 
                            frameBorder="0" 
                            allow="clipboard-write"
                          />
                        </div>
                      )}
                      {project.image && (
                        <div className="mb-5 w-full">
                          <img 
                            src={project.image}
                            alt={project.title}
                            className="w-full rounded-md hover:shadow-lg transition-shadow duration-300"
                          />
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tags.map(tag => (
                          <motion.span 
                            key={tag} 
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                            whileHover={{ 
                              scale: 1.1, 
                              backgroundColor: "rgba(100, 255, 218, 0.2)",
                              boxShadow: "0 0 8px rgba(100, 255, 218, 0.3)"
                            }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  </Link>
                ) : (
                  <motion.div 
                    className="p-6 flex flex-col h-full"
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <h3 className="text-xl font-bold mb-3 text-textPrimary dark:text-textPrimary group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-textSecondary dark:text-textSecondary mb-5 flex-grow">
                      {project.description}
                    </p>
                    {project.iframe && (
                      <div className="mb-5 w-full">
                        <iframe 
                          src={project.iframe} 
                          className="w-full"
                          height="700px" 
                          frameBorder="0" 
                          allow="clipboard-write"
                        />
                      </div>
                    )}
                    {project.image && (
                      <div className="mb-5 w-full">
                        <img 
                          src={project.image}
                          alt={project.title}
                          className="w-full rounded-md hover:shadow-lg transition-shadow duration-300"
                        />
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map(tag => (
                        <motion.span 
                          key={tag} 
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                          whileHover={{ 
                            scale: 1.1, 
                            backgroundColor: "rgba(100, 255, 218, 0.2)",
                            boxShadow: "0 0 8px rgba(100, 255, 218, 0.3)"
                          }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {/* Hover effect overlay - additional depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </ScrollRevealSection>
        </div>
      </section>
      
      <SectionDivider />
      
      {/* Call to action section */}
      <section className="py-20 relative overflow-hidden">
        {/* Animated background dots */}
        <ParticleBackground />
        
        <ScrollRevealSection
          direction="up"
          className="max-w-7xl mx-auto px-6 text-center relative z-10"
        >
          <h2 className="text-2xl md:text-3xl font-heading mb-10 text-textPrimary dark:text-textPrimary">
            Want to collaborate on a project?
          </h2>
          
          <motion.a
            href="/about#contact"
            className="inline-block px-8 py-3 rounded-md font-medium bg-primary text-darkBg shadow-md hover:shadow-neon transition-shadow duration-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 15px rgba(100, 255, 218, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </motion.a>
        </ScrollRevealSection>
      </section>
    </div>
  )
}

// Simple background particle effect component
function ParticleBackground() {
  const count = 25
  const particles = Array.from({ length: count }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10
  }))
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/30 dark:bg-primary/40"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
} 