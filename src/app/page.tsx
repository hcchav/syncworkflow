import TradeshowLanding from '@/components/templates/tradeshow-landing';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trade Show Lead Generation — $2 per Qualified Lead | SyncWorkflow',
  description:
    'Gamified lead capture for every trade show. Spin-to-win activations, instant CRM delivery, and performance-based pricing.',
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <main className="w-full">
      <TradeshowLanding />
    </main>
  );
}
