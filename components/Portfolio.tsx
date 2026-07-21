"use client";

import { motion } from "framer-motion";
import {
  getFeaturedProjects,
  projectCategories,
  projects,
} from "./data/projectData";
import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";

export default function Portfolio() {
  const featured = getFeaturedProjects();
  const featuredTitles = new Set(featured.map((project) => project.title));

  const groupedProjects = projectCategories
    .map((category) => ({
      category,
      projects: projects.filter(
        (project) =>
          project.category === category && !featuredTitles.has(project.title),
      ),
    }))
    .filter((group) => group.projects.length > 0);

  return (
    <div className="min-h-screen w-full bg-[var(--page-bg)]">
      <Header />

      <main className="mx-auto w-full max-w-6xl px-5 pt-24 pb-16 md:px-8 md:pt-28">
        <header className="text-center">
          <h1 className="font-display inline-block text-3xl tracking-[0.16em] text-[var(--gold)] uppercase md:text-4xl">
            Portfolio
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)]">
            Production products across Web3, marketplaces and full-stack
            applications — built with React, TypeScript and systems designed for
            real users.
          </p>
        </header>

        <section aria-labelledby="featured-heading" className="mt-8">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="hidden h-px w-12 bg-gradient-to-r from-transparent to-[rgba(184,134,11,0.5)] md:block" />
            <h2
              id="featured-heading"
              className="font-display text-base tracking-[0.14em] text-[var(--gold)] uppercase md:text-xl"
            >
              Featured Work
            </h2>
            <div className="hidden h-px w-12 bg-gradient-to-l from-transparent to-[rgba(184,134,11,0.5)] md:block" />
          </div>

          <div className="space-y-4">
            {featured.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
              >
                <ProjectCard
                  project={project}
                  featured
                  priority={index === 0}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {groupedProjects.map((group) => (
          <section
            key={group.category}
            aria-labelledby={`category-${group.category}`}
            className="mt-10"
          >
            <div className="mb-3.5 flex items-center justify-center gap-3">
              <div className="hidden h-px w-10 bg-gradient-to-r from-transparent to-[rgba(184,134,11,0.5)] md:block" />
              <h2
                id={`category-${group.category}`}
                className="font-display text-sm tracking-[0.14em] text-[var(--gold)] uppercase md:text-lg"
              >
                {group.category}
              </h2>
              <div className="hidden h-px w-10 bg-gradient-to-l from-transparent to-[rgba(184,134,11,0.5)] md:block" />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {group.projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="h-full"
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </main>

      <footer className="flex w-full items-center justify-center border-t border-[var(--border-subtle)] px-5 py-10">
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
