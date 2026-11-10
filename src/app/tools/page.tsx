"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Filter, Layers, ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { TOOLS } from "@/data/tools";
import Breadcrumbs from "@/components/Breadcrumbs";
import ToolCard from "@/components/ToolCard";
import AdPlaceholder from "@/components/AdPlaceholder";

export default function AllToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredTools = useMemo(() => {
    return TOOLS.filter((tool) => {
      const matchesCategory =
        selectedCategory === "all" || tool.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: "All Tools" }]} />

      {/* Header */}
      <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-6 sm:p-10 shadow-[4px_4px_0px_#111111] mb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#d9541e]">
              Pocket Toolkit Directory
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#111111] tracking-tight mt-1">
              All Tools & Utilities
            </h1>
            <p className="text-sm text-[#555555] mt-2 max-w-2xl leading-relaxed">
              Explore our full collection of fast, browser-powered calculators, converters, developer tools, and text assistants.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[#f3eee3] px-4 py-3 rounded-xl border border-[#111111]">
            <Layers className="w-5 h-5 text-[#d9541e]" />
            <span className="text-sm font-bold text-[#111111]">{filteredTools.length} Tools Shown</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4 mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777777]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by tool name, keyword, or tag (e.g. word, json, password)..."
            className="w-full pl-11 pr-4 py-3 bg-[#ffffff] border-2 border-[#111111] rounded-xl text-sm font-medium shadow-[2px_2px_0px_#111111] focus:outline-none focus:ring-2 focus:ring-[#111111]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all border border-[#111111] ${
              selectedCategory === "all"
                ? "bg-[#111111] text-[#f3eee3] shadow-[2px_2px_0px_#d9541e]"
                : "bg-[#ffffff] text-[#111111] hover:bg-[#e6dfd2]"
            }`}
          >
            All Tools ({TOOLS.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = TOOLS.filter((t) => t.category === cat.slug).length;
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all border border-[#111111] ${
                  isSelected
                    ? "bg-[#111111] text-[#f3eee3] shadow-[2px_2px_0px_#d9541e]"
                    : "bg-[#ffffff] text-[#111111] hover:bg-[#e6dfd2]"
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Placement 3: Tools Directory Mid Banner */}
      <AdPlaceholder slot="banner" id="ad-tools-banner" className="-mt-2 mb-8" />

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="bg-[#ffffff] border-2 border-[#111111] rounded-2xl p-12 text-center shadow-[3px_3px_0px_#111111]">
          <h3 className="text-base font-bold text-[#111111] mb-1">No matching tools found</h3>
          <p className="text-xs text-[#666666] mb-4">
            Try adjusting your search query or switching to another category.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="px-4 py-2 text-xs font-bold bg-[#d9541e] text-[#ffffff] rounded-lg border border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#bf4514]"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Placement 4: Tools Directory Bottom Leaderboard */}
      <AdPlaceholder slot="leaderboard" id="ad-tools-bottom-leaderboard" className="mt-12" />
    </div>
  );
}

