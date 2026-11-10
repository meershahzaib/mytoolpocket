"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Copy,
  Check,
  RefreshCw,
  Play,
  Pause,
  RotateCcw,
  Download,
  Volume2,
  Trash2,
  ArrowRightLeft,
  Sliders,
  Sparkles,
  FileText,
  AlertCircle
} from "lucide-react";
import { ToolItem } from "@/data/tools";

interface ToolRendererProps {
  tool: ToolItem;
}

export default function ToolRenderer({ tool }: ToolRendererProps) {
  switch (tool.slug) {
    // 18 Text Tools
    case "word-counter":
      return <WordCounterTool />;
    case "character-counter":
      return <CharacterCounterTool />;
    case "case-converter":
      return <CaseConverterTool />;
    case "lorem-ipsum-generator":
      return <LoremIpsumTool />;
    case "remove-duplicate-lines":
      return <RemoveDuplicateLinesTool />;
    case "text-sorter":
      return <TextSorterTool />;
    case "find-and-replace":
      return <FindAndReplaceTool />;
    case "text-compare":
      return <TextCompareTool />;
    case "reverse-text":
      return <ReverseTextTool />;
    case "remove-extra-spaces":
      return <RemoveExtraSpacesTool />;
    case "remove-line-breaks":
      return <RemoveLineBreaksTool />;
    case "fancy-text-generator":
      return <FancyTextTool />;
    case "morse-code-translator":
      return <MorseCodeTool />;
    case "text-to-binary":
      return <TextToBinaryTool />;
    case "readability-checker":
      return <ReadabilityCheckerTool />;
    case "random-text-generator":
      return <RandomTextGeneratorTool />;
    case "text-repeater":
      return <TextRepeaterTool />;
    case "slug-generator":
      return <SlugGeneratorTool />;

    // Developer & Other Tools
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

// -------------------------------------------------------------
// HELPER: Copy button with feedback
// -------------------------------------------------------------
function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
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
      className="px-3.5 py-1.5 text-xs font-bold bg-[#d9541e] text-[#ffffff] rounded-lg border border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#bf4514] disabled:opacity-50 active:translate-x-0.5 active:translate-y-0.5 transition-all inline-flex items-center gap-1.5"
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      <span>{copied ? "Copied" : label}</span>
    </button>
  );
}

