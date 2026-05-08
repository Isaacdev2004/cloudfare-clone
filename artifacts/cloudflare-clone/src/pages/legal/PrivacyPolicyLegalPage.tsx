import React from 'react';
import { useLocation } from 'wouter';
import { LegalPageShell } from '@/components/legal/LegalPageShell';
import { LegalNumberedToc } from '@/components/legal/LegalNumberedToc';
import { LegalHtmlBody } from '@/pages/legal/LegalHtmlBody';
import p01 from '@/pages/legal/copy/privacy-s01.html?raw';
import p02 from '@/pages/legal/copy/privacy-s02.html?raw';
import p03 from '@/pages/legal/copy/privacy-s03.html?raw';
import p04 from '@/pages/legal/copy/privacy-s04.html?raw';
import p05 from '@/pages/legal/copy/privacy-s05.html?raw';
import p06 from '@/pages/legal/copy/privacy-s06.html?raw';
import p07 from '@/pages/legal/copy/privacy-s07.html?raw';
import p08 from '@/pages/legal/copy/privacy-s08.html?raw';
import p09 from '@/pages/legal/copy/privacy-s09.html?raw';
import p10 from '@/pages/legal/copy/privacy-s10.html?raw';
import p11 from '@/pages/legal/copy/privacy-s11.html?raw';
import p12 from '@/pages/legal/copy/privacy-s12.html?raw';
import p13 from '@/pages/legal/copy/privacy-s13.html?raw';
import p14 from '@/pages/legal/copy/privacy-s14.html?raw';
import p15 from '@/pages/legal/copy/privacy-s15.html?raw';
import p16 from '@/pages/legal/copy/privacy-s16.html?raw';

const TOC = [
  'About this policy',
  'Who we are',
  'What personal information we collect',
  'How we collect your personal information',
  'Why we collect your personal information',
  'How we use your personal information',
  'Who we disclose your personal information to',
  'Overseas disclosure of personal information',
  'How we store and protect your personal information',
  'How long we retain your personal information',
  'Your rights under the Australian Privacy Principles',
  'How to make a privacy complaint',
  'Cookies and website analytics',
  "Children's privacy",
  'Changes to this privacy policy',
  'How to contact us',
] as const;

const BODY = [
  p01,
  p02,
  p03,
  p04,
  p05,
  p06,
  p07,
  p08,
  p09,
  p10,
  p11,
  p12,
  p13,
  p14,
  p15,
  p16,
].join('');

export function PrivacyPolicyPage() {
  const [path] = useLocation();
  return (
    <LegalPageShell slug="privacy" path={path} h1="Privacy Policy" toc={<LegalNumberedToc items={[...TOC]} />}>
      <LegalHtmlBody html={BODY} />
    </LegalPageShell>
  );
}
