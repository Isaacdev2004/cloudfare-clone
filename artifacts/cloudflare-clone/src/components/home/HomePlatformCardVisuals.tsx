import React from 'react';
import { HeroCloudNetworkVisual } from '@/components/hero/HeroCloudNetworkVisual';
import { HeroGaugeVisual } from '@/components/hero/HeroGaugeVisual';

/**
 * §27.3 — Platform cards (not the global hero globe):
 * - **Track card:** `HeroGaugeVisual` (speedometer / security posture gauge — founder-preferred Track art).
 * - **Lens card:** `HeroCloudNetworkVisual` compact (cloud / enforcement mesh).
 * Global framework globe stays **only** in the hero (`HeroHomePlatformVisual` → `HeroFrameworkOrbitVisual`).
 */

const cardTrayBase =
  'relative w-full rounded-lg border border-[#E5E7EB] bg-[#F7F9FC] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]';
/** Lens cloud + bob animation needs vertical slack — no clipping */
const cardTrayLens = `${cardTrayBase} overflow-visible`;
const cardTrayTrack = `${cardTrayBase} overflow-hidden`;

export function HomeTrackPlatformCardVisual({ className = '' }: { className?: string }) {
  return (
    <div
      className={`${cardTrayTrack} flex h-[220px] min-h-[220px] items-center justify-center sm:h-[240px] sm:min-h-[240px] lg:h-[260px] lg:min-h-[260px] ${className}`}
    >
      <div
        className="pointer-events-none flex w-full max-w-[min(100%,400px)] items-center justify-center px-3 py-2 select-none"
        inert
      >
        <div className="origin-center scale-[0.82] sm:scale-[0.9] lg:scale-95" style={{ transformOrigin: 'center center' }}>
          <HeroGaugeVisual compact className="mx-auto max-h-[200px] sm:max-h-[220px] lg:max-h-[240px]" />
        </div>
      </div>
    </div>
  );
}

export function HomeLensPlatformCardVisual({ className = '' }: { className?: string }) {
  return (
    <div
      className={`${cardTrayLens} flex min-h-[268px] items-center justify-center py-6 sm:min-h-[288px] sm:py-7 lg:min-h-[300px] lg:py-8 ${className}`}
    >
      <div
        className="pointer-events-none flex w-full max-w-[min(100%,400px)] items-center justify-center px-3 sm:px-4 select-none"
        inert
      >
        <div
          className="w-full origin-center scale-[0.72] sm:scale-[0.78] lg:scale-[0.86]"
          style={{ transformOrigin: 'center center' }}
        >
          <HeroCloudNetworkVisual compact className="mx-auto w-full max-w-[300px] sm:max-w-[320px]" />
        </div>
      </div>
    </div>
  );
}
