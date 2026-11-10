import React from "react";
import Link from "next/link";
import { Wrench, Shield } from "lucide-react";
import { CATEGORIES } from "@/data/categories";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="border-t-2 border-[#111111] bg-[#111111] text-[#f3eee3] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group inline-block">
              <div className="w-9 h-9 rounded-lg bg-[#f3eee3] text-[#111111] flex items-center justify-center border border-[#ffffff]">
                <Wrench className="w-5 h-5 text-[#111111]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#f3eee3]">
                mytoolpocket<span className="text-[#d9541e]">.com</span>
              </span>
            </Link>
            <p className="text-sm text-[#cccccc] leading-relaxed max-w-sm">
              Your free, browser-first toolkit for daily productivity. Everything runs safely and swiftly without installations, hidden paywalls, or privacy tracking.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#aaaaaa]">
              <Shield className="w-4 h-4 text-[#d9541e]" />
              <span>100% Privacy Focused &bull; No Data Kept</span>
            </div>
          </div>

          {/* Categories 1 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d9541e]">
              Core Toolkits
            </h4>
            <ul className="space-y-2 text-sm">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/${cat.slug}`}
                    className="text-[#cccccc] hover:text-[#f3eee3] hover:underline transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d9541e]">
              More Toolkits
            </h4>
            <ul className="space-y-2 text-sm">
              {CATEGORIES.slice(6, 12).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/${cat.slug}`}
                    className="text-[#cccccc] hover:text-[#f3eee3] hover:underline transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d9541e]">
              Company & Legal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/tools"
                  className="text-[#cccccc] hover:text-[#f3eee3] hover:underline transition-colors"
                >
                  All Tools Directory
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-[#cccccc] hover:text-[#f3eee3] hover:underline transition-colors"
                >
                  Tech Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[#cccccc] hover:text-[#f3eee3] hover:underline transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[#cccccc] hover:text-[#f3eee3] hover:underline transition-colors"
                >
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-[#cccccc] hover:text-[#f3eee3] hover:underline transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-[#cccccc] hover:text-[#f3eee3] hover:underline transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[#333333] flex flex-col sm:flex-row items-center justify-between text-xs text-[#888888] gap-4">
          <p>
            &copy; {currentYear} mytoolpocket.com. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <span>Crafted for creators, engineers, and marketers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

