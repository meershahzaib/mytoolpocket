import React from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdPlaceholder from "@/components/AdPlaceholder";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Tech, Productivity & Tool Guides - mytoolpocket.com",
  description: "Helpful guides, technical tutorials, and productivity tips from the team behind mytoolpocket.com.",
};

const BLOG_POSTS = [
  {
    slug: "why-client-side-privacy-matters",
    title: "Why Client-Side Privacy Matters for Online Tools",
    excerpt: "Discover why processing text, passwords, and JSON directly in your browser without cloud uploads protects your sensitive intellectual property.",
    date: "November 2026",
    readTime: "4 min read",
    category: "Security"
  },
  {
    slug: "10-essential-developer-utilities",
    title: "10 Essential Developer Utilities to Save You Hours Every Week",
    excerpt: "From JSON validation to Base64 encoding, explore how dedicated pocket tools streamline modern engineering and eliminate boilerplate.",
    date: "October 2026",
    readTime: "6 min read",
    category: "Developer"
  },
  {
    slug: "mastering-meta-tags-for-seo",
    title: "Mastering Open Graph & Meta Tags for Maximum Search Click-Throughs",
    excerpt: "A complete step-by-step blueprint on crafting social cards, Twitter previews, and search titles that stand out on social feeds and SERPs.",
    date: "October 2026",
    readTime: "5 min read",
    category: "SEO"
  },
  {
    slug: "pomodoro-technique-for-deep-work",
    title: "How to Build a High-Focus Workflow with the Pomodoro Technique",
    excerpt: "Learn how to combine 25-minute sprints with deliberate recovery cycles to beat digital fatigue and maintain creative momentum.",
    date: "September 2026",
    readTime: "3 min read",
    category: "Productivity"
  }
];

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: "Blog" }]} />

      {/* Header */}
      <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-6 sm:p-10 shadow-[4px_4px_0px_#111111] mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-[#d9541e]">
          Insights & Guides
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#111111] tracking-tight mt-1">
          mytoolpocket.com Tech Blog
        </h1>
        <p className="text-sm text-[#555555] mt-2 max-w-2xl leading-relaxed">
          Deep dives, quick tutorials, and productivity workflows to help you make the most of free web utilities.
        </p>
      </div>

      {/* Placement 9: Blog Index Responsive Leaderboard */}
      <AdPlaceholder slot="leaderboard" id="ad-blog-leaderboard" className="-mt-4 mb-8" />

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.slug}
            className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-6 shadow-[3px_3px_0px_#111111] hover:shadow-[5px_5px_0px_#111111] hover:-translate-y-0.5 transition-[transform,box-shadow] duration-150 ease-out will-change-transform transform-gpu flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-3 text-xs mb-3">
                <span className="px-2 py-0.5 rounded bg-[#f3eee3] border border-[#111111] font-bold text-[#111111]">
                  {post.category}
                </span>
                <div className="flex items-center gap-3 text-[#777777]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>
              </div>

              <h2 className="text-lg font-bold text-[#111111] hover:text-[#d9541e] transition-colors mb-2">
                {post.title}
              </h2>

              <p className="text-xs text-[#555555] leading-relaxed mb-6">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-[#f3eee3] flex items-center justify-between">
              <span className="text-xs text-[#777777] font-medium">Free Educational Guide</span>
              <button
                className="px-3.5 py-1.5 text-xs font-bold bg-[#d9541e] text-[#ffffff] rounded-lg border border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#bf4514] active:translate-x-0.5 active:translate-y-0.5 transition-[transform,background-color] duration-100 ease-out flex items-center gap-1.5"
              >
                <span>Read Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

