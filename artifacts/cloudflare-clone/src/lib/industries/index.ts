import type { IndustryPageConfig } from '@/lib/apexlyn-industry-types';
import { ACCOUNTING_CONFIG } from '@/lib/industries/accounting';
import { HEALTHCARE_CONFIG } from '@/lib/industries/healthcare';
import { INSURANCE_CONFIG } from '@/lib/industries/insurance';
import { LEGAL_CONFIG } from '@/lib/industries/legal';
import { MSP_PARTNERS_CONFIG } from '@/lib/industries/msp-partners';
import { PROFESSIONAL_SERVICES_CONFIG } from '@/lib/industries/professional-services';

export const INDUSTRY_PAGE_CONFIGS: Record<string, IndustryPageConfig> = {
  healthcare: HEALTHCARE_CONFIG,
  legal: LEGAL_CONFIG,
  accounting: ACCOUNTING_CONFIG,
  insurance: INSURANCE_CONFIG,
  'professional-services': PROFESSIONAL_SERVICES_CONFIG,
  'msp-partners': MSP_PARTNERS_CONFIG,
};

export function getIndustryPageConfig(slug: string): IndustryPageConfig | undefined {
  return INDUSTRY_PAGE_CONFIGS[slug];
}
