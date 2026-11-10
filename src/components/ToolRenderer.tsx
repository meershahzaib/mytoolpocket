"use client";

import React, { useState, useEffect } from "react";
import { Copy, Check, RefreshCw, Play, Pause, RotateCcw, Download } from "lucide-react";
import { ToolItem } from "@/data/tools";

interface ToolRendererProps {
  tool: ToolItem;
}

export default function ToolRenderer({ tool }: ToolRendererProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Switch based on tool slug
  switch (tool.slug) {
    case "word-counter":
      return <WordCounterTool />;
    case "case-converter":
      return <CaseConverterTool />;
    case "json-formatter":
      return <JsonFormatterTool />;
    case "base64-encoder-decoder":
      return <Base64Tool />;
    case "password-generator":
      return <PasswordGeneratorTool />;
    case "meta-tag-generator":
      return <MetaTagGeneratorTool />;
    case "percentage-calculator":
      return <PercentageCalculatorTool />;
    case "youtube-thumbnail-downloader":
      return <YouTubeThumbnailTool />;
    case "pomodoro-timer":
      return <PomodoroTimerTool />;
    default:
      return <GenericToolPlaceholder tool={tool} />;
  }
}

// 1. Word Counter
function WordCounterTool() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const trimmed = text.trim();
  const wordCount = trimmed ? trimmed.split(/\s+/).length : 0;
  const charCount = text.length;
  const charNoSpaces = text.replace(/\s+/g, "").length;
  const sentenceCount = trimmed ? (text.match(/[^.!?]+[.!?]+(\s|$)/g) || [1]).length : 0;
  const paragraphCount = trimmed ? text.split(/\n+/).filter((p) => p.trim().length > 0).length : 0;
  const readingTimeMinutes = Math.ceil(wordCount / 200);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatBox label="Words" value={wordCount} />
        <StatBox label="Characters" value={charCount} />
        <StatBox label="No Spaces" value={charNoSpaces} />
        <StatBox label="Sentences" value={sentenceCount} />
        <StatBox label="Paragraphs" value={paragraphCount} />
        <StatBox label="Read Time" value={`~${readingTimeMinutes} min`} />
      </div>

      <div className="bg-[#ffffff] border-2 border-[#111111] rounded-xl p-4 shadow-[3px_3px_0px_#111111]">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your content here to analyze in real time..."
          rows={10}
          className="w-full p-3 bg-[#fdfbf7] border border-[#d4ccbd] rounded-lg text-sm text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#111111] font-mono resize-y"
        />
        <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-3 border-t border-[#e6dfd2]">
          <div className="text-xs text-[#666666]">
            Real-time counting. Text stays private in your browser.
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setText("")}
              className="px-3 py-1.5 text-xs font-semibold bg-[#f3eee3] text-[#111111] border border-[#111111] rounded-lg hover:bg-[#e6dfd2]"
            >
              Clear Text
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(text);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="px-4 py-1.5 text-xs font-bold bg-[#d9541e] text-[#ffffff] border border-[#111111] rounded-lg shadow-[2px_2px_0px_#111111] hover:bg-[#bf4514] flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy Content"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. Case Converter
function CaseConverterTool() {
  const [input, setInput] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyVal = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
  };

  const toCamelCase = (str: string) => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, "");
  };

  const toSnakeCase = (str: string) => {
    return str
      .replace(/\W+/g, " ")
      .split(/ |\B(?=[A-Z])/)
      .map((part) => part.toLowerCase())
      .join("_");
  };

  const toKebabCase = (str: string) => {
    return str
      .replace(/\W+/g, " ")
      .split(/ |\B(?=[A-Z])/)
      .map((part) => part.toLowerCase())
      .join("-");
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#ffffff] border-2 border-[#111111] rounded-xl p-4 shadow-[3px_3px_0px_#111111]">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-2">
          Source Text
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or paste text to convert cases..."
          rows={5}
          className="w-full p-3 bg-[#fdfbf7] border border-[#d4ccbd] rounded-lg text-sm text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#111111] resize-y"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CaseCard
          label="UPPERCASE"
          value={input.toUpperCase()}
          onCopy={() => copyVal(input.toUpperCase(), "upper")}
          isCopied={copiedKey === "upper"}
        />
        <CaseCard
          label="lowercase"
          value={input.toLowerCase()}
          onCopy={() => copyVal(input.toLowerCase(), "lower")}
          isCopied={copiedKey === "lower"}
        />
        <CaseCard
          label="Title Case"
          value={toTitleCase(input)}
          onCopy={() => copyVal(toTitleCase(input), "title")}
          isCopied={copiedKey === "title"}
        />
        <CaseCard
          label="camelCase"
          value={toCamelCase(input)}
          onCopy={() => copyVal(toCamelCase(input), "camel")}
          isCopied={copiedKey === "camel"}
        />
        <CaseCard
          label="snake_case"
          value={toSnakeCase(input)}
          onCopy={() => copyVal(toSnakeCase(input), "snake")}
          isCopied={copiedKey === "snake"}
        />
        <CaseCard
          label="kebab-case"
          value={toKebabCase(input)}
          onCopy={() => copyVal(toKebabCase(input), "kebab")}
          isCopied={copiedKey === "kebab"}
        />
      </div>
    </div>
  );
}

