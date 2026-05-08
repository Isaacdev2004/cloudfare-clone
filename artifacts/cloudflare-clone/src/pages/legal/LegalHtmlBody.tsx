import React from 'react';
import { injectApexlynLegalPlaceholders } from '@/lib/apexlyn-legal-placeholders';

export function LegalHtmlBody({ html }: { html: string }) {
  return (
    <div
      className="legal-html"
      dangerouslySetInnerHTML={{ __html: injectApexlynLegalPlaceholders(html) }}
    />
  );
}
