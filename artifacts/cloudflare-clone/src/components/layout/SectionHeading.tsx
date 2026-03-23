import React from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
}) => {
  return (
    <div className={cn("mb-12 font-sans", className)}>
      <h2 className={cn("text-3xl font-bold text-slate-900 mb-2 font-sans", titleClassName)}>{title}</h2>
      {description && (
        <p className={cn("text-slate-600 font-sans", descriptionClassName)}>{description}</p>
      )}
    </div>
  );
};
