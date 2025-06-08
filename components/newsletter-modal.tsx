"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

interface NewsletterModalProps {
  isOpen: boolean
  onClose: () => void
}

export function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle newsletter signup
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      onClose()
      setEmail("")
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-dark-purple border-cyber-purple/30 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="font-geometric text-xl text-center">Join the Movement</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 text-white/70 hover:text-white"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-deep-purple border-cyber-purple/50 text-white placeholder:text-white/50"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-electric-blue to-neon-magenta hover:from-electric-blue/80 hover:to-neon-magenta/80 text-white font-medium rounded-xl"
            >
              Begin Initiation
            </Button>
            <p className="text-xs text-white/60 text-center">
              Receive curated AI tools and consciousness-expanding insights
            </p>
          </form>
        ) : (
          <div className="text-center py-8">
            <div className="text-electric-blue text-2xl mb-2">✨</div>
            <p className="text-white">Welcome to the awakening.</p>
            <p className="text-white/60 text-sm">Check your email for next steps.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
