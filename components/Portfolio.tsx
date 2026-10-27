"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { projectCategories, projects } from "./data/projectData";
import Header from "@/components/Header";
import GridBackground from "@/components/GridBackground";
import ProjectCard from "@/components/ProjectCard";
import SectionTitle from "@/components/SectionTitle";
import {
  CodeTabs,
  CodeWindow,
  StackedConnector,
  codeTabId,
  useReveal,
} from "./CodeWindow";

/* Filters come from the categories the projects actually use, in the order
   the data file defines them; empty categories get no tab. */
const FILTERS = [
  { file: "all.ts", name: "All projects", category: null },
  ...projectCategories
    .filter((category) => projects.some((p) => p.category === category))
    .map((category) => ({
      file: `${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.ts`,
      name: category,
      category,
    })),
];

const plural = (n: number) => `${n} ${n === 1 ? "project" : "projects"}`;

export default function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabsId = useId();
  const panelId = `${tabsId}-results`;
  const reveal = useReveal();
  const reducedMotion = useReducedMotion();

  const { category } = FILTERS[activeIndex];
  const visible = category
    ? projects.filter((project) => project.category === category)
    : projects;

  return (
    <div className="min-h-screen w-full">
      <GridBackground />
      <Header />

      <main className="mx-auto w-full max-w-6xl px-6 pt-24 pb-16 md:px-10 md:pt-28 lg:px-14">
        <SectionTitle
          text="Portfolio"
          headingId="portfolio-page-heading"
          headingLevel="h1"
          gapSm={28}
          gapMd={44}
          gapLg={58}
        />

        <motion.div className="mt-6 max-w-2xl" {...reveal(0)}>
          <p className="font-display text-4xl leading-[1.05] md:text-5xl">
            <span className="block text-[var(--gold)]">Production products,</span>
            <span className="block text-[var(--text-primary)]">
              designed for real users.
            </span>
          </p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
            Across Web3, marketplaces and full-stack applications — built with
            React and TypeScript.
          </p>
          <p className="mt-3 font-mono text-[13px] text-[var(--text-muted)] md:text-sm">
            <span className="text-[var(--gold)]">{"// "}</span>
            {plural(projects.length)}
          </p>
        </motion.div>

        <StackedConnector />

        <motion.div
          className="code-window-stage relative lg:mt-12"
          {...reveal(0.1)}
        >
          {/* Headline → filter bar */}
          <svg
            aria-hidden="true"
            className="code-connector pointer-events-none absolute bottom-full left-8 hidden lg:block"
            width="8"
            height="48"
            viewBox="0 0 8 48"
          >
            <line x1="4" y1="3" x2="4" y2="45" />
            <circle cx="4" cy="3" r="3" />
            <circle cx="4" cy="45" r="3" />
          </svg>

          <CodeWindow
            title={
              <CodeTabs
                label="Filter projects by category"
                idPrefix={tabsId}
                tabs={FILTERS}
                activeIndex={activeIndex}
                onSelect={setActiveIndex}
                controls={panelId}
                tabClassName="min-h-11"
              />
            }
          >
            <p aria-live="polite" className="text-[var(--text-muted)]">
              <span className="text-[var(--gold)]">{"// "}</span>
              showing {plural(visible.length)}
              {category ? ` in ${category}` : ""}
            </p>
          </CodeWindow>
        </motion.div>

        <motion.div
          key={activeIndex}
          id={panelId}
          role="tabpanel"
          aria-labelledby={codeTabId(tabsId, activeIndex)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.15 }}
          className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2"
        >
          {visible.map((project, index) => (
            <motion.div
              key={project.title}
              className="h-full"
              {...reveal(0.05 * (index % 2))}
            >
              <ProjectCard project={project} eager={index < 2} />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Link href="/" className="focus-ring btn-secondary">
            Back to home
          </Link>
          <Link href="/#contact" className="focus-ring btn-secondary">
            Contact
          </Link>
        </div>
      </main>

      <footer className="flex w-full items-center justify-center px-5 py-10">
        <div className="max-w-xl text-center">
          <p className="text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
            Building products with scalability, usability and long-term
            maintainability in mind.
          </p>
          <p className="mt-4 text-xs tracking-[0.16em] text-[var(--text-muted)] uppercase md:text-sm">
            Designed & Built by Kabiru — © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
