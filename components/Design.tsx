"use client";

import { CSSProperties, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { CodePunct, CodeWindow, StackedConnector, useReveal } from "./CodeWindow";

type Palette = {
  name: string;
  harmony: string;
  primary: string;
  secondary: string;
  accent: string;
  surface: string;
  text: string;
};

/* Demo palettes for the switcher. Buttons use --surface as their text colour,
   so every primary is light enough for dark text to pass AA on it. */
const PALETTES: Palette[] = [
  {
    name: "aurora",
    harmony: "analogous: teal + sky + green",
    primary: "#2DD4BF",
    secondary: "#38BDF8",
    accent: "#4ADE80",
    surface: "#0B1324",
    text: "#E6FFFA",
  },
  {
    name: "sunset",
    harmony: "analogous: rose + orange + yellow",
    primary: "#FB7185",
    secondary: "#FB923C",
    accent: "#FACC15",
    surface: "#1A0F14",
    text: "#FFF1F2",
  },
  {
    name: "ocean",
    harmony: "complementary: blue + orange",
    primary: "#60A5FA",
    secondary: "#A5B4FC",
    accent: "#FDBA74",
    surface: "#071526",
    text: "#E0F2FE",
  },
  {
    name: "ember",
    harmony: "triadic: orange + green + violet",
    primary: "#F97316",
    secondary: "#22C55E",
    accent: "#A855F7",
    surface: "#170E0A",
    text: "#FFF7ED",
  },
  {
    name: "mint",
    harmony: "split-complementary: mint + pink + coral",
    primary: "#34D399",
    secondary: "#F472B6",
    accent: "#FCA5A5",
    surface: "#06140F",
    text: "#ECFDF5",
  },
];

const TOKENS = ["primary", "secondary", "accent", "surface", "text"] as const;

/* WCAG 2.x relative luminance and contrast ratio. */
const channel = (value: number) => {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

const luminance = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return (
    0.2126 * channel((n >> 16) & 255) +
    0.7152 * channel((n >> 8) & 255) +
    0.0722 * channel(n & 255)
  );
};

const contrastRatio = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const passLabel = (ratio: number) =>
  ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : null;

const PRINCIPLES = [
  {
    title: "Color",
    description:
      "One disciplined accent against deep neutral surfaces. Every screen — hero, cards, buttons, focus states — pulls from the same seven tokens, so mood and contrast stay predictable at every depth.",
  },
  {
    title: "Typography",
    description:
      "A display face for identity, a body face for reading. Size, weight and letter-spacing carry meaning — eyebrows stay quiet, headings carry the weight, body copy stays calm.",
  },
  {
    title: "Layout",
    description:
      "Two container widths run the whole site — a wider band for the hero and nav, a narrower one for reading content — so the eye always knows where a page “ends.”",
  },
  {
    title: "Spacing",
    description:
      "A predictable scale — 4px steps compounding into 8/12/16/24/32/48/64 — instead of arbitrary pixel values, so padding and gaps never fight each other.",
  },
  {
    title: "Visual Hierarchy",
    description:
      "Every block reads top-down: label, then headline, then supporting copy, then a single action — never more than one loud element competing for attention.",
  },
  {
    title: "Visual Consistency",
    description:
      "The same button, card and focus-ring primitives are reused from the hero to the footer — a new section adopts the existing system instead of inventing its own.",
  },
];

const DELIVERABLES = [
  {
    title: "Landing Page",
    description:
      "Hero, proof, feature breakdown, pricing and one clear call to action — built to convert, not just to look good.",
  },
  {
    title: "Logo",
    description:
      "Type-driven and mark-based systems, built to hold up at favicon size and on a hero banner alike.",
  },
  {
    title: "Pitch Deck",
    description:
      "A clear narrative arc, one idea per slide, one consistent grid and type system across every page.",
  },
  {
    title: "Social Graphic",
    description:
      "On-brand graphics sized for the platform they live on, sharing colour and type with the product they promote.",
  },
  {
    title: "Marketing",
    description:
      "Landing sections, email headers and ad creative that read as one brand with the product behind them.",
  },
];

const BAR_HEIGHTS = [45, 72, 58, 90, 66] as const;
const BAR_TOKENS = ["primary", "secondary", "accent", "primary", "secondary"] as const;

const ContrastRow = ({
  label,
  fg,
  bg,
}: {
  label: string;
  fg: string;
  bg: string;
}) => {
  const ratio = contrastRatio(fg, bg);
  const pass = passLabel(ratio);

  return (
    <div className="flex flex-wrap items-center gap-x-2">
      <span className="text-[var(--text-muted)]">{label}</span>
      <span className="text-[var(--text-primary)]">{ratio.toFixed(2)}:1</span>
      {pass && (
        <span className="design-pass rounded px-1.5 text-[13px]">{pass}</span>
      )}
    </div>
  );
};

export default function Design() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tablistId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reveal = useReveal();
  const active = PALETTES[activeIndex];

  const paletteVars = {
    "--palette-primary": active.primary,
    "--palette-secondary": active.secondary,
    "--palette-accent": active.accent,
    "--palette-surface": active.surface,
    "--palette-text": active.text,
  } as CSSProperties;

  const onTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const last = PALETTES.length - 1;
    const next =
      event.key === "ArrowRight"
        ? activeIndex === last
          ? 0
          : activeIndex + 1
        : event.key === "ArrowLeft"
          ? activeIndex === 0
            ? last
            : activeIndex - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;

    if (next === null) return;
    event.preventDefault();
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  };

  const tabs = (
    <div
      role="tablist"
      aria-label="Colour palettes"
      className="tablist-fade code-tabs ml-2 flex min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {PALETTES.map((palette, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={palette.name}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            id={`${tablistId}-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`${tablistId}-panel-${index}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => setActiveIndex(index)}
            onKeyDown={onTabKeyDown}
            className={[
              "focus-ring code-tab shrink-0 cursor-pointer px-2 py-1.5 font-mono text-[13px] transition-colors duration-200",
              isActive
                ? "design-tab-active"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)]",
            ].join(" ")}
          >
            <span className="sr-only">{palette.name} palette: </span>
            {palette.name}.css
          </button>
        );
      })}
    </div>
  );

  return (
    <section
      id="design"
      aria-labelledby="design-heading"
      className="design-section w-full pb-8"
      style={paletteVars}
    >
      <SectionTitle text="Design" headingId="design-heading" />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 px-6 pt-6 pb-6 md:px-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-center lg:gap-14 lg:px-14 lg:pt-10">
        {/* Top-aligned, a little below the panel's top edge. */}
        <motion.div
          className="lg:col-start-2 lg:row-start-1 lg:self-start lg:pt-14"
          {...reveal(0)}
        >
          <p className="font-display text-4xl leading-[1.05] md:text-5xl">
            <span className="block text-[var(--gold)]">Color, type</span>
            <span className="relative block text-[var(--text-primary)]">
              &amp; visual systems.
              {/* Palette panel → headline, centred on the white line's first
                  row; starts inside the box because the tilt pulls the
                  panel's visible right edge inward. */}
              <svg
                aria-hidden="true"
                className="code-connector pointer-events-none absolute top-[0.525em] right-full hidden -translate-y-1/2 lg:block"
                width="70"
                height="8"
                viewBox="0 0 70 8"
              >
                <line x1="3" y1="4" x2="67" y2="4" />
                <circle cx="3" cy="4" r="3" />
                <circle cx="67" cy="4" r="3" />
              </svg>
            </span>
          </p>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
            The visual system behind every screen in this portfolio — decided
            once, then reused everywhere instead of re-invented per page.
          </p>
        </motion.div>

        <StackedConnector />

        <div className="lg:col-start-1 lg:row-start-1 lg:pb-6">
          <motion.div className="code-window-stage relative" {...reveal(0.1)}>
            <CodeWindow
              title={tabs}
              className="code-window--tilted design-window--primary"
            >
              <div className="code-panes">
                {PALETTES.map((palette, index) => (
                  <div
                    key={palette.name}
                    id={`${tablistId}-panel-${index}`}
                    role="tabpanel"
                    aria-labelledby={`${tablistId}-tab-${index}`}
                    data-active={index === activeIndex}
                    aria-hidden={index !== activeIndex}
                    className="code-pane"
                  >
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <span className="text-[var(--gold)]">{"//"}</span>
                      <span className="text-[var(--text-muted)]">
                        {palette.harmony}
                      </span>
                    </div>
                    <div className="mt-2 text-[var(--text-primary)]">
                      :root <CodePunct>{"{"}</CodePunct>
                    </div>
                    {TOKENS.map((token) => (
                      <div
                        key={token}
                        className="flex items-center pl-4"
                      >
                        <span className="text-[var(--gold)]">--{token}</span>
                        <CodePunct>:</CodePunct>
                        <span
                          aria-hidden="true"
                          className="mx-2 h-3.5 w-3.5 shrink-0 rounded-[3px] ring-1 ring-white/25"
                          style={{ background: palette[token] }}
                        />
                        <span className="text-[var(--text-primary)]">
                          {palette[token]}
                        </span>
                        <CodePunct>;</CodePunct>
                      </div>
                    ))}
                    <CodePunct>{"}"}</CodePunct>
                    <div
                      aria-hidden="true"
                      className="mt-4 h-3 rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${palette.primary}, ${palette.secondary}, ${palette.accent})`,
                      }}
                    />
                  </div>
                ))}
              </div>
            </CodeWindow>
          </motion.div>

          <StackedConnector />

          <motion.div
            className="code-window-stage relative lg:-mt-3 lg:-mr-8 lg:ml-auto lg:w-[86%]"
            {...reveal(0.2)}
          >
            {/* Palette panel → preview panel (elbow off the left edge) */}
            <svg
              aria-hidden="true"
              className="code-connector pointer-events-none absolute top-3 right-full hidden lg:block"
              width="44"
              height="52"
              viewBox="0 0 44 52"
            >
              <path d="M44 48 H4 V0" />
              <circle cx="44" cy="48" r="3" />
              <circle cx="4" cy="48" r="2" />
              <circle cx="4" cy="0" r="3" />
            </svg>

            <CodeWindow
              title="preview.tsx"
              className="code-window--tilted design-window--secondary"
            >
              <div className="design-preview space-y-4">
                <div aria-hidden="true" className="space-y-3">
                  <div className="design-preview-card rounded-[var(--radius-sm)] p-3 font-sans">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold">
                        Visual Hierarchy
                      </span>
                      <span className="design-preview-badge rounded-full px-2 py-0.5 text-[11px] font-semibold">
                        accent
                      </span>
                    </div>
                    <p className="mt-1 text-[13px] opacity-85">
                      Label, headline, supporting copy, single action.
                    </p>
                    <div className="mt-3 flex h-12 items-end gap-1.5">
                      {BAR_HEIGHTS.map((height, index) => (
                        <span
                          key={index}
                          className="design-preview-bar w-full rounded-t-sm"
                          style={{
                            height: `${height}%`,
                            background: `var(--palette-${BAR_TOKENS[index]})`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 font-sans">
                    <span className="design-preview-primary rounded-[var(--radius-sm)] px-3 py-1.5 text-[13px] font-semibold">
                      Primary
                    </span>
                    <span className="design-preview-secondary rounded-[var(--radius-sm)] px-3 py-1.5 text-[13px] font-semibold">
                      Secondary
                    </span>
                  </div>
                </div>

                <div className="space-y-1" aria-live="polite">
                  <ContrastRow
                    label="text / surface"
                    fg={active.text}
                    bg={active.surface}
                  />
                  <ContrastRow
                    label="button / primary"
                    fg={active.surface}
                    bg={active.primary}
                  />
                </div>
              </div>
            </CodeWindow>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-6 pt-10 md:grid-cols-3 md:px-10 lg:px-14">
        {PRINCIPLES.map((principle, index) => (
          <motion.div key={principle.title} {...reveal(0.05 * (index % 3))}>
            <h3 className="font-display text-sm tracking-[0.12em] text-[var(--gold)] uppercase md:text-base">
              {principle.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)] md:text-[0.95rem]">
              {principle.description}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 pt-14 md:px-10 lg:px-14">
        <motion.div {...reveal(0)}>
          <h3 className="font-display text-sm tracking-[0.12em] text-[var(--gold)] uppercase md:text-base">
            What I Design
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)] md:text-[0.95rem]">
            The same six principles, applied to the assets a brand or launch
            actually needs.
          </p>
        </motion.div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {DELIVERABLES.map((deliverable, index) => (
            <motion.div key={deliverable.title} {...reveal(0.05 * index)}>
              <h4 className="text-sm font-semibold tracking-[0.04em] text-[var(--text-primary)]">
                {deliverable.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                {deliverable.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
