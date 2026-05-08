import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { format } from 'date-fns';
import { AlertTriangle, BookOpen, FileText } from 'lucide-react';
import { capturePosthogEvent } from '@/lib/apexlyn-analytics-consent';
import { PdfDownloadGateModal, type PdfGateToast } from '@/components/forms/PdfDownloadGateModal';
import {
  HUBSPOT_FORM_IDS,
  submitHubSpotForm,
  validateAnyEmail,
} from '@/lib/apexlyn-form-shared';
import { FieldError, fieldErrorInputClass } from '@/components/forms/FieldError';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import {
  type ResourceCategory,
  type ResourceRecord,
  getPublishedInCategory,
  resourceCategoryToPosthog,
  RESOURCE_CATEGORY_ANCHOR,
} from '@/lib/apexlyn-resources';

const FEATURE_CARD =
  'flex h-full w-full cursor-pointer flex-col rounded-xl border border-[#E5E7EB] border-l-[3px] border-l-[#1E3A8A] bg-white p-8 text-left shadow-[0_1px_0_rgba(11,19,32,0.06)] transition-shadow hover:shadow-md';

function scrollToAnchor(id: string) {
  requestAnimationFrame(() =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
  );
}

function categoryCtaLabel(cat: ResourceCategory): string {
  if (cat === 'framework-guides') return 'Read guide →';
  if (cat === 'ai-risk-briefs') return 'Read brief →';
  return 'Read whitepaper →';
}

function ResourceListingCard({
  resource,
  category,
  onDownloadPdf,
}: {
  resource: ResourceRecord;
  category: ResourceCategory;
  onDownloadPdf: (r: ResourceRecord) => void;
}) {
  const href = `/resources/${category}/${resource.slug}`;
  const published = format(new Date(resource.publishedDate), 'd MMMM yyyy');
  const tag =
    category === 'whitepapers'
      ? 'Compliance evidence'
      : category === 'framework-guides'
        ? 'Essential Eight'
        : 'AI governance';

  return (
    <div className="flex flex-col gap-6 rounded-xl border border-[#E5E7EB] bg-white p-8 lg:flex-row lg:items-stretch">
      <div className="min-w-0 flex-[0_0_100%] lg:flex-[7]">
        <h3 className="text-[20px] font-semibold text-[#0B1320]">{resource.title}</h3>
        <p className="mt-2 text-[15px] leading-[1.6] text-[#4B5563]">{resource.description}</p>
        <p className="mt-3 flex flex-wrap items-center gap-2 text-[13px] text-[#9CA3AF]">
          <span>Published {published}</span>
          <span aria-hidden>·</span>
          <span>{resource.readingTime} minute read</span>
          <span aria-hidden>·</span>
          <span className="rounded bg-[#F0F2F5] px-2 py-0.5 text-[12px] font-medium text-[#4B5563]">
            {tag}
          </span>
        </p>
      </div>
      <div className="flex flex-[0_0_100%] shrink-0 items-center justify-start lg:flex-[3] lg:justify-end">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href={href}
            onClick={() =>
              capturePosthogEvent('resources_item_clicked', {
                title: resource.title,
                category: resourceCategoryToPosthog(category),
              })
            }
            className="inline-flex items-center justify-center rounded-md border border-[#1E3A8A] bg-white px-5 py-3 text-[15px] font-semibold text-[#1E3A8A] transition-colors hover:bg-[#F0F4FF]"
          >
            {categoryCtaLabel(category)}
          </Link>
          {resource.pdfUrl ? (
            <button
              type="button"
              onClick={() => onDownloadPdf(resource)}
              className="inline-flex items-center justify-center rounded-md bg-[#1E3A8A] px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#172E73]"
            >
              Download PDF
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function InterestBlock({ category }: { category: ResourceCategory }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const body =
    category === 'whitepapers'
      ? 'We are preparing our first whitepapers on compliance evidence and security posture for Australian organisations.'
      : category === 'framework-guides'
        ? 'We are preparing practical framework guides covering Essential Eight, ISO 27001, APRA CPS 234, and other frameworks relevant to Australian organisations.'
        : 'We are preparing focused briefings on AI governance risks, regulatory developments, and practical governance steps for Australian organisations.';

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(undefined);
    const err = validateAnyEmail(email);
    if (err) {
      setError(err);
      return;
    }
    setBusy(true);
    try {
      await submitHubSpotForm(HUBSPOT_FORM_IDS.apexlyn_resource_interest, [
        { name: 'email', value: email.trim() },
        {
          name: 'interest_category',
          value:
            category === 'whitepapers'
              ? 'whitepapers'
              : category === 'framework-guides'
                ? 'framework_guides'
                : 'ai_risk_briefs',
        },
        { name: 'page_url', value: typeof window !== 'undefined' ? window.location.href : '' },
      ]);
      capturePosthogEvent('resources_interest_registered', {
        category: resourceCategoryToPosthog(category),
      });
      setDone(true);
    } catch {
      setError('Something went wrong. Please try again later.');
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <p className="text-center text-[16px] text-[#1F8A70]" role="status">
        We will notify you when new{' '}
        {category === 'whitepapers'
          ? 'whitepapers'
          : category === 'framework-guides'
            ? 'framework guides'
            : 'AI risk briefs'}{' '}
        are published.
      </p>
    );
  }

  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white p-8 text-center">
      <p className="text-[15px] leading-relaxed text-[#4B5563]">{body}</p>
      <p className="mt-4 text-[15px] font-medium text-[#0B1320]">
        Register your interest to be notified when new{' '}
        {category === 'whitepapers'
          ? 'whitepapers'
          : category === 'framework-guides'
            ? 'guides'
            : 'briefs'}{' '}
        are published.
      </p>
      <form onSubmit={onSubmit} className="mx-auto mt-6 max-w-[480px] space-y-3" noValidate>
        <div className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor={`interest-email-${category}`}>
          Your work email
        </label>
        <input
          id={`interest-email-${category}`}
          type="email"
          autoComplete="email"
          placeholder="Your work email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(undefined);
          }}
          onBlur={() => setError(validateAnyEmail(email) ?? undefined)}
          className={cn(
            'h-12 min-h-[48px] w-full flex-1 rounded-lg border border-[#D1D5DB] bg-white px-4 text-[16px] text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#1E3A8A] focus:outline-none focus:shadow-[0_0_0_3px_rgba(30,58,138,0.1)]',
            error && fieldErrorInputClass,
          )}
        />
        <button
          type="submit"
          disabled={busy}
          className="inline-flex h-12 min-h-[48px] shrink-0 items-center justify-center rounded-md border border-[#1E3A8A] bg-white px-5 text-[15px] font-semibold text-[#1E3A8A] hover:bg-[#F0F4FF] disabled:opacity-70"
        >
          {busy ? (
            <>
              <Spinner className="mr-2 text-[#1E3A8A]" />
              Sending…
            </>
          ) : (
            'Notify me'
          )}
        </button>
        </div>
        <FieldError id={`interest-err-${category}`} message={error} />
      </form>
    </div>
  );
}

