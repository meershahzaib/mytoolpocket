import React from "react";
import {
  FileText,
  Code,
  Search,
  Video,
  Sparkles,
  Image as ImageIcon,
  FileSpreadsheet,
  Calculator,
  ArrowLeftRight,
  Share2,
  ShieldCheck,
  Clock,
  Type,
  AlignLeft,
  ListFilter,
  Binary,
  Link as LinkIcon,
  FileCode,
  FileTerminal,
  Globe,
  Tag,
  Bot,
  Layers,
  Files,
  Percent,
  Calendar,
  Palette,
  Hash,
  KeyRound,
  StickyNote,
  Wrench,
  Check,
  Copy,
  LucideProps
} from "lucide-react";

interface DynamicIconProps extends LucideProps {
  name: string;
}

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  switch (name) {
    case "FileText":
      return <FileText {...props} />;
    case "Code":
      return <Code {...props} />;
    case "Search":
      return <Search {...props} />;
    case "Video":
      return <Video {...props} />;
    case "Sparkles":
      return <Sparkles {...props} />;
    case "Image":
      return <ImageIcon {...props} />;
    case "FileSpreadsheet":
      return <FileSpreadsheet {...props} />;
    case "Calculator":
      return <Calculator {...props} />;
    case "ArrowLeftRight":
      return <ArrowLeftRight {...props} />;
    case "Share2":
      return <Share2 {...props} />;
    case "ShieldCheck":
      return <ShieldCheck {...props} />;
    case "Clock":
      return <Clock {...props} />;
    case "Type":
      return <Type {...props} />;
    case "AlignLeft":
      return <AlignLeft {...props} />;
    case "ListFilter":
      return <ListFilter {...props} />;
    case "Binary":
      return <Binary {...props} />;
    case "Link":
      return <LinkIcon {...props} />;
    case "FileCode":
      return <FileCode {...props} />;
    case "FileTerminal":
      return <FileTerminal {...props} />;
    case "Globe":
      return <Globe {...props} />;
    case "Tag":
      return <Tag {...props} />;
    case "Bot":
      return <Bot {...props} />;
    case "Layers":
      return <Layers {...props} />;
    case "Files":
      return <Files {...props} />;
    case "Percent":
      return <Percent {...props} />;
    case "Calendar":
      return <Calendar {...props} />;
    case "Palette":
      return <Palette {...props} />;
    case "Hash":
      return <Hash {...props} />;
    case "KeyRound":
      return <KeyRound {...props} />;
    case "StickyNote":
      return <StickyNote {...props} />;
    case "Check":
      return <Check {...props} />;
    case "Copy":
      return <Copy {...props} />;
    default:
      return <Wrench {...props} />;
  }
}

