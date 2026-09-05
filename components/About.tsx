"use client";

import {
  CSSProperties,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useReducedMotion } from "framer-motion";

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

/** Deterministic per-card timing so glows never sync and stay calm. */
const GLOW_TIMINGS = [
  { duration: 14, delay: 0, reverse: false },
  { duration: 9.5, delay: 2.8, reverse: true },
  { duration: 17, delay: 1.2, reverse: false },
  { duration: 11.5, delay: 4.6, reverse: true },
  { duration: 15.5, delay: 0.7, reverse: false },
  { duration: 12.5, delay: 3.4, reverse: true },
] as const;

interface ContentSectionProps {
  title: string;
  children: ReactNode;
  glowDuration: number;
  glowDelay: number;
  glowReverse: boolean;
  reducedMotion: boolean | null;
}

interface ContentItem {
  title: string;
  content: ReactNode;
}

const ContentSection = ({
  title,
  children,
  glowDuration,
  glowDelay,
  glowReverse,
  reducedMotion,
}: ContentSectionProps) => {
  const glowStyle = {
    "--about-glow-duration": `${glowDuration}s`,
    "--about-glow-delay": `${glowDelay}s`,
  } as CSSProperties;

  return (
    <article className="about-card h-full w-full">
      {!reducedMotion && (
        <span
          className={`about-card-glow${glowReverse ? " about-card-glow--reverse" : ""}`}
          style={glowStyle}
          aria-hidden="true"
        />
      )}

      <div className="about-card-inner">
        <div className="px-4 py-3.5 md:px-5">
          <h3 className="font-display text-sm tracking-[0.12em] text-[var(--gold)] uppercase md:text-base">
            {title}
          </h3>
        </div>

        <div className="flex flex-1 border-t border-[var(--border-subtle)] px-4 py-4 md:px-5">
          <div className="text-sm leading-relaxed text-[var(--text-muted)] md:text-[0.95rem]">
            {children}
          </div>
        </div>
      </div>
    </article>
  );
};

export default function About() {
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

  const letters = useMemo(() => "About".split(""), []);
  const letterCount = letters.length;
  const letterGap = screenWidth < 640 ? 44 : screenWidth < 1024 ? 58 : 72;

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

  const content: ContentItem[] = [
    {
      title: "Who I Am",
      content: (
        <p>
          I&apos;m{" "}
          <span className="font-semibold text-[var(--gold)]">
            Kabiru Shaibu
          </span>
          , a full-stack product engineer focused on building reliable,
          user-friendly software that solves real business problems and remains
          maintainable as products grow.
        </p>
      ),
    },
    {
      title: "What I Build",
      content: (
        <p>
          I build customer-facing SaaS products and internal operational tools
          using React, TypeScript, Node.js, PostgreSQL, and modern cloud
          technologies. My recent work includes loyalty infrastructure,
          prediction platforms, secure dashboards, and workflow automation.
        </p>
      ),
    },
    {
      title: "How I Work",
      content: (
        <p>
          I take ownership from product discovery and architecture through
          implementation, testing, deployment, and continuous improvement. I
          collaborate closely with stakeholders and engineering teams to turn
          business requirements into practical, scalable solutions.
        </p>
      ),
    },
    {
      title: "Engineering Philosophy",
      content: (
        <p>
          I balance delivery speed with security, usability, and long-term
          maintainability. I use AI-assisted development to improve planning,
          implementation, debugging, and documentation without replacing careful
          engineering judgement.
        </p>
      ),
    },
    {
      title: "What I Value",
      content: (
        <p>
          Clarity, ownership, and honest trade-offs. I prefer simple systems
          that teams can reason about, feedback that improves the product, and
          collaboration that keeps users and business outcomes at the centre of
          every decision.
        </p>
      ),
    },
    {
      title: "Where I Thrive",
      content: (
        <p>
          I do my best work where product thinking meets engineering craft —
          cross-functional teams, real users, and systems that need to stay
          reliable as they grow. I enjoy turning ambiguity into shipped,
          well-structured software.
        </p>
      ),
    },
  ];

  return (
    <section className="w-full bg-[var(--page-bg)]">
      <div ref={dividerRef} className="section-title-wrap max-w-6xl">
        <div className="pointer-events-none absolute inset-x-6 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[rgba(184,134,11,0.3)] to-transparent" />

        <div className="relative h-14 w-full md:h-16">
          <h2 className="sr-only">About</h2>

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
                  {letter}
                </span>
              );
            },
          )}
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 auto-rows-fr gap-3 px-6 pb-4 md:grid-cols-2 md:gap-4 md:px-10 lg:px-14">
        {content.map((section, index) => {
          const timing = GLOW_TIMINGS[index] ?? GLOW_TIMINGS[0];

          return (
            <ContentSection
              key={section.title}
              title={section.title}
              glowDuration={timing.duration}
              glowDelay={timing.delay}
              glowReverse={timing.reverse}
              reducedMotion={reducedMotion}
            >
              {section.content}
            </ContentSection>
          );
        })}
      </div>
    </section>
  );
}
