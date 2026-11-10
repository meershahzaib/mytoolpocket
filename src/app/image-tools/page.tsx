import CategoryView from "@/components/CategoryView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Tools - Free Browser Image Utilities - mytoolpocket.com",
  description: "Resize, compress, convert, and crop image files directly in your web browser with zero server uploads.",
};

export default function ImageToolsPage() {
  return <CategoryView categoryId="image-tools" />;
}

