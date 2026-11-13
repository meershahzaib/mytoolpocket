"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Copy,
  Check,
  RefreshCw,
  Search,
  Eye,
  Sliders,
  Globe,
  Share2,
  Code,
  FileCode,
  ArrowRight,
  AlertCircle,
  HelpCircle,
  Clock,
  Layers,
  CheckCircle2,
  Smartphone,
  Monitor
} from "lucide-react";

export function SeoCopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      disabled={!text}
      className="px-3.5 py-1.5 text-xs font-bold bg-[#d9541e] text-[#ffffff] rounded-lg border border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#bf4514] disabled:opacity-50 active:translate-x-0.5 active:translate-y-0.5 transition-all inline-flex items-center gap-1.5 cursor-pointer"
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      <span>{copied ? "Copied" : label}</span>
    </button>
  );
}

// -------------------------------------------------------------
// 1. Meta Tag Generator
// -------------------------------------------------------------
export function MetaTagGeneratorTool() {
  const [title, setTitle] = useState("mytoolpocket - Free Pocket Utilities");
  const [description, setDescription] = useState("Fast, client-side, zero-latency online utilities for creators and developers.");
  const [keywords, setKeywords] = useState("tools, utility, web tools, seo");
  const [author, setAuthor] = useState("mytoolpocket.com");
  const [url, setUrl] = useState("https://mytoolpocket.com");
  const [ogImage, setOgImage] = useState("https://mytoolpocket.com/logo.svg");

  const generatedTags = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${description}">
<meta name="keywords" content="${keywords}">
<meta name="author" content="${author}">
<link rel="canonical" href="${url}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${ogImage}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${url}">
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${description}">
<meta property="twitter:image" content="${ogImage}">`;

  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-4 sm:p-6 lg:p-8 shadow-[4px_4px_0px_#111111] space-y-6 w-full max-w-full overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-0">
        <div className="space-y-4 min-w-0">
          <span className="text-xs font-bold uppercase tracking-wider text-[#666666] block">
            Configure Page Metadata
          </span>

          <div>
            <div className="flex justify-between text-xs font-bold text-[#111111] mb-1">
              <span>Page Title</span>
              <span className={title.length > 60 ? "text-amber-600" : "text-[#777777]"}>
                {title.length}/60 chars
              </span>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-medium"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-[#111111] mb-1">
              <span>Meta Description</span>
              <span className={description.length > 160 ? "text-amber-600" : "text-[#777777]"}>
                {description.length}/160 chars
              </span>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full p-2.5 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#111111] mb-1">Canonical URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-2 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 min-w-0">
            <div>
              <label className="block text-xs font-bold text-[#111111] mb-1">Keywords</label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="w-full p-2 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#111111] mb-1">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full p-2 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-medium"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#666666]">
              Generated HTML Meta Tags
            </span>
            <SeoCopyButton text={generatedTags} label="Copy Meta Tags" />
          </div>
          <div className="w-full min-w-0 overflow-hidden rounded-xl border-2 border-[#111111] bg-[#fdfbf7] shadow-[2px_2px_0px_#111111]">
            <pre className="p-4 text-xs font-mono text-[#111111] overflow-x-auto min-h-[300px] leading-relaxed whitespace-pre">
              {generatedTags}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 2. Open Graph Generator
// -------------------------------------------------------------
export function OpenGraphGeneratorTool() {
  const [ogTitle, setOgTitle] = useState("mytoolpocket - 50+ Free Browser Utilities");
  const [ogDesc, setOgDesc] = useState("The private, instantaneous toolkit in your browser pocket. Zero signup required.");
  const [ogUrl, setOgUrl] = useState("https://mytoolpocket.com");
  const [ogImg, setOgImg] = useState("https://mytoolpocket.com/og-banner.png");
  const [ogType, setOgType] = useState("website");

  const tags = `<meta property="og:title" content="${ogTitle}">
<meta property="og:description" content="${ogDesc}">
<meta property="og:image" content="${ogImg}">
<meta property="og:url" content="${ogUrl}">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="mytoolpocket.com">`;

  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-4 sm:p-6 lg:p-8 shadow-[4px_4px_0px_#111111] space-y-6 w-full max-w-full overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-0">
        <div className="space-y-4 min-w-0">
          <div>
            <label className="block text-xs font-bold text-[#111111] mb-1">OG Title</label>
            <input
              type="text"
              value={ogTitle}
              onChange={(e) => setOgTitle(e.target.value)}
              className="w-full p-2.5 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#111111] mb-1">OG Description</label>
            <textarea
              value={ogDesc}
              onChange={(e) => setOgDesc(e.target.value)}
              rows={3}
              className="w-full p-2.5 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#111111] mb-1">Canonical Webpage URL</label>
            <input
              type="text"
              value={ogUrl}
              onChange={(e) => setOgUrl(e.target.value)}
              className="w-full p-2 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#111111] mb-1">Image URL (1200x630px Recommended)</label>
            <input
              type="text"
              value={ogImg}
              onChange={(e) => setOgImg(e.target.value)}
              className="w-full p-2 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-mono"
            />
          </div>
        </div>

        <div className="space-y-4 min-w-0">
          <span className="text-xs font-bold uppercase tracking-wider text-[#666666] block">
            Live Facebook / LinkedIn Card Preview
          </span>
          <div className="border-2 border-[#111111] rounded-xl overflow-hidden bg-[#ffffff] shadow-[3px_3px_0px_#111111]">
            <div className="h-40 bg-[#f3eee3] flex items-center justify-center border-b-2 border-[#111111] p-4 text-center overflow-hidden">
              <span className="text-xs font-mono text-[#777777] break-all">{ogImg}</span>
            </div>
            <div className="p-4 space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#777777]">mytoolpocket.com</span>
              <h4 className="text-sm font-bold text-[#111111] line-clamp-1">{ogTitle}</h4>
              <p className="text-xs text-[#555555] line-clamp-2">{ogDesc}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#666666]">HTML Snippet</span>
            <SeoCopyButton text={tags} label="Copy OG Tags" />
          </div>
          <div className="w-full min-w-0 overflow-hidden rounded-xl border-2 border-[#111111] bg-[#fdfbf7] shadow-[2px_2px_0px_#111111]">
            <pre className="p-3 text-xs font-mono text-[#111111] overflow-x-auto whitespace-pre leading-relaxed">
              {tags}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 3. Robots.txt Generator
// -------------------------------------------------------------
export function RobotsTxtGeneratorTool() {
  const [allowAll, setAllowAll] = useState(true);
  const [disallowedDirs, setDisallowedDirs] = useState("/api/\n/admin/\n/*?*");
  const [sitemapUrl, setSitemapUrl] = useState("https://mytoolpocket.com/sitemap.xml");

  const output = useMemo(() => {
    let lines = ["User-agent: *"];
    if (allowAll) {
      lines.push("Allow: /");
    }
    const dirs = disallowedDirs.split("\n").map((d) => d.trim()).filter(Boolean);
    dirs.forEach((dir) => {
      lines.push(`Disallow: ${dir}`);
    });
    if (sitemapUrl.trim()) {
      lines.push("");
      lines.push(`Sitemap: ${sitemapUrl.trim()}`);
    }
    return lines.join("\n");
  }, [allowAll, disallowedDirs, sitemapUrl]);

  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-4 sm:p-6 lg:p-8 shadow-[4px_4px_0px_#111111] space-y-6 w-full max-w-full overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-0">
        <div className="space-y-4 min-w-0">
          <label className="flex items-center gap-2 text-xs font-bold text-[#111111] cursor-pointer">
            <input
              type="checkbox"
              checked={allowAll}
              onChange={(e) => setAllowAll(e.target.checked)}
              className="w-4 h-4 accent-[#d9541e]"
            />
            <span>Allow All Public Pages by Default (Allow: /)</span>
          </label>

          <div>
            <label className="block text-xs font-bold text-[#111111] mb-1">
              Disallow Directories (one per line)
            </label>
            <textarea
              value={disallowedDirs}
              onChange={(e) => setDisallowedDirs(e.target.value)}
              rows={5}
              className="w-full p-2.5 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#111111] mb-1">
              XML Sitemap URL
            </label>
            <input
              type="text"
              value={sitemapUrl}
              onChange={(e) => setSitemapUrl(e.target.value)}
              className="w-full p-2.5 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-mono"
            />
          </div>
        </div>

        <div className="space-y-3 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#666666]">
              Generated robots.txt
            </span>
            <SeoCopyButton text={output} label="Copy robots.txt" />
          </div>
          <div className="w-full min-w-0 overflow-hidden rounded-xl border-2 border-[#111111] bg-[#fdfbf7] shadow-[2px_2px_0px_#111111]">
            <pre className="p-4 text-xs font-mono text-[#111111] min-h-[220px] overflow-x-auto leading-relaxed whitespace-pre">
              {output}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 4. Keyword Density Checker
// -------------------------------------------------------------
export function KeywordDensityCheckerTool() {
  const [text, setText] = useState("Search engine optimization tools help webmasters optimize content. Keyword density checker analyzes keyword density to prevent over-optimization and keyword stuffing penalties. Use clean SEO copy for better rankings.");

  const analysis = useMemo(() => {
    const stopWords = new Set(["the", "and", "a", "an", "in", "to", "of", "for", "is", "on", "that", "this", "with", "as", "by", "at", "from", "or", "it"]);
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2);

    const totalWords = words.length;
    const freqMap: Record<string, number> = {};

    words.forEach((w) => {
      if (!stopWords.has(w)) {
        freqMap[w] = (freqMap[w] || 0) + 1;
      }
    });

    const sorted = Object.entries(freqMap)
      .map(([word, count]) => ({
        word,
        count,
        percent: totalWords > 0 ? ((count / totalWords) * 100).toFixed(1) : "0",
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return { totalWords, items: sorted };
  }, [text]);

  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-4 sm:p-6 lg:p-8 shadow-[4px_4px_0px_#111111] space-y-6 w-full max-w-full overflow-hidden">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-1.5">
          Paste Text to Analyze Keyword Density ({analysis.totalWords} words)
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          className="w-full p-3 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-mono focus:outline-none"
        />
      </div>

      <div className="space-y-3 min-w-0">
        <span className="text-xs font-bold uppercase tracking-wider text-[#111111]">
          Top Keyword Occurrences & Density Percentages
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 min-w-0">
          {analysis.items.map((item) => (
            <div
              key={item.word}
              className="p-3 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl flex items-center justify-between"
            >
              <div>
                <span className="font-bold text-xs text-[#111111]">{item.word}</span>
                <span className="text-[11px] text-[#777777] ml-2 font-mono">({item.count}x)</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#f3eee3] border border-[#111111] text-xs font-bold text-[#d9541e]">
                {item.percent}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 5. SERP Snippet Preview
// -------------------------------------------------------------
export function SerpPreviewTool() {
  const [title, setTitle] = useState("Best Free Online Developer & SEO Tools | mytoolpocket");
  const [url, setUrl] = useState("https://mytoolpocket.com/seo-tools");
  const [desc, setDesc] = useState("Over 50+ free browser utilities for creators and developers. Fast, private, and 100% client-side with zero latency. Explore all toolkits today.");
  const [mode, setMode] = useState<"desktop" | "mobile">("desktop");

  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-4 sm:p-6 lg:p-8 shadow-[4px_4px_0px_#111111] space-y-6 w-full max-w-full overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-0">
        <div className="space-y-4 min-w-0">
          <div>
            <div className="flex justify-between text-xs font-bold text-[#111111] mb-1">
              <span>Page Title</span>
              <span className={title.length > 60 ? "text-amber-600 font-bold" : "text-[#777777]"}>
                {title.length}/60 chars
              </span>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#111111] mb-1">Destination URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-2.5 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-mono"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-[#111111] mb-1">
              <span>Meta Description</span>
              <span className={desc.length > 160 ? "text-amber-600 font-bold" : "text-[#777777]"}>
                {desc.length}/160 chars
              </span>
            </div>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={4}
              className="w-full p-2.5 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-medium"
            />
          </div>
        </div>

        <div className="space-y-4 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#666666]">
              Google SERP Simulation
            </span>
            <div className="flex items-center gap-1 bg-[#f3eee3] border-2 border-[#111111] rounded-lg p-1">
              <button
                onClick={() => setMode("desktop")}
                className={`px-2.5 py-1 text-xs font-bold rounded flex items-center gap-1 ${mode === "desktop" ? "bg-[#111111] text-[#ffffff]" : "text-[#555555]"}`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop</span>
              </button>
              <button
                onClick={() => setMode("mobile")}
                className={`px-2.5 py-1 text-xs font-bold rounded flex items-center gap-1 ${mode === "mobile" ? "bg-[#111111] text-[#ffffff]" : "text-[#555555]"}`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile</span>
              </button>
            </div>
          </div>

          {/* Google Result Card Simulation */}
          <div className="p-4 sm:p-5 bg-[#ffffff] border-2 border-[#111111] rounded-xl shadow-[4px_4px_0px_#111111] font-sans space-y-1 min-w-0 overflow-hidden">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 shrink-0 rounded-full bg-[#f3eee3] border border-[#111111] flex items-center justify-center text-[10px] font-bold">
                M
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[12px] text-[#202124] font-medium leading-none">mytoolpocket</span>
                <span className="text-[10px] text-[#5f6368] font-mono truncate max-w-full mt-0.5">{url}</span>
              </div>
            </div>
            <h3 className="text-base sm:text-lg text-[#1a0dab] hover:underline cursor-pointer font-medium leading-snug pt-1 break-words">
              {title || "Example Search Title"}
            </h3>
            <p className="text-xs text-[#4d5156] leading-relaxed pt-0.5 break-words">
              {desc || "Example search meta description snippet will appear right here..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 6. UTM Link Builder
// -------------------------------------------------------------
export function UtmLinkBuilderTool() {
  const [baseUrl, setBaseUrl] = useState("https://mytoolpocket.com/tools");
  const [source, setSource] = useState("newsletter");
  const [medium, setMedium] = useState("email");
  const [campaign, setCampaign] = useState("winter_release");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("cta_button");

  const fullUrl = useMemo(() => {
    if (!baseUrl.trim()) return "";
    try {
      const u = new URL(baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`);
      if (source) u.searchParams.set("utm_source", source);
      if (medium) u.searchParams.set("utm_medium", medium);
      if (campaign) u.searchParams.set("utm_campaign", campaign);
      if (term) u.searchParams.set("utm_term", term);
      if (content) u.searchParams.set("utm_content", content);
      return u.toString();
    } catch {
      return "Invalid Base URL";
    }
  }, [baseUrl, source, medium, campaign, term, content]);

  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-4 sm:p-6 lg:p-8 shadow-[4px_4px_0px_#111111] space-y-6 w-full max-w-full overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-[#111111] mb-1">Destination URL *</label>
          <input
            type="text"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            className="w-full p-2.5 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-mono"
            placeholder="https://example.com"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#111111] mb-1">Campaign Source (utm_source) *</label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full p-2 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-medium"
            placeholder="google, twitter, newsletter"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#111111] mb-1">Campaign Medium (utm_medium) *</label>
          <input
            type="text"
            value={medium}
            onChange={(e) => setMedium(e.target.value)}
            className="w-full p-2 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-medium"
            placeholder="cpc, email, social"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#111111] mb-1">Campaign Name (utm_campaign)</label>
          <input
            type="text"
            value={campaign}
            onChange={(e) => setCampaign(e.target.value)}
            className="w-full p-2 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-medium"
            placeholder="spring_sale"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#111111] mb-1">Campaign Content (utm_content)</label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-medium"
            placeholder="hero_banner"
          />
        </div>
      </div>

      <div className="p-4 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl space-y-2 min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#666666]">
            Generated Tracking Link
          </span>
          <SeoCopyButton text={fullUrl} label="Copy Tracking URL" />
        </div>
        <div className="p-3 bg-[#ffffff] border-2 border-[#111111] rounded-lg font-mono text-xs text-[#d9541e] break-all select-all overflow-x-auto">
          {fullUrl}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 7. Schema Markup Generator
// -------------------------------------------------------------
export function SchemaMarkupGeneratorTool() {
  const [schemaType, setSchemaType] = useState<"Article" | "Organization" | "Product" | "WebSite" | "LocalBusiness">("Article");
  const [name, setName] = useState("10 Essential Developer Utilities");
  const [url, setUrl] = useState("https://mytoolpocket.com/blog/10-essential-developer-utilities");
  const [author, setAuthor] = useState("mytoolpocket");
  const [description, setDescription] = useState("Fast, privacy-friendly online utilities for developers and creators.");
  const [image, setImage] = useState("https://mytoolpocket.com/og-banner.png");
  const [price, setPrice] = useState("0");
  const [currency, setCurrency] = useState("USD");
  const [phone, setPhone] = useState("+1-555-0199");
  const [address, setAddress] = useState("100 Tech Blvd, Silicon Valley, CA");

  const jsonLd = useMemo(() => {
    const obj: any = {
      "@context": "https://schema.org",
      "@type": schemaType,
      name: name,
      url: url,
    };

    if (schemaType === "Article") {
      obj.headline = name;
      obj.description = description;
      obj.image = image;
      obj.author = {
        "@type": "Person",
        name: author,
      };
      obj.publisher = {
        "@type": "Organization",
        name: "mytoolpocket",
        logo: {
          "@type": "ImageObject",
          url: "https://mytoolpocket.com/logo.svg",
        },
      };
      obj.datePublished = "2026-11-13";
      obj.dateModified = "2026-11-13";
    } else if (schemaType === "Organization") {
      obj.description = description;
      obj.logo = image;
      obj.contactPoint = {
        "@type": "ContactPoint",
        telephone: phone,
        contactType: "customer service",
      };
      obj.sameAs = [
        "https://twitter.com/mytoolpocket",
        "https://github.com/mytoolpocket",
      ];
    } else if (schemaType === "Product") {
      obj.description = description;
      obj.image = image;
      obj.offers = {
        "@type": "Offer",
        price: price,
        priceCurrency: currency,
        availability: "https://schema.org/InStock",
      };
    } else if (schemaType === "WebSite") {
      obj.description = description;
      obj.potentialAction = {
        "@type": "SearchAction",
        target: `${url}/tools?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      };
    } else if (schemaType === "LocalBusiness") {
      obj.description = description;
      obj.telephone = phone;
      obj.address = {
        "@type": "PostalAddress",
        streetAddress: address,
      };
      obj.openingHours = "Mo-Fr 09:00-18:00";
    }

    return JSON.stringify(obj, null, 2);
  }, [schemaType, name, url, author, description, image, price, currency, phone, address]);

  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-4 sm:p-6 lg:p-8 shadow-[4px_4px_0px_#111111] space-y-6 w-full max-w-full overflow-hidden">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-2">
          Select Schema.org Type
        </label>
        <div className="flex flex-wrap gap-2">
          {(["Article", "Organization", "Product", "WebSite", "LocalBusiness"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setSchemaType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 border-[#111111] transition-all ${
                schemaType === t
                  ? "bg-[#111111] text-[#ffffff] shadow-[2px_2px_0px_#d9541e]"
                  : "bg-[#ffffff] text-[#111111] hover:bg-[#f3eee3]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-0">
        <div className="space-y-4 min-w-0">
          <div>
            <label className="block text-xs font-bold text-[#111111] mb-1">
              {schemaType === "Article"
                ? "Article Headline / Title *"
                : schemaType === "Product"
                ? "Product Name *"
                : schemaType === "LocalBusiness"
                ? "Business Name *"
                : "Entity / Site Name *"}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-medium focus:outline-none focus:border-[#d9541e]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#111111] mb-1">Canonical URL *</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-2.5 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-mono focus:outline-none focus:border-[#d9541e]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#111111] mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full p-2.5 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-medium focus:outline-none focus:border-[#d9541e]"
            />
          </div>

          {schemaType === "Article" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 min-w-0">
              <div>
                <label className="block text-xs font-bold text-[#111111] mb-1">Author Name</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full p-2 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#111111] mb-1">Image URL</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full p-2 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-mono"
                />
              </div>
            </div>
          )}

          {schemaType === "Product" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 min-w-0">
              <div>
                <label className="block text-xs font-bold text-[#111111] mb-1">Price</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-2 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#111111] mb-1">Currency</label>
                <input
                  type="text"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full p-2 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-mono"
                />
              </div>
            </div>
          )}

          {(schemaType === "Organization" || schemaType === "LocalBusiness") && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 min-w-0">
              <div>
                <label className="block text-xs font-bold text-[#111111] mb-1">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#111111] mb-1">Logo / Image URL</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full p-2 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-mono"
                />
              </div>
            </div>
          )}

          {schemaType === "LocalBusiness" && (
            <div>
              <label className="block text-xs font-bold text-[#111111] mb-1">Physical Street Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2.5 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-medium"
              />
            </div>
          )}
        </div>

        <div className="space-y-3 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#666666]">
              Generated JSON-LD Structured Data
            </span>
            <SeoCopyButton text={`<script type="application/ld+json">\n${jsonLd}\n</script>`} label="Copy JSON-LD" />
          </div>

          <div className="w-full min-w-0 overflow-hidden rounded-xl border-2 border-[#111111] bg-[#fdfbf7] shadow-[2px_2px_0px_#111111]">
            <div className="px-3.5 py-2 bg-[#f3eee3] border-b-2 border-[#111111] flex items-center justify-between text-[11px] font-mono text-[#555555]">
              <span>application/ld+json</span>
              <span className="font-bold text-[#d9541e] uppercase">{schemaType} Schema</span>
            </div>
            <pre className="p-4 text-xs font-mono text-[#111111] overflow-x-auto overflow-y-auto max-h-[480px] leading-relaxed whitespace-pre">
              {`<script type="application/ld+json">\n${jsonLd}\n</script>`}
            </pre>
          </div>

          <div className="p-3 bg-[#f3eee3] border border-[#111111] rounded-lg text-[11px] text-[#555555] leading-relaxed">
            <strong className="text-[#111111]">SEO Implementation:</strong> Paste this script inside the <code className="bg-[#ffffff] px-1 py-0.5 rounded border border-[#111111]">&lt;head&gt;</code> tag of your page HTML.
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 8. FAQ Schema Generator
// -------------------------------------------------------------
export function FaqSchemaGeneratorTool() {
  const [faqs, setFaqs] = useState([
    { q: "Is mytoolpocket completely free?", a: "Yes, 100% free with no signups, credit cards, or hidden limits." },
    { q: "Do these tools run locally in my browser?", a: "Yes, all processing executes client-side using JavaScript for maximum privacy." }
  ]);

  const addFaq = () => {
    setFaqs([...faqs, { q: "New Question?", a: "New Answer." }]);
  };

  const updateFaq = (index: number, field: "q" | "a", val: string) => {
    const next = [...faqs];
    next[index][field] = val;
    setFaqs(next);
  };

  const deleteFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const jsonLd = useMemo(() => {
    const obj = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.a,
        },
      })),
    };
    return JSON.stringify(obj, null, 2);
  }, [faqs]);

  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-4 sm:p-6 lg:p-8 shadow-[4px_4px_0px_#111111] space-y-6 w-full max-w-full overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-0">
        <div className="space-y-4 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#666666]">
              FAQ Questions & Answers ({faqs.length})
            </span>
            <button
              onClick={addFaq}
              className="px-3 py-1.5 text-xs font-bold bg-[#d9541e] text-[#ffffff] rounded-lg border border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#bf4514]"
            >
              + Add Question
            </button>
          </div>

          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-3 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#777777]">Question #{idx + 1}</span>
                  {faqs.length > 1 && (
                    <button
                      onClick={() => deleteFaq(idx)}
                      className="text-xs text-red-600 font-bold hover:underline"
                    >
                      Delete
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={faq.q}
                  onChange={(e) => updateFaq(idx, "q", e.target.value)}
                  className="w-full p-2 bg-[#ffffff] border-2 border-[#111111] rounded-lg text-xs font-medium"
                />
                <textarea
                  value={faq.a}
                  onChange={(e) => updateFaq(idx, "a", e.target.value)}
                  rows={2}
                  className="w-full p-2 bg-[#ffffff] border-2 border-[#111111] rounded-lg text-xs font-medium"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#666666]">
              FAQPage JSON-LD Code
            </span>
            <SeoCopyButton text={`<script type="application/ld+json">\n${jsonLd}\n</script>`} label="Copy FAQ Schema" />
          </div>
          <div className="w-full min-w-0 overflow-hidden rounded-xl border-2 border-[#111111] bg-[#fdfbf7] shadow-[2px_2px_0px_#111111]">
            <pre className="p-4 text-xs font-mono text-[#111111] min-h-[300px] overflow-x-auto whitespace-pre leading-relaxed">
              {`<script type="application/ld+json">\n${jsonLd}\n</script>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 9. Htaccess Redirect Generator
// -------------------------------------------------------------
export function HtaccessRedirectGeneratorTool() {
  const [type, setType] = useState<"301" | "https" | "www">("301");
  const [oldPath, setOldPath] = useState("/old-article-url");
  const [newUrl, setNewUrl] = useState("https://mytoolpocket.com/new-article-url");

  const rules = useMemo(() => {
    if (type === "301") {
      return `# 301 Permanent Redirect\nRedirect 301 ${oldPath} ${newUrl}`;
    } else if (type === "https") {
      return `# Force HTTPS Redirect\nRewriteEngine On\nRewriteCond %{HTTPS} off\nRewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]`;
    } else {
      return `# Canonical WWW to non-WWW Redirect\nRewriteEngine On\nRewriteCond %{HTTP_HOST} ^www\\.(.*)$ [NC]\nRewriteRule ^(.*)$ https://%1/$1 [R=301,L]`;
    }
  }, [type, oldPath, newUrl]);

  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-4 sm:p-6 lg:p-8 shadow-[4px_4px_0px_#111111] space-y-6 w-full max-w-full overflow-hidden">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setType("301")}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 border-[#111111] ${type === "301" ? "bg-[#111111] text-[#ffffff]" : "bg-[#ffffff] text-[#111111]"}`}
        >
          301 URL Redirect
        </button>
        <button
          onClick={() => setType("https")}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 border-[#111111] ${type === "https" ? "bg-[#111111] text-[#ffffff]" : "bg-[#ffffff] text-[#111111]"}`}
        >
          Force HTTPS
        </button>
        <button
          onClick={() => setType("www")}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 border-[#111111] ${type === "www" ? "bg-[#111111] text-[#ffffff]" : "bg-[#ffffff] text-[#111111]"}`}
        >
          Canonicalize Domain
        </button>
      </div>

      {type === "301" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
          <div>
            <label className="block text-xs font-bold text-[#111111] mb-1">Old Relative Path</label>
            <input
              type="text"
              value={oldPath}
              onChange={(e) => setOldPath(e.target.value)}
              className="w-full p-2.5 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#111111] mb-1">New Destination Full URL</label>
            <input
              type="text"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="w-full p-2.5 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-mono"
            />
          </div>
        </div>
      )}

      <div className="space-y-3 min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#666666]">
            Apache .htaccess Directives
          </span>
          <SeoCopyButton text={rules} label="Copy .htaccess Rules" />
        </div>
        <div className="w-full min-w-0 overflow-hidden rounded-xl border-2 border-[#111111] bg-[#fdfbf7] shadow-[2px_2px_0px_#111111]">
          <pre className="p-4 text-xs font-mono text-[#111111] overflow-x-auto whitespace-pre leading-relaxed">
            {rules}
          </pre>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 10. Heading Structure Checker
// -------------------------------------------------------------
export function HeadingCheckerTool() {
  const [htmlInput, setHtmlInput] = useState(`<h1>Main Guide Title</h1>\n<p>Introduction paragraph.</p>\n<h2>Section 1: Getting Started</h2>\n<p>Details here.</p>\n<h3>Sub-item A</h3>\n<h2>Section 2: Advanced Techniques</h2>`);

  const headings = useMemo(() => {
    const list: { level: string; text: string }[] = [];
    // HTML regex
    const matches = htmlInput.matchAll(/<(h[1-6])[^>]*>(.*?)<\/\1>/gi);
    for (const m of matches) {
      list.push({ level: m[1].toUpperCase(), text: m[2].replace(/<[^>]+>/g, "") });
    }
    // Markdown fallback if empty
    if (list.length === 0) {
      const mdMatches = htmlInput.matchAll(/^(#{1,6})\s+(.*$)/gm);
      for (const m of mdMatches) {
        list.push({ level: `H${m[1].length}`, text: m[2] });
      }
    }
    return list;
  }, [htmlInput]);

  const h1Count = headings.filter((h) => h.level === "H1").length;

  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-4 sm:p-6 lg:p-8 shadow-[4px_4px_0px_#111111] space-y-6 w-full max-w-full overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-0">
        <div className="min-w-0">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-1.5">
            Paste HTML or Markdown Content
          </label>
          <textarea
            value={htmlInput}
            onChange={(e) => setHtmlInput(e.target.value)}
            rows={12}
            className="w-full p-3 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-mono focus:outline-none"
          />
        </div>

        <div className="space-y-4 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            {h1Count === 1 ? (
              <span className="px-2.5 py-1 bg-emerald-100 border border-emerald-600 text-emerald-800 rounded-lg text-xs font-bold">
                ✓ 1 H1 Tag (Ideal)
              </span>
            ) : (
              <span className="px-2.5 py-1 bg-amber-100 border border-amber-600 text-amber-800 rounded-lg text-xs font-bold">
                ⚠ {h1Count} H1 Tags Found (Best practice: exactly 1)
              </span>
            )}
            <span className="text-xs text-[#777777] font-semibold">
              Total Headings: {headings.length}
            </span>
          </div>

          <div className="p-4 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl max-h-[320px] overflow-y-auto space-y-2 min-w-0">
            {headings.length > 0 ? (
              headings.map((h, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-xs font-mono min-w-0"
                  style={{ paddingLeft: `${(parseInt(h.level[1]) - 1) * 12}px` }}
                >
                  <span className="px-1.5 py-0.5 rounded bg-[#111111] text-[#ffffff] font-bold text-[10px] shrink-0">
                    {h.level}
                  </span>
                  <span className="font-bold text-[#111111] truncate">{h.text}</span>
                </div>
              ))
            ) : (
              <span className="text-xs text-[#777777] italic">No headings found. Add &lt;h1&gt;, &lt;h2&gt; tags.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 11. Reading Time Calculator
// -------------------------------------------------------------
export function ReadingTimeCalculatorTool() {
  const [content, setContent] = useState("Search engine algorithms evaluate user engagement metrics to determine whether visitors find your articles satisfying. Displaying estimated reading time upfront helps set transparent expectations for your readers. Studies indicate that posts displaying estimated read times experience up to 14% lower bounce rates because readers can quickly judge whether they have sufficient time to finish the piece.");
  const [wpm, setWpm] = useState(200);

  const stats = useMemo(() => {
    const words = content.trim() ? content.trim().split(/\s+/).length : 0;
    const chars = content.length;
    const readingMinutes = words > 0 ? Math.ceil(words / wpm) : 0;
    const speakingMinutes = words > 0 ? Math.ceil(words / 130) : 0;
    return { words, chars, readingMinutes, speakingMinutes };
  }, [content, wpm]);

  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-4 sm:p-6 lg:p-8 shadow-[4px_4px_0px_#111111] space-y-6 w-full max-w-full overflow-hidden">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 min-w-0">
        <div className="p-3 sm:p-4 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-center min-w-0">
          <span className="text-[10px] font-bold uppercase text-[#777777] block truncate">Silent Reading</span>
          <div className="text-xl sm:text-2xl font-black text-[#d9541e] mt-1">{stats.readingMinutes} min</div>
        </div>
        <div className="p-3 sm:p-4 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-center min-w-0">
          <span className="text-[10px] font-bold uppercase text-[#777777] block truncate">Speaking Time</span>
          <div className="text-xl sm:text-2xl font-black text-[#111111] mt-1">{stats.speakingMinutes} min</div>
        </div>
        <div className="p-3 sm:p-4 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-center min-w-0">
          <span className="text-[10px] font-bold uppercase text-[#777777] block truncate">Word Count</span>
          <div className="text-xl sm:text-2xl font-black text-[#111111] mt-1">{stats.words}</div>
        </div>
        <div className="p-3 sm:p-4 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-center min-w-0">
          <span className="text-[10px] font-bold uppercase text-[#777777] block truncate">Characters</span>
          <div className="text-xl sm:text-2xl font-black text-[#111111] mt-1">{stats.chars}</div>
        </div>
      </div>

      <div className="min-w-0">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-1.5">
          Paste Text to Calculate Read Time
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          className="w-full p-3 sm:p-4 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-medium focus:outline-none"
        />
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 12. Sitemap XML Generator
// -------------------------------------------------------------
export function SitemapGeneratorTool() {
  const [urlsInput, setUrlsInput] = useState("https://mytoolpocket.com/\nhttps://mytoolpocket.com/tools/\nhttps://mytoolpocket.com/blog/\nhttps://mytoolpocket.com/about/");
  const [changefreq, setChangefreq] = useState("weekly");
  const [priority, setPriority] = useState("0.8");

  const sitemapXml = useMemo(() => {
    const urls = urlsInput.split("\n").map((u) => u.trim()).filter(Boolean);
    const date = "2026-11-13T00:00:00.000Z";
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    urls.forEach((u) => {
      xml += `  <url>\n    <loc>${u}</loc>\n    <lastmod>${date}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;
    });
    xml += `</urlset>`;
    return xml;
  }, [urlsInput, changefreq, priority]);

  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-4 sm:p-6 lg:p-8 shadow-[4px_4px_0px_#111111] space-y-6 w-full max-w-full overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-0">
        <div className="space-y-4 min-w-0">
          <div>
            <label className="block text-xs font-bold text-[#111111] mb-1">
              Website URLs (one per line)
            </label>
            <textarea
              value={urlsInput}
              onChange={(e) => setUrlsInput(e.target.value)}
              rows={8}
              className="w-full p-3 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 min-w-0">
            <div>
              <label className="block text-xs font-bold text-[#111111] mb-1">Change Frequency</label>
              <select
                value={changefreq}
                onChange={(e) => setChangefreq(e.target.value)}
                className="w-full p-2 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-bold"
              >
                <option value="daily">daily</option>
                <option value="weekly">weekly</option>
                <option value="monthly">monthly</option>
                <option value="yearly">yearly</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#111111] mb-1">Default Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-2 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-bold"
              >
                <option value="1.0">1.0 (Highest)</option>
                <option value="0.8">0.8 (Standard)</option>
                <option value="0.5">0.5 (Normal)</option>
                <option value="0.3">0.3 (Low)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-3 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#666666]">
              Generated sitemap.xml
            </span>
            <SeoCopyButton text={sitemapXml} label="Copy sitemap.xml" />
          </div>
          <div className="w-full min-w-0 overflow-hidden rounded-xl border-2 border-[#111111] bg-[#fdfbf7] shadow-[2px_2px_0px_#111111]">
            <pre className="p-4 text-xs font-mono text-[#111111] min-h-[260px] overflow-x-auto whitespace-pre leading-relaxed">
              {sitemapXml}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

