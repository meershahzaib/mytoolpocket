import ToolView from "@/components/ToolView";
import { getToolBySlug, getToolsByCategory } from "@/data/tools";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getToolsByCategory("converters").map((tool) => ({
    tool: tool.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string }>;
}): Promise<Metadata> {
  const { tool: toolSlug } = await params;
  const tool = getToolBySlug("converters", toolSlug);
  return {
    title: tool ? `${tool.name} - mytoolpocket.com` : "Converter - mytoolpocket.com",
    description: tool?.description || "Free converter utility in your pocket.",
  };
}

export default async function ConverterToolPage({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool } = await params;
  return <ToolView categorySlug="converters" toolSlug={tool} />;
}
