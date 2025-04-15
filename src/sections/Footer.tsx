'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  const socialLinks = [
    { name: 'Twitter', url: '#', icon: 'X' },
    { name: 'LinkedIn', url: '#', icon: 'in' },
    { name: 'GitHub', url: '#', icon: 'GH' },
  ]
  
  const navLinks = [
    { name: 'Home', url: '/' },
    { name: 'Portfolio', url: '/portfolio' },
    { name: 'News', url: '/news' },
    { name: 'About', url: '/about' },
  ]
  
  return (
    <footer className="bg-darkBg dark:bg-darkBg border-t border-textSecondary/10">
      <div className="max-w-7xl mx-auto py-16 px-6">
        {/* Top section with logo and nav */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-12">
          {/* Logo and tagline */}
          <div className="space-y-5">
            <Link href="/" className="font-heading text-2xl text-primary inline-block">
              Modecollapse
            </Link>
            <p className="text-textSecondary dark:text-textSecondary max-w-xs">
              Empowering educators and learners through ethical AI integration.
            </p>
            
            {/* Social links */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map(link => (
                <motion.a 
                  key={link.name}
                  href={link.url}
                  className="w-10 h-10 rounded-full border border-textSecondary/20 flex items-center justify-center text-primary hover:border-primary hover:bg-primary/5 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={link.name}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-textPrimary dark:text-textPrimary font-heading text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {navLinks.map(link => (
                <li key={link.name}>
                  <Link 
                    href={link.url} 
                    className="text-textSecondary hover:text-primary transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter signup */}
          <div>
            <h3 className="text-textPrimary dark:text-textPrimary font-heading text-lg mb-6">Stay Updated</h3>
            <p className="text-textSecondary dark:text-textSecondary mb-4">
              Subscribe to receive the latest news on AI in education.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="your@email.com" 
                className="bg-transparent border border-textSecondary/20 rounded-l-md px-4 py-2 text-textPrimary flex-grow focus:outline-none focus:border-primary"
              />
              <button 
                type="submit" 
                className="bg-primary text-darkBg px-4 py-2 rounded-r-md font-medium hover:bg-secondary transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom bar with copyright */}
        <div className="pt-6 border-t border-textSecondary/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-textSecondary dark:text-textSecondary text-sm">
            © {currentYear} Modecollapse. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-textSecondary hover:text-primary text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-textSecondary hover:text-primary text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 