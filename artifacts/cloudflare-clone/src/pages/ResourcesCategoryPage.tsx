import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import ResourcesUnifiedPage from '@/pages/ResourcesUnifiedPage';

type Props = {
  category: 'whitepapers' | 'framework-guides' | 'ai-risk-briefs';
};

function scrollToId(id: string) {
  requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
}

/** §58.3 — Optional category pages when activated. */
export function ResourcesCategoryPage({ category }: Props) {
  const [loc] = useLocation();

  useEffect(() => {
    const pathOnly = (loc || '').split('?')[0] || '/';
    if (!pathOnly.startsWith('/resources/')) return;
    scrollToId(category);
  }, [loc, category]);

  return <ResourcesUnifiedPage />;
}

