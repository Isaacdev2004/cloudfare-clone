import React from 'react';

/** §52.2 / §53.2 — numbered table of contents with anchor scroll targets. */
export function LegalNumberedToc({ items }: { items: string[] }) {
  return (
    <nav aria-label="Table of contents" className="mb-12 border-l-2 border-solid border-[#E5E7EB] pl-4">
      <ol className="flex list-decimal flex-col gap-2 pl-5 text-[15px] font-normal leading-relaxed text-[#1E3A8A] marker:font-normal marker:text-[#1E3A8A]">
        {items.map((label, i) => (
          <li key={label} className="pl-1">
            <a href={`#section-${i + 1}`} className="text-[#1E3A8A] hover:underline">
              {label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
