import React from 'react';
import { Link, useLocation } from 'wouter';
import { getBreadcrumbsForPath } from '@/lib/apexlyn-jsonld-breadcrumbs';
import { getCanonicalPath } from '@/lib/apexlyn-seo';
import { cn } from '@/lib/utils';

/** §23 — Below header; hidden on homepage. */
export function GlobalBreadcrumbs({ className }: { className?: string }) {
  const [location] = useLocation();
  const path = getCanonicalPath(location.split('?')[0] || '/');
  const items = getBreadcrumbsForPath(path);
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn('apex-global-breadcrumbs border-b border-[#E5E7EB] bg-white', className)}>
      <div className="mx-auto max-w-[1200px] px-4 py-4 sm:px-6">
        <div className="text-[13px] font-normal leading-relaxed text-[#6B7280]">
          {items.map((item, i) => {
            const last = i === items.length - 1;
            return (
              <span key={`${item.href}-${item.label}`}>
                {i > 0 && <span aria-hidden> &gt; </span>}
                {last ? (
                  <span className="text-[#111827]">{item.label}</span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-[#6B7280] transition-colors hover:text-[#1E3A8A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2"
                  >
                    {item.label}
                  </Link>
                )}
              </span>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
