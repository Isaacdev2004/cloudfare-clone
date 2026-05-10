/** Placeholders until replaced in production. */

export const APEXLN_COMPANY = {
  legalName: 'APEXLyn Pty Ltd',
  abn: '[ABN NUMBER]',
  phone: '[PHONE NUMBER]',
  email: 'hello@apexlyn.com.au',
  websiteDisplay: 'www.apexlyn.com.au',
  location: 'Sydney, NSW, Australia',
  hosting: 'AWS Sydney (ap-southeast-2)',
} as const;

export const FOUNDER_LINKEDIN_URL =
  (import.meta.env.VITE_PUBLIC_FOUNDER_LINKEDIN_URL as string | undefined) ||
  (import.meta.env.VITE_FOUNDER_LINKEDIN_URL as string | undefined) ||
  'https://www.linkedin.com/company/apexlyn';

export const FOUNDER_IMAGE_URL = (import.meta.env.VITE_FOUNDER_IMAGE_URL as string | undefined) || '';
