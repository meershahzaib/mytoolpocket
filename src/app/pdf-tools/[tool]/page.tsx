import ToolView from "@/components/ToolView";
import { getToolBySlug, getToolsByCategory } from "@/data/tools";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getToolsByCategory("pdf-tools").map((tool) => ({
    tool: tool.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string }>;
}): Promise<Metadata> {
  const { tool: toolSlug } = await params;
  const tool = getToolBySlug("pdf-tools", toolSlug);
  return {
    title: tool ? `${tool.name} - mytoolpocket.com` : "PDF Tool - mytoolpocket.com",
    description: tool?.description || "Free PDF utility in your pocket.",
  };
}

export default async function PdfToolPage({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool } = await params;
  return <ToolView categorySlug="pdf-tools" toolSlug={tool} />;
}
