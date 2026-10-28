import type { Metadata, Viewport } from "next";
import { Quicksand, Protest_Revolution } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import VisitorPing from "@/components/VisitorPing";
import FloatingCTA from "@/components/FloatingCTA";
import ExitIntentPopup from "@/components/ExitIntentPopup";

import "./globals.css";

const protest = Protest_Revolution({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-protest",
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
});

// Matches --page-bg in globals.css.
export const viewport: Viewport = {
  themeColor: "#030712",
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
      className={`${quicksand.variable} ${protest.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[var(--page-bg)] font-sans text-[var(--text-primary)] antialiased">
        {children}
        <Analytics />
        <VisitorPing />
        <FloatingCTA />
        <ExitIntentPopup />
      </body>
    </html>
  );
}
