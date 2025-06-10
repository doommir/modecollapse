"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Loader2, CheckCircle, XCircle, Plus, X } from "lucide-react"
import { postToWebhook, validateToolSubmission } from "@/lib/postToWebhook"

interface ToolSubmissionData {
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
  "Writing", "Design", "Data Analysis", "Voice", "Translation", "API", "Open Source"
]

export function ToolSubmitForm() {
  const [formData, setFormData] = useState<ToolSubmissionData>({
    name: "",
    url: "",
    summary: "",
    description: "",
    tags: [],
    promptTips: ""
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState("")
  const [newTag, setNewTag] = useState("")
  const [validationError, setValidationError] = useState("")

  const handleInputChange = (field: keyof ToolSubmissionData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setValidationError("") // Clear validation error when user types
  }

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim()
    if (trimmedTag && !formData.tags.includes(trimmedTag)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, trimmedTag] }))
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
    setValidationError("")
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Client-side validation
    const validationError = validateToolSubmission(formData)
    if (validationError) {
      setValidationError(validationError)
      setIsSubmitting(false)
      return
    }

    try {
      const result = await postToWebhook({
        name: formData.name.trim(),
        url: formData.url.trim(),
        summary: formData.summary.trim(),
        description: formData.description.trim() || undefined,
        tags: formData.tags.length > 0 ? formData.tags : undefined,
        promptTips: formData.promptTips.trim() || undefined
      })

      if (result.success) {
        setSubmitStatus('success')
        setStatusMessage(result.message || 'Tool submitted successfully!')
        // Reset form
        setFormData({
          name: "",
          url: "",
          summary: "",
          description: "",
          tags: [],
          promptTips: ""
        })
      } else {
        setSubmitStatus('error')
        setStatusMessage(result.error || 'Failed to submit tool')
      }
    } catch (error) {
      setSubmitStatus('error')
      setStatusMessage('An unexpected error occurred')
      console.error('Submit error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = formData.name && formData.url && formData.summary && !validationError

  return (
    <div className="max-w-2xl mx-auto">
      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
          <div>
            <p className="font-medium text-green-400">Success!</p>
            <p className="text-green-300 text-sm">{statusMessage}</p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-3">
          <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <div>
            <p className="font-medium text-red-400">Submission Failed</p>
            <p className="text-red-300 text-sm">{statusMessage}</p>
          </div>
        </div>
      )}

      {validationError && (
        <div className="mb-6 p-4 bg-orange-500/20 border border-orange-500/30 rounded-lg flex items-center gap-3">
          <XCircle className="w-5 h-5 text-orange-400 flex-shrink-0" />
          <p className="text-orange-300 text-sm">{validationError}</p>
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
            placeholder="e.g., Claude, ChatGPT, Midjourney"
            className="bg-cyber-purple/20 border-cyber-purple/40 text-white placeholder:text-white/50 focus:border-electric-blue focus:ring-electric-blue/50"
            required
          />
        </div>

        {/* Website URL */}
        <div className="space-y-2">
          <Label htmlFor="url" className="text-white font-medium">
            Website URL *
          </Label>
          <Input
            id="url"
            type="url"
            value={formData.url}
            onChange={(e) => handleInputChange('url', e.target.value)}
            placeholder="https://example.com"
            className="bg-cyber-purple/20 border-cyber-purple/40 text-white placeholder:text-white/50 focus:border-electric-blue focus:ring-electric-blue/50"
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
            maxLength={150}
            className="bg-cyber-purple/20 border-cyber-purple/40 text-white placeholder:text-white/50 focus:border-electric-blue focus:ring-electric-blue/50"
            required
          />
          <p className="text-xs text-white/50">{formData.summary.length}/150 characters</p>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-white font-medium">
            Description (Optional)
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Provide more details about the tool's features, use cases, and benefits..."
            rows={4}
            className="bg-cyber-purple/20 border-cyber-purple/40 text-white placeholder:text-white/50 focus:border-electric-blue focus:ring-electric-blue/50 resize-none"
          />
        </div>

        {/* Tags */}
        <div className="space-y-3">
          <Label className="text-white font-medium">
            Tags (Optional)
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
                .slice(0, 10)
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
              className="bg-cyber-purple/20 border-cyber-purple/40 text-white placeholder:text-white/50 focus:border-electric-blue focus:ring-electric-blue/50"
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
            className="bg-cyber-purple/20 border-cyber-purple/40 text-white placeholder:text-white/50 focus:border-electric-blue focus:ring-electric-blue/50 resize-none"
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
                Submitting to Pipeline...
              </>
            ) : (
              'Submit Tool to Automation'
            )}
          </Button>
        </div>
      </form>

      {/* Info Footer */}
      <div className="mt-8 p-4 bg-dark-purple/50 rounded-lg border border-cyber-purple/20">
        <p className="text-white/70 text-sm text-center">
          Your submission will be sent to our automation pipeline for review and processing. 
          Make sure n8n is running locally to receive submissions.
        </p>
      </div>
    </div>
  )
}