function CaseCard({
  label,
  value,
  onCopy,
  isCopied
}: {
  label: string;
  value: string;
  onCopy: () => void;
  isCopied: boolean;
}) {
  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-4 shadow-[2px_2px_0px_#111111]">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold uppercase text-[#555555]">{label}</span>
        <button
          onClick={onCopy}
          className="px-2.5 py-1 text-xs font-bold bg-[#d9541e] text-[#ffffff] rounded border border-[#111111] hover:bg-[#bf4514] flex items-center gap-1"
        >
          {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          <span>{isCopied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <div className="p-2.5 bg-[#fdfbf7] rounded border border-[#e6dfd2] text-xs font-mono text-[#111111] truncate min-h-[38px] flex items-center">
        {value || <span className="text-[#999999] italic">Output preview...</span>}
      </div>
    </div>
  );
}

// 3. JSON Formatter
function JsonFormatterTool() {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const formatJson = (spaces: number) => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, spaces));
      setError(null);
    } catch (e: any) {
      setError(e.message || "Invalid JSON syntax");
    }
  };

  const minifyJson = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setError(null);
    } catch (e: any) {
      setError(e.message || "Invalid JSON syntax");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => formatJson(2)}
          className="px-3 py-1.5 text-xs font-bold bg-[#d9541e] text-[#ffffff] rounded-lg border border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#bf4514]"
        >
          Format (2 Spaces)
        </button>
        <button
          onClick={() => formatJson(4)}
          className="px-3 py-1.5 text-xs font-bold bg-[#d9541e] text-[#ffffff] rounded-lg border border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#bf4514]"
        >
          Format (4 Spaces)
        </button>
        <button
          onClick={minifyJson}
          className="px-3 py-1.5 text-xs font-semibold bg-[#111111] text-[#f3eee3] rounded-lg border border-[#111111] hover:bg-[#333333]"
        >
          Minify JSON
        </button>
        <button
          onClick={() => {
            navigator.clipboard.writeText(input);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="px-3 py-1.5 text-xs font-semibold bg-[#ffffff] text-[#111111] rounded-lg border border-[#111111] hover:bg-[#f3eee3] flex items-center gap-1 ml-auto"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border-2 border-red-500 rounded-lg text-xs font-mono text-red-700">
          Error: {error}
        </div>
      )}

      <div className="bg-[#ffffff] border-2 border-[#111111] rounded-xl p-3 shadow-[3px_3px_0px_#111111]">
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError(null);
          }}
          placeholder='{"key": "value", "list": [1, 2, 3]}'
          rows={14}
          className="w-full p-3 bg-[#fdfbf7] border border-[#d4ccbd] rounded-lg text-xs font-mono text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#111111] resize-y"
        />
      </div>
    </div>
  );
}

