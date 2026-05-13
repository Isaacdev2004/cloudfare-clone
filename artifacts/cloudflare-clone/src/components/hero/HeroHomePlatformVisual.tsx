/**
 * Home hero — three approved visuals only:
 * - **Global**: framework globe + central cloud (`HeroFrameworkOrbitVisual`) — not platform-specific.
 * - **Track**: abstract evidence network (`HomeHeroEvidenceVisual`) with line-draw motion.
 * - **Lens**: cloud / perimeter network (`HeroCloudNetworkVisual`).
 */
import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { capturePosthogEvent } from "@/lib/apexlyn-analytics-consent";
import { HeroCloudNetworkVisual } from "@/components/hero/HeroCloudNetworkVisual";
import { HeroFrameworkOrbitVisual } from "@/components/hero/HeroFrameworkOrbitVisual";
import { HomeHeroEvidenceVisual } from "@/components/home/HomeHeroEvidenceVisual";

type Mode = "global" | "track" | "lens";

export const HeroHomePlatformVisual: React.FC<{ className?: string }> = ({ className }) => {
  const [mode, setMode] = useState<Mode>("global");
  const reduceMotion = useReducedMotion();

  const dur = reduceMotion ? 0 : 0.32;

  const selectMode = (next: Mode) => {
    setMode(next);
    capturePosthogEvent("homepage_hero_visual_mode", { mode: next });
  };

  return (
    <div className={cn("relative flex h-full min-h-0 w-full flex-col items-center gap-2 sm:gap-3", className)}>
      <div
        className="relative z-30 inline-flex max-w-full shrink-0 flex-wrap justify-center gap-1 rounded-full border border-slate-200/95 bg-white/95 p-1 shadow-[0_1px_0_rgba(11,19,32,0.06)] backdrop-blur-sm"
        role="radiogroup"
        aria-label="Hero visual: global frameworks, Track, or Lens"
      >
        <button
          type="button"
          role="radio"
          aria-checked={mode === "global"}
          onClick={() => selectMode("global")}
          className={cn(
            "rounded-full px-2.5 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors sm:px-4 sm:text-[11px] md:px-5 md:text-xs",
            mode === "global"
              ? "bg-[#0F172A] text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
          )}
        >
          Global
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={mode === "track"}
          onClick={() => selectMode("track")}
          className={cn(
            "rounded-full px-2.5 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors sm:px-4 sm:text-[11px] md:px-5 md:text-xs",
            mode === "track"
              ? "bg-[#1E3A8A] text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
          )}
        >
          Track
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={mode === "lens"}
          onClick={() => selectMode("lens")}
          className={cn(
            "rounded-full px-2.5 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors sm:px-4 sm:text-[11px] md:px-5 md:text-xs",
            mode === "lens"
              ? "bg-[#1E90FF] text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
          )}
        >
          Lens
        </button>
      </div>

      <div className="relative min-h-0 w-full flex-1">
        <AnimatePresence mode="wait" initial={false}>
          {mode === "global" && (
            <motion.div
              key="global"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: dur, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center justify-center overflow-visible px-0 pt-1"
            >
              <HeroFrameworkOrbitVisual />
            </motion.div>
          )}
          {mode === "track" && (
            <motion.div
              key="track"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: dur, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center justify-center overflow-visible px-1 pt-1"
            >
              <HomeHeroEvidenceVisual className="h-full w-full max-w-[min(100%,520px)] max-h-[min(72vw,440px)]" />
            </motion.div>
          )}
          {mode === "lens" && (
            <motion.div
              key="lens"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: dur, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center justify-center overflow-hidden px-2 pt-1"
            >
              <div className="flex h-full max-h-full w-full max-w-[min(100%,400px)] items-center justify-center">
                <HeroCloudNetworkVisual compact />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
