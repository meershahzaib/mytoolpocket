import ToolView from "@/components/ToolView";
import { getToolBySlug, getToolsByCategory } from "@/data/tools";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getToolsByCategory("developer-tools").map((tool) => ({
    tool: tool.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string }>;
}): Promise<Metadata> {
  const { tool: toolSlug } = await params;
  const tool = getToolBySlug("developer-tools", toolSlug);
  return {
    title: tool ? `${tool.name} - mytoolpocket.com` : "Developer Tool - mytoolpocket.com",
    description: tool?.description || "Free developer tool in your pocket.",
  };
}

export default async function DeveloperToolPage({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool } = await params;
  return <ToolView categorySlug="developer-tools" toolSlug={tool} />;
}
