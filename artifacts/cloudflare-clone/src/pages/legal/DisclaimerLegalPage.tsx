import React from 'react';
import { useLocation } from 'wouter';
import { LegalPageShell } from '@/components/legal/LegalPageShell';
import { LegalHtmlBody } from '@/pages/legal/LegalHtmlBody';
import body from '@/pages/legal/copy/disclaimer.html?raw';

export function DisclaimerPage() {
  const [path] = useLocation();
  return (
    <LegalPageShell slug="disclaimer" path={path} h1="Disclaimer">
      <LegalHtmlBody html={body} />
    </LegalPageShell>
  );
}
