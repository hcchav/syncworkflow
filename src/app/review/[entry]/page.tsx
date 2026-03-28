import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getTeaserAuditByEntry } from '@/lib/audit-data';
import { TeaserPage } from '@/modules/review/TeaserPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ entry: string }>;
}): Promise<Metadata> {
  const { entry } = await params;
  const audit = await getTeaserAuditByEntry(entry);

  return {
    title: audit ? `${audit.firm.name} Free Audit Preview` : 'Private Review',
    description: 'Private preview showing part of a free law firm audit.',
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ entry: string }>;
}) {
  const { entry } = await params;
  const audit = await getTeaserAuditByEntry(entry);

  if (!audit) {
    notFound();
  }

  return <TeaserPage audit={audit} entry={entry} />;
}
