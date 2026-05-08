import React, { useState } from 'react';
import { Link } from 'wouter';
import {
  ChevronDown,
  Palette,
  LayoutDashboard,
  Copy,
  CreditCard,
  UserCheck,
  ArrowRightLeft,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { capturePosthogEvent } from '@/lib/apexlyn-analytics-consent';
import type { IndustryPageConfig, MspFeatureCard } from '@/lib/apexlyn-industry-types';
import { HealthcareDataShieldVisual } from '@/components/industry/HealthcareDataShieldVisual';

const RELEVANCE_HEADER: Record<string, string> = {
  healthcare: 'Relevance to healthcare',
  legal: 'Relevance to legal',
  accounting: 'Relevance to accounting',
  insurance: 'Relevance to insurance',
  'professional-services': 'Relevance to professional services',
};

const MSP_ICONS: Record<MspFeatureCard['icon'], LucideIcon> = {
  palette: Palette,
  'layout-dashboard': LayoutDashboard,
  copy: Copy,
  'credit-card': CreditCard,
  'user-check': UserCheck,
  'arrow-right-left': ArrowRightLeft,
};

function FrameworkCell({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <>
      {lines.map((line, i) => (
        <React.Fragment key={i}>
          {i > 0 ? <br /> : null}
          {line}
        </React.Fragment>
      ))}
    </>
  );
}

function IndustryExpandable({
  eventPrefix,
  label,
  children,
}: {
  eventPrefix: string;
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next) capturePosthogEvent(`${eventPrefix}_layer2_expanded`, { section: label });
  };
  return (
    <div className="rounded-lg border border-[#E5E7EB] bg-white p-4">
      <button
        type="button"
        onClick={toggle}
        className="flex w-full cursor-pointer items-center gap-2 text-left text-[15px] font-medium text-[#1E3A8A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2"
        aria-expanded={open}
      >
        <span className="flex-1">{label}</span>
        <ChevronDown
          className={cn('h-4 w-4 shrink-0 transition-transform duration-300', open && 'rotate-180')}
          aria-hidden
        />
      </button>
      <div
        className={cn(
          'grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="min-h-0">
          <div className="mt-3 border-t border-[#E5E7EB] pt-3 text-[15px] font-normal leading-[1.7] text-[#4B5563]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionShell({
  bg,
  children,
  className,
}: {
  bg: 'white' | 'muted' | 'navy';
  children: React.ReactNode;
  className?: string;
}) {
  const tone = bg === 'white' ? 'bg-white' : bg === 'muted' ? 'bg-[#F7F9FC]' : 'bg-[#0B1320]';
  return (
    <section className={cn(tone, 'py-12 lg:py-20', className)}>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">{children}</div>
    </section>
  );
}

export function IndustryTemplate({ config }: { config: IndustryPageConfig }) {
  const p = config.posthogPrefix;
  const isMsp = config.slug === 'msp-partners';
  const isInsurance = config.slug === 'insurance';

  const trackBlock = (
    <div
      className={cn(
        'grid grid-cols-1 gap-10 lg:gap-12',
        config.track.summaryCard != null && 'lg:grid-cols-12 lg:items-start',
      )}
    >
      <div className={cn(config.track.summaryCard != null && 'lg:col-span-6')}>
        <h2 className="mb-6 text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2rem]">
          {config.track.h2}
        </h2>
        <p className="mb-6 text-[15px] font-normal leading-[1.7] text-[#4B5563] lg:text-[16px]">{config.track.layer1}</p>
        {config.track.layer2 ? (
          <IndustryExpandable eventPrefix={p} label={config.track.layer2.label}>
            <div className="space-y-4">
              {config.track.layer2.paragraphs.map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
            </div>
          </IndustryExpandable>
        ) : null}
      </div>
      {config.track.summaryCard != null ? (
        <div className="lg:col-span-6">
          <div className="rounded-xl border border-[#E5E7EB] bg-white p-8">
            <h3 className="text-[18px] font-semibold text-[#0B1320]">{config.track.summaryCard.title}</h3>
            <ul className="mt-6 space-y-3 text-[15px] text-[#4B5563]">
              {config.track.summaryCard.bullets.map((item) => (
                <li key={item}>— {item}</li>
              ))}
            </ul>
            <p className="mt-8 text-[13px] text-[#6B7280]">{config.track.summaryCard.foot}</p>
          </div>
        </div>
      ) : null}
    </div>
  );

  const lensBlock = (
    <div
      className={cn(
        'grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12',
        config.lens.showHealthcareVisual && 'lg:items-start',
      )}
    >
      {config.lens.showHealthcareVisual ? (
        <div className="order-2 flex justify-center lg:order-1 lg:col-span-5">
          <HealthcareDataShieldVisual />
        </div>
      ) : null}
      <div
        className={cn(
          'order-1 lg:order-2',
          config.lens.showHealthcareVisual ? 'lg:col-span-7' : 'lg:col-span-12',
        )}
      >
        <h2 className="mb-6 text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2rem]">
          {config.lens.h2}
        </h2>
        <div className="space-y-4 text-[15px] leading-[1.7] text-[#4B5563] lg:text-[16px]">
          {config.lens.body.map((para) => (
            <p key={para.slice(0, 48)}>{para}</p>
          ))}
        </div>
        <Link
          href="/contact"
          onClick={() => capturePosthogEvent(`${p}_lens_cta`, {})}
          className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-md border border-[#1E3A8A] bg-transparent px-6 text-[15px] font-semibold text-[#1E3A8A] transition-colors hover:bg-[#1E3A8A]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2"
        >
          {config.lens.lensCtaLabel}
        </Link>
      </div>
    </div>
  );

  const frameworksBlock =
    config.frameworksTable != null ? (
      <>
        <h2 className="mb-8 text-center text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2.25rem]">
          {config.frameworksTable.h2}
        </h2>
        <div className="hidden overflow-hidden rounded-lg border border-[#E5E7EB] lg:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-[#F7F9FC]">
                <th className="border border-[#E5E7EB] px-4 py-3 text-[14px] font-semibold text-[#0B1320]">
                  Framework
                </th>
                <th className="border border-[#E5E7EB] px-4 py-3 text-[14px] font-semibold text-[#0B1320]">
                  {RELEVANCE_HEADER[config.slug] ?? 'Relevance'}
                </th>
              </tr>
            </thead>
            <tbody>
              {config.frameworksTable.rows.map((row, i) => (
                <tr key={row.framework} className={i % 2 === 1 ? 'bg-[#FAFBFC]' : 'bg-white'}>
                  <td className="border border-[#E5E7EB] px-4 py-3 text-[14px] text-[#4B5563]">
                    <FrameworkCell text={row.framework} />
                  </td>
                  <td className="border border-[#E5E7EB] px-4 py-3 text-[14px] text-[#4B5563]">
                    {row.relevance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-4 lg:hidden">
          {config.frameworksTable.rows.map((row) => (
            <article key={row.framework} className="rounded-lg border border-[#E5E7EB] bg-white p-4">
              <h3 className="mb-2 text-[15px] font-semibold text-[#0B1320]">
                <FrameworkCell text={row.framework} />
              </h3>
              <p className="text-[14px] leading-relaxed text-[#4B5563]">{row.relevance}</p>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-[680px] text-center text-[13px] text-[#9CA3AF]">
          Framework alignment reflects how Track maps collected evidence to published framework requirements. Assessment
          outputs are evidence-based and should be reviewed by qualified professionals for formal compliance decisions.
        </p>
      </>
    ) : null;

  const howItWorksBlock =
    config.howItWorks != null ? (
      <div className={cn('mx-auto', config.howItWorks.maxWidthClass ?? 'max-w-[800px]')}>
        <h2 className="mb-10 text-center text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl">
          {config.howItWorks.h2}
        </h2>
        <div className="relative pl-2">
          <div className="absolute bottom-3 left-[7px] top-3 w-0.5 bg-[#E5E7EB] sm:left-[9px]" aria-hidden />
          <ol className="relative m-0 list-none space-y-6 p-0">
            {config.howItWorks.steps.map((step) => (
              <li key={step.n} className="relative pl-9 sm:pl-10">
                <span
                  className="absolute left-[7px] top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#1E3A8A] ring-4 ring-white sm:left-[9px]"
                  aria-hidden
                />
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-[14px] font-bold text-[#1E3A8A]">{step.n}</span>
                  <span className="text-[16px] font-semibold text-[#0B1320]">{step.title}</span>
                </div>
                <p className="mt-2 text-[15px] leading-[1.7] text-[#4B5563]">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    ) : null;

  const underwritingBlock =
    config.insuranceUnderwriting != null ? (
      <div className="mx-auto max-w-[1000px] text-center">
        <h2 className="mb-6 text-[1.65rem] font-bold leading-tight text-white sm:text-3xl lg:text-[2rem]">
          {config.insuranceUnderwriting.h2}
        </h2>
        <div className="space-y-4 text-left text-[16px] leading-[1.7] text-white/[0.85]">
          {config.insuranceUnderwriting.intro.map((para) => (
            <p key={para.slice(0, 40)}>{para}</p>
          ))}
        </div>
        <ul className="mx-auto mt-6 max-w-[680px] space-y-2 text-left text-[15px] leading-relaxed text-white/75">
          {config.insuranceUnderwriting.listItems.map((item) => (
            <li key={item}>— {item}</li>
          ))}
        </ul>
        <p className="mx-auto mt-8 max-w-[720px] text-left text-[16px] leading-[1.7] text-white/[0.85]">
          {config.insuranceUnderwriting.closing}
        </p>
        <Link
          href="/contact"
          className="mt-10 inline-flex min-h-[48px] items-center justify-center rounded-md bg-white px-6 text-[15px] font-semibold text-[#0B1320] transition-colors hover:bg-[#E5E7EB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1320]"
        >
          {config.insuranceUnderwriting.ctaLabel}
        </Link>
      </div>
    ) : null;

  const mspCardsBlock =
    config.mspFeatures != null ? (
      <>
        <h2 className="mb-12 text-center text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2.25rem]">
          What APEXLyn Partner gives you
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {config.mspFeatures.map((card) => {
            const Icon = MSP_ICONS[card.icon];
            return (
              <article
                key={card.title}
                className="flex h-full flex-col rounded-xl border border-[#E5E7EB] border-l-[3px] border-l-[#1E3A8A] bg-white p-6 shadow-[0_1px_0_rgba(11,19,32,0.06)] lg:p-8"
              >
                <Icon className="mb-4 h-6 w-6 text-[#1E3A8A]" strokeWidth={1.75} aria-hidden />
                <h3 className="mb-3 text-[18px] font-semibold text-[#0B1320]">{card.title}</h3>
                <p className="text-[15px] leading-relaxed text-[#4B5563]">{card.body}</p>
              </article>
            );
          })}
        </div>
      </>
    ) : null;

  const mspPricingBlock =
    config.mspPartnerPricing != null ? (
      <div className="mx-auto max-w-[720px] text-center">
        <h2 className="mb-6 text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl">{config.mspPartnerPricing.h2}</h2>
        <p className="text-[17px] leading-relaxed text-[#4B5563]">{config.mspPartnerPricing.body}</p>
        <Link
          href="/contact"
          className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-md bg-[#1E3A8A] px-6 text-[15px] font-semibold text-white transition-colors hover:bg-[#172E73] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2"
        >
          {config.mspPartnerPricing.ctaLabel}
        </Link>
        <p className="mt-6 text-[14px] text-[#6B7280]">{config.mspPartnerPricing.foot}</p>
      </div>
    ) : null;

  const finalCta = (
    <div className="mx-auto max-w-[800px] text-center">
      <h2 className="mb-6 text-[1.65rem] font-bold leading-tight text-white sm:text-3xl lg:text-[2.25rem]">
        {config.finalCta.h2}
      </h2>
      <p className="mx-auto mb-10 max-w-[600px] text-[17px] leading-relaxed text-white/80">{config.finalCta.body}</p>
      <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-3">
        <Link
          href={config.finalCta.primaryHref}
          onClick={() => capturePosthogEvent(`${p}_final_cta`, { cta_label: config.finalCta.primaryLabel })}
          className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-white px-5 text-[15px] font-semibold text-[#0B1320] transition-colors hover:bg-[#E5E7EB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1320]"
        >
          {config.finalCta.primaryLabel}
        </Link>
        <Link
          href={config.finalCta.secondaryHref}
          onClick={() => capturePosthogEvent(`${p}_final_cta`, { cta_label: config.finalCta.secondaryLabel })}
          className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-white/50 bg-transparent px-5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1320]"
        >
          {config.finalCta.secondaryLabel}
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col bg-white">
      {/* Hero */}
      <section className="bg-[#0B1320] pb-12 pt-16 lg:pb-20 lg:pt-24">
        <div className="mx-auto max-w-[1200px] px-4 text-center sm:px-6">
          <p className="mb-4 text-[14px] font-medium uppercase tracking-[0.5px] text-[#93C5FD]">{config.hero.eyebrow}</p>
          <h1 className="mb-6 text-[32px] font-bold leading-[1.2] text-white lg:text-[48px]">{config.hero.h1}</h1>
          <p
            className={cn(
              'mx-auto mb-8 text-[16px] font-normal leading-[1.7] text-white/[0.85] lg:text-[18px]',
              config.hero.subMaxWidthClass ?? 'max-w-[640px]',
            )}
          >
            {config.hero.sub}
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href={config.hero.ctas.primaryHref}
              onClick={() => capturePosthogEvent(`${p}_hero_cta`, { cta_label: config.hero.ctas.primaryLabel })}
              className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-white px-6 text-[15px] font-semibold text-[#0B1320] transition-colors hover:bg-[#E5E7EB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1320]"
            >
              {config.hero.ctas.primaryLabel}
            </Link>
            <Link
              href={config.hero.ctas.secondaryHref}
              onClick={() => capturePosthogEvent(`${p}_hero_cta`, { cta_label: config.hero.ctas.secondaryLabel })}
              className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-white/50 bg-transparent px-6 text-[15px] font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1320]"
            >
              {config.hero.ctas.secondaryLabel}
            </Link>
          </div>
        </div>
      </section>

      {isMsp ? (
        <>
          <SectionShell bg="white">{mspCardsBlock}</SectionShell>
          <SectionShell bg="muted">{trackBlock}</SectionShell>
          <SectionShell bg="white">{lensBlock}</SectionShell>
          <SectionShell bg="white">{mspPricingBlock}</SectionShell>
          <SectionShell bg="navy">{finalCta}</SectionShell>
        </>
      ) : (
        <>
          {config.problem != null ? (
            <SectionShell bg="white">
              <div className={cn('mx-auto', config.problem.maxWidthClass ?? 'max-w-[1000px]')}>
                <h2 className="mb-6 text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2rem]">
                  {config.problem.h2}
                </h2>
                <div className="space-y-4 text-[17px] leading-[1.7] text-[#4B5563]">
                  {config.problem.paragraphs.map((para) => (
                    <p key={para.slice(0, 50)}>{para}</p>
                  ))}
                </div>
              </div>
            </SectionShell>
          ) : null}
          <SectionShell bg="muted">{trackBlock}</SectionShell>
          {isInsurance ? <SectionShell bg="navy">{underwritingBlock}</SectionShell> : null}
          <SectionShell bg="white">{lensBlock}</SectionShell>
          {frameworksBlock != null ? <SectionShell bg="muted">{frameworksBlock}</SectionShell> : null}
          {!isInsurance && howItWorksBlock != null ? <SectionShell bg="white">{howItWorksBlock}</SectionShell> : null}
          <SectionShell bg="navy">{finalCta}</SectionShell>
        </>
      )}
    </div>
  );
}
