"use client";

import { ReactNode, useId, useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import Connector, { StackedConnector } from "./Connector";
import {
  CodePunct,
  CodeString,
  CodeTabs,
  CodeWindow,
  codeTabId,
  codeTabPanelId,
  useReveal,
} from "./CodeWindow";

/*
 * Copy provenance: sentences marked `// NEW` were written for this redesign;
 * everything else is reused from the previous AI Engineering cards or the
 * About section's "Engineering Philosophy".
 */

type AdrBlock = { label: string; lines: string[] };

const ADR: AdrBlock[] = [
  {
    label: "Context",
    lines: [
      // NEW
      "AI can speed up delivery, but it produces plausible output that can be wrong, insecure or hard to maintain.",
      "Model output and tool input are treated as untrusted until proven otherwise.",
    ],
  },
  {
    label: "Decision",
    lines: [
      "I use AI-assisted development to improve planning, implementation, debugging, and documentation without replacing careful engineering judgement.",
      "AI proposes, I stay accountable for what ships.",
      "Deterministic pipelines for anything with a known, repeatable shape; agents reserved for genuinely open-ended tasks.",
    ],
  },
  {
    label: "Trade-offs",
    lines: [
      // NEW (first clause); the rest is reused
      "Some speed is spent on review and tests: generated code earns trust through tests, not through how confident it sounds.",
      // NEW
      "Reversible decisions are made quickly; hard-to-reverse ones (data, security, architecture) slowly.",
      "Bigger model vs. faster model, more context vs. lower cost — every choice trades something off.",
    ],
  },
  {
    label: "Consequences",
    lines: [
      // NEW
      "Code the team can reason about, change and operate later.",
      "I balance delivery speed with security, usability, and long-term maintainability.",
      "Ship reviewable, revertible increments instead of one giant AI-generated diff.",
    ],
  },
];

type Boundary = { comment: string; key: string; value: string };

const BOUNDARIES: Boundary[] = [
  {
    // NEW
    comment: "Where AI is trusted",
    key: "ai",
    // NEW
    value: "drafts, explores options, writes tests and docs, reviews diffs",
  },
  {
    // NEW
    comment: "What gates every change before it ships",
    key: "gates",
    // NEW
    value: "types, tests, linting, code review",
  },
  {
    // NEW
    comment: "Where a human owns the decision",
    key: "human",
    // NEW
    value: "anything security-sensitive, data-related, architectural or hard to reverse",
  },
  {
    // NEW
    comment: "What the model gets to see",
    key: "context",
    value: "the right files, constraints and prior decisions — not the whole repo",
  },
  {
    // NEW
    comment: "What the model gets to do",
    key: "tools",
    value: "a small, well-typed set of actions — not open-ended shell access",
  },
];

const VALUES: { label: string; body: ReactNode }[] = [
  {
    label: "Problem first",
    // NEW
    body: "Define the problem before the solution: who it is for, what done looks like, and what must not break.",
  },
  {
    label: "Built for change",
    // First sentence reused from About; second NEW
    body: "I prefer simple systems that teams can reason about. The next change matters more than a clever first version.",
  },
  {
    label: "Explicit trade-offs",
    // First sentence reused; second NEW
    body: "Every choice trades something off. I name the trade-off and write it down, so the next person knows why, not just what.",
  },
  {
    label: "Designed for failure",
    body: "Timeouts, retries, fallbacks — an LLM call is a network call that can fail. Output quality is measured against real examples, not vibes.",
  },
];

export default function AIEngineering() {
  const reveal = useReveal();
  const [activeAdr, setActiveAdr] = useState(0);
  const adrId = useId();

  return (
    <section
      id="ai-engineering"
      aria-labelledby="ai-engineering-heading"
      className="w-full pb-8"
    >
      <SectionTitle
        text="AI Engineering"
        headingId="ai-engineering-heading"
        gapSm={17}
        gapMd={26}
        gapLg={34}
      />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 px-6 pt-6 md:px-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-16 lg:px-14 lg:pt-10">
        {/* Top-aligned, a little below the panel's top edge. */}
        <motion.div className="lg:pt-14" {...reveal(0)}>
          <p className="font-display text-4xl leading-[1.05] md:text-5xl">
            {/* NEW (headline) */}
            <span className="block text-[var(--gold)]">AI-assisted,</span>
            <span className="relative block text-[var(--text-primary)]">
              engineer-owned.
              {/* Headline → ADR panel, centred on the white line's first row;
                  ends ~14px inside the box because the tilt pulls the panel's
                  visible left edge inward. */}
              <Connector
                variant="horizontal"
                length={78}
                className="absolute top-[0.525em] left-full -translate-y-1/2"
              />
            </span>
          </p>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
            How I use AI to design, build and operate real systems, not just
            prompt a chatbot.
          </p>
        </motion.div>

        <StackedConnector />

        <div className="lg:pb-6">
          <motion.div className="code-window-stage relative" {...reveal(0.1)}>
            <CodeWindow
              title={
                <CodeTabs
                  label="Architecture decision record sections"
                  idPrefix={adrId}
                  tabs={ADR.map((block) => ({
                    file: `${block.label.toLowerCase()}.md`,
                    name: block.label,
                  }))}
                  activeIndex={activeAdr}
                  onSelect={setActiveAdr}
                />
              }
              className="code-window--tilted ai-window--primary"
            >
              <div className="space-y-4">
                <div>
                  <div className="text-[var(--text-primary)]">
                    <CodePunct># </CodePunct>ADR: AI in the loop
                  </div>
                  <div>
                    <span className="text-[var(--gold)]">status</span>
                    <CodePunct>: </CodePunct>
                    <span className="text-[var(--text-primary)]">accepted</span>
                  </div>
                </div>

                {/* Panes share one grid cell, so the body is always as tall
                    as the longest section and never resizes between tabs. */}
                <div className="code-panes">
                  {ADR.map((block, index) => (
                    <div
                      key={block.label}
                      id={codeTabPanelId(adrId, index)}
                      role="tabpanel"
                      aria-labelledby={codeTabId(adrId, index)}
                      data-active={index === activeAdr}
                      aria-hidden={index !== activeAdr}
                      className="code-pane"
                    >
                      <div className="text-[var(--gold)]">
                        <CodePunct>## </CodePunct>
                        {block.label}
                      </div>
                      <div className="mt-1 space-y-1.5 text-[var(--text-primary)] opacity-90">
                        {block.lines.map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CodeWindow>
          </motion.div>

          <StackedConnector />

          <motion.div
            className="code-window-stage relative lg:-mt-3 lg:-ml-8 lg:w-[86%]"
            {...reveal(0.2)}
          >
            {/* ADR panel → boundaries panel (elbow off the right edge) */}
            <Connector
              variant="elbow-right"
              className="absolute top-3 left-full"
            />

            <CodeWindow
              title="boundaries.ts"
              className="code-window--tilted ai-window--secondary"
            >
              <div>
                <span className="text-[var(--gold)]">export const </span>
                <span className="text-[var(--text-primary)]">boundaries</span>
                <CodePunct> = {"{"}</CodePunct>
              </div>
              <div className="space-y-2.5 py-1 pl-4">
                {BOUNDARIES.map((boundary) => (
                  <div key={boundary.key}>
                    <div className="grid grid-cols-[auto_1fr] gap-x-2">
                      <span className="text-[var(--gold)]">{"//"}</span>
                      <span className="text-[var(--text-muted)]">
                        {boundary.comment}
                      </span>
                    </div>
                    <div className="pl-4 -indent-4">
                      <span className="text-[var(--text-primary)]">
                        {boundary.key}
                      </span>
                      <CodePunct>: </CodePunct>
                      <CodeString>{boundary.value}</CodeString>
                      <CodePunct>,</CodePunct>
                    </div>
                  </div>
                ))}
              </div>
              <CodePunct>{"};"}</CodePunct>
            </CodeWindow>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-6 pt-14 pb-4 md:grid-cols-2 md:px-10 lg:grid-cols-4 lg:px-14">
        {VALUES.map((value, index) => (
          <motion.div key={value.label} {...reveal(0.05 * index)}>
            <h3 className="font-display text-sm tracking-[0.12em] text-[var(--gold)] uppercase md:text-base">
              {value.label}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)] md:text-[0.95rem]">
              {value.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
