import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { FileText, CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - mytoolpocket.com",
  description: "Terms and conditions of use for mytoolpocket.com free online utilities.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Breadcrumbs items={[{ label: "Terms of Service" }]} />

      {/* Header */}
      <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-6 sm:p-10 shadow-[4px_4px_0px_#111111]">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-5 h-5 text-[#d9541e]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#d9541e]">
            Legal Agreements
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#111111] tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-[#777777] mt-2">
          Effective date: November 2026
        </p>
      </div>

      {/* Terms Body */}
      <div className="bg-[#ffffff] border-2 border-[#111111] rounded-2xl p-6 sm:p-10 shadow-[3px_3px_0px_#111111] space-y-8 text-xs sm:text-sm text-[#444444] leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-base font-bold text-[#111111]">1. Acceptance of Terms</h2>
          <p>
            By accessing or using mytoolpocket.com (&quot;the Service&quot;), you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service. If you do not agree with any of these terms, please discontinue using the website immediately.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-[#111111]">2. Use of Services & Free License</h2>
          <p>
            We grant you a personal, worldwide, royalty-free, non-exclusive license to use the utilities and tools provided on mytoolpocket.com for personal, educational, and commercial purposes. You agree not to misuse, systematically scrape, or deploy automated attacks against our infrastructure.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-[#111111]">3. Intellectual Property Rights</h2>
          <p>
            All original branding, interface graphics, source code, and design assets of mytoolpocket.com are the proprietary property of mytoolpocket.com. All data and content you paste, input, or process remains 100% your exclusive property.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-[#111111]">4. Disclaimer of Warranties</h2>
          <p>
            All utilities on mytoolpocket.com are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, whether express or implied. While we strive for rigorous algorithmic accuracy across all calculators and converters, we make no guarantee that outputs will be error-free or suitable for critical life-safety or legal applications.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-[#111111]">5. Limitation of Liability</h2>
          <p>
            In no event shall mytoolpocket.com, its maintainers, or affiliates be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our tools, including loss of data or business interruptions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-[#111111]">6. Contact Information</h2>
          <p>
            For questions regarding these Terms of Service, please write to us at <a href="mailto:terms@mytoolpocket.com" className="text-[#111111] font-bold underline">terms@mytoolpocket.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}

