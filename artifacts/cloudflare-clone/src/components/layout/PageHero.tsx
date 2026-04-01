import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/lib/motion";

type HeroAction = {
  label: string;
  href: string;
  variant?: "primary" | "outline";
};

type PageHeroProps = {
  title: React.ReactNode;
  description: React.ReactNode;
  eyebrow?: string;
  actions?: HeroAction[];
  className?: string;
  contentClassName?: string;
  aside?: React.ReactNode;
  /** `navy` = primary infrastructure hero (#0B1320). `light` = content-style hero. */
  variant?: "light" | "navy";
  /**
   * Home-style order: H1 → description → eyebrow (tagline) → value points → actions → microcopy → positioning.
   * Default keeps: eyebrow → H1 → description → actions.
   */
  layout?: "default" | "home";
  valuePoints?: string[];
  /** Shown under primary + secondary actions (e.g. CTA microcopy). */
  primaryMicrocopy?: string;
  positioningParagraph?: React.ReactNode;
};

export const PageHero: React.FC<PageHeroProps> = ({
  title,
  description,
  eyebrow,
  actions = [],
  className,
  contentClassName,
  aside,
  variant = "light",
  layout = "default",
  valuePoints,
  primaryMicrocopy,
  positioningParagraph,
}) => {
  const isNavy = variant === "navy";
  const isHomeLayout = layout === "home";

  const actionsBlock =
    !!actions.length && (
      <div className="flex flex-col sm:flex-row gap-4">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className={cn(
              "inline-flex items-center justify-center gap-2 px-5 py-3 rounded text-[15px] font-semibold transition-colors",
              action.variant === "outline"
                ? isNavy
                  ? "text-white border border-white/25 hover:bg-white/10"
                  : "text-slate-800 border border-slate-300 hover:bg-slate-50"
                : "text-white bg-[#1E3A8A] hover:bg-[#172554]",
            )}
          >
            {action.label}
          </Link>
        ))}
      </div>
    );

  return (
    <section
      className={cn(
        isNavy
          ? "relative overflow-hidden bg-[#0B1320] text-white"
          : /* allow orbit badges to paint full border when scaled (overflow-hidden clips left/right edges) */
            "relative overflow-x-visible overflow-y-visible bg-[#F7F9FC]",
        className,
      )}
    >
      <div
        className={cn(
          "max-w-[1280px] mx-auto px-6 py-14 sm:py-20 lg:py-28",
          contentClassName,
        )}
      >
        <div
          className={cn(
            "grid gap-8 sm:gap-10 lg:gap-12 items-center",
            aside ? "lg:grid-cols-2" : "lg:grid-cols-1",
          )}
        >
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-3xl min-w-0">
            {!isHomeLayout && eyebrow && (
              <p
                className={cn(
                  "text-sm font-semibold uppercase tracking-widest mb-4",
                  isNavy ? "text-slate-400" : "text-[#1E3A8A]",
                )}
              >
                {eyebrow}
              </p>
            )}
            <h1
              className={cn(
                "text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6",
                isNavy ? "text-white" : "text-slate-900",
              )}
            >
              {title}
            </h1>
            <p
              className={cn(
                "text-lg sm:text-xl leading-relaxed",
                isHomeLayout ? "mb-6" : "mb-8",
                isNavy ? "text-slate-300" : "text-slate-600",
              )}
            >
              {description}
            </p>
            {isHomeLayout && eyebrow && (
              <p
                className={cn(
                  "text-sm font-semibold uppercase tracking-widest mb-6",
                  isNavy ? "text-slate-400" : "text-[#1E3A8A]",
                )}
              >
                {eyebrow}
              </p>
            )}
            {isHomeLayout && !!valuePoints?.length && (
              <ul className="space-y-3 mb-8 text-slate-600 text-[15px] sm:text-base leading-relaxed">
                {valuePoints.map((vp) => (
                  <li key={vp} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1E3A8A]" aria-hidden />
                    <span>{vp}</span>
                  </li>
                ))}
              </ul>
            )}
            {actionsBlock}
            {isHomeLayout && primaryMicrocopy && (
              <p className="mt-4 text-sm text-slate-500">{primaryMicrocopy}</p>
            )}
            {isHomeLayout && positioningParagraph && (
              <p
                className={cn(
                  "mt-8 text-base sm:text-[17px] leading-relaxed",
                  isNavy ? "text-slate-300" : "text-slate-600",
                )}
              >
                {positioningParagraph}
              </p>
            )}
          </motion.div>
          {aside && <div className="relative min-w-0 w-full overflow-x-visible overflow-y-visible">{aside}</div>}
        </div>
      </div>
    </section>
  );
};
