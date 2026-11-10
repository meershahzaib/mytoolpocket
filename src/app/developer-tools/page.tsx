import CategoryView from "@/components/CategoryView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Developer Tools - Free Web Dev Utilities - mytoolpocket.com",
  description: "Format code, validate JSON, encode Base64 data, and debug quickly in your pocket toolkit.",
};

export default function DeveloperToolsPage() {
  return <CategoryView categoryId="developer-tools" />;
}

