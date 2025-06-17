"use client"

import Link from "next/link"

export function TestSimpleButtons() {
  const handleClick = () => {
    alert('Button clicked!')
  }

  return (
    <div className="p-8 bg-red-500 text-white">
      <h2>Button Test Section</h2>
      
      <div className="space-y-4">
        {/* Simple button with click handler */}
        <button 
          onClick={handleClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Test Alert Button
        </button>
        
        {/* Simple link */}
        <Link 
          href="/tools" 
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-block"
        >
          Test Link to Tools
        </Link>
        
        {/* Button with link */}
        <Link href="/tools">
          <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
            Test Button Link
          </button>
        </Link>
      </div>
    </div>
  )
}