import React from 'react';
import NotFound from '@/pages/not-found';
import { IndustryTemplate } from '@/components/industry/IndustryTemplate';
import { getIndustryPageConfig } from '@/lib/industries/index';

type IndustryPageProps = {
  params: { slug?: string };
};

export default function IndustryPage({ params }: IndustryPageProps) {
  const slug = params?.slug ?? '';
  const config = getIndustryPageConfig(slug);
  if (!config) {
    return <NotFound />;
  }
  return <IndustryTemplate config={config} />;
}
