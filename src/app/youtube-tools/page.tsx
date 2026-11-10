import CategoryView from "@/components/CategoryView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube Tools - Creator Utilities - mytoolpocket.com",
  description: "Download HD thumbnails, extract video tags, and optimize your YouTube channel for maximum views.",
};

export default function YouTubeToolsPage() {
  return <CategoryView categoryId="youtube-tools" />;
}

