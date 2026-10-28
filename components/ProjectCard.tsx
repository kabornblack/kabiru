"use client";

import Image from "next/image";
import type { Project } from "./data/projectData";
import { CodeArray, CodePunct, CodeWindow, HostPill } from "./CodeWindow";

type ProjectCardProps = {
  project: Project;
  /** Load the screenshot eagerly (only the first cards above the fold). */
  eager?: boolean;
};

/* Card is ~half of the 6xl container from lg up, full width below. */
const IMAGE_SIZES =
  "(min-width: 1280px) 470px, (min-width: 1024px) calc(50vw - 110px), calc(100vw - 96px)";

export default function ProjectCard({ project, eager = false }: ProjectCardProps) {
  return (
    <CodeWindow
      title={<HostPill url={project.liveUrl} />}
      className="project-card flex h-full flex-col"
      bodyClassName="flex flex-1 flex-col"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-sm)] bg-black/30">
        <Image
          src={project.image}
          alt={`${project.title} project screenshot`}
          fill
          loading={eager ? "eager" : "lazy"}
          sizes={IMAGE_SIZES}
          className="object-cover object-top"
        />
      </div>

      <div className="mt-4 grid grid-cols-[auto_1fr] gap-x-2">
        <span className="text-[var(--gold)]">{"//"}</span>
        <span className="text-[var(--text-muted)]">
          {project.category}
          {project.featured ? " · featured" : ""}
        </span>
      </div>

      <h2 className="font-display mt-1 text-2xl text-[var(--gold)]">
        {project.title}
      </h2>
      <p className="mt-2 line-clamp-3 font-sans text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
        {project.description}
      </p>

      <div className="mt-3">
        <span className="text-[var(--gold)]">stack</span>
        <CodePunct>: </CodePunct>
        <CodeArray items={project.tags} />
      </div>

      <div className="mt-auto flex flex-wrap gap-3 pt-5 font-sans">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring btn-primary"
          >
            Live
            <span className="sr-only"> {project.title} (opens in a new tab)</span>
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring btn-secondary"
          >
            Code
            <span className="sr-only"> {project.title} (opens in a new tab)</span>
          </a>
        )}
      </div>
    </CodeWindow>
  );
}
