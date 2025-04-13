'use client'

import { motion } from 'framer-motion'
import SectionDivider from '@/components/SectionDivider'
import ParallaxBackground from '@/components/ParallaxBackground'
import ScrollRevealSection from '@/components/ScrollRevealSection'
import GlitchText from '@/components/GlitchText'

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
            <GlitchText 
              text="Upgrading Human Consciousness with AI"
              as="h1"
              className="font-heading text-4xl md:text-6xl lg:text-7xl text-primary drop-shadow-sm"
            />
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
