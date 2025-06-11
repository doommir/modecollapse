"use client"

import { useState } from "react"
import Image from "next/image"

interface ToolImageProps {
  tool: {
    name: string
    screenshotUrl?: string
    url?: string
    tags?: string[]
  }
  className?: string
  width?: number
  height?: number
}

export function ToolImage({ tool, className = "", width = 400, height = 240 }: ToolImageProps) {
  const [imageError, setImageError] = useState(false)
  const [fallbackError, setFallbackError] = useState(false)

  // Generate a branded placeholder using UI Avatars
  const generatePlaceholder = (name: string) => {
    const encodedName = encodeURIComponent(name)
    return `https://ui-avatars.com/api/?name=${encodedName}&size=${width}&background=1a1a2e&color=00d4ff&bold=true&format=png`
  }

  // Generate a simple SVG placeholder
  const generateSVGPlaceholder = (name: string) => {
    const firstLetter = name.charAt(0).toUpperCase()
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#0a0a0f;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad1)"/>
        <text x="50%" y="50%" font-family="system-ui, -apple-system, sans-serif" font-size="48" font-weight="bold" fill="#00d4ff" text-anchor="middle" dominant-baseline="middle">${firstLetter}</text>
        <text x="50%" y="75%" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#ffffff80" text-anchor="middle" dominant-baseline="middle">${name}</text>
      </svg>
    `
    return `data:image/svg+xml;base64,${btoa(svg)}`
  }

  // Try to get favicon from the tool's URL
  const getFaviconUrl = (url?: string) => {
    if (!url) return null
    try {
      const domain = new URL(url).hostname
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
    } catch {
      return null
    }
  }

  const faviconUrl = getFaviconUrl(tool.url)

  // Determine which image to show
  let imageSrc = tool.screenshotUrl
  
  if (imageError) {
    if (faviconUrl && !fallbackError) {
      imageSrc = faviconUrl
    } else {
      imageSrc = generatePlaceholder(tool.name)
    }
  }

  return (
    <div className="relative">
      <Image
        src={imageSrc || generateSVGPlaceholder(tool.name)}
        alt={`${tool.name} screenshot`}
        width={width}
        height={height}
        className={className}
        onError={() => {
          if (!imageError && tool.screenshotUrl) {
            setImageError(true)
          } else if (faviconUrl && !fallbackError) {
            setFallbackError(true)
          }
        }}
        unoptimized={imageSrc?.startsWith('data:') || imageSrc?.includes('ui-avatars.com') || imageSrc?.includes('google.com/s2/favicons')}
      />
      
      {/* Show favicon overlay for fallback images */}
      {imageError && faviconUrl && !fallbackError && (
        <div className="absolute top-3 left-3 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg p-1">
          <Image
            src={faviconUrl}
            alt={`${tool.name} favicon`}
            width={24}
            height={24}
            className="w-full h-full object-contain"
            unoptimized
          />
        </div>
      )}
    </div>
  )
}