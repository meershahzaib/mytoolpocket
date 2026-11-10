"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Wrench,
  Search,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Shield,
  Layers,
  Sparkles
} from "lucide-react";
import { CATEGORIES } from "@/data/categories";

function DesktopNav() {
  const pathname = usePathname();
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCategoryDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
          isActive("/") && pathname === "/"
            ? "bg-[#111111] text-[#f3eee3]"
            : "text-[#111111] hover:bg-[#e6dfd2]"
        }`}
      >
        Home
      </Link>

      <Link
        href="/tools"
        prefetch={true}
        className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
          isActive("/tools")
            ? "bg-[#111111] text-[#f3eee3]"
            : "text-[#111111] hover:bg-[#e6dfd2]"
        }`}
      >
        All Tools
      </Link>

      {/* Categories Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
          className="px-3 py-2 rounded-md text-sm font-semibold text-[#111111] hover:bg-[#e6dfd2] flex items-center gap-1 cursor-pointer"
          aria-expanded={categoryDropdownOpen}
          aria-haspopup="true"
        >
          Categories
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              categoryDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {categoryDropdownOpen && (
          <div className="absolute left-0 mt-2 w-80 bg-[#ffffff] border-2 border-[#111111] rounded-xl shadow-[4px_4px_0px_#111111] p-2 grid grid-cols-1 gap-1 z-50">
            <div className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#777777] border-b border-[#e6dfd2]">
              Explore 12 Tool Categories
            </div>
            <div className="max-h-96 overflow-y-auto pr-1">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.id}
                  href={`/${category.slug}`}
                  prefetch={true}
                  onClick={() => setCategoryDropdownOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-[#111111] hover:bg-[#f3eee3] transition-colors border-l-2 border-l-transparent hover:border-l-[#d9541e]"
                >
                  <span className="font-medium">{category.name}</span>
                  {category.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#f3eee3] text-[#111111] border border-[#111111] font-semibold">
                      {category.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Link
        href="/blog"
        prefetch={true}
        className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
          isActive("/blog")
            ? "bg-[#111111] text-[#f3eee3]"
            : "text-[#111111] hover:bg-[#e6dfd2]"
        }`}
      >
        Blog
      </Link>

      <Link
        href="/about"
        prefetch={true}
        className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
          isActive("/about")
            ? "bg-[#111111] text-[#f3eee3]"
            : "text-[#111111] hover:bg-[#e6dfd2]"
        }`}
      >
        About
      </Link>

      <Link
        href="/contact"
        prefetch={true}
        className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
          isActive("/contact")
            ? "bg-[#111111] text-[#f3eee3]"
            : "text-[#111111] hover:bg-[#e6dfd2]"
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
      <header className="sticky top-0 z-40 bg-[#f3eee3]/95 backdrop-blur-md border-b-2 border-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Brand Logo */}
            <Link href="/" prefetch={true} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-[#111111] text-[#f3eee3] flex items-center justify-center border border-[#111111] shadow-[2px_2px_0px_#d9541e] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform">
                <Wrench className="w-5 h-5 text-[#f3eee3]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-[#111111]">
                  mytoolpocket<span className="text-[#d9541e]">.com</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#555555]">
                  Pocket Utility Kit
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <DesktopNav />

            {/* Right Button (Burnt Orange on button only) */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/tools"
                prefetch={true}
                className="px-4 py-2 text-sm font-bold bg-[#d9541e] text-[#ffffff] rounded-lg border border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#bf4514] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Explore Tools</span>
              </Link>
            </div>

            {/* Mobile Menu Trigger Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 rounded-lg border-2 border-[#111111] bg-[#ffffff] text-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#f3eee3] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
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
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 md:hidden ${
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
        className={`fixed inset-y-0 left-0 z-50 w-[88vw] max-w-sm sm:max-w-md bg-[#f3eee3] border-r-2 border-[#111111] shadow-[8px_0px_24px_rgba(0,0,0,0.3)] flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b-2 border-[#111111] bg-[#ffffff] flex items-center justify-between sticky top-0 z-10">
          <Link
            href="/"
            prefetch={true}
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5"
          >
            <div className="w-8 h-8 rounded-lg bg-[#111111] text-[#f3eee3] flex items-center justify-center border border-[#111111] shadow-[1px_1px_0px_#d9541e]">
              <Wrench className="w-4 h-4 text-[#f3eee3]" />
            </div>
            <span className="text-lg font-bold tracking-tight text-[#111111]">
              mytoolpocket<span className="text-[#d9541e]">.com</span>
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-lg border border-[#111111] bg-[#f3eee3] text-[#111111] hover:bg-[#e6dfd2] transition-colors cursor-pointer"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body: Nav Links & Categories */}
        <div className="p-4 sm:p-5 space-y-6 flex-1">
          {/* Primary Nav Links */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#777777] block mb-2 px-2">
              Main Menu
            </span>
            <Link
              href="/"
              prefetch={true}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-bold border transition-all ${
                isActive("/") && pathname === "/"
                  ? "bg-[#111111] text-[#f3eee3] border-[#111111]"
                  : "bg-[#ffffff] text-[#111111] border-[#111111] hover:bg-[#e6dfd2]"
              }`}
            >
              <span>Home</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </Link>

            <Link
              href="/tools"
              prefetch={true}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-bold border transition-all ${
                isActive("/tools")
                  ? "bg-[#111111] text-[#f3eee3] border-[#111111]"
                  : "bg-[#ffffff] text-[#111111] border-[#111111] hover:bg-[#e6dfd2]"
              }`}
            >
              <span>All Tools Directory</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </Link>

            <Link
              href="/blog"
              prefetch={true}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-bold border transition-all ${
                isActive("/blog")
                  ? "bg-[#111111] text-[#f3eee3] border-[#111111]"
                  : "bg-[#ffffff] text-[#111111] border-[#111111] hover:bg-[#e6dfd2]"
              }`}
            >
              <span>Tech Blog & Guides</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </Link>

            <Link
              href="/about"
              prefetch={true}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-bold border transition-all ${
                isActive("/about")
                  ? "bg-[#111111] text-[#f3eee3] border-[#111111]"
                  : "bg-[#ffffff] text-[#111111] border-[#111111] hover:bg-[#e6dfd2]"
              }`}
            >
              <span>About Us</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </Link>

            <Link
              href="/contact"
              prefetch={true}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-bold border transition-all ${
                isActive("/contact")
                  ? "bg-[#111111] text-[#f3eee3] border-[#111111]"
                  : "bg-[#ffffff] text-[#111111] border-[#111111] hover:bg-[#e6dfd2]"
              }`}
            >
              <span>Contact & Support</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </Link>
          </div>

          {/* 12 Categories Grid */}
          <div className="pt-4 border-t border-[#d4ccbd]">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#777777]">
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
                  className="px-2.5 py-2 rounded-lg bg-[#ffffff] border border-[#111111] border-l-4 border-l-[#d9541e] font-semibold text-[#111111] hover:bg-[#f3eee3] transition-colors truncate block"
                >
                  {cat.shortName} Tools
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Drawer Footer CTA */}
        <div className="p-4 sm:p-5 border-t-2 border-[#111111] bg-[#ffffff] space-y-3">
          <Link
            href="/tools"
            prefetch={true}
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-3 px-4 text-xs font-bold bg-[#d9541e] text-[#ffffff] rounded-lg border border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#bf4514] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Search All 25+ Tools</span>
          </Link>

          <div className="flex items-center justify-between text-[11px] text-[#777777] pt-1">
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
