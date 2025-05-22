'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminLogin() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const ADMIN_USER = process.env.NEXT_PUBLIC_ADMIN_USER
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!ADMIN_USER || !ADMIN_PASSWORD) {
        throw new Error('Admin credentials are not configured')
      }

      if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
        // Set a cookie to maintain the session
        document.cookie = `admin_session=true; path=/; max-age=${60 * 60 * 24 * 7}` // 1 week
        router.push('/admin')
      } else {
        setError('Invalid username or password')
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred during login'
      setError(message)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-darkBg text-textPrimary flex flex-col items-center justify-center">
      <div className="w-full max-w-md p-8 bg-darkBg/30 border border-textSecondary/10 rounded-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Admin Login</h1>
          <p className="text-textSecondary mt-2">Enter your credentials to access the admin panel</p>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-400/10 text-red-400 p-3 rounded-md mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label htmlFor="username" className="block text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-darkBg/50 border border-textSecondary/20 rounded-md px-4 py-2 text-textPrimary"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-darkBg/50 border border-textSecondary/20 rounded-md px-4 py-2 text-textPrimary"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 bg-primary text-white rounded-md transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

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