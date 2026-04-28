import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { fadeInUp, fadeInUpReduced } from "@/lib/motion";

type HeroAction = {
  label: string;
  href: string;
  variant?: "primary" | "outline";
};

type PageHeroProps = {
  title: React.ReactNode;
  /** Omitted in default layout: no subheadline block. */
  description?: React.ReactNode;
  eyebrow?: string;
  actions?: HeroAction[];
  className?: string;
  contentClassName?: string;
  aside?: React.ReactNode;
  /** `navy` = primary infrastructure hero (#0B1320). `light` = content-style hero. */
  variant?: "light" | "navy";
  /**
   * Home-style: desktop keeps evidence-led flow; mobile (§7.4) uses: H1 → subhead → CTAs → value points → visual.
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
  const reduceMotion = useReducedMotion();
  const heroEnter = reduceMotion ? fadeInUpReduced : fadeInUp;
  const isNavy = variant === "navy";
  const isHomeLayout = layout === "home";

  const actionsBlock =
    !!actions.length && (
      <div className="flex flex-col flex-wrap gap-4 sm:flex-row sm:flex-wrap">
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
            "grid items-center",
            isHomeLayout
              ? "gap-8 sm:gap-10 lg:gap-12 md:gap-10"
              : "gap-8 sm:gap-10 lg:gap-12",
            aside ? "lg:grid-cols-2" : "lg:grid-cols-1",
          )}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroEnter}
            className={cn("max-w-3xl min-w-0", isHomeLayout && "flex flex-col")}
          >
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
            {isHomeLayout ? (
              <>
                <h1
                  className={cn(
                    "order-1 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6",
                    isNavy ? "text-white" : "text-slate-900",
                  )}
                >
                  {title}
                </h1>
                <p
                  className={cn(
                    "order-2 text-lg sm:text-xl leading-relaxed mb-6",
                    isNavy ? "text-slate-300" : "text-slate-600",
                  )}
                >
                  {description}
                </p>
                {eyebrow && (
                  <p
                    className={cn(
                      "order-3 max-lg:hidden text-sm font-semibold uppercase tracking-widest mb-6",
                      isNavy ? "text-slate-400" : "text-[#1E3A8A]",
                    )}
                  >
                    {eyebrow}
                  </p>
                )}
                <div className="order-3 flex flex-col gap-4 lg:order-5">
                  {actionsBlock}
                  {primaryMicrocopy && <p className="text-sm text-slate-500">{primaryMicrocopy}</p>}
                </div>
                {!!valuePoints?.length && (
                  <ul className="order-4 space-y-3 text-slate-600 text-[15px] sm:text-base leading-relaxed mb-6 lg:mb-8">
                    {valuePoints.map((vp) => (
                      <li key={vp} className="flex gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1E3A8A]" aria-hidden />
                        <span>{vp}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {positioningParagraph && (
                  <p
                    className={cn(
                      "order-5 text-base sm:text-[17px] leading-relaxed max-lg:order-5 lg:order-6",
                      isNavy ? "text-slate-300" : "text-slate-600",
                    )}
                  >
                    {positioningParagraph}
                  </p>
                )}
              </>
            ) : (
              <>
                <h1
                  className={cn(
                    "text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6",
                    isNavy ? "text-white" : "text-slate-900",
                  )}
                >
                  {title}
                </h1>
                {description != null && description !== false && description !== "" && (
                  <p
                    className={cn("text-lg sm:text-xl leading-relaxed mb-8", isNavy ? "text-slate-300" : "text-slate-600")}
                  >
                    {description}
                  </p>
                )}
                {actionsBlock}
                {primaryMicrocopy && (
                  <p className={cn("mt-3 max-w-2xl text-sm leading-relaxed", isNavy ? "text-slate-400" : "text-slate-500")}>
                    {primaryMicrocopy}
                  </p>
                )}
              </>
            )}
          </motion.div>
          {aside && (
            <div className="relative min-w-0 w-full max-lg:order-last overflow-x-visible overflow-y-visible">
              {aside}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
