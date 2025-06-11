"use client"

import { Brain, TrendingUp, Linkedin } from "lucide-react"

interface FooterProps {
  onNewsletterOpen: () => void
}

export function Footer({ onNewsletterOpen }: FooterProps) {
  return (
    <footer className="py-12 px-6 border-t border-cyber-purple/20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-electric-blue" />
            <span className="font-geometric text-xl font-bold">Mode Collapse</span>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-white/70">
            <a href="#" className="hover:text-electric-blue transition-colors">
              Tools
            </a>
            <a href="#" className="hover:text-electric-blue transition-colors">
              About
            </a>
            <button onClick={onNewsletterOpen} className="hover:text-electric-blue transition-colors">
              Newsletter
            </button>
            <a href="#" className="hover:text-electric-blue transition-colors flex items-center gap-1">
              <TrendingUp className="w-4 h-4" /> TikTok
            </a>
            <a href="#" className="hover:text-electric-blue transition-colors flex items-center gap-1">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </nav>
        </div>

        <div className="text-center mt-8 pt-8 border-t border-cyber-purple/20">
          <p className="text-white/40 text-sm font-geometric">Initiation begins when the scroll ends.</p>
        </div>
      </div>
    </footer>
  )
}