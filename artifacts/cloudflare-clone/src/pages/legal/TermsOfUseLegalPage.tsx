import React from 'react';
import { useLocation } from 'wouter';
import { LegalPageShell } from '@/components/legal/LegalPageShell';
import { LegalNumberedToc } from '@/components/legal/LegalNumberedToc';
import { LegalHtmlBody } from '@/pages/legal/LegalHtmlBody';
import t1 from '@/pages/legal/copy/terms-p1.html?raw';
import t2 from '@/pages/legal/copy/terms-p2.html?raw';

const TOC = [
  'Agreement to these terms',
  'About APEXLyn',
  'Your use of this website',
  'Intellectual property',
  'Accuracy of information',
  'No professional advice',
  'Links to third-party websites',
  'Limitation of liability',
  'Indemnification',
  'Australian Consumer Law',
  'Privacy',
  'Governing law and jurisdiction',
  'Severability',
  'Entire agreement',
  'Changes to these terms',
  'Contact us',
] as const;

const BODY = `${t1}${t2}`;

export function TermsOfUsePage() {
  const [path] = useLocation();
  return (
    <LegalPageShell slug="terms" path={path} h1="Terms of Use" toc={<LegalNumberedToc items={[...TOC]} />}>
      <LegalHtmlBody html={BODY} />
    </LegalPageShell>
  );
}
