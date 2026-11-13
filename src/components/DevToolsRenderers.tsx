"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Copy,
  Check,
  RefreshCw,
  Play,
  RotateCcw,
  Sparkles,
  AlertCircle,
  Eye,
  Code,
  Sliders,
  Calendar,
  Layers
} from "lucide-react";

// Reusable Copy Button
export function DevCopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      disabled={!text}
      className="px-3.5 py-1.5 text-xs font-bold bg-[#d9541e] text-[#ffffff] rounded-lg border border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#bf4514] disabled:opacity-50 active:translate-x-0.5 active:translate-y-0.5 transition-all inline-flex items-center gap-1.5 cursor-pointer"
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      <span>{copied ? "Copied" : label}</span>
    </button>
  );
}

// -------------------------------------------------------------
// 1. JSON Formatter
// -------------------------------------------------------------
export function JsonFormatterTool() {
  const [input, setInput] = useState(`{\n  "name": "mytoolpocket",\n  "status": "online",\n  "stats": {\n    "tools": 50,\n    "privacy": true\n  },\n  "features": ["fast", "zero-latency", "client-side"]\n}`);
  const [indentSize, setIndentSize] = useState<2 | 4>(2);
  const [error, setError] = useState<string | null>(null);

  const formatJson = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, indentSize));
      setError(null);
    } catch (err: any) {
      setError(err.message || "Invalid JSON syntax");
    }
  };

  const minifyJson = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setError(null);
    } catch (err: any) {
      setError(err.message || "Invalid JSON syntax");
    }
  };

  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_#111111] space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={formatJson}
            className="px-4 py-2 text-xs font-bold bg-[#d9541e] text-[#ffffff] rounded-lg border border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#bf4514] active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            Format JSON ({indentSize} spaces)
          </button>
          <button
            onClick={minifyJson}
            className="px-4 py-2 text-xs font-bold bg-[#111111] text-[#f3eee3] rounded-lg border border-[#111111] hover:bg-[#333333] transition-colors"
          >
            Minify JSON
          </button>
          <div className="flex items-center bg-[#f3eee3] border border-[#111111] rounded-lg p-1 text-xs font-bold">
            <button
              onClick={() => setIndentSize(2)}
              className={`px-2 py-0.5 rounded ${indentSize === 2 ? "bg-[#111111] text-[#ffffff]" : "text-[#555555]"}`}
            >
              2 Sp
            </button>
            <button
              onClick={() => setIndentSize(4)}
              className={`px-2 py-0.5 rounded ${indentSize === 4 ? "bg-[#111111] text-[#ffffff]" : "text-[#555555]"}`}
            >
              4 Sp
            </button>
          </div>
        </div>

        <DevCopyButton text={input} label="Copy JSON" />
      </div>

      {error && (
        <div className="p-3 bg-red-50 border-2 border-red-500 rounded-xl text-xs font-mono text-red-700 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Syntax Error:</span> {error}
          </div>
        </div>
      )}

      <div className="relative">
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError(null);
          }}
          placeholder="Paste JSON here..."
          rows={14}
          className="w-full p-4 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-mono text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#111111] resize-y leading-relaxed"
        />
        <div className="flex justify-between items-center text-[11px] font-mono text-[#777777] mt-1.5 px-1">
          <span>Length: {input.length} chars</span>
          <span>Lines: {input.split("\n").length}</span>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 2. JSON Validator
// -------------------------------------------------------------
export function JsonValidatorTool() {
  const [input, setInput] = useState(`{\n  "status": 200,\n  "message": "Valid JSON Payload",\n  "data": {\n    "user": "developer",\n    "active": true\n  }\n}`);
  const [isValid, setIsValid] = useState<boolean | null>(true);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  useEffect(() => {
    if (!input.trim()) {
      setIsValid(null);
      setErrorDetails(null);
      return;
    }
    try {
      JSON.parse(input);
      setIsValid(true);
      setErrorDetails(null);
    } catch (err: any) {
      setIsValid(false);
      setErrorDetails(err.message || "Invalid JSON syntax");
    }
  }, [input]);

  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_#111111] space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isValid === true && (
            <div className="px-3 py-1 bg-emerald-100 border border-emerald-600 text-emerald-800 rounded-lg text-xs font-bold flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              <span>Valid JSON Syntax (RFC 8259 Compliant)</span>
            </div>
          )}
          {isValid === false && (
            <div className="px-3 py-1 bg-red-100 border border-red-600 text-red-800 rounded-lg text-xs font-bold flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Invalid JSON Syntax</span>
            </div>
          )}
          {isValid === null && (
            <span className="text-xs text-[#777777] font-semibold">Enter JSON to validate</span>
          )}
        </div>

        <DevCopyButton text={input} label="Copy Validated JSON" />
      </div>

      {errorDetails && (
        <div className="p-3 bg-red-50 border-2 border-red-400 rounded-xl text-xs font-mono text-red-700">
          <span className="font-bold">Error Details:</span> {errorDetails}
        </div>
      )}

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste JSON to validate..."
        rows={13}
        className={`w-full p-4 bg-[#fdfbf7] border-2 rounded-xl text-xs font-mono text-[#111111] focus:outline-none transition-colors ${
          isValid === true
            ? "border-emerald-600"
            : isValid === false
            ? "border-red-500"
            : "border-[#111111]"
        }`}
      />
    </div>
  );
}

