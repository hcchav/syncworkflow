import type { Metadata } from 'next';

import { RequestAuditPage } from '@/modules/request-audit/RequestAuditPage';

export const metadata: Metadata = {
  title: 'Request Your Free Audit',
  description:
    'Request a free audit of website conversion, intake friction, and response follow-up for a small law firm.',
};

export default function Page() {
  return <RequestAuditPage />;
}
