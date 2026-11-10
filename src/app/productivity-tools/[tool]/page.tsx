import ToolView from "@/components/ToolView";
import { getToolBySlug, getToolsByCategory } from "@/data/tools";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getToolsByCategory("productivity-tools").map((tool) => ({
    tool: tool.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string }>;
}): Promise<Metadata> {
  const { tool: toolSlug } = await params;
  const tool = getToolBySlug("productivity-tools", toolSlug);
  return {
    title: tool ? `${tool.name} - mytoolpocket.com` : "Productivity Tool - mytoolpocket.com",
    description: tool?.description || "Free productivity utility in your pocket.",
  };
}

export default async function ProductivityToolPage({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool } = await params;
  return <ToolView categorySlug="productivity-tools" toolSlug={tool} />;
}
