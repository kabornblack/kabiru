"use client";

import { useId, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Connector, { StackedConnector } from "./Connector";
import {
  CodeArray,
  CodePunct,
  CodeString,
  CodeTabs,
  CodeWindow,
  codeTabId,
  codeTabPanelId,
  useReveal,
} from "./CodeWindow";

export type SkillTier = "core" | "additional";

export type SkillItem = {
  name: string;
  tier: SkillTier;
};

export type SkillCategoryKey =
  | "frontend"
  | "backend"
  | "database"
  | "ai"
  | "web3"
  | "tools";

export type SkillCategory = {
  key: SkillCategoryKey;
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  items: SkillItem[];
};

const namesOf = (category: SkillCategory, tier: SkillTier) =>
  category.items.filter((item) => item.tier === tier).map((item) => item.name);

const Comment = ({
  children,
  bright = false,
}: {
  children: string;
  bright?: boolean;
}) => (
  <div className="grid grid-cols-[auto_1fr] gap-x-2">
    <span className="text-[var(--gold)]">{"//"}</span>
    <span
      className={
        bright ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"
      }
    >
      {children}
    </span>
  </div>
);

const ExportLine = ({ name, items }: { name: string; items: string[] }) => (
  <div>
    <span className="text-[var(--gold)]">export const </span>
    <span className="text-[var(--text-primary)]">{name}</span>
    <CodePunct> = </CodePunct>
    <CodeArray items={items} />
    <CodePunct>;</CodePunct>
  </div>
);

export default function SkillStackShowcase({
  categories,
}: {
  categories: SkillCategory[];
}) {
  const [activeCategory, setActiveCategory] =
    useState<SkillCategoryKey>("frontend");
  const tablistId = useId();
  const reveal = useReveal();

  const activeIndex = useMemo(
    () => categories.findIndex((item) => item.key === activeCategory),
    [activeCategory, categories],
  );

  const tabs = (
    <CodeTabs
      label="Skill categories"
      idPrefix={tablistId}
      tabs={categories.map((category) => ({
        file: `${category.key}.ts`,
        name: category.title,
      }))}
      activeIndex={activeIndex}
      onSelect={(index) => setActiveCategory(categories[index].key)}
    />
  );

  return (
    <div className="lg:pb-6">
      <motion.div className="code-window-stage relative" {...reveal(0.1)}>
        <CodeWindow
          title={tabs}
          className="code-window--tilted skills-window--primary"
        >
          <div className="code-panes">
            {categories.map((category, index) => {
              const isActive = category.key === activeCategory;
              const extras = namesOf(category, "additional");

              return (
                <div
                  key={category.key}
                  id={codeTabPanelId(tablistId, index)}
                  role="tabpanel"
                  aria-labelledby={codeTabId(tablistId, index)}
                  data-active={isActive}
                  aria-hidden={!isActive}
                  className="code-pane space-y-4"
                >
                  <div>
                    <Comment>Core strengths</Comment>
                    <ExportLine
                      name="core"
                      items={namesOf(category, "core")}
                    />
                  </div>
                  {extras.length > 0 && (
                    <div>
                      <Comment>Working knowledge</Comment>
                      <ExportLine name="workingKnowledge" items={extras} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CodeWindow>
      </motion.div>

      <StackedConnector stagger={1} />

      <motion.div
        className="code-window-stage relative lg:-mt-3 lg:-mr-8 lg:ml-auto lg:w-[86%]"
        {...reveal(0.2)}
      >
        {/* Main panel → summary panel (elbow off the left edge) */}
        <Connector
          variant="elbow-left"
          stagger={1}
          className="absolute top-3 right-full"
        />

        <CodeWindow
          title="summary.ts"
          className="code-window--tilted skills-window--secondary"
        >
          <div className="code-panes">
            {categories.map((category) => (
              <div
                key={category.key}
                data-active={category.key === activeCategory}
                aria-hidden={category.key !== activeCategory}
                className="code-pane space-y-3"
              >
                <div>
                  <Comment>{`Current capability: ${category.title}`}</Comment>
                  <Comment bright>{category.subtitle}</Comment>
                </div>
                <Comment>{category.description}</Comment>
                <div>
                  <span className="text-[var(--gold)]">export const </span>
                  <span className="text-[var(--text-primary)]">focus</span>
                  <CodePunct> = [</CodePunct>
                  {category.points.map((point) => (
                    <div key={point} className="pl-4">
                      <CodeString>{point}</CodeString>
                      <CodePunct>,</CodePunct>
                    </div>
                  ))}
                  <CodePunct>];</CodePunct>
                </div>
              </div>
            ))}
          </div>
        </CodeWindow>
      </motion.div>
    </div>
  );
}
