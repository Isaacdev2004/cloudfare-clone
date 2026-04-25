/**
 * APEXLyn Public Website — approved naming (Master Specification §3).
 * Do not use service names for package tiers, or package tier names for services.
 */

export const PLATFORM_DISPLAY = {
  track: 'APEXLyn Track',
  lens: 'APEXLyn Lens',
} as const;

export type PackageTier = 'Core' | 'Control' | 'Assurance' | 'Sovereign' | 'Partner';

export const PACKAGE_TIERS: readonly PackageTier[] = [
  'Core',
  'Control',
  'Assurance',
  'Sovereign',
  'Partner',
] as const;

export const APPROVED_SERVICES = [
  'Cyber Security Services',
  'AI Governance Advisory',
  'Compliance Operations',
] as const;

export function publicPackageName(platform: 'Track' | 'Lens', tier: PackageTier): string {
  return `APEXLyn ${platform} ${tier}`;
}
