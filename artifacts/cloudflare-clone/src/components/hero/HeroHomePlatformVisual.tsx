/**
 * Home hero — Track/Lens toggle with crossfade between framework orbit (Track) and cloud network (Lens).
 */
import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HeroCloudNetworkVisual } from "@/components/hero/HeroCloudNetworkVisual";
import { HeroFrameworkOrbitVisual } from "@/components/hero/HeroFrameworkOrbitVisual";

type Mode = "track" | "lens";

export const HeroHomePlatformVisual: React.FC<{ className?: string }> = ({ className }) => {
  const [mode, setMode] = useState<Mode>("track");
  const reduceMotion = useReducedMotion();

  const dur = reduceMotion ? 0 : 0.32;

  return (
    <div className={cn("relative flex h-full min-h-0 w-full flex-col items-center gap-2 sm:gap-3", className)}>
      <div
        className="relative z-30 inline-flex shrink-0 rounded-full border border-slate-200/95 bg-white/95 p-1 shadow-[0_1px_0_rgba(11,19,32,0.06)] backdrop-blur-sm"
        role="radiogroup"
        aria-label="Preview platform focus"
      >
        <button
          type="button"
          role="radio"
          aria-checked={mode === "track"}
          onClick={() => setMode("track")}
          className={cn(
            "rounded-full px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors sm:px-5 sm:text-xs",
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
          onClick={() => setMode("lens")}
          className={cn(
            "rounded-full px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors sm:px-5 sm:text-xs",
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
          {mode === "track" ? (
            <motion.div
              key="track"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: dur, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center justify-center overflow-visible px-0 pt-1"
            >
              <HeroFrameworkOrbitVisual />
            </motion.div>
          ) : (
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
