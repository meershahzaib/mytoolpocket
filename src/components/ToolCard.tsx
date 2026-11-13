import React, { memo } from "react";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { ToolItem } from "@/data/tools";
import { DynamicIcon } from "@/components/DynamicIcon";
import { getCategoryBySlug } from "@/data/categories";

interface ToolCardProps {
  tool: ToolItem;
}

function ToolCardComponent({ tool }: ToolCardProps) {
  const category = getCategoryBySlug(tool.category);

  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-5 shadow-[3px_3px_0px_#111111] hover:shadow-[5px_5px_0px_#111111] hover:-translate-y-0.5 transition-[transform,box-shadow] duration-150 ease-out will-change-transform transform-gpu flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-[#f3eee3] border-2 border-[#111111] flex items-center justify-center text-[#111111]">
            <DynamicIcon name={tool.iconName} className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-1.5">
            {tool.featured && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-[#f3eee3] border border-[#111111] text-[#111111]">
                <Star className="w-3 h-3 text-[#d9541e] fill-[#d9541e]" />
                Featured
              </span>
            )}
            {category && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#f3eee3] text-[#555555]">
                {category.shortName}
              </span>
            )}
          </div>
        </div>

        <Link href={`/${tool.category}/${tool.slug}`}>
          <h3 className="text-base font-bold text-[#111111] hover:text-[#d9541e] transition-colors mb-1.5">
            {tool.name}
          </h3>
        </Link>

        <p className="text-xs text-[#555555] line-clamp-2 leading-relaxed mb-4">
          {tool.description}
        </p>

        {tool.tags && tool.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {tool.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] text-[#666666] bg-[#f8f5ee] px-2 py-0.5 rounded border border-[#e6dfd2]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-[#f3eee3] flex items-center justify-between">
        <span className="text-[11px] font-medium text-[#777777]">
          Free browser utility
        </span>
        <Link
          href={`/${tool.category}/${tool.slug}`}
          className="px-3 py-1.5 text-xs font-bold bg-[#d9541e] text-[#ffffff] rounded-md border border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#bf4514] active:translate-x-0.5 active:translate-y-0.5 transition-[transform,background-color] duration-100 ease-out inline-flex items-center gap-1"
        >
          <span>Use Tool</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

export default memo(ToolCardComponent);

