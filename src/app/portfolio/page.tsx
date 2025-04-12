'use client'

import { motion } from 'framer-motion'
import SectionDivider from '@/components/SectionDivider'

export default function PortfolioPage() {
  // Sample project data
  const projects = [
    {
      id: 1,
      title: "AI Teaching Assistant",
      description: "An AI companion that helps teachers grade assignments, answer student questions, and create personalized learning plans.",
      tags: ["Education", "AI", "LLM"]
    },
    {
      id: 2,
      title: "Ethics Framework",
      description: "A comprehensive framework for implementing AI in educational settings with equity and ethical considerations at the forefront.",
      tags: ["Ethics", "Policy", "Guidelines"]
    },
    {
      id: 3,
      title: "Curriculum Builder",
      description: "Tool for educators to build AI-enhanced curriculum materials aligned with educational standards.",
      tags: ["Curriculum", "Planning", "K-12"]
    },
    {
      id: 4,
      title: "Student Analysis Dashboard",
      description: "Data visualization tool that helps identify learning patterns and opportunities for intervention.",
      tags: ["Analytics", "Data", "Dashboard"]
    },
    {
      id: 5,
      title: "AI Literacy Course",
      description: "Online course teaching the fundamentals of AI for educators and administrators with no technical background.",
      tags: ["Course", "Literacy", "Training"]
    },
    {
      id: 6,
      title: "Research Repository",
      description: "Collection of research papers and case studies on the impact of AI in educational settings globally.",
      tags: ["Research", "Papers", "Case Studies"]
    }
  ]

  return (
    <>
      <section className="py-20 relative">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-secondary/5 to-transparent dark:from-secondary/10 dark:to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6">
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl font-heading mb-4 text-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Portfolio
          </motion.h1>
          
          <motion.p
            className="text-textSecondary dark:text-textSecondary text-lg max-w-3xl mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Explore our collection of AI tools, frameworks, and resources designed to transform education and empower learners and educators.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group relative bg-darkBg/30 dark:bg-darkBg/30 border border-textSecondary/10 rounded-lg overflow-hidden h-full"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
              >
                {/* Top border highlight on hover */}
                <div className="absolute inset-x-0 top-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                
                {/* Content */}
                <div className="p-6 flex flex-col h-full">
                  <h3 className="text-xl font-bold mb-3 text-textPrimary dark:text-textPrimary group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-textSecondary dark:text-textSecondary mb-5 flex-grow">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <SectionDivider />
      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2 
            className="text-2xl md:text-3xl font-heading mb-10 text-textPrimary dark:text-textPrimary"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Want to collaborate on a project?
          </motion.h2>
          
          <motion.a
            href="/about#contact"
            className="inline-block px-8 py-3 rounded-md font-medium bg-primary text-darkBg shadow-md hover:shadow-neon transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </motion.a>
        </div>
      </section>
    </>
  )
} 