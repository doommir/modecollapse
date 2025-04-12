'use client' // needed if you plan on using client-side interactivity

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="p-4 flex items-center justify-between bg-darkBg">
      <Link href="/" className="font-heading text-xl text-primary">
        Modecollapse
      </Link>
      <button
        className="text-textPrimary md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Simple hamburger menu icon (could replace with an SVG icon) */}
        ☰
      </button>
      <motion.div
        className={`${
          isOpen ? 'block' : 'hidden'
        } absolute top-16 left-0 w-full bg-darkBg md:block md:static md:w-auto`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ul className="flex flex-col md:flex-row gap-4 p-4 md:p-0">
          <li>
            <Link href="/portfolio" className="hover:text-primary">
              Portfolio
            </Link>
          </li>
          <li>
            <Link href="/news" className="hover:text-primary">
              News/Updates
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-primary">
              About
            </Link>
          </li>
        </ul>
      </motion.div>
    </nav>
  )
} 