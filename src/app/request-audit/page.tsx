import type { Metadata } from 'next';

import { RequestAuditPage } from '@/modules/request-audit/RequestAuditPage';

export const metadata: Metadata = {
  title: 'Request Your Free Audit',
  description:
    'Request a free audit for your law firm website, form, and reply path.',
};

export default function Page() {
  return <RequestAuditPage />;
}
