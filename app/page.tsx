import { getAllToolsAsync, getAllTools } from "@/lib/tools"
import { getAllToolsWithImported } from "@/lib/tools-server"
import { ModeCollapseDirectory } from "@/components/tools/ModeCollapseDirectory"

export default async function Page() {
  // Try to fetch from Airtable, fall back to static + imported data
  let tools
  try {
    tools = await getAllToolsAsync()
    // If Airtable returns empty, combine static and imported tools
    if (tools.length === 0) {
      tools = getAllToolsWithImported(getAllTools())
    }
  } catch (error) {
    console.error('Error fetching tools:', error)
    // Fallback to static + imported data
    tools = getAllToolsWithImported(getAllTools())
  }

  return <ModeCollapseDirectory tools={tools} />
}