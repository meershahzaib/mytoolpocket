"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Wrench,
  Search,
  Menu,
  X,
  ChevronDown
} from "lucide-react";
import { CATEGORIES } from "@/data/categories";

function DesktopNav() {
  const pathname = usePathname();
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="hidden md:flex items-center gap-1 lg:gap-2">
      <Link
        href="/"
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
        className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
          isActive("/tools")
            ? "bg-[#111111] text-[#f3eee3]"
            : "text-[#111111] hover:bg-[#e6dfd2]"
        }`}
      >
        All Tools
      </Link>

      {/* Categories Dropdown */}
      <div className="relative">
        <button
          onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
          onBlur={() => setTimeout(() => setCategoryDropdownOpen(false), 200)}
          className="px-3 py-2 rounded-md text-sm font-semibold text-[#111111] hover:bg-[#e6dfd2] flex items-center gap-1"
          aria-expanded={categoryDropdownOpen}
        >
          Categories
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${categoryDropdownOpen ? "rotate-180" : ""}`} />
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

  return (
    <header className="sticky top-0 z-50 bg-[#f3eee3]/95 backdrop-blur-md border-b-2 border-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
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

          {/* Desktop Navigation wrapped in Suspense for Next.js PPR */}
          <Suspense fallback={<div className="hidden md:flex w-96 h-9" />}>
            <DesktopNav />
          </Suspense>

          {/* Right Button (Burnt Orange on button only) */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/tools"
              className="px-4 py-2 text-sm font-bold bg-[#d9541e] text-[#ffffff] rounded-lg border border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#bf4514] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Explore Tools</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border-2 border-[#111111] bg-[#ffffff] text-[#111111] shadow-[2px_2px_0px_#111111]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-[#111111] bg-[#f3eee3] px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md font-semibold text-sm hover:bg-[#e6dfd2]"
            >
              Home
            </Link>
            <Link
              href="/tools"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md font-semibold text-sm hover:bg-[#e6dfd2]"
            >
              All Tools
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md font-semibold text-sm hover:bg-[#e6dfd2]"
            >
              Blog
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md font-semibold text-sm hover:bg-[#e6dfd2]"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md font-semibold text-sm hover:bg-[#e6dfd2]"
            >
              Contact
            </Link>
          </div>

          <div className="pt-2 border-t border-[#d4ccbd]">
            <p className="text-xs font-bold uppercase tracking-wider text-[#666666] mb-2">
              Categories
            </p>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-2 py-1.5 rounded bg-[#ffffff] border border-[#111111] border-l-3 border-l-[#d9541e] font-medium truncate"
                >
                  {cat.shortName} Tools
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/tools"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 font-bold text-center text-sm bg-[#d9541e] text-[#ffffff] rounded-lg border border-[#111111] shadow-[2px_2px_0px_#111111] flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Browse All Tools</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
