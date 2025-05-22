import fs from 'fs'
import path from 'path'
import { BlogPostMeta } from '@/app/blog/types' // Adjust path relative to lib

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

// Function to get all blog post metadata by reading file content
export async function getAllPostsMeta(): Promise<BlogPostMeta[]> {
  const entries = await fs.promises.readdir(BLOG_DIR, { withFileTypes: true })
  // Filter out files like types.ts or page.tsx, only keep directories
  const postFolders = entries.filter(entry => entry.isDirectory())

  const allMetaPromises = postFolders.map(async (folder) => {
    // Prefer JSON metadata if available for safety and simplicity
    const jsonMetaPath = path.join(BLOG_DIR, folder.name, 'meta.json')

    try {
      if (fs.existsSync(jsonMetaPath)) {
        // Parse JSON directly
        const jsonContent = await fs.promises.readFile(jsonMetaPath, 'utf8')
        const metaObject = JSON.parse(jsonContent)
        return { ...metaObject, slug: folder.name } as BlogPostMeta
      }

      // Legacy meta.ts files are no longer supported for security reasons

      console.warn(`No metadata file found in ${folder.name}`)
      return null
    } catch (error) {
      console.error(`Error reading or processing metadata for ${folder.name}:`, error)
      return null // Skip posts with errors
    }
  })

  const allMeta = await Promise.all(allMetaPromises)

  // Filter out nulls and sort by date descending
  const validMeta = allMeta.filter((meta): meta is BlogPostMeta => meta !== null)
  validMeta.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return validMeta
} 