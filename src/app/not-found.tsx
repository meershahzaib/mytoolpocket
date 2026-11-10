import React from "react";
import Link from "next/link";
import { Wrench, ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-[#ffffff] border-2 border-[#111111] flex items-center justify-center text-[#111111] mx-auto shadow-[4px_4px_0px_#111111]">
        <Wrench className="w-8 h-8 text-[#d9541e]" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#d9541e]">
          404 Not Found
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#111111]">
          Pocket Tool Not Found
        </h1>
        <p className="text-xs sm:text-sm text-[#555555] max-w-sm mx-auto">
          The tool or page you are searching for does not seem to exist or has moved.
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 pt-4">
        <Link
          href="/"
          className="px-5 py-2.5 text-xs font-bold bg-[#111111] text-[#f3eee3] rounded-lg border border-[#111111] hover:bg-[#333333] inline-flex items-center gap-1.5"
        >
          <Home className="w-4 h-4" />
          <span>Go to Homepage</span>
        </Link>
        <Link
          href="/tools"
          className="px-5 py-2.5 text-xs font-bold bg-[#d9541e] text-[#ffffff] rounded-lg border border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#bf4514] inline-flex items-center gap-1.5"
        >
          <span>Browse All Tools</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

