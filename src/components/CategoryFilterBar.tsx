import React, { useState } from 'react'

const CATEGORIES = [
  'All',
  'Education',
  'Content Creation',
  'AI',
  'Web Development',
  'Productivity',
] as const

export default function CategoryFilterBar() {
  'use client'
  const [active, setActive] = useState<string>('All')

  return (
    <nav
      className="mb-8 flex w-full gap-3 overflow-x-auto rounded-xl bg-darkBg/40 p-4 backdrop-blur-sm scrollbar-hide [mask-image:_linear-gradient(to_right,transparent_0,_black_96px,_black_calc(100%-96px),transparent_100%)]"
    >
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={`whitespace-nowrap rounded-full border px-4 py-1 text-sm font-semibold transition-all duration-300 ${
            active === cat
              ? 'border-primary/60 bg-primary/15 text-primary shadow-neon'
              : 'border-textSecondary/25 text-textSecondary hover:border-primary/40 hover:text-primary'
          }`}
        >
          {cat}
        </button>
      ))}
    </nav>
  )
} 