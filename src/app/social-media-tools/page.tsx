import CategoryView from "@/components/CategoryView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media Tools - Instagram, TikTok & X Utilities - mytoolpocket.com",
  description: "Craft bios, format hashtags, generate captions, and resize banners for all your social platforms.",
};

export default function SocialMediaToolsPage() {
  return <CategoryView categoryId="social-media-tools" />;
}

