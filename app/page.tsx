"use client";

import { Hero } from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import { ImagesSliderDemo } from "@/components/Projects";
import Contact from "@/components/Contact";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="h-screen scroll-smooth bg-gray-950">
      {/* // <div className="h-screen scroll-smooth bg-gradient-to-tr from-white/20 to-gray-950 z-50 -mb-32"> */}
      <main
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

        {/* Move Header here */}
        <Header />

        <section id="home">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section>
          <ImagesSliderDemo />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
    </div>
  );
}
