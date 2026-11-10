import ToolView from "@/components/ToolView";
import { getToolBySlug, getToolsByCategory } from "@/data/tools";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getToolsByCategory("ai-tools").map((tool) => ({
    tool: tool.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string }>;
}): Promise<Metadata> {
  const { tool: toolSlug } = await params;
  const tool = getToolBySlug("ai-tools", toolSlug);
  return {
    title: tool ? `${tool.name} - mytoolpocket.com` : "AI Tool - mytoolpocket.com",
    description: tool?.description || "Free AI utility in your pocket.",
  };
}

export default async function AiToolPage({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool } = await params;
  return <ToolView categorySlug="ai-tools" toolSlug={tool} />;
}
