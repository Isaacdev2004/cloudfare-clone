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
};

export const PageHero: React.FC<PageHeroProps> = ({
  title,
  description,
  eyebrow,
  actions = [],
  className,
  contentClassName,
  aside,
}) => {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-[radial-gradient(ellipse_at_70%_50%,rgba(180,80,20,0.12),#0f172a_65%)]",
        className,
      )}
    >
      <div className={cn("max-w-[1280px] mx-auto px-6 py-24 lg:py-28", contentClassName)}>
        <div className={cn("grid gap-12 items-center", aside ? "lg:grid-cols-2" : "lg:grid-cols-1")}>
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-3xl">
            {eyebrow && (
              <p className="text-sm font-semibold uppercase tracking-widest text-[#f6821f] mb-4">{eyebrow}</p>
            )}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white mb-6">
              {title}
            </h1>
            <p className="text-lg sm:text-xl text-[#a0aaba] leading-relaxed mb-8">{description}</p>
            {!!actions.length && (
              <div className="flex flex-col sm:flex-row gap-4">
                {actions.map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className={cn(
                      "inline-flex items-center justify-center gap-2 px-5 py-3 rounded text-[15px] font-semibold transition-colors",
                      action.variant === "outline"
                        ? "text-white border border-white/20 hover:bg-white/5"
                        : "text-white bg-[#f6821f] hover:bg-[#d96f18]",
                    )}
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
          {aside && <div className="relative">{aside}</div>}
        </div>
      </div>
    </section>
  );
};
