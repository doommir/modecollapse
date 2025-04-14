'use client' // needed if you plan on using client-side interactivity

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-darkBg/90 dark:bg-darkBg/90 border-b border-textSecondary/10 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          href="/" 
          className="font-heading text-xl text-primary relative group"
        >
          <span className="group-hover:text-secondary transition-colors duration-300">
            Modecollapse
          </span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
        </Link>
        
        <button
          className="text-textPrimary dark:text-textPrimary md:hidden p-2 rounded hover:bg-primary/10 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle menu"
        >
          {/* Hamburger icon with animation */}
          <div className="w-6 flex flex-col items-end space-y-1.5">
            <motion.span 
              className="block h-0.5 bg-textPrimary dark:bg-textPrimary w-6"
              animate={{ width: isOpen ? '24px' : '16px', rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
            />
            <motion.span 
              className="block h-0.5 bg-textPrimary dark:bg-textPrimary w-4"
              animate={{ width: isOpen ? '24px' : '12px', opacity: isOpen ? 0 : 1 }}
            />
            <motion.span 
              className="block h-0.5 bg-textPrimary dark:bg-textPrimary w-6"
              animate={{ width: isOpen ? '24px' : '20px', rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
            />
          </div>
        </button>
        
        <motion.div
          className={`${
            isOpen ? 'block' : 'hidden'
          } absolute top-full left-0 w-full bg-darkBg dark:bg-darkBg border-b border-textSecondary/10 md:static md:w-auto md:border-none md:bg-transparent md:dark:bg-transparent md:block md:flex-1`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
          transition={{ duration: 0.3 }}
        >
          <ul className="flex flex-col md:flex-row gap-0 md:gap-6 p-4 md:p-0 md:justify-center">
            <li>
              <Link 
                href="/portfolio" 
                className="block py-3 md:py-1 border-b md:border-none border-textSecondary/10 hover:text-primary transition-colors relative group"
                onClick={() => setIsOpen(false)}
              >
                Portfolio
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 hidden md:block"></span>
              </Link>
            </li>
            <li>
              <Link 
                href="/news" 
                className="block py-3 md:py-1 border-b md:border-none border-textSecondary/10 hover:text-primary transition-colors relative group"
                onClick={() => setIsOpen(false)}
              >
                News/Updates
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 hidden md:block"></span>
              </Link>
            </li>
            <li>
              <Link 
                href="/blog" 
                className="block py-3 md:py-1 border-b md:border-none border-textSecondary/10 hover:text-primary transition-colors relative group"
                onClick={() => setIsOpen(false)}
              >
                Blog
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 hidden md:block"></span>
              </Link>
            </li>
            <li>
              <Link 
                href="/images" 
                className="block py-3 md:py-1 border-b md:border-none border-textSecondary/10 hover:text-primary transition-colors relative group"
                onClick={() => setIsOpen(false)}
              >
                Images
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 hidden md:block"></span>
              </Link>
            </li>
            <li>
              <Link 
                href="/upload" 
                className="block py-3 md:py-1 border-b md:border-none border-textSecondary/10 hover:text-primary transition-colors relative group"
                onClick={() => setIsOpen(false)}
              >
                Upload
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 hidden md:block"></span>
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                className="block py-3 md:py-1 hover:text-primary transition-colors relative group"
                onClick={() => setIsOpen(false)}
              >
                About
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 hidden md:block"></span>
              </Link>
            </li>
          </ul>
        </motion.div>
      </div>
    </nav>
  )
} 