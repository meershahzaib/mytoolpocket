import React, { memo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ToolCategory } from "@/data/categories";
import { DynamicIcon } from "@/components/DynamicIcon";
import { getToolsByCategory } from "@/data/tools";

interface CategoryCardProps {
  category: ToolCategory;
}

function CategoryCardComponent({ category }: CategoryCardProps) {
  const tools = getToolsByCategory(category.slug);

  return (
    <Link
      href={`/${category.slug}`}
      className="group block bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-5 shadow-[3px_3px_0px_#111111] hover:shadow-[5px_5px_0px_#111111] hover:-translate-y-0.5 transition-[transform,box-shadow] duration-150 ease-out will-change-transform transform-gpu"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="w-12 h-12 rounded-lg bg-[#f3eee3] border-2 border-[#111111] flex items-center justify-center text-[#111111] group-hover:scale-105 transition-transform duration-150">
          <DynamicIcon name={category.iconName} className="w-6 h-6" />
        </div>
        {category.badge && (
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#f3eee3] border border-[#111111] text-[#111111]">
            {category.badge}
          </span>
        )}
      </div>

      <h3 className="text-lg font-bold text-[#111111] group-hover:text-[#d9541e] transition-colors mb-1.5 flex items-center gap-1.5">
        <span>{category.name}</span>
        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-[opacity,transform] duration-150 text-[#d9541e]" />
      </h3>

      <p className="text-xs text-[#555555] line-clamp-2 leading-relaxed mb-4">
        {category.description}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-[#f3eee3] text-xs font-semibold text-[#111111]">
        <span className="text-[#666666]">{tools.length} Tools Available</span>
        <span className="group-hover:translate-x-0.5 transition-transform duration-150 text-[#d9541e]">Explore &rarr;</span>
      </div>
    </Link>
  );
}

export default memo(CategoryCardComponent);

