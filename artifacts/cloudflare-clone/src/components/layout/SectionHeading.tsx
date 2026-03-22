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
    <div className={cn("mb-12", className)}>
      <h2 className={cn("text-3xl font-bold text-white mb-2", titleClassName)}>{title}</h2>
      {description && (
        <p className={cn("text-[#6b7280]", descriptionClassName)}>{description}</p>
      )}
    </div>
  );
};
