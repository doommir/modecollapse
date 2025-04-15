'use client'

import Link from 'next/link'

export default function AdminTestPage() {
  return (
    <div className="min-h-screen bg-darkBg text-textPrimary flex flex-col items-center justify-center">
      <div className="w-full max-w-md p-8 bg-darkBg/30 border border-textSecondary/10 rounded-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Admin Test Page</h1>
          <p className="text-textSecondary mt-2">If you can see this, admin routing works</p>
        </div>
        
        <div className="mt-6 text-center">
          <Link
            href="/admin/login"
            className="text-primary hover:underline block mb-4"
          >
            Go to Admin Login
          </Link>
          <Link
            href="/"
            className="text-primary hover:underline block"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
} 