// -------------------------------------------------------------
// 3. HTML Minifier
// -------------------------------------------------------------
export function HtmlMinifierTool() {
  const [input, setInput] = useState(`<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <!-- Main Meta Tags -->\n    <title>My Website</title>\n  </head>\n  <body>\n    <header>\n      <h1>Welcome to my website</h1>\n    </header>\n    <main>\n      <p>Fast, client-side developer utilities.</p>\n    </main>\n  </body>\n</html>`);
  const [output, setOutput] = useState("");
  const [stripComments, setStripComments] = useState(true);

  const minifyHtml = () => {
    let res = input;
    if (stripComments) {
      res = res.replace(/<!--[\s\S]*?-->/g, "");
    }
    // Collapse consecutive whitespace
    res = res.replace(/\s+/g, " ");
    // Remove space around tags
    res = res.replace(/>\s+</g, "><");
    res = res.trim();
    setOutput(res);
  };

  useEffect(() => {
    minifyHtml();
  }, [input, stripComments]);

  const savings = input.length > 0 && output.length > 0
    ? Math.max(0, Math.round(((input.length - output.length) / input.length) * 100))
    : 0;

  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_#111111] space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-xs font-bold text-[#111111] cursor-pointer">
          <input
            type="checkbox"
            checked={stripComments}
            onChange={(e) => setStripComments(e.target.checked)}
            className="w-4 h-4 accent-[#d9541e]"
          />
          <span>Strip HTML Comments</span>
        </label>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#f3eee3] border border-[#111111] text-[#111111]">
            Savings: {savings}% ({input.length - output.length} bytes saved)
          </span>
          <DevCopyButton text={output} label="Copy Minified HTML" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <span className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-1.5">
            Original HTML ({input.length} chars)
          </span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={12}
            className="w-full p-3 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-mono text-[#111111] focus:outline-none"
          />
        </div>
        <div>
          <span className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-1.5">
            Minified HTML ({output.length} chars)
          </span>
          <textarea
            readOnly
            value={output}
            rows={12}
            className="w-full p-3 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-mono text-[#111111] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 4. CSS Minifier
// -------------------------------------------------------------
export function CssMinifierTool() {
  const [input, setInput] = useState(`/* Global Stylesheet */\n:root {\n  --primary: #d9541e;\n  --background: #f3eee3;\n}\n\nbody {\n  margin: 0;\n  padding: 0;\n  font-family: sans-serif;\n  background-color: var(--background);\n}\n\n.card {\n  display: flex;\n  border: 2px solid #111111;\n  box-shadow: 4px 4px 0px #111111;\n}`);
  const [output, setOutput] = useState("");

  useEffect(() => {
    let res = input;
    // Strip comments
    res = res.replace(/\/\*[\s\S]*?\*\//g, "");
    // Collapse whitespace
    res = res.replace(/\s+/g, " ");
    // Remove space around symbols
    res = res.replace(/\s*([\{\}:;,])\s*/g, "$1");
    // Remove trailing semicolons before closing brace
    res = res.replace(/;}/g, "}");
    setOutput(res.trim());
  }, [input]);

  const savings = input.length > 0 && output.length > 0
    ? Math.max(0, Math.round(((input.length - output.length) / input.length) * 100))
    : 0;

  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_#111111] space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#f3eee3] border border-[#111111] text-[#111111]">
          Size reduction: {savings}% ({input.length - output.length} bytes saved)
        </span>
        <DevCopyButton text={output} label="Copy Minified CSS" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <span className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-1.5">
            Original CSS ({input.length} chars)
          </span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={12}
            className="w-full p-3 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-mono text-[#111111] focus:outline-none"
          />
        </div>
        <div>
          <span className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-1.5">
            Minified CSS ({output.length} chars)
          </span>
          <textarea
            readOnly
            value={output}
            rows={12}
            className="w-full p-3 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-mono text-[#111111] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 5. JavaScript Minifier
// -------------------------------------------------------------
export function JsMinifierTool() {
  const [input, setInput] = useState(`// Calculation utility\nfunction calculateMetrics(items) {\n  /* Filter active elements */\n  const active = items.filter(function(item) {\n    return item.isActive === true;\n  });\n\n  console.log("Processed items: ", active.length);\n  return active;\n}`);
  const [output, setOutput] = useState("");

  useEffect(() => {
    let res = input;
    // Strip multi-line comments
    res = res.replace(/\/\*[\s\S]*?\*\//g, "");
    // Strip single-line comments (preserving http:// or strings carefully)
    res = res.replace(/(^|[^:])\/\/[^\n]*/g, "$1");
    // Collapse multi-spaces and empty lines
    res = res.split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .join("\n");
    setOutput(res);
  }, [input]);

  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_#111111] space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#f3eee3] border border-[#111111] text-[#111111]">
          Original: {input.length} chars | Minified: {output.length} chars
        </span>
        <DevCopyButton text={output} label="Copy Minified JS" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <span className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-1.5">
            Original JS Code
          </span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={12}
            className="w-full p-3 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-mono text-[#111111] focus:outline-none"
          />
        </div>
        <div>
          <span className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-1.5">
            Minified JS Output
          </span>
          <textarea
            readOnly
            value={output}
            rows={12}
            className="w-full p-3 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-mono text-[#111111] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 6. Base64 Encode / Decode
// -------------------------------------------------------------
export function Base64Tool() {
  const [input, setInput] = useState("Hello from mytoolpocket! 🚀");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!input) {
      setOutput("");
      setError(null);
      return;
    }
    try {
      setError(null);
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input.trim()))));
      }
    } catch {
      setError("Invalid Base64 sequence for decoding");
    }
  }, [input, mode]);

  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_#111111] space-y-6">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setMode("encode")}
          className={`px-4 py-2 text-xs font-bold rounded-lg border-2 border-[#111111] transition-all cursor-pointer ${
            mode === "encode"
              ? "bg-[#d9541e] text-[#ffffff] shadow-[2px_2px_0px_#111111]"
              : "bg-[#ffffff] text-[#111111] hover:bg-[#f3eee3]"
          }`}
        >
          Encode to Base64
        </button>
        <button
          onClick={() => setMode("decode")}
          className={`px-4 py-2 text-xs font-bold rounded-lg border-2 border-[#111111] transition-all cursor-pointer ${
            mode === "decode"
              ? "bg-[#d9541e] text-[#ffffff] shadow-[2px_2px_0px_#111111]"
              : "bg-[#ffffff] text-[#111111] hover:bg-[#f3eee3]"
          }`}
        >
          Decode from Base64
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <span className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-1.5">
            {mode === "encode" ? "Plain Text Input" : "Base64 Input"}
          </span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={10}
            className="w-full p-3 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-mono text-[#111111] focus:outline-none"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#666666]">
              {mode === "encode" ? "Base64 Output" : "Plain Text Output"}
            </span>
            <DevCopyButton text={output} label="Copy Output" />
          </div>
          {error ? (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border-2 border-red-400 font-mono">
              {error}
            </div>
          ) : (
            <textarea
              readOnly
              value={output}
              rows={10}
              className="w-full p-3 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-mono text-[#111111] focus:outline-none"
            />
          )}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 7. URL Encoder / Decoder
