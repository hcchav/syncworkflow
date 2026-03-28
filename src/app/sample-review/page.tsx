import type { Metadata } from 'next';

import { getSampleAudit } from '@/lib/local-audits';
import { SampleReviewPage } from '@/modules/review/SampleReviewPage';

export const metadata: Metadata = {
  title: 'Sample Review',
  description:
    'A sanitized example of the free SyncWorkflow audit format for small law firms.',
};

export default function Page() {
  return <SampleReviewPage audit={getSampleAudit()} />;
}
