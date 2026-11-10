import CategoryView from "@/components/CategoryView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF Tools - Free Document Utilities - mytoolpocket.com",
  description: "Merge, split, protect, and count pages of PDF documents quickly and securely.",
};

export default function PdfToolsPage() {
  return <CategoryView categoryId="pdf-tools" />;
}

