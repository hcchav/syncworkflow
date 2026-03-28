import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getFullAuditByEntry } from '@/lib/audit-data';
import { FullAuditPage } from '@/modules/review/FullAuditPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ entry: string }>;
}): Promise<Metadata> {
  const { entry } = await params;
  const audit = await getFullAuditByEntry(entry);

  return {
    title: audit ? `${audit.firm.name} Full Audit` : 'Private Audit',
    description: 'Private full audit prepared for a small law firm.',
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
  const audit = await getFullAuditByEntry(entry);

  if (!audit) {
    notFound();
  }

  return <FullAuditPage audit={audit} entry={entry} />;
}
