import fs from 'fs'
import path from 'path'
import { BlogPostMeta } from '@/app/blog/types' // Adjust path relative to lib

const BLOG_DIR = path.join(process.cwd(), 'src/app/blog')

// Function to get all blog post metadata by reading file content
export async function getAllPostsMeta(): Promise<BlogPostMeta[]> {
  const entries = await fs.promises.readdir(BLOG_DIR, { withFileTypes: true })
  // Filter out files like types.ts or page.tsx, only keep directories
  const postFolders = entries.filter(entry => entry.isDirectory())

  const allMetaPromises = postFolders.map(async (folder) => {
    const metaPath = path.join(BLOG_DIR, folder.name, 'meta.ts')
    try {
      if (!fs.existsSync(metaPath)) {
        console.warn(`meta.ts not found in ${folder.name}`)
        return null
      }

      const fileContent = await fs.promises.readFile(metaPath, 'utf8')
      
      // Basic parsing: find the export const meta = { ... }; block
      // WARNING: This is fragile and depends on exact formatting.
      const metaMatch = fileContent.match(/export const meta:?.*?= (\{[\s\S]*?\});/)
      
      if (metaMatch && metaMatch[1]) {
        // Use Function constructor for safer evaluation than direct eval
        // This assumes the object literal is valid JavaScript
        try {
          const metaObject = new Function(`return (${metaMatch[1]});`)()
          // Add slug derived from folder name
          return { ...metaObject, slug: folder.name } as BlogPostMeta
        } catch (evalError) {
          console.error(`Error evaluating meta object in ${metaPath}:`, evalError)
          return null
        }
      } else {
        console.warn(`Could not parse meta export in ${metaPath}`)
        return null
      }
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