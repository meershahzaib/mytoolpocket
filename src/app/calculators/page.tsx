import CategoryView from "@/components/CategoryView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculators - Free Math and Everyday Calculators - mytoolpocket.com",
  description: "Quick calculations for percentages, finance, dates, and everyday math without clutter.",
};

export default function CalculatorsPage() {
  return <CategoryView categoryId="calculators" />;
}

