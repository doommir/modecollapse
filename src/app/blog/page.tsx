import React, { Suspense } from 'react'

function BlogClient() {
  'use client'
  return (
    <main className="min-h-screen flex items-center justify-center text-textPrimary p-20">
      <p>Blog coming soon...</p>
    </main>
  )
}

export default function BlogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <BlogClient />
    </Suspense>
  )
} 