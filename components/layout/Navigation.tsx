"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Brain, Menu, X, Plus } from "lucide-react"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-deep-purple/80 backdrop-blur-md border-b border-cyber-purple/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image
              src="/mode-collapse-logo.svg"
              alt="Mode Collapse"
              width={120}
              height={36}
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-white/80 hover:text-electric-blue transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/tools"
              className="text-white/80 hover:text-electric-blue transition-colors font-medium"
            >
              Tools
            </Link>
            <Link
              href="/submit-tool"
              className="text-white/80 hover:text-electric-blue transition-colors font-medium"
            >
              Submit Tool
            </Link>
            
            {/* CTA Button */}
            <Button
              size="sm"
              className="bg-gradient-to-r from-cyber-purple to-glow-blue hover:from-cyber-purple/80 hover:to-glow-blue/80 text-white font-medium px-4 py-2 rounded-lg"
              asChild
            >
              <Link href="/submit-tool" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Submit
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white/80 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-cyber-purple/20 bg-deep-purple/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 text-white/80 hover:text-electric-blue hover:bg-cyber-purple/20 rounded-md transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/tools"
                className="block px-3 py-2 text-white/80 hover:text-electric-blue hover:bg-cyber-purple/20 rounded-md transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Tools
              </Link>
              <Link
                href="/submit-tool"
                className="block px-3 py-2 text-white/80 hover:text-electric-blue hover:bg-cyber-purple/20 rounded-md transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Submit Tool
              </Link>
              
              {/* Mobile CTA */}
              <div className="pt-2">
                <Button
                  className="w-full bg-gradient-to-r from-cyber-purple to-glow-blue hover:from-cyber-purple/80 hover:to-glow-blue/80 text-white font-medium"
                  asChild
                >
                  <Link href="/submit-tool" className="flex items-center justify-center gap-2" onClick={() => setIsMenuOpen(false)}>
                    <Plus className="w-4 h-4" />
                    Submit Tool
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}