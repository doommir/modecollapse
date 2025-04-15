'use client'

import Link from 'next/link'

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-darkBg text-white flex flex-col items-center justify-center">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Login - Simple Version</h1>
        <p className="mb-6 text-center">This is a simplified test page</p>
        <div className="text-center">
          <Link href="/" className="text-blue-400 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
} 