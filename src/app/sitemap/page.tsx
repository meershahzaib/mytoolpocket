import React from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdPlaceholder from "@/components/AdPlaceholder";
import { CATEGORIES } from "@/data/categories";
import { TOOLS } from "@/data/tools";
import {
  Map,
  FileCode2,
  ExternalLink,
  Layers,
  Wrench,
  BookOpen,
  Info,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HTML Sitemap - Complete Tool & Page Directory - mytoolpocket.com",
  description:
    "Explore the complete visual sitemap of mytoolpocket.com. Easily discover and navigate all online tools, categories, articles, and guides.",
  alternates: {
    canonical: "https://mytoolpocket.com/sitemap/",
  },
};

const BLOG_ARTICLES = [
  {
    slug: "why-client-side-privacy-matters",
    title: "Why Client-Side Privacy Matters for Online Tools",
    category: "Security",
  },
  {
    slug: "10-essential-developer-utilities",
    title: "10 Essential Developer Utilities to Save You Hours Every Week",
    category: "Developer",
  },
  {
    slug: "mastering-meta-tags-for-seo",
    title: "Mastering Open Graph & Meta Tags for Maximum Search Click-Throughs",
    category: "SEO",
  },
  {
    slug: "pomodoro-technique-for-deep-work",
    title: "How to Build a High-Focus Workflow with the Pomodoro Technique",
    category: "Productivity",
  },
];

const MAIN_PAGES = [
  { href: "/", label: "Home Page", desc: "Main landing page with top featured tools and quick search." },
  { href: "/tools", label: "All Tools Directory", desc: "Comprehensive catalog of all pocket web utilities." },
  { href: "/blog", label: "Tech & Tool Guides Blog", desc: "Tutorials, productivity tips, and developer guides." },
  { href: "/about", label: "About Us", desc: "Our mission, philosophy, and browser-first privacy pledge." },
  { href: "/contact", label: "Contact & Support", desc: "Feedback form, feature suggestions, and tool requests." },
  { href: "/privacy-policy", label: "Privacy Policy", desc: "Zero-tracking, client-side data handling guarantee." },
  { href: "/terms", label: "Terms of Service", desc: "Fair usage guidelines and transparent service terms." },
];

