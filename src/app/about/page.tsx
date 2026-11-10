import React from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Wrench, Shield, Zap, Sparkles, Heart, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - mytoolpocket.com",
  description: "Learn about the mission, values, and story behind mytoolpocket.com.",
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <Breadcrumbs items={[{ label: "About" }]} />

      {/* Hero Header */}
      <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-6 sm:p-10 shadow-[4px_4px_0px_#111111]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-[#111111] text-[#f3eee3] flex items-center justify-center">
            <Wrench className="w-5 h-5 text-[#f3eee3]" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#d9541e]">
            Our Mission
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#111111] tracking-tight">
          Tools That Belong In Your Pocket
        </h1>
        <p className="text-sm sm:text-base text-[#555555] mt-3 leading-relaxed">
          mytoolpocket.com was created with a straightforward goal: provide clean, lightning-fast utilities without clutter, subscriptions, or intrusive tracking.
        </p>
      </div>

      {/* Core Principles */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-[#111111]">Our Guiding Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-6 shadow-[3px_3px_0px_#111111]">
            <div className="w-10 h-10 rounded-lg bg-[#f3eee3] border border-[#111111] flex items-center justify-center mb-4">
              <Shield className="w-5 h-5 text-[#111111]" />
            </div>
            <h3 className="text-base font-bold text-[#111111] mb-2">Browser First Privacy</h3>
            <p className="text-xs text-[#555555] leading-relaxed">
              We reject server-side scraping of your private text, passwords, and JSON. What you paste into your pocket stays strictly inside your browser instance.
            </p>
          </div>

          <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-6 shadow-[3px_3px_0px_#111111]">
            <div className="w-10 h-10 rounded-lg bg-[#f3eee3] border border-[#111111] flex items-center justify-center mb-4">
              <Zap className="w-5 h-5 text-[#111111]" />
            </div>
            <h3 className="text-base font-bold text-[#111111] mb-2">Zero Delay & Friction</h3>
            <p className="text-xs text-[#555555] leading-relaxed">
              No account creation, email verification gates, or waiting queues. You arrive, get the result you came for in two seconds, and get back to your work.
            </p>
          </div>

          <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-6 shadow-[3px_3px_0px_#111111]">
            <div className="w-10 h-10 rounded-lg bg-[#f3eee3] border border-[#111111] flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5 text-[#111111]" />
            </div>
            <h3 className="text-base font-bold text-[#111111] mb-2">Thoughtful Craftsmanship</h3>
            <p className="text-xs text-[#555555] leading-relaxed">
              Every detail from typography and responsive layouts to high-contrast borders is designed to be legible, intuitive, and enjoyable to look at.
            </p>
          </div>
        </div>
      </div>

      {/* Story section */}
      <div className="bg-[#ffffff] border-2 border-[#111111] rounded-2xl p-8 shadow-[3px_3px_0px_#111111] space-y-4">
        <h2 className="text-xl font-bold text-[#111111]">Why The Name &quot;mytoolpocket&quot;?</h2>
        <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
          Think of a carpenter who carries a trusty utility pouch or a pocket knife. When you need to strip quotes, check reading duration, format a database JSON response, or check a calculation, you should not need to search through suspicious ad-filled domains or download 100MB applications.
        </p>
        <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
          mytoolpocket.com is your digital Swiss army knife, packed into a bookmark and ready whenever creativity or business requires.
        </p>
      </div>

      {/* Action Banner */}
      <div className="bg-[#111111] text-[#f3eee3] rounded-2xl p-8 text-center space-y-4 border-2 border-[#111111]">
        <h3 className="text-xl font-bold text-[#f3eee3]">Want to explore the tool directory?</h3>
        <p className="text-xs text-[#cccccc] max-w-md mx-auto">
          Take a look through our 12 toolkits covering text, developer tasks, calculators, and media.
        </p>
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold bg-[#d9541e] text-[#ffffff] rounded-lg border border-[#ffffff] shadow-[2px_2px_0px_#ffffff] hover:bg-[#bf4514] active:translate-x-0.5 active:translate-y-0.5 transition-all"
        >
          <span>Browse All Tools</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

