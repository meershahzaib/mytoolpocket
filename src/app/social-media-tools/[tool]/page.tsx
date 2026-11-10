import ToolView from "@/components/ToolView";
import { getToolBySlug, getToolsByCategory } from "@/data/tools";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getToolsByCategory("social-media-tools").map((tool) => ({
    tool: tool.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string }>;
}): Promise<Metadata> {
  const { tool: toolSlug } = await params;
  const tool = getToolBySlug("social-media-tools", toolSlug);
  return {
    title: tool ? `${tool.name} - mytoolpocket.com` : "Social Media Tool - mytoolpocket.com",
    description: tool?.description || "Free social media utility in your pocket.",
  };
}

export default async function SocialMediaToolPage({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool } = await params;
  return <ToolView categorySlug="social-media-tools" toolSlug={tool} />;
}
