import React from 'react';
import { HeroCloudNetworkVisual } from '@/components/hero/HeroCloudNetworkVisual';
import { HeroGaugeVisual } from '@/components/hero/HeroGaugeVisual';

/**
 * §27.3 — Platform cards (not the global hero globe):
 * - **Track card:** `HeroGaugeVisual` (speedometer / security posture gauge — founder-preferred Track art).
 * - **Lens card:** `HeroCloudNetworkVisual` compact (cloud / enforcement mesh).
 * Global framework globe stays **only** in the hero (`HeroHomePlatformVisual` → `HeroFrameworkOrbitVisual`).
 */

const cardTray =
  'relative mb-6 w-full overflow-hidden rounded-lg border border-[#E5E7EB] bg-[#F7F9FC] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]';

export function HomeTrackPlatformCardVisual({ className = '' }: { className?: string }) {
  return (
    <div
      className={`${cardTray} flex h-[200px] min-h-[200px] items-center justify-center sm:h-[220px] sm:min-h-[220px] lg:h-[240px] lg:min-h-[240px] ${className}`}
    >
      <div
        className="pointer-events-none flex w-full max-w-[min(100%,360px)] items-center justify-center px-2 select-none"
        inert
      >
        <div className="origin-center scale-[0.82] sm:scale-[0.9] lg:scale-95" style={{ transformOrigin: 'center center' }}>
          <HeroGaugeVisual compact className="mx-auto max-h-[190px] sm:max-h-[210px] lg:max-h-[230px]" />
        </div>
      </div>
    </div>
  );
}

export function HomeLensPlatformCardVisual({ className = '' }: { className?: string }) {
  return (
    <div className={`${cardTray} flex h-[200px] min-h-[200px] items-center justify-center sm:h-[220px] sm:min-h-[220px] lg:h-[240px] lg:min-h-[240px] ${className}`}>
      <div className="pointer-events-none flex w-full max-w-[min(100%,360px)] items-center justify-center px-2 select-none" inert>
        <div className="w-full scale-[0.92] sm:scale-95 lg:scale-100" style={{ transformOrigin: 'center center' }}>
          <HeroCloudNetworkVisual compact className="mx-auto max-h-[210px] w-full" />
        </div>
      </div>
    </div>
  );
}
