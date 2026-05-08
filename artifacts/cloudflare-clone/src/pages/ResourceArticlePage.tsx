import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useRoute } from 'wouter';
import { format } from 'date-fns';
import { Link2, Linkedin, Mail } from 'lucide-react';
import { toast } from 'sonner';
import NotFound from '@/pages/not-found';
import { capturePosthogEvent } from '@/lib/apexlyn-analytics-consent';
import { cn } from '@/lib/utils';
import {
  getPublishedResource,
  getRelatedResources,
  resourceCategoryToPosthog,
  isResourceCategory,
} from '@/lib/apexlyn-resources';

type TocItem = { id: string; text: string };

export default function ResourceArticlePage() {
  const [match, params] = useRoute('/resources/:category/:slug');
  const articleRef = useRef<HTMLElement>(null);
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const scrollMarks = useRef<Set<string>>(new Set());

  const resource = useMemo(() => {
    if (!match || !params) return undefined;
    const { category, slug } = params;
    if (!isResourceCategory(category)) return undefined;
    return getPublishedResource(category, slug);
  }, [match, params]);

  useEffect(() => {
    if (!resource) return;
    capturePosthogEvent('resource_viewed', {
      title: resource.title,
      category: resourceCategoryToPosthog(resource.category),
    });
  }, [resource]);

  useEffect(() => {
    if (!resource) return;
    const title = resource.title;
    const marks = [25, 50, 75, 100];
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      if (max <= 0) return;
      const pct = Math.round((el.scrollTop / max) * 100);
      for (const m of marks) {
        if (pct >= m && !scrollMarks.current.has(String(m))) {
          scrollMarks.current.add(String(m));
          capturePosthogEvent('resource_scroll_depth', { depth: `${m}%`, title });
        }
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [resource]);

  useEffect(() => {
    if (!resource) return;
    const title = resource.title;
    const t = window.setTimeout(() => {
      capturePosthogEvent('resource_time_on_page', { seconds: 60, title });
    }, 60_000);
    return () => window.clearTimeout(t);
  }, [resource]);

  useEffect(() => {
    if (!resource) return;
    const el = articleRef.current;
    if (!el) return;
    const hs = Array.from(el.querySelectorAll('h2'));
    const items: TocItem[] = hs.map((h, i) => {
      let id = h.id;
      if (!id) {
        id = `section-${i}`;
        h.id = id;
      }
      return { id, text: h.textContent?.trim() || `Section ${i + 1}` };
    });
    setToc(items);
  }, [resource]);

  useEffect(() => {
    if (!resource || toc.length === 0) return;
    const els = toc.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-40% 0px -45% 0px', threshold: [0, 0.1, 0.25, 0.5, 1] },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [resource, toc]);

  if (!match || !params) return null;

  const { category, slug } = params;
  if (!isResourceCategory(category)) return <NotFound />;
  if (!resource) return <NotFound />;

  if (!resource.content || resource.content.trim().length < 20) {
    return <NotFound />;
  }

  const published = format(new Date(resource.publishedDate), 'd MMMM yyyy');
  const updated =
    resource.updatedDate != null ? format(new Date(resource.updatedDate), 'd MMMM yyyy') : null;
  const pageUrl =
    typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : '';
  const categoryLabel =
    category === 'whitepapers' ? 'Whitepapers' : category === 'framework-guides' ? 'Framework guides' : 'AI risk briefs';

  const related = getRelatedResources(resource, 3);

  const onShare = (method: 'linkedin' | 'email' | 'copy_link') => {
    capturePosthogEvent('resource_share_clicked', { method });
    const encUrl = encodeURIComponent(pageUrl);
    const encTitle = encodeURIComponent(resource.title);
    if (method === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encUrl}`, '_blank', 'noopener,noreferrer');
    } else if (method === 'email') {
      window.location.href = `mailto:?subject=${encTitle}&body=${encUrl}`;
    } else {
      void navigator.clipboard.writeText(pageUrl).then(() => toast.success('Copied!'));
    }
  };

  return (
    <div className="flex flex-col bg-white">
      <section className="bg-[#0B1320] pt-12 pb-10 text-center lg:pt-20 lg:pb-12">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <p className="mb-3 text-[13px] text-[#93C5FD]">
            <Link href="/resources" className="hover:underline">
              Resources
            </Link>
            <span className="text-white/50"> · </span>
            <span className="text-white/80">{categoryLabel}</span>
          </p>
          <h1 className="text-[28px] font-bold leading-tight text-white lg:text-[44px]">{resource.title}</h1>
          <p className="mt-4 text-[13px] text-white/60">
            Published {published} · {resource.readingTime} minute read · {resource.tags[0] ?? categoryLabel}
          </p>
        </div>
      </section>

      <div className="border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto flex max-w-[1060px] flex-col gap-12 px-4 py-12 lg:flex-row lg:justify-center lg:gap-12 lg:px-6 lg:py-16">
          <article
            ref={articleRef}
            className="apex-resource-article w-full max-w-[720px] min-w-0"
            dangerouslySetInnerHTML={{ __html: resource.content }}
          />

          <aside className="hidden w-[280px] shrink-0 lg:block">
            <div className="sticky top-28 space-y-8">
              <div>
                <p className="mb-3 text-[14px] font-medium text-[#6B7280]">Table of contents</p>
                <nav aria-label="Table of contents" className="space-y-2">
                  {toc.map((t) => (
                    <a
                      key={t.id}
                      href={`#${t.id}`}
                      onClick={() =>
                        capturePosthogEvent('resource_toc_clicked', { heading: t.text })
                      }
                      className={cn(
                        'block text-[14px] leading-snug no-underline transition-colors hover:text-[#1E3A8A]',
                        activeId === t.id ? 'font-medium text-[#1E3A8A]' : 'text-[#6B7280]',
                      )}
                    >
                      {t.text}
                    </a>
                  ))}
                </nav>
              </div>
              <div>
                <p className="mb-3 text-[14px] font-medium text-[#6B7280]">Share</p>
                <div className="flex gap-4">
                  <button
                    type="button"
                    aria-label="Share on LinkedIn"
                    onClick={() => onShare('linkedin')}
                    className="text-[#6B7280] transition-colors hover:text-[#1E3A8A]"
                  >
                    <Linkedin className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Share by email"
                    onClick={() => onShare('email')}
                    className="text-[#6B7280] transition-colors hover:text-[#1E3A8A]"
                  >
                    <Mail className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Copy link"
                    onClick={() => onShare('copy_link')}
                    className="text-[#6B7280] transition-colors hover:text-[#1E3A8A]"
                  >
                    <Link2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <div className="bg-[#F7F9FC] px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-[720px] border-t border-[#E5E7EB] pt-10">
          <p className="text-[14px] text-[#9CA3AF]">
            Written by the APEXLyn team.
            <br />
            Published {published}.
            {updated ? (
              <>
                <br />
                Last updated {updated}.
              </>
            ) : null}
          </p>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="bg-[#F7F9FC] px-4 pb-16 sm:px-6">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="mb-6 text-[22px] font-bold text-[#0B1320]">Related resources</h2>
            <div className="flex flex-col gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/resources/${r.category}/${r.slug}`}
                  onClick={() =>
                    capturePosthogEvent('resource_related_clicked', { related_title: r.title })
                  }
                  className="block rounded-xl border border-[#E5E7EB] bg-white p-6 transition-shadow hover:shadow-md"
                >
                  <p className="text-[18px] font-semibold text-[#0B1320]">{r.title}</p>
                  <p className="mt-2 line-clamp-2 text-[14px] text-[#4B5563]">{r.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-white px-4 py-16 text-center sm:px-6">
        <div className="mx-auto max-w-[560px]">
          <h2 className="text-[20px] font-semibold text-[#0B1320]">Have questions about this topic?</h2>
          <Link
            href="/contact"
            onClick={() => capturePosthogEvent('resource_cta_clicked', {})}
            className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-md bg-[#1E3A8A] px-6 text-[15px] font-semibold text-white hover:bg-[#172E73]"
          >
            Start a conversation
          </Link>
        </div>
      </section>
    </div>
  );
}
