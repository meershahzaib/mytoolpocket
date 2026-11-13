import React, { memo } from "react";

export type AdSlotType = "leaderboard" | "in-content" | "rectangle" | "banner";

interface AdPlaceholderProps {
  slot: AdSlotType;
  id?: string;
  className?: string;
}

function AdPlaceholderComponent({
  slot,
  id,
  className = "",
}: AdPlaceholderProps) {
  // Dimension definitions with strict min-heights to eliminate Cumulative Layout Shift (CLS)
  // Desktop Leaderboard: 728x90 (or 970x90/970x250) | Tablet: 468x60 | Mobile: 320x50 / 300x50
  // In-Content / Rectangle: 300x250 / 336x280 | Responsive banner: max 728x90
  const slotStyles: Record<AdSlotType, { container: string; dimensions: string }> = {
    leaderboard: {
      container: "min-h-[60px] sm:min-h-[90px] max-w-[970px]",
      dimensions: "Desktop 728x90 / 970x90 &bull; Mobile 320x50",
    },
    "in-content": {
      container: "min-h-[100px] sm:min-h-[120px] max-w-[800px]",
      dimensions: "Responsive Fluid In-Content Banner",
    },
    rectangle: {
      container: "min-h-[250px] max-w-[336px]",
      dimensions: "Medium Rectangle 300x250 / 336x280",
    },
    banner: {
      container: "min-h-[70px] sm:min-h-[90px] max-w-[728px]",
      dimensions: "Standard Banner 728x90",
    },
  };

  const { container, dimensions } = slotStyles[slot] || slotStyles.banner;

  return (
    <aside
      id={id}
      aria-label="Advertisement Placement"
      className={`w-full mx-auto my-6 px-2 flex flex-col items-center justify-center overflow-hidden ${className}`}
    >
      <div className="w-full flex items-center justify-center mb-1">
        <span className="text-[10px] font-bold tracking-widest uppercase text-[#888888]">
          Advertisement
        </span>
      </div>
      <div
        className={`w-full ${container} bg-[#f9f6f0] border border-dashed border-[#c8beaa] rounded-lg flex flex-col items-center justify-center p-3 text-center transition-colors`}
      >
        <span className="text-[11px] font-semibold text-[#666666] tracking-wide">
          Reserved Responsive Ad Slot
        </span>
        <span
          className="text-[10px] text-[#999999] mt-0.5"
          dangerouslySetInnerHTML={{ __html: dimensions }}
        />
      </div>
    </aside>
  );
}

export default memo(AdPlaceholderComponent);

