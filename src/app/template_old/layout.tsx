import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Template | SyncWorkflow",
  description: "Template landing page for SyncWorkflow",
};

// This layout replaces the root layout completely for this route
export const config = {
  // This tells Next.js this layout should not inherit from the root layout
  layoutSegments: 'root',
};

export default function TemplateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