// -------------------------------------------------------------
export function UrlEncodeDecodeTool() {
  const [input, setInput] = useState("https://mytoolpocket.com/search?q=developer tools & category=all");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  useEffect(() => {
    try {
      if (mode === "encode") {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch {
      setOutput("Error: Invalid URI component sequence");
    }
  }, [input, mode]);

  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_#111111] space-y-6">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setMode("encode")}
          className={`px-4 py-2 text-xs font-bold rounded-lg border-2 border-[#111111] transition-all cursor-pointer ${
            mode === "encode"
              ? "bg-[#d9541e] text-[#ffffff] shadow-[2px_2px_0px_#111111]"
              : "bg-[#ffffff] text-[#111111] hover:bg-[#f3eee3]"
          }`}
        >
          URL Encode
        </button>
        <button
          onClick={() => setMode("decode")}
          className={`px-4 py-2 text-xs font-bold rounded-lg border-2 border-[#111111] transition-all cursor-pointer ${
            mode === "decode"
              ? "bg-[#d9541e] text-[#ffffff] shadow-[2px_2px_0px_#111111]"
              : "bg-[#ffffff] text-[#111111] hover:bg-[#f3eee3]"
          }`}
        >
          URL Decode
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <span className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-1.5">Input</span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={8}
            className="w-full p-3 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-mono text-[#111111] focus:outline-none"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#666666]">Result</span>
            <DevCopyButton text={output} label="Copy Result" />
          </div>
          <textarea
            readOnly
            value={output}
            rows={8}
            className="w-full p-3 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-mono text-[#111111] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 8. Regex Tester
// -------------------------------------------------------------
export function RegexTesterTool() {
  const [pattern, setPattern] = useState("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}");
  const [flags, setFlags] = useState({ g: true, i: true, m: false });
  const [testString, setTestString] = useState("Contact us at support@mytoolpocket.com or sales@example.org for inquiries.");
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setError(null);
      let activeFlags = "";
      if (flags.g) activeFlags += "g";
      if (flags.i) activeFlags += "i";
      if (flags.m) activeFlags += "m";

      const regex = new RegExp(pattern, activeFlags);
      const matchResult = testString.match(regex);
      setMatches(matchResult ? Array.from(matchResult) : []);
    } catch (err: any) {
      setError(err.message || "Invalid regular expression pattern");
      setMatches([]);
    }
  }, [pattern, flags, testString]);

  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_#111111] space-y-6">
      <div className="space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#666666]">
          Regular Expression Pattern
        </label>
        <div className="flex items-center gap-2">
          <span className="text-lg font-mono font-bold text-[#777777]">/</span>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            className="flex-1 p-3 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-sm font-mono text-[#111111] focus:outline-none"
            placeholder="[0-9]+"
          />
          <span className="text-lg font-mono font-bold text-[#777777]">/</span>

          <div className="flex items-center gap-1.5 bg-[#f3eee3] border-2 border-[#111111] rounded-xl p-1.5">
            <label className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded cursor-pointer">
              <input
                type="checkbox"
                checked={flags.g}
                onChange={(e) => setFlags({ ...flags, g: e.target.checked })}
                className="w-3.5 h-3.5 accent-[#d9541e]"
              />
              <span>g</span>
            </label>
            <label className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded cursor-pointer">
              <input
                type="checkbox"
                checked={flags.i}
                onChange={(e) => setFlags({ ...flags, i: e.target.checked })}
                className="w-3.5 h-3.5 accent-[#d9541e]"
              />
              <span>i</span>
            </label>
            <label className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded cursor-pointer">
              <input
                type="checkbox"
                checked={flags.m}
                onChange={(e) => setFlags({ ...flags, m: e.target.checked })}
                className="w-3.5 h-3.5 accent-[#d9541e]"
              />
              <span>m</span>
            </label>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border-2 border-red-500 rounded-xl text-xs font-mono text-red-700">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-1.5">
          Test String
        </label>
        <textarea
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          rows={6}
          className="w-full p-3 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-mono text-[#111111] focus:outline-none"
        />
      </div>

      <div className="pt-4 border-t-2 border-[#111111]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#111111]">
            Matches Found ({matches.length})
          </span>
          <DevCopyButton text={matches.join("\n")} label="Copy Matches" />
        </div>
        {matches.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {matches.map((m, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 bg-[#f3eee3] border-2 border-[#111111] rounded-lg text-xs font-mono font-bold text-[#111111] shadow-[2px_2px_0px_#d9541e]"
              >
                {m}
              </span>
            ))}
          </div>
        ) : (
          <div className="text-xs text-[#777777] italic">No pattern matches in test string.</div>
        )}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 9. UUID Generator
// -------------------------------------------------------------
export function UuidGeneratorTool() {
  const [count, setCount] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [uuids, setUuids] = useState<string[]>([]);

  const generateUuidV4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (crypto.getRandomValues(new Uint8Array(1))[0] % 16);
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const handleGenerate = () => {
    const list: string[] = [];
    for (let i = 0; i < count; i++) {
      let id = generateUuidV4();
      if (!hyphens) id = id.replace(/-/g, "");
      if (uppercase) id = id.toUpperCase();
      list.push(id);
    }
    setUuids(list);
  };

  useEffect(() => {
    handleGenerate();
  }, [count, uppercase, hyphens]);

  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_#111111] space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#f3eee3] border-2 border-[#111111] rounded-xl">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-[#111111]">Quantity:</span>
          {[1, 5, 10, 25].map((num) => (
            <button
              key={num}
              onClick={() => setCount(num)}
              className={`px-3 py-1 rounded-lg text-xs font-bold border border-[#111111] transition-all cursor-pointer ${
                count === num
                  ? "bg-[#111111] text-[#ffffff]"
                  : "bg-[#ffffff] text-[#111111] hover:bg-[#e6dfd2]"
              }`}
            >
              {num}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs font-bold text-[#111111]">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="accent-[#d9541e] w-4 h-4"
            />
            <span>UPPERCASE</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={hyphens}
              onChange={(e) => setHyphens(e.target.checked)}
              className="accent-[#d9541e] w-4 h-4"
            />
            <span>Hyphens</span>
          </label>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleGenerate}
            className="px-4 py-2 text-xs font-bold bg-[#d9541e] text-[#ffffff] rounded-lg border border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#bf4514] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Regenerate</span>
          </button>
          <DevCopyButton text={uuids.join("\n")} label="Copy All" />
        </div>
      </div>

      <div className="space-y-2">
        {uuids.map((id, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl hover:bg-[#ffffff] transition-colors"
          >
            <span className="font-mono text-sm font-bold text-[#111111] select-all">{id}</span>
            <DevCopyButton text={id} label="Copy" />
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 10. Hash Generator (SHA-256, SHA-512, SHA-384, SHA-1)
// -------------------------------------------------------------
export function HashGeneratorTool() {
  const [input, setInput] = useState("mytoolpocket");
  const [hashes, setHashes] = useState<{ sha1: string; sha256: string; sha384: string; sha512: string }>({
    sha1: "",
    sha256: "",
    sha384: "",
    sha512: ""
  });

  const computeHash = async (algo: string, text: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest(algo, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  useEffect(() => {
    if (!input) {
      setHashes({ sha1: "", sha256: "", sha384: "", sha512: "" });
      return;
    }
    Promise.all([
      computeHash("SHA-1", input),
      computeHash("SHA-256", input),
      computeHash("SHA-384", input),
      computeHash("SHA-512", input),
    ]).then(([sha1, sha256, sha384, sha512]) => {
      setHashes({ sha1, sha256, sha384, sha512 });
    });
  }, [input]);

  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_#111111] space-y-6">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-1.5">
          Input String or Secret
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to hash..."
          rows={3}
          className="w-full p-3 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-mono text-[#111111] focus:outline-none"
        />
      </div>

      <div className="space-y-4">
        {[
          { label: "SHA-256 (Standard)", value: hashes.sha256, bits: "256-bit" },
          { label: "SHA-512 (High Security)", value: hashes.sha512, bits: "512-bit" },
          { label: "SHA-384", value: hashes.sha384, bits: "384-bit" },
          { label: "SHA-1 (Legacy)", value: hashes.sha1, bits: "160-bit" },
        ].map((h) => (
          <div key={h.label} className="p-3 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#111111] flex items-center gap-2">
                <span>{h.label}</span>
                <span className="text-[10px] text-[#777777] font-mono">({h.bits})</span>
              </span>
              <DevCopyButton text={h.value} label="Copy Hash" />
            </div>
            <div className="font-mono text-xs font-semibold text-[#d9541e] break-all select-all">
              {h.value || "..."}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 11. JWT Decoder
// -------------------------------------------------------------
export function JwtDecoderTool() {
  const sampleJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsZXggRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTY3MjUzMzk5OSwiZXhwIjoxNzk5OTk5OTk5fQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  const [token, setToken] = useState(sampleJwt);
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token.trim()) {
      setHeader("");
      setPayload("");
      setError(null);
      return;
    }
    const parts = token.trim().split(".");
    if (parts.length !== 3) {
      setError("A valid JWT must contain three parts separated by dots (header.payload.signature)");
      setHeader("");
      setPayload("");
      return;
    }
    try {
      const decodeBase64Url = (str: string) => {
        let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
        while (base64.length % 4) base64 += "=";
        return decodeURIComponent(escape(atob(base64)));
      };

      const decodedHeader = JSON.parse(decodeBase64Url(parts[0]));
      const decodedPayload = JSON.parse(decodeBase64Url(parts[1]));

      setHeader(JSON.stringify(decodedHeader, null, 2));
      setPayload(JSON.stringify(decodedPayload, null, 2));
      setError(null);
    } catch {
      setError("Failed to decode token segments: invalid base64url encoding or invalid JSON");
    }
  }, [token]);

  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_#111111] space-y-6">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-1.5">
          Encoded JSON Web Token (JWT)
        </label>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste JWT here (ey...)"
          rows={4}
          className="w-full p-3 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-mono text-[#111111] focus:outline-none"
        />
      </div>

      {error && (
        <div className="p-3 bg-red-50 border-2 border-red-500 rounded-xl text-xs font-mono text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
              Header (Algorithm & Token Type)
            </span>
            <DevCopyButton text={header} label="Copy Header" />
          </div>
          <pre className="p-4 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-mono text-[#111111] overflow-x-auto min-h-[140px]">
            {header || "// Empty or invalid header"}
          </pre>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
              Payload (Data & Claims)
            </span>
            <DevCopyButton text={payload} label="Copy Payload" />
          </div>
          <pre className="p-4 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-mono text-[#111111] overflow-x-auto min-h-[140px]">
            {payload || "// Empty or invalid payload"}
          </pre>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 12. Color Converter
// -------------------------------------------------------------
export function ColorConverterTool() {
  const [hex, setHex] = useState("#d9541e");

  const hexToRgb = (hexStr: string) => {
    let clean = hexStr.replace("#", "");
    if (clean.length === 3) clean = clean.split("").map((c) => c + c).join("");
    const num = parseInt(clean, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  };

  const rgb = useMemo(() => {
    try {
      return hexToRgb(hex);
    } catch {
      return { r: 217, g: 84, b: 30 };
    }
  }, [hex]);

  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslString = useMemo(() => {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  }, [rgb]);

  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_#111111] space-y-6">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div
          className="w-32 h-32 rounded-2xl border-4 border-[#111111] shadow-[4px_4px_0px_#111111] shrink-0"
          style={{ backgroundColor: hex }}
        />
        <div className="space-y-3 flex-1 w-full">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-1">
              Pick Color or Enter HEX
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={hex.startsWith("#") && hex.length === 7 ? hex : "#d9541e"}
                onChange={(e) => setHex(e.target.value)}
                className="w-10 h-10 border-2 border-[#111111] rounded-lg cursor-pointer bg-transparent"
              />
              <input
                type="text"
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                className="p-2.5 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-sm font-mono font-bold text-[#111111]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t-2 border-[#111111]">
        <div className="p-3 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase text-[#777777]">HEX</span>
            <div className="font-mono text-sm font-bold text-[#111111]">{hex.toUpperCase()}</div>
          </div>
          <DevCopyButton text={hex.toUpperCase()} label="Copy" />
        </div>

        <div className="p-3 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase text-[#777777]">RGB</span>
            <div className="font-mono text-sm font-bold text-[#111111]">{rgbString}</div>
          </div>
          <DevCopyButton text={rgbString} label="Copy" />
        </div>

        <div className="p-3 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase text-[#777777]">HSL</span>
            <div className="font-mono text-sm font-bold text-[#111111]">{hslString}</div>
          </div>
          <DevCopyButton text={hslString} label="Copy" />
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 13. CSS Gradient Generator
// -------------------------------------------------------------
export function CssGradientGeneratorTool() {
  const [type, setType] = useState<"linear" | "radial">("linear");
  const [angle, setAngle] = useState(135);
  const [color1, setColor1] = useState("#d9541e");
  const [color2, setColor2] = useState("#111111");

  const gradientCss = type === "linear"
    ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
    : `radial-gradient(circle, ${color1}, ${color2})`;

  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_#111111] space-y-6">
      {/* Live Preview Canvas */}
      <div
        className="w-full h-48 sm:h-64 rounded-2xl border-4 border-[#111111] shadow-[6px_6px_0px_#111111] flex items-center justify-center transition-all"
        style={{ background: gradientCss }}
      >
        <span className="px-4 py-2 bg-[#ffffff]/90 backdrop-blur border-2 border-[#111111] rounded-xl text-xs font-mono font-bold text-[#111111] shadow-[2px_2px_0px_#111111]">
          Live Canvas Preview
        </span>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-1.5">Type</label>
          <div className="flex gap-2">
            <button
              onClick={() => setType("linear")}
              className={`flex-1 py-2 text-xs font-bold rounded-lg border-2 border-[#111111] ${type === "linear" ? "bg-[#111111] text-[#ffffff]" : "bg-[#ffffff] text-[#111111]"}`}
            >
              Linear
            </button>
            <button
              onClick={() => setType("radial")}
              className={`flex-1 py-2 text-xs font-bold rounded-lg border-2 border-[#111111] ${type === "radial" ? "bg-[#111111] text-[#ffffff]" : "bg-[#ffffff] text-[#111111]"}`}
            >
              Radial
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-1.5">Color Stops</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              className="w-10 h-10 border-2 border-[#111111] rounded-lg cursor-pointer"
            />
            <input
              type="color"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              className="w-10 h-10 border-2 border-[#111111] rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {type === "linear" && (
          <div>
            <div className="flex justify-between text-xs font-bold text-[#111111] mb-1.5">
              <span>Angle</span>
              <span>{angle}&deg;</span>
            </div>
            <input
              type="range"
              min={0}
              max={360}
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-full accent-[#d9541e]"
            />
          </div>
        )}
      </div>

      <div className="p-4 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl flex items-center justify-between gap-4">
        <code className="text-xs font-mono font-bold text-[#d9541e] break-all">
          background: {gradientCss};
        </code>
        <DevCopyButton text={`background: ${gradientCss};`} label="Copy CSS" />
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 14. Box Shadow Generator
// -------------------------------------------------------------
export function BoxShadowGeneratorTool() {
  const [x, setX] = useState(6);
  const [y, setY] = useState(6);
  const [blur, setBlur] = useState(0);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState("#111111");

  const shadowCss = `${x}px ${y}px ${blur}px ${spread}px ${color}`;

  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_#111111] space-y-8">
      {/* Visual Preview Box */}
      <div className="py-12 bg-[#f3eee3] border-2 border-[#111111] rounded-2xl flex items-center justify-center">
        <div
          className="w-48 h-32 bg-[#ffffff] border-2 border-[#111111] rounded-xl flex items-center justify-center text-xs font-bold text-[#111111] transition-all"
          style={{ boxShadow: shadowCss }}
        >
          Preview Element
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <div className="flex justify-between text-xs font-bold text-[#111111] mb-1">
            <span>X Offset</span>
            <span>{x}px</span>
          </div>
          <input
            type="range"
            min={-30}
            max={30}
            value={x}
            onChange={(e) => setX(Number(e.target.value))}
            className="w-full accent-[#d9541e]"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-[#111111] mb-1">
            <span>Y Offset</span>
            <span>{y}px</span>
          </div>
          <input
            type="range"
            min={-30}
            max={30}
            value={y}
            onChange={(e) => setY(Number(e.target.value))}
            className="w-full accent-[#d9541e]"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-[#111111] mb-1">
            <span>Blur Radius</span>
            <span>{blur}px</span>
          </div>
          <input
            type="range"
            min={0}
            max={50}
            value={blur}
            onChange={(e) => setBlur(Number(e.target.value))}
            className="w-full accent-[#d9541e]"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-[#111111] mb-1">
            <span>Spread</span>
            <span>{spread}px</span>
          </div>
          <input
            type="range"
            min={-20}
            max={30}
            value={spread}
            onChange={(e) => setSpread(Number(e.target.value))}
            className="w-full accent-[#d9541e]"
          />
        </div>
      </div>

      <div className="p-4 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl flex items-center justify-between gap-4">
        <code className="text-xs font-mono font-bold text-[#d9541e]">
          box-shadow: {shadowCss};
        </code>
        <DevCopyButton text={`box-shadow: ${shadowCss};`} label="Copy CSS" />
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 15. Border Radius Generator
// -------------------------------------------------------------
export function BorderRadiusGeneratorTool() {
  const [all, setAll] = useState(16);
  const [tl, setTl] = useState(16);
  const [tr, setTr] = useState(16);
  const [br, setBr] = useState(16);
  const [bl, setBl] = useState(16);
  const [linked, setLinked] = useState(true);

  const radiusCss = linked
    ? `${all}px`
    : `${tl}px ${tr}px ${br}px ${bl}px`;

  const handleAllChange = (val: number) => {
    setAll(val);
    setTl(val);
    setTr(val);
    setBr(val);
    setBl(val);
  };

  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_#111111] space-y-8">
      {/* Live Preview Element */}
      <div className="py-12 bg-[#f3eee3] border-2 border-[#111111] rounded-2xl flex items-center justify-center">
        <div
          className="w-52 h-36 bg-[#d9541e] border-4 border-[#111111] shadow-[4px_4px_0px_#111111] flex items-center justify-center text-xs font-black text-[#ffffff] transition-all"
          style={{ borderRadius: radiusCss }}
        >
          Curved Shape Preview
        </div>
      </div>

      <div className="flex items-center gap-2">
        <label className="flex items-center gap-2 text-xs font-bold text-[#111111] cursor-pointer">
          <input
            type="checkbox"
            checked={linked}
            onChange={(e) => setLinked(e.target.checked)}
            className="w-4 h-4 accent-[#d9541e]"
          />
          <span>Link all 4 corners uniformly</span>
        </label>
      </div>

      {linked ? (
        <div>
          <div className="flex justify-between text-xs font-bold text-[#111111] mb-1">
            <span>Uniform Border Radius</span>
            <span>{all}px</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={all}
            onChange={(e) => handleAllChange(Number(e.target.value))}
            className="w-full accent-[#d9541e]"
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <div className="flex justify-between text-xs font-bold text-[#111111] mb-1">
              <span>Top Left</span>
              <span>{tl}px</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={tl}
              onChange={(e) => setTl(Number(e.target.value))}
              className="w-full accent-[#d9541e]"
            />
          </div>
          <div>
            <div className="flex justify-between text-xs font-bold text-[#111111] mb-1">
              <span>Top Right</span>
              <span>{tr}px</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={tr}
              onChange={(e) => setTr(Number(e.target.value))}
              className="w-full accent-[#d9541e]"
            />
          </div>
          <div>
            <div className="flex justify-between text-xs font-bold text-[#111111] mb-1">
              <span>Bottom Right</span>
              <span>{br}px</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={br}
              onChange={(e) => setBr(Number(e.target.value))}
              className="w-full accent-[#d9541e]"
            />
          </div>
          <div>
            <div className="flex justify-between text-xs font-bold text-[#111111] mb-1">
              <span>Bottom Left</span>
              <span>{bl}px</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={bl}
              onChange={(e) => setBl(Number(e.target.value))}
              className="w-full accent-[#d9541e]"
            />
          </div>
        </div>
      )}

      <div className="p-4 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl flex items-center justify-between gap-4">
        <code className="text-xs font-mono font-bold text-[#d9541e]">
          border-radius: {radiusCss};
        </code>
        <DevCopyButton text={`border-radius: ${radiusCss};`} label="Copy CSS" />
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 16. Markdown to HTML
// -------------------------------------------------------------
export function MarkdownToHtmlTool() {
  const [md, setMd] = useState(`# Welcome to mytoolpocket\n\nThis is a **clean**, *fast*, and private developer utility.\n\n### Key Features\n- 100% Client-side\n- Zero tracking\n- Instant conversions\n\n> "Simplicity is prerequisite for reliability."\n\nCheckout [mytoolpocket.com](https://mytoolpocket.com) today.`);
  const [viewTab, setViewTab] = useState<"preview" | "code">("preview");

  const htmlOutput = useMemo(() => {
    let html = md;
    // Escaping
    html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    // Headings
    html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
    html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
    html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");
    // Blockquotes
    html = html.replace(/^\> (.*$)/gim, "<blockquote>$1</blockquote>");
    // Bold / Italic
    html = html.replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>");
    html = html.replace(/\*(.*?)\*/gim, "<em>$1</em>");
    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    // Bullet lists
    html = html.replace(/^\- (.*$)/gim, "<li>$1</li>");
    // Paragraphs
    html = html.replace(/\n\n+/g, "</p><p>");
    return `<p>${html}</p>`.replace(/<p><h/g, "<h").replace(/<\/h[1-6]><\/p>/g, (m) => m.replace("</p>", ""));
  }, [md]);

  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_#111111] space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <span className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-2">
            Markdown Source
          </span>
          <textarea
            value={md}
            onChange={(e) => setMd(e.target.value)}
            rows={14}
            className="w-full p-4 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-mono text-[#111111] focus:outline-none"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1 bg-[#f3eee3] border-2 border-[#111111] rounded-lg p-1">
              <button
                onClick={() => setViewTab("preview")}
                className={`px-3 py-1 text-xs font-bold rounded ${viewTab === "preview" ? "bg-[#111111] text-[#ffffff]" : "text-[#555555]"}`}
              >
                Rendered HTML
              </button>
              <button
                onClick={() => setViewTab("code")}
                className={`px-3 py-1 text-xs font-bold rounded ${viewTab === "code" ? "bg-[#111111] text-[#ffffff]" : "text-[#555555]"}`}
              >
                HTML Code
              </button>
            </div>
            <DevCopyButton text={htmlOutput} label="Copy HTML" />
          </div>

          {viewTab === "preview" ? (
            <div
              dangerouslySetInnerHTML={{ __html: htmlOutput }}
              className="prose prose-sm max-w-none p-4 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl min-h-[300px] text-xs text-[#111111] leading-relaxed"
            />
          ) : (
            <textarea
              readOnly
              value={htmlOutput}
              rows={14}
              className="w-full p-4 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-mono text-[#111111] focus:outline-none"
            />
          )}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 17. Unix Timestamp Converter
// -------------------------------------------------------------
export function UnixTimestampConverterTool() {
  const [currentEpoch, setCurrentEpoch] = useState<number>(1731542400);
  const [inputEpoch, setInputEpoch] = useState("1731542400");
  const [convertedDate, setConvertedDate] = useState({ utc: "", local: "" });

  useEffect(() => {
    setCurrentEpoch(Math.floor(Date.now() / 1000));
    const interval = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const num = parseInt(inputEpoch, 10);
    if (!isNaN(num)) {
      // If milliseconds, handle it; if seconds, multiply by 1000
      const millis = num > 9999999999 ? num : num * 1000;
      const d = new Date(millis);
      setConvertedDate({
        utc: d.toUTCString(),
        local: d.toLocaleString(),
      });
    }
  }, [inputEpoch]);

  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_#111111] space-y-6">
      {/* Current Running Timestamp Clock */}
      <div className="p-4 bg-[#f3eee3] border-2 border-[#111111] rounded-xl flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#777777]">
            Current Unix Epoch Timestamp
          </span>
          <div className="text-2xl font-black font-mono text-[#111111]">{currentEpoch}</div>
        </div>
        <DevCopyButton text={currentEpoch.toString()} label="Copy Current" />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-1.5">
            Enter Timestamp (Seconds or Milliseconds)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputEpoch}
              onChange={(e) => setInputEpoch(e.target.value)}
              className="flex-1 p-3 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-sm font-mono font-bold text-[#111111] focus:outline-none"
            />
            <button
              onClick={() => setInputEpoch(currentEpoch.toString())}
              className="px-4 py-2 text-xs font-bold bg-[#111111] text-[#f3eee3] rounded-lg border border-[#111111] hover:bg-[#333333]"
            >
              Use Current
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#777777]">UTC (GMT)</span>
            <div className="font-mono text-sm font-bold text-[#111111]">{convertedDate.utc || "..."}</div>
          </div>
          <div className="p-4 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#777777]">Local Timezone</span>
            <div className="font-mono text-sm font-bold text-[#111111]">{convertedDate.local || "..."}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 18. Cron Expression Generator
// -------------------------------------------------------------
export function CronExpressionGeneratorTool() {
  const [minute, setMinute] = useState("0");
  const [hour, setHour] = useState("0");
  const [dayOfMonth, setDayOfMonth] = useState("*");
  const [month, setMonth] = useState("*");
  const [dayOfWeek, setDayOfWeek] = useState("*");

  const cronString = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;

  const getExplanation = () => {
    if (minute === "*" && hour === "*") return "Runs every minute";
    if (minute === "0" && hour === "*") return "Runs at minute 0 of every hour";
    if (minute === "0" && hour === "0" && dayOfMonth === "*" && dayOfWeek === "*") return "Runs at midnight (00:00) every day";
    if (dayOfWeek === "1") return `Runs at ${hour}:${minute} every Monday`;
    return `Runs at ${hour}:${minute} on scheduled days`;
  };

  const applyPreset = (preset: string) => {
    switch (preset) {
      case "every-minute":
        setMinute("*"); setHour("*"); setDayOfMonth("*"); setMonth("*"); setDayOfWeek("*");
        break;
      case "hourly":
        setMinute("0"); setHour("*"); setDayOfMonth("*"); setMonth("*"); setDayOfWeek("*");
        break;
      case "daily":
        setMinute("0"); setHour("0"); setDayOfMonth("*"); setMonth("*"); setDayOfWeek("*");
        break;
      case "weekly":
        setMinute("0"); setHour("0"); setDayOfMonth("*"); setMonth("*"); setDayOfWeek("1");
        break;
      case "monthly":
        setMinute("0"); setHour("0"); setDayOfMonth("1"); setMonth("*"); setDayOfWeek("*");
        break;
    }
  };

  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_#111111] space-y-6">
      {/* Generated Cron Result Banner */}
      <div className="p-5 bg-[#f3eee3] border-2 border-[#111111] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#777777]">
            Cron Expression
          </span>
          <div className="text-3xl font-black font-mono text-[#d9541e] tracking-wider mt-0.5">
            {cronString}
          </div>
          <p className="text-xs font-semibold text-[#111111] mt-1">{getExplanation()}</p>
        </div>
        <DevCopyButton text={cronString} label="Copy Cron String" />
      </div>

      {/* Presets */}
      <div>
        <span className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-2">
          Quick Presets
        </span>
        <div className="flex flex-wrap gap-2">
          {[
            { id: "every-minute", label: "Every Minute" },
            { id: "hourly", label: "Every Hour" },
            { id: "daily", label: "Daily (Midnight)" },
            { id: "weekly", label: "Weekly (Monday)" },
            { id: "monthly", label: "Monthly (1st of Month)" },
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => applyPreset(p.id)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#ffffff] border-2 border-[#111111] hover:bg-[#111111] hover:text-[#ffffff] transition-colors cursor-pointer"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
        <div>
          <label className="block text-[11px] font-bold text-[#555555] mb-1">Minute</label>
          <input
            type="text"
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            className="w-full p-2.5 bg-[#fdfbf7] border-2 border-[#111111] rounded-lg text-center font-mono font-bold text-xs"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-[#555555] mb-1">Hour</label>
          <input
            type="text"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            className="w-full p-2.5 bg-[#fdfbf7] border-2 border-[#111111] rounded-lg text-center font-mono font-bold text-xs"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-[#555555] mb-1">Day of Month</label>
          <input
            type="text"
            value={dayOfMonth}
            onChange={(e) => setDayOfMonth(e.target.value)}
            className="w-full p-2.5 bg-[#fdfbf7] border-2 border-[#111111] rounded-lg text-center font-mono font-bold text-xs"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-[#555555] mb-1">Month</label>
          <input
            type="text"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full p-2.5 bg-[#fdfbf7] border-2 border-[#111111] rounded-lg text-center font-mono font-bold text-xs"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-[#555555] mb-1">Day of Week</label>
          <input
            type="text"
            value={dayOfWeek}
            onChange={(e) => setDayOfWeek(e.target.value)}
            className="w-full p-2.5 bg-[#fdfbf7] border-2 border-[#111111] rounded-lg text-center font-mono font-bold text-xs"
          />
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 19. Color Picker
// -------------------------------------------------------------
export function ColorPickerTool() {
  const [color, setColor] = useState("#d9541e");

  const shades = useMemo(() => {
    return [
      { label: "100%", val: color },
      { label: "80%", val: `${color}cc` },
      { label: "60%", val: `${color}99` },
      { label: "40%", val: `${color}66` },
      { label: "20%", val: `${color}33` },
    ];
  }, [color]);

  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_#111111] space-y-6">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div
          className="w-36 h-36 rounded-2xl border-4 border-[#111111] shadow-[4px_4px_0px_#111111] shrink-0"
          style={{ backgroundColor: color }}
        />
        <div className="space-y-3 flex-1 w-full">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-1.5">
              Click to Open System Color Palette
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-12 h-12 border-2 border-[#111111] rounded-xl cursor-pointer bg-transparent"
              />
              <input
                type="text"
                value={color.toUpperCase()}
                onChange={(e) => setColor(e.target.value)}
                className="p-3 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl font-mono text-base font-bold text-[#111111]"
              />
              <DevCopyButton text={color.toUpperCase()} label="Copy HEX" />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t-2 border-[#111111]">
        <span className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-3">
          Opacity Variations
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {shades.map((s) => (
            <div
              key={s.label}
              className="p-3 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-center space-y-2"
            >
              <div
                className="w-full h-10 rounded-lg border border-[#111111]"
                style={{ backgroundColor: s.val }}
              />
              <span className="text-xs font-bold text-[#111111] block">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 20. HTML Entity Encoder
// -------------------------------------------------------------
export function HtmlEntityEncoderTool() {
  const [input, setInput] = useState('<div class="header">Hello & Welcome to "mytoolpocket"</div>');
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  useEffect(() => {
    if (mode === "encode") {
      const encoded = input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
      setOutput(encoded);
    } else {
      const decoded = input
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
      setOutput(decoded);
    }
  }, [input, mode]);

  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-8 border-l-[#d9541e] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_#111111] space-y-6">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setMode("encode")}
          className={`px-4 py-2 text-xs font-bold rounded-lg border-2 border-[#111111] transition-all cursor-pointer ${
            mode === "encode"
              ? "bg-[#d9541e] text-[#ffffff] shadow-[2px_2px_0px_#111111]"
              : "bg-[#ffffff] text-[#111111] hover:bg-[#f3eee3]"
          }`}
        >
          Encode Entities
        </button>
        <button
          onClick={() => setMode("decode")}
          className={`px-4 py-2 text-xs font-bold rounded-lg border-2 border-[#111111] transition-all cursor-pointer ${
            mode === "decode"
              ? "bg-[#d9541e] text-[#ffffff] shadow-[2px_2px_0px_#111111]"
              : "bg-[#ffffff] text-[#111111] hover:bg-[#f3eee3]"
          }`}
        >
          Decode Entities
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <span className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-1.5">Input</span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={8}
            className="w-full p-3 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-mono text-[#111111] focus:outline-none"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#666666]">Result</span>
            <DevCopyButton text={output} label="Copy Result" />
          </div>
          <textarea
            readOnly
            value={output}
            rows={8}
            className="w-full p-3 bg-[#fdfbf7] border-2 border-[#111111] rounded-xl text-xs font-mono text-[#111111] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

