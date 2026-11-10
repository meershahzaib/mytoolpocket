import ToolView from "@/components/ToolView";
import { getToolBySlug, getToolsByCategory } from "@/data/tools";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getToolsByCategory("security-tools").map((tool) => ({
    tool: tool.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string }>;
}): Promise<Metadata> {
  const { tool: toolSlug } = await params;
  const tool = getToolBySlug("security-tools", toolSlug);
  return {
    title: tool ? `${tool.name} - mytoolpocket.com` : "Security Tool - mytoolpocket.com",
    description: tool?.description || "Free security utility in your pocket.",
  };
}

export default async function SecurityToolPage({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool } = await params;
  return <ToolView categorySlug="security-tools" toolSlug={tool} />;
}
