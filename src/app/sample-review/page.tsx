import type { Metadata } from 'next';

import { getSampleAudit } from '@/lib/local-audits';
import { SampleReviewPage } from '@/modules/review/SampleReviewPage';

export const metadata: Metadata = {
  title: 'Sample Review',
  description:
    'A public sample of the SyncWorkflow review format for a law firm website.',
};

export default function Page() {
  return <SampleReviewPage audit={getSampleAudit()} />;
}
