import type { Metadata, Viewport } from "next";
import { Archivo, Source_Sans_3 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import VisitorPing from "@/components/VisitorPing";
import FloatingCTA from "@/components/FloatingCTA";
import ExitIntentPopup from "@/components/ExitIntentPopup";

import "./globals.css";

// Display: condensed neo-grotesk (variable; the wdth axis gives the condensed cut).
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

// Body: humanist sans.
const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

// Mirrors --ink-900 in globals.css (metadata needs a literal value).
export const viewport: Viewport = {
  themeColor: "#171B12",
};

/*
 * The home page is a client component and can't export metadata, so the
 * defaults here are the home page's. /portfolio overrides canonical,
 * openGraph and twitter. The og:image / twitter:image come from
 * app/opengraph-image.tsx and app/twitter-image.tsx.
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://www.kabiru.dev"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Kabiru Shaibu | Frontend-Focused Full-Stack Product Engineer",
    template: "%s | Kabiru Shaibu",
  },
  description:
    "Portfolio of Kabiru Shaibu, a frontend-focused full-stack product engineer building accessible SaaS, Web3 and modern web applications with React, TypeScript, Next.js and Node.js.",
  keywords: [
    "Kabiru Shaibu",
    "Frontend Engineer",
    "Full-Stack Product Engineer",
    "React",
    "TypeScript",
    "Next.js",
    "Node.js",
    "Solana",
    "Web3",
    "SaaS",
  ],
  authors: [{ name: "Kabiru Shaibu" }],
  creator: "Kabiru Shaibu",
  openGraph: {
    title: "Kabiru Shaibu | Frontend-Focused Full-Stack Product Engineer",
    description:
      "Portfolio of Kabiru Shaibu, a frontend-focused full-stack product engineer building accessible SaaS, Web3 and modern web applications with React, TypeScript, Next.js and Node.js.",
    url: "/",
    siteName: "Kabiru Shaibu",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kabiru Shaibu | Frontend-Focused Full-Stack Product Engineer",
    description:
      "Frontend-focused full-stack product engineer building accessible SaaS, Web3 and modern web applications.",
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
      className={`${archivo.variable} ${sourceSans.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen font-sans antialiased">
        {children}
        <Analytics />
        <VisitorPing />
        <FloatingCTA />
        <ExitIntentPopup />
      </body>
    </html>
  );
}