function StatBox({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-3 shadow-[2px_2px_0px_#111111]">
      <div className="text-[10px] font-bold uppercase tracking-wider text-[#777777]">{label}</div>
      <div className="text-lg font-black text-[#111111] mt-0.5 truncate">{value}</div>
    </div>
  );
}

// -------------------------------------------------------------
// 1. WORD COUNTER
// -------------------------------------------------------------
function WordCounterTool() {
  const [text, setText] = useState("");

  const trimmed = text.trim();
  const wordCount = trimmed ? trimmed.split(/\s+/).length : 0;
  const charCount = text.length;
  const charNoSpaces = text.replace(/\s+/g, "").length;
  const sentenceCount = trimmed ? (text.match(/[^.!?]+[.!?]+(\s|$)/g) || [1]).length : 0;
  const paragraphCount = trimmed ? text.split(/\n+/).filter((p) => p.trim().length > 0).length : 0;
  const readingTimeMinutes = Math.ceil(wordCount / 200);
  const speakingTimeMinutes = Math.ceil(wordCount / 130);

  // Word density analysis
  const wordDensity = useMemo(() => {
    if (!trimmed) return [];
    const words = trimmed.toLowerCase().match(/\b[a-zA-Z0-9']+\b/g) || [];
    const freq: Record<string, number> = {};
    for (const w of words) {
      if (w.length > 2) {
        freq[w] = (freq[w] || 0) + 1;
      }
    }
    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);
  }, [trimmed]);

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
          placeholder="Paste or type your content here to count words, characters, and reading time in real time..."
          rows={10}
          className="w-full p-3.5 bg-[#fdfbf7] border border-[#d4ccbd] rounded-lg text-sm text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#111111] font-mono resize-y"
        />
        <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-3 border-t border-[#e6dfd2]">
          <div className="text-xs text-[#666666]">
            Speaking time: ~{speakingTimeMinutes} min | Real-time calculation
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setText("")}
              className="px-3 py-1.5 text-xs font-semibold bg-[#f3eee3] text-[#111111] border border-[#111111] rounded-lg hover:bg-[#e6dfd2]"
            >
              Clear Text
            </button>
            <CopyButton text={text} label="Copy Text" />
          </div>
        </div>
      </div>

      {wordDensity.length > 0 && (
        <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-4 shadow-[2px_2px_0px_#111111]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#666666] mb-2">
            Top Keyword Frequency
          </h3>
          <div className="flex flex-wrap gap-2">
            {wordDensity.map(([w, count]) => (
              <span
                key={w}
                className="px-2.5 py-1 rounded bg-[#f3eee3] border border-[#111111] text-xs font-semibold text-[#111111]"
              >
                {w}: <span className="text-[#d9541e]">{count}x</span> ({Math.round((count / wordCount) * 100)}%)
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 2. CHARACTER COUNTER
// -------------------------------------------------------------
function CharacterCounterTool() {
  const [text, setText] = useState("");

  const totalChars = text.length;
  const noSpaces = text.replace(/\s+/g, "").length;
  const letters = (text.match(/[a-zA-Z]/g) || []).length;
  const numbers = (text.match(/[0-9]/g) || []).length;
  const spaces = (text.match(/\s/g) || []).length;
  const punctuation = (text.match(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'<>@]/g) || []).length;
  const lines = text ? text.split("\n").length : 0;

  const limits = [
    { name: "X (Twitter)", max: 280 },
    { name: "Google Title", max: 60 },
    { name: "Meta Description", max: 160 },
    { name: "SMS Message", max: 160 },
    { name: "Instagram Bio", max: 150 },
    { name: "LinkedIn Post", max: 3000 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <StatBox label="Total Chars" value={totalChars} />
        <StatBox label="No Spaces" value={noSpaces} />
        <StatBox label="Letters" value={letters} />
        <StatBox label="Numbers" value={numbers} />
        <StatBox label="Spaces" value={spaces} />
        <StatBox label="Punctuation" value={punctuation} />
        <StatBox label="Lines" value={lines} />
      </div>

      <div className="bg-[#ffffff] border-2 border-[#111111] rounded-xl p-4 shadow-[3px_3px_0px_#111111]">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type text to inspect detailed character limits and counts..."
          rows={7}
          className="w-full p-3.5 bg-[#fdfbf7] border border-[#d4ccbd] rounded-lg text-sm text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#111111] font-mono resize-y"
        />
        <div className="flex items-center justify-between gap-3 mt-3 pt-3 border-t border-[#e6dfd2]">
          <span className="text-xs text-[#666666]">{totalChars} characters entered</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setText("")}
              className="px-3 py-1.5 text-xs font-semibold bg-[#f3eee3] text-[#111111] border border-[#111111] rounded-lg hover:bg-[#e6dfd2]"
            >
              Clear
            </button>
            <CopyButton text={text} label="Copy Text" />
          </div>
        </div>
      </div>

      <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-5 shadow-[2px_2px_0px_#111111]">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#666666] mb-3">
          Platform Character Limits
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {limits.map((lim) => {
            const isOver = totalChars > lim.max;
            const pct = Math.min(100, Math.round((totalChars / lim.max) * 100));
            return (
              <div
                key={lim.name}
                className="p-3 bg-[#fdfbf7] border border-[#e6dfd2] rounded-lg space-y-1.5"
              >
                <div className="flex justify-between items-center text-xs font-bold">
                  <span>{lim.name}</span>
                  <span className={isOver ? "text-red-600" : "text-[#111111]"}>
                    {totalChars} / {lim.max}
                  </span>
                </div>
                <div className="w-full bg-[#e6dfd2] h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${isOver ? "bg-red-500" : "bg-[#d9541e]"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 3. CASE CONVERTER
// -------------------------------------------------------------
function CaseConverterTool() {
  const [input, setInput] = useState("");

  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
  };

  const toSentenceCase = (str: string) => {
    return str.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase());
  };

  const toCamelCase = (str: string) => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/[\s\-_]+/g, "");
  };

  const toPascalCase = (str: string) => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
      .replace(/[\s\-_]+/g, "");
  };

  const toSnakeCase = (str: string) => {
    return str
      .replace(/\W+/g, " ")
      .trim()
      .split(/ |\B(?=[A-Z])/)
      .map((part) => part.toLowerCase())
      .join("_");
  };

  const toKebabCase = (str: string) => {
    return str
      .replace(/\W+/g, " ")
      .trim()
      .split(/ |\B(?=[A-Z])/)
      .map((part) => part.toLowerCase())
      .join("-");
  };

  const toConstantCase = (str: string) => {
    return toSnakeCase(str).toUpperCase();
  };

  const toAlternatingCase = (str: string) => {
    return str
      .split("")
      .map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()))
      .join("");
  };

  const cases = [
    { label: "UPPERCASE", value: input.toUpperCase() },
    { label: "lowercase", value: input.toLowerCase() },
    { label: "Title Case", value: toTitleCase(input) },
    { label: "Sentence case", value: toSentenceCase(input) },
    { label: "camelCase", value: toCamelCase(input) },
    { label: "PascalCase", value: toPascalCase(input) },
    { label: "snake_case", value: toSnakeCase(input) },
    { label: "kebab-case", value: toKebabCase(input) },
    { label: "CONSTANT_CASE", value: toConstantCase(input) },
    { label: "aLtErNaTiNg cAsE", value: toAlternatingCase(input) }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-[#ffffff] border-2 border-[#111111] rounded-xl p-4 shadow-[3px_3px_0px_#111111]">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-2">
          Source Text
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or paste text to convert cases instantly..."
          rows={5}
          className="w-full p-3 bg-[#fdfbf7] border border-[#d4ccbd] rounded-lg text-sm text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#111111] resize-y"
        />
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-[#777777]">{input.length} characters</span>
          <button
            onClick={() => setInput("")}
            className="px-3 py-1 text-xs font-semibold bg-[#f3eee3] text-[#111111] border border-[#111111] rounded-md hover:bg-[#e6dfd2]"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {cases.map((c) => (
          <div
            key={c.label}
            className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-3.5 shadow-[2px_2px_0px_#111111] space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-[#555555]">{c.label}</span>
              <CopyButton text={c.value} label="Copy" />
            </div>
            <div className="p-2.5 bg-[#fdfbf7] rounded border border-[#e6dfd2] text-xs font-mono text-[#111111] truncate min-h-[38px] flex items-center">
              {c.value || <span className="text-[#999999] italic">Output preview...</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 4. LOREM IPSUM GENERATOR
// -------------------------------------------------------------
function LoremIpsumTool() {
  const [count, setCount] = useState(3);
  const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [generated, setGenerated] = useState("");

  const sampleLatin = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.",
    "Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.",
    "Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula.",
    "Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam.",
    "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
  ];

  const generateText = () => {
    let result = "";
    if (type === "paragraphs") {
      const paras: string[] = [];
      for (let i = 0; i < count; i++) {
        const sentences = [];
        const numSentences = 4 + (i % 3);
        for (let j = 0; j < numSentences; j++) {
          sentences.push(sampleLatin[(i * 3 + j) % sampleLatin.length]);
        }
        paras.push(sentences.join(" "));
      }
      result = paras.join("\n\n");
    } else if (type === "sentences") {
      const sentences: string[] = [];
      for (let i = 0; i < count; i++) {
        sentences.push(sampleLatin[i % sampleLatin.length]);
      }
      result = sentences.join(" ");
    } else {
      const allWords = sampleLatin.join(" ").replace(/[,.]/g, "").split(" ");
      const words: string[] = [];
      for (let i = 0; i < count; i++) {
        words.push(allWords[i % allWords.length]);
      }
      result = words.join(" ") + ".";
    }

    if (!startWithLorem && result.startsWith("Lorem ipsum dolor sit amet")) {
      result = result.replace(/^Lorem ipsum dolor sit amet,?\s*/i, "");
      result = result.charAt(0).toUpperCase() + result.slice(1);
    }
    setGenerated(result);
  };

  useEffect(() => {
    generateText();
  }, [count, type, startWithLorem]);

  return (
    <div className="space-y-6">
      <div className="bg-[#ffffff] border-2 border-[#111111] rounded-xl p-5 shadow-[3px_3px_0px_#111111] space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#111111]">Generate:</span>
            <input
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value))))}
              className="w-20 p-2 bg-[#fdfbf7] border border-[#111111] rounded text-center text-sm font-bold"
            />
          </div>

          <div className="flex items-center gap-2">
            {(["paragraphs", "sentences", "words"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border border-[#111111] capitalize transition-all ${
                  type === t
                    ? "bg-[#111111] text-[#f3eee3] shadow-[2px_2px_0px_#d9541e]"
                    : "bg-[#f3eee3] text-[#111111] hover:bg-[#e6dfd2]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 text-xs font-semibold text-[#111111] cursor-pointer ml-auto">
            <input
              type="checkbox"
              checked={startWithLorem}
              onChange={(e) => setStartWithLorem(e.target.checked)}
              className="accent-[#d9541e] w-4 h-4"
            />
            Start with &quot;Lorem ipsum&quot;
          </label>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#e6dfd2]">
          <button
            onClick={generateText}
            className="px-4 py-2 text-xs font-bold bg-[#d9541e] text-[#ffffff] rounded-lg border border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#bf4514] flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Regenerate Text</span>
          </button>
          <CopyButton text={generated} label="Copy Lorem Ipsum" />
        </div>
      </div>

      <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-5 shadow-[3px_3px_0px_#111111]">
        <textarea
          readOnly
          value={generated}
          rows={10}
          className="w-full p-3.5 bg-[#fdfbf7] border border-[#d4ccbd] rounded-lg text-sm text-[#111111] font-serif leading-relaxed focus:outline-none resize-y"
        />
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 5. REMOVE DUPLICATE LINES
// -------------------------------------------------------------
function RemoveDuplicateLinesTool() {
  const [input, setInput] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [trimLines, setTrimLines] = useState(true);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [sortAlpha, setSortAlpha] = useState(false);

  const { output, originalCount, uniqueCount, removedCount } = useMemo(() => {
    if (!input) {
      return { output: "", originalCount: 0, uniqueCount: 0, removedCount: 0 };
    }
    const rawLines = input.split("\n");
    const originalCount = rawLines.length;

    const seen = new Set<string>();
    const uniqueLines: string[] = [];

    for (let line of rawLines) {
      if (trimLines) line = line.trim();
      if (removeEmpty && line.length === 0) continue;

      const compareKey = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(compareKey)) {
        seen.add(compareKey);
        uniqueLines.push(line);
      }
    }

    if (sortAlpha) {
      uniqueLines.sort((a, b) => a.localeCompare(b));
    }

    return {
      output: uniqueLines.join("\n"),
      originalCount,
      uniqueCount: uniqueLines.length,
      removedCount: originalCount - uniqueLines.length
    };
  }, [input, caseSensitive, trimLines, removeEmpty, sortAlpha]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-3">
        <StatBox label="Original Lines" value={originalCount} />
        <StatBox label="Unique Lines" value={uniqueCount} />
        <StatBox label="Duplicates Removed" value={removedCount} />
      </div>

      <div className="flex flex-wrap items-center gap-4 p-3 bg-[#ffffff] border-2 border-[#111111] rounded-xl text-xs font-semibold">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
            className="accent-[#d9541e] w-4 h-4"
          />
          Case Sensitive
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={trimLines}
            onChange={(e) => setTrimLines(e.target.checked)}
            className="accent-[#d9541e] w-4 h-4"
          />
          Trim Whitespace
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={removeEmpty}
            onChange={(e) => setRemoveEmpty(e.target.checked)}
            className="accent-[#d9541e] w-4 h-4"
          />
          Filter Empty Lines
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={sortAlpha}
            onChange={(e) => setSortAlpha(e.target.checked)}
            className="accent-[#d9541e] w-4 h-4"
          />
          Sort Alphabetically (A-Z)
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#ffffff] border-2 border-[#111111] rounded-xl p-4 shadow-[2px_2px_0px_#111111] space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase text-[#666666]">Input List</span>
            <button
              onClick={() => setInput("")}
              className="text-xs text-[#777777] hover:text-[#111111] underline"
            >
              Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your multiline list here..."
            rows={10}
            className="w-full p-3 bg-[#fdfbf7] border border-[#d4ccbd] rounded-lg text-xs font-mono text-[#111111] focus:outline-none"
          />
        </div>

        <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-4 shadow-[2px_2px_0px_#111111] space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase text-[#666666]">Deduplicated Output</span>
            <CopyButton text={output} label="Copy List" />
          </div>
          <textarea
            readOnly
            value={output}
            placeholder="Clean unique entries will appear here..."
            rows={10}
            className="w-full p-3 bg-[#fdfbf7] border border-[#d4ccbd] rounded-lg text-xs font-mono text-[#111111] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 6. TEXT SORTER
// -------------------------------------------------------------
function TextSorterTool() {
  const [input, setInput] = useState("");
  const [sortType, setSortType] = useState<"az" | "za" | "lengthAsc" | "lengthDesc" | "reverse" | "shuffle">("az");
  const [trimWhitespace, setTrimWhitespace] = useState(true);
  const [removeBlank, setRemoveBlank] = useState(true);

  const sortedOutput = useMemo(() => {
    if (!input) return "";
    let lines = input.split("\n");
    if (trimWhitespace) lines = lines.map((l) => l.trim());
    if (removeBlank) lines = lines.filter((l) => l.length > 0);

    const copy = [...lines];
    if (sortType === "az") {
      copy.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
    } else if (sortType === "za") {
      copy.sort((a, b) => b.localeCompare(a, undefined, { numeric: true, sensitivity: "base" }));
    } else if (sortType === "lengthAsc") {
      copy.sort((a, b) => a.length - b.length || a.localeCompare(b));
    } else if (sortType === "lengthDesc") {
      copy.sort((a, b) => b.length - a.length || a.localeCompare(b));
    } else if (sortType === "reverse") {
      copy.reverse();
    } else if (sortType === "shuffle") {
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
    }
    return copy.join("\n");
  }, [input, sortType, trimWhitespace, removeBlank]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-[#111111] mr-1">Sort Mode:</span>
        {[
          { id: "az", label: "A to Z" },
          { id: "za", label: "Z to A" },
          { id: "lengthAsc", label: "Length (Shortest)" },
          { id: "lengthDesc", label: "Length (Longest)" },
          { id: "reverse", label: "Reverse Order" },
          { id: "shuffle", label: "Shuffle / Random" }
        ].map((s) => (
          <button
            key={s.id}
            onClick={() => setSortType(s.id as any)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg border border-[#111111] transition-all ${
              sortType === s.id
                ? "bg-[#d9541e] text-[#ffffff] shadow-[2px_2px_0px_#111111]"
                : "bg-[#ffffff] text-[#111111] hover:bg-[#e6dfd2]"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#ffffff] border-2 border-[#111111] rounded-xl p-4 shadow-[2px_2px_0px_#111111] space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase text-[#666666]">Unsorted Input</span>
            <button
              onClick={() => setInput("")}
              className="text-xs text-[#777777] hover:text-[#111111] underline"
            >
              Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Apple&#10;Orange&#10;Banana&#10;Grape"
            rows={10}
            className="w-full p-3 bg-[#fdfbf7] border border-[#d4ccbd] rounded-lg text-xs font-mono text-[#111111] focus:outline-none"
          />
        </div>

        <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-4 shadow-[2px_2px_0px_#111111] space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase text-[#666666]">Sorted Output</span>
            <CopyButton text={sortedOutput} label="Copy Sorted" />
          </div>
          <textarea
            readOnly
            value={sortedOutput}
            placeholder="Sorted results appear here..."
            rows={10}
            className="w-full p-3 bg-[#fdfbf7] border border-[#d4ccbd] rounded-lg text-xs font-mono text-[#111111] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 7. FIND AND REPLACE
// -------------------------------------------------------------
function FindAndReplaceTool() {
  const [text, setText] = useState("");
  const [findStr, setFindStr] = useState("");
  const [replaceStr, setReplaceStr] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [useRegex, setUseRegex] = useState(false);

  const { output, matchCount, error } = useMemo(() => {
    if (!text || !findStr) {
      return { output: text, matchCount: 0, error: null };
    }
    try {
      let pattern = findStr;
      if (!useRegex) {
        pattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        if (wholeWord) {
          pattern = `\\b${pattern}\\b`;
        }
      }
      const flags = caseSensitive ? "g" : "gi";
      const regex = new RegExp(pattern, flags);
      const matches = text.match(regex);
      const matchCount = matches ? matches.length : 0;
      const output = text.replace(regex, replaceStr);
      return { output, matchCount, error: null };
    } catch (err: any) {
      return { output: text, matchCount: 0, error: err.message };
    }
  }, [text, findStr, replaceStr, caseSensitive, wholeWord, useRegex]);

  return (
    <div className="space-y-5">
      <div className="bg-[#ffffff] border-2 border-[#111111] rounded-xl p-5 shadow-[3px_3px_0px_#111111] space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-[#666666] mb-1">Find Text</label>
            <input
              type="text"
              value={findStr}
              onChange={(e) => setFindStr(e.target.value)}
              placeholder="Word or pattern to search..."
              className="w-full p-2.5 bg-[#fdfbf7] border border-[#111111] rounded-lg text-xs font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-[#666666] mb-1">Replace With</label>
            <input
              type="text"
              value={replaceStr}
              onChange={(e) => setReplaceStr(e.target.value)}
              placeholder="Replacement text..."
              className="w-full p-2.5 bg-[#fdfbf7] border border-[#111111] rounded-lg text-xs font-mono"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#e6dfd2]">
          <div className="flex items-center gap-4 text-xs font-semibold">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={caseSensitive}
                onChange={(e) => setCaseSensitive(e.target.checked)}
                className="accent-[#d9541e] w-4 h-4"
              />
              Case Sensitive
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={wholeWord}
                disabled={useRegex}
                onChange={(e) => setWholeWord(e.target.checked)}
                className="accent-[#d9541e] w-4 h-4 disabled:opacity-40"
              />
              Whole Words Only
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={useRegex}
                onChange={(e) => setUseRegex(e.target.checked)}
                className="accent-[#d9541e] w-4 h-4"
              />
              Use RegEx
            </label>
          </div>

          <div className="text-xs font-bold">
            Matches found: <span className="text-[#d9541e]">{matchCount}</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-700 text-xs rounded border border-red-400 font-mono">
          RegEx Error: {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#ffffff] border-2 border-[#111111] rounded-xl p-4 shadow-[2px_2px_0px_#111111] space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase text-[#666666]">Original Content</span>
            <button
              onClick={() => setText("")}
              className="text-xs text-[#777777] hover:text-[#111111] underline"
            >
              Clear
            </button>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your source text here..."
            rows={9}
            className="w-full p-3 bg-[#fdfbf7] border border-[#d4ccbd] rounded-lg text-xs font-mono text-[#111111] focus:outline-none"
          />
        </div>

        <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-4 shadow-[2px_2px_0px_#111111] space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase text-[#666666]">Replaced Output</span>
            <CopyButton text={output} label="Copy Output" />
          </div>
          <textarea
            readOnly
            value={output}
            placeholder="Result will appear here with replacements applied..."
            rows={9}
            className="w-full p-3 bg-[#fdfbf7] border border-[#d4ccbd] rounded-lg text-xs font-mono text-[#111111] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 8. TEXT DIFF CHECKER (text-compare)
// -------------------------------------------------------------
function TextCompareTool() {
  const [original, setOriginal] = useState("Hello world\nThis is the original line 2\nLine 3 unchanged\nLine 4 to be removed");
  const [modified, setModified] = useState("Hello beautiful world\nThis is the original line 2\nLine 3 unchanged\nLine 5 newly added");

  const diffResult = useMemo(() => {
    const origLines = original.split("\n");
    const modLines = modified.split("\n");

    const maxLines = Math.max(origLines.length, modLines.length);
    const rows = [];
    let added = 0;
    let deleted = 0;
    let unchanged = 0;

    for (let i = 0; i < maxLines; i++) {
      const o = origLines[i];
      const m = modLines[i];

      if (o === m) {
        rows.push({ type: "same", original: o, modified: m });
        unchanged++;
      } else if (o !== undefined && m !== undefined) {
        rows.push({ type: "changed", original: o, modified: m });
        deleted++;
        added++;
      } else if (o !== undefined) {
        rows.push({ type: "deleted", original: o, modified: "" });
        deleted++;
      } else {
        rows.push({ type: "added", original: "", modified: m });
        added++;
      }
    }

    return { rows, added, deleted, unchanged };
  }, [original, modified]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-3">
        <StatBox label="Added Lines" value={`+${diffResult.added}`} />
        <StatBox label="Removed Lines" value={`-${diffResult.deleted}`} />
        <StatBox label="Identical Lines" value={diffResult.unchanged} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#ffffff] border-2 border-[#111111] rounded-xl p-4 shadow-[2px_2px_0px_#111111] space-y-2">
          <span className="block text-xs font-bold uppercase text-[#666666]">Original Text</span>
          <textarea
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            rows={7}
            className="w-full p-3 bg-[#fdfbf7] border border-[#d4ccbd] rounded-lg text-xs font-mono text-[#111111]"
          />
        </div>

        <div className="bg-[#ffffff] border-2 border-[#111111] rounded-xl p-4 shadow-[2px_2px_0px_#111111] space-y-2">
          <span className="block text-xs font-bold uppercase text-[#666666]">Modified Text</span>
          <textarea
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            rows={7}
            className="w-full p-3 bg-[#fdfbf7] border border-[#d4ccbd] rounded-lg text-xs font-mono text-[#111111]"
          />
        </div>
      </div>

      {/* Visual Diff Table */}
      <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-4 shadow-[3px_3px_0px_#111111] space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#666666]">
            Side-by-Side Comparison Diff
          </h3>
          <div className="flex items-center gap-3 text-xs font-semibold">
            <span className="flex items-center gap-1 text-green-700">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-sm" /> Addition
            </span>
            <span className="flex items-center gap-1 text-red-700">
              <span className="w-2.5 h-2.5 bg-red-500 rounded-sm" /> Deletion
            </span>
          </div>
        </div>

        <div className="border border-[#111111] rounded-lg overflow-x-auto text-xs font-mono">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#f3eee3] border-b border-[#111111] text-left">
                <th className="p-2 border-r border-[#111111] w-1/2">Original</th>
                <th className="p-2 w-1/2">Modified</th>
              </tr>
            </thead>
            <tbody>
              {diffResult.rows.map((row, idx) => {
                let leftBg = "";
                let rightBg = "";
                if (row.type === "changed") {
                  leftBg = "bg-red-100 text-red-900";
                  rightBg = "bg-green-100 text-green-900";
                } else if (row.type === "deleted") {
                  leftBg = "bg-red-100 text-red-900";
                } else if (row.type === "added") {
                  rightBg = "bg-green-100 text-green-900";
                }

                return (
                  <tr key={idx} className="border-b border-[#e6dfd2]">
                    <td className={`p-2 border-r border-[#e6dfd2] ${leftBg}`}>
                      {row.original ? `- ${row.original}` : ""}
                    </td>
                    <td className={`p-2 ${rightBg}`}>
                      {row.modified ? `+ ${row.modified}` : ""}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 9. REVERSE TEXT
// -------------------------------------------------------------
function ReverseTextTool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"chars" | "words" | "lines" | "upsideDown">("chars");

  const upsideDownMap: Record<string, string> = {
    a: "\u0250", b: "q", c: "\u0254", d: "p", e: "\u01DD", f: "\u025F", g: "\u0183", h: "\u0265",
    i: "\u0131", j: "\u027E", k: "\u029E", l: "l", m: "\u026F", n: "u", o: "o", p: "d", q: "b",
    r: "\u0279", s: "s", t: "\u0287", u: "n", v: "\u028C", w: "\u028D", x: "x", y: "\u028E", z: "z",
    A: "\u2200", B: "ᗺ", C: "\u0186", D: "ᗡ", E: "\u018E", F: "\u2132", G: "\u2141", H: "H",
    I: "I", J: "\u017F", K: "\u22CA", L: "\u2142", M: "W", N: "N", O: "O", P: "\u0500", Q: "\u038C",
    R: "\u1D1A", S: "S", T: "\u22A5", U: "\u2229", V: "\u039B", W: "M", X: "X", Y: "\u2144", Z: "Z",
    "1": "\u21C2", "2": "\u1105", "3": "\u0190", "4": "\u3123", "5": "\u03DB", "6": "9", "7": "\u3125",
    "8": "8", "9": "6", "0": "0", ".": "\u02D9", ",": "'", "'": ",", "\"": ",,", "!": "\u00A1",
    "?": "\u00BF", "<": ">", ">": "<", "&": "\u214B"
  };

  const output = useMemo(() => {
    if (!input) return "";
    if (mode === "chars") {
      return input.split("").reverse().join("");
    } else if (mode === "words") {
      return input
        .split("\n")
        .map((line) => line.split(/\s+/).reverse().join(" "))
        .join("\n");
    } else if (mode === "lines") {
      return input.split("\n").reverse().join("\n");
    } else {
      return input
        .split("")
        .reverse()
        .map((c) => upsideDownMap[c] || c)
        .join("");
    }
  }, [input, mode]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-[#111111] mr-1">Reverse Mode:</span>
        {[
          { id: "chars", label: "Reverse Entire Text" },
          { id: "words", label: "Reverse Words" },
          { id: "lines", label: "Reverse Lines" },
          { id: "upsideDown", label: "Flip Upside Down" }
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id as any)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg border border-[#111111] transition-all ${
              mode === m.id
                ? "bg-[#d9541e] text-[#ffffff] shadow-[2px_2px_0px_#111111]"
                : "bg-[#ffffff] text-[#111111] hover:bg-[#e6dfd2]"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#ffffff] border-2 border-[#111111] rounded-xl p-4 shadow-[2px_2px_0px_#111111] space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase text-[#666666]">Input Text</span>
            <button
              onClick={() => setInput("")}
              className="text-xs text-[#777777] hover:text-[#111111] underline"
            >
              Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste text to reverse..."
            rows={8}
            className="w-full p-3 bg-[#fdfbf7] border border-[#d4ccbd] rounded-lg text-xs font-mono text-[#111111] focus:outline-none"
          />
        </div>

        <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-4 shadow-[2px_2px_0px_#111111] space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase text-[#666666]">Reversed Result</span>
            <CopyButton text={output} label="Copy Result" />
          </div>
          <textarea
            readOnly
            value={output}
            placeholder="Reversed text will appear here..."
            rows={8}
            className="w-full p-3 bg-[#fdfbf7] border border-[#d4ccbd] rounded-lg text-xs font-mono text-[#111111] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 10. REMOVE EXTRA SPACES
// -------------------------------------------------------------
function RemoveExtraSpacesTool() {
  const [input, setInput] = useState("");
  const [collapseSpaces, setCollapseSpaces] = useState(true);
  const [trimLines, setTrimLines] = useState(true);
  const [removeBlank, setRemoveBlank] = useState(false);
  const [convertTabs, setConvertTabs] = useState(true);

  const output = useMemo(() => {
    if (!input) return "";
    let result = input;
    if (convertTabs) {
      result = result.replace(/\t+/g, " ");
    }
    if (collapseSpaces) {
      result = result.replace(/ {2,}/g, " ");
    }
    let lines = result.split("\n");
    if (trimLines) {
      lines = lines.map((l) => l.trim());
    }
    if (removeBlank) {
      lines = lines.filter((l) => l.length > 0);
    }
    return lines.join("\n");
  }, [input, collapseSpaces, trimLines, removeBlank, convertTabs]);

  const charsSaved = Math.max(0, input.length - output.length);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-3">
        <StatBox label="Initial Length" value={input.length} />
        <StatBox label="Cleaned Length" value={output.length} />
        <StatBox label="Spaces Saved" value={charsSaved} />
      </div>

      <div className="flex flex-wrap items-center gap-4 p-3 bg-[#ffffff] border-2 border-[#111111] rounded-xl text-xs font-semibold">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={collapseSpaces}
            onChange={(e) => setCollapseSpaces(e.target.checked)}
            className="accent-[#d9541e] w-4 h-4"
          />
          Collapse Multiple Spaces to Single
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={trimLines}
            onChange={(e) => setTrimLines(e.target.checked)}
            className="accent-[#d9541e] w-4 h-4"
          />
          Trim Line Start and End
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={convertTabs}
            onChange={(e) => setConvertTabs(e.target.checked)}
            className="accent-[#d9541e] w-4 h-4"
          />
          Convert Tabs to Spaces
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={removeBlank}
            onChange={(e) => setRemoveBlank(e.target.checked)}
            className="accent-[#d9541e] w-4 h-4"
          />
          Remove Blank Lines
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#ffffff] border-2 border-[#111111] rounded-xl p-4 shadow-[2px_2px_0px_#111111] space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase text-[#666666]">Input with Extra Spaces</span>
            <button
              onClick={() => setInput("")}
              className="text-xs text-[#777777] hover:text-[#111111] underline"
            >
              Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste text with   irregular   spaces here..."
            rows={8}
            className="w-full p-3 bg-[#fdfbf7] border border-[#d4ccbd] rounded-lg text-xs font-mono text-[#111111] focus:outline-none"
          />
        </div>

        <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-4 shadow-[2px_2px_0px_#111111] space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase text-[#666666]">Sanitized Result</span>
            <CopyButton text={output} label="Copy Clean Text" />
          </div>
          <textarea
            readOnly
            value={output}
            placeholder="Cleaned single-spaced output..."
            rows={8}
            className="w-full p-3 bg-[#fdfbf7] border border-[#d4ccbd] rounded-lg text-xs font-mono text-[#111111] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 11. REMOVE LINE BREAKS
// -------------------------------------------------------------
function RemoveLineBreaksTool() {
  const [input, setInput] = useState("");
  const [separator, setSeparator] = useState<"space" | "comma" | "semicolon" | "none">("space");
  const [preserveParagraphs, setPreserveParagraphs] = useState(true);

  const output = useMemo(() => {
    if (!input) return "";
    const sep = separator === "space" ? " " : separator === "comma" ? ", " : separator === "semicolon" ? "; " : "";

    if (preserveParagraphs) {
      const paragraphs = input.split(/\n\s*\n/);
      const cleaned = paragraphs.map((p) => p.replace(/\r?\n|\r/g, sep).replace(/\s+/g, " ").trim());
      return cleaned.join("\n\n");
    } else {
      return input.replace(/\r?\n|\r/g, sep).replace(/\s+/g, " ").trim();
    }
  }, [input, separator, preserveParagraphs]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#ffffff] border-2 border-[#111111] rounded-xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#111111]">Replace Breaks with:</span>
          {[
            { id: "space", label: "Space" },
            { id: "comma", label: "Comma (,)" },
            { id: "semicolon", label: "Semicolon (;)" },
            { id: "none", label: "No Space" }
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setSeparator(s.id as any)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border border-[#111111] transition-all ${
                separator === s.id
                  ? "bg-[#d9541e] text-[#ffffff] shadow-[2px_2px_0px_#111111]"
                  : "bg-[#f3eee3] text-[#111111] hover:bg-[#e6dfd2]"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-xs font-semibold text-[#111111] cursor-pointer">
          <input
            type="checkbox"
            checked={preserveParagraphs}
            onChange={(e) => setPreserveParagraphs(e.target.checked)}
            className="accent-[#d9541e] w-4 h-4"
          />
          Preserve Paragraph Breaks
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#ffffff] border-2 border-[#111111] rounded-xl p-4 shadow-[2px_2px_0px_#111111] space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase text-[#666666]">Fragmented Text</span>
            <button
              onClick={() => setInput("")}
              className="text-xs text-[#777777] hover:text-[#111111] underline"
            >
              Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste text copied from PDF or email with unwanted line breaks..."
            rows={9}
            className="w-full p-3 bg-[#fdfbf7] border border-[#d4ccbd] rounded-lg text-xs font-mono text-[#111111] focus:outline-none"
          />
        </div>

        <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-4 shadow-[2px_2px_0px_#111111] space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase text-[#666666]">Unified Paragraph Output</span>
            <CopyButton text={output} label="Copy Output" />
          </div>
          <textarea
            readOnly
            value={output}
            placeholder="Clean joined paragraph text will appear here..."
            rows={9}
            className="w-full p-3 bg-[#fdfbf7] border border-[#d4ccbd] rounded-lg text-xs font-mono text-[#111111] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 12. FANCY TEXT GENERATOR
// -------------------------------------------------------------
function FancyTextTool() {
  const [input, setInput] = useState("Hello World");

  // Unicode font mapping functions
  const transform = (str: string, lowerStart: number, upperStart: number) => {
    return str
      .split("")
      .map((c) => {
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) {
          return String.fromCodePoint(upperStart + (code - 65));
        }
        if (code >= 97 && code <= 122) {
          return String.fromCodePoint(lowerStart + (code - 97));
        }
        return c;
      })
      .join("");
  };

  const boldSerif = (str: string) => transform(str, 0x1d41a, 0x1d400);
  const boldSans = (str: string) => transform(str, 0x1d5ee, 0x1d5d4);
  const italicSerif = (str: string) => transform(str, 0x1d44e, 0x1d434);
  const monospace = (str: string) => transform(str, 0x1d68a, 0x1d670);
  const doubleStruck = (str: string) => transform(str, 0x1d55c, 0x1d538);

  const circled = (str: string) => {
    return str
      .split("")
      .map((c) => {
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCodePoint(0x24b6 + (code - 65));
        if (code >= 97 && code <= 122) return String.fromCodePoint(0x24d0 + (code - 97));
        if (code >= 49 && code <= 57) return String.fromCodePoint(0x2460 + (code - 49));
        return c;
      })
      .join("");
  };

  const smallCaps = (str: string) => {
    const map: Record<string, string> = {
      a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ", f: "ꜰ", g: "ɢ", h: "ʜ", i: "ɪ",
      j: "ᴊ", k: "ᴋ", l: "ʟ", m: "ᴍ", n: "ɴ", o: "ᴏ", p: "ᴘ", q: "ꞯ", r: "ʀ",
      s: "ꜱ", t: "ᴛ", u: "ᴜ", v: "ᴠ", w: "ᴡ", x: "x", y: "ʏ", z: "ᴢ"
    };
    return str
      .split("")
      .map((c) => map[c.toLowerCase()] || c)
      .join("");
  };

  const styles = [
    { name: "Bold Serif", val: boldSerif(input) },
    { name: "Bold Sans-Serif", val: boldSans(input) },
    { name: "Italic Serif", val: italicSerif(input) },
    { name: "Monospace", val: monospace(input) },
    { name: "Double-Struck (Blackboard)", val: doubleStruck(input) },
    { name: "Circled Letters", val: circled(input) },
    { name: "Small Capitals", val: smallCaps(input) }
  ];

  return (
    <div className="space-y-5">
      <div className="bg-[#ffffff] border-2 border-[#111111] rounded-xl p-4 shadow-[3px_3px_0px_#111111]">
        <label className="block text-xs font-bold uppercase text-[#666666] mb-1.5">
          Type Your Text Below
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to style with cool fonts..."
          className="w-full p-3 bg-[#fdfbf7] border border-[#111111] rounded-lg text-sm font-medium"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {styles.map((s) => (
          <div
            key={s.name}
            className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-4 shadow-[2px_2px_0px_#111111] flex flex-col justify-between"
          >
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#777777] block mb-1">
                {s.name}
              </span>
              <div className="text-base text-[#111111] break-all py-1.5">
                {s.val || <span className="text-[#999999] italic">Preview...</span>}
              </div>
            </div>
            <div className="pt-2 border-t border-[#f3eee3] flex justify-end">
              <CopyButton text={s.val} label="Copy Style" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 13. MORSE CODE TRANSLATOR
// -------------------------------------------------------------
function MorseCodeTool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"textToMorse" | "morseToText">("textToMorse");

  const morseMap: Record<string, string> = {
    A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....",
    I: "..", J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.",
    Q: "--.-", R: ".-.", S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
    Y: "-.--", Z: "--..", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
    "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.", "0": "-----",
    ".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.", "!": "-.-.--",
    "/": "-..-.", "(": "-.--.", ")": "-.--.-", "&": ".-...", ":": "---...",
    ";": "-.-.-.", "=": "-...-", "+": ".-.-.", "-": "-....-", "_": "..--.-",
    "\"": ".-..-.", "$": "...-..-", "@": ".--.-.", " ": "/"
  };

  const reverseMorseMap = useMemo(() => {
    const rev: Record<string, string> = {};
    for (const [char, code] of Object.entries(morseMap)) {
      rev[code] = char;
    }
    return rev;
  }, []);

  const output = useMemo(() => {
    if (!input) return "";
    if (mode === "textToMorse") {
      return input
        .toUpperCase()
        .split("")
        .map((c) => morseMap[c] || c)
        .join(" ");
    } else {
      return input
        .trim()
        .split(/\s+/)
        .map((code) => (code === "/" ? " " : reverseMorseMap[code] || "?"))
        .join("");
    }
  }, [input, mode, reverseMorseMap]);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            setMode("textToMorse");
            setInput("");
          }}
          className={`px-4 py-2 text-xs font-bold rounded-lg border border-[#111111] transition-all ${
            mode === "textToMorse"
              ? "bg-[#d9541e] text-[#ffffff] shadow-[2px_2px_0px_#111111]"
              : "bg-[#ffffff] text-[#111111] hover:bg-[#e6dfd2]"
          }`}
        >
          Text to Morse Code
        </button>
        <button
          onClick={() => {
            setMode("morseToText");
            setInput("");
          }}
          className={`px-4 py-2 text-xs font-bold rounded-lg border border-[#111111] transition-all ${
            mode === "morseToText"
              ? "bg-[#d9541e] text-[#ffffff] shadow-[2px_2px_0px_#111111]"
              : "bg-[#ffffff] text-[#111111] hover:bg-[#e6dfd2]"
          }`}
        >
          Morse Code to Text
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#ffffff] border-2 border-[#111111] rounded-xl p-4 shadow-[2px_2px_0px_#111111] space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase text-[#666666]">
              {mode === "textToMorse" ? "Plain Text Input" : "Morse Input (dots & dashes)"}
            </span>
            <button
              onClick={() => setInput("")}
              className="text-xs text-[#777777] hover:text-[#111111] underline"
            >
              Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "textToMorse" ? "Type English text here (e.g. SOS)..." : "Paste Morse code here (e.g. ... --- ...)..."}
            rows={8}
            className="w-full p-3 bg-[#fdfbf7] border border-[#d4ccbd] rounded-lg text-xs font-mono text-[#111111] focus:outline-none"
          />
        </div>

        <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-4 shadow-[2px_2px_0px_#111111] space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase text-[#666666]">Translation Output</span>
            <CopyButton text={output} label="Copy Translation" />
          </div>
          <textarea
            readOnly
            value={output}
            placeholder="Translation will appear here..."
            rows={8}
            className="w-full p-3 bg-[#fdfbf7] border border-[#d4ccbd] rounded-lg text-xs font-mono text-[#111111] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 14. TEXT TO BINARY
// -------------------------------------------------------------
function TextToBinaryTool() {
  const [input, setInput] = useState("Hello");
  const [mode, setMode] = useState<"textToBinary" | "binaryToText">("textToBinary");

  const output = useMemo(() => {
    if (!input) return "";
    if (mode === "textToBinary") {
      return input
        .split("")
        .map((c) => c.charCodeAt(0).toString(2).padStart(8, "0"))
        .join(" ");
    } else {
      return input
        .trim()
        .split(/\s+/)
        .map((bin) => {
          const num = parseInt(bin, 2);
          return isNaN(num) ? "" : String.fromCharCode(num);
        })
        .join("");
    }
  }, [input, mode]);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            setMode("textToBinary");
            setInput("");
          }}
          className={`px-4 py-2 text-xs font-bold rounded-lg border border-[#111111] transition-all ${
            mode === "textToBinary"
              ? "bg-[#d9541e] text-[#ffffff] shadow-[2px_2px_0px_#111111]"
              : "bg-[#ffffff] text-[#111111] hover:bg-[#e6dfd2]"
          }`}
        >
          Text to Binary (8-bit)
        </button>
        <button
          onClick={() => {
            setMode("binaryToText");
            setInput("");
          }}
          className={`px-4 py-2 text-xs font-bold rounded-lg border border-[#111111] transition-all ${
            mode === "binaryToText"
              ? "bg-[#d9541e] text-[#ffffff] shadow-[2px_2px_0px_#111111]"
              : "bg-[#ffffff] text-[#111111] hover:bg-[#e6dfd2]"
          }`}
        >
          Binary to Text
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#ffffff] border-2 border-[#111111] rounded-xl p-4 shadow-[2px_2px_0px_#111111] space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase text-[#666666]">
              {mode === "textToBinary" ? "Plain Text Input" : "8-bit Binary Input"}
            </span>
            <button
              onClick={() => setInput("")}
              className="text-xs text-[#777777] hover:text-[#111111] underline"
            >
              Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "textToBinary" ? "Type or paste text..." : "Paste binary code (e.g. 01001000 01101001)..."}
            rows={8}
            className="w-full p-3 bg-[#fdfbf7] border border-[#d4ccbd] rounded-lg text-xs font-mono text-[#111111] focus:outline-none"
          />
        </div>

        <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-4 shadow-[2px_2px_0px_#111111] space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase text-[#666666]">Converted Output</span>
            <CopyButton text={output} label="Copy Binary" />
          </div>
          <textarea
            readOnly
            value={output}
            placeholder="Result will appear here..."
            rows={8}
            className="w-full p-3 bg-[#fdfbf7] border border-[#d4ccbd] rounded-lg text-xs font-mono text-[#111111] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 15. READABILITY CHECKER
// -------------------------------------------------------------
function ReadabilityCheckerTool() {
  const [text, setText] = useState("The quick brown fox jumps over the lazy dog. Writing clear and accessible sentences helps readers understand your message quickly and reduces cognitive strain.");

  // Simple syllable counter
  const countSyllables = (word: string) => {
    word = word.toLowerCase().replace(/[^a-z]/g, "");
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]|ed|es|e)$/, "");
    word = word.replace(/^y/, "");
    const syllables = word.match(/[aeiouy]{1,2}/g);
    return syllables ? syllables.length : 1;
  };

  const metrics = useMemo(() => {
    if (!text.trim()) {
      return { score: 0, grade: 0, words: 0, sentences: 0, syllables: 0, label: "No text entered" };
    }
    const wordsArr = text.trim().match(/\b[a-zA-Z']+\b/g) || [];
    const totalWords = wordsArr.length;
    if (totalWords === 0) return { score: 0, grade: 0, words: 0, sentences: 0, syllables: 0, label: "No words" };

    const sentenceMatches = text.match(/[^.!?]+[.!?]+(\s|$)/g) || [text];
    const totalSentences = Math.max(1, sentenceMatches.length);

    let totalSyllables = 0;
    for (const w of wordsArr) {
      totalSyllables += countSyllables(w);
    }

    // Flesch Reading Ease Formula: 206.835 - 1.015 * (total_words / total_sentences) - 84.6 * (total_syllables / total_words)
    const rawScore = 206.835 - 1.015 * (totalWords / totalSentences) - 84.6 * (totalSyllables / totalWords);
    const score = Math.max(0, Math.min(100, Math.round(rawScore)));

    // Flesch-Kincaid Grade Level Formula: 0.39 * (total_words / total_sentences) + 11.8 * (total_syllables / total_words) - 15.59
    const rawGrade = 0.39 * (totalWords / totalSentences) + 11.8 * (totalSyllables / totalWords) - 15.59;
    const grade = Math.max(1, Math.round(rawGrade * 10) / 10);

    let label = "Standard";
    if (score >= 90) label = "Very Easy (5th Grade)";
    else if (score >= 80) label = "Easy (6th Grade)";
    else if (score >= 70) label = "Fairly Easy (7th Grade)";
    else if (score >= 60) label = "Standard (8th-9th Grade)";
    else if (score >= 50) label = "Fairly Difficult (High School)";
    else if (score >= 30) label = "Difficult (College Level)";
    else label = "Very Confusing (Graduate Level)";

    return { score, grade, words: totalWords, sentences: totalSentences, syllables: totalSyllables, label };
  }, [text]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatBox label="Flesch Score" value={`${metrics.score} / 100`} />
        <StatBox label="Grade Level" value={`Grade ${metrics.grade}`} />
        <StatBox label="Avg Words / Sent" value={(metrics.words / Math.max(1, metrics.sentences)).toFixed(1)} />
        <StatBox label="Avg Syllables / Word" value={(metrics.syllables / Math.max(1, metrics.words)).toFixed(2)} />
      </div>

      <div className="bg-[#ffffff] border-2 border-[#111111] border-l-6 border-l-[#d9541e] rounded-xl p-5 shadow-[3px_3px_0px_#111111] flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#777777]">Reading Accessibility</span>
          <h3 className="text-base font-bold text-[#111111] mt-0.5">{metrics.label}</h3>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-[#d9541e]">{metrics.score}</span>
          <span className="text-xs text-[#777777] block">target: 60-70</span>
        </div>
      </div>

      <div className="bg-[#ffffff] border-2 border-[#111111] rounded-xl p-4 shadow-[2px_2px_0px_#111111] space-y-2">
        <label className="block text-xs font-bold uppercase text-[#666666]">Input Document for Readability Analysis</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          className="w-full p-3 bg-[#fdfbf7] border border-[#d4ccbd] rounded-lg text-sm text-[#111111] focus:outline-none"
        />
        <div className="flex justify-between items-center pt-2">
          <span className="text-xs text-[#666666]">{metrics.words} words, {metrics.sentences} sentences analyzed</span>
          <button
            onClick={() => setText("")}
            className="px-3 py-1.5 text-xs font-semibold bg-[#f3eee3] text-[#111111] border border-[#111111] rounded-lg hover:bg-[#e6dfd2]"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 16. RANDOM TEXT GENERATOR
// -------------------------------------------------------------
function RandomTextGeneratorTool() {
  const [length, setLength] = useState(16);
  const [count, setCount] = useState(5);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [generated, setGenerated] = useState("");

  const generate = () => {
    let charset = "";
    if (includeUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLower) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|";

    if (!charset) {
      setGenerated("Please select at least one character set.");
      return;
    }

    const lines: string[] = [];
    for (let c = 0; c < count; c++) {
      const array = new Uint32Array(length);
      crypto.getRandomValues(array);
      let line = "";
      for (let i = 0; i < length; i++) {
        line += charset[array[i] % charset.length];
      }
      lines.push(line);
    }
    setGenerated(lines.join("\n"));
  };

  useEffect(() => {
    generate();
  }, [length, count, includeUpper, includeLower, includeNumbers, includeSymbols]);

  return (
    <div className="space-y-5">
      <div className="bg-[#ffffff] border-2 border-[#111111] rounded-xl p-5 shadow-[3px_3px_0px_#111111] space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between text-xs font-bold text-[#111111] mb-1">
              <span>String Length</span>
              <span>{length} chars</span>
            </div>
            <input
              type="range"
              min={4}
              max={64}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full accent-[#d9541e]"
            />
          </div>
          <div>
            <div className="flex justify-between text-xs font-bold text-[#111111] mb-1">
              <span>Quantity</span>
              <span>{count} strings</span>
            </div>
            <input
              type="range"
              min={1}
              max={50}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full accent-[#d9541e]"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-[#e6dfd2] text-xs font-semibold">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={includeUpper}
              onChange={(e) => setIncludeUpper(e.target.checked)}
              className="accent-[#d9541e] w-4 h-4"
            />
            Uppercase (A-Z)
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={includeLower}
              onChange={(e) => setIncludeLower(e.target.checked)}
              className="accent-[#d9541e] w-4 h-4"
            />
            Lowercase (a-z)
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="accent-[#d9541e] w-4 h-4"
            />
            Numbers (0-9)
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="accent-[#d9541e] w-4 h-4"
            />
            Symbols (!@#$)
          </label>
        </div>

        <div className="flex justify-between items-center pt-2">
          <button
            onClick={generate}
            className="px-4 py-2 text-xs font-bold bg-[#d9541e] text-[#ffffff] rounded-lg border border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#bf4514] flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Regenerate Random Strings</span>
          </button>
          <CopyButton text={generated} label="Copy All Strings" />
        </div>
      </div>

      <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-4 shadow-[2px_2px_0px_#111111]">
        <textarea
          readOnly
          value={generated}
          rows={Math.min(12, Math.max(5, count))}
          className="w-full p-3 bg-[#fdfbf7] border border-[#d4ccbd] rounded-lg text-xs font-mono text-[#111111] focus:outline-none"
        />
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 17. TEXT REPEATER
// -------------------------------------------------------------
function TextRepeaterTool() {
  const [text, setText] = useState("Awesome");
  const [count, setCount] = useState(10);
  const [separator, setSeparator] = useState<"newline" | "space" | "comma" | "none">("space");

  const output = useMemo(() => {
    if (!text || count <= 0) return "";
    const safeCount = Math.min(5000, count);
    const sep = separator === "newline" ? "\n" : separator === "space" ? " " : separator === "comma" ? ", " : "";
    return Array(safeCount).fill(text).join(sep);
  }, [text, count, separator]);

  return (
    <div className="space-y-5">
      <div className="bg-[#ffffff] border-2 border-[#111111] rounded-xl p-5 shadow-[3px_3px_0px_#111111] space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-[#666666] mb-1">Text or Emoji to Repeat</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text or emoji..."
              className="w-full p-2.5 bg-[#fdfbf7] border border-[#111111] rounded-lg text-xs font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-[#666666] mb-1">Repetitions (max 5,000)</label>
            <input
              type="number"
              min={1}
              max={5000}
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(5000, Number(e.target.value))))}
              className="w-full p-2.5 bg-[#fdfbf7] border border-[#111111] rounded-lg text-xs font-bold"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#e6dfd2]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#111111]">Separator:</span>
            {[
              { id: "newline", label: "New Line" },
              { id: "space", label: "Space" },
              { id: "comma", label: "Comma (,)" },
              { id: "none", label: "None" }
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setSeparator(s.id as any)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border border-[#111111] transition-all ${
                  separator === s.id
                    ? "bg-[#d9541e] text-[#ffffff] shadow-[2px_2px_0px_#111111]"
                    : "bg-[#f3eee3] text-[#111111] hover:bg-[#e6dfd2]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <span className="text-xs text-[#777777] font-semibold">{output.length} total chars</span>
        </div>
      </div>

      <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-4 shadow-[2px_2px_0px_#111111] space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase text-[#666666]">Repeated Result</span>
          <CopyButton text={output} label="Copy Repeated Text" />
        </div>
        <textarea
          readOnly
          value={output}
          rows={8}
          className="w-full p-3 bg-[#fdfbf7] border border-[#d4ccbd] rounded-lg text-xs font-mono text-[#111111] focus:outline-none"
        />
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 18. SLUG GENERATOR
// -------------------------------------------------------------
function SlugGeneratorTool() {
  const [title, setTitle] = useState("10 Essential Developer Tools for 2026!");
  const [separator, setSeparator] = useState<"-" | "_">("-");
  const [filterStopWords, setFilterStopWords] = useState(false);

  const stopWords = new Set(["a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with"]);

  const slug = useMemo(() => {
    if (!title) return "";
    let clean = title
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // remove diacritics / accents
      .toLowerCase()
      .trim();

    let words = clean.split(/[^a-z0-9]+/g).filter(Boolean);
    if (filterStopWords) {
      words = words.filter((w) => !stopWords.has(w));
    }
    return words.join(separator);
  }, [title, separator, filterStopWords]);

  return (
    <div className="space-y-5">
      <div className="bg-[#ffffff] border-2 border-[#111111] rounded-xl p-5 shadow-[3px_3px_0px_#111111] space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase text-[#666666] mb-1.5">Article Title or Headline</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter article title or phrase..."
            className="w-full p-3 bg-[#fdfbf7] border border-[#111111] rounded-lg text-sm font-medium"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#e6dfd2]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#111111]">Separator:</span>
            <button
              onClick={() => setSeparator("-")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border border-[#111111] ${
                separator === "-" ? "bg-[#d9541e] text-[#ffffff]" : "bg-[#f3eee3] text-[#111111]"
              }`}
            >
              Hyphen (-)
            </button>
            <button
              onClick={() => setSeparator("_")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border border-[#111111] ${
                separator === "_" ? "bg-[#d9541e] text-[#ffffff]" : "bg-[#f3eee3] text-[#111111]"
              }`}
            >
              Underscore (_)
            </button>
          </div>

          <label className="flex items-center gap-2 text-xs font-semibold text-[#111111] cursor-pointer">
            <input
              type="checkbox"
              checked={filterStopWords}
              onChange={(e) => setFilterStopWords(e.target.checked)}
              className="accent-[#d9541e] w-4 h-4"
            />
            Filter Stop Words (a, the, in, for...)
          </label>
        </div>
      </div>

      <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-5 shadow-[3px_3px_0px_#111111] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#666666]">Generated SEO URL Slug</span>
          <CopyButton text={slug} label="Copy Slug" />
        </div>
        <div className="p-3 bg-[#fdfbf7] border border-[#111111] rounded-lg font-mono text-sm sm:text-base font-bold text-[#111111] select-all break-all">
          {slug || <span className="text-[#999999] italic">Slug preview...</span>}
        </div>
        <div className="text-[11px] text-[#777777]">
          Example URL: <code className="text-[#111111]">https://mytoolpocket.com/blog/{slug || "example-post"}/</code>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// EXISTING DEVELOPER / SEO / POMODORO UTILITIES
// -------------------------------------------------------------
function JsonFormatterTool() {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

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
        <div className="ml-auto">
          <CopyButton text={input} label="Copy JSON" />
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border-2 border-red-500 rounded-lg text-xs font-mono text-red-700">
          Syntax Error: {error}
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

function Base64Tool() {
  const [input, setInput] = useState("");
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
        setOutput(decodeURIComponent(escape(atob(input))));
      }
    } catch (err: any) {
      setError("Invalid Base64 sequence for decoding");
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
            placeholder={mode === "encode" ? "Enter plain text to encode..." : "Enter Base64 string to decode..."}
            rows={8}
            className="w-full p-3 bg-[#fdfbf7] border border-[#d4ccbd] rounded-lg text-xs font-mono text-[#111111] focus:outline-none"
          />
        </div>

        <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-4 shadow-[2px_2px_0px_#111111] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase text-[#555555]">Result</span>
              <CopyButton text={output} label="Copy Output" />
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

function PasswordGeneratorTool() {
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");

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
          <CopyButton text={password} label="Copy Password" />
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

function MetaTagGeneratorTool() {
  const [title, setTitle] = useState("My Awesome Website");
  const [description, setDescription] = useState("A fast, high quality utility website built for modern creators.");
  const [keywords, setKeywords] = useState("tools, utility, pocket, web tools");
  const [author, setAuthor] = useState("mytoolpocket.com");
  const [url, setUrl] = useState("https://mytoolpocket.com");

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
          <label className="block text-xs font-semibold mb-1">Keywords</label>
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
      </div>

      <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-5 shadow-[3px_3px_0px_#111111] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#666666]">Generated HTML Code</h4>
            <CopyButton text={generatedTags} label="Copy Meta Tags" />
          </div>
          <pre className="p-3 bg-[#fdfbf7] rounded-lg border border-[#d4ccbd] text-[11px] font-mono overflow-x-auto text-[#111111] leading-relaxed">
            {generatedTags}
          </pre>
        </div>
      </div>
    </div>
  );
}

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

function GenericToolPlaceholder({ tool }: { tool: ToolItem }) {
  const [inputVal, setInputVal] = useState("");
  const [outputVal, setOutputVal] = useState("");

  const handleProcess = () => {
    setOutputVal(inputVal.trim() ? `Processed: ${inputVal}` : "No input provided.");
  };

  return (
    <div className="bg-[#ffffff] border-2 border-[#111111] border-l-4 border-l-[#d9541e] rounded-xl p-6 shadow-[3px_3px_0px_#111111] space-y-5">
      <div className="space-y-3">
        <label className="block text-xs font-bold uppercase text-[#555555]">Input Data</label>
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
            <CopyButton text={outputVal} label="Copy Output" />
          </div>
          <div className="p-3 bg-[#fdfbf7] rounded border border-[#d4ccbd] text-xs font-mono text-[#111111]">
            {outputVal}
          </div>
        </div>
      )}
    </div>
  );
}
