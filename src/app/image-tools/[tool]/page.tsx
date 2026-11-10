import ToolView from "@/components/ToolView";
import { getToolBySlug, getToolsByCategory } from "@/data/tools";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getToolsByCategory("image-tools").map((tool) => ({
    tool: tool.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string }>;
}): Promise<Metadata> {
  const { tool: toolSlug } = await params;
  const tool = getToolBySlug("image-tools", toolSlug);
  return {
    title: tool ? `${tool.name} - mytoolpocket.com` : "Image Tool - mytoolpocket.com",
    description: tool?.description || "Free image utility in your pocket.",
  };
}

export default async function ImageToolPage({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool } = await params;
  return <ToolView categorySlug="image-tools" toolSlug={tool} />;
}
