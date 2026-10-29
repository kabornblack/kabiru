"use client";

import { ReactNode, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { hostOf } from "@/lib/url";

/** Shared pieces for the "floating code window" sections (About, Skills). */

export const CodeString = ({ children }: { children: string }) => (
  <span className="text-[var(--text-primary)]">&quot;{children}&quot;</span>
);

export const CodePunct = ({ children }: { children: ReactNode }) => (
  <span className="text-[var(--text-muted)]">{children}</span>
);

/** Inline array of strings, e.g. ["React", "TypeScript"]. */
export const CodeArray = ({ items }: { items: string[] }) => (
  <>
    <CodePunct>[</CodePunct>
    {items.map((item, index) => (
      <span key={item}>
        <CodeString>{item}</CodeString>
        {index < items.length - 1 && <CodePunct>, </CodePunct>}
      </span>
    ))}
    <CodePunct>]</CodePunct>
  </>
);

/**
 * Dark glass window with a dotted title bar. `title` is either a filename
 * (rendered as a muted label) or custom title-bar content such as file tabs.
 */
export const CodeWindow = ({
  title,
  className = "",
  bodyClassName = "",
  children,
}: {
  title: ReactNode;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
}) => (
  <div className={`code-window ${className}`}>
    <div className="flex items-center gap-2 bg-black/30 px-4 py-2.5">
      <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--gold)]" />
      <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[color-mix(in_srgb,var(--gold)_60%,transparent)]" />
      <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[color-mix(in_srgb,var(--gold)_30%,transparent)]" />
      {typeof title === "string" ? (
        <span className="ml-2 font-mono text-[13px] text-[var(--text-muted)]">
          {title}
        </span>
      ) : (
        title
      )}
    </div>
    <div
      className={`p-4 font-mono text-[13px] leading-relaxed break-words md:p-5 md:text-sm ${bodyClassName}`}
    >
      {children}
    </div>
  </div>
);

/** Browser-style address pill for a CodeWindow title bar, e.g. "stayloyal.xyz". */
export const HostPill = ({ url }: { url: string }) => (
  <span className="ml-2 min-w-0 truncate rounded-full bg-white/[0.05] px-3 py-0.5 font-mono text-[13px] text-[var(--text-muted)]">
    {hostOf(url)}
  </span>
);

export type CodeTab = {
  /** Visible file name, e.g. "frontend.ts". */
  file: string;
  /** Accessible name read before the file name. */
  name: string;
};

/** Panel id for a tab, so callers can wire up role="tabpanel". */
export const codeTabPanelId = (idPrefix: string, index: number) =>
  `${idPrefix}-panel-${index}`;
export const codeTabId = (idPrefix: string, index: number) =>
  `${idPrefix}-tab-${index}`;

/**
 * File-style tabs for a CodeWindow title bar. Left/Right move (and wrap),
 * Home/End jump; focus follows the selection.
 */
export const CodeTabs = ({
  label,
  tabs,
  activeIndex,
  onSelect,
  idPrefix,
  controls,
  tabClassName = "",
}: {
  label: string;
  tabs: CodeTab[];
  activeIndex: number;
  onSelect: (index: number) => void;
  idPrefix: string;
  /** Id of one shared panel (filter tabs); defaults to one panel per tab. */
  controls?: string;
  /** Extra classes per tab, e.g. a taller tap target. */
  tabClassName?: string;
}) => {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const last = tabs.length - 1;
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
    onSelect(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      className="tablist-fade code-tabs -my-1.5 ml-2 flex min-w-0 flex-1 overflow-x-auto py-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {tabs.map((tab, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={tab.file}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            id={codeTabId(idPrefix, index)}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={controls ?? codeTabPanelId(idPrefix, index)}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(index)}
            onKeyDown={onKeyDown}
            className={[
              `focus-ring code-tab hit-target shrink-0 cursor-pointer px-2 py-1.5 font-mono text-[13px] transition-colors duration-200 ${tabClassName}`,
              isActive
                ? "text-[var(--gold)] shadow-[inset_0_-2px_0_var(--gold)]"
                : "text-[var(--text-muted)] hover:text-[var(--gold)]",
            ].join(" ")}
          >
            <span className="sr-only">{tab.name}: </span>
            {tab.file}
          </button>
        );
      })}
    </div>
  );
};

/** Fade/slide-in on scroll; instant under prefers-reduced-motion. */
export function useReveal() {
  const reducedMotion = useReducedMotion();

  return (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    transition: {
      duration: reducedMotion ? 0 : 0.5,
      delay: reducedMotion ? 0 : delay,
    },
    viewport: { once: true, margin: "-60px" },
  });
}
