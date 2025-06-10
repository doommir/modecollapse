"use client"

import { Brain } from "lucide-react"
import Link from "next/link"
import { ToolSubmitForm } from "@/components/ToolSubmitForm"

export default function SubmitToolPage() {
  return (
    <div className="min-h-screen bg-deep-purple text-white">
      {/* Header */}
      <div className="border-b border-cyber-purple/20 bg-dark-purple/30">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/" className="flex items-center gap-2 text-white hover:text-electric-blue transition-colors">
            <Brain className="w-6 h-6" />
            <span className="font-geometric text-lg font-bold">Mode Collapse</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="font-geometric text-4xl md:text-5xl font-bold mb-4">
            Submit an{" "}
            <span className="bg-gradient-to-r from-electric-blue to-neon-magenta bg-clip-text text-transparent">
              AI Tool
            </span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Help us expand the consciousness-expanding toolkit. Share a tool that's worthy of the directory.
          </p>
          <div className="mt-4 px-4 py-2 bg-cyber-purple/20 border border-cyber-purple/30 rounded-lg inline-block">
            <p className="text-electric-blue text-sm">
              🔗 Submissions go directly to our n8n automation pipeline
            </p>
          </div>
        </div>

        <ToolSubmitForm />

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-white/50 text-sm">
            By submitting a tool, you agree that it will be processed by our automation pipeline and may be featured in our directory.
          </p>
        </div>
      </div>
    </div>
  )
}