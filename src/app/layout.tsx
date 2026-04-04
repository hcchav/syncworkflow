import type { Metadata } from "next";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { CrispChat } from "@/components/crisp-chat";
import "./globals.css";

export const metadata: Metadata = {
  title: "SyncWorkflow | Free Law Firm Website Audits",
  description:
    "Free website audits for California law firms. We scan your site across 14 categories and show you exactly what to fix to convert more clients.",
  keywords: [
    "law firm website audit",
    "legal website review",
    "attorney website analysis",
    "California law firm",
    "website optimization",
    "legal marketing",
  ],
  authors: [{ name: "Heron Chavez", url: "https://syncworkflow.com" }],
  creator: "SyncWorkflow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://syncworkflow.com",
    siteName: "SyncWorkflow",
    title: "Is Your Law Firm Website Losing You Clients?",
    description:
      "Free website audit across 14 categories. Get your score, revenue gap estimate, and actionable fixes in under 60 seconds.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Law Firm Website Audit | SyncWorkflow",
    description:
      "We scan your site across 14 categories and show you exactly what to fix. Results in 60 seconds.",
  },
  metadataBase: new URL("https://syncworkflow.com"),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "SyncWorkflow",
  url: "https://syncworkflow.com",
  description:
    "Free website audits for California law firms. We scan your site across 14 categories and show you exactly what to fix.",
  email: "heron@syncworkflow.com",
  founder: {
    "@type": "Person",
    name: "Heron Chavez",
    jobTitle: "Digital Strategy Consultant",
  },
  areaServed: {
    "@type": "State",
    name: "California",
  },
  serviceType: "Website Audit",
  priceRange: "Free",
  sameAs: ["https://linkedin.com/in/heroncchavez"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-white text-dark-gray">
        <ConvexClientProvider>{children}</ConvexClientProvider>
        <CrispChat />
      </body>
    </html>
  );
}
