import ToolView from "@/components/ToolView";
import { getToolBySlug, getToolsByCategory } from "@/data/tools";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getToolsByCategory("calculators").map((tool) => ({
    tool: tool.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string }>;
}): Promise<Metadata> {
  const { tool: toolSlug } = await params;
  const tool = getToolBySlug("calculators", toolSlug);
  return {
    title: tool ? `${tool.name} - mytoolpocket.com` : "Calculator - mytoolpocket.com",
    description: tool?.description || "Free calculator utility in your pocket.",
  };
}

export default async function CalculatorToolPage({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool } = await params;
  return <ToolView categorySlug="calculators" toolSlug={tool} />;
}
