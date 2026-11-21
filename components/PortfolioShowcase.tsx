"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getFeaturedProjects, projects, type Project } from "./data/projectData";
import SectionHeading from "./SectionHeading";
import Container from "./Container";
import Connector, { StackedConnector } from "./Connector";
import {
  CodeArray,
  CodePunct,
  CodeWindow,
  HostPill,
  useReveal,
} from "./CodeWindow";
import ScrambleText from "./ScrambleText";

const SHOWCASE_COUNT = 4;

/** Featured projects in their curated order, topped up from the rest of the data. */
const showcaseProjects = (): Project[] => {
  const featured = getFeaturedProjects();
  const rest = projects.filter((project) => !featured.includes(project));
  return [...featured, ...rest].slice(0, SHOWCASE_COUNT);
};

const fileNameOf = (project: Project) =>
  `${project.title.toLowerCase().replace(/[^a-z0-9]/g, "")}.tsx`;

/* Explorer row geometry (lg), used to point the connector at the active row:
   title bar ≈ 41px + body padding 20px, then 40px rows. */
const ROW_OFFSET = 61;
const ROW_HEIGHT = 40;

export default function HomePortfolioShowcase() {
  const items = showcaseProjects();
  const [activeIndex, setActiveIndex] = useState(0);
  const [vertical, setVertical] = useState(false);
  const tablistId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reveal = useReveal();
  const active = items[activeIndex];

  // The explorer is a vertical list on desktop and a row of chips below lg.
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setVertical(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const selectIndex = (index: number, focus = false) => {
    setActiveIndex(index);
    if (focus) tabRefs.current[index]?.focus();
  };

  const onTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const last = items.length - 1;
    let next: number | null = null;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      next = activeIndex === last ? 0 : activeIndex + 1;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      next = activeIndex === 0 ? last : activeIndex - 1;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = last;
    }

    if (next === null) return;
    event.preventDefault();
    selectIndex(next, true);
  };

  return (
    <section
      id="projects"
      aria-labelledby="portfolio-heading"
      className="section section--alt"
    >
      <SectionHeading
        text="Portfolio"
        headingId="portfolio-heading"
      />
      <Container className="section-body">
        <div>
          <motion.div className="max-w-2xl" {...reveal(0)}>
            <p className="display-lede">
              <span className="block text-[var(--gold)]">
                Real product problems,
              </span>
              <span className="block text-[var(--text-primary)]">
                production architecture.
              </span>
            </p>
            <p className="body-copy mt-3 max-w-xl">
              Flagship work across Web3 loyalty systems, prediction markets and
              marketplace products.
            </p>
          </motion.div>

          <StackedConnector />

          <div className="grid grid-cols-1 lg:mt-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:items-start lg:gap-x-[var(--gap)]">
            <motion.div className="code-window-stage relative" {...reveal(0.1)}>
              {/* Headline → explorer */}
              <Connector
                variant="vertical"
                length={32}
                className="absolute bottom-full left-8"
              />

              {/* Explorer → window, follows the active row. Starts a few px
                  inside the box and overshoots the gap because both tilts pull
                  the facing edges inward. */}
              <Connector
                variant="horizontal"
                length={72}
                stagger={1}
                className="absolute left-[calc(100%-4px)] -translate-y-1/2 transition-[top] duration-150"
                style={{ top: ROW_OFFSET + activeIndex * ROW_HEIGHT + ROW_HEIGHT / 2 }}
              />

              <CodeWindow
                title="projects/"
                className="code-window--tilted projects-window--explorer"
              >
                <div
                  role="tablist"
                  aria-label="Featured projects"
                  aria-orientation={vertical ? "vertical" : "horizontal"}
                  className="tablist-fade -mx-1 -my-0.5 flex gap-1 overflow-x-auto px-1 py-0.5 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
                >
                  {items.map((project, index) => {
                    const isActive = index === activeIndex;

                    return (
                      <button
                        key={project.title}
                        ref={(node) => {
                          tabRefs.current[index] = node;
                        }}
                        id={`${tablistId}-tab-${index}`}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-controls={`${tablistId}-panel-${index}`}
                        tabIndex={isActive ? 0 : -1}
                        onClick={() => selectIndex(index)}
                        onKeyDown={onTabKeyDown}
                        className={[
                          "focus-ring code-tab hit-target flex h-10 shrink-0 cursor-pointer items-center rounded-[var(--radius-sm)] px-3 text-left font-mono text-[13px] whitespace-nowrap transition-colors duration-150",
                          isActive
                            ? "bg-[color-mix(in_srgb,var(--gold)_8%,transparent)] text-[var(--gold)] shadow-[inset_2px_0_0_var(--gold)]"
                            : "text-[var(--text-muted)] hover:text-[var(--gold)]",
                        ].join(" ")}
                      >
                        <span className="sr-only">{project.title}: </span>
                        {fileNameOf(project)}
                      </button>
                    );
                  })}
                </div>
              </CodeWindow>
            </motion.div>

            <StackedConnector stagger={1} />

            <motion.div className="code-window-stage relative" {...reveal(0.2)}>
              <CodeWindow
                title={<HostPill url={active.liveUrl} />}
                className="code-window--tilted projects-window--main"
              >
                <div className="code-panes">
                  {items.map((project, index) => {
                    const isActive = index === activeIndex;

                    return (
                      <div
                        key={project.title}
                        id={`${tablistId}-panel-${index}`}
                        role="tabpanel"
                        aria-labelledby={`${tablistId}-tab-${index}`}
                        data-active={isActive}
                        aria-hidden={!isActive}
                        className="code-pane"
                      >
                        <div className="relative aspect-video overflow-hidden rounded-[var(--radius-sm)] bg-[var(--ink-900)]">
                          <Image
                            src={project.image}
                            alt={`${project.title} screenshot`}
                            fill
                            loading={index === 0 ? "eager" : "lazy"}
                            sizes="(min-width: 1280px) 704px, (min-width: 1024px) 58vw, (min-width: 768px) calc(100vw - 120px), calc(100vw - 80px)"
                            className="object-cover object-top"
                          />
                        </div>

                        <h3 className="font-display mt-4 text-2xl leading-none text-[var(--text-primary)] md:text-3xl">
                          {project.title}
                        </h3>
                        <p
                          data-description
                          className="mt-2 line-clamp-3 font-sans text-sm leading-relaxed text-[var(--text-muted)] md:text-base"
                        >
                          {project.description}
                        </p>

                        <div className="mt-4">
                          <span className="text-[var(--gold)]">stack</span>
                          <CodePunct>: </CodePunct>
                          <CodeArray items={project.tags} />
                        </div>

                        <div className="mt-4 flex flex-wrap gap-3 font-sans">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="focus-ring btn-primary"
                            >
                              <ScrambleText text="Live" />
                              <span className="sr-only">
                                {" "}
                                {project.title} (opens in a new tab)
                              </span>
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="focus-ring btn-secondary"
                            >
                              <ScrambleText text="Code" />
                              <span className="sr-only">
                                {" "}
                                {project.title} (opens in a new tab)
                              </span>
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CodeWindow>
            </motion.div>
          </div>

          <motion.div className="mt-12 flex justify-center" {...reveal(0)}>
            <Link href="/portfolio" className="focus-ring btn-secondary">
              <ScrambleText text="View all projects" />
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
