"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { projects, projectCategories } from "./data/projectData";

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

export default function HomePortfolioShowcase() {
  const dividerRef = useRef<HTMLDivElement | null>(null);
  const [globalProgress, setGlobalProgress] = useState(0);
  const [screenWidth, setScreenWidth] = useState(1200);

  useEffect(() => {
    let frameId: number;

    const updateProgress = () => {
      if (!dividerRef.current) return;

      setScreenWidth(window.innerWidth);

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
  }, []);

  const groupedProjects = projectCategories
    .map((category) => ({
      category,
      projects: projects.filter((project) => project.category === category),
    }))
    .filter((group) => group.projects.length > 0);

  const categoryStats = groupedProjects.map((group) => ({
    title: group.category,
    value: group.projects.length,
    label: group.projects.length === 1 ? "project" : "projects",
  }));

  const projectRows = useMemo(() => {
    const allProjects = groupedProjects.flatMap((group) =>
      group.projects.map((project) => ({
        ...project,
        category: group.category,
      })),
    );

    return [allProjects, [...allProjects].reverse(), allProjects];
  }, [groupedProjects]);

  const letters = useMemo(() => "Portfolio".split(""), []);
  const letterCount = letters.length;
  const letterGap = screenWidth < 640 ? 28 : screenWidth < 1024 ? 44 : 58;

  const letterData = useMemo(() => {
    return letters.map((letter, idx) => {
      const finalX = (idx - (letterCount - 1) / 2) * letterGap;

      let startX = finalX;

      if (idx === 0) startX = -screenWidth / 2;
      if (idx === letterCount - 1) startX = screenWidth / 2;

      return {
        letter,
        startX,
        finalX,
        startScale: 0.3,
        finalScale: 1,
      };
    });
  }, [letters, letterCount, letterGap, screenWidth]);

  const progress = easeOutCubic(globalProgress);

  return (
    <section className="w-full bg-gray-950 text-center font-protest pt-20">
      <div
        ref={dividerRef}
        className="relative mx-auto flex max-w-6xl items-center justify-center overflow-hidden px-6 py-20"
      >
        <div className="pointer-events-none absolute inset-x-6 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[#B8860B]/30 to-transparent" />

        <div className="relative h-20 w-full">
          {letterData.map(
            ({ letter, startX, finalX, startScale, finalScale }, idx) => {
              const currentX = startX + (finalX - startX) * progress;
              const scale = startScale + (finalScale - startScale) * progress;

              return (
                <span
                  key={`${letter}-${idx}`}
                  style={{
                    left: "50%",
                    transform: `translateX(${currentX}px) translateY(-50%) scale(${scale})`,
                    opacity: progress,
                    willChange: "transform, opacity",
                  }}
                  className="absolute top-1/2 -translate-x-1/2 text-3xl font-black uppercase text-[#B8860B] md:text-5xl"
                >
                  {letter}
                </span>
              );
            },
          )}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-20 md:px-10 lg:px-20">
        <div className="mb-8 flex justify-center">
          <Link
            href="/portfolio"
            className="border border-[#B8860B] bg-[#B8860B]/15 px-6 py-3 text-xs uppercase tracking-[3px] text-[#B8860B] transition-all duration-300 hover:bg-[#B8860B]/25"
          >
            View Portfolio →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
          {categoryStats.map((item) => (
            <div
              key={item.title}
              className="border border-white/10 bg-white/[0.03] p-5 text-left"
            >
              <p className="text-xs uppercase tracking-[3px] text-gray-500">
                {item.title}
              </p>
              <h3 className="mt-2 text-3xl font-black text-white">
                {item.value}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-[2px] text-gray-500">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-3 text-left">
          <span className="h-2 w-2 bg-[#B8860B]" />
          <p className="text-xs uppercase tracking-[3px] text-gray-400">
            Live Projects
          </p>
        </div>

        <div className="relative mt-4 h-[220px] overflow-hidden border border-white/10 bg-white/[0.03]">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12 bg-gradient-to-b from-gray-950 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-gray-950 to-transparent" />

          <div className="grid h-full grid-cols-1 gap-3 p-4 md:grid-cols-3">
            {projectRows.map((row, rowIndex) => (
              <div key={rowIndex} className="overflow-hidden">
                <div
                  className={[
                    "flex flex-col gap-3",
                    rowIndex === 0 &&
                      "animate-[portfolioScroll_18s_linear_infinite]",
                    rowIndex === 1 &&
                      "animate-[portfolioScroll_24s_linear_infinite]",
                    rowIndex === 2 &&
                      "animate-[portfolioScroll_20s_linear_infinite]",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {[...row, ...row].map((project, index) => (
                    <div
                      key={`${project.title}-${rowIndex}-${index}`}
                      className="flex items-center justify-between gap-4 border border-white/10 bg-black/20 px-4 py-3 text-left"
                    >
                      <div>
                        <h4 className="text-sm font-bold text-gray-200">
                          {project.title}
                        </h4>
                        <p className="mt-1 text-[10px] uppercase tracking-[2px] text-gray-500">
                          {project.category}
                        </p>
                      </div>

                      <span className="shrink-0 text-xs uppercase tracking-[2px] text-[#B8860B]">
                        Live
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
