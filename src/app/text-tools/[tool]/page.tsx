import ToolView from "@/components/ToolView";
import { getToolBySlug, getToolsByCategory } from "@/data/tools";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getToolsByCategory("text-tools").map((tool) => ({
    tool: tool.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string }>;
}): Promise<Metadata> {
  const { tool: toolSlug } = await params;
  const tool = getToolBySlug("text-tools", toolSlug);
  return {
    title: tool ? `${tool.name} - mytoolpocket.com` : "Text Tool - mytoolpocket.com",
    description: tool?.description || "Free online tool in your pocket.",
  };
}

export default async function TextToolPage({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool } = await params;
  return <ToolView categorySlug="text-tools" toolSlug={tool} />;
}
