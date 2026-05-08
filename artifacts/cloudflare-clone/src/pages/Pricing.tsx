import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { capturePosthogEvent } from '@/lib/apexlyn-analytics-consent';
import {
  TRACK_PRICING_CARDS,
  LENS_PRICING_CARDS,
  TRACK_COMPARE_CATEGORIES,
  LENS_COMPARE_CATEGORIES,
  PRICING_BILLING_BLOCKS,
  PRICING_FAQ_ITEMS,
  featureListLabel,
  type PricingCardDef,
  type PricingPlatform,
  type CompareCell,
  type CompareCategoryDef,
} from '@/lib/apexlyn-pricing-content';

const CONTACT = '/contact';
const BASELINE = '/baseline';

function PlatformToggle({
  value,
  onChange,
  className,
}: {
  value: PricingPlatform;
  onChange: (p: PricingPlatform) => void;
  className?: string;
}) {
  const select = (p: PricingPlatform) => {
    if (p !== value) {
      onChange(p);
      capturePosthogEvent('pricing_platform_toggled', { platform: p });
    }
  };
  return (
    <div
      className={cn('inline-flex rounded-[24px] bg-white/10 p-1', className)}
      role="tablist"
      aria-label="Pricing platform"
    >
      <button
        type="button"
        role="tab"
        aria-selected={value === 'track'}
        onClick={() => select('track')}
        className={cn(
          'rounded-[20px] px-6 py-2.5 text-[15px] font-medium transition-all duration-200 ease-out',
          value === 'track'
            ? 'bg-white text-[#0B1320]'
            : 'bg-transparent text-white/70 hover:text-white',
        )}
      >
        Track
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={value === 'lens'}
        onClick={() => select('lens')}
        className={cn(
          'rounded-[20px] px-6 py-2.5 text-[15px] font-medium transition-all duration-200 ease-out',
          value === 'lens'
            ? 'bg-white text-[#0B1320]'
            : 'bg-transparent text-white/70 hover:text-white',
        )}
      >
        Lens
      </button>
    </div>
  );
}

function CompareCellDisplay({ cell }: { cell: CompareCell }) {
  if (cell === true) {
    return <span className="text-[16px] font-semibold text-[#1F8A70]">✓</span>;
  }
  if (cell === false) {
    return <span className="text-[14px] font-normal text-[#CBD5E1]">—</span>;
  }
  return <span className="text-[13px] text-[#4B5563]">{cell}</span>;
}

