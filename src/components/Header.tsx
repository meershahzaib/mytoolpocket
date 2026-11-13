"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Shield,
  Layers,
  Sparkles,
  Zap,
  ArrowUpRight
} from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { TOOLS, ToolItem } from "@/data/tools";
import LogoIcon from "@/components/LogoIcon";
import { DynamicIcon } from "@/components/DynamicIcon";
import ThemeToggle from "@/components/ThemeToggle";

function DesktopMegaMenu() {
  const pathname = usePathname();
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [activeCategorySlug, setActiveCategorySlug] = useState<string>(CATEGORIES[0]?.slug || "text-tools");
  const menuRef = useRef<HTMLDivElement>(null);

  // Close mega menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMegaMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mega menu on route change
  useEffect(() => {
    setMegaMenuOpen(false);
  }, [pathname]);

  const activeCategory = useMemo(() => CATEGORIES.find((c) => c.slug === activeCategorySlug) || CATEGORIES[0], [activeCategorySlug]);
  const activeCategoryTools: ToolItem[] = useMemo(() => TOOLS.filter((t) => t.category === activeCategorySlug), [activeCategorySlug]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setMegaMenuOpen(!megaMenuOpen)}
        onMouseEnter={() => setMegaMenuOpen(true)}
        className={`px-3 py-2 rounded-md text-sm font-bold flex items-center gap-1.5 cursor-pointer transition-colors duration-150 ${
          megaMenuOpen
            ? "bg-[#111111] text-[#f3eee3] dark:bg-[#d9541e] dark:text-[#ffffff] shadow-[2px_2px_0px_#d9541e]"
            : "text-[#111111] dark:text-[#e4e4eb] hover:bg-[#e6dfd2] dark:hover:bg-[#22222d]"
        }`}
        aria-expanded={megaMenuOpen}
        aria-haspopup="true"
      >
        <span>Toolkits</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            megaMenuOpen ? "rotate-180 text-[#d9541e]" : "text-[#777777] dark:text-[#9e9eaf]"
          }`}
        />
      </button>

      {/* Modern High-End Neo-Brutalist Mega Menu Dropdown */}
      {megaMenuOpen && (
        <div
          onMouseLeave={() => setMegaMenuOpen(false)}
          className="absolute left-1/2 -translate-x-1/2 mt-3 w-[920px] max-w-[95vw] bg-[#ffffff] dark:bg-[#17171e] border-2 border-[#111111] dark:border-[#383848] rounded-2xl shadow-[6px_6px_0px_#111111] dark:shadow-[6px_6px_0px_#000000] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150 transform-gpu"
        >
          {/* Top Mega Menu Header Bar */}
          <div className="px-6 py-3.5 bg-[#f3eee3] dark:bg-[#121217] border-b-2 border-[#111111] dark:border-[#383848] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#d9541e]" />
              <span className="text-xs font-black uppercase tracking-wider text-[#111111] dark:text-[#f4f4f7]">
                Directory of 12 Toolkits ({TOOLS.length}+ Utilities)
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="text-[#666666] dark:text-[#a0a0b2] hidden sm:inline">100% Free & Browser-First</span>
              <Link
                href="/tools"
                onClick={() => setMegaMenuOpen(false)}
                className="text-[#d9541e] hover:underline flex items-center gap-1"
              >
                <span>View Full Index</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Mega Menu Body: 2-Panel Architecture */}
          <div className="grid grid-cols-12 min-h-[380px]">
            {/* Left Panel: 12 Category Tabs (5 Cols) */}
            <div className="col-span-5 bg-[#faf8f5] dark:bg-[#131317] border-r-2 border-[#111111] dark:border-[#383848] p-3 max-h-[460px] overflow-y-auto space-y-1">
              {CATEGORIES.map((cat) => {
                const isSelected = cat.slug === activeCategorySlug;
                return (
                  <div
                    key={cat.id}
                    onMouseEnter={() => {
                      if (activeCategorySlug !== cat.slug) {
                        setActiveCategorySlug(cat.slug);
                      }
                    }}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-[transform,background-color,border-color] duration-150 border ${
                      isSelected
                        ? "bg-[#111111] text-[#f3eee3] dark:bg-[#252532] dark:text-[#ffffff] border-[#111111] dark:border-[#d9541e] shadow-[3px_3px_0px_#d9541e] translate-x-1"
                        : "bg-[#ffffff] text-[#111111] dark:bg-[#1a1a22] dark:text-[#f4f4f7] border-[#e6dfd2] dark:border-[#2d2d3a] hover:border-[#111111] dark:hover:border-[#4d4d5e] hover:bg-[#ffffff] dark:hover:bg-[#22222c]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${
                          isSelected
                            ? "bg-[#ffffff] text-[#111111] dark:bg-[#d9541e] dark:text-[#ffffff] border-[#ffffff] dark:border-[#d9541e]"
                            : "bg-[#f3eee3] text-[#111111] dark:bg-[#262632] dark:text-[#f3eee3] border-[#111111] dark:border-[#383848]"
                        }`}
                      >
                        <DynamicIcon name={cat.iconName} className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold truncate">{cat.name}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {cat.badge && (
                        <span
                          className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                            isSelected
                              ? "bg-[#d9541e] text-[#ffffff]"
                              : "bg-[#f3eee3] text-[#111111] dark:bg-[#282834] dark:text-[#f3eee3] border border-[#111111] dark:border-[#383848]"
                          }`}
                        >
                          {cat.badge}
                        </span>
                      )}
                      <ArrowRight
                        className={`w-3.5 h-3.5 transition-transform ${
                          isSelected
                            ? "text-[#d9541e] translate-x-0.5 opacity-100"
                            : "text-[#aaaaaa] dark:text-[#666677] opacity-0"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Panel: Active Category Tools Showcase (7 Cols) */}
            <div className="col-span-7 p-6 bg-[#ffffff] dark:bg-[#17171e] flex flex-col justify-between">
              <div>
                {/* Active Category Header Card */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b-2 border-[#111111] dark:border-[#383848]">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-black text-[#111111] dark:text-[#ffffff] tracking-tight">
                        {activeCategory.name}
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#f3eee3] dark:bg-[#242430] border border-[#111111] dark:border-[#383848] text-[#111111] dark:text-[#f3eee3]">
                        {activeCategoryTools.length} tools
                      </span>
                    </div>
                    <p className="text-xs text-[#666666] dark:text-[#a0a0b2] mt-1 leading-relaxed max-w-md">
                      {activeCategory.description}
                    </p>
                  </div>

                  <Link
                    href={`/${activeCategory.slug}`}
                    onClick={() => setMegaMenuOpen(false)}
                    className="px-3 py-1.5 text-xs font-bold bg-[#d9541e] text-[#ffffff] rounded-lg border border-[#111111] dark:border-[#383848] shadow-[2px_2px_0px_#111111] dark:shadow-[2px_2px_0px_#000000] hover:bg-[#bf4514] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1 shrink-0"
                  >
                    <span>View Hub</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* Individual Tools Grid */}
                <div className="mt-4">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#888888] dark:text-[#88889a] block mb-2.5">
                    Popular Utilities in this Toolkit
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {activeCategoryTools.slice(0, 8).map((tool) => (
                      <Link
                        key={tool.id}
                        href={`/${tool.category}/${tool.slug}`}
                        onClick={() => setMegaMenuOpen(false)}
                        className="p-2.5 rounded-xl border border-[#e6dfd2] dark:border-[#2f2f3c] hover:border-[#111111] dark:hover:border-[#4f4f60] hover:bg-[#fdfbf7] dark:hover:bg-[#20202a] hover:shadow-[2px_2px_0px_#111111] dark:hover:shadow-[2px_2px_0px_#000000] group transition-[box-shadow,border-color,background-color] duration-150 block"
                      >
                        <div className="text-xs font-bold text-[#111111] dark:text-[#f4f4f7] group-hover:text-[#d9541e] transition-colors flex items-center justify-between">
                          <span className="truncate pr-1">{tool.name}</span>
                          <ArrowUpRight className="w-3 h-3 text-[#aaaaaa] dark:text-[#777788] group-hover:text-[#d9541e] shrink-0" />
                        </div>
                        <p className="text-[11px] text-[#777777] dark:text-[#a0a0b2] line-clamp-1 mt-0.5">
                          {tool.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Quick Hub Bar */}
              <div className="mt-6 pt-3 border-t border-[#f3eee3] dark:border-[#2a2a36] flex items-center justify-between text-xs text-[#777777] dark:text-[#a0a0b2]">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#d9541e]" />
                  <span>Runs 100% locally in browser</span>
                </div>
                <Link
                  href="/sitemap"
                  onClick={() => setMegaMenuOpen(false)}
                  className="font-bold text-[#111111] dark:text-[#f3eee3] hover:text-[#d9541e] hover:underline"
                >
                  Browse Visual Sitemap &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DesktopNav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Desktop Navigation">
      <Link
        href="/"
        prefetch={true}
        className={`px-3 py-2 rounded-md text-sm font-bold transition-colors ${
          isActive("/") && pathname === "/"
            ? "bg-[#111111] text-[#f3eee3] dark:bg-[#d9541e] dark:text-[#ffffff]"
            : "text-[#111111] dark:text-[#e4e4eb] hover:bg-[#e6dfd2] dark:hover:bg-[#22222d]"
        }`}
      >
        Home
      </Link>

      <Link
        href="/tools"
        prefetch={true}
        className={`px-3 py-2 rounded-md text-sm font-bold transition-colors ${
          isActive("/tools")
            ? "bg-[#111111] text-[#f3eee3] dark:bg-[#d9541e] dark:text-[#ffffff]"
            : "text-[#111111] dark:text-[#e4e4eb] hover:bg-[#e6dfd2] dark:hover:bg-[#22222d]"
        }`}
      >
        All Tools
      </Link>

      {/* Desktop Mega Menu */}
      <DesktopMegaMenu />

      <Link
        href="/blog"
        prefetch={true}
        className={`px-3 py-2 rounded-md text-sm font-bold transition-colors ${
          isActive("/blog")
            ? "bg-[#111111] text-[#f3eee3] dark:bg-[#d9541e] dark:text-[#ffffff]"
            : "text-[#111111] dark:text-[#e4e4eb] hover:bg-[#e6dfd2] dark:hover:bg-[#22222d]"
        }`}
      >
        Blog
      </Link>

      <Link
        href="/about"
        prefetch={true}
        className={`px-3 py-2 rounded-md text-sm font-bold transition-colors ${
          isActive("/about")
            ? "bg-[#111111] text-[#f3eee3] dark:bg-[#d9541e] dark:text-[#ffffff]"
            : "text-[#111111] dark:text-[#e4e4eb] hover:bg-[#e6dfd2] dark:hover:bg-[#22222d]"
        }`}
      >
        About
      </Link>

      <Link
        href="/contact"
        prefetch={true}
        className={`px-3 py-2 rounded-md text-sm font-bold transition-colors ${
          isActive("/contact")
            ? "bg-[#111111] text-[#f3eee3] dark:bg-[#d9541e] dark:text-[#ffffff]"
            : "text-[#111111] dark:text-[#e4e4eb] hover:bg-[#e6dfd2] dark:hover:bg-[#22222d]"
        }`}
      >
        Contact
      </Link>
    </nav>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile off-canvas drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll and listen for Escape key when off-canvas drawer is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setMobileMenuOpen(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#f3eee3] dark:bg-[#111115] border-b-2 border-[#111111] dark:border-[#383848] transform-gpu will-change-transform transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Brand Logo */}
            <Link href="/" prefetch={true} className="flex items-center gap-3 group">
              <LogoIcon size={42} />
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-[#111111] dark:text-[#f4f4f7]">
                  mytoolpocket<span className="text-[#d9541e]">.com</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#555555] dark:text-[#9090a2]">
                  Pocket Utility Kit
                </span>
              </div>
            </Link>

            {/* Desktop Navigation with Mega Menu */}
            <DesktopNav />

            {/* Right Buttons: Theme Switcher & Explore Tools (Desktop) */}
            <div className="hidden md:flex items-center gap-2.5">
              <ThemeToggle variant="desktop" />
              <Link
                href="/tools"
                prefetch={true}
                className="px-4 py-2 text-sm font-bold bg-[#d9541e] text-[#ffffff] rounded-lg border border-[#111111] dark:border-[#383848] shadow-[2px_2px_0px_#111111] dark:shadow-[2px_2px_0px_#000000] hover:bg-[#bf4514] active:translate-x-0.5 active:translate-y-0.5 transition-[transform,background-color] duration-100 flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Explore Tools</span>
              </Link>
            </div>

            {/* Mobile Header Bar: Theme Toggle & Menu Trigger */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle variant="mobile-bar" />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 rounded-lg border-2 border-[#111111] dark:border-[#383848] bg-[#ffffff] dark:bg-[#1f1f28] text-[#111111] dark:text-[#f3eee3] shadow-[2px_2px_0px_#111111] dark:shadow-[2px_2px_0px_#000000] hover:bg-[#f3eee3] dark:hover:bg-[#282834] active:translate-x-0.5 active:translate-y-0.5 transition-[transform,background-color] duration-100 cursor-pointer"
                aria-label="Open mobile navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* MODERN OFF-CANVAS RESPONSIVE MOBILE MENU (LEFT TO RIGHT) */}
      {/* ========================================================= */}

      {/* 1. Backdrop Overlay with smooth fade */}
      <div
        className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-200 md:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* 2. Off-canvas Drawer sliding from Left to Right */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        className={`fixed inset-y-0 left-0 z-50 w-[88vw] max-w-sm sm:max-w-md bg-[#f3eee3] dark:bg-[#111115] border-r-2 border-[#111111] dark:border-[#383848] shadow-[8px_0px_24px_rgba(0,0,0,0.5)] flex flex-col justify-between overflow-y-auto transform-gpu will-change-transform transition-transform duration-250 ease-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b-2 border-[#111111] dark:border-[#383848] bg-[#ffffff] dark:bg-[#17171e] flex items-center justify-between sticky top-0 z-10">
          <Link
            href="/"
            prefetch={true}
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5"
          >
            <LogoIcon size={34} />
            <span className="text-lg font-bold tracking-tight text-[#111111] dark:text-[#f4f4f7]">
              mytoolpocket<span className="text-[#d9541e]">.com</span>
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-lg border border-[#111111] dark:border-[#383848] bg-[#f3eee3] dark:bg-[#242430] text-[#111111] dark:text-[#f3eee3] hover:bg-[#e6dfd2] dark:hover:bg-[#2c2c38] transition-colors cursor-pointer"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body: Theme Selector, Nav Links & Categories */}
        <div className="p-4 sm:p-5 space-y-5 flex-1">
          {/* Universal Theme Appearance Switcher */}
          <div className="pb-3 border-b border-[#d4ccbd] dark:border-[#2a2a36]">
            <ThemeToggle variant="mobile-drawer" />
          </div>

          {/* Primary Nav Links */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#777777] dark:text-[#88889a] block mb-2 px-1">
              Main Menu
            </span>
            <Link
              href="/"
              prefetch={true}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-bold border transition-colors duration-150 ${
                isActive("/") && pathname === "/"
                  ? "bg-[#111111] text-[#f3eee3] dark:bg-[#d9541e] dark:text-[#ffffff] border-[#111111] dark:border-[#d9541e]"
                  : "bg-[#ffffff] text-[#111111] dark:bg-[#1b1b24] dark:text-[#f3eee3] border-[#111111] dark:border-[#333342] hover:bg-[#e6dfd2] dark:hover:bg-[#242432]"
              }`}
            >
              <span>Home</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </Link>

            <Link
              href="/tools"
              prefetch={true}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-bold border transition-colors duration-150 ${
                isActive("/tools")
                  ? "bg-[#111111] text-[#f3eee3] dark:bg-[#d9541e] dark:text-[#ffffff] border-[#111111] dark:border-[#d9541e]"
                  : "bg-[#ffffff] text-[#111111] dark:bg-[#1b1b24] dark:text-[#f3eee3] border-[#111111] dark:border-[#333342] hover:bg-[#e6dfd2] dark:hover:bg-[#242432]"
              }`}
            >
              <span>All Tools Directory</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </Link>

            <Link
              href="/blog"
              prefetch={true}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-bold border transition-colors duration-150 ${
                isActive("/blog")
                  ? "bg-[#111111] text-[#f3eee3] dark:bg-[#d9541e] dark:text-[#ffffff] border-[#111111] dark:border-[#d9541e]"
                  : "bg-[#ffffff] text-[#111111] dark:bg-[#1b1b24] dark:text-[#f3eee3] border-[#111111] dark:border-[#333342] hover:bg-[#e6dfd2] dark:hover:bg-[#242432]"
              }`}
            >
              <span>Tech Blog & Guides</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </Link>

            <Link
              href="/about"
              prefetch={true}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-bold border transition-colors duration-150 ${
                isActive("/about")
                  ? "bg-[#111111] text-[#f3eee3] dark:bg-[#d9541e] dark:text-[#ffffff] border-[#111111] dark:border-[#d9541e]"
                  : "bg-[#ffffff] text-[#111111] dark:bg-[#1b1b24] dark:text-[#f3eee3] border-[#111111] dark:border-[#333342] hover:bg-[#e6dfd2] dark:hover:bg-[#242432]"
              }`}
            >
              <span>About Us</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </Link>

            <Link
              href="/contact"
              prefetch={true}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-bold border transition-colors duration-150 ${
                isActive("/contact")
                  ? "bg-[#111111] text-[#f3eee3] dark:bg-[#d9541e] dark:text-[#ffffff] border-[#111111] dark:border-[#d9541e]"
                  : "bg-[#ffffff] text-[#111111] dark:bg-[#1b1b24] dark:text-[#f3eee3] border-[#111111] dark:border-[#333342] hover:bg-[#e6dfd2] dark:hover:bg-[#242432]"
              }`}
            >
              <span>Contact & Support</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </Link>
          </div>

          {/* 12 Categories Grid */}
          <div className="pt-4 border-t border-[#d4ccbd] dark:border-[#2a2a36]">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#777777] dark:text-[#88889a]">
                Tool Categories (12)
              </span>
              <span className="text-[10px] text-[#d9541e] font-bold">Free Utilities</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/${cat.slug}`}
                  prefetch={true}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-2.5 py-2 rounded-lg bg-[#ffffff] dark:bg-[#1b1b24] border border-[#111111] dark:border-[#333342] border-l-4 border-l-[#d9541e] font-semibold text-[#111111] dark:text-[#f3eee3] hover:bg-[#f3eee3] dark:hover:bg-[#242432] transition-colors truncate block"
                >
                  {cat.shortName} Tools
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Drawer Footer CTA */}
        <div className="p-4 sm:p-5 border-t-2 border-[#111111] dark:border-[#383848] bg-[#ffffff] dark:bg-[#17171e] space-y-3">
          <Link
            href="/tools"
            prefetch={true}
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-3 px-4 text-xs font-bold bg-[#d9541e] text-[#ffffff] rounded-lg border border-[#111111] dark:border-[#383848] shadow-[2px_2px_0px_#111111] dark:shadow-[2px_2px_0px_#000000] hover:bg-[#bf4514] active:translate-x-0.5 active:translate-y-0.5 transition-[transform,background-color] duration-100 flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Search All {TOOLS.length}+ Tools</span>
          </Link>

          <div className="flex items-center justify-between text-[11px] text-[#777777] dark:text-[#88889a] pt-1">
            <Link
              href="/privacy-policy"
              prefetch={true}
              onClick={() => setMobileMenuOpen(false)}
              className="hover:underline"
            >
              Privacy Policy
            </Link>
            <span>&bull;</span>
            <Link
              href="/terms"
              prefetch={true}
              onClick={() => setMobileMenuOpen(false)}
              className="hover:underline"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
