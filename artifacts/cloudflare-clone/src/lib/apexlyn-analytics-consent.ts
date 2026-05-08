export const ANALYTICS_CONSENT_COOKIE = 'apexlyn_analytics_consent' as const;
export type AnalyticsConsentValue = 'accepted' | 'declined';

const ONE_YEAR_SEC = 60 * 60 * 24 * 365;

const LEGAL_ANALYTICS_QUIET_PATHS = new Set(['/privacy', '/terms', '/cookies', '/disclaimer']);

export function isLegalAnalyticsQuietPath(pathname: string): boolean {
  const p = pathname.split('?')[0] || '/';
  return LEGAL_ANALYTICS_QUIET_PATHS.has(p);
}

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const row = document.cookie.split(';').map((c) => c.trim()).find((c) => c.startsWith(`${name}=`));
  if (!row) return null;
  return decodeURIComponent(row.slice(name.length + 1));
}

export function getAnalyticsConsent(): AnalyticsConsentValue | null {
  const v = readCookie(ANALYTICS_CONSENT_COOKIE);
  if (v === 'accepted' || v === 'declined') return v;
  return null;
}

export function setAnalyticsConsent(value: AnalyticsConsentValue): void {
  if (typeof document === 'undefined') return;
  const secure = typeof window !== 'undefined' && window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${ANALYTICS_CONSENT_COOKIE}=${encodeURIComponent(value)}; Path=/; Max-Age=${ONE_YEAR_SEC}; SameSite=Lax${secure}`;
}

let posthogInitStarted = false;

type PosthogWithQuiet = {
  set_config: (cfg: { autocapture?: boolean }) => void;
  stopSessionRecording?: () => void;
  startSessionRecording?: () => void;
};

function applyPosthogLegalQuietMode(posthog: PosthogWithQuiet, pathname: string): void {
  const quiet = isLegalAnalyticsQuietPath(pathname);
  try {
    posthog.set_config({ autocapture: !quiet });
    if (quiet) posthog.stopSessionRecording?.();
    else posthog.startSessionRecording?.();
  } catch {
    /* PostHog may not be fully initialised */
  }
}

/**
 * §56.3 — On legal pages, disable autocapture / session recording beyond the default page view.
 */
export function syncPosthogLegalPageMode(pathname: string): void {
  if (getAnalyticsConsent() !== 'accepted') return;
  void import('posthog-js')
    .then(({ default: posthog }) => {
      applyPosthogLegalQuietMode(posthog as PosthogWithQuiet, pathname);
    })
    .catch(() => {});
}

/**
 * §19.4 — Initialise PostHog only after explicit Accept. No-op if key missing.
 */
export function initPostHogAfterConsent(): void {
  const key = import.meta.env.VITE_PUBLIC_POSTHOG_KEY as string | undefined;
  const host = (import.meta.env.VITE_PUBLIC_POSTHOG_HOST as string | undefined) || 'https://us.i.posthog.com';
  if (!key) return;
  if (posthogInitStarted) return;
  posthogInitStarted = true;

  void import('posthog-js')
    .then(({ default: posthog }) => {
      posthog.init(key, {
        api_host: host,
        persistence: 'localStorage+cookie',
        autocapture: true,
        capture_pageview: false,
        loaded: (ph) => {
          applyPosthogLegalQuietMode(ph as PosthogWithQuiet, window.location.pathname);
        },
      });
    })
    .catch(() => {
      posthogInitStarted = false;
    });
}

/** §27.13 — Fire custom events only when analytics consent is accepted. */
export function capturePosthogEvent(event: string, properties?: Record<string, unknown>): void {
  if (getAnalyticsConsent() !== 'accepted') return;
  if (typeof window !== 'undefined' && isLegalAnalyticsQuietPath(window.location.pathname)) return;
  void import('posthog-js')
    .then(({ default: posthog }) => {
      posthog.capture(event, properties);
    })
    .catch(() => {});
}

/**
 * §57.2 — Manual pageviews (PostHog init capture_pageview disabled).
 * Ensures 404 pageviews include attempted path properties.
 */
export function captureApexPageView(opts: {
  path: string;
  attemptedPath?: string;
  is404?: boolean;
}): void {
  if (getAnalyticsConsent() !== 'accepted') return;
  void import('posthog-js')
    .then(({ default: posthog }) => {
      const props: Record<string, unknown> = {};
      if (opts.attemptedPath) props.attempted_path = opts.attemptedPath;
      if (opts.is404) props.is_404 = true;
      posthog.capture('$pageview', props);
    })
    .catch(() => {});
}
