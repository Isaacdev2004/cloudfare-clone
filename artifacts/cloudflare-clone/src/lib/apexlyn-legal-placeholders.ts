import { APEXLN_COMPANY } from '@/lib/apexlyn-company';

/** Replace [ABN NUMBER] / [PHONE NUMBER] in legal copy (§51). */
export function injectApexlynLegalPlaceholders(html: string): string {
  return html
    .replace(/\[ABN NUMBER\]/g, APEXLN_COMPANY.abn)
    .replace(/\[PHONE NUMBER\]/g, APEXLN_COMPANY.phone);
}
