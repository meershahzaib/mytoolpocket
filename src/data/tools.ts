export interface ToolItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  iconName: string;
  keyword?: string;
  popular?: boolean;
  featured?: boolean;
  tags: string[];
}

export const TOOLS: ToolItem[] = [
  // Text Tools (Phase 1)
  {
    id: "word-counter",
    slug: "word-counter",
    name: "Word Counter",
    category: "text-tools",
    description: "Count words, characters, sentences, paragraphs, and reading time in real time.",
    iconName: "FileText",
    popular: true,
    featured: true,
    tags: ["word counter", "word count", "count words", "words", "characters"]
  },
  {
    id: "character-counter",
    slug: "character-counter",
    name: "Character Counter",
    category: "text-tools",
    description: "Calculate exact character tallies with and without spaces, and check social media limits.",
    iconName: "Type",
    popular: true,
    featured: true,
    tags: ["character counter", "letters", "characters", "length", "limits"]
  },
  {
    id: "case-converter",
    slug: "case-converter",
    name: "Case Converter",
    category: "text-tools",
    description: "Convert text to UPPERCASE, lowercase, Title Case, camelCase, snake_case, and kebab-case.",
    iconName: "Type",
    popular: true,
    featured: true,
    tags: ["case converter", "uppercase", "lowercase", "title case", "camelcase"]
  },
  {
    id: "lorem-ipsum-generator",
    slug: "lorem-ipsum-generator",
    name: "Lorem Ipsum Generator",
    category: "text-tools",
    description: "Generate custom placeholder dummy text by paragraphs, sentences, or word counts.",
    iconName: "AlignLeft",
    popular: true,
    tags: ["lorem ipsum generator", "dummy text", "placeholder", "latin", "mock text"]
  },
  {
    id: "remove-duplicate-lines",
    slug: "remove-duplicate-lines",
    name: "Remove Duplicate Lines",
    category: "text-tools",
    description: "Clean lists and dataset rows by deleting repeating entries while maintaining clean formatting.",
    iconName: "ListFilter",
    popular: true,
    tags: ["remove duplicate lines", "dedupe", "unique lines", "clean list", "filter"]
  },
  {
    id: "text-sorter",
    slug: "text-sorter",
    name: "Text Sorter",
    category: "text-tools",
    description: "Sort text alphabetically (A-Z, Z-A), by character length, reverse line order, or shuffle randomly.",
    iconName: "ListFilter",
    popular: true,
    tags: ["sort text alphabetically", "alphabetize", "sort lines", "order", "shuffle"]
  },
  {
    id: "find-and-replace",
    slug: "find-and-replace",
    name: "Find and Replace",
    category: "text-tools",
    description: "Search for words or regex patterns in text and replace them instantly with match highlighting.",
    iconName: "Search",
    popular: true,
    tags: ["find and replace text online", "replace words", "search replace", "regex replace"]
  },
  {
    id: "text-compare",
    slug: "text-compare",
    name: "Text Diff Checker",
    category: "text-tools",
    description: "Compare two text documents side-by-side with visual color-coded additions and deletions.",
    iconName: "FileSpreadsheet",
    popular: true,
    featured: true,
    tags: ["text compare tool", "diff checker", "compare text", "find differences", "text diff"]
  },
  {
    id: "reverse-text",
    slug: "reverse-text",
    name: "Reverse Text",
    category: "text-tools",
    description: "Reverse entire text strings, invert word orders, flip upside down, or reverse multiline lists.",
    iconName: "ArrowLeftRight",
    tags: ["reverse text", "backwards text", "flip text", "reverse words", "upside down"]
  },
  {
    id: "remove-extra-spaces",
    slug: "remove-extra-spaces",
    name: "Remove Extra Spaces",
    category: "text-tools",
    description: "Clean messy text by stripping duplicate consecutive spaces, tabs, and unwanted whitespace.",
    iconName: "AlignLeft",
    popular: true,
    tags: ["remove extra spaces", "clean spaces", "whitespace remover", "trim text", "single space"]
  },
  {
    id: "remove-line-breaks",
    slug: "remove-line-breaks",
    name: "Remove Line Breaks",
    category: "text-tools",
    description: "Merge fragmented multiline text into continuous paragraphs or custom delimited lists.",
    iconName: "AlignLeft",
    popular: true,
    tags: ["remove line breaks", "strip newlines", "merge lines", "paragraph formatter"]
  },
  {
    id: "fancy-text-generator",
    slug: "fancy-text-generator",
    name: "Fancy Text Generator",
    category: "text-tools",
    description: "Convert plain text into 15+ stylish Unicode fonts for Instagram, TikTok, Discord, and X.",
    iconName: "Sparkles",
    popular: true,
    featured: true,
    tags: ["fancy text generator", "stylish fonts", "cool fonts", "instagram fonts", "unicode text"]
  },
  {
    id: "morse-code-translator",
    slug: "morse-code-translator",
    name: "Morse Code Translator",
    keyword: "morse code translator",
    category: "text-tools",
    description: "Translate English text to Morse code dots and dashes, and decode Morse code back to text.",
    iconName: "Binary",
    tags: ["morse code translator", "morse code", "dots and dashes", "decode morse", "telegraph"]
  },
  {
    id: "text-to-binary",
    slug: "text-to-binary",
    name: "Text to Binary",
    category: "text-tools",
    description: "Convert plain text into 8-bit ASCII binary code and decode binary 0s and 1s back into text.",
    iconName: "Binary",
    tags: ["text to binary", "binary converter", "ascii to binary", "binary to text", "bits"]
  },
  {
    id: "readability-checker",
    slug: "readability-checker",
    name: "Readability Checker",
    category: "text-tools",
    description: "Analyze Flesch Reading Ease and Flesch-Kincaid Grade Level scores to optimize text clarity.",
    iconName: "FileText",
    popular: true,
    featured: true,
    tags: ["readability checker", "flesch score", "grade level", "reading ease", "text clarity"]
  },
  {
    id: "random-text-generator",
    slug: "random-text-generator",
    name: "Random Text Generator",
    category: "text-tools",
    description: "Generate high-entropy random strings, alphanumeric sequences, and random dictionary words.",
    iconName: "RefreshCw",
    tags: ["random text generator", "random string", "random words", "test data", "mock string"]
  },
  {
    id: "text-repeater",
    slug: "text-repeater",
    name: "Text Repeater",
    category: "text-tools",
    description: "Repeat any word, phrase, sentence, or emoji multiple times with custom line breaks and separators.",
    iconName: "Layers",
    tags: ["text repeater", "repeat text", "multiply words", "duplicate text", "emoji repeater"]
  },
  {
    id: "slug-generator",
    slug: "slug-generator",
    name: "Slug Generator",
    category: "text-tools",
    description: "Convert article titles and phrases into clean, URL-friendly lowercase kebab-case slugs.",
    iconName: "Globe",
    popular: true,
    featured: true,
    tags: ["slug generator", "url slug", "kebab case", "permalink", "seo friendly url"]
  },

  // Developer Tools
  {
    id: "json-formatter",
    slug: "json-formatter",
    name: "JSON Formatter and Validator",
    category: "developer-tools",
    description: "Format, validate, beautify, and minify JSON data with instant syntax error checking.",
    iconName: "Code",
    popular: true,
    featured: true,
    tags: ["json", "formatter", "validator", "beautifier", "developer"]
  },
  {
    id: "base64-encoder-decoder",
    slug: "base64-encoder-decoder",
    name: "Base64 Encoder and Decoder",
    category: "developer-tools",
    description: "Encode text into Base64 format and decode Base64 strings safely.",
    iconName: "Binary",
    popular: true,
    tags: ["base64", "encoder", "decoder", "binary"]
  },
  {
    id: "url-encoder-decoder",
    slug: "url-encoder-decoder",
    name: "URL Encoder and Decoder",
    category: "developer-tools",
    description: "Encode special characters for query strings and decode URL-encoded components.",
    iconName: "Link",
    tags: ["url", "uri", "encoding", "decoding"]
  },
  {
    id: "html-entity-converter",
    slug: "html-entity-converter",
    name: "HTML Entity Encoder",
    category: "developer-tools",
    description: "Convert special symbols into HTML entities and decode them back to plain characters.",
    iconName: "FileCode",
    tags: ["html", "entities", "escape"]
  },

  // SEO Tools
  {
    id: "meta-tag-generator",
    slug: "meta-tag-generator",
    name: "Meta Tag Generator",
    category: "seo-tools",
    description: "Generate Google SEO, Open Graph, and Twitter Card meta tags with live preview.",
    iconName: "Search",
    popular: true,
    featured: true,
    tags: ["seo", "meta", "open graph", "twitter card"]
  },
  {
    id: "robots-txt-generator",
    slug: "robots-txt-generator",
    name: "Robots.txt Generator",
    category: "seo-tools",
    description: "Create search crawler directives for Googlebot, Bingbot, and other web crawlers.",
    iconName: "FileTerminal",
    tags: ["robots", "crawler", "sitemap", "seo"]
  },
  {
    id: "slug-generator",
    slug: "slug-generator",
    name: "URL Slug Generator",
    category: "seo-tools",
    description: "Turn article titles and text into clean, URL-friendly kebab-case slugs.",
    iconName: "Globe",
    tags: ["slug", "url", "seo", "permalinks"]
  },

  // YouTube Tools
  {
    id: "youtube-thumbnail-downloader",
    slug: "youtube-thumbnail-downloader",
    name: "YouTube Thumbnail Downloader",
    category: "youtube-tools",
    description: "Fetch and download high resolution HD, HQ, and maxres thumbnails from any YouTube URL.",
    iconName: "Video",
    popular: true,
    featured: true,
    tags: ["youtube", "thumbnail", "download", "creator"]
  },
  {
    id: "youtube-tag-extractor",
    slug: "youtube-tag-extractor",
    name: "YouTube Tag Extractor",
    category: "youtube-tools",
    description: "Extract hidden video keywords and tags to study competitor video SEO.",
    iconName: "Tag",
    tags: ["youtube", "tags", "keywords", "video"]
  },

  // AI Tools
  {
    id: "ai-prompt-generator",
    slug: "ai-prompt-generator",
    name: "AI Prompt Generator",
    category: "ai-tools",
    description: "Craft clear, structured system prompts for ChatGPT, Claude, and Gemini.",
    iconName: "Sparkles",
    popular: true,
    featured: true,
    tags: ["ai", "prompt", "chatgpt", "claude", "gemini"]
  },
  {
    id: "ai-text-summarizer",
    slug: "ai-text-summarizer",
    name: "Text Summarizer Assistant",
    category: "ai-tools",
    description: "Distill lengthy articles and documents into concise key takeaway bullet points.",
    iconName: "Bot",
    tags: ["summary", "ai", "bullet points", "reading"]
  },

  // Image Tools
  {
    id: "image-resizer",
    slug: "image-resizer",
    name: "Client-Side Image Resizer",
    category: "image-tools",
    description: "Change dimensions and aspect ratio of your photos directly in your browser without uploading.",
    iconName: "Image",
    popular: true,
    tags: ["image", "resize", "dimensions", "privacy"]
  },
  {
    id: "svg-to-png-converter",
    slug: "svg-to-png-converter",
    name: "SVG to PNG Converter",
    category: "image-tools",
    description: "Render vector SVG graphics into raster PNG images at any desired scale.",
    iconName: "Layers",
    tags: ["svg", "png", "convert", "vector"]
  },

  // PDF Tools
  {
    id: "pdf-merger",
    slug: "pdf-merger",
    name: "PDF Merge Assistant",
    category: "pdf-tools",
    description: "Combine multiple PDF documents into a single organized file.",
    iconName: "FileSpreadsheet",
    popular: true,
    tags: ["pdf", "merge", "combine", "documents"]
  },
  {
    id: "pdf-page-counter",
    slug: "pdf-page-counter",
    name: "PDF Page Counter",
    category: "pdf-tools",
    description: "Quickly inspect the page count and metadata of your PDF files.",
    iconName: "Files",
    tags: ["pdf", "pages", "counter", "metadata"]
  },

  // Calculators
  {
    id: "percentage-calculator",
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    category: "calculators",
    description: "Calculate percentage increase, percentage decrease, and fraction percentages instantly.",
    iconName: "Percent",
    popular: true,
    featured: true,
    tags: ["percentage", "math", "discount", "increase"]
  },
  {
    id: "age-calculator",
    slug: "age-calculator",
    name: "Age and Date Calculator",
    category: "calculators",
    description: "Calculate exact age in years, months, days, hours, and minutes with upcoming birthdays.",
    iconName: "Calendar",
    tags: ["age", "date", "birthday", "time"]
  },

  // Converters
  {
    id: "unit-converter",
    slug: "unit-converter",
    name: "Universal Unit Converter",
    category: "converters",
    description: "Convert length, weight, temperature, area, volume, and speed across metric and imperial.",
    iconName: "ArrowLeftRight",
    popular: true,
    tags: ["converter", "units", "metric", "imperial"]
  },
  {
    id: "color-converter",
    slug: "color-converter",
    name: "HEX, RGB and HSL Color Converter",
    category: "converters",
    description: "Translate color codes between HEX, RGB, HSL, and HSV with live palette preview.",
    iconName: "Palette",
    tags: ["color", "hex", "rgb", "hsl", "design"]
  },

  // Social Media Tools
  {
    id: "hashtag-generator",
    slug: "hashtag-generator",
    name: "Hashtag Generator",
    category: "social-media-tools",
    description: "Generate trending, clean tags for Instagram, TikTok, LinkedIn, and X.",
    iconName: "Hash",
    popular: true,
    tags: ["hashtags", "instagram", "tiktok", "social"]
  },
  {
    id: "social-bio-generator",
    slug: "social-bio-generator",
    name: "Bio and Caption Styler",
    category: "social-media-tools",
    description: "Format fancy fonts, emojis, and line breaks for clean social media profile bios.",
    iconName: "Sparkles",
    tags: ["bio", "caption", "fonts", "instagram"]
  },

  // Security Tools
  {
    id: "password-generator",
    slug: "password-generator",
    name: "Strong Password Generator",
    category: "security-tools",
    description: "Create cryptographically secure, randomized passwords with customizable rules.",
    iconName: "KeyRound",
    popular: true,
    featured: true,
    tags: ["password", "generator", "security", "random", "crypto"]
  },
  {
    id: "hash-generator",
    slug: "hash-generator",
    name: "Hash Generator (MD5, SHA-256)",
    category: "security-tools",
    description: "Compute cryptographic hashes including SHA-1, SHA-256, and SHA-512 instantly.",
    iconName: "ShieldCheck",
    tags: ["hash", "sha256", "checksum", "security"]
  },

  // Productivity Tools
  {
    id: "pomodoro-timer",
    slug: "pomodoro-timer",
    name: "Pomodoro Focus Timer",
    category: "productivity-tools",
    description: "Boost focus and maintain flow with 25-minute work intervals and customizable breaks.",
    iconName: "Clock",
    popular: true,
    featured: true,
    tags: ["pomodoro", "timer", "focus", "work"]
  },
  {
    id: "quick-notes-scratchpad",
    slug: "quick-notes-scratchpad",
    name: "Browser Scratchpad",
    category: "productivity-tools",
    description: "Auto-saving private notepad stored locally in your browser for quick thoughts.",
    iconName: "StickyNote",
    tags: ["notes", "notepad", "scratchpad", "autosave"]
  }
];

export function getToolsByCategory(categorySlug: string): ToolItem[] {
  return TOOLS.filter((tool) => tool.category === categorySlug);
}

export function getToolBySlug(categorySlug: string, toolSlug: string): ToolItem | undefined {
  return TOOLS.find((t) => t.category === categorySlug && t.slug === toolSlug);
}

