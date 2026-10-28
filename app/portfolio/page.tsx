import Portfolio from "@/components/Portfolio";
import type { Metadata } from "next";

const title = "Portfolio | Kabiru Shaibu";
const description =
  "Selected projects by Kabiru Shaibu across Web3, marketplaces, full-stack applications and community platforms.";

export const metadata: Metadata = {
  title: "Portfolio",
  description,
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title,
    description,
    url: "/portfolio",
    siteName: "Kabiru Shaibu",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function PortfolioPage() {
  return (
    <div className="min-h-screen">
      <Portfolio />
    </div>
  );
}
