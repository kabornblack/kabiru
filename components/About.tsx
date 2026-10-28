"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import Connector, { StackedConnector } from "./Connector";
import {
  CodeArray,
  CodePunct,
  CodeString,
  CodeWindow,
  useReveal,
} from "./CodeWindow";

type ProfileValue = string | string[];

const PROFILE: [key: string, value: ProfileValue][] = [
  ["name", "Kabiru Shaibu"],
  ["role", "Full-stack product engineer"],
  [
    "focus",
    "Reliable, user-friendly software that solves real business problems and remains maintainable as products grow",
  ],
  ["builds", ["Customer-facing SaaS products", "Internal operational tools"]],
  [
    "stack",
    ["React", "TypeScript", "Node.js", "PostgreSQL", "Modern cloud technologies"],
  ],
  [
    "recentWork",
    [
      "Loyalty infrastructure",
      "Prediction platforms",
      "Secure dashboards",
      "Workflow automation",
    ],
  ],
];

const PHILOSOPHY = [
  "I balance delivery speed with security, usability, and long-term maintainability.",
  "I use AI-assisted development to improve planning, implementation, debugging, and documentation without replacing careful engineering judgement.",
];

const DETAILS = [
  {
    title: "How I Work",
    body: "I take ownership from product discovery and architecture through implementation, testing, deployment, and continuous improvement. I collaborate closely with stakeholders and engineering teams to turn business requirements into practical, scalable solutions.",
  },
  {
    title: "What I Value",
    body: "Clarity, ownership, and honest trade-offs. I prefer simple systems that teams can reason about, feedback that improves the product, and collaboration that keeps users and business outcomes at the centre of every decision.",
  },
  {
    title: "Where I Thrive",
    body: "I do my best work where product thinking meets engineering craft — cross-functional teams, real users, and systems that need to stay reliable as they grow. I enjoy turning ambiguity into shipped, well-structured software.",
  },
];

const ProfileLine = ({
  name,
  value,
  last,
}: {
  name: string;
  value: ProfileValue;
  last: boolean;
}) => (
  <div className="pl-4">
    <span className="text-[var(--gold)]">&quot;{name}&quot;</span>
    <CodePunct>: </CodePunct>
    {Array.isArray(value) ? (
      <CodeArray items={value} />
    ) : (
      <CodeString>{value}</CodeString>
    )}
    {!last && <CodePunct>,</CodePunct>}
  </div>
);

export default function About() {
  const reveal = useReveal();

  return (
    <section id="about" aria-labelledby="about-heading" className="w-full pb-8">
      <SectionTitle text="About" headingId="about-heading" />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 px-6 pt-6 md:px-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16 lg:px-14 lg:pt-10">
        {/* Top-aligned, a little below the panel's top edge. */}
        <motion.div className="lg:self-start lg:pt-14" {...reveal(0)}>
          <p className="font-display text-4xl leading-[1.05] md:text-5xl">
            <span className="block text-[var(--gold)]">Product thinking</span>
            <span className="relative block text-[var(--text-primary)]">
              meets engineering craft.
              {/* Headline → profile panel, centred on the white line's first
                  row; ends ~14px inside the box because the tilt pulls the
                  panel's visible left edge inward. */}
              <Connector
                variant="horizontal"
                length={78}
                className="absolute top-[0.525em] left-full -translate-y-1/2"
              />
            </span>
          </p>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
            Building reliable, user-friendly software that solves real business
            problems.
          </p>
        </motion.div>

        <StackedConnector />

        <div className="lg:pb-6">
          <motion.div className="code-window-stage relative" {...reveal(0.1)}>
            <CodeWindow
              title="profile.json"
              className="code-window--tilted about-window--primary"
            >
              <CodePunct>{"{"}</CodePunct>
              {PROFILE.map(([name, value], index) => (
                <ProfileLine
                  key={name}
                  name={name}
                  value={value}
                  last={index === PROFILE.length - 1}
                />
              ))}
              <CodePunct>{"}"}</CodePunct>
            </CodeWindow>
          </motion.div>

          <StackedConnector stagger={1} />

          <motion.div
            className="code-window-stage relative lg:-mt-6 lg:-ml-8 lg:w-[86%]"
            {...reveal(0.2)}
          >
            {/* Profile panel → philosophy panel (elbow off the right edge) */}
            <Connector
              variant="elbow-right"
              stagger={1}
              className="absolute top-6 left-full"
            />

            <CodeWindow
              title="philosophy.ts"
              className="code-window--tilted about-window--secondary"
            >
              <div className="space-y-3">
                {PHILOSOPHY.map((point) => (
                  <div key={point} className="grid grid-cols-[auto_1fr] gap-x-2">
                    <span className="text-[var(--gold)]">{"//"}</span>
                    <span className="text-[var(--text-muted)]">{point}</span>
                  </div>
                ))}
              </div>
            </CodeWindow>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-6 pt-14 pb-4 md:grid-cols-3 md:px-10 lg:px-14">
        {DETAILS.map((detail, index) => (
          <motion.div key={detail.title} {...reveal(0.05 * index)}>
            <h3 className="font-display text-sm tracking-[0.12em] text-[var(--gold)] uppercase md:text-base">
              {detail.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)] md:text-[0.95rem]">
              {detail.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
