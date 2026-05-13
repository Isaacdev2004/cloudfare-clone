import React from 'react';
import { HeroCloudNetworkVisual } from '@/components/hero/HeroCloudNetworkVisual';
import { HeroFrameworkOrbitVisual } from '@/components/hero/HeroFrameworkOrbitVisual';

/**
 * §27.3 — Same approved hero visuals as the original Track/Lens hero toggle:
 * - Track: `HeroFrameworkOrbitVisual` (framework globe + cloud).
 * - Lens: `HeroCloudNetworkVisual` compact (cloud network).
 * Embedded in cards with scale + `inert` so orbit controls are not interactive inside the article.
 */

const cardTray =
  'relative mb-6 w-full overflow-hidden rounded-lg border border-[#E5E7EB] bg-[#F7F9FC] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]';

export function HomeTrackPlatformCardVisual({ className = '' }: { className?: string }) {
  return (
    <div className={`${cardTray} h-[200px] sm:h-[220px] lg:h-[240px] ${className}`}>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none" inert>
        <div
          className="origin-center scale-[0.30] sm:scale-[0.33] lg:scale-[0.36]"
          style={{ width: 680, height: 680 }}
        >
          <HeroFrameworkOrbitVisual className="!max-w-[680px] w-[680px]" />
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
