import Portfolio from "@/components/Portfolio";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected projects by Kabiru Shaibu across Web3, marketplaces, full-stack applications and community platforms.",
};

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-[var(--page-bg)]">
      <Portfolio />
    </div>
  );
}
