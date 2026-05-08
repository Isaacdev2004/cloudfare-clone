import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

/** §26.1 — Thin top loading bar on client route changes (Vite + Wouter). */
export function RouteLoadingBar() {
  const [loc] = useLocation();
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    setPulse((p) => p + 1);
  }, [loc]);

  return (
    <div
      key={pulse}
      className="apex-route-loading-bar pointer-events-none fixed top-0 left-0 right-0 z-[10060] h-0.5 overflow-hidden"
      aria-hidden
    >
      <div className="apex-route-loading-bar-inner h-full w-full bg-[#1E3A8A]" />
    </div>
  );
}
