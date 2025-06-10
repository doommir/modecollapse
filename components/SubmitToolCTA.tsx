"use client"

import { Button } from "@/components/ui/button"
import { Plus, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function SubmitToolCTA() {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark-purple via-cyber-purple/20 to-dark-purple opacity-50"></div>
      
      {/* Floating particles */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-electric-blue/30 rounded-full animate-float"></div>
      <div 
        className="absolute top-20 right-20 w-1 h-1 bg-neon-magenta/40 rounded-full animate-float" 
        style={{ animationDelay: "1s" }}
      ></div>
      <div 
        className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-cyber-purple/30 rounded-full animate-float" 
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-electric-blue/20 to-neon-magenta/20 rounded-full flex items-center justify-center animate-pulse-glow">
              <Plus className="w-8 h-8 text-electric-blue" />
            </div>
            <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-neon-magenta animate-pulse" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="font-geometric text-3xl md:text-4xl font-bold mb-4">
          Know a tool{" "}
          <span className="bg-gradient-to-r from-electric-blue to-neon-magenta bg-clip-text text-transparent">
            we missed?
          </span>
        </h2>

        {/* Subtext */}
        <p className="text-white/70 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
          Help us expand the consciousness-expanding toolkit. Share a tool that's worthy of the directory 
          and join the collective intelligence revolution.
        </p>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8 text-sm">
          <div className="flex items-center gap-2 text-white/60">
            <div className="w-2 h-2 bg-electric-blue rounded-full animate-pulse"></div>
            <span>Tools reviewed by human curators</span>
          </div>
          <div className="flex items-center gap-2 text-white/60">
            <div className="w-2 h-2 bg-neon-magenta rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
            <span>Processed via n8n automation</span>
          </div>
          <div className="flex items-center gap-2 text-white/60">
            <div className="w-2 h-2 bg-cyber-purple rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
            <span>Added to directory if approved</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyber-purple to-glow-blue hover:from-cyber-purple/80 hover:to-glow-blue/80 text-white font-medium px-8 py-4 rounded-xl animate-pulse-glow group text-lg"
            asChild
          >
            <Link href="/submit-tool" className="flex items-center gap-2">
              Submit Your Tool
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          
          <div className="text-white/50 text-sm">
            or <Link href="/tools" className="text-electric-blue hover:text-neon-magenta transition-colors underline">browse existing tools</Link>
          </div>
        </div>

        {/* Additional info */}
        <div className="mt-8 p-4 bg-dark-purple/50 rounded-lg border border-cyber-purple/20 max-w-2xl mx-auto">
          <p className="text-white/60 text-sm">
            💡 <strong className="text-white/80">Pro tip:</strong> Tools that enhance human creativity and consciousness 
            get priority in our review queue. We're looking for amplifiers, not replacements.
          </p>
        </div>
      </div>
    </section>
  )
}