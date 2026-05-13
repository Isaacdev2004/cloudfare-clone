/**
 * Home hero — §27.1 right column: **one** abstract interconnected-evidence visual (framework globe +
 * optional line/float motion in `HeroFrameworkOrbitVisual`). No in-hero platform toggles; PDF places
 * Track vs Lens distinction in §27.3 (platform cards + `/track` / `/lens`).
 */
import React from "react";
import { cn } from "@/lib/utils";
import { HeroFrameworkOrbitVisual } from "@/components/hero/HeroFrameworkOrbitVisual";

export const HeroHomePlatformVisual: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("relative flex h-full min-h-0 w-full flex-col items-center justify-center", className)}>
      <div className="relative flex min-h-0 w-full flex-1 items-center justify-center overflow-visible">
        <HeroFrameworkOrbitVisual />
      </div>
    </div>
  );
};
