import React, { memo } from "react";

interface LogoIconProps {
  className?: string;
  size?: number;
}

function LogoIconComponent({ className = "", size = 36 }: LogoIconProps) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative shrink-0 flex items-center justify-center rounded-xl bg-[#f3eee3] dark:bg-[#1c1c24] border-2 border-[#111111] dark:border-[#383848] shadow-[2.5px_2.5px_0px_#111111] dark:shadow-[2.5px_2.5px_0px_#000000] transition-transform duration-150 transform-gpu will-change-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 overflow-hidden ${className}`}
    >
      <svg
        viewBox="0 0 64 64"
        className="w-full h-full p-0.5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Tool (Wrench head) tucked into the pocket */}
        <g transform="translate(19, 6)">
          <path
            d="M 2 15 C -2 10 -1 2 5 -1 C 11 -4 19 0 20 6 C 21 11 17 15 17 15 L 17 26 L 6 26 L 6 15 Z"
            fill="#d9541e"
            className="stroke-[#111111] dark:stroke-[#2a2a36]"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Wrench notch */}
          <polygon
            points="7,2 14,2 16,9 5,9"
            className="fill-[#f3eee3] dark:fill-[#1c1c24] stroke-[#111111] dark:stroke-[#2a2a36]"
            strokeWidth="2"
          />
        </g>

        {/* Pocket Body */}
        <path
          d="M 14 26 L 50 26 L 50 42 C 50 52 42 56 32 56 C 22 56 14 42 Z"
          className="fill-[#111111] dark:fill-[#2a2a38] stroke-[#111111] dark:stroke-[#444455]"
          strokeWidth="1.5"
        />

        {/* Pocket decorative stitch line */}
        <path
          d="M 18 29.5 L 46 29.5"
          className="stroke-[#f3eee3] dark:stroke-[#888899]"
          strokeWidth="1.5"
          strokeDasharray="2.5 2"
          strokeLinecap="round"
        />

        {/* Burnt Orange pocket rivet dot */}
        <circle cx="32" cy="41" r="3.5" fill="#d9541e" stroke="#ffffff" strokeWidth="1" />

        {/* Pocket side corner tag */}
        <rect x="47" y="27" width="3" height="6" fill="#d9541e" />
      </svg>
    </div>
  );
}

export default memo(LogoIconComponent);

