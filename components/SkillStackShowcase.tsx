"use client";

import React, { useId, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export type SkillTier = "core" | "additional";

export type SkillItem = {
  name: string;
  icon: React.ReactNode;
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

export default function SkillStackShowcase({
  categories,
}: {
  categories: SkillCategory[];
}) {
  const [activeCategory, setActiveCategory] =
    useState<SkillCategoryKey>("frontend");
  const tablistId = useId();
  const reducedMotion = useReducedMotion();

  const activeIndex = useMemo(
    () => categories.findIndex((item) => item.key === activeCategory),
    [activeCategory, categories],
  );

  const selectedCategory =
    categories.find((category) => category.key === activeCategory) ||
    categories[0];

  const coreItems = selectedCategory.items.filter(
    (item) => item.tier === "core",
  );
  const additionalItems = selectedCategory.items.filter(
    (item) => item.tier === "additional",
  );

  const selectCategory = (key: SkillCategoryKey) => {
    setActiveCategory(key);
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col px-6 pt-1 pb-6 md:px-10 lg:px-16">
      <div
        role="tablist"
        aria-label="Skill categories"
        id={tablistId}
        className="relative z-30 -mx-2 flex gap-2 overflow-x-auto px-2 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((category) => {
          const isActive = activeCategory === category.key;
          const tabId = `${tablistId}-${category.key}`;
          const panelId = `${tablistId}-panel-${category.key}`;

          return (
            <button
              key={category.key}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              onClick={() => selectCategory(category.key)}
              onKeyDown={(event) => {
                if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
                  return;
                }
                event.preventDefault();
                const delta = event.key === "ArrowRight" ? 1 : -1;
                const next =
                  (activeIndex + delta + categories.length) % categories.length;
                selectCategory(categories[next].key);
              }}
              className={[
                "focus-ring shrink-0 cursor-pointer rounded-[var(--radius-sm)] border px-3.5 py-2.5 text-xs tracking-[0.12em] uppercase transition-all duration-300 md:text-sm",
                isActive
                  ? "border-[var(--gold)] bg-[rgba(184,134,11,0.18)] text-[var(--gold)] shadow-[var(--shadow-gold)]"
                  : "border-[var(--border-subtle)] bg-white/[0.03] text-[var(--text-muted)] hover:border-[rgba(184,134,11,0.5)] hover:text-[var(--gold)]",
              ].join(" ")}
            >
              {category.title}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory.key}
          id={`${tablistId}-panel-${selectedCategory.key}`}
          role="tabpanel"
          aria-labelledby={`${tablistId}-${selectedCategory.key}`}
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 gap-5 lg:grid-cols-[0.75fr_1.45fr]"
        >
          <div className="surface-card flex flex-col justify-center p-5 text-left md:p-6">
            <p className="mb-2 font-mono text-[10px] tracking-[0.18em] text-[rgba(184,134,11,0.85)] uppercase">
              Current capability
            </p>

            <h3 className="font-display text-lg tracking-[0.1em] text-[var(--gold)] uppercase md:text-xl">
              {selectedCategory.title}
            </h3>

            <p className="mt-2 text-sm font-medium text-[var(--text-primary)]">
              {selectedCategory.subtitle}
            </p>

            <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
              {selectedCategory.description}
            </p>

            <ul className="mt-4 space-y-2">
              {selectedCategory.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-2.5 text-sm text-[var(--text-muted)]"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="surface-card p-5 md:p-6">
            <div>
              <p className="mb-3 font-mono text-[10px] tracking-[0.16em] text-[var(--gold)] uppercase">
                Core strengths
              </p>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
                {coreItems.map((item) => (
                  <div
                    key={`${selectedCategory.key}-core-${item.name}`}
                    className="flex h-[5.5rem] flex-col items-center justify-center rounded-[var(--radius-sm)] border border-[rgba(184,134,11,0.22)] bg-[rgba(184,134,11,0.08)] px-2.5 py-2.5 text-[var(--gold)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-gold)] hover:bg-[rgba(184,134,11,0.14)] hover:shadow-[var(--shadow-card)]"
                  >
                    <div className="mb-1.5 flex h-6 items-center justify-center [&_svg]:h-5 [&_svg]:w-5">
                      {item.icon}
                    </div>
                    <span className="text-center text-[10px] font-medium tracking-[0.03em] text-[var(--text-primary)] uppercase">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {additionalItems.length > 0 ? (
              <div className="mt-5">
                <p className="mb-3 font-mono text-[10px] tracking-[0.16em] text-[var(--text-muted)] uppercase">
                  Working knowledge
                </p>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
                  {additionalItems.map((item) => (
                    <div
                      key={`${selectedCategory.key}-extra-${item.name}`}
                      className="flex h-[5.5rem] flex-col items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-white/[0.03] px-2.5 py-2.5 text-[var(--text-muted)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-gold)] hover:text-[var(--gold)]"
                    >
                      <div className="mb-1.5 flex h-6 items-center justify-center opacity-85 [&_svg]:h-5 [&_svg]:w-5">
                        {item.icon}
                      </div>
                      <span className="text-center text-[10px] font-medium tracking-[0.03em] uppercase">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
