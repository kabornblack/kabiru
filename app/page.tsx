"use client";

import { Hero } from "@/components/Hero";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Header from "@/components/Header";
import AboutPage from "@/components/About";
import HomePortfolioShowcase from "@/components/PortfolioShowcase";

export default function Home() {
  return (
    <div className="h-screen scroll-smooth bg-gray-950 font-protest">
      <main
        id="page-scroll-container"
        className="h-full overflow-y-auto scroll-smooth"
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

        <section id="home">
          <Hero />
        </section>
        <section id="about">
          <AboutPage />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <HomePortfolioShowcase />
        <section id="contact">
          <Contact />
        </section>
        <footer className="w-full flex justify-center items-center py-10">
          <div className="text-[#B8860B]/20 font-protest text-xs md:text-sm tracking-[6px] uppercase text-center">
            {/* LG SCREEN */}
            <div className="hidden lg:block">
              Designed & Built by Kabiru — © {new Date().getFullYear()}
            </div>

            {/* SM + MD SCREEN */}
            <div className="flex flex-col items-center gap-2 lg:hidden">
              <span>Designed & Built by Kabiru</span>
              <span>© {new Date().getFullYear()}</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
