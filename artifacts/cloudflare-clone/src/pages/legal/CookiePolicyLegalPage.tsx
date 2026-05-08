import React from 'react';
import { useLocation } from 'wouter';
import { LegalPageShell } from '@/components/legal/LegalPageShell';
import { LegalHtmlBody } from '@/pages/legal/LegalHtmlBody';
import body from '@/pages/legal/copy/cookies.html?raw';

export function CookiePolicyPage() {
  const [path] = useLocation();
  return (
    <LegalPageShell slug="cookies" path={path} h1="Cookie Policy">
      <LegalHtmlBody html={body} />
    </LegalPageShell>
  );
}
