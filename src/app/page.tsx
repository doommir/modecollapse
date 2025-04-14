'use client'

import { motion } from 'framer-motion'
import SectionDivider from '@/components/SectionDivider'
import ParallaxBackground from '@/components/ParallaxBackground'
import ScrollRevealSection from '@/components/ScrollRevealSection'
import GlitchText from '@/components/GlitchText'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      {/* Hero Section with Parallax */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center justify-center">
        {/* Background parallax effect */}
        <ParallaxBackground />
        
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center text-center relative z-10">
          {/* Glitch Text Heading */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            {/* Display different text on mobile and desktop */}
            <div className="block sm:hidden">
              <GlitchText 
                text="Upgrading"
                as="h1"
                className="font-heading text-4xl md:text-6xl lg:text-7xl text-primary drop-shadow-sm"
              />
              <GlitchText 
                text="Human"
                as="h1"
                className="font-heading text-4xl md:text-6xl lg:text-7xl text-primary drop-shadow-sm"
              />
              <GlitchText 
                text="Consciousness"
                as="h1"
                className="font-heading text-4xl md:text-6xl lg:text-7xl text-primary drop-shadow-sm"
              />
              <GlitchText 
                text="with AI"
                as="h1"
                className="font-heading text-4xl md:text-6xl lg:text-7xl text-primary drop-shadow-sm"
              />
            </div>
            
            {/* Desktop version */}
            <div className="hidden sm:block">
              <GlitchText 
                text="Upgrading Human Consciousness with AI"
                as="h1"
                className="font-heading text-4xl md:text-6xl lg:text-7xl text-primary drop-shadow-sm"
              />
            </div>
          </motion.div>

          <motion.p
            className="text-textSecondary dark:text-textSecondary text-lg md:text-xl max-w-2xl mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Modecollapse.io is a digital lab empowering educators, leaders, and 
            lifelong learners to harness AI for deeper human potential.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              href="/portfolio"
              className="relative group overflow-hidden bg-primary text-darkBg px-8 py-3 rounded-md font-semibold shadow-md"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Explore Our Work</span>
              <motion.span 
                className="absolute inset-0 bg-secondary"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            
            <motion.a
              href="/about"
              className="px-8 py-3 rounded-md font-medium border border-primary/30 hover:border-primary text-primary transition-colors"
              whileHover={{ 
                boxShadow: "0 0 15px rgba(100, 255, 218, 0.3)",
                backgroundColor: "rgba(100, 255, 218, 0.05)" 
              }}
            >
              Learn More
            </motion.a>
          </motion.div>
        </div>
      </section>
      
      <SectionDivider />
      
      {/* Features Section with Scroll Reveal */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollRevealSection
            direction="up"
            delay={0.2}
            className="mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-heading text-center text-textPrimary dark:text-textPrimary">
              How we&apos;re advancing AI adoption in education
            </h2>
          </ScrollRevealSection>
          
          <ScrollRevealSection
            direction="up"
            stagger={true}
            staggerChildren={0.15}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          >
            {[
              {
                title: "AI Curriculum Integration",
                description: "Frameworks and tools to seamlessly integrate AI into existing educational structures."
              },
              {
                title: "Educator Empowerment",
                description: "Teaching professionals how to leverage AI as a complementary tool rather than a replacement."
              },
              {
                title: "Ethical Implementation",
                description: "Ensuring AI adoption follows rigorous ethical guidelines and equity considerations."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-darkBg/30 dark:bg-darkBg/30 p-8 rounded-lg border border-textSecondary/10 hover:border-primary/30 transition-colors group"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-6">
                  <span className="text-primary text-xl font-bold">{index + 1}</span>
                </div>
                <GlitchText
                  text={feature.title}
                  as="h3"
                  className="text-xl font-bold mb-3 text-textPrimary dark:text-textPrimary group-hover:text-primary transition-colors"
                />
                <p className="text-textSecondary dark:text-textSecondary">
                  {feature.description}
                </p>
              </div>
            ))}
          </ScrollRevealSection>
        </div>
      </section>
      
      <SectionDivider />
      
      {/* Blog Posts Gallery Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollRevealSection
            direction="up"
            delay={0.2}
            className="mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-heading text-center text-textPrimary dark:text-textPrimary">
              Latest from our blog
            </h2>
            <p className="text-textSecondary text-center max-w-2xl mx-auto mt-4">
              Explore our insights on education, AI, and consciousness engineering
            </p>
          </ScrollRevealSection>
          
          <ScrollRevealSection
            direction="up"
            stagger={true}
            staggerChildren={0.15}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Blog Card 1 - Mode Collapse Intro */}
            <Link href="/blog/youre-not-broken-the-system-is-optimized-for-collapse" className="group">
              <div className="bg-darkBg/30 dark:bg-darkBg/30 rounded-lg overflow-hidden border border-textSecondary/10 hover:border-primary/30 transition-colors h-full flex flex-col">
                <div className="h-48 bg-darkBg/50 relative overflow-hidden">
                  <img 
                    src="/blog/mode-collapse.png" 
                    alt="Mode Collapse Blog Post"
                    className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm text-primary bg-primary/10 px-2 py-1 rounded-md">
                      Education
                    </span>
                    <span className="text-sm text-textSecondary">
                      May 22, 2024
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-textPrimary mb-3 group-hover:text-primary transition-colors">
                    You're Not Broken — The System Is Optimized for Collapse
                  </h3>
                  <p className="text-textSecondary mb-4 flex-grow">
                    Welcome to Mode Collapse: A Digital Lab for Upgrading Consciousness
                  </p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-sm text-textSecondary">
                      By Matt
                    </span>
                    <span className="text-primary inline-flex items-center group-hover:underline">
                      Read More
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            
            {/* Blog Card 2 - AI Tools */}
            <Link href="/blog/getting-started-with-ai-tools" className="group">
              <div className="bg-darkBg/30 dark:bg-darkBg/30 rounded-lg overflow-hidden border border-textSecondary/10 hover:border-primary/30 transition-colors h-full flex flex-col">
                <div className="h-48 bg-darkBg/50 flex items-center justify-center text-primary/30">
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm text-primary bg-primary/10 px-2 py-1 rounded-md">
                      AI
                    </span>
                    <span className="text-sm text-textSecondary">
                      Oct 15, 2023
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-textPrimary mb-3 group-hover:text-primary transition-colors">
                    Getting Started with AI Tools
                  </h3>
                  <p className="text-textSecondary mb-4 flex-grow">
                    A beginner-friendly guide to integrating AI tools into your workflow.
                  </p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-sm text-textSecondary">
                      By Jane Doe
                    </span>
                    <span className="text-primary inline-flex items-center group-hover:underline">
                      Read More
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            
            {/* Blog Card 3 - StudyCrafter */}
            <Link href="/blog/maximizing-productivity-with-studycrafter" className="group">
              <div className="bg-darkBg/30 dark:bg-darkBg/30 rounded-lg overflow-hidden border border-textSecondary/10 hover:border-primary/30 transition-colors h-full flex flex-col">
                <div className="h-48 bg-darkBg/50 flex items-center justify-center text-primary/30">
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm text-primary bg-primary/10 px-2 py-1 rounded-md">
                      Productivity
                    </span>
                    <span className="text-sm text-textSecondary">
                      Sep 10, 2023
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-textPrimary mb-3 group-hover:text-primary transition-colors">
                    Maximizing Productivity with StudyCrafter
                  </h3>
                  <p className="text-textSecondary mb-4 flex-grow">
                    Tips and tricks to get the most out of the StudyCrafter tool for effective learning.
                  </p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-sm text-textSecondary">
                      By Alex Johnson
                    </span>
                    <span className="text-primary inline-flex items-center group-hover:underline">
                      Read More
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </ScrollRevealSection>
          
          <div className="flex justify-center mt-12">
            <Link
              href="/blog"
              className="px-6 py-2 border border-primary/30 hover:border-primary text-primary rounded-md font-medium transition-colors hover:bg-primary/5"
            >
              View All Posts
            </Link>
          </div>
        </div>
      </section>
      
      <SectionDivider />
      
      {/* Call-to-action section with scroll reveal */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-conic from-darkBg via-secondary/5 to-darkBg dark:from-darkBg dark:via-secondary/10 dark:to-darkBg opacity-30"></div>
        
        <ScrollRevealSection
          direction="up"
          className="max-w-4xl mx-auto px-6 text-center relative z-10"
        >
          <h2 className="text-2xl md:text-4xl font-heading mb-6 text-textPrimary dark:text-textPrimary">
            Ready to upgrade your educational approach?
          </h2>
          
          <p className="text-textSecondary dark:text-textSecondary text-lg mb-10 max-w-2xl mx-auto">
            Join the community of forward-thinking educators leveraging AI to create more engaging, personalized, and effective learning experiences.
          </p>
          
          <motion.a
            href="/contact"
            className="inline-block px-8 py-3 rounded-md font-medium bg-primary text-darkBg shadow-md hover:shadow-neon transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 15px rgba(100, 255, 218, 0.5)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Us
          </motion.a>
        </ScrollRevealSection>
      </section>
    </>
  );
}
