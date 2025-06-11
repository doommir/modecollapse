"use client"

import { Brain } from "lucide-react"

export function AboutSection() {
  return (
    <section className="py-20 px-6 bg-dark-purple/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-geometric text-3xl md:text-4xl font-bold mb-6">
              Break the{" "}
              <span className="bg-gradient-to-r from-neon-magenta to-electric-blue bg-clip-text text-transparent">
                Loop
              </span>
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              Mode Collapse is more than a directory—it's a digital mystery school for the AI awakening. We curate
              consciousness-expanding tools that help you transcend algorithmic limitations and build your own path in
              the intelligence revolution.
            </p>
            <p className="text-white/60">
              Every tool is tested by humans who understand that true AI mastery comes from conscious curation, not
              endless feeds.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 bg-gradient-to-br from-cyber-purple/20 to-electric-blue/20 rounded-full flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-br from-neon-magenta/30 to-cyber-purple/30 rounded-full flex items-center justify-center animate-pulse-glow">
                  <Brain className="w-16 h-16 text-electric-blue" />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-neon-magenta rounded-full animate-float"></div>
              <div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-electric-blue rounded-full animate-float"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}