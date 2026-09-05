"use client";

import { CSSProperties, ElementType } from "react";
import { useReducedMotion } from "framer-motion";
import {
  FaBullhorn,
  FaCubes,
  FaFileImage,
  FaFilePowerpoint,
  FaFont,
  FaLayerGroup,
  FaObjectGroup,
  FaPalette,
  FaRulerCombined,
  FaSitemap,
  FaVectorSquare,
} from "react-icons/fa";
import SectionTitle from "./SectionTitle";

/** Deterministic per-card timing so glows never sync and stay calm — mirrors About/Mentors. */
const GLOW_TIMINGS = [
  { duration: 14, delay: 0, reverse: false },
  { duration: 9.5, delay: 2.8, reverse: true },
  { duration: 17, delay: 1.2, reverse: false },
  { duration: 11.5, delay: 4.6, reverse: true },
  { duration: 15.5, delay: 0.7, reverse: false },
  { duration: 12.5, delay: 3.4, reverse: true },
] as const;

const COLOR_SWATCHES = [
  { name: "Gold", token: "--gold", hex: "#B8860B" },
  { name: "Hover", token: "--gold-hover", hex: "#D4A017" },
  { name: "Page", token: "--page-bg", hex: "#030712" },
  { name: "Surface", token: "--surface", hex: "#0C1220" },
  { name: "Elevated", token: "--surface-elevated", hex: "#111827" },
  { name: "Text", token: "--text-primary", hex: "#E5E7EB" },
  { name: "Muted", token: "--text-muted", hex: "#9CA3AF" },
] as const;

const SPACING_STEPS = [4, 8, 12, 16, 24, 32, 48, 64] as const;

function ColorSwatches() {
  return (
    <div className="flex flex-wrap gap-3">
      {COLOR_SWATCHES.map((swatch) => (
        <div key={swatch.name} className="flex flex-col items-center gap-1">
          <span
            className="h-7 w-7 rounded-full border border-[var(--border-subtle)] shadow-[var(--shadow-card)]"
            style={{ background: `var(${swatch.token})` }}
            aria-hidden="true"
          />
          <span className="text-[8px] tracking-[0.1em] text-[var(--text-muted)] uppercase">
            {swatch.name}
          </span>
        </div>
      ))}
    </div>
  );
}

function TypographyDemo() {
  return (
    <div className="space-y-2">
      <p className="text-[10px] tracking-[0.18em] text-[var(--gold)] uppercase">
        Eyebrow label
      </p>
      <p className="font-display text-xl tracking-[0.04em] text-[var(--text-primary)] uppercase">
        Heading line
      </p>
      <p className="text-xs leading-relaxed text-[var(--text-muted)]">
        Body copy stays calm and readable beneath a bold display heading.
      </p>
    </div>
  );
}

function LayoutDemo() {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <div className="h-2 w-full rounded-full bg-[rgba(184,134,11,0.35)]" />
        <p className="text-[9px] tracking-[0.1em] text-[var(--text-muted)] uppercase">
          Nav &amp; hero · max-w-7xl
        </p>
      </div>
      <div className="space-y-1">
        <div className="h-2 w-[85%] rounded-full bg-[rgba(184,134,11,0.65)]" />
        <p className="text-[9px] tracking-[0.1em] text-[var(--text-muted)] uppercase">
          Content sections · max-w-6xl
        </p>
      </div>
    </div>
  );
}

function SpacingDemo() {
  return (
    <div className="flex items-end gap-1.5">
      {SPACING_STEPS.map((step) => (
        <div key={step} className="flex flex-col items-center gap-1">
          <div
            className="w-2 rounded-t bg-[rgba(184,134,11,0.55)]"
            style={{ height: `${Math.min(step, 64) * 0.6}px` }}
            aria-hidden="true"
          />
          <span className="text-[7px] text-[var(--text-muted)]">{step}</span>
        </div>
      ))}
    </div>
  );
}

function HierarchyDemo() {
  return (
    <div className="rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-white/[0.02] p-3">
      <p className="text-[9px] tracking-[0.16em] text-[var(--gold)] uppercase">
        Step 01
      </p>
      <p className="font-display mt-1 text-sm tracking-[0.03em] text-[var(--text-primary)] uppercase">
        Primary action
      </p>
      <p className="mt-1 text-[10px] leading-relaxed text-[var(--text-muted)]">
        Supporting detail comes third, quietly.
      </p>
    </div>
  );
}

function ConsistencyDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="btn-primary pointer-events-none !min-h-8 !px-3 !py-1.5 !text-[9px]">
        Button
      </span>
      <span className="surface-card px-3 py-1.5 text-[9px] text-[var(--text-muted)]">
        Card
      </span>
      <span className="focus-ring rounded-[var(--radius-sm)] border border-[var(--border-subtle)] px-3 py-1.5 text-[9px] text-[var(--text-muted)]">
        Focus
      </span>
    </div>
  );
}

type Principle = {
  icon: ElementType;
  title: string;
  description: string;
  visual: React.ReactNode;
};

