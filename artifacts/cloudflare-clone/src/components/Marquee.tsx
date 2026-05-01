import React from 'react';
import { useReducedMotion } from 'framer-motion';

export const Marquee: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className="relative flex w-full flex-wrap justify-center gap-x-10 gap-y-5 px-4 md:gap-x-16">
        {children}
      </div>
    );
  }

  return (
    <div className="pause-on-hover relative flex w-full overflow-hidden">
      {/* Left/Right Fade Gradients */}
      <div className="absolute bottom-0 left-0 top-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="absolute bottom-0 right-0 top-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

      <div className="flex w-fit animate-marquee">
        <div className="flex shrink-0 items-center gap-16 px-4 md:gap-24">{children}</div>
        <div className="flex shrink-0 items-center gap-16 px-4 md:gap-24" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};
