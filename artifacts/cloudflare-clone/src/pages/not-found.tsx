import { Link } from 'wouter';
import { PageHero } from '@/components/layout/PageHero';
import { InnerHeroBackdrop, ElevatedCtaBand } from '@/components/layout/InnerPageChrome';
import { CTA } from '@/lib/apexlyn-cta-routes';

export default function NotFound() {
  return (
    <div className="min-h-screen apex-page-bg">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <InnerHeroBackdrop />
        <PageHero
          variant="light"
          eyebrow="Error"
          title="This Page Could Not Be Found"
          description="The page you are looking for may have moved, expired, or never existed."
          className="relative z-[1] bg-transparent"
          contentClassName="relative z-[1] py-16 sm:py-20 lg:py-24 max-w-3xl"
        />
      </section>
      <ElevatedCtaBand>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded px-6 py-3.5 text-[15px] font-semibold text-white transition-colors bg-[#1E3A8A] hover:bg-[#172554] font-sans"
        >
          Return Home
        </Link>
        <Link
          href={CTA.platforms}
          className="inline-flex items-center justify-center rounded border border-slate-300 bg-white px-6 py-3.5 text-[15px] font-semibold text-slate-800 transition-colors hover:bg-slate-50 font-sans"
        >
          Explore Our Platforms
        </Link>
      </ElevatedCtaBand>
    </div>
  );
}
