import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { LOGO_ICON_CANDIDATES, LOGO_WORDMARK_CANDIDATES } from "@/lib/apexlyn-brand";

type ApexlynLogoProps = {
  /** Max height in CSS px (width follows aspect ratio). */
  height?: number;
  /** Optional min-width so wide wordmarks don’t feel tiny (e.g. 220). */
  minWidth?: number;
  className?: string;
  /** Hint LCP / decode first (e.g. header wordmark). */
  priority?: boolean;
  /** `wordmark` = full logo (default). `icon` = symbol only for tight layouts. */
  variant?: "wordmark" | "icon";
  /**
   * On navy / footer bars: subtle shadow so transparent PNG stays crisp and readable.
   */
  forDarkBackground?: boolean;
  /** `start` = left-align mark (footer, header). `center` = centered in container. */
  align?: "start" | "center";
};

/**
 * Brand mark from public/images/logos.
 * Falls back to text monogram if no file loads.
 */
export const ApexlynLogo: React.FC<ApexlynLogoProps> = ({
  height = 28,
  minWidth,
  className,
  variant = "wordmark",
  forDarkBackground = false,
  align = "start",
  priority = false,
}) => {
  const candidates = variant === "icon" ? LOGO_ICON_CANDIDATES : LOGO_WORDMARK_CANDIDATES;
  const [index, setIndex] = useState(0);

  if (index >= candidates.length) {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-md bg-[#1E3A8A] text-white font-bold text-sm px-2",
          className,
        )}
        style={{ height, minWidth: height }}
        aria-hidden
      >
        A
      </span>
    );
  }

  const wrapperStyle: React.CSSProperties = {
    height,
    ...(minWidth != null ? { minWidth } : {}),
  };

  const img = (
    <img
      src={candidates[index]}
      alt="Apexlyn"
      height={height}
      className="apexlyn-logo-img max-h-full w-auto"
      style={{
        height,
        width: "auto",
        maxWidth: "min(100%, 720px)",
        objectFit: "contain",
        objectPosition: align === "start" ? "left center" : "center center",
        imageRendering: "auto",
      }}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : undefined}
      onError={() => setIndex((i) => i + 1)}
    />
  );

  const alignCls = align === "start" ? "justify-start" : "justify-center";

  if (!forDarkBackground) {
    return (
      <span className={cn("inline-flex items-center", alignCls, className)} style={wrapperStyle}>
        {img}
      </span>
    );
  }

  return (
    <span
      className={cn("apexlyn-logo-on-dark inline-flex items-center", alignCls, className)}
      style={wrapperStyle}
    >
      {img}
    </span>
  );
};
