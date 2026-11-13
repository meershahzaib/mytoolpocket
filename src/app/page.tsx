"use client";

import React, { useState, useMemo, useDeferredValue } from "react";
import Link from "next/link";
import {
  Search,
  Sparkles,
  Zap,
  Shield,
  Layers,
  ArrowRight,
  Star,
  CheckCircle2,
  Wrench
} from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { TOOLS } from "@/data/tools";
import CategoryCard from "@/components/CategoryCard";
import ToolCard from "@/components/ToolCard";
import AdPlaceholder from "@/components/AdPlaceholder";

// Pre-computed static slices to eliminate redundant renders and filtering
const FEATURED_TOOLS = TOOLS.filter((tool) => tool.featured).slice(0, 6);
const POPULAR_TOOLS = TOOLS.filter((tool) => tool.popular).slice(0, 6);

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const deferredQuery = useDeferredValue(searchQuery);

  const filteredTools = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    if (!q) return [];
    return TOOLS.filter(
      (tool) =>
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(q))
    ).slice(0, 10);
  }, [deferredQuery]);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b-2 border-[#111111] bg-[#f3eee3]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffffff] border border-[#111111] shadow-[2px_2px_0px_#111111] text-xs font-bold text-[#111111]">
            <span>Over {TOOLS.length}+ browser utilities in your pocket</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-[#111111] tracking-tight leading-tight">
            Every Daily Tool You Need,{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#d9541e]">In Your Pocket.</span>
              <span className="absolute bottom-1.5 left-0 w-full h-3 bg-[#e6dfd2] -z-0 rounded"></span>
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#555555] max-w-2xl mx-auto leading-relaxed">
            Fast, private, and 100% free online utilities for creators, developers, students, and digital pros. No software to install and no accounts required.
          </p>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto relative mt-8">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-[#888888]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search word counter, JSON formatter, password generator..."
                className="w-full pl-12 pr-32 py-4 bg-[#ffffff] border-2 border-[#111111] rounded-xl text-sm sm:text-base font-medium shadow-[4px_4px_0px_#111111] focus:outline-none focus:ring-2 focus:ring-[#111111]"
              />
              <Link
                href={`/tools?q=${encodeURIComponent(searchQuery)}`}
                className="absolute right-2 px-4 py-2.5 text-xs sm:text-sm font-bold bg-[#d9541e] text-[#ffffff] rounded-lg border border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#bf4514] active:translate-x-0.5 active:translate-y-0.5 transition-[transform,background-color] duration-100"
              >
                Find Tool
              </Link>
            </div>

            {/* Instant Search Results Dropdown */}
            {searchQuery.trim().length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-[#ffffff] border-2 border-[#111111] rounded-xl shadow-[6px_6px_0px_#111111] p-3 text-left z-30 max-h-80 overflow-y-auto">
                <div className="text-xs font-bold uppercase text-[#777777] px-2 py-1 border-b border-[#e6dfd2]">
                  Matching Tools ({filteredTools.length})
                </div>
                {filteredTools.length > 0 ? (
                  <div className="divide-y divide-[#f3eee3] mt-1">
                    {filteredTools.map((t) => (
                      <Link
                        key={t.id}
                        href={`/${t.category}/${t.slug}`}
                        className="block p-2 hover:bg-[#f3eee3] rounded-lg transition-colors border-l-2 border-l-transparent hover:border-l-[#d9541e]"
                      >
                        <div className="text-sm font-bold text-[#111111]">{t.name}</div>
                        <div className="text-xs text-[#666666] line-clamp-1">{t.description}</div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-xs text-[#777777] text-center">
                    No tools found matching &quot;{searchQuery}&quot;. Try another query!
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Categories Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <span className="text-xs font-bold text-[#777777] mr-1">Popular:</span>
            {CATEGORIES.slice(0, 6).map((cat) => (
              <Link
                key={cat.id}
                href={`/${cat.slug}`}
                className="px-3 py-1 rounded-full text-xs font-semibold bg-[#ffffff] border border-[#111111] shadow-[1px_1px_0px_#111111] hover:bg-[#111111] hover:text-[#f3eee3] transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Placement 1: Home Page Responsive Leaderboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
        <AdPlaceholder slot="leaderboard" id="ad-home-leaderboard" className="!my-0" />
      </div>

      {/* Featured Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#d9541e]">
              <Star className="w-4 h-4 fill-[#d9541e]" />
              <span>Handpicked Utilities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight mt-1">
              Featured Pocket Tools
            </h2>
          </div>
          <Link
            href="/tools"
            className="px-4 py-2 text-xs font-bold bg-[#d9541e] text-[#ffffff] rounded-lg border border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#bf4514] flex items-center gap-1.5"
          >
            <span>View All {TOOLS.length} Tools</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_TOOLS.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* Browse All 12 Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 content-visibility-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#d9541e]">
            Complete Directory
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
            Browse by Category
          </h2>
          <p className="text-xs sm:text-sm text-[#555555]">
            Explore 12 dedicated tool hubs engineered to speed up your everyday workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Placement 2: Home Page Mid-Content Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
        <AdPlaceholder slot="in-content" id="ad-home-mid-banner" className="!my-0" />
      </div>

      {/* Why Choose mytoolpocket.com */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 content-visibility-auto">
        <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-8 sm:p-12 shadow-[4px_4px_0px_#111111]">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d9541e]">
              Built for speed and simplicity
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight mt-1">
              Why use mytoolpocket.com?
            </h2>
            <p className="text-sm text-[#555555] mt-2 leading-relaxed">
              We created mytoolpocket.com to cut through clutter, slow loading ad-heavy sites, and invasive trackers. Every tool here is designed to be lightweight, instantaneous, and private.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2 p-4 bg-[#fdfbf7] rounded-xl border border-[#111111]">
              <div className="w-10 h-10 rounded-lg bg-[#111111] text-[#f3eee3] flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#f3eee3]" />
              </div>
              <h3 className="text-base font-bold text-[#111111]">Zero Server Tracking</h3>
              <p className="text-xs text-[#555555] leading-relaxed">
                Calculations, formatting, and file parsing happen entirely inside your web browser. Your confidential text is never transmitted to an external server.
              </p>
            </div>

            <div className="space-y-2 p-4 bg-[#fdfbf7] rounded-xl border border-[#111111]">
              <div className="w-10 h-10 rounded-lg bg-[#111111] text-[#f3eee3] flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#f3eee3]" />
              </div>
              <h3 className="text-base font-bold text-[#111111]">Instant Results</h3>
              <p className="text-xs text-[#555555] leading-relaxed">
                No spinners or processing queues. Transform thousands of words, format complex JSON trees, or generate cryptographic keys in milliseconds.
              </p>
            </div>

            <div className="space-y-2 p-4 bg-[#fdfbf7] rounded-xl border border-[#111111]">
              <div className="w-10 h-10 rounded-lg bg-[#111111] text-[#f3eee3] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-[#f3eee3]" />
              </div>
              <h3 className="text-base font-bold text-[#111111]">100% Free Forever</h3>
              <p className="text-xs text-[#555555] leading-relaxed">
                No credit cards, trial limits, or daily quotas. Bookmark our pocket tools and access them whenever duty calls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 content-visibility-auto">
        <div className="bg-[#111111] text-[#f3eee3] border-2 border-[#111111] rounded-2xl p-8 sm:p-12 text-center space-y-5">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready to speed up your daily work?
          </h2>
          <p className="text-sm sm:text-base text-[#cccccc] max-w-xl mx-auto leading-relaxed">
            Join thousands of professionals who keep mytoolpocket.com bookmarked on their browser bars.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/tools"
              className="px-6 py-3 text-sm font-bold bg-[#d9541e] text-[#ffffff] rounded-lg border border-[#ffffff] shadow-[3px_3px_0px_#ffffff] hover:bg-[#bf4514] active:translate-x-0.5 active:translate-y-0.5 transition-[transform,background-color] duration-100 flex items-center gap-2"
            >
              <span>Explore All Tools</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 text-sm font-bold bg-[#ffffff] text-[#111111] rounded-lg border border-[#ffffff] shadow-[3px_3px_0px_#d9541e] hover:bg-[#f3eee3] active:translate-x-0.5 active:translate-y-0.5 transition-[transform,background-color] duration-100"
            >
              About the Platform
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
