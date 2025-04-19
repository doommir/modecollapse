import { notFound } from 'next/navigation'
import path from 'path'
import fs from 'fs'

// Dynamic Blog Post Page
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const mdxPath = path.join(process.cwd(), 'content', 'blog', slug, 'page.mdx')

  // Verify file exists otherwise 404
  if (!fs.existsSync(mdxPath)) {
    notFound()
  }

  // Dynamically import the MDX component
  const { default: Post } = await import(`../../../../content/blog/${slug}/page.mdx`)
  return <Post />
} 