const PRINCIPLES: Principle[] = [
  {
    icon: FaPalette,
    title: "Color",
    description:
      "One disciplined accent against deep neutral surfaces. Every screen — hero, cards, buttons, focus states — pulls from the same seven tokens, so mood and contrast stay predictable at every depth.",
    visual: <ColorSwatches />,
  },
  {
    icon: FaFont,
    title: "Typography",
    description:
      "A display face for identity, a body face for reading. Size, weight and letter-spacing carry meaning — eyebrows stay quiet, headings carry the weight, body copy stays calm.",
    visual: <TypographyDemo />,
  },
  {
    icon: FaObjectGroup,
    title: "Layout",
    description:
      "Two container widths run the whole site — a wider band for the hero and nav, a narrower one for reading content — so the eye always knows where a page “ends.”",
    visual: <LayoutDemo />,
  },
  {
    icon: FaRulerCombined,
    title: "Spacing",
    description:
      "A predictable scale — 4px steps compounding into 8/12/16/24/32/48/64 — instead of arbitrary pixel values, so padding and gaps never fight each other.",
    visual: <SpacingDemo />,
  },
  {
    icon: FaLayerGroup,
    title: "Visual Hierarchy",
    description:
      "Every block reads top-down: label, then headline, then supporting copy, then a single action — never more than one loud element competing for attention.",
    visual: <HierarchyDemo />,
  },
  {
    icon: FaCubes,
    title: "Visual Consistency",
    description:
      "The same button, card and focus-ring primitives are reused from the hero to the footer — a new section adopts the existing system instead of inventing its own.",
    visual: <ConsistencyDemo />,
  },
];

type Deliverable = {
  icon: ElementType;
  title: string;
  description: string;
};

const DELIVERABLES: Deliverable[] = [
  {
    icon: FaSitemap,
    title: "Landing Page",
    description:
      "Hero, proof, feature breakdown, pricing and one clear call to action — built to convert, not just to look good.",
  },
  {
    icon: FaVectorSquare,
    title: "Logo",
    description:
      "Type-driven and mark-based systems, built to hold up at favicon size and on a hero banner alike.",
  },
  {
    icon: FaFilePowerpoint,
    title: "Pitch Deck",
    description:
      "A clear narrative arc, one idea per slide, one consistent grid and type system across every page.",
  },
  {
    icon: FaFileImage,
    title: "Social Graphic",
    description:
      "On-brand graphics sized for the platform they live on, sharing colour and type with the product they promote.",
  },
  {
    icon: FaBullhorn,
    title: "Marketing",
    description:
      "Landing sections, email headers and ad creative that read as one brand with the product behind them.",
  },
];

type PrincipleCardProps = Principle & {
  glowDuration: number;
  glowDelay: number;
  glowReverse: boolean;
  reducedMotion: boolean | null;
};

function PrincipleCard({
  icon: Icon,
  title,
  description,
  visual,
  glowDuration,
  glowDelay,
  glowReverse,
  reducedMotion,
}: PrincipleCardProps) {
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
        <div className="flex items-center gap-2.5 px-4 pt-4 md:px-5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[rgba(184,134,11,0.12)] text-[var(--gold)]">
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <h3 className="font-display text-sm tracking-[0.1em] text-[var(--text-primary)] uppercase md:text-base">
            {title}
          </h3>
        </div>

        <div className="flex flex-1 flex-col border-t border-[var(--border-subtle)] px-4 py-4 md:px-5">
          <p className="text-xs leading-relaxed text-[var(--text-muted)] md:text-[0.85rem]">
            {description}
          </p>
          <div className="mt-4 border-t border-[var(--border-subtle)] pt-4">
            {visual}
          </div>
        </div>
      </div>
    </article>
  );
}

function DeliverableCard({ icon: Icon, title, description }: Deliverable) {
  return (
    <div className="surface-card surface-card-interactive flex h-full flex-col items-center gap-2 p-4 text-center">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(184,134,11,0.12)] text-[var(--gold)]">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <h4 className="font-display text-[11px] tracking-[0.1em] text-[var(--text-primary)] uppercase">
        {title}
      </h4>
      <p className="text-[11px] leading-relaxed text-[var(--text-muted)]">
        {description}
      </p>
    </div>
  );
}

export default function Design() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="design"
      aria-labelledby="design-heading"
      className="w-full bg-[var(--page-bg)] pb-8"
    >
      <SectionTitle text="Design" headingId="design-heading" />

      <div className="mx-auto w-full max-w-6xl px-6 pb-2 md:px-10 lg:px-14">
        <p className="mx-auto mb-7 max-w-2xl text-center text-sm leading-relaxed text-[var(--text-muted)]">
          The visual system behind every screen in this portfolio — decided
          once, then reused everywhere instead of re-invented per page.
        </p>

        <div className="grid grid-cols-1 auto-rows-fr gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {PRINCIPLES.map((principle, index) => {
            const timing = GLOW_TIMINGS[index] ?? GLOW_TIMINGS[0];

            return (
              <PrincipleCard
                key={principle.title}
                {...principle}
                glowDuration={timing.duration}
                glowDelay={timing.delay}
                glowReverse={timing.reverse}
                reducedMotion={reducedMotion}
              />
            );
          })}
        </div>

        <div className="mt-12">
          <h3 className="font-display text-center text-xs tracking-[0.24em] text-[var(--gold)] uppercase md:text-sm">
            What I Design
          </h3>
          <p className="mx-auto mt-2 mb-6 max-w-2xl text-center text-sm leading-relaxed text-[var(--text-muted)]">
            The same six principles, applied to the assets a brand or launch
            actually needs.
          </p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-5">
            {DELIVERABLES.map((deliverable) => (
              <DeliverableCard key={deliverable.title} {...deliverable} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
