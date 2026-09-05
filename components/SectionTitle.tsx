"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

type SectionTitleProps = {
  /** The word rendered as flying-in letters (kept in one animated headline style across every section). */
  text: string;
  /** Visually hidden heading id for aria-labelledby on the parent <section>. */
  headingId?: string;
  /** Horizontal gap between letters at each breakpoint — tune down for longer titles. */
  gapSm?: number;
  gapMd?: number;
  gapLg?: number;
};

/**
 * Shared animated section headline: letters fly in from the screen edges and
 * settle into the title as the section scrolls into view. Extracted so every
 * section (About, Portfolio, Mentors, Design, AI Engineering, ...) shares one
 * implementation instead of re-deriving the same ~80 lines per component.
 */
export default function SectionTitle({
  text,
  headingId,
  gapSm = 44,
  gapMd = 58,
  gapLg = 72,
}: SectionTitleProps) {
  const dividerRef = useRef<HTMLDivElement | null>(null);
  const [globalProgress, setGlobalProgress] = useState(0);
  const [screenWidth, setScreenWidth] = useState(1200);
  const reducedMotion = useReducedMotion();

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
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

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
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("scroll", handleScroll);
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, [reducedMotion]);

  const letters = useMemo(() => text.split(""), [text]);
  const letterCount = letters.length;
  const letterGap =
    screenWidth < 640 ? gapSm : screenWidth < 1024 ? gapMd : gapLg;

  const letterData = useMemo(() => {
    return letters.map((letter, index) => {
      const finalX = (index - (letterCount - 1) / 2) * letterGap;

      let startX = finalX;

      if (index === 0) {
        startX = -screenWidth / 2;
      }

      if (index === letterCount - 1) {
        startX = screenWidth / 2;
      }

      return {
        letter,
        startX,
        finalX,
        startScale: 0.3,
        finalScale: 1,
      };
    });
  }, [letters, letterCount, letterGap, screenWidth]);

  const progress = reducedMotion ? 1 : easeOutCubic(globalProgress);

  return (
    <div ref={dividerRef} className="section-title-wrap max-w-6xl">
      <div className="pointer-events-none absolute inset-x-6 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[rgba(184,134,11,0.3)] to-transparent" />

      <div className="relative h-14 w-full md:h-16">
        <h2 id={headingId} className="sr-only">
          {text}
        </h2>

        {letterData.map(
          ({ letter, startX, finalX, startScale, finalScale }, index) => {
            const currentX = startX + (finalX - startX) * progress;
            const scale = startScale + (finalScale - startScale) * progress;

            return (
              <span
                key={`${letter}-${index}`}
                aria-hidden="true"
                style={{
                  left: "50%",
                  transform: `translateX(${currentX}px) translateY(-50%) scale(${scale})`,
                  opacity: progress,
                }}
                className="font-display absolute top-1/2 -translate-x-1/2 text-3xl font-black uppercase text-[var(--gold)] md:text-4xl"
              >
                {letter === " " ? " " : letter}
              </span>
            );
          },
        )}
      </div>
    </div>
  );
}
