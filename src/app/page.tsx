'use client'

import { motion } from 'framer-motion'
import Image from "next/image";

export default function Home() {
  return (
    <section className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center text-center">
        {/* Animated Heading */}
        <motion.h1
          className="font-heading text-4xl md:text-6xl mb-6 text-primary"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Upgrading Human Consciousness with AI
        </motion.h1>

        <motion.p
          className="text-textSecondary text-lg md:text-xl max-w-2xl mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Modecollapse.io is a digital lab empowering educators, leaders, and 
          lifelong learners to harness AI for deeper human potential.
        </motion.p>

        <motion.a
          href="/portfolio"
          className="bg-primary text-darkBg px-6 py-3 rounded font-semibold hover:opacity-90"
          whileHover={{ scale: 1.05 }}
        >
          Explore Our Work
        </motion.a>
      </div>
    </section>
  );
}