function PricingComparisonTable({ categories }: { categories: CompareCategoryDef[] }) {
  let rowIndex = 0;
  return (
    <div className="relative -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[720px] border-collapse overflow-hidden rounded-lg border border-[#E5E7EB] text-left">
        <thead className="sticky top-0 z-10">
          <tr className="bg-[#0B1320] text-white">
            <th className="px-4 py-3 text-[14px] font-semibold" style={{ width: '40%' }}>
              Feature
            </th>
            <th className="px-4 py-3 text-center text-[14px] font-semibold">Standard</th>
            <th className="px-4 py-3 text-center text-[14px] font-semibold">Professional</th>
            <th className="px-4 py-3 text-center text-[14px] font-semibold">Enterprise</th>
            <th className="px-4 py-3 text-center text-[14px] font-semibold">Sovereign</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((block) => (
            <React.Fragment key={block.title}>
              <tr className="bg-[#F0F2F5]">
                <td
                  colSpan={5}
                  className="border-b border-[#E5E7EB] px-4 py-3 text-[14px] font-semibold text-[#0B1320]"
                >
                  {block.title}
                </td>
              </tr>
              {block.rows.map((row) => {
                const stripe = rowIndex % 2 === 0 ? 'bg-white' : 'bg-[#FAFBFC]';
                rowIndex += 1;
                return (
                  <tr key={row.feature} className={stripe}>
                    <td className="border-b border-[#E5E7EB] px-4 py-3 text-[14px] text-[#4B5563]">
                      {row.feature}
                    </td>
                    <td className="border-b border-[#E5E7EB] px-4 py-3 text-center align-middle">
                      <CompareCellDisplay cell={row.standard} />
                    </td>
                    <td className="border-b border-[#E5E7EB] px-4 py-3 text-center align-middle">
                      <CompareCellDisplay cell={row.professional} />
                    </td>
                    <td
                      className="border-b border-[#E5E7EB] px-4 py-3 text-center align-middle"
                      style={{ backgroundColor: 'rgba(30,58,138,0.03)' }}
                    >
                      <CompareCellDisplay cell={row.enterprise} />
                    </td>
                    <td className="border-b border-[#E5E7EB] px-4 py-3 text-center align-middle">
                      <CompareCellDisplay cell={row.sovereign} />
                    </td>
                  </tr>
                );
              })}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PricingTierCard({
  card,
  platform,
}: {
  card: PricingCardDef;
  platform: PricingPlatform;
}) {
  const highlighted = card.recommended;
  const primaryStyles =
    'w-full min-h-[48px] inline-flex items-center justify-center rounded-md bg-[#1E3A8A] px-4 text-[15px] font-semibold text-white transition-colors hover:bg-[#172E73] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2';
  const secondaryStyles =
    'w-full min-h-[48px] inline-flex items-center justify-center rounded-md border border-[#1E3A8A] bg-transparent px-4 text-[15px] font-semibold text-[#1E3A8A] transition-colors hover:bg-[#1E3A8A]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2';

  return (
    <article
      className={cn(
        'flex h-full flex-col rounded-xl border bg-white p-8',
        highlighted
          ? 'border-2 border-[#1E3A8A] shadow-[0_4px_16px_rgba(30,58,138,0.1)]'
          : 'border-[#E5E7EB]',
      )}
    >
      <div className="flex-1">
        {card.recommended ? (
          <span className="mb-2 inline-block rounded-xl bg-[#1E3A8A] px-3 py-1 text-[12px] font-semibold text-white">
            Recommended
          </span>
        ) : null}
        <h3 className="text-[24px] font-bold text-[#0B1320]">{card.tierName}</h3>
        <div className="mt-2 flex flex-wrap items-baseline gap-1">
          <span className="text-[36px] font-bold text-[#0B1320]">{card.price}</span>
          {card.period ? (
            <span className="text-[16px] font-normal text-[#6B7280]">{card.period}</span>
          ) : null}
        </div>
        <p className="mt-1 text-[13px] text-[#9CA3AF]">{card.priceNote}</p>
        <p className="mt-6 text-[15px] leading-[1.6] text-[#4B5563]">{card.description}</p>
        <hr className="my-6 border-[#E5E7EB]" />
        <p className="text-[14px] font-semibold text-[#0B1320]">{featureListLabel(card.featureListKind)}</p>
        <ul className="mt-3 flex flex-col gap-2 text-[14px] leading-snug text-[#4B5563]">
          {card.features.map((f) => (
            <li key={f}>— {f}</li>
          ))}
        </ul>
      </div>
      <Link
        href={CONTACT}
        onClick={() =>
          capturePosthogEvent('pricing_card_cta_clicked', { platform, tier: card.tierName })
        }
        className={cn('mt-8', card.ctaStyle === 'primary' ? primaryStyles : secondaryStyles)}
      >
        {card.ctaLabel}
      </Link>
    </article>
  );
}

function CollapsibleBlock({
  label,
  children,
  onExpand,
}: {
  label: string;
  children: React.ReactNode;
  onExpand: () => void;
}) {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next) onExpand();
  };
  return (
    <div className="rounded-lg border border-[#E5E7EB] bg-white">
      <button
        type="button"
        onClick={toggle}
        className="flex w-full cursor-pointer items-center gap-2 px-4 py-4 text-left text-[15px] font-medium text-[#0B1320] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2"
        aria-expanded={open}
      >
        <span className="flex-1">{label}</span>
        <ChevronDown className={cn('h-4 w-4 shrink-0 transition-transform', open && 'rotate-180')} aria-hidden />
      </button>
      <div
        className={cn(
          'grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="min-h-0">
          <div className="border-t border-[#E5E7EB] px-4 pb-4 pt-2 text-[15px] font-normal leading-[1.7] text-[#4B5563]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Pricing() {
  const [platform, setPlatform] = useState<PricingPlatform>('track');
  const comparisonSeen = useRef<Record<PricingPlatform, boolean>>({ track: false, lens: false });
  const timeSent = useRef(false);
  const pageStart = useRef<number | null>(null);
  const cards = platform === 'track' ? TRACK_PRICING_CARDS : LENS_PRICING_CARDS;
  const compareCats = platform === 'track' ? TRACK_COMPARE_CATEGORIES : LENS_COMPARE_CATEGORIES;

  useEffect(() => {
    capturePosthogEvent('pricing_page_viewed', {});
    pageStart.current = Date.now();
    const t = window.setTimeout(() => {
      if (timeSent.current || pageStart.current == null) return;
      timeSent.current = true;
      const seconds = Math.max(60, Math.round((Date.now() - pageStart.current) / 1000));
      capturePosthogEvent('pricing_time_on_page', { seconds });
    }, 60000);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = document.getElementById('pricing-comparison-table');
    if (!el) return undefined;

    const maybeFire = () => {
      if (comparisonSeen.current[platform]) return;
      const rect = el.getBoundingClientRect();
      const visible = rect.top < window.innerHeight && rect.bottom > 0;
      if (visible) {
        comparisonSeen.current[platform] = true;
        capturePosthogEvent('pricing_comparison_viewed', { platform });
      }
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e?.isIntersecting) return;
        if (comparisonSeen.current[platform]) return;
        comparisonSeen.current[platform] = true;
        capturePosthogEvent('pricing_comparison_viewed', { platform });
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    requestAnimationFrame(maybeFire);

    return () => io.disconnect();
  }, [platform]);

  return (
    <div className="flex flex-col bg-white">
      <section className="bg-[#0B1320] pt-12 pb-8 lg:pt-20 lg:pb-16">
        <div className="mx-auto max-w-[1200px] px-4 text-center sm:px-6">
          <p className="mb-4 text-[14px] font-medium uppercase tracking-[0.5px] text-[#93C5FD]">Pricing</p>
          <h1 className="mx-auto mb-6 max-w-[720px] text-[32px] font-bold leading-tight text-white lg:text-[48px]">
            Pricing that scales with your evidence requirements
          </h1>
          <p className="mx-auto mb-8 max-w-[600px] text-[16px] font-normal leading-[1.7] text-white/[0.85] lg:text-[18px]">
            Both platforms use the same tier structure — Standard, Professional, Enterprise, and Sovereign. Start where
            your organisation is today. Every tier includes the immutable evidence model, Australian data residency, and
            independent report verification.
          </p>
          <PlatformToggle value={platform} onChange={setPlatform} className="mx-auto" />
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:items-stretch">
            {cards.map((card) => (
              <PricingTierCard key={card.id} card={card} platform={platform} />
            ))}
          </div>
          <div className="mx-auto mt-0 max-w-[800px] pb-2 pt-8 text-center">
            <p className="mb-2 text-[16px] font-semibold text-[#0B1320]">Annual billing: save 15%</p>
            <p className="text-[14px] leading-relaxed text-[#6B7280]">
              Standard and Professional plans are available with monthly or annual billing. Annual plans are billed
              upfront and include a 15% discount. Enterprise and Sovereign plans are contract-based with custom billing
              schedules.
              <br />
              <br />
              All prices shown are in Australian dollars (AUD) excluding GST.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F9FC] py-12 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <h2 className="text-center text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2.25rem]">
            Compare tiers
          </h2>
          <p className="mx-auto mb-8 mt-2 max-w-[720px] text-center text-[15px] text-[#6B7280]">
            A detailed comparison of what each tier includes. This table shows {platform === 'track' ? 'Track' : 'Lens'}{' '}
            features. Toggle to {platform === 'track' ? 'Lens' : 'Track'} to see {platform === 'track' ? 'Lens' : 'Track'}{' '}
            features.
          </p>
          <div className="mb-8 flex justify-center">
            <PlatformToggle value={platform} onChange={setPlatform} />
          </div>
          <div id="pricing-comparison-table">
            <PricingComparisonTable categories={compareCats} />
          </div>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-20">
        <div className="mx-auto max-w-[800px] px-4 text-center sm:px-6">
          <h2 className="mb-6 text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl">
            Use Track and Lens together
          </h2>
          <p className="text-[17px] leading-[1.7] text-[#4B5563]">
            Many organisations use both platforms — Track for compliance evidence and Lens for AI governance. The
            platforms share the same evidence architecture, the same tier structure, and the same tenant isolation model.
          </p>
          <p className="mt-4 text-[17px] leading-[1.7] text-[#4B5563]">
            When you use both platforms together, your organisation gets a unified evidence infrastructure: compliance
            evidence and AI governance evidence from the same proof model, the same immutable storage, the same
            verification capability, and the same governance workflow.
          </p>
          <p className="mt-4 text-[17px] leading-[1.7] text-[#4B5563]">
            Contact us to discuss combined Track and Lens pricing for your organisation.
          </p>
          <Link
            href={CONTACT}
            onClick={() => capturePosthogEvent('pricing_combined_cta_clicked', {})}
            className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-md bg-[#1E3A8A] px-6 text-[15px] font-semibold text-white transition-colors hover:bg-[#172E73] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2"
          >
            Discuss combined pricing
          </Link>
        </div>
      </section>

      <section className="bg-[#F7F9FC] py-12 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <h2 className="mb-4 text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl">
                MSP &amp; Partner pricing
              </h2>
              <p className="text-[17px] leading-[1.7] text-[#4B5563]">
                APEXLyn Partner is designed for managed service providers who deliver Track and Lens to their client
                base. Partner pricing is structured differently from direct pricing — consolidated billing, per-client
                seat accounting, partner tier discounts, and minimum-commit arrangements.
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-[#4B5563]">
                Partner pricing is not published on this page because it is tailored to your practice size, client count,
                and growth plan. We will provide a detailed proposal based on your specific requirements.
              </p>
              <Link
                href={CONTACT}
                onClick={() => capturePosthogEvent('pricing_partner_cta_clicked', {})}
                className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-md bg-[#1E3A8A] px-6 text-[15px] font-semibold text-white transition-colors hover:bg-[#172E73] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2"
              >
                Request partner pricing
              </Link>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-xl border border-[#E5E7EB] bg-white p-8">
                <h3 className="text-[18px] font-semibold text-[#0B1320]">What APEXLyn Partner includes</h3>
                <ul className="mt-4 flex flex-col gap-2.5 text-[15px] text-[#4B5563]">
                  <li>— White-label portal and reports</li>
                  <li>— Portfolio dashboard (500+ tenants)</li>
                  <li>— Consolidated billing</li>
                  <li>— Per-client seat accounting</li>
                  <li>— Template propagation</li>
                  <li>— Client onboarding management</li>
                  <li>— Client lockout and direct-conversion tracking</li>
                  <li>— Partner support tier</li>
                  <li>— Co-branded report generation</li>
                  <li>— Partner audit history</li>
                </ul>
                <Link
                  href="/industries/msp-partners"
                  className="mt-6 inline-block text-[14px] font-medium text-[#1E3A8A] transition-colors hover:text-[#172E73]"
                >
                  See full MSP &amp; Partners details →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-[800px] px-4 sm:px-6">
          <h2 className="mb-8 text-center text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl">
            Billing details
          </h2>
          <div className="flex flex-col gap-3">
            {PRICING_BILLING_BLOCKS.map((b) => (
              <CollapsibleBlock
                key={b.label}
                label={b.label}
                onExpand={() => capturePosthogEvent('pricing_billing_expanded', { section: `${b.label} ▾` })}
              >
                {b.body}
              </CollapsibleBlock>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F7F9FC] py-12 lg:py-20">
        <div className="mx-auto max-w-[800px] px-4 sm:px-6">
          <h2 className="mb-8 text-center text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl">
            Common pricing questions
          </h2>
          <div className="flex flex-col gap-3">
            {PRICING_FAQ_ITEMS.map((item) => (
              <CollapsibleBlock
                key={item.question}
                label={item.question}
                onExpand={() =>
                  capturePosthogEvent('pricing_faq_expanded', { question: `${item.question} ▾` })
                }
              >
                {item.answer.includes('Request your baseline assessment') ? (
                  <>
                    {item.answer.split('Request your baseline assessment')[0]}
                    <Link href={BASELINE} className="font-medium text-[#1E3A8A] underline hover:text-[#172E73]">
                      Request your baseline assessment
                    </Link>
                    {item.answer.split('Request your baseline assessment')[1]}
                  </>
                ) : (
                  item.answer
                )}
              </CollapsibleBlock>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0B1320] py-12 lg:py-20">
        <div className="mx-auto max-w-[800px] px-4 text-center sm:px-6">
          <h2 className="mb-6 text-[1.65rem] font-bold leading-tight text-white sm:text-3xl">
            Find the right plan for your organisation
          </h2>
          <p className="mx-auto mb-10 max-w-[640px] text-[17px] leading-relaxed text-white/80">
            Not sure which tier is right? Start a conversation and we will help you determine the right fit based on your
            compliance requirements, AI governance needs, team size, and growth plans.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-3">
            <Link
              href={CONTACT}
              onClick={() => capturePosthogEvent('pricing_final_cta_clicked', { cta_label: 'Start a conversation' })}
              className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-white px-5 text-[15px] font-semibold text-[#0B1320] transition-colors hover:bg-[#E5E7EB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1320]"
            >
              Start a conversation
            </Link>
            <Link
              href={BASELINE}
              onClick={() =>
                capturePosthogEvent('pricing_final_cta_clicked', { cta_label: 'Request your baseline assessment' })
              }
              className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-white/50 bg-transparent px-5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1320]"
            >
              Request your baseline assessment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
