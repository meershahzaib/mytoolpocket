import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center text-xs font-medium text-[#666666] mb-6 flex-wrap gap-1.5" aria-label="Breadcrumb">
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-[#111111] transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 text-[#999999]" />
            {isLast || !item.href ? (
              <span className="text-[#111111] font-semibold truncate max-w-xs">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-[#111111] transition-colors truncate max-w-xs"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

