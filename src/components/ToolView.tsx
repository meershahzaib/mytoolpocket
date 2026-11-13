import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/data/categories";
import { getToolBySlug, getToolsByCategory, ToolItem } from "@/data/tools";
import { getToolSeoData } from "@/data/textToolsSeoData";
import { getDevToolSeoData } from "@/data/devToolsSeoData";
import { getSeoToolSeoData } from "@/data/seoToolsSeoData";
import Breadcrumbs from "@/components/Breadcrumbs";
import ToolRenderer from "@/components/ToolRenderer";
import ToolCard from "@/components/ToolCard";
import { DynamicIcon } from "@/components/DynamicIcon";
import AdPlaceholder from "@/components/AdPlaceholder";
import { Shield, Sparkles, CheckCircle, HelpCircle, ArrowRight, BookOpen, Users } from "lucide-react";

interface ToolViewProps {
  categorySlug: string;
  toolSlug: string;
}

export default function ToolView({ categorySlug, toolSlug }: ToolViewProps) {
  const category = getCategoryBySlug(categorySlug);
  const tool = getToolBySlug(categorySlug, toolSlug);
  const seoData = getSeoToolSeoData(toolSlug) || getDevToolSeoData(toolSlug) || getToolSeoData(toolSlug);

  if (!category || !tool) {
    notFound();
  }

  // Related tools: if specific relatedSlugs are defined, find those; otherwise grab other tools in category
  let relatedTools: ToolItem[] = [];
  if (seoData && seoData.relatedSlugs && seoData.relatedSlugs.length > 0) {
    relatedTools = seoData.relatedSlugs
      .map((slug) => getToolBySlug(categorySlug, slug))
      .filter((t): t is NonNullable<typeof t> => Boolean(t))
      .slice(0, 5);
  }
  if (relatedTools.length < 4) {
    const additional = getToolsByCategory(categorySlug)
      .filter((t) => t.slug !== toolSlug && !relatedTools.some((rt) => rt.slug === t.slug))
      .slice(0, 5 - relatedTools.length);
    relatedTools = [...relatedTools, ...additional];
  }

  const siteUrl = "https://mytoolpocket.com";
  const canonicalUrl = `${siteUrl}/${category.slug}/${tool.slug}/`;

  // Schemas
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": tool.name,
    "url": canonicalUrl,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
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
        "item": `${siteUrl}/${category.slug}/`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": tool.name
      }
    ]
  };

  const faqs = seoData?.faqs || [
    {
      question: `Is this ${tool.name.toLowerCase()} free to use?`,
      answer: "Yes, it is completely free with no usage limits and works directly in your web browser."
    },
    {
      question: "Is my text data stored or saved on any server?",
      answer: "No. All text parsing runs locally in your browser memory via client-side JavaScript. Your content is never transmitted across a network or saved to any database."
    },
    {
      question: "Do I need to create an account or install software?",
      answer: "No registration, download, or account creation is required. You can use the tool instantly."
    },
    {
      question: "Does this utility work on mobile phones?",
      answer: "Yes, the interface is fully responsive and optimized for mobile devices, tablets, and desktop screens."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };

  const steps = seoData?.steps || [
    "Paste or type your content into the primary input area above.",
    "Adjust any custom options or formatting toggles as required.",
    "View your processed output calculated instantaneously.",
    "Click the orange Copy or Download button to save the result."
  ];

  const features = seoData?.features || [
    "Instant real-time processing with zero latency",
    "100% private and secure browser-side execution",
    "No registration, account login, or installation required",
    "Clean, responsive design optimized for mobile and desktop",
    "One-click clipboard copying for fast workflows"
  ];

  const useCases = seoData?.useCases || [
    {
      title: "Writers & Editors",
      description: "Format, count, and sanitize drafts quickly without opening bulky desktop applications."
    },
    {
      title: "Developers & Programmers",
      description: "Clean code snippets, normalize strings, and transform data payloads instantly."
    },
    {
      title: "Students & Researchers",
      description: "Verify document specifications, character bounds, and formatting guidelines with confidence."
    }
  ];

  const intro = seoData?.shortIntro || `${tool.name} is a fast, free browser utility designed to help you process and format your text with ease.`;

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: category.name, href: `/${category.slug}` },
          { label: tool.name }
        ]}
      />

      {/* 2. Single H1 with Primary Keyword & 3. Short Intro */}
      <header className="mb-6">
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
            <h1 className="text-2xl sm:text-4xl font-black text-[#111111] tracking-tight">
              {tool.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#555555] mt-2 leading-relaxed max-w-2xl">
              {intro}
            </p>
          </div>
        </div>
      </header>

      {/* 4. THE TOOL - Visible immediately above the fold, no scrolling needed */}
      <section className="mb-6" aria-label={`${tool.name} interactive application`}>
        <ToolRenderer tool={tool} />
      </section>

      {/* Placement 7: Below Tool In-Content Ad */}
      <AdPlaceholder slot="in-content" id="ad-tool-below-app" className="my-8" />

      {/* Trust & Privacy Notice */}
      <div className="bg-[#ffffff] border-2 border-[#111111] border-l-6 border-l-[#d9541e] rounded-xl p-4 shadow-[2px_2px_0px_#111111] mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#f3eee3] border border-[#111111] flex items-center justify-center shrink-0">
            <Shield className="w-4 h-4 text-[#d9541e]" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#111111]">100% Client-Side Private</h4>
            <p className="text-[11px] text-[#555555]">
              Your input text stays exclusively in your local browser memory. Nothing is sent to external servers.
            </p>
          </div>
        </div>
        <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-[#f3eee3] text-[#111111] border border-[#111111] whitespace-nowrap">
          Client-Side Safe
        </span>
      </div>

      {/* 5. How to Use Section */}
      <section className="bg-[#ffffff] border-2 border-[#111111] border-l-6 border-l-[#d9541e] rounded-xl p-6 sm:p-8 shadow-[3px_3px_0px_#111111] mb-10 content-visibility-auto">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="w-5 h-5 text-[#d9541e]" />
          <h2 className="text-lg sm:text-xl font-bold text-[#111111]">
            How to Use the {tool.name}
          </h2>
        </div>
        <ol className="space-y-2.5 text-xs sm:text-sm text-[#555555] list-decimal list-inside leading-relaxed">
          {steps.map((step, idx) => (
            <li key={idx} className="pl-1">
              <span className="font-semibold text-[#111111]">{step.split(" ")[0]} {step.split(" ")[1] || ""}</span> {step.split(" ").slice(2).join(" ")}
            </li>
          ))}
        </ol>
      </section>

      {/* 6. Features & 7. Who Can Use This Tool */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 content-visibility-auto">
        <section className="bg-[#ffffff] border-2 border-[#111111] rounded-xl p-6 shadow-[3px_3px_0px_#111111]">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#d9541e]" />
            <h2 className="text-lg font-bold text-[#111111]">Features</h2>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-[#555555] leading-relaxed">
            {features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#d9541e] font-bold">&bull;</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-[#ffffff] border-2 border-[#111111] rounded-xl p-6 shadow-[3px_3px_0px_#111111]">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-[#d9541e]" />
            <h2 className="text-lg font-bold text-[#111111]">Who Can Use This Tool</h2>
          </div>
          <div className="space-y-3.5 text-xs sm:text-sm text-[#555555] leading-relaxed">
            {useCases.map((uc, idx) => (
              <div key={idx}>
                <h3 className="font-bold text-[#111111] text-xs sm:text-sm">{uc.title}</h3>
                <p className="text-xs text-[#555555] mt-0.5">{uc.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 8. Frequently Asked Questions (with H3 for questions) */}
      <section className="bg-[#ffffff] border-2 border-[#111111] rounded-xl p-6 sm:p-8 shadow-[3px_3px_0px_#111111] mb-10 content-visibility-auto">
        <div className="flex items-center gap-2 mb-5">
          <HelpCircle className="w-5 h-5 text-[#d9541e]" />
          <h2 className="text-lg sm:text-xl font-bold text-[#111111]">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-3.5 bg-[#fdfbf7] rounded-lg border border-[#e6dfd2]">
              <h3 className="text-xs sm:text-sm font-bold text-[#111111]">
                {faq.question}
              </h3>
              <p className="text-xs text-[#555555] mt-1.5 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Short Helpful Guide (200-400 words) */}
      {seoData?.guide && (
        <section className="bg-[#ffffff] border-2 border-[#111111] border-l-6 border-l-[#d9541e] rounded-xl p-6 sm:p-8 shadow-[3px_3px_0px_#111111] mb-10 content-visibility-auto">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-[#d9541e]" />
            <h2 className="text-lg sm:text-xl font-bold text-[#111111]">
              {seoData.guide.heading}
            </h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-[#444444] leading-relaxed">
            {seoData.guide.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </section>
      )}

      {/* Placement 8: Tool Page Pre-Related Leaderboard */}
      <AdPlaceholder slot="leaderboard" id="ad-tool-pre-related" className="my-10" />

      {/* 9. Related Tools (4-6 links) */}
      {relatedTools.length > 0 && (
        <section className="pt-8 border-t-2 border-[#111111] content-visibility-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#111111]">
                Related Tools
              </h2>
              <p className="text-xs text-[#666666]">
                Explore other helpful utilities in the {category.name} collection.
              </p>
            </div>
            <Link
              href={`/${category.slug}`}
              className="text-xs font-bold text-[#d9541e] hover:underline flex items-center gap-1"
            >
              <span>All {category.name}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedTools.map((relTool) => (
              <ToolCard key={relTool.id} tool={relTool} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
