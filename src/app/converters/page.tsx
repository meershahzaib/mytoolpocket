import CategoryView from "@/components/CategoryView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Converters - Free Unit & Format Converters - mytoolpocket.com",
  description: "Convert units, currencies, colors, and data formats in a click with zero hassle.",
};

export default function ConvertersPage() {
  return <CategoryView categoryId="converters" />;
}

