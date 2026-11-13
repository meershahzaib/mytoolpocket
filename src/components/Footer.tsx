import React from "react";
import Link from "next/link";
import { ChevronRight, ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import LogoIcon from "@/components/LogoIcon";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="mt-16 sm:mt-20 relative footer-visibility">
      {/* 3D Slanted Divider Accent Bar */}
      <div className="relative h-4 bg-[#d9541e] border-t-2 border-b-2 border-[#111111]">
        <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,#000000,#000000_10px,transparent_10px,transparent_20px)]" />
      </div>

      {/* Main Footer Container with Neo-Brutalist 3D Shadow Depth */}
      <div className="bg-[#111111] text-[#f3eee3] border-b-4 border-[#000000]">
        {/* Core Link Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
            {/* Brand Column (4 Cols) */}
            <div className="lg:col-span-4 space-y-5">
              <Link href="/" className="flex items-center gap-3 group inline-block">
                <LogoIcon size={44} className="border-2 border-[#ffffff] shadow-[3px_3px_0px_#d9541e]" />
                <div className="flex flex-col">
                  <span className="text-2xl font-black tracking-tight text-[#f3eee3]">
                    mytoolpocket<span className="text-[#d9541e]">.com</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#888888]">
                    Every Tool In Your Pocket
                  </span>
                </div>
              </Link>

              <p className="text-xs sm:text-sm text-[#b0a89d] leading-relaxed max-w-sm">
                A clean, ultra-fast browser utility pocket crafted for developers, content creators, marketers, and students. Everything processes locally on your machine with total privacy.
              </p>

              {/* Status Indicator */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#333333] shadow-[2px_2px_0px_#000000]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] font-mono text-[#cccccc]">
                  All 12 Toolkits Operational
                </span>
              </div>
            </div>

            {/* Quick Links 1: Core Categories (3 Cols) */}
            <div className="lg:col-span-3 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-sm bg-[#d9541e]" />
                <h4 className="text-xs font-black uppercase tracking-wider text-[#f3eee3]">
                  Popular Toolkits
                </h4>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm">
                {CATEGORIES.slice(0, 6).map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/${cat.slug}`}
                      className="text-[#999999] hover:text-[#f3eee3] hover:translate-x-1 inline-flex items-center gap-1.5 transition-[transform,color] duration-150 ease-out group"
                    >
                      <ChevronRight className="w-3 h-3 text-[#555555] group-hover:text-[#d9541e] transition-colors" />
                      <span>{cat.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links 2: More Categories (2 Cols) */}
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-sm bg-[#d9541e]" />
                <h4 className="text-xs font-black uppercase tracking-wider text-[#f3eee3]">
                  More Categories
                </h4>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm">
                {CATEGORIES.slice(6, 12).map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/${cat.slug}`}
                      className="text-[#999999] hover:text-[#f3eee3] hover:translate-x-1 inline-flex items-center gap-1.5 transition-[transform,color] duration-150 ease-out group"
                    >
                      <ChevronRight className="w-3 h-3 text-[#555555] group-hover:text-[#d9541e] transition-colors" />
                      <span>{cat.shortName}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links 3: Platform & Sitemap (3 Cols) */}
            <div className="lg:col-span-3 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-sm bg-[#d9541e]" />
                <h4 className="text-xs font-black uppercase tracking-wider text-[#f3eee3]">
                  Navigation & Legal
                </h4>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link
                    href="/tools"
                    className="text-[#999999] hover:text-[#f3eee3] hover:translate-x-1 inline-flex items-center gap-1.5 transition-[transform,color] duration-150 ease-out group"
                  >
                    <ChevronRight className="w-3 h-3 text-[#555555] group-hover:text-[#d9541e] transition-colors" />
                    <span>All Tools Index</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-[#999999] hover:text-[#f3eee3] hover:translate-x-1 inline-flex items-center gap-1.5 transition-[transform,color] duration-150 ease-out group"
                  >
                    <ChevronRight className="w-3 h-3 text-[#555555] group-hover:text-[#d9541e] transition-colors" />
                    <span>Tech Guides & Blog</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-[#999999] hover:text-[#f3eee3] hover:translate-x-1 inline-flex items-center gap-1.5 transition-[transform,color] duration-150 ease-out group"
                  >
                    <ChevronRight className="w-3 h-3 text-[#555555] group-hover:text-[#d9541e] transition-colors" />
                    <span>About Us</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-[#999999] hover:text-[#f3eee3] hover:translate-x-1 inline-flex items-center gap-1.5 transition-[transform,color] duration-150 ease-out group"
                  >
                    <ChevronRight className="w-3 h-3 text-[#555555] group-hover:text-[#d9541e] transition-colors" />
                    <span>Contact & Feedback</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-[#999999] hover:text-[#f3eee3] hover:translate-x-1 inline-flex items-center gap-1.5 transition-[transform,color] duration-150 ease-out group"
                  >
                    <ChevronRight className="w-3 h-3 text-[#555555] group-hover:text-[#d9541e] transition-colors" />
                    <span>Privacy Policy</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-[#999999] hover:text-[#f3eee3] hover:translate-x-1 inline-flex items-center gap-1.5 transition-[transform,color] duration-150 ease-out group"
                  >
                    <ChevronRight className="w-3 h-3 text-[#555555] group-hover:text-[#d9541e] transition-colors" />
                    <span>Terms of Service</span>
                  </Link>
                </li>
                <li className="pt-2 border-t border-[#222222] flex items-center gap-3">
                  <Link
                    href="/sitemap"
                    className="text-xs font-bold text-[#d9541e] hover:underline inline-flex items-center gap-1"
                  >
                    <span>HTML Sitemap</span>
                  </Link>
                  <span className="text-[#444444]">&bull;</span>
                  <a
                    href="/sitemap.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#888888] hover:text-[#cccccc] inline-flex items-center gap-1"
                  >
                    <span>XML File</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar with 3D inset styling */}
          <div className="mt-14 pt-6 border-t border-[#222222] flex flex-col sm:flex-row items-center justify-between text-xs text-[#777777] gap-4">
            <p className="flex items-center gap-1">
              &copy; {currentYear}{" "}
              <span className="font-bold text-[#f3eee3]">mytoolpocket.com</span>. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-[#1e1e1e] border border-[#333333] text-[11px] text-[#aaaaaa]">
                Handcrafted for speed, utility & privacy
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
