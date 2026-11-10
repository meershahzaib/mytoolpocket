import CategoryView from "@/components/CategoryView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security Tools - Strong Passwords & Hash Utilities - mytoolpocket.com",
  description: "Generate cryptographically secure passwords, inspect hashes, calculate checksums, and stay safe online.",
};

export default function SecurityToolsPage() {
  return <CategoryView categoryId="security-tools" />;
}

