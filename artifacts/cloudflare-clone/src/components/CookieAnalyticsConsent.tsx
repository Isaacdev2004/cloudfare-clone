import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { getAnalyticsConsent, initPostHogAfterConsent, setAnalyticsConsent } from '@/lib/apexlyn-analytics-consent';

/**
 * §19 — Bottom cookie / analytics consent. PostHog initialises only after Accept.
 */
export function CookieAnalyticsConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getAnalyticsConsent() === null);
  }, []);

  const onAccept = () => {
    setAnalyticsConsent('accepted');
    initPostHogAfterConsent();
    setVisible(false);
  };

  const onDecline = () => {
    setAnalyticsConsent('declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Analytics cookies"
      className="apex-cookie-consent-banner fixed inset-x-0 bottom-0 z-[10040] border-t border-[#E5E7EB] bg-white px-6 py-4 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] sm:px-12"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="min-w-0 flex-1 text-[14px] font-normal leading-relaxed text-[#4B5563]">
          <p>
            We use privacy-focused analytics to understand how visitors use this site. We do not use advertising cookies or
            share data with third parties. Analytics data stays in Australia.
          </p>
          <p className="mt-2">
            Learn more in our{' '}
            <Link href="/cookies" className="font-normal text-[#1E3A8A] underline">
              Cookie Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-shrink-0 flex-wrap items-center gap-3 sm:gap-4">
          <button
            type="button"
            className="inline-flex min-h-[40px] items-center rounded-md bg-[#1E3A8A] px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#172E73] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2"
            onClick={onAccept}
          >
            Accept
          </button>
          <button
            type="button"
            className="text-[14px] font-normal text-[#6B7280] underline decoration-transparent underline-offset-2 transition-colors hover:underline hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2"
            onClick={onDecline}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
