"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Brain, Loader2, CheckCircle, XCircle, Plus, X } from "lucide-react"
import Link from "next/link"

interface ToolSubmission {
  name: string
  url: string
  summary: string
  description: string
  tags: string[]
  promptTips: string
}

const suggestedTags = [
  "GPT-4", "Free", "Coding", "Image Gen", "Premium", "Creative", "Automation", 
  "Research", "Video", "Beta", "Subscription", "AI Assistant", "Productivity",
  "Writing", "Design", "Data Analysis", "Voice", "Translation"
]

export default function SubmitToolPage() {
  const [formData, setFormData] = useState<ToolSubmission>({
    name: "",
    url: "",
    summary: "",
    description: "",
    tags: [],
    promptTips: ""
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState("")
  const [newTag, setNewTag] = useState("")

  const handleInputChange = (field: keyof ToolSubmission, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }))
    }
    setNewTag("")
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/submit-tool', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to submit tool')
      }

      setSubmitStatus('success')
      setFormData({
        name: "",
        url: "",
        summary: "",
        description: "",
        tags: [],
        promptTips: ""
      })
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = formData.name && formData.url && formData.summary && formData.tags.length > 0

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
        </div>

        <Card className="bg-dark-purple/50 border-cyber-purple/30">
          <CardHeader>
            <CardTitle className="font-geometric text-2xl text-center">Tool Submission Form</CardTitle>
          </CardHeader>
          <CardContent>
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <div>
                  <p className="font-medium text-green-400">Tool submitted successfully!</p>
                  <p className="text-green-300 text-sm">We'll review your submission and add it to our directory if approved.</p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-3">
                <XCircle className="w-5 h-5 text-red-400" />
                <div>
                  <p className="font-medium text-red-400">Submission failed</p>
                  <p className="text-red-300 text-sm">{errorMessage}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Tool Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white font-medium">
                  Tool Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., Claude Artifacts"
                  className="bg-cyber-purple/20 border-cyber-purple/40 text-white placeholder:text-white/50 focus:border-electric-blue"
                  required
                />
              </div>

              {/* URL */}
              <div className="space-y-2">
                <Label htmlFor="url" className="text-white font-medium">
                  URL *
                </Label>
                <Input
                  id="url"
                  type="url"
                  value={formData.url}
                  onChange={(e) => handleInputChange('url', e.target.value)}
                  placeholder="https://example.com"
                  className="bg-cyber-purple/20 border-cyber-purple/40 text-white placeholder:text-white/50 focus:border-electric-blue"
                  required
                />
              </div>

              {/* One-line Summary */}
              <div className="space-y-2">
                <Label htmlFor="summary" className="text-white font-medium">
                  One-line Summary *
                </Label>
                <Input
                  id="summary"
                  value={formData.summary}
                  onChange={(e) => handleInputChange('summary', e.target.value)}
                  placeholder="Brief description of what this tool does"
                  maxLength={120}
                  className="bg-cyber-purple/20 border-cyber-purple/40 text-white placeholder:text-white/50 focus:border-electric-blue"
                  required
                />
                <p className="text-xs text-white/50">{formData.summary.length}/120 characters</p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-white font-medium">
                  Detailed Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Provide more details about the tool's features, use cases, and benefits..."
                  rows={4}
                  className="bg-cyber-purple/20 border-cyber-purple/40 text-white placeholder:text-white/50 focus:border-electric-blue resize-none"
                />
              </div>

              {/* Tags */}
              <div className="space-y-3">
                <Label className="text-white font-medium">
                  Tags * (Select or add custom tags)
                </Label>
                
                {/* Selected Tags */}
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-electric-blue/20 text-electric-blue border-electric-blue/30 flex items-center gap-1"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:text-red-400 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Suggested Tags */}
                <div className="space-y-2">
                  <p className="text-sm text-white/70">Suggested tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedTags
                      .filter(tag => !formData.tags.includes(tag))
                      .map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => addTag(tag)}
                          className="px-3 py-1 bg-cyber-purple/20 border border-cyber-purple/40 text-cyber-purple text-sm rounded-full hover:border-electric-blue hover:text-electric-blue transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                  </div>
                </div>

                {/* Custom Tag Input */}
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add custom tag"
                    className="bg-cyber-purple/20 border-cyber-purple/40 text-white placeholder:text-white/50 focus:border-electric-blue"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addTag(newTag)
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => addTag(newTag)}
                    size="sm"
                    variant="outline"
                    className="border-cyber-purple text-cyber-purple hover:border-electric-blue hover:text-electric-blue"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Prompt Tips */}
              <div className="space-y-2">
                <Label htmlFor="promptTips" className="text-white font-medium">
                  Prompt Tips (Optional)
                </Label>
                <Textarea
                  id="promptTips"
                  value={formData.promptTips}
                  onChange={(e) => handleInputChange('promptTips', e.target.value)}
                  placeholder="Share any useful prompts, tips, or best practices for using this tool..."
                  rows={3}
                  className="bg-cyber-purple/20 border-cyber-purple/40 text-white placeholder:text-white/50 focus:border-electric-blue resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="w-full bg-gradient-to-r from-cyber-purple to-glow-blue hover:from-cyber-purple/80 hover:to-glow-blue/80 text-white font-medium py-3 rounded-xl animate-pulse-glow disabled:opacity-50 disabled:cursor-not-allowed disabled:animate-none"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Tool for Review'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-white/50 text-sm">
            By submitting a tool, you agree that it will be reviewed by our team and may be featured in our directory.
          </p>
        </div>
      </div>
    </div>
  )
}