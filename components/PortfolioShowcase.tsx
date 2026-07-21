"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  getFeaturedProjects,
  projectCategories,
  projects,
} from "./data/projectData";
import ProjectCard from "./ProjectCard";

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);
const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

export default function HomePortfolioShowcase() {
  const dividerRef = useRef<HTMLDivElement | null>(null);
  const [globalProgress, setGlobalProgress] = useState(0);
  const [screenWidth, setScreenWidth] = useState(1200);
  const reducedMotion = useReducedMotion();
  const featured = getFeaturedProjects();

  useEffect(() => {
    let frameId: number;

    const updateProgress = () => {
      if (!dividerRef.current) return;
      setScreenWidth(window.innerWidth);

      if (reducedMotion) {
        setGlobalProgress(1);
        return;
      }

      const rect = dividerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const start = windowHeight;
      const end = windowHeight * 0.35;
      const raw = (start - rect.top) / (start - end);
      setGlobalProgress(clamp(raw, 0, 1));
    };

    const handleScroll = () => {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateProgress);
    };

    const scrollContainer = document.getElementById("page-scroll-container");
    updateProgress();
    window.addEventListener("resize", handleScroll);
    window.addEventListener("scroll", handleScroll, { passive: true });
    scrollContainer?.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("scroll", handleScroll);
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, [reducedMotion]);

  const categoryStats = projectCategories
    .map((category) => ({
      title: category,
      value: projects.filter((project) => project.category === category).length,
    }))
    .filter((item) => item.value > 0);

  const letters = useMemo(() => "Portfolio".split(""), []);
  const letterCount = letters.length;
  const letterGap = screenWidth < 640 ? 28 : screenWidth < 1024 ? 44 : 58;

  const letterData = useMemo(() => {
    return letters.map((letter, idx) => {
      const finalX = (idx - (letterCount - 1) / 2) * letterGap;
      let startX = finalX;
      if (idx === 0) startX = -screenWidth / 2;
      if (idx === letterCount - 1) startX = screenWidth / 2;
      return { letter, startX, finalX, startScale: 0.3, finalScale: 1 };
    });
  }, [letters, letterCount, letterGap, screenWidth]);

  const progress = reducedMotion ? 1 : easeOutCubic(globalProgress);

  return (
    <section
      id="projects"
      aria-labelledby="portfolio-heading"
      className="w-full bg-[var(--page-bg)] pt-6 text-center md:pt-8"
    >
      <div ref={dividerRef} className="section-title-wrap max-w-6xl">
        <div className="pointer-events-none absolute inset-x-6 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[rgba(184,134,11,0.3)] to-transparent" />
        <div className="relative h-14 w-full md:h-16">
          <h2 id="portfolio-heading" className="sr-only">
            Portfolio
          </h2>
          {letterData.map(
            ({ letter, startX, finalX, startScale, finalScale }, idx) => {
              const currentX = startX + (finalX - startX) * progress;
              const scale = startScale + (finalScale - startScale) * progress;
              return (
                <span
                  key={`${letter}-${idx}`}
                  aria-hidden="true"
                  style={{
                    left: "50%",
                    transform: `translateX(${currentX}px) translateY(-50%) scale(${scale})`,
                    opacity: progress,
                  }}
                  className="font-display absolute top-1/2 -translate-x-1/2 text-3xl font-black uppercase text-[var(--gold)] md:text-4xl"
                >
                  {letter}
                </span>
              );
            },
          )}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-12 md:px-10 lg:px-14">
        <p className="mx-auto mb-6 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)]">
          Flagship work across Web3 loyalty systems, prediction markets and
          marketplace products — focused on real product problems and production
          architecture.
        </p>

        <div className="space-y-4 text-left">
          {featured.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              featured
              priority={index === 0}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/portfolio" className="focus-ring btn-primary">
            View Full Portfolio
          </Link>
        </div>

        {/* <div className="mt-8 grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-6">
          {categoryStats.map((item) => (
            <div
              key={item.title}
              className="rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface)] p-3 text-left transition-colors duration-200 hover:border-[var(--border-gold)]"
            >
              <p className="text-[10px] tracking-[0.12em] text-[var(--text-muted)] uppercase">
                {item.title}
              </p>
              <p className="mt-1.5 text-xl font-semibold text-[var(--text-primary)]">
                {item.value}
              </p>
              <p className="mt-0.5 text-[10px] tracking-[0.1em] text-[var(--text-muted)] uppercase">
                {item.value === 1 ? "project" : "projects"}
              </p>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}
