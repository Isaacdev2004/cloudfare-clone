/**
 * Canonical production origin (§20.5–20.6). Override for staging via VITE_PUBLIC_SITE_ORIGIN.
 */
function normalizeOrigin(raw: string): string {
  return raw.replace(/\/$/, '');
}

const fromEnv =
  typeof import.meta.env.VITE_PUBLIC_SITE_ORIGIN === 'string'
    ? import.meta.env.VITE_PUBLIC_SITE_ORIGIN.trim()
    : '';

export const SITE_ORIGIN = normalizeOrigin(fromEnv || 'https://www.apexlyn.com.au');
