import fs from 'fs'
import path from 'path'
import { BlogPostMeta } from '@/app/blog/types' // Adjust path relative to lib

const BLOG_DIR = path.join(process.cwd(), 'src/app/blog')

// Function to get all blog post metadata
export async function getAllPostsMeta(): Promise<BlogPostMeta[]> {
  const entries = await fs.promises.readdir(BLOG_DIR, { withFileTypes: true })
  // Filter out files like types.ts or page.tsx, only keep directories
  const postFolders = entries.filter(entry => entry.isDirectory())

  const allMeta = await Promise.all(
    postFolders.map(async (folder) => {
      const metaPath = path.join(BLOG_DIR, folder.name, 'meta.ts')
      try {
        // Use a relative path for dynamic import from the project root perspective
        const relativeMetaPath = `../src/app/blog/${folder.name}/meta.ts`; 
        const metaModule = await import(relativeMetaPath);

        if (metaModule && metaModule.meta) {
          // Add the slug based on the folder name
          return { ...metaModule.meta, slug: folder.name } as BlogPostMeta;
        } else {
          console.warn(`Metadata not found or invalid format in ${metaPath}`);
          return null;
        }
      } catch (error) {
        // Log specific error for dynamic import failure
        if (error instanceof Error && error.message.includes('Cannot find module')) {
           console.warn(`Could not dynamically import metadata for ${folder.name}. Check path: ${metaPath}`);
        } else {
          console.error(`Error reading metadata for ${folder.name}:`, error)
        }
        return null // Skip posts with errors
      }
    })
  )

  // Filter out nulls and sort by date descending
  const validMeta = allMeta.filter((meta): meta is BlogPostMeta => meta !== null)
  validMeta.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return validMeta
} 