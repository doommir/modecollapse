import fs from 'fs';
import path from 'path';
import { Tool } from '@/types';

// Server-side function to load imported tools from bulk import
export function getImportedTools(): Tool[] {
  try {
    const importedPath = path.join(process.cwd(), 'data/imported/imported-tools.json');
    if (fs.existsSync(importedPath)) {
      const data = fs.readFileSync(importedPath, 'utf-8');
      const importedTools = JSON.parse(data) as Tool[];
      return importedTools;
    }
  } catch (error) {
    console.warn('Could not load imported tools:', error);
  }
  return [];
}

// Server-side function to get all tools including imported ones
export function getAllToolsWithImported(staticTools: Tool[]): Tool[] {
  const importedTools = getImportedTools();
  const combinedTools = [...staticTools, ...importedTools];
  
  // Remove duplicates by slug (static tools take precedence)
  const uniqueTools = combinedTools.reduce((acc, tool) => {
    if (!acc.find(t => t.slug === tool.slug)) {
      acc.push(tool);
    }
    return acc;
  }, [] as Tool[]);
  
  return uniqueTools;
}