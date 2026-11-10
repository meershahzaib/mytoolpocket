import CategoryView from "@/components/CategoryView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tools - Smart Utilities & Prompt Helpers - mytoolpocket.com",
  description: "Smart prompt builders, text summarizers, and AI-assisted workflow enhancers.",
};

export default function AiToolsPage() {
  return <CategoryView categoryId="ai-tools" />;
}

