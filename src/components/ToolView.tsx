import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/data/categories";
import { getToolBySlug, getToolsByCategory } from "@/data/tools";
import Breadcrumbs from "@/components/Breadcrumbs";
import ToolRenderer from "@/components/ToolRenderer";
import ToolCard from "@/components/ToolCard";
import { DynamicIcon } from "@/components/DynamicIcon";
import { Shield, Sparkles, CheckCircle, HelpCircle } from "lucide-react";

interface ToolViewProps {
  categorySlug: string;
  toolSlug: string;
}

export default function ToolView({ categorySlug, toolSlug }: ToolViewProps) {
  const category = getCategoryBySlug(categorySlug);
  const tool = getToolBySlug(categorySlug, toolSlug);

  if (!category || !tool) {
    notFound();
  }

  const relatedTools = getToolsByCategory(categorySlug)
    .filter((t) => t.slug !== toolSlug)
    .slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: category.name, href: `/${category.slug}` },
          { label: tool.name }
        ]}
      />

      {/* Tool Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Link
            href={`/${category.slug}`}
            className="text-xs font-bold uppercase tracking-wider text-[#d9541e] hover:underline"
          >
            {category.name}
          </Link>
          <span className="text-[#888888]">&bull;</span>
          <span className="text-xs text-[#666666]">Free Browser Utility</span>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#ffffff] border-2 border-[#111111] flex items-center justify-center text-[#111111] shadow-[2px_2px_0px_#111111] shrink-0 mt-1">
            <DynamicIcon name={tool.iconName} className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
              {tool.name}
            </h1>
            <p className="text-sm text-[#555555] mt-1.5 leading-relaxed max-w-2xl">
              {tool.description}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Tool Area */}
      <div className="mb-14">
        <ToolRenderer tool={tool} />
      </div>

      {/* Privacy and Trust Banner */}
      <div className="bg-[#ffffff] border-2 border-[#111111] border-l-6 border-l-[#d9541e] rounded-xl p-5 shadow-[3px_3px_0px_#111111] mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#f3eee3] border border-[#111111] flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-[#d9541e]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#111111]">Browser-Only Processing</h4>
            <p className="text-xs text-[#555555]">
              All calculations and transformations are handled client-side in your web browser. No server storage.
            </p>
          </div>
        </div>
        <div className="text-xs font-semibold px-3 py-1.5 rounded bg-[#f3eee3] text-[#111111] border border-[#111111] shrink-0">
          Client-Side Safe
        </div>
      </div>

      {/* How to use section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
        <div className="bg-[#ffffff] border-2 border-[#111111] rounded-xl p-6 shadow-[3px_3px_0px_#111111]">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-[#d9541e]" />
            <h3 className="text-base font-bold text-[#111111]">How to Use this Tool</h3>
          </div>
          <ol className="space-y-3 text-xs text-[#555555] list-decimal list-inside leading-relaxed">
            <li>Paste or input your data into the primary input area above.</li>
            <li>Configure any specific formatting or custom options as needed.</li>
            <li>View your calculated output rendered instantaneously.</li>
            <li>Click the orange Copy or Download button to save the result.</li>
          </ol>
        </div>

        <div className="bg-[#ffffff] border-2 border-[#111111] rounded-xl p-6 shadow-[3px_3px_0px_#111111]">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-[#d9541e]" />
            <h3 className="text-base font-bold text-[#111111]">Frequently Asked Questions</h3>
          </div>
          <div className="space-y-3 text-xs leading-relaxed">
            <div>
              <p className="font-bold text-[#111111]">Is my data stored or recorded?</p>
              <p className="text-[#555555]">No. Everything operates locally inside your browser session.</p>
            </div>
            <div>
              <p className="font-bold text-[#111111]">Is there any usage limit?</p>
              <p className="text-[#555555]">None. You can use this utility as many times as you like, completely free.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <div className="pt-8 border-t-2 border-[#111111]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#111111]">
              More in {category.name}
            </h3>
            <Link
              href={`/${category.slug}`}
              className="text-xs font-bold text-[#d9541e] hover:underline"
            >
              View all {category.name} &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedTools.map((relTool) => (
              <ToolCard key={relTool.id} tool={relTool} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

