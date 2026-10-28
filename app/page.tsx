"use client";

import { Hero } from "@/components/Hero";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Header from "@/components/Header";
import AboutPage from "@/components/About";
import HomePortfolioShowcase from "@/components/PortfolioShowcase";
import Design from "@/components/Design";
import AIEngineering from "@/components/AIEngineering";
import GridBackground from "@/components/GridBackground";
import SiteFooter from "@/components/SiteFooter";

/* Each section component renders its own <section id aria-labelledby>;
   the ids are the hash targets used by the Header and the CTAs. */
export default function Home() {
  return (
    <div className="h-screen scroll-smooth">
      <GridBackground />
      <Header />
      <main
        id="page-scroll-container"
        className="h-full overflow-y-auto overflow-x-hidden scroll-smooth"
      >
        <Hero />
        <AboutPage />
        <Skills />
        <HomePortfolioShowcase />
        <Design />
        <AIEngineering />
        <Contact />
        <SiteFooter />
      </main>
    </div>
  );
}
