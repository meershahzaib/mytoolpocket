import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, getCategoryBySlug } from "@/data/categories";
import { getToolsByCategory } from "@/data/tools";
import Breadcrumbs from "@/components/Breadcrumbs";
import ToolCard from "@/components/ToolCard";
import { DynamicIcon } from "@/components/DynamicIcon";
import AdPlaceholder from "@/components/AdPlaceholder";
import { Layers, ShieldCheck, Zap, HelpCircle } from "lucide-react";

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
  const siteUrl = "https://mytoolpocket.com";
  const categoryUrl = `${siteUrl}/${category.slug}/`;

  const categoryFaqs = [
    {
      question: `Are all tools in ${category.name} free to use?`,
      answer: `Yes, every single tool in the ${category.name} collection is 100% free with no registration, credit card, or hidden paywall.`
    },
    {
      question: "Are my files and text secure?",
      answer: "All transformations execute client-side directly in your browser. Your text and data never leave your computer."
    },
    {
      question: "Can I use these tools on mobile devices?",
      answer: "Yes, our utilities are completely responsive and performant across iOS, Android, tablets, and desktop browsers."
    },
    {
      question: "Do I need to install any browser extensions or software?",
      answer: "No installations are required. Everything works on-demand instantly within any modern web browser."
    }
  ];

  const categoryFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": categoryFaqs.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${siteUrl}/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": category.name,
        "item": categoryUrl
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryFaqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Breadcrumbs
        items={[
          { label: "Categories", href: "/tools" },
          { label: category.name }
        ]}
      />

      {/* Category Hero Header with Unique H1 & 100-200 word Intro */}
      <header className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-6 sm:p-10 shadow-[4px_4px_0px_#111111] mb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-xl bg-[#f3eee3] border-2 border-[#111111] flex items-center justify-center text-[#111111] shadow-[2px_2px_0px_#111111] shrink-0">
              <DynamicIcon name={category.iconName} className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#d9541e]">
                  Free Online Toolkit
                </span>
                {category.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#f3eee3] border border-[#111111] text-[#111111]">
                    {category.badge}
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-[#111111] tracking-tight">
                Free Online {category.name}
              </h1>
              <p className="text-xs sm:text-sm text-[#555555] mt-3 max-w-3xl leading-relaxed">
                Welcome to our curated collection of free online {category.name.toLowerCase()}. Whether you are formatting text, calculating metrics, cleaning data, or testing code snippets, every tool in this pocket toolkit operates 100% in your browser. Enjoy immediate performance with zero server lag, total data confidentiality, and no signups required.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start sm:items-end bg-[#f3eee3] p-4 rounded-xl border border-[#111111] shrink-0">
            <span className="text-2xl font-black text-[#111111]">{tools.length}</span>
            <span className="text-xs font-semibold text-[#666666]">Available Tools</span>
          </div>
        </div>
      </header>

      {/* Placement 5: Category Page Responsive Leaderboard */}
      <AdPlaceholder slot="leaderboard" id="ad-category-leaderboard" className="-mt-4 mb-8" />

      {/* Tools Grid */}
      <section className="mb-14" aria-label={`All ${category.name}`}>
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
      </section>

      {/* Category Features Box */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14 content-visibility-auto">
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
      </section>

      {/* Placement 6: Category Page In-Content Banner */}
      <AdPlaceholder slot="in-content" id="ad-category-in-content" className="my-10" />

      {/* Category FAQ Section */}
      <section className="bg-[#ffffff] border-2 border-[#111111] rounded-xl p-6 sm:p-8 shadow-[3px_3px_0px_#111111] mb-14 content-visibility-auto">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="w-5 h-5 text-[#d9541e]" />
          <h2 className="text-lg sm:text-xl font-bold text-[#111111]">
            Frequently Asked Questions about {category.name}
          </h2>
        </div>
        <div className="space-y-4">
          {categoryFaqs.map((faq, idx) => (
            <div key={idx} className="p-3 bg-[#fdfbf7] rounded-lg border border-[#e6dfd2]">
              <h3 className="text-xs sm:text-sm font-bold text-[#111111]">{faq.question}</h3>
              <p className="text-xs text-[#555555] mt-1 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Explore Other Categories */}
      <section className="pt-8 border-t-2 border-[#111111] content-visibility-auto">
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
      </section>
    </div>
  );
}