function CategorySection({
  category,
  bgClass,
  onDownloadPdf,
}: {
  category: ResourceCategory;
  bgClass: 'white' | 'mist';
  onDownloadPdf: (r: ResourceRecord) => void;
}) {
  const id = RESOURCE_CATEGORY_ANCHOR[category];
  const items = getPublishedInCategory(category);
  const hasItems = items.length > 0;

  const title =
    category === 'whitepapers'
      ? 'Whitepapers'
      : category === 'framework-guides'
        ? 'Framework guides'
        : 'AI risk briefs';

  return (
    <section
      id={id}
      className={cn('scroll-mt-[96px] py-16 lg:py-20', bgClass === 'mist' ? 'bg-[#F7F9FC]' : 'bg-white')}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <h2 className="mb-8 text-[28px] font-bold text-[#0B1320] lg:text-[32px]">{title}</h2>
        <div className="flex flex-col gap-6">
          {hasItems
            ? items.map((r) => (
                <ResourceListingCard
                  key={r.slug}
                  resource={r}
                  category={category}
                  onDownloadPdf={onDownloadPdf}
                />
              ))
            : null}
          {!hasItems ? <InterestBlock category={category} /> : null}
        </div>
      </div>
    </section>
  );
}

export default function ResourcesUnifiedPage() {
  const [loc] = useLocation();
  const [pdfOpen, setPdfOpen] = useState(false);
  const [pdfRes, setPdfRes] = useState<ResourceRecord | null>(null);
  const [pdfToast, setPdfToast] = useState<PdfGateToast>(null);

  useEffect(() => {
    capturePosthogEvent('resources_page_viewed', {});
  }, []);

  useEffect(() => {
    if (!pdfToast) return;
    const t = window.setTimeout(() => setPdfToast(null), 3000);
    return () => window.clearTimeout(t);
  }, [pdfToast]);

  useEffect(() => {
    if (!loc.startsWith('/resources')) return;
    const sec = new URLSearchParams(window.location.search).get('sec');
    const valid = sec === 'whitepapers' || sec === 'framework-guides' || sec === 'ai-risk-briefs';
    if (valid) {
      scrollToAnchor(sec);
      window.history.replaceState(null, '', `/resources#${sec}`);
      return;
    }
    const hash = (window.location.hash || '').replace(/^#/, '');
    if (hash === 'whitepapers' || hash === 'framework-guides' || hash === 'ai-risk-briefs') {
      scrollToAnchor(hash);
    }
  }, [loc]);

  const onCategoryClick = (cat: ResourceCategory) => {
    capturePosthogEvent('resources_category_clicked', { category: resourceCategoryToPosthog(cat) });
    scrollToAnchor(RESOURCE_CATEGORY_ANCHOR[cat]);
  };

  return (
    <div className="flex flex-col bg-white">
      <section className="bg-[#0B1320] pt-12 pb-8 text-center lg:pt-20 lg:pb-12">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <p className="mb-3 text-[14px] font-medium uppercase tracking-wide text-[#93C5FD]">Resources</p>
          <h1 className="mb-4 text-[32px] font-bold text-white lg:text-[48px]">Resources</h1>
          <p className="mx-auto max-w-[560px] text-[16px] leading-[1.7] text-white/[0.85] lg:text-[18px]">
            Practical guidance on compliance evidence, framework assessment, and AI governance for Australian
            organisations. Written by the team behind Track and Lens.
          </p>
        </div>
      </section>

      <section className="bg-white py-12 pb-12 lg:py-16 lg:pb-12">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            <button type="button" className={FEATURE_CARD} onClick={() => onCategoryClick('whitepapers')}>
              <FileText className="h-8 w-8 text-[#1E3A8A]" aria-hidden />
              <h2 className="mt-4 text-[18px] font-bold text-[#0B1320]">Whitepapers</h2>
              <p className="mt-3 flex-grow text-[15px] leading-relaxed text-[#4B5563]">
                In-depth analysis of compliance evidence, security posture, and how evidence infrastructure changes the
                equation for Australian organisations.
              </p>
            </button>
            <button type="button" className={FEATURE_CARD} onClick={() => onCategoryClick('framework-guides')}>
              <BookOpen className="h-8 w-8 text-[#1E3A8A]" aria-hidden />
              <h2 className="mt-4 text-[18px] font-bold text-[#0B1320]">Framework guides</h2>
              <p className="mt-3 flex-grow text-[15px] leading-relaxed text-[#4B5563]">
                Practical guides to specific compliance frameworks — what they require, what evidence looks like, and how
                to prepare for assessment.
              </p>
            </button>
            <button type="button" className={FEATURE_CARD} onClick={() => onCategoryClick('ai-risk-briefs')}>
              <AlertTriangle className="h-8 w-8 text-[#1E3A8A]" aria-hidden />
              <h2 className="mt-4 text-[18px] font-bold text-[#0B1320]">AI risk briefs</h2>
              <p className="mt-3 flex-grow text-[15px] leading-relaxed text-[#4B5563]">
                Focused briefings on AI governance risks, regulatory developments, and practical steps for managing AI
                use across your organisation.
              </p>
            </button>
          </div>
        </div>
      </section>

      <CategorySection
        category="whitepapers"
        bgClass="mist"
        onDownloadPdf={(res) => {
          setPdfRes(res);
          setPdfOpen(true);
        }}
      />
      <CategorySection
        category="framework-guides"
        bgClass="white"
        onDownloadPdf={(res) => {
          setPdfRes(res);
          setPdfOpen(true);
        }}
      />
      <CategorySection
        category="ai-risk-briefs"
        bgClass="mist"
        onDownloadPdf={(res) => {
          setPdfRes(res);
          setPdfOpen(true);
        }}
      />

      <section className="border-t border-[#E5E7EB] bg-white px-4 py-16 text-center sm:px-6">
        <div className="mx-auto max-w-[800px]">
          <h2 className="text-[24px] font-bold text-[#0B1320] lg:text-[28px]">Want to discuss what you have read?</h2>
          <p className="mt-4 text-[17px] text-[#4B5563]">
            If any of our resources raised questions about your organisation&apos;s compliance posture or AI governance,
            we are happy to discuss. No obligation.
          </p>
          <Link
            href="/contact"
            onClick={() => capturePosthogEvent('resources_cta_clicked', {})}
            className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-md bg-[#1E3A8A] px-6 text-[15px] font-semibold text-white transition-colors hover:bg-[#172E73]"
          >
            Start a conversation
          </Link>
        </div>
      </section>

      <PdfDownloadGateModal
        open={pdfOpen}
        resource={pdfRes}
        onClose={() => setPdfOpen(false)}
        onToast={setPdfToast}
      />
      {pdfToast ? (
        <div className="fixed bottom-6 left-1/2 z-[10090] -translate-x-1/2 rounded-[8px] bg-[#0B1320] px-6 py-3 font-sans text-[14px] font-normal text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
          {pdfToast.message}
        </div>
      ) : null}
    </div>
  );
}
