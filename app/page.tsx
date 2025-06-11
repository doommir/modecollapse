import { getAllToolsAsync, getAllTools } from "@/lib/tools"
import HomePage from "@/components/HomePage"

export default async function Page() {
  // Try to fetch from Airtable, fall back to static data
  let tools
  try {
    tools = await getAllToolsAsync()
  } catch (error) {
    console.error('Error fetching tools:', error)
    tools = getAllTools() // Fallback to static data
  }

  return <HomePage initialTools={tools} />
}