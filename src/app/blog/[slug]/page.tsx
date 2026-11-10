import React from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  return [
    { slug: "why-client-side-privacy-matters" },
    { slug: "10-essential-developer-utilities" },
    { slug: "mastering-meta-tags-for-seo" },
    { slug: "pomodoro-technique-for-deep-work" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Guide - mytoolpocket.com`,
    description: `Article on mytoolpocket.com discussing modern productivity and utility tools.`,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Breadcrumbs
        items={[
          { label: "Blog", href: "/blog" },
          { label: "Article" }
        ]}
      />

      <article className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-6 sm:p-10 shadow-[4px_4px_0px_#111111] space-y-6">
        <div className="flex items-center gap-3 text-xs text-[#777777]">
          <span className="px-2 py-0.5 rounded bg-[#f3eee3] border border-[#111111] font-bold text-[#111111]">
            Tech Insights
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            November 2026
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            4 min read
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-[#111111] tracking-tight">
          Client-Side Web Utilities and Data Confidentiality
        </h1>

        <div className="prose max-w-none text-xs sm:text-sm text-[#444444] leading-relaxed space-y-4 pt-4 border-t border-[#f3eee3]">
          <p>
            When developers and writers paste confidential documents, passwords, or company API payloads into online converters, privacy risks can quickly emerge if the service routes payloads through third-party servers.
          </p>
          <p>
            At mytoolpocket.com, every calculation and transformation occurs locally inside your web browser. Utilizing modern JavaScript APIs and Web Cryptography, our pocket tools deliver instantaneous performance while keeping your data strictly on your machine.
          </p>
          <div className="p-4 bg-[#fdfbf7] rounded-xl border border-[#111111] font-semibold text-[#111111]">
            Key Takeaway: Always prefer client-side browser utilities when working with private tokens, proprietary text, and unreleased content.
          </div>
        </div>

        <div className="pt-6 border-t border-[#f3eee3] flex items-center justify-between">
          <Link
            href="/blog"
            className="px-4 py-2 text-xs font-bold bg-[#f3eee3] text-[#111111] rounded-lg border border-[#111111] hover:bg-[#e6dfd2] inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Articles</span>
          </Link>

          <Link
            href="/tools"
            className="px-4 py-2 text-xs font-bold bg-[#d9541e] text-[#ffffff] rounded-lg border border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#bf4514]"
          >
            Try Our Tools
          </Link>
        </div>
      </article>
    </div>
  );
}
