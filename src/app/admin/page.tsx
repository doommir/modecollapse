'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Import the blog posts - in a real app this would be fetched from an API
import { blogPosts } from '@/data/blogPosts'

export default function AdminPage() {
  const router = useRouter()
  
  return (
    <div className="min-h-screen bg-darkBg text-textPrimary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Blog Admin</h1>
          <Link href="/" className="px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-md transition-colors">
            Back to Home
          </Link>
        </div>
        
        <div className="bg-darkBg/30 border border-textSecondary/10 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">All Blog Posts</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-textSecondary/10">
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Author</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogPosts.map(post => (
                  <tr key={post.id} className="border-b border-textSecondary/10 hover:bg-darkBg/50">
                    <td className="px-4 py-3">{post.id}</td>
                    <td className="px-4 py-3">{post.title}</td>
                    <td className="px-4 py-3">{post.author}</td>
                    <td className="px-4 py-3">{post.date}</td>
                    <td className="px-4 py-3">
                      <Link 
                        href={`/admin/edit/${post.slug}`}
                        className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-md text-sm transition-colors"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
} 