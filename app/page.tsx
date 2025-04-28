"use client";

import { Hero } from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import { ImagesSliderDemo } from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="h-screen scroll-smooth bg-gray-950">
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
