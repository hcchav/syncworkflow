import BoatTradeshowLanding from '@/components/templates/boat-tradeshow-landing';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Boat Show Lead Gen — $2 per Qualified Lead | SyncWorkflow',
  description: 'Proven spin-to-win QR system from the pet industry, now tailored to boat shows. Pay only for qualified leads with our gamified booth experience.',
  keywords: 'boat show leads, trade show marketing, qualified leads, spin to win, QR code marketing, boat industry marketing',
  authors: [{ name: 'SyncWorkflow' }],
  creator: 'SyncWorkflow',
  publisher: 'SyncWorkflow',
  robots: 'index, follow',
  openGraph: {
    title: 'Boat Show Lead Gen — $2 per Qualified Lead',
    description: 'Turn boat show traffic into qualified leads with our proven spin-to-win system. Pay only for results.',
    url: '/boat-tradeshow',
    siteName: 'SyncWorkflow',
    type: 'website',
    images: [
      {
        url: '/images/boat-show-og.jpg', // TODO: Add this image
        width: 1200,
        height: 630,
        alt: 'Boat Show Lead Generation System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boat Show Lead Gen — $2 per Qualified Lead',
    description: 'Turn boat show traffic into qualified leads with our proven spin-to-win system.',
    images: ['/images/boat-show-og.jpg'], // TODO: Add this image
  },
  alternates: {
    canonical: '/boat-tradeshow',
  },
};

export default function BoatTradeshowPage() {
  return <BoatTradeshowLanding />;
}
