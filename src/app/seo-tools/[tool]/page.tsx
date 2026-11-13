import ToolView from "@/components/ToolView";
import { getToolBySlug, getToolsByCategory } from "@/data/tools";
import { getSeoToolSeoData } from "@/data/seoToolsSeoData";
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
  const seo = getSeoToolSeoData(toolSlug);

  const title = seo?.title || (tool ? `${tool.name}: Free SEO Tool | mytoolpocket.com` : "SEO Tool | mytoolpocket.com");
  const description = seo?.metaDescription || tool?.description || "Free SEO tool in your pocket.";
  const canonicalUrl = `https://mytoolpocket.com/seo-tools/${toolSlug}/`;

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

export default async function SeoToolPage({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool } = await params;
  return <ToolView categorySlug="seo-tools" toolSlug={tool} />;
}