// 4. Base64 Encoder / Decoder
function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const processText = () => {
    try {
      setError(null);
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
    } catch (err: any) {
      setError("Invalid format for decoding");
    }
  };

  useEffect(() => {
    if (input) {
      processText();
    } else {
      setOutput("");
      setError(null);
    }
  }, [input, mode]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setMode("encode")}
          className={`px-4 py-2 text-xs font-bold rounded-lg border border-[#111111] transition-all ${
            mode === "encode"
              ? "bg-[#d9541e] text-[#ffffff] shadow-[2px_2px_0px_#111111]"
              : "bg-[#ffffff] text-[#111111]"
          }`}
        >
          Encode to Base64
        </button>
        <button
          onClick={() => setMode("decode")}
          className={`px-4 py-2 text-xs font-bold rounded-lg border border-[#111111] transition-all ${
            mode === "decode"
              ? "bg-[#d9541e] text-[#ffffff] shadow-[2px_2px_0px_#111111]"
              : "bg-[#ffffff] text-[#111111]"
          }`}
        >
          Decode from Base64
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#ffffff] border-2 border-[#111111] rounded-xl p-4 shadow-[2px_2px_0px_#111111]">
          <span className="block text-xs font-bold uppercase text-[#555555] mb-2">Input</span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encode" ? "Enter plain text..." : "Enter Base64 string..."}
            rows={8}
            className="w-full p-3 bg-[#fdfbf7] border border-[#d4ccbd] rounded-lg text-xs font-mono text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#111111]"
          />
        </div>

        <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-4 shadow-[2px_2px_0px_#111111] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase text-[#555555]">Output Result</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(output);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                disabled={!output}
                className="px-2.5 py-1 text-xs font-bold bg-[#d9541e] text-[#ffffff] rounded border border-[#111111] hover:bg-[#bf4514] disabled:opacity-50 flex items-center gap-1"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
            {error ? (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded border border-red-400 font-mono">
                {error}
              </div>
            ) : (
              <textarea
                readOnly
                value={output}
                placeholder="Result will appear here..."
                rows={8}
                className="w-full p-3 bg-[#fdfbf7] border border-[#d4ccbd] rounded-lg text-xs font-mono text-[#111111] focus:outline-none"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// 5. Password Generator
function PasswordGeneratorTool() {
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = "";
    if (includeUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLower) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!charset) {
      setPassword("");
      return;
    }

    let generated = "";
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      generated += charset[array[i] % charset.length];
    }
    setPassword(generated);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols]);

  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-6 shadow-[3px_3px_0px_#111111] space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-[#fdfbf7] border-2 border-[#111111] rounded-lg">
        <div className="font-mono text-lg font-bold text-[#111111] tracking-wider break-all select-all">
          {password || "Select at least one character set"}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={generatePassword}
            className="p-2 text-sm bg-[#ffffff] border border-[#111111] rounded-lg hover:bg-[#e6dfd2]"
            title="Regenerate"
          >
            <RefreshCw className="w-4 h-4 text-[#111111]" />
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(password);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="px-4 py-2 text-xs font-bold bg-[#d9541e] text-[#ffffff] rounded-lg border border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#bf4514] flex items-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Copied" : "Copy Password"}</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs font-bold text-[#111111] mb-1">
            <span>Password Length</span>
            <span>{length} characters</span>
          </div>
          <input
            type="range"
            min={6}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-[#d9541e]"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <label className="flex items-center gap-2 text-xs font-semibold text-[#111111] cursor-pointer">
            <input
              type="checkbox"
              checked={includeUpper}
              onChange={(e) => setIncludeUpper(e.target.checked)}
              className="accent-[#d9541e] w-4 h-4"
            />
            Uppercase (A-Z)
          </label>
          <label className="flex items-center gap-2 text-xs font-semibold text-[#111111] cursor-pointer">
            <input
              type="checkbox"
              checked={includeLower}
              onChange={(e) => setIncludeLower(e.target.checked)}
              className="accent-[#d9541e] w-4 h-4"
            />
            Lowercase (a-z)
          </label>
          <label className="flex items-center gap-2 text-xs font-semibold text-[#111111] cursor-pointer">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="accent-[#d9541e] w-4 h-4"
            />
            Numbers (0-9)
          </label>
          <label className="flex items-center gap-2 text-xs font-semibold text-[#111111] cursor-pointer">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="accent-[#d9541e] w-4 h-4"
            />
            Symbols (!@#$)
          </label>
        </div>
      </div>
    </div>
  );
}

// 6. Meta Tag Generator
function MetaTagGeneratorTool() {
  const [title, setTitle] = useState("My Awesome Website");
  const [description, setDescription] = useState("A fast, high quality utility website built for modern creators.");
  const [keywords, setKeywords] = useState("tools, utility, pocket, web tools");
  const [author, setAuthor] = useState("mytoolpocket.com");
  const [url, setUrl] = useState("https://mytoolpocket.com");
  const [copied, setCopied] = useState(false);

  const generatedTags = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${description}">
<meta name="keywords" content="${keywords}">
<meta name="author" content="${author}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${url}">
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${description}">`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-[#ffffff] border-2 border-[#111111] rounded-xl p-5 shadow-[3px_3px_0px_#111111] space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#666666]">Configure SEO Information</h4>
        <div>
          <label className="block text-xs font-semibold mb-1">Site / Page Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 bg-[#fdfbf7] border border-[#d4ccbd] rounded text-xs"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">Meta Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full p-2 bg-[#fdfbf7] border border-[#d4ccbd] rounded text-xs"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">Keywords (comma separated)</label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="w-full p-2 bg-[#fdfbf7] border border-[#d4ccbd] rounded text-xs"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-2 bg-[#fdfbf7] border border-[#d4ccbd] rounded text-xs"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">Canonical URL</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-2 bg-[#fdfbf7] border border-[#d4ccbd] rounded text-xs"
          />
        </div>
      </div>

      <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-5 shadow-[3px_3px_0px_#111111] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#666666]">Generated HTML Code</h4>
            <button
              onClick={() => {
                navigator.clipboard.writeText(generatedTags);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="px-3 py-1.5 text-xs font-bold bg-[#d9541e] text-[#ffffff] rounded-lg border border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#bf4514] flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy Tags"}</span>
            </button>
          </div>
          <pre className="p-3 bg-[#fdfbf7] rounded-lg border border-[#d4ccbd] text-[11px] font-mono overflow-x-auto text-[#111111] leading-relaxed">
            {generatedTags}
          </pre>
        </div>
      </div>
    </div>
  );
}

// 7. Percentage Calculator
function PercentageCalculatorTool() {
  const [val1, setVal1] = useState("20");
  const [val2, setVal2] = useState("150");

  const num1 = parseFloat(val1) || 0;
  const num2 = parseFloat(val2) || 0;

  const result1 = ((num1 / 100) * num2).toFixed(2);
  const result2 = num2 !== 0 ? ((num1 / num2) * 100).toFixed(2) : "0";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-5 shadow-[3px_3px_0px_#111111] space-y-4">
        <h4 className="text-sm font-bold text-[#111111]">What is X% of Y?</h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={val1}
            onChange={(e) => setVal1(e.target.value)}
            className="w-24 p-2 bg-[#fdfbf7] border border-[#111111] rounded text-center text-sm font-bold"
          />
          <span className="text-xs font-semibold">% of</span>
          <input
            type="number"
            value={val2}
            onChange={(e) => setVal2(e.target.value)}
            className="w-28 p-2 bg-[#fdfbf7] border border-[#111111] rounded text-center text-sm font-bold"
          />
        </div>
        <div className="p-3 bg-[#fdfbf7] rounded border border-[#d4ccbd] text-sm">
          Result: <span className="font-bold text-lg text-[#d9541e]">{result1}</span>
        </div>
      </div>

      <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-5 shadow-[3px_3px_0px_#111111] space-y-4">
        <h4 className="text-sm font-bold text-[#111111]">X is what % of Y?</h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={val1}
            onChange={(e) => setVal1(e.target.value)}
            className="w-24 p-2 bg-[#fdfbf7] border border-[#111111] rounded text-center text-sm font-bold"
          />
          <span className="text-xs font-semibold">is what % of</span>
          <input
            type="number"
            value={val2}
            onChange={(e) => setVal2(e.target.value)}
            className="w-28 p-2 bg-[#fdfbf7] border border-[#111111] rounded text-center text-sm font-bold"
          />
        </div>
        <div className="p-3 bg-[#fdfbf7] rounded border border-[#d4ccbd] text-sm">
          Result: <span className="font-bold text-lg text-[#d9541e]">{result2}%</span>
        </div>
      </div>
    </div>
  );
}

// 8. YouTube Thumbnail Downloader
function YouTubeThumbnailTool() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);

  const extractVideoId = (inputUrl: string) => {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = inputUrl.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleFetch = () => {
    const id = extractVideoId(url);
    setVideoId(id);
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#ffffff] border-2 border-[#111111] rounded-xl p-5 shadow-[3px_3px_0px_#111111]">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-2">
          Paste YouTube Video URL
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            className="flex-1 p-2.5 bg-[#fdfbf7] border border-[#d4ccbd] rounded-lg text-sm"
          />
          <button
            onClick={handleFetch}
            className="px-5 py-2.5 text-xs font-bold bg-[#d9541e] text-[#ffffff] rounded-lg border border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#bf4514]"
          >
            Fetch Thumbnails
          </button>
        </div>
      </div>

      {videoId && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-4 shadow-[2px_2px_0px_#111111]">
            <span className="text-xs font-bold uppercase text-[#555555] block mb-2">
              Maximum Resolution (1080p HD)
            </span>
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt="Max resolution thumbnail"
              className="w-full rounded border border-[#111111] mb-3"
            />
            <a
              href={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-xs font-bold bg-[#d9541e] text-[#ffffff] rounded border border-[#111111] hover:bg-[#bf4514] inline-flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Open Full HD Image</span>
            </a>
          </div>

          <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-4 shadow-[2px_2px_0px_#111111]">
            <span className="text-xs font-bold uppercase text-[#555555] block mb-2">
              High Quality (HQ 480p)
            </span>
            <img
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt="High quality thumbnail"
              className="w-full rounded border border-[#111111] mb-3"
            />
            <a
              href={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-xs font-bold bg-[#d9541e] text-[#ffffff] rounded border border-[#111111] hover:bg-[#bf4514] inline-flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Open HQ Image</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

// 9. Pomodoro Timer
function PomodoroTimerTool() {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"work" | "shortBreak" | "longBreak">("work");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  const selectMode = (newMode: "work" | "shortBreak" | "longBreak") => {
    setIsRunning(false);
    setMode(newMode);
    if (newMode === "work") setSecondsLeft(25 * 60);
    if (newMode === "shortBreak") setSecondsLeft(5 * 60);
    if (newMode === "longBreak") setSecondsLeft(15 * 60);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-8 shadow-[3px_3px_0px_#111111] text-center max-w-md mx-auto space-y-6">
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => selectMode("work")}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg border border-[#111111] ${
            mode === "work" ? "bg-[#d9541e] text-[#ffffff]" : "bg-[#f3eee3] text-[#111111]"
          }`}
        >
          Focus (25m)
        </button>
        <button
          onClick={() => selectMode("shortBreak")}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg border border-[#111111] ${
            mode === "shortBreak" ? "bg-[#d9541e] text-[#ffffff]" : "bg-[#f3eee3] text-[#111111]"
          }`}
        >
          Short Break (5m)
        </button>
        <button
          onClick={() => selectMode("longBreak")}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg border border-[#111111] ${
            mode === "longBreak" ? "bg-[#d9541e] text-[#ffffff]" : "bg-[#f3eee3] text-[#111111]"
          }`}
        >
          Long Break (15m)
        </button>
      </div>

      <div className="text-6xl font-black font-mono tracking-tight text-[#111111]">
        {formattedTime}
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-6 py-2.5 text-sm font-bold bg-[#d9541e] text-[#ffffff] rounded-lg border border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#bf4514] flex items-center gap-2"
        >
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span>{isRunning ? "Pause" : "Start Focus"}</span>
        </button>
        <button
          onClick={() => selectMode(mode)}
          className="p-2.5 text-sm bg-[#f3eee3] text-[#111111] rounded-lg border border-[#111111] hover:bg-[#e6dfd2]"
          title="Reset Timer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Generic interactive fallback for other tools
function GenericToolPlaceholder({ tool }: { tool: ToolItem }) {
  const [inputVal, setInputVal] = useState("");
  const [outputVal, setOutputVal] = useState("");
  const [copied, setCopied] = useState(false);

  const handleProcess = () => {
    setOutputVal(inputVal.trim() ? `Processed [${tool.name}]: ${inputVal}` : "No input provided.");
  };

  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-6 shadow-[3px_3px_0px_#111111] space-y-5">
      <div className="space-y-1">
        <h3 className="text-base font-bold text-[#111111]">{tool.name}</h3>
        <p className="text-xs text-[#666666]">{tool.description}</p>
      </div>

      <div className="space-y-3">
        <label className="block text-xs font-bold uppercase text-[#555555]">Input</label>
        <textarea
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder={`Enter input data for ${tool.name}...`}
          rows={5}
          className="w-full p-3 bg-[#fdfbf7] border border-[#d4ccbd] rounded-lg text-xs font-mono text-[#111111]"
        />
        <button
          onClick={handleProcess}
          className="px-5 py-2 text-xs font-bold bg-[#d9541e] text-[#ffffff] rounded-lg border border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#bf4514]"
        >
          Process Data
        </button>
      </div>

      {outputVal && (
        <div className="pt-4 border-t border-[#e6dfd2] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-[#555555]">Output</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(outputVal);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="px-2.5 py-1 text-xs font-bold bg-[#d9541e] text-[#ffffff] rounded border border-[#111111] flex items-center gap-1"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
          <div className="p-3 bg-[#fdfbf7] rounded border border-[#d4ccbd] text-xs font-mono text-[#111111]">
            {outputVal}
          </div>
        </div>
      )}
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-3 shadow-[2px_2px_0px_#111111]">
      <div className="text-[10px] font-bold uppercase tracking-wider text-[#777777]">{label}</div>
      <div className="text-lg font-black text-[#111111] mt-0.5">{value}</div>
    </div>
  );
}

