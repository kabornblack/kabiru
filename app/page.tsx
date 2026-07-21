"use client";

import { Hero } from "@/components/Hero";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Header from "@/components/Header";
import AboutPage from "@/components/About";
import HomePortfolioShowcase from "@/components/PortfolioShowcase";

export default function Home() {
  return (
    <div className="h-screen scroll-smooth bg-[var(--page-bg)]">
      <main
        id="page-scroll-container"
        className="h-full overflow-y-auto overflow-x-hidden scroll-smooth"
        style={{
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        <style jsx>{`
          main::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <Header />

        <section id="home" aria-label="Home">
          <Hero />
        </section>
        <section id="about" aria-label="About">
          <AboutPage />
        </section>
        <section id="skills" aria-label="Skills">
          <Skills />
        </section>
        <HomePortfolioShowcase />
        <section id="contact" aria-label="Contact">
          <Contact />
        </section>
        <footer className="flex w-full items-center justify-center border-t border-[var(--border-subtle)] px-5 py-10">
          <div className="max-w-xl text-center">
            <p className="text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
              Building products with scalability, usability and long-term
              maintainability in mind.
            </p>
            <p className="mt-4 text-xs tracking-[0.16em] text-[var(--text-muted)] uppercase md:text-sm">
              Designed & Built by Kabiru — © {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
