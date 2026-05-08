import React from 'react';
import { Link, useLocation } from 'wouter';
import type { LegalPageSlug } from '@/generated/legal-dates';
import { getLegalEffectiveDate, getLegalLastUpdated } from '@/lib/apexlyn-legal-format';
import { APEXLN_COMPANY } from '@/lib/apexlyn-company';
import { getCanonicalPath } from '@/lib/apexlyn-seo';
import { SITE_ORIGIN } from '@/lib/apexlyn-site-origin';
import { cn } from '@/lib/utils';

const LINKS: { href: string; label: string }[] = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Use' },
  { href: '/cookies', label: 'Cookie Policy' },
  { href: '/disclaimer', label: 'Disclaimer' },
];

export function LegalCrossNav({ path }: { path: string }) {
  const norm = path.split('?')[0] || '/';
  return (
    <nav aria-label="Legal pages" className="legal-cross-nav mb-10 border-b border-[#E5E7EB] pb-6">
      <p className="text-[14px] font-normal leading-relaxed text-[#1E3A8A]">
        {LINKS.map((l, i) => {
          const isHere = norm === l.href;
          return (
            <span key={l.href}>
              {i > 0 ? <span className="text-[#9CA3AF]"> · </span> : null}
              {isHere ? (
                <span className="font-bold text-[#0B1320]">{l.label}</span>
              ) : (
                <Link href={l.href} className="text-[#1E3A8A] hover:underline">
                  {l.label}
                </Link>
              )}
            </span>
          );
        })}
      </p>
    </nav>
  );
}

type ShellProps = {
  slug: LegalPageSlug;
  path: string;
  h1: React.ReactNode;
  showCrossNav?: boolean;
  toc?: React.ReactNode;
  children: React.ReactNode;
  footerSlot?: React.ReactNode;
};

export function LegalPageShell({
  slug,
  path,
  h1,
  showCrossNav = true,
  toc,
  children,
  footerSlot,
}: ShellProps) {
  const [loc] = useLocation();
  const last = getLegalLastUpdated(slug);
  const effective = getLegalEffectiveDate();
  const pathCanon = getCanonicalPath(loc.split('?')[0] || '/');
  const printUrl = `${SITE_ORIGIN}${pathCanon === '/' ? '' : pathCanon}`;

  return (
    <div className="min-h-screen bg-white">
      <div className={cn('legal-page-print-root mx-auto max-w-[800px] px-4 pb-20 pt-12 sm:px-6')}>
        <h1 className="mb-2 text-[36px] font-bold text-[#0B1320]">{h1}</h1>
        <p className="mb-8 text-[14px] text-[#9CA3AF]">
          Effective date: {effective}
          <br />
          Last updated: {last}
        </p>
        <p className="mb-12 text-[15px] text-[#6B7280]">
          {APEXLN_COMPANY.legalName} (ABN {APEXLN_COMPANY.abn})
        </p>

        {showCrossNav ? <LegalCrossNav path={path} /> : null}
        {toc}
        <div className="legal-page-body">{children}</div>
        {footerSlot}
        <footer className="legal-print-url mt-16 hidden border-t border-[#E5E7EB] pt-4 text-[9pt] text-[#6B7280] print:fixed print:bottom-0 print:left-0 print:right-0 print:z-[1] print:mt-0 print:block print:border-t-0 print:bg-white print:px-4 print:py-2 print:text-center">
          {printUrl}
        </footer>
      </div>
    </div>
  );
}
