import CategoryView from "@/components/CategoryView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Productivity Tools - Focus Timers & Scratchpads - mytoolpocket.com",
  description: "Pomodoro timers, checklists, notes, and productivity utilities to keep you focused and organized.",
};

export default function ProductivityToolsPage() {
  return <CategoryView categoryId="productivity-tools" />;
}

