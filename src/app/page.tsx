import Homepage from '@/components/templates/homepage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SyncWorkflow — Turn Trade Show Traffic into Qualified Leads',
  description: 'Gamified lead generation system for trade shows. Verify contacts, qualify leads, and automate follow-ups. Pay only for qualified leads.',
  keywords: 'trade show leads, lead generation, qualified leads, spin to win, QR code marketing, trade show marketing',
  authors: [{ name: 'SyncWorkflow' }],
  creator: 'SyncWorkflow',
  publisher: 'SyncWorkflow',
  robots: 'index, follow',
  openGraph: {
    title: 'SyncWorkflow — Turn Trade Show Traffic into Qualified Leads',
    description: 'Gamified lead generation system for trade shows. Verify contacts, qualify leads, and automate follow-ups.',
    url: '/',
    siteName: 'SyncWorkflow',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SyncWorkflow Lead Generation System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SyncWorkflow — Turn Trade Show Traffic into Qualified Leads',
    description: 'Gamified lead generation system for trade shows. Verify contacts, qualify leads, and automate follow-ups.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: '/',
  },
};

export default function Page() {
  return <Homepage />;
}
