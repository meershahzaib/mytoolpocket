import ToolView from "@/components/ToolView";
import { getToolBySlug, getToolsByCategory } from "@/data/tools";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getToolsByCategory("seo-tools").map((tool) => ({
    tool: tool.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string }>;
}): Promise<Metadata> {
  const { tool: toolSlug } = await params;
  const tool = getToolBySlug("seo-tools", toolSlug);
  return {
    title: tool ? `${tool.name} - mytoolpocket.com` : "SEO Tool - mytoolpocket.com",
    description: tool?.description || "Free SEO tool in your pocket.",
  };
}

export default async function SeoToolPage({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool } = await params;
  return <ToolView categorySlug="seo-tools" toolSlug={tool} />;
}
