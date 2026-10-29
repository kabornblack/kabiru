"use client";

import React from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { FaChevronDown, FaDownload } from "react-icons/fa";
import { scrollToHash } from "@/lib/scroll";
import { CV_FILENAME, CV_URL } from "@/lib/contact";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiDocker,
  SiGit,
  SiPython,
  SiPostgresql,
  SiRedux,
  SiGraphql,
} from "react-icons/si";
import ScrambleText from "./ScrambleText";

const techStack = [
  { icon: SiReact, name: "React" },
  { icon: SiNextdotjs, name: "Next.js" },
  { icon: SiTypescript, name: "TypeScript" },
  { icon: SiJavascript, name: "JavaScript" },
  { icon: SiNodedotjs, name: "Node.js" },
  { icon: SiExpress, name: "Express" },
  { icon: SiMongodb, name: "MongoDB" },
  { icon: SiPostgresql, name: "PostgreSQL" },
  { icon: SiTailwindcss, name: "Tailwind CSS" },
  { icon: SiDocker, name: "Docker" },
  { icon: SiGit, name: "Git" },
  { icon: SiPython, name: "Python" },
  { icon: SiRedux, name: "Redux" },
  { icon: SiGraphql, name: "GraphQL" },
];

// Same location as contact.json in the Contact section.
const LOCATION = "Tallinn, Estonia";

/** One copy of the marquee row; the loop's second copy is hidden from assistive tech. */
const TechList = ({ duplicate = false }: { duplicate?: boolean }) => (
  <ul
    aria-hidden={duplicate || undefined}
    className="flex shrink-0 gap-8 py-1 pr-8"
  >
    {techStack.map((tech) => (
      <li
        key={tech.name}
        className="flex shrink-0 items-center gap-2 whitespace-nowrap text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--gold)]"
      >
        <tech.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="text-sm font-medium">{tech.name}</span>
      </li>
    ))}
  </ul>
);

const TechMarquee = ({ reducedMotion }: { reducedMotion: boolean }) => {
  if (reducedMotion) {
    return (
      <div className="absolute inset-x-0 bottom-5 w-full px-5 sm:bottom-7 sm:px-8">
        <ul className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-4">
          {techStack.map((tech) => (
            <li
              key={tech.name}
              className="flex items-center gap-2 text-[var(--text-muted)]"
            >
              <tech.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="text-sm font-medium">{tech.name}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="absolute inset-x-0 bottom-5 w-full px-3 sm:bottom-7 sm:px-6">
      <div className="mx-auto max-w-5xl pt-4">
        {/* Focusable so keyboard users can pause it (hover pauses it too).
            The fade mask sits on an inner element so the focus ring isn't
            masked away. */}
        <div
          tabIndex={0}
          role="group"
          aria-label="Tech stack"
          className="hero-marquee focus-ring rounded-[var(--radius-sm)]"
        >
          <div className="marquee-fade relative overflow-hidden">
            <div className="hero-marquee-track flex w-max">
              <TechList />
              <TechList duplicate />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const reducedMotion = Boolean(prefersReducedMotion);

  return (
    <section id="home" aria-labelledby="home-heading" className="pb-8">
      <div className="relative mx-auto flex min-h-[88svh] max-w-7xl flex-col items-center justify-center overflow-hidden px-5 pb-24 pt-24 md:min-h-[90svh] md:pt-28">
        <div className="relative z-20 mx-auto max-w-3xl text-center">
          {/* Soft dark wash behind the text so grid lines don't cut through it. */}
          <div
            aria-hidden="true"
            className="hero-dim pointer-events-none absolute -inset-x-16 -inset-y-12 -z-10"
          />

          {/* A status, not a control. */}
          <p className="hero-enter mb-6 flex justify-center">
            <span className="cta-chip inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 font-mono text-[13px] text-[var(--text-primary)]">
              <span
                className="relative flex h-2 w-2 shrink-0"
                aria-hidden="true"
              >
                <span className="cta-dot-pulse" />
                <span className="relative h-2 w-2 rounded-full bg-[var(--gold)]" />
              </span>
              Open to opportunities
              <span aria-hidden="true" className="text-[var(--text-muted)]">
                ·
              </span>
              <span className="sr-only">, </span>
              <span className="text-[var(--text-muted)]">{LOCATION}</span>
            </span>
          </p>

          <h1
            id="home-heading"
            className="hero-enter font-display text-4xl font-bold leading-none text-[var(--gold)] md:text-6xl lg:text-7xl"
            style={{ animationDelay: "70ms" }}
          >
            Kabiru Shaibu
          </h1>

          <p
            className="hero-enter mx-auto mt-5 max-w-2xl text-base leading-snug font-medium text-[var(--text-primary)] md:mt-6 md:text-xl md:leading-snug"
            style={{ animationDelay: "140ms" }}
          >
            Frontend-focused Full-Stack Product Engineer. I design and ship
            accessible SaaS and Web3 products with production quality and scale
            in mind.
          </p>

          <p
            className="hero-enter mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[var(--text-muted)] md:text-[0.95rem]"
            style={{ animationDelay: "210ms" }}
          >
            Specializing in TypeScript, React, Next.js, Node.js, Python,
            Supabase and Solana — owning the path from product idea to reliable
            release.
          </p>

          <div
            className="hero-enter mt-7 flex flex-wrap items-center justify-center gap-3 md:mt-8 md:gap-4"
            style={{ animationDelay: "280ms" }}
          >
            <Link href="/portfolio" className="focus-ring btn-secondary">
              <ScrambleText text="View Projects" />
            </Link>
            <a
              href={CV_URL}
              download={CV_FILENAME}
              aria-label="Download Kabiru Shaibu CV PDF"
              className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-sm)] px-3 text-xs font-semibold tracking-[0.14em] text-[var(--text-muted)] uppercase underline-offset-4 transition-colors hover:text-[var(--gold)] hover:underline"
            >
              <FaDownload className="h-3.5 w-3.5" aria-hidden="true" />
              <ScrambleText text="Download CV" />
            </a>
          </div>
        </div>

        <TechMarquee reducedMotion={reducedMotion} />

        <button
          type="button"
          data-scroll-cue
          onClick={() => scrollToHash("about")}
          aria-label="Scroll to the About section"
          className="hero-cue focus-ring absolute bottom-14 left-1/2 z-20 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full text-[var(--text-muted)] transition-colors hover:text-[var(--gold)] sm:bottom-[4.25rem]"
        >
          <FaChevronDown className="hero-cue-icon h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
