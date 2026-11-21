"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type SectionHeadingProps = {
  /** The section title, animated in as a single element. */
  text: string;
  /** Visually hidden heading id for aria-labelledby on the parent <section>. */
  headingId?: string;
  /**
   * Heading level for the visually-hidden text node. Defaults to "h2" for
   * sections within the single-page home route (which owns the page's one
   * <h1>). Pass "h1" when this is a standalone route's primary heading
   * (e.g. /portfolio) so the page still has exactly one <h1>.
   */
  headingLevel?: "h1" | "h2";
};

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

/*
 * Wing paths in a 56 × 28 box. The tips point toward the title so the two
 * rules enclose it. Top rule: hairline at y=0, tips below. Bottom rule:
 * hairline at y=28, tips above. `base` is the end that joins the
 * hairline (gradient start), `tip` the vanishing end.
 */
const WINGS: Record<
  Corner,
  { d: string; base: [number, number]; tip: [number, number] }
> = {
  "top-left": { d: "M 0 28 L 56 0", base: [56, 0], tip: [0, 28] },
  "top-right": { d: "M 0 0 L 56 28", base: [0, 0], tip: [56, 28] },
  "bottom-left": { d: "M 0 0 L 56 28", base: [56, 28], tip: [0, 0] },
  "bottom-right": { d: "M 0 28 L 56 0", base: [0, 28], tip: [56, 0] },
};

/**
 * One angled wing: an SVG whose 1px non-scaling stroke fades from the
 * hairline colour to gold, then dissolves to nothing at the tip.
 */
function Wing({ corner, gradientId }: { corner: Corner; gradientId: string }) {
  const { d, base, tip } = WINGS[corner];
  const id = `${gradientId}-${corner}`;

  return (
    <svg
      className="frame-wing"
      viewBox="0 0 56 28"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          x1={base[0]}
          y1={base[1]}
          x2={tip[0]}
          y2={tip[1]}
        >
          <stop offset="0" className="frame-wing-base" />
          <stop offset="0.35" className="frame-wing-tip" stopOpacity={0.85} />
          <stop offset="0.7" className="frame-wing-tip" stopOpacity={0.35} />
          <stop offset="1" className="frame-wing-tip" stopOpacity={0} />
        </linearGradient>
      </defs>
      <path
        d={d}
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth={1}
        strokeLinecap="butt"
        vectorEffect="non-scaling-stroke"
        shapeRendering="geometricPrecision"
      />
    </svg>
  );
}

/**
 * Section heading unit: top eave rule, title, bottom eave rule, all
 * shell-wide. Both rules draw from the centre as the unit scrolls into view;
 * the title, a single element, fades up 80ms behind them.
 */
export default function SectionHeading({
  text,
  headingId,
  headingLevel = "h2",
}: SectionHeadingProps) {
  const HeadingTag = headingLevel;
  const unitRef = useRef<HTMLDivElement | null>(null);
  const [drawn, setDrawn] = useState(false);
  const reducedMotion = useReducedMotion();
  // useId can contain ":" or "«»", which break url(#id) references.
  const gradientId = `frm${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  // The unit counts as drawn once its top edge enters the viewport. Both rules
  // then draw from the centre and the title fades up just behind them (CSS).
  useEffect(() => {
    let frameId = 0;

    const update = () => {
      frameId = 0;
      if (!unitRef.current) return;
      setDrawn(
        reducedMotion ||
          unitRef.current.getBoundingClientRect().top < window.innerHeight,
      );
    };

    const schedule = () => {
      if (!frameId) frameId = requestAnimationFrame(update);
    };

    const scrollContainer = document.getElementById("page-scroll-container");

    update();

    window.addEventListener("resize", schedule);
    window.addEventListener("scroll", schedule, { passive: true });
    scrollContainer?.addEventListener("scroll", schedule, { passive: true });

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("scroll", schedule);
      scrollContainer?.removeEventListener("scroll", schedule);
    };
  }, [reducedMotion]);

  return (
    <div ref={unitRef} className="frame" data-drawn={drawn}>
      <HeadingTag id={headingId} className="sr-only">
        {text}
      </HeadingTag>

      <div className="frame-rule frame-rule--top" aria-hidden="true">
        <Wing corner="top-left" gradientId={gradientId} />
        <span className="frame-line" />
        <Wing corner="top-right" gradientId={gradientId} />
      </div>

      {/* One node: letter-spacing is final for the whole animation. */}
      <div className="frame-title" aria-hidden="true">
        <span className="frame-title-text">{text}</span>
      </div>

      <div className="frame-rule frame-rule--bottom" aria-hidden="true">
        <Wing corner="bottom-left" gradientId={gradientId} />
        <span className="frame-line" />
        <Wing corner="bottom-right" gradientId={gradientId} />
        <span className="frame-mark" />
      </div>
    </div>
  );
}