export default function SitemapPage() {
  const totalToolsCount = TOOLS.length;
  const totalCategoriesCount = CATEGORIES.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: "HTML Sitemap" }]} />

      {/* Header Banner */}
      <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-6 sm:p-10 shadow-[4px_4px_0px_#111111] mb-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#f3eee3] border border-[#111111] text-xs font-bold text-[#111111] mb-2">
              <Map className="w-3.5 h-3.5 text-[#d9541e]" />
              <span>Full Website Directory</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#111111] tracking-tight">
              Visual HTML Sitemap
            </h1>
            <p className="text-sm sm:text-base text-[#555555] mt-2 max-w-2xl leading-relaxed">
              Quickly browse and access every tool, category hub, technical article, and informational page available on mytoolpocket.com.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 text-xs sm:text-sm font-bold bg-[#d9541e] text-[#ffffff] rounded-xl border-2 border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#bf4514] active:translate-x-0.5 active:translate-y-0.5 transition-[transform,background-color] duration-100 ease-out flex items-center gap-2"
            >
              <FileCode2 className="w-4 h-4" />
              <span>View XML Sitemap</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Quick Stats Ribbon */}
        <div className="mt-8 pt-6 border-t border-[#f3eee3] grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-[#f3eee3] rounded-xl border border-[#111111]">
            <div className="text-2xl font-black text-[#111111]">{totalToolsCount}</div>
            <div className="text-xs font-semibold text-[#555555] mt-0.5">Online Utilities</div>
          </div>
          <div className="p-3 bg-[#f3eee3] rounded-xl border border-[#111111]">
            <div className="text-2xl font-black text-[#111111]">{totalCategoriesCount}</div>
            <div className="text-xs font-semibold text-[#555555] mt-0.5">Tool Categories</div>
          </div>
          <div className="p-3 bg-[#f3eee3] rounded-xl border border-[#111111]">
            <div className="text-2xl font-black text-[#111111]">{BLOG_ARTICLES.length}</div>
            <div className="text-xs font-semibold text-[#555555] mt-0.5">Published Guides</div>
          </div>
          <div className="p-3 bg-[#f3eee3] rounded-xl border border-[#111111]">
            <div className="text-2xl font-black text-[#d9541e]">100%</div>
            <div className="text-xs font-semibold text-[#555555] mt-0.5">Client-Side Free</div>
          </div>
        </div>
      </div>

      {/* Ad Placement */}
      <AdPlaceholder slot="leaderboard" id="ad-sitemap-leaderboard" className="-mt-4 mb-10" />

      {/* Main Pages Section */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Layers className="w-5 h-5 text-[#d9541e]" />
          <h2 className="text-xl sm:text-2xl font-bold text-[#111111]">
            Core Pages & Navigation
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MAIN_PAGES.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-4 shadow-[2px_2px_0px_#111111] hover:shadow-[4px_4px_0px_#111111] hover:-translate-y-0.5 transition-[transform,box-shadow] duration-150 ease-out will-change-transform transform-gpu group block"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#111111] group-hover:text-[#d9541e] transition-colors text-sm sm:text-base">
                  {page.label}
                </span>
                <ArrowRight className="w-4 h-4 text-[#777777] group-hover:text-[#d9541e] group-hover:translate-x-0.5 transition-transform duration-150 ease-out" />
              </div>
              <p className="text-xs text-[#555555] mt-1.5 leading-relaxed">
                {page.desc}
              </p>
              <span className="text-[11px] font-mono text-[#888888] mt-2 block">
                {page.href}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories and Tools Hierarchy */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Wrench className="w-5 h-5 text-[#d9541e]" />
          <h2 className="text-xl sm:text-2xl font-bold text-[#111111]">
            Tool Categories & Individual Utilities
          </h2>
        </div>
        <p className="text-sm text-[#555555] mb-6">
          Every tool below is organized by domain. Click a category title to visit the category hub, or jump straight to any specific utility.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => {
            const categoryTools = TOOLS.filter((t) => t.category === category.slug);

            return (
              <div
                key={category.id}
                className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-5 shadow-[3px_3px_0px_#111111] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <Link
                      href={`/${category.slug}`}
                      className="text-lg font-bold text-[#111111] hover:text-[#d9541e] transition-colors"
                    >
                      {category.name}
                    </Link>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-[#f3eee3] border border-[#111111] font-semibold text-[#111111]">
                      {categoryTools.length} {categoryTools.length === 1 ? "tool" : "tools"}
                    </span>
                  </div>

                  <p className="text-xs text-[#666666] mb-4 leading-relaxed">
                    {category.description}
                  </p>

                  <div className="pt-3 border-t border-[#f3eee3]">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#d9541e] block mb-2">
                      Tools in this category:
                    </span>
                    <ul className="space-y-1.5 text-xs">
                      {categoryTools.map((tool) => (
                        <li key={tool.slug}>
                          <Link
                            href={`/${tool.category}/${tool.slug}`}
                            className="text-[#333333] hover:text-[#d9541e] hover:underline flex items-center justify-between group py-0.5"
                          >
                            <span className="truncate pr-2">{tool.name}</span>
                            <span className="text-[10px] text-[#999999] font-mono group-hover:text-[#d9541e]">
                              /{tool.slug}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[#f3eee3]">
                  <Link
                    href={`/${category.slug}`}
                    className="text-xs font-bold text-[#111111] hover:text-[#d9541e] flex items-center justify-between group"
                  >
                    <span>View all {category.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#d9541e] group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Blog & Editorial Guides */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-[#d9541e]" />
          <h2 className="text-xl sm:text-2xl font-bold text-[#111111]">
            Tech Blog & Educational Guides
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {BLOG_ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-4 shadow-[2px_2px_0px_#111111] hover:shadow-[4px_4px_0px_#111111] hover:-translate-y-0.5 transition-[transform,box-shadow] duration-150 ease-out will-change-transform transform-gpu group block"
            >
              <div className="flex items-center justify-between gap-2 text-xs mb-1">
                <span className="px-2 py-0.5 rounded bg-[#f3eee3] border border-[#111111] font-semibold text-[#111111]">
                  {article.category}
                </span>
                <span className="text-[11px] font-mono text-[#888888]">
                  /blog/{article.slug}
                </span>
              </div>
              <h3 className="font-bold text-[#111111] group-hover:text-[#d9541e] transition-colors text-sm sm:text-base mt-2">
                {article.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* SEO & Crawlability Explainer Note */}
      <section className="bg-[#ffffff] border-2 border-[#111111] rounded-2xl p-6 shadow-[3px_3px_0px_#111111]">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-[#f3eee3] border border-[#111111] text-[#d9541e] shrink-0 mt-0.5">
            <Info className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#111111]">
              About Our Dual Sitemap Architecture
            </h3>
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
              mytoolpocket.com provides two complementary sitemaps to optimize both search engine ranking and user discovery:
            </p>
            <ul className="text-xs sm:text-sm text-[#555555] space-y-1.5 list-none">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#d9541e] shrink-0" />
                <span>
                  <strong>HTML Sitemap (/sitemap):</strong> Designed for human visitors and deep crawler link equity distribution, ensuring every single tool has clear internal backlinks.
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#d9541e] shrink-0" />
                <span>
                  <strong>XML Sitemap (/sitemap.xml):</strong> Designed specifically for Googlebot, Bingbot, and search engine crawlers following standard sitemaps.org protocol.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

