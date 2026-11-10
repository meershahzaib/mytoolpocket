export interface ToolCategory {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  iconName: string;
  badge?: string;
}

export const CATEGORIES: ToolCategory[] = [
  {
    id: "text-tools",
    slug: "text-tools",
    name: "Text Tools",
    shortName: "Text",
    description: "Format, analyze, clean, and transform your written text with ease.",
    iconName: "FileText",
    badge: "Popular"
  },
  {
    id: "developer-tools",
    slug: "developer-tools",
    name: "Developer Tools",
    shortName: "Dev",
    description: "Format code, validate JSON, encode data, and debug quickly.",
    iconName: "Code",
    badge: "Essential"
  },
  {
    id: "seo-tools",
    slug: "seo-tools",
    name: "SEO Tools",
    shortName: "SEO",
    description: "Generate meta tags, analyze keywords, check robots.txt, and improve rankings.",
    iconName: "Search",
    badge: "Growth"
  },
  {
    id: "youtube-tools",
    slug: "youtube-tools",
    name: "YouTube Tools",
    shortName: "YouTube",
    description: "Download thumbnails, extract tags, generate titles, and calculate revenue.",
    iconName: "Video",
    badge: "Creator"
  },
  {
    id: "ai-tools",
    slug: "ai-tools",
    name: "AI Tools",
    shortName: "AI",
    description: "Smart prompt builders, text summarizers, and AI powered assistants.",
    iconName: "Sparkles",
    badge: "Trending"
  },
  {
    id: "image-tools",
    slug: "image-tools",
    name: "Image Tools",
    shortName: "Image",
    description: "Compress, resize, crop, and convert image files right in your browser.",
    iconName: "Image"
  },
  {
    id: "pdf-tools",
    slug: "pdf-tools",
    name: "PDF Tools",
    shortName: "PDF",
    description: "Merge, split, protect, and organize your documents securely.",
    iconName: "FileSpreadsheet"
  },
  {
    id: "calculators",
    slug: "calculators",
    name: "Calculators",
    shortName: "Calc",
    description: "Quick calculations for percentages, finance, dates, and everyday math.",
    iconName: "Calculator"
  },
  {
    id: "converters",
    slug: "converters",
    name: "Converters",
    shortName: "Convert",
    description: "Convert units, currencies, colors, and data formats in a click.",
    iconName: "ArrowLeftRight"
  },
  {
    id: "social-media-tools",
    slug: "social-media-tools",
    name: "Social Media Tools",
    shortName: "Social",
    description: "Craft bios, format hashtags, generate captions, and resize banners.",
    iconName: "Share2"
  },
  {
    id: "security-tools",
    slug: "security-tools",
    name: "Security Tools",
    shortName: "Security",
    description: "Generate strong passwords, inspect hashes, check entropy, and stay safe.",
    iconName: "ShieldCheck",
    badge: "Secure"
  },
  {
    id: "productivity-tools",
    slug: "productivity-tools",
    name: "Productivity Tools",
    shortName: "Productivity",
    description: "Pomodoro timers, checklists, notes, and utilities to keep you focused.",
    iconName: "Clock"
  }
];

export function getCategoryBySlug(slug: string): ToolCategory | undefined {
  return CATEGORIES.find((cat) => cat.slug === slug);
}

