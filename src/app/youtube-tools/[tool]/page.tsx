import ToolView from "@/components/ToolView";
import { getToolBySlug, getToolsByCategory } from "@/data/tools";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getToolsByCategory("youtube-tools").map((tool) => ({
    tool: tool.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string }>;
}): Promise<Metadata> {
  const { tool: toolSlug } = await params;
  const tool = getToolBySlug("youtube-tools", toolSlug);
  return {
    title: tool ? `${tool.name} - mytoolpocket.com` : "YouTube Tool - mytoolpocket.com",
    description: tool?.description || "Free YouTube utility in your pocket.",
  };
}

export default async function YouTubeToolPage({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool } = await params;
  return <ToolView categorySlug="youtube-tools" toolSlug={tool} />;
}
