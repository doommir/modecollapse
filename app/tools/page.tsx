import { getAllTools } from "@/lib/tools";
import { ModeCollapseDirectory } from "@/components/tools/ModeCollapseDirectory";

export default async function ToolsPage() {
  const tools = await getAllTools();

  return <ModeCollapseDirectory tools={tools} />;
}