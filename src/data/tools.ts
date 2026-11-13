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
    name: "JSON Formatter",
    category: "developer-tools",
    description: "Format, beautify, and minify JSON data with instant syntax error checking.",
    iconName: "Code",
    popular: true,
    featured: true,
    tags: ["json formatter", "beautify json", "format json", "minify json", "json pretty print"]
  },
  {
    id: "json-validator",
    slug: "json-validator",
    name: "JSON Validator",
    category: "developer-tools",
    description: "Validate JSON syntax against RFC standards with real-time error line highlighting.",
    iconName: "Check",
    popular: true,
    tags: ["json validator", "validate json", "json lint", "syntax checker", "rfc 8259"]
  },
  {
    id: "html-minifier",
    slug: "html-minifier",
    name: "HTML Minifier",
    category: "developer-tools",
    description: "Compress and minify HTML markup by stripping whitespace, blank lines, and comments.",
    iconName: "FileCode",
    popular: true,
    tags: ["html minifier", "compress html", "minify html", "clean html", "page speed"]
  },
  {
    id: "css-minifier",
    slug: "css-minifier",
    name: "CSS Minifier",
    category: "developer-tools",
    description: "Shrink CSS stylesheets by removing unnecessary whitespace, comments, and newlines.",
    iconName: "Palette",
    popular: true,
    tags: ["css minifier", "compress css", "minify css", "clean stylesheet", "css optimizer"]
  },
  {
    id: "js-minifier",
    slug: "js-minifier",
    name: "JavaScript Minifier",
    category: "developer-tools",
    description: "Compress JavaScript files by removing comments, redundant spaces, and line breaks safely.",
    iconName: "Code",
    tags: ["javascript minifier", "js minifier", "compress js", "minify javascript", "code shrink"]
  },
  {
    id: "base64-encode-decode",
    slug: "base64-encode-decode",
    name: "Base64 Encode/Decode",
    category: "developer-tools",
    description: "Encode text into standard Base64 format and decode Base64 strings safely with UTF-8 support.",
    iconName: "Binary",
    popular: true,
    featured: true,
    tags: ["base64 encoder", "base64 decoder", "base64 encode decode", "binary", "utf8"]
  },
  {
    id: "url-encode-decode",
    slug: "url-encode-decode",
    name: "URL Encoder/Decoder",
    category: "developer-tools",
    description: "Percent-encode special characters for URLs and decode percent-encoded query parameters.",
    iconName: "Link",
    popular: true,
    tags: ["url encoder decoder", "url encode", "url decode", "percent encoding", "query string"]
  },
  {
    id: "regex-tester",
    slug: "regex-tester",
    name: "Regex Tester",
    category: "developer-tools",
    description: "Test regular expressions in real time with live match highlights, capture groups, and flag toggles.",
    iconName: "Search",
    popular: true,
    featured: true,
    tags: ["regex tester", "regular expressions", "regex test", "match patterns", "regex groups"]
  },
  {
    id: "uuid-generator",
    slug: "uuid-generator",
    name: "UUID Generator",
    category: "developer-tools",
    description: "Generate cryptographically secure Version 4 UUIDs and GUIDs in bulk with custom formatting.",
    iconName: "KeyRound",
    popular: true,
    tags: ["uuid generator", "guid generator", "v4 uuid", "random uuid", "unique id"]
  },
  {
    id: "hash-generator",
    slug: "hash-generator",
    name: "Hash Generator (SHA-256)",
    category: "developer-tools",
    description: "Compute cryptographic hashes including SHA-256, SHA-512, SHA-384, and SHA-1 in your browser.",
    iconName: "ShieldCheck",
    popular: true,
    tags: ["hash generator", "sha256", "sha512", "checksum", "cryptography"]
  },
  {
    id: "jwt-decoder",
    slug: "jwt-decoder",
    name: "JWT Decoder",
    category: "developer-tools",
    description: "Decode and inspect JSON Web Tokens safely. View Header, Payload claims, and expiration dates.",
    iconName: "Code",
    popular: true,
    featured: true,
    tags: ["jwt decoder", "decode jwt", "json web token", "jwt claims", "jwt inspect"]
  },
  {
    id: "color-converter",
    slug: "color-converter",
    name: "Color Converter",
    category: "developer-tools",
    description: "Translate color codes between HEX, RGB, HSL, and HSV with live palette preview and CSS snippets.",
    iconName: "Palette",
    popular: true,
    tags: ["hex to rgb", "color converter", "rgb to hex", "hex to hsl", "css colors"]
  },
  {
    id: "css-gradient-generator",
    slug: "css-gradient-generator",
    name: "CSS Gradient Generator",
    category: "developer-tools",
    description: "Design linear and radial CSS gradients visually with angle controls and copyable CSS declarations.",
    iconName: "Sparkles",
    popular: true,
    tags: ["css gradient generator", "gradient generator", "linear gradient", "radial gradient", "css background"]
  },
  {
    id: "box-shadow-generator",
    slug: "box-shadow-generator",
    name: "Box Shadow Generator",
    category: "developer-tools",
    description: "Visually craft smooth elevation and neo-brutalist CSS box shadows with live interactive preview.",
    iconName: "Layers",
    popular: true,
    tags: ["box shadow generator", "css box shadow", "shadow generator", "elevation", "neo brutalism"]
  },
  {
    id: "border-radius-generator",
    slug: "border-radius-generator",
    name: "Border Radius Generator",
    category: "developer-tools",
    description: "Sculpt rounded corners and asymmetrical CSS shapes visually with independent corner radius controls.",
    iconName: "RefreshCw",
    tags: ["border radius generator", "css border radius", "rounded corners", "css shapes", "blob generator"]
  },
  {
    id: "markdown-to-html",
    slug: "markdown-to-html",
    name: "Markdown to HTML",
    category: "developer-tools",
    description: "Convert Markdown syntax into clean semantic HTML markup with live visual and code preview.",
    iconName: "FileText",
    popular: true,
    tags: ["markdown to html", "md to html", "markdown converter", "markdown preview", "html generator"]
  },
  {
    id: "unix-timestamp-converter",
    slug: "unix-timestamp-converter",
    name: "Unix Timestamp Converter",
    category: "developer-tools",
    description: "Convert Epoch timestamps to human-readable dates and translate calendar dates to Unix timestamps.",
    iconName: "Clock",
    popular: true,
    tags: ["unix timestamp converter", "epoch converter", "epoch time", "timestamp to date", "current timestamp"]
  },
  {
    id: "cron-expression-generator",
    slug: "cron-expression-generator",
    name: "Cron Expression Generator",
    category: "developer-tools",
    description: "Build, schedule, and explain cron expressions visually with plain-English human translations.",
    iconName: "Clock",
    popular: true,
    tags: ["cron expression generator", "cron generator", "cron schedule", "crontab", "cron job"]
  },
  {
    id: "color-picker",
    slug: "color-picker",
    name: "Color Picker",
    category: "developer-tools",
    description: "Explore color spectrums, generate shades and tints, and copy HEX, RGB, and HSL values instantly.",
    iconName: "Palette",
    popular: true,
    tags: ["color picker", "html color picker", "eyedropper", "color chooser", "css palette"]
  },
  {
    id: "html-entity-encoder",
    slug: "html-entity-encoder",
    name: "HTML Entity Encoder",
    category: "developer-tools",
    description: "Escape special characters into HTML entities or decode entities back to plain readable text.",
    iconName: "FileCode",
    tags: ["html entity encoder", "html entities", "escape html", "unescape html", "html special chars"]
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
    tags: ["meta tag generator", "seo tags", "open graph", "twitter card", "meta description"]
  },
  {
    id: "open-graph-generator",
    slug: "open-graph-generator",
    name: "Open Graph Generator",
    category: "seo-tools",
    description: "Create social media Open Graph meta tags for Facebook, LinkedIn, Discord, and Pinterest with live card preview.",
    iconName: "Share2",
    popular: true,
    featured: true,
    tags: ["open graph generator", "og tags", "facebook tags", "social card", "og image"]
  },
  {
    id: "robots-txt-generator",
    slug: "robots-txt-generator",
    name: "Robots.txt Generator",
    category: "seo-tools",
    description: "Create search crawler directives for Googlebot, Bingbot, and other web crawlers.",
    iconName: "FileTerminal",
    popular: true,
    tags: ["robots.txt generator", "crawler directives", "robots txt", "googlebot", "sitemap link"]
  },
  {
    id: "keyword-density-checker",
    slug: "keyword-density-checker",
    name: "Keyword Density Checker",
    category: "seo-tools",
    description: "Analyze keyword frequency, density percentages, and multi-word phrases to avoid keyword stuffing.",
    iconName: "FileText",
    popular: true,
    tags: ["keyword density checker", "keyword frequency", "keyword stuffing", "seo copy analyzer", "ngram"]
  },
  {
    id: "serp-preview",
    slug: "serp-preview",
    name: "SERP Snippet Preview",
    category: "seo-tools",
    description: "Simulate exact Google desktop and mobile search result cards with real-time character meters.",
    iconName: "Globe",
    popular: true,
    featured: true,
    tags: ["serp preview tool", "google serp preview", "search simulator", "title pixel length", "meta description preview"]
  },
  {
    id: "utm-link-builder",
    slug: "utm-link-builder",
    name: "UTM Link Builder",
    category: "seo-tools",
    description: "Generate clean Google Analytics campaign tracking URLs with source, medium, and campaign parameters.",
    iconName: "Link",
    popular: true,
    tags: ["utm builder", "utm tracking", "google analytics utm", "campaign url", "utm source"]
  },
  {
    id: "schema-markup-generator",
    slug: "schema-markup-generator",
    name: "Schema Markup Generator",
    category: "seo-tools",
    description: "Generate schema.org structured data in JSON-LD format for Organizations, Articles, Products, and Local Businesses.",
    iconName: "Code",
    popular: true,
    tags: ["schema markup generator", "json-ld generator", "structured data", "rich snippets", "schema.org"]
  },
  {
    id: "faq-schema-generator",
    slug: "faq-schema-generator",
    name: "FAQ Schema Generator",
    category: "seo-tools",
    description: "Generate FAQPage JSON-LD structured data to earn rich expandable questions in Google search results.",
    iconName: "HelpCircle",
    popular: true,
    tags: ["faq schema generator", "faqpage schema", "rich results", "structured faqs", "json ld faq"]
  },
  {
    id: "htaccess-redirect-generator",
    slug: "htaccess-redirect-generator",
    name: "Htaccess Redirect Generator",
    category: "seo-tools",
    description: "Create Apache mod_rewrite rules for 301 permanent redirects, HTTPS security, and WWW canonicalization.",
    iconName: "ArrowLeftRight",
    tags: ["htaccess redirect generator", "301 redirect", "apache redirect", "force https", "mod_rewrite"]
  },
  {
    id: "heading-checker",
    slug: "heading-checker",
    name: "Heading Structure Checker",
    category: "seo-tools",
    description: "Audit H1, H2, and H3 heading hierarchies in HTML and Markdown to identify outline and accessibility issues.",
    iconName: "ListFilter",
    tags: ["h1 h2 checker", "heading checker", "heading hierarchy", "heading structure", "document outline"]
  },
  {
    id: "reading-time-calculator",
    slug: "reading-time-calculator",
    name: "Reading Time Calculator",
    category: "seo-tools",
    description: "Calculate estimated reading and speaking times based on standard adult pacing rates for blog articles and speeches.",
    iconName: "Clock",
    tags: ["reading time calculator", "read time", "words per minute", "speaking time", "article length"]
  },
  {
    id: "sitemap-generator",
    slug: "sitemap-generator",
    name: "Sitemap XML Generator",
    category: "seo-tools",
    description: "Generate compliant sitemaps.org XML files from URL lists with customizable priorities and change frequencies.",
    iconName: "Layers",
    popular: true,
    tags: ["sitemap generator", "xml sitemap", "sitemap xml generator", "google sitemap", "url list sitemap"]
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

