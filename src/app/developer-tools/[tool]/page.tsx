import ToolView from "@/components/ToolView";
import { getToolBySlug, getToolsByCategory } from "@/data/tools";
import { getDevToolSeoData } from "@/data/devToolsSeoData";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getToolsByCategory("developer-tools").map((tool) => ({
    tool: tool.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string }>;
}): Promise<Metadata> {
  const { tool: toolSlug } = await params;
  const tool = getToolBySlug("developer-tools", toolSlug);
  const seo = getDevToolSeoData(toolSlug);

  const title = seo?.title || (tool ? `${tool.name}: Free Developer Tool | mytoolpocket.com` : "Developer Tool | mytoolpocket.com");
  const description = seo?.metaDescription || tool?.description || "Free developer tool in your pocket.";
  const canonicalUrl = `https://mytoolpocket.com/developer-tools/${toolSlug}/`;

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

export default async function DeveloperToolPage({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool } = await params;
  return <ToolView categorySlug="developer-tools" toolSlug={tool} />;
}
