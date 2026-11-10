import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, getCategoryBySlug } from "@/data/categories";
import { getToolsByCategory } from "@/data/tools";
import Breadcrumbs from "@/components/Breadcrumbs";
import ToolCard from "@/components/ToolCard";
import { DynamicIcon } from "@/components/DynamicIcon";
import { Layers, ShieldCheck, Zap } from "lucide-react";

interface CategoryViewProps {
  categoryId: string;
}

export default function CategoryView({ categoryId }: CategoryViewProps) {
  const category = getCategoryBySlug(categoryId);

  if (!category) {
    notFound();
  }

  const tools = getToolsByCategory(categoryId);
  const otherCategories = CATEGORIES.filter((c) => c.id !== categoryId).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: "Categories", href: "/tools" },
          { label: category.name }
        ]}
      />

      {/* Category Hero Header */}
      <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-6 sm:p-10 shadow-[4px_4px_0px_#111111] mb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-xl bg-[#f3eee3] border-2 border-[#111111] flex items-center justify-center text-[#111111] shadow-[2px_2px_0px_#111111] shrink-0">
              <DynamicIcon name={category.iconName} className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#d9541e]">
                  Toolkit Collection
                </span>
                {category.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#f3eee3] border border-[#111111] text-[#111111]">
                    {category.badge}
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
                {category.name}
              </h1>
              <p className="text-sm sm:text-base text-[#555555] mt-2 max-w-2xl leading-relaxed">
                {category.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start sm:items-end bg-[#f3eee3] p-4 rounded-xl border border-[#111111] shrink-0">
            <span className="text-2xl font-black text-[#111111]">{tools.length}</span>
            <span className="text-xs font-semibold text-[#666666]">Available Tools</span>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="mb-14">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#111111]">
              Tools in this Category
            </h2>
            <p className="text-xs text-[#666666] mt-0.5">
              Select any tool below to launch it instantly in your browser.
            </p>
          </div>
        </div>

        {tools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="bg-[#ffffff] border-2 border-[#111111] rounded-xl p-8 text-center text-[#666666]">
            More tools are currently being added to {category.name}. Check back soon!
          </div>
        )}
      </div>

      {/* Category Features Box */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
        <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-5 shadow-[2px_2px_0px_#111111]">
          <div className="w-8 h-8 rounded bg-[#f3eee3] border border-[#111111] flex items-center justify-center mb-3">
            <Zap className="w-4 h-4 text-[#111111]" />
          </div>
          <h3 className="text-sm font-bold text-[#111111] mb-1">Instant Execution</h3>
          <p className="text-xs text-[#555555] leading-relaxed">
            All utilities process operations directly in memory with zero backend latency.
          </p>
        </div>

        <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-5 shadow-[2px_2px_0px_#111111]">
          <div className="w-8 h-8 rounded bg-[#f3eee3] border border-[#111111] flex items-center justify-center mb-3">
            <ShieldCheck className="w-4 h-4 text-[#111111]" />
          </div>
          <h3 className="text-sm font-bold text-[#111111] mb-1">Private & Safe</h3>
          <p className="text-xs text-[#555555] leading-relaxed">
            Your inputs never leave your device. No analytics logs or stored payloads.
          </p>
        </div>

        <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-5 shadow-[2px_2px_0px_#111111]">
          <div className="w-8 h-8 rounded bg-[#f3eee3] border border-[#111111] flex items-center justify-center mb-3">
            <Layers className="w-4 h-4 text-[#111111]" />
          </div>
          <h3 className="text-sm font-bold text-[#111111] mb-1">100% Free</h3>
          <p className="text-xs text-[#555555] leading-relaxed">
            No subscriptions, account signups, or usage limits on any feature.
          </p>
        </div>
      </div>

      {/* Explore Other Categories */}
      <div className="pt-8 border-t-2 border-[#111111]">
        <h3 className="text-base font-bold text-[#111111] mb-4">
          Explore Other Pocket Toolkits
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {otherCategories.map((c) => (
            <Link
              key={c.id}
              href={`/${c.slug}`}
              className="p-3 bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-lg shadow-[2px_2px_0px_#111111] hover:bg-[#f3eee3] transition-colors flex items-center justify-between"
            >
              <span className="text-xs font-bold text-[#111111]">{c.name}</span>
              <span className="text-xs text-[#d9541e]">&rarr;</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

