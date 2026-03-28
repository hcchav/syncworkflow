import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import { Suspense } from 'react';

import './globals.css';

import { PageViewTracker } from '@/components/analytics/PageViewTracker';
import { siteConfig } from '@/lib/site';
import { AnalyticsProvider } from '@/providers/posthog-provider';

const cormorantGaramond = Cormorant_Garamond({
  variable: '--font-serif',
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600', '700'],
});

const manrope = Manrope({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: '%s | SyncWorkflow',
  },
  description: siteConfig.description,
  authors: [{ name: 'SyncWorkflow' }],
  creator: 'SyncWorkflow',
  publisher: 'SyncWorkflow',
  metadataBase: new URL(siteConfig.url),
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: 'SyncWorkflow',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${manrope.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="bg-background font-sans text-foreground antialiased" suppressHydrationWarning>
        <AnalyticsProvider>
          <Suspense fallback={null}>
            <PageViewTracker />
          </Suspense>
          {children}
        </AnalyticsProvider>
      </body>
    </html>
  );
}
