import CategoryView from "@/components/CategoryView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text Tools - Free Text Utilities - mytoolpocket.com",
  description: "Format, analyze, clean, and transform your written text with ease. Free online word counters, case converters, and text tools.",
};

export default function TextToolsPage() {
  return <CategoryView categoryId="text-tools" />;
}

