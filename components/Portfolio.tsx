"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { projectCategories, projects } from "./data/projectData";
import Header from "@/components/Header";
import GridBackground from "@/components/GridBackground";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import Container from "@/components/Container";
import Connector, { StackedConnector } from "@/components/Connector";
import SiteFooter from "@/components/SiteFooter";
import {
  CodeTabs,
  CodeWindow,
  codeTabId,
  useReveal,
} from "./CodeWindow";
import ScrambleText from "@/components/ScrambleText";

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

      <main className="section section--page">
        <SectionHeading
          text="Portfolio"
          headingId="portfolio-page-heading"
          headingLevel="h1"
        />
        <Container className="section-body">
          <motion.div className="max-w-2xl" {...reveal(0)}>
            <p className="display-lede">
              <span className="block text-[var(--gold)]">Production products,</span>
              <span className="block text-[var(--text-primary)]">
                designed for real users.
              </span>
            </p>
            <p className="body-copy mt-3 max-w-xl">
              Across Web3, marketplaces and full-stack applications — built with
              React and TypeScript.
            </p>
            <p className="mt-2 font-mono text-[13px] text-[var(--text-muted)] md:text-sm">
              {plural(projects.length)}
            </p>
          </motion.div>

          <StackedConnector />

          <motion.div
            className="code-window-stage relative lg:mt-8"
            {...reveal(0.1)}
          >
            {/* Headline → filter bar */}
            <Connector
              variant="vertical"
              length={32}
              className="absolute bottom-full left-8"
            />

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
            className="project-grid mt-[var(--gap)] grid auto-rows-fr grid-cols-1 gap-[var(--gap)] lg:grid-cols-2"
          >
            {visible.map((project, index) => (
              <motion.div
                key={project.title}
                className="h-full"
                {...reveal(0.05 * (index % 2))}
              >
                <ProjectCard project={project} eager={index === 0} />
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <Link href="/" className="focus-ring btn-secondary">
              <ScrambleText text="Back to home" />
            </Link>
            <Link href="/#contact" className="focus-ring btn-secondary">
              <ScrambleText text="Contact" />
            </Link>
          </div>
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
