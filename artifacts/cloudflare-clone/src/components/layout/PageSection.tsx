import React from "react";
import { cn } from "@/lib/utils";

type PageSectionProps = {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

export const PageSection: React.FC<PageSectionProps> = ({
  children,
  className,
  contentClassName,
}) => {
  return (
    <section className={cn("py-24", className)}>
      <div className={cn("max-w-[1280px] mx-auto px-6", contentClassName)}>{children}</div>
    </section>
  );
};
