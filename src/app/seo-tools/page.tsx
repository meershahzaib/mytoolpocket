import CategoryView from "@/components/CategoryView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Tools - Free Search Optimization Utilities - mytoolpocket.com",
  description: "Generate meta tags, analyze keywords, check robots.txt, and improve rankings with our free SEO tools.",
};

export default function SeoToolsPage() {
  return <CategoryView categoryId="seo-tools" />;
}

