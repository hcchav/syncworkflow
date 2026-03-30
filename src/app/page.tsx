import type { Metadata } from 'next';

import { HomePage } from '@/modules/home/HomePage';

export const metadata: Metadata = {
  title: 'Find What Is Costing Your Law Firm New Calls | Free Audit',
  description:
    'Free private audits for law firms that want to find what is costing them new calls on the homepage, form, and next step.',
};

export default function Page() {
  return <HomePage />;
}
