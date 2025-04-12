'use client'

import { motion } from 'framer-motion'
import SectionDivider from '@/components/SectionDivider'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center justify-center">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-radial from-secondary/5 to-transparent dark:from-secondary/10 dark:to-transparent" />
        
        {/* Animated circles - decorative elements */}
        <div className="absolute top-20 left-[15%] w-64 h-64 rounded-full bg-primary/5 blur-3xl dark:bg-primary/10" />
        <div className="absolute bottom-10 right-[5%] w-96 h-96 rounded-full bg-secondary/5 blur-3xl dark:bg-secondary/10" />
        
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center text-center relative z-10">
          {/* Animated Heading */}
          <motion.h1
            className="font-heading text-4xl md:text-6xl lg:text-7xl mb-6 text-primary drop-shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Upgrading Human Consciousness with AI
          </motion.h1>

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
              whileHover={{ boxShadow: "0 0 15px rgba(100, 255, 218, 0.3)" }}
            >
              Learn More
            </motion.a>
          </motion.div>
        </div>
      </section>
      
      <SectionDivider />
      
      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 
            className="text-2xl md:text-3xl font-heading text-center mb-16 text-textPrimary dark:text-textPrimary"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            How we're advancing AI adoption in education
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
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
              <motion.div 
                key={index} 
                className="bg-darkBg/30 dark:bg-darkBg/30 p-8 rounded-lg border border-textSecondary/10 hover:border-primary/30 transition-colors group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-6">
                  <span className="text-primary text-xl font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-textPrimary dark:text-textPrimary group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-textSecondary dark:text-textSecondary">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
