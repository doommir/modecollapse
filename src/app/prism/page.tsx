'use client'

import { useState } from 'react'

export default function PrismPage() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [lenses, setLenses] = useState<Record<string, string> | null>(null)
  const [error, setError] = useState('')

  const generate = async () => {
    setLoading(true)
    setError('')
    setLenses(null)
    try {
      const res = await fetch('/api/prism', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: input })
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to generate')
      }
      const data = await res.json()
      setLenses(data.lenses)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Perspective Prism</h1>
      <textarea
        className="w-full border rounded p-2 mb-4 text-black"
        rows={6}
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter text or a tweet URL"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={generate}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Lenses'}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {lenses && (
        <div className="mt-6 space-y-4">
          {Object.entries(lenses).map(([persona, text]) => (
            <div key={persona}>
              <h2 className="text-xl font-semibold mb-1">{persona}</h2>
              <p>{text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
