"use client";

import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import type { Project } from "./data/projectData";

type ProjectCardProps = {
  project: Project;
  featured?: boolean;
  priority?: boolean;
};

export default function ProjectCard({
  project,
  featured = false,
  priority = false,
}: ProjectCardProps) {
  return (
    <article
      className={[
        "group surface-card surface-card-interactive flex h-full flex-col overflow-hidden",
        featured ? "lg:flex-row lg:items-stretch" : "",
      ].join(" ")}
    >
      <div
        className={[
          "relative overflow-hidden bg-black/50",
          featured
            ? "aspect-[16/9] w-full lg:aspect-auto lg:min-h-[210px] lg:w-[46%] lg:max-w-[420px]"
            : "aspect-[16/9] w-full",
        ].join(" ")}
      >
        <Image
          src={project.image}
          alt={`${project.title} project screenshot`}
          fill
          sizes={
            featured
              ? "(max-width: 1024px) 100vw, 42vw"
              : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          }
          priority={priority}
          className="object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(3,7,18,0.35)] via-transparent to-transparent opacity-80 lg:bg-gradient-to-r"
          aria-hidden="true"
        />
      </div>

      <div
        className={[
          "flex flex-1 flex-col p-4 text-left sm:p-5",
          featured ? "lg:justify-center lg:px-6 lg:py-5" : "",
        ].join(" ")}
      >
        <p className="font-mono text-[10px] tracking-[0.16em] text-[var(--gold)] uppercase">
          {project.category}
        </p>

        <h3 className="mt-1.5 font-display text-lg tracking-[0.06em] text-[var(--gold)] uppercase md:text-xl">
          {project.title}
        </h3>

        <p
          className={[
            "mt-2 text-sm leading-relaxed text-[var(--text-muted)]",
            featured ? "" : "line-clamp-3",
          ].join(" ")}
        >
          {project.description}
        </p>

        <ul className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-[var(--radius-sm)] border border-[var(--border-gold)] bg-[rgba(184,134,11,0.06)] px-2 py-0.5 font-mono text-[10px] tracking-wide text-[var(--gold)] uppercase"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          <Link
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} live project`}
            className="focus-ring btn-primary !min-h-10 !px-4 !py-2 !text-[11px]"
          >
            View Project
          </Link>

          {project.githubUrl ? (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} GitHub repository`}
              className="focus-ring inline-flex min-h-10 min-w-10 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border-subtle)] text-[var(--gold)] transition-all duration-200 hover:border-[var(--border-gold)] hover:bg-[rgba(184,134,11,0.1)] hover:text-[var(--gold-hover)]"
            >
              <FaGithub className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : null}

          <Link
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} live site`}
            className="focus-ring inline-flex min-h-10 min-w-10 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border-subtle)] text-[var(--gold)] transition-all duration-200 hover:border-[var(--border-gold)] hover:bg-[rgba(184,134,11,0.1)] hover:text-[var(--gold-hover)]"
          >
            <FaExternalLinkAlt className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
