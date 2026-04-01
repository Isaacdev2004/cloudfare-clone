import React from 'react';
import { cn } from '@/lib/utils';

/** Mesh, soft orbs, and grid — use behind inner-page heroes. */
export function InnerHeroBackdrop({ className }: { className?: string }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div className="absolute -top-52 -right-24 h-[520px] w-[520px] rounded-full bg-[#1E3A8A]/[0.11] blur-[120px]" />
      <div className="absolute top-1/4 -left-44 h-[420px] w-[420px] rounded-full bg-sky-400/[0.09] blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-indigo-500/[0.05] blur-[90px]" />
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(15,23,42,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15,23,42,0.04) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/55 to-[#f1f5f9]" />
    </div>
  );
}

/** Subtle grid for section bands (not full viewport). */
export function SectionGridWash({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 opacity-[0.35]',
        '[background-image:linear-gradient(to_right,rgba(11,19,32,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(11,19,32,0.05)_1px,transparent_1px)] [background-size:28px_28px]',
        className,
      )}
    />
  );
}

type CapabilityTileProps = {
  index: number;
  title: string;
  body: string;
  className?: string;
};

/** Bento-style tile with index watermark and accent rail. */
export function CapabilityTile({ index, title, body, className }: CapabilityTileProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-7 sm:p-8',
        'shadow-[0_24px_56px_-32px_rgba(11,19,32,0.22)] transition-all duration-300 hover:shadow-[0_32px_72px_-32px_rgba(30,58,138,0.16)] hover:border-[#1E3A8A]/15',
        className,
      )}
    >
      <div
        className="absolute inset-y-4 left-0 w-[3px] rounded-full bg-gradient-to-b from-[#1E3A8A] via-sky-500 to-indigo-400"
        aria-hidden
      />
      <span className="pointer-events-none absolute -right-1 -top-1 text-[4.5rem] font-black leading-none text-slate-100 select-none sm:text-[5.5rem] sm:right-2">
        {String(index).padStart(2, '0')}
      </span>
      <h3 className="relative max-w-[85%] text-lg font-bold tracking-tight text-slate-900 sm:text-xl">{title}</h3>
      <p className="relative mt-3 text-[15px] leading-relaxed text-slate-600 sm:text-[17px]">{body}</p>
    </div>
  );
}

type GradientTopCardProps = {
  children: React.ReactNode;
  className?: string;
  /** Full gradient stops, e.g. `from-emerald-700 to-[#1E3A8A]` */
  gradientClass: string;
};

export function GradientTopCard({ children, className, gradientClass }: GradientTopCardProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white',
        'shadow-[0_20px_50px_-28px_rgba(11,19,32,0.2)]',
        className,
      )}
    >
      <div className={cn('h-[4px] w-full shrink-0 bg-gradient-to-r', gradientClass)} aria-hidden />
      <div className="flex h-full min-h-0 flex-1 flex-col p-7 sm:p-8">{children}</div>
    </div>
  );
}

/** Bottom CTA strip with depth (works with default button styles). */
export function ElevatedCtaBand({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden border-t border-slate-200/90 py-14 md:py-16">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-[#e8eefc]/50" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(30,58,138,0.09),transparent)]" />
      <div className="relative z-[1] mx-auto flex max-w-[1280px] flex-col flex-wrap items-center justify-center gap-4 px-6 sm:flex-row">
        {children}
      </div>
    </section>
  );
}

/** Navy band for high-trust closers (light text; pass buttons with appropriate classes). */
export function NavySignalBand({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-[#0B1320] py-14 md:py-16 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_20%_0%,rgba(30,58,138,0.35),transparent)]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 translate-x-1/4 translate-y-1/4 rounded-full bg-[#1E3A8A]/25 blur-3xl" />
      <div className="relative z-[1] mx-auto flex max-w-[1280px] flex-col flex-wrap items-center justify-center gap-4 px-6 sm:flex-row">
        {children}
      </div>
    </section>
  );
}
