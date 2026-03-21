import React from 'react';

export const Marquee: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-full overflow-hidden flex pause-on-hover relative">
      {/* Left/Right Fade Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent" />
      
      <div className="flex w-fit animate-marquee">
        <div className="flex shrink-0 px-4 items-center gap-16 md:gap-24">
          {children}
        </div>
        {/* Duplicate for seamless looping */}
        <div className="flex shrink-0 px-4 items-center gap-16 md:gap-24" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};
