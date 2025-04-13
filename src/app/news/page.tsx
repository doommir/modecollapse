'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import ScrollRevealSection from '@/components/ScrollRevealSection'

export default function NewsPage() {
  // Sample blog article placeholders
  const articles = [
    {
      id: 1,
      title: "AI in K-12: Bridging the Gap",
      excerpt: "How modern AI tools can enhance classroom engagement.",
      date: "April 10, 2025",
      tags: ["Education", "K-12", "Classroom Technology"]
    },
    {
      id: 2,
      title: "CTE & AI: Future of Vocational Learning",
      excerpt: "Exploring AI-driven skill training for tomorrow's workforce.",
      date: "April 8, 2025",
      tags: ["Career Tech", "Workforce", "Training"]
    },
    {
      id: 3,
      title: "Ethics in Educational AI",
      excerpt: "Balancing innovation with responsibility in AI-powered learning tools.",
      date: "March 25, 2025",
      tags: ["Ethics", "Policy", "Governance"]
    },
    {
      id: 4,
      title: "Digital Literacy for the AI Age",
      excerpt: "Preparing students to critically engage with artificial intelligence.",
      date: "March 15, 2025",
      tags: ["Digital Literacy", "Student Skills", "Future-Ready"]
    }
  ]

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollRevealSection>
          <motion.h1 
            className="text-3xl md:text-4xl font-heading mb-4 text-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            News & Updates
          </motion.h1>
          
          <motion.p 
            className="text-lg text-textSecondary mb-12 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Explore our latest insights, research findings, and updates on AI's evolving role in education.
          </motion.p>
        </ScrollRevealSection>
        
        <ScrollRevealSection 
          stagger={true} 
          staggerChildren={0.1}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {articles.map((article) => (
            <motion.div 
              key={article.id} 
              className="border border-textSecondary/10 rounded-lg overflow-hidden bg-darkBg/30 dark:bg-darkBg/30 hover:border-primary/30 transition-colors"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Link href={`/news/${article.id}`} className="block p-6">
                <div className="flex items-center text-xs text-textSecondary mb-4">
                  <span className="mr-2 text-primary">•</span>
                  <span>{article.date}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-textPrimary group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-textSecondary mb-4">
                  {article.excerpt}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {article.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </ScrollRevealSection>
        
        <ScrollRevealSection className="mt-16 text-center">
          <Link 
            href="#subscribe"
            className="inline-block bg-primary text-darkBg px-6 py-3 rounded-md font-semibold shadow-md hover:bg-secondary transition-colors duration-300"
          >
            Subscribe to Our Newsletter
          </Link>
        </ScrollRevealSection>
      </div>
    </div>
  )
} 