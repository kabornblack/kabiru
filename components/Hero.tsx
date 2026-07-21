"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
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

const TechMarquee = ({ reducedMotion }: { reducedMotion: boolean }) => {
  if (reducedMotion) {
    return (
      <div className="absolute inset-x-0 bottom-5 w-full px-5 sm:bottom-7 sm:px-8">
        <ul className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-[var(--border-subtle)] pt-4">
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

  const loopItems = [...techStack, ...techStack];

  return (
    <div className="absolute inset-x-0 bottom-5 w-full px-3 sm:bottom-7 sm:px-6">
      <div className="mx-auto max-w-5xl border-t border-[var(--border-subtle)] pt-4">
        <div className="marquee-fade relative overflow-hidden">
          <motion.div
            className="flex w-max gap-8 py-1 pr-8"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 70,
              ease: "linear",
            }}
          >
            {loopItems.map((tech, index) => (
              <div
                key={`${tech.name}-${index}`}
                className="flex shrink-0 items-center gap-2 whitespace-nowrap text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--gold)]"
              >
                <tech.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="text-sm font-medium">{tech.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const reducedMotion = Boolean(prefersReducedMotion);

  return (
    <div className="relative mx-auto flex min-h-[88svh] max-w-7xl flex-col items-center justify-center overflow-hidden bg-[var(--page-bg)] px-5 pb-24 pt-24 md:min-h-[90svh] md:pt-28">
      <div className="relative z-20 mx-auto max-w-3xl text-center">
        <h1 className="font-display text-4xl font-bold leading-none text-[var(--gold)] md:text-6xl lg:text-7xl">
          Kabiru Shaibu
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-snug font-medium text-[var(--text-primary)] md:mt-6 md:text-xl md:leading-snug">
          Frontend-focused Full-Stack Product Engineer. I design and ship
          accessible SaaS and Web3 products with production quality and scale in
          mind.
        </p>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[var(--text-muted)] md:text-[0.95rem]">
          Specializing in TypeScript, React, Next.js, Node.js, Python, Supabase
          and Solana — owning the path from product idea to reliable release.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3 md:mt-8 md:gap-4">
          <Link href="/portfolio" className="focus-ring btn-primary">
            View Projects
          </Link>
          <Link
            href="#contact"
            onClick={(event) => {
              event.preventDefault();
              scrollToHash("contact");
            }}
            className="focus-ring btn-secondary"
          >
            Contact Me
          </Link>
          <a
            href={CV_URL}
            download={CV_FILENAME}
            aria-label="Download Kabiru Shaibu CV PDF"
            className="focus-ring btn-secondary"
          >
            Download CV
          </a>
        </div>
      </div>
      <TechMarquee reducedMotion={reducedMotion} />
    </div>
  );
}
