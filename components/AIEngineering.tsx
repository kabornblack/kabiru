"use client";

import { CSSProperties, ElementType } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import {
  FaCode,
  FaDatabase,
  FaExternalLinkAlt,
  FaGithub,
  FaNetworkWired,
  FaRobot,
  FaShieldAlt,
} from "react-icons/fa";
import SectionTitle from "./SectionTitle";
import { projects } from "./data/projectData";

/** Deterministic per-card timing so glows never sync and stay calm — mirrors About/Design. */
const GLOW_TIMINGS = [
  { duration: 13, delay: 0, reverse: false },
  { duration: 16.5, delay: 2.1, reverse: true },
  { duration: 10, delay: 3.6, reverse: false },
  { duration: 14.5, delay: 1, reverse: true },
  { duration: 11.5, delay: 4.2, reverse: false },
] as const;

type SkillPoint = {
  letter: string;
  label: string;
  detail: string;
};

type Skill = {
  icon: ElementType;
  title: string;
  points: SkillPoint[];
};

const SKILLS: Skill[] = [
  {
    icon: FaCode,
    title: "Software Engineering & System Design, Supercharged by AI",
    points: [
      {
        letter: "A",
        label: "Context",
        detail:
          "Feed the model the right files, constraints and prior decisions — not the whole repo.",
      },
      {
        letter: "B",
        label: "Small Steps",
        detail:
          "Ship reviewable, revertible increments instead of one giant AI-generated diff.",
      },
      {
        letter: "C",
        label: "Review",
        detail:
          "Read every line before it merges — AI proposes, I stay accountable for what ships.",
      },
      {
        letter: "D",
        label: "Tests",
        detail:
          "Generated code earns trust through tests, not through how confident it sounds.",
      },
    ],
  },
  {
    icon: FaNetworkWired,
    title: "Building Real, Scalable LLM Applications",
    points: [
      {
        letter: "A",
        label: "Tokens",
        detail:
          "Cost and latency are a token-counting problem before they're a code problem.",
      },
      {
        letter: "B",
        label: "Context Window",
        detail:
          "What fits, what gets summarised, what gets dropped — decided deliberately, not by accident.",
      },
      {
        letter: "C",
        label: "Message Roles",
        detail:
          "System, user, assistant and tool messages each carry a different kind of authority.",
      },
      {
        letter: "D",
        label: "Trade-offs",
        detail:
          "Bigger model vs. faster model, more context vs. lower cost — every choice trades something off.",
      },
    ],
  },
  {
    icon: FaDatabase,
    title: "Context Engineering, RAG & Data",
    points: [
      {
        letter: "A",
        label: "Ingestion",
        detail: "Getting messy source data into a usable, versioned shape.",
      },
      {
        letter: "B",
        label: "Chunking",
        detail:
          "Splitting content so each piece is retrievable and still means something alone.",
      },
      {
        letter: "C",
        label: "Embeddings",
        detail: "Turning chunks into vectors that actually cluster by meaning.",
      },
      {
        letter: "D",
        label: "Retrieval & Re-ranking",
        detail:
          "Finding the right chunks fast, then re-ordering them for relevance before they reach the model.",
      },
    ],
  },
  {
    icon: FaRobot,
    title: "Agents, Tools, MCP & Workflow Orchestration",
    points: [
      {
        letter: "A",
        label: "Tools",
        detail:
          "A small, well-typed set of actions for the model — not open-ended shell access.",
      },
      {
        letter: "B",
        label: "MCP",
        detail:
          "Standardised tool/context servers so agents plug into real systems instead of one-off glue code.",
      },
      {
        letter: "C",
        label: "Workflows",
        detail:
          "Deterministic multi-step pipelines for anything with a known, repeatable shape.",
      },
      {
        letter: "D",
        label: "Agents",
        detail:
          "Reserved for genuinely open-ended tasks, where the next step depends on what the model just found.",
      },
    ],
  },
  {
    icon: FaShieldAlt,
    title: "Evals, LLMOps, Reliability, Security & Cost Control",
    points: [
      {
        letter: "A",
        label: "Evals",
        detail: "Output quality measured against real examples, not vibes.",
      },
      {
        letter: "B",
        label: "Reliability",
        detail:
          "Timeouts, retries, fallbacks — an LLM call is a network call that can fail.",
      },
      {
        letter: "C",
        label: "Security",
        detail:
          "Model output and tool input are treated as untrusted until proven otherwise.",
      },
      {
        letter: "D",
        label: "Cost Control",
        detail:
          "Spend tracked per feature, not just per month, so cost stays a design input.",
      },
    ],
  },
];

