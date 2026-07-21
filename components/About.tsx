"use client";

import { useEffect, useId, useMemo, useRef, useState, ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FaAngleDown } from "react-icons/fa";

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

interface ContentSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  panelId: string;
}

interface ContentItem {
  title: string;
  content: ReactNode;
}

const ContentSection = ({
  title,
  children,
  defaultOpen = false,
  panelId,
}: ContentSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const buttonId = `${panelId}-button`;
  const reducedMotion = useReducedMotion();

  return (
    <div
      className={[
        "w-full overflow-hidden rounded-[var(--radius-md)] border transition-all duration-300",
        isOpen
          ? "border-[var(--border-gold)] bg-[var(--surface-elevated)] shadow-[var(--shadow-gold)]"
          : "border-[var(--border-subtle)] bg-[var(--surface)] shadow-[var(--shadow-card)] hover:border-[rgba(184,134,11,0.45)] hover:bg-[var(--surface-elevated)]",
      ].join(" ")}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen((open) => !open)}
          className="focus-ring group flex w-full items-center justify-between border-l-4 border-[var(--gold)] px-4 py-3.5 text-left transition-colors duration-300"
        >
          <span className="font-display text-sm tracking-[0.12em] text-[var(--gold)] uppercase md:text-base">
            {title}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{
              duration: reducedMotion ? 0 : 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-[var(--gold)] transition-colors group-hover:text-[var(--gold-hover)]"
            aria-hidden="true"
          >
            <FaAngleDown />
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: reducedMotion ? 0 : 0.32,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="overflow-hidden"
          >
            <div className="border-t border-[var(--border-subtle)] px-4 py-4 md:px-5">
              <div className="text-sm leading-relaxed text-[var(--text-muted)] md:text-[0.95rem]">
                {children}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default function About() {
  const dividerRef = useRef<HTMLDivElement | null>(null);
  const [globalProgress, setGlobalProgress] = useState(0);
  const [screenWidth, setScreenWidth] = useState(1200);
  const baseId = useId();
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

  const label = "About";
  const letters = useMemo(() => label.split(""), []);
  const letterCount = letters.length;
  const letterGap = screenWidth < 640 ? 44 : screenWidth < 1024 ? 58 : 72;

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

  const progress = reducedMotion ? 1 : easeOutCubic(globalProgress);

  const content: ContentItem[] = [
    {
      title: "Who I Am",
      content: (
        <p>
          I&apos;m{" "}
          <span className="font-semibold text-[var(--gold)]">
            Kabiru Shaibu
          </span>
          , a frontend-focused full-stack product engineer. I care about
          shipping interfaces and systems that feel clear, hold up under real
          use, and stay maintainable as products grow.
        </p>
      ),
    },
    {
      title: "What I Build",
      content: (
        <p>
          I build SaaS and Web3 products end to end — responsive React and
          TypeScript frontends, Node APIs, and data layers with Supabase and
          PostgreSQL. Recent work includes Solana loyalty systems, prediction
          markets, and marketplace platforms.
        </p>
      ),
    },
    {
      title: "How I Work",
      content: (
        <p>
          I start from the user problem, then design interfaces and architecture
          that can ship safely. I favor clear component boundaries, typed APIs,
          thoughtful authentication, and performance choices that keep products
          usable in production.
        </p>
      ),
    },
    {
      title: "Engineering Philosophy",
      content: (
        <p>
          Clean code, accessibility, and long-term maintainability matter as
          much as features. I build for scalability and security without
          overcomplicating the first release — then improve through continuous
          learning and iteration.
        </p>
      ),
    },
  ];

  const leftColumnContent = content.filter((_, index) => index % 2 === 0);
  const rightColumnContent = content.filter((_, index) => index % 2 === 1);

  return (
    <div className="h-auto w-full bg-[var(--page-bg)]">
      <div className="mx-auto max-w-7xl py-2 md:py-4">
        <div ref={dividerRef} className="section-title-wrap">
          <div className="pointer-events-none absolute inset-x-6 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[rgba(184,134,11,0.3)] to-transparent" />

          <div
            className="relative h-14 w-full md:h-16"
            aria-hidden={!reducedMotion}
          >
            <h2 className="sr-only">About</h2>
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

        <div className="grid grid-cols-1 gap-3 px-4 pb-3 sm:px-10 md:grid-cols-2 md:gap-4 md:pb-4 lg:px-24">
          <div className="space-y-3">
            {leftColumnContent.map((section, index) => (
              <ContentSection
                key={section.title}
                title={section.title}
                defaultOpen={index === 0}
                panelId={`${baseId}-left-${index}`}
              >
                {section.content}
              </ContentSection>
            ))}
          </div>

          <div className="space-y-3">
            {rightColumnContent.map((section, index) => (
              <ContentSection
                key={section.title}
                title={section.title}
                panelId={`${baseId}-right-${index}`}
              >
                {section.content}
              </ContentSection>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
