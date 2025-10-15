import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// SEO Defaults with Open Graph
export const metadata: Metadata = {
  title: {
    default: "SyncWorkflow | Turn Booth Traffic into Qualified Leads",
    template: "%s | SyncWorkflow"
  },
  description: "Transform your trade show ROI with our gamified lead capture system. Verified prospects, instant CRM delivery, and 3x more qualified leads guaranteed.",
  keywords: ["trade show leads", "lead capture", "event marketing", "booth traffic", "qualified leads", "CRM integration", "gamification"],
  authors: [{ name: "SyncWorkflow" }],
  creator: "SyncWorkflow",
  publisher: "SyncWorkflow",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://syncworkflow.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  themeColor: "#171717",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://syncworkflow.com",
    title: "SyncWorkflow | Turn Booth Traffic into Qualified Leads",
    description: "Transform your trade show ROI with our gamified lead capture system. Verified prospects, instant CRM delivery, and 3x more qualified leads guaranteed.",
    siteName: "SyncWorkflow",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "SyncWorkflow - Trade Show Lead Capture System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SyncWorkflow | Turn Booth Traffic into Qualified Leads",
    description: "Transform your trade show ROI with our gamified lead capture system. Verified prospects, instant CRM delivery, and 3x more qualified leads guaranteed.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-white text-gray-900`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
