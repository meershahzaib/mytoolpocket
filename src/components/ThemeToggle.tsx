"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sun, Moon, Monitor, Check, ChevronDown } from "lucide-react";
import { useTheme, Theme } from "@/components/ThemeProvider";

interface ThemeToggleProps {
  variant?: "desktop" | "mobile-bar" | "mobile-drawer";
  className?: string;
}

export default function ThemeToggle({ variant = "desktop", className = "" }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme, toggleTheme, mounted } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Avoid hydration mismatch by rendering a stable placeholder until mounted
  if (!mounted) {
    if (variant === "mobile-bar") {
      return (
        <div className={`w-10 h-10 rounded-lg border-2 border-[#111111] dark:border-[#383848] bg-[#ffffff] dark:bg-[#1a1a22] shadow-[2px_2px_0px_#111111] dark:shadow-[2px_2px_0px_#000000] ${className}`} />
      );
    }
    if (variant === "mobile-drawer") {
      return (
        <div className="w-full h-10 rounded-xl bg-[#e6dfd2] dark:bg-[#1c1c24] animate-pulse" />
      );
    }
    return (
      <div className={`h-9 w-24 rounded-lg border border-[#111111] dark:border-[#383848] bg-[#ffffff] dark:bg-[#1a1a22] ${className}`} />
    );
  }

  // 1. Mobile Header Bar Compact Button (Direct 1-tap toggle)
  if (variant === "mobile-bar") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`p-2.5 rounded-lg border-2 border-[#111111] dark:border-[#383848] bg-[#ffffff] dark:bg-[#1f1f28] text-[#111111] dark:text-[#f3eee3] shadow-[2px_2px_0px_#111111] dark:shadow-[2px_2px_0px_#000000] hover:bg-[#f3eee3] dark:hover:bg-[#282834] active:translate-x-0.5 active:translate-y-0.5 transition-all duration-100 cursor-pointer flex items-center justify-center ${className}`}
        aria-label={`Current mode: ${theme}. Click to switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode.`}
        title={`Current mode: ${theme} (Click to toggle)`}
      >
        {resolvedTheme === "dark" ? (
          <Moon className="w-5 h-5 text-[#f3eee3]" />
        ) : (
          <Sun className="w-5 h-5 text-[#d9541e]" />
        )}
      </button>
    );
  }

  // 2. Mobile Drawer 3-Way Segmented Control
  if (variant === "mobile-drawer") {
    const options: { value: Theme; label: string; icon: React.ReactNode }[] = [
      {
        value: "system",
        label: "System",
        icon: <Monitor className="w-4 h-4" />
      },
      {
        value: "light",
        label: "Light",
        icon: <Sun className="w-4 h-4" />
      },
      {
        value: "dark",
        label: "Dark",
        icon: <Moon className="w-4 h-4" />
      }
    ];

    return (
      <div className={`space-y-1.5 ${className}`}>
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#777777] dark:text-[#a0a0b2]">
            Theme Appearance
          </span>
          <span className="text-[10px] font-semibold text-[#d9541e]">
            {theme === "system" ? "Default System" : `${theme.toUpperCase()} Mode`}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#ffffff] dark:bg-[#17171e] rounded-xl border-2 border-[#111111] dark:border-[#383848] shadow-[2px_2px_0px_#111111] dark:shadow-[2px_2px_0px_#000000]">
          {options.map((opt) => {
            const isSelected = theme === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setTheme(opt.value)}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? "bg-[#111111] text-[#f3eee3] dark:bg-[#d9541e] dark:text-[#ffffff] shadow-[1px_1px_0px_#d9541e] dark:shadow-[1px_1px_0px_#000000]"
                    : "text-[#555555] dark:text-[#a0a0b2] hover:bg-[#f3eee3] dark:hover:bg-[#22222d] hover:text-[#111111] dark:hover:text-[#f3eee3]"
                }`}
                aria-pressed={isSelected}
              >
                {opt.icon}
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // 3. Desktop Header Navigation Menu Switcher
  const options: { value: Theme; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      value: "system",
      label: "System",
      desc: "Matches your device OS",
      icon: <Monitor className="w-4 h-4" />
    },
    {
      value: "light",
      label: "Light",
      desc: "Warm cream & crisp ink",
      icon: <Sun className="w-4 h-4 text-[#d9541e]" />
    },
    {
      value: "dark",
      label: "Dark",
      desc: "Neo-brutalist midnight",
      icon: <Moon className="w-4 h-4 text-[#8a8aff]" />
    }
  ];

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="px-2.5 py-1.5 rounded-lg border-2 border-[#111111] dark:border-[#383848] bg-[#ffffff] dark:bg-[#1a1a22] text-[#111111] dark:text-[#f3eee3] shadow-[2px_2px_0px_#111111] dark:shadow-[2px_2px_0px_#000000] hover:bg-[#f3eee3] dark:hover:bg-[#242430] active:translate-x-0.5 active:translate-y-0.5 transition-all duration-100 cursor-pointer flex items-center gap-1.5 text-xs font-bold"
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
        aria-label={`Theme appearance: ${theme}. Click to change theme.`}
      >
        <span className="flex items-center justify-center">
          {theme === "system" ? (
            <Monitor className="w-3.5 h-3.5 text-[#555555] dark:text-[#a0a0b2]" />
          ) : resolvedTheme === "dark" ? (
            <Moon className="w-3.5 h-3.5 text-[#f3eee3]" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-[#d9541e]" />
          )}
        </span>
        <span className="capitalize">{theme === "system" ? "Auto" : theme}</span>
        <ChevronDown
          className={`w-3 h-3 text-[#777777] dark:text-[#88889a] transition-transform duration-150 ${
            dropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Popover Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#ffffff] dark:bg-[#17171e] border-2 border-[#111111] dark:border-[#383848] rounded-xl shadow-[4px_4px_0px_#111111] dark:shadow-[4px_4px_0px_#000000] p-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="px-2 py-1 text-[10px] font-black uppercase tracking-wider text-[#777777] dark:text-[#88889a] border-b border-[#e6dfd2] dark:border-[#2a2a36] mb-1">
            Appearance
          </div>

          <div className="space-y-0.5">
            {options.map((opt) => {
              const isSelected = theme === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    setTheme(opt.value);
                    setDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer text-left ${
                    isSelected
                      ? "bg-[#111111] text-[#f3eee3] dark:bg-[#d9541e] dark:text-[#ffffff]"
                      : "text-[#111111] dark:text-[#f3eee3] hover:bg-[#f3eee3] dark:hover:bg-[#242430]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {opt.icon}
                    <div>
                      <div className="leading-tight">{opt.label}</div>
                      <div
                        className={`text-[10px] font-normal leading-tight ${
                          isSelected
                            ? "text-[#cccccc] dark:text-[#f8f8f8]"
                            : "text-[#777777] dark:text-[#88889a]"
                        }`}
                      >
                        {opt.desc}
                      </div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

