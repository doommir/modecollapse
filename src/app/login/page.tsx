'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function TestLoginPage() {
  return (
    <div className="min-h-screen bg-darkBg text-textPrimary flex flex-col items-center justify-center">
      <div className="w-full max-w-md p-8 bg-darkBg/30 border border-textSecondary/10 rounded-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Test Login Page</h1>
          <p className="text-textSecondary mt-2">This is a test page to verify routing</p>
        </div>
        
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-primary hover:underline"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
} 