type SkillCardProps = Skill & {
  index: number;
  glowDuration: number;
  glowDelay: number;
  glowReverse: boolean;
  reducedMotion: boolean | null;
};

function SkillCard({
  icon: Icon,
  title,
  points,
  index,
  glowDuration,
  glowDelay,
  glowReverse,
  reducedMotion,
}: SkillCardProps) {
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
        <div className="flex items-center gap-3 px-4 pt-4 pb-3.5 md:px-6 md:pt-5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[rgba(184,134,11,0.12)] text-[var(--gold)]">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
          <h3 className="font-display text-sm tracking-[0.06em] text-[var(--text-primary)] uppercase md:text-base">
            <span className="mr-2 text-[var(--gold)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            {title}
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-3 border-t border-[var(--border-subtle)] px-4 py-4 sm:grid-cols-2 md:px-6 lg:grid-cols-4">
          {points.map((point) => (
            <div key={point.letter} className="flex gap-2.5">
              <span className="font-display flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--border-gold)] text-[10px] text-[var(--gold)]">
                {point.letter}
              </span>
              <div>
                <p className="text-xs font-semibold tracking-[0.04em] text-[var(--text-primary)] uppercase">
                  {point.label}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-[var(--text-muted)]">
                  {point.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function AIEngineering() {
  const reducedMotion = useReducedMotion();
  const flagshipProject = projects.find(
    (project) => project.title === "AI Agent Builder",
  );

  return (
    <section
      id="ai-engineering"
      aria-labelledby="ai-engineering-heading"
      className="w-full bg-[var(--page-bg)] pb-8"
    >
      <SectionTitle
        text="AI Engineering"
        headingId="ai-engineering-heading"
        gapSm={17}
        gapMd={26}
        gapLg={34}
      />

      <div className="mx-auto w-full max-w-6xl px-6 pb-2 md:px-10 lg:px-14">
        <p className="mx-auto mb-7 max-w-2xl text-center text-sm leading-relaxed text-[var(--text-muted)]">
          Five skills I treat as one discipline — how I use AI to design,
          build and operate real systems, not just prompt a chatbot.
        </p>

        <div className="space-y-3 md:space-y-4">
          {SKILLS.map((skill, index) => {
            const timing = GLOW_TIMINGS[index] ?? GLOW_TIMINGS[0];

            return (
              <SkillCard
                key={skill.title}
                {...skill}
                index={index}
                glowDuration={timing.duration}
                glowDelay={timing.delay}
                glowReverse={timing.reverse}
                reducedMotion={reducedMotion}
              />
            );
          })}
        </div>

        <div className="mentor-card relative mt-8">
          <div className="mentor-card-inner p-5 md:p-8">
            <p className="text-[10px] tracking-[0.18em] text-[var(--gold)] uppercase">
              Building with AI
            </p>
            <h3 className="font-display mt-2 text-lg tracking-[0.04em] text-[var(--text-primary)] uppercase md:text-xl">
              One project, five skills
            </h3>

            <div className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--text-muted)] md:text-[0.95rem]">
              <p>
                I build one project that puts all five of these to work
                together — pulling the right context, calling a tool,
                checking the output before anything ships.
              </p>
              <p>
                I keep track of the calls I make along the way — model
                choice, workflow versus agent, how much context to pull in —
                and what breaks: a bad chunk boundary, a tool stuck in a
                loop, a cost spike caught late.
              </p>
            </div>

            {flagshipProject ? (
              <div className="mt-6 flex flex-wrap items-center gap-2.5 border-t border-[var(--border-subtle)] pt-5">
                <Link
                  href={flagshipProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring btn-primary !min-h-10 !px-4 !py-2 !text-[11px]"
                >
                  Check it out — {flagshipProject.title}
                </Link>

                {flagshipProject.githubUrl ? (
                  <Link
                    href={flagshipProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${flagshipProject.title} GitHub repository`}
                    className="focus-ring inline-flex min-h-10 min-w-10 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border-subtle)] text-[var(--gold)] transition-all duration-200 hover:border-[var(--border-gold)] hover:bg-[rgba(184,134,11,0.1)] hover:text-[var(--gold-hover)]"
                  >
                    <FaGithub className="h-4 w-4" aria-hidden="true" />
                  </Link>
                ) : null}

                <Link
                  href={flagshipProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${flagshipProject.title} live site`}
                  className="focus-ring inline-flex min-h-10 min-w-10 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border-subtle)] text-[var(--gold)] transition-all duration-200 hover:border-[var(--border-gold)] hover:bg-[rgba(184,134,11,0.1)] hover:text-[var(--gold-hover)]"
                >
                  <FaExternalLinkAlt className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
