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

export default function Home() {
  return (
    <div className="h-screen scroll-smooth">
      <GridBackground />
      <main
        id="page-scroll-container"
        className="h-full overflow-y-auto overflow-x-hidden scroll-smooth"
      >
        <Header />

        <section id="home" aria-label="Home" className="pb-8">
          <Hero />
        </section>
        <section id="about" aria-label="About" className="pb-8">
          <AboutPage />
        </section>
        <section id="skills" aria-label="Skills" className="pb-8">
          <Skills />
        </section>
        <HomePortfolioShowcase />
        <Design />
        <AIEngineering />
        <section id="contact" aria-label="Contact" className="pb-8">
          <Contact />
        </section>
        <footer className="flex w-full items-center justify-center px-5 py-10">
          <div className="max-w-xl text-center">
            <p className="text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
              Building products with scalability, usability and long-term
              maintainability in mind.
            </p>
            <p className="mt-4 text-xs tracking-[0.16em] text-[var(--text-muted)] uppercase md:text-sm">
              Designed & Built by Kabiru — ©{" "}
              {/* Prerendered: the HTML carries the build year, so a client in a
                  later year must not flag a hydration mismatch. */}
              <span suppressHydrationWarning>{new Date().getFullYear()}</span>
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
