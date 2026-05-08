import React from 'react';
import { Link } from 'wouter';

export default function NotFound() {
  return (
    <section className="w-full bg-[#0B1320] text-white">
      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-[600px] flex-col items-center justify-center px-6 py-16 text-center lg:min-h-[calc(100vh-72px)]">
        <div className="mb-6 select-none font-sans text-[80px] font-bold leading-none text-white/[0.15] sm:text-[120px]">
          404
        </div>
        <h1 className="mb-4 font-sans text-[28px] font-bold leading-tight text-white sm:text-[36px]">
          Page not found
        </h1>
        <p className="mb-8 max-w-[480px] font-sans text-[17px] font-normal leading-[1.7] text-white/[0.8]">
          The page you are looking for does not exist, has been moved, or is temporarily unavailable. If you
          followed a link to get here, please let us know at{' '}
          <a className="text-[#93C5FD] hover:underline" href="mailto:hello@apexlyn.com.au">
            hello@apexlyn.com.au
          </a>{' '}
          so we can fix it.
        </p>

        <div className="flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-white px-6 py-3 text-[15px] font-semibold text-[#0B1320] transition-colors hover:bg-white/90"
          >
            Go to homepage
          </Link>
          <Link
            href="/track"
            className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-white/25 bg-transparent px-6 py-3 text-[15px] font-semibold text-white/90 transition-colors hover:border-white/40 hover:text-white"
          >
            Explore Track
          </Link>
          <Link
            href="/lens"
            className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-white/25 bg-transparent px-6 py-3 text-[15px] font-semibold text-white/90 transition-colors hover:border-white/40 hover:text-white"
          >
            Explore Lens
          </Link>
        </div>

        <p className="mt-6 font-sans text-[14px] font-normal text-white/[0.6]">
          Or try:{' '}
          <Link href="/pricing" className="text-white/[0.7] hover:text-white hover:underline">
            Pricing
          </Link>{' '}
          <span className="text-white/[0.45]">·</span>{' '}
          <Link href="/trust" className="text-white/[0.7] hover:text-white hover:underline">
            Trust Center
          </Link>{' '}
          <span className="text-white/[0.45]">·</span>{' '}
          <Link href="/contact" className="text-white/[0.7] hover:text-white hover:underline">
            Contact
          </Link>
        </p>
      </div>
    </section>
  );
}
