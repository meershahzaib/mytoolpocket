import ToolView from "@/components/ToolView";
import { getToolBySlug, getToolsByCategory } from "@/data/tools";
import { getToolSeoData } from "@/data/textToolsSeoData";
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
  const seo = getToolSeoData(toolSlug);

  const title = seo?.title || (tool ? `${tool.name}: Free Online Tool | mytoolpocket.com` : "Text Tool | mytoolpocket.com");
  const description = seo?.metaDescription || tool?.description || "Free online tool in your pocket.";
  const canonicalUrl = `https://mytoolpocket.com/text-tools/${toolSlug}/`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "mytoolpocket.com",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
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
