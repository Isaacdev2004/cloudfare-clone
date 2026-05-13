import React from 'react';
import { HeroCloudNetworkVisual } from '@/components/hero/HeroCloudNetworkVisual';
import { HomeHeroEvidenceVisual } from '@/components/home/HomeHeroEvidenceVisual';

/**
 * §27.3 — Platform cards use the **same** Track / Lens art as the original hero toggle (not the global globe):
 * - **Track card:** `HomeHeroEvidenceVisual` (abstract evidence network + line motion).
 * - **Lens card:** `HeroCloudNetworkVisual` compact (cloud / enforcement mesh).
 * Global framework globe stays **only** in the hero (`HeroHomePlatformVisual` → `HeroFrameworkOrbitVisual`).
 */

const cardTray =
  'relative mb-6 w-full overflow-hidden rounded-lg border border-[#E5E7EB] bg-[#F7F9FC] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]';

export function HomeTrackPlatformCardVisual({ className = '' }: { className?: string }) {
  return (
    <div className={`${cardTray} h-[200px] sm:h-[220px] lg:h-[240px] ${className}`}>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none" inert>
        <div
          className="origin-center scale-[0.48] sm:scale-[0.52] lg:scale-[0.55]"
          style={{ width: 400, height: 400 }}
        >
          <HomeHeroEvidenceVisual className="mx-0 !max-w-none h-full w-full" />
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
