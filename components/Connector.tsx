"use client";

import { CSSProperties, useEffect, useRef } from "react";

/**
 * Gold connector lines between the floating code windows. The SVG variants
 * are desktop-only (`lg`); `StackedConnector` stands in for them below `lg`.
 * `className` positions the connector against its parent.
 *
 * Each connector carries a faint "ghost" of its node that travels from the
 * headline end to the panel end once per cycle while the connector is on
 * screen. Timing lives in globals.css (--ghost-*); motion is transform +
 * opacity only, set up once with the Web Animations API (no per-frame JS),
 * and skipped entirely for prefers-reduced-motion.
 */

type Point = readonly [x: number, y: number];

type GhostProps = {
  /** Position in its section, so neighbouring ghosts don't pulse in unison. */
  stagger?: number;
};

type ConnectorProps = GhostProps & {
  className: string;
  style?: CSSProperties;
} & (
    | {
        /** Straight line with a node at each end, e.g. headline → panel. */
        variant: "horizontal" | "vertical";
        /** Width (horizontal) or height (vertical) in px. */
        length: number;
        /** Which end the ghost leaves from: the headline (or explorer) end. */
        ghostFrom?: "start" | "end";
      }
    | {
        /** Panel → panel elbow off the panel's right or left edge. */
        variant: "elbow-right" | "elbow-left";
      }
  );

/* ---- Ghost animation -------------------------------------------------- */

// One observer for every ghost on the page.
const visibilityCallbacks = new Map<Element, (visible: boolean) => void>();
let sharedObserver: IntersectionObserver | null = null;

const observeVisibility = (el: Element, onChange: (visible: boolean) => void) => {
  sharedObserver ??= new IntersectionObserver((entries) => {
    for (const entry of entries) {
      visibilityCallbacks.get(entry.target)?.(entry.isIntersecting);
    }
  });
  visibilityCallbacks.set(el, onChange);
  sharedObserver.observe(el);
  return () => {
    sharedObserver?.unobserve(el);
    visibilityCallbacks.delete(el);
  };
};

/** Reads a CSS time ("5s" / "400ms") or number custom property from :root. */
const readVar = (name: string, fallback: number) => {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const value = parseFloat(raw);
  if (Number.isNaN(value)) return fallback;
  return raw.endsWith("ms") ? value / 1000 : value;
};

const translate = ([x, y]: Point) => `translate(${x}px, ${y}px)`;

/**
 * Builds the two looping animations for a ghost travelling along `path`
 * (offsets from its start, in px): movement (eased over the travel time,
 * easing in on the first leg and out on the last so speed stays continuous
 * at a corner) and the fade (in over the first 15%, out over the last 25%).
 */
const createGhostAnimations = (el: HTMLElement, path: readonly Point[], stagger: number) => {
  const cycle = readVar("--ghost-cycle", 5);
  const travel = Math.min(readVar("--ghost-travel", 1.6), cycle);
  const peak = readVar("--ghost-opacity", 0.35);
  const share = travel / cycle;

  const lengths = path.slice(1).map(([x, y], i) => Math.hypot(x - path[i][0], y - path[i][1]));
  const total = lengths.reduce((sum, length) => sum + length, 0);

  let covered = 0;
  const movement: Keyframe[] = path.map((point, i) => {
    const offset = (covered / total) * share;
    covered += lengths[i] ?? 0;
    const last = i === path.length - 1;
    const easing =
      path.length === 2 ? "ease-in-out" : i === 0 ? "ease-in" : i === path.length - 2 ? "ease-out" : "linear";
    return last ? { offset, transform: translate(point) } : { offset, transform: translate(point), easing };
  });
  movement.push({ offset: 1, transform: translate(path[path.length - 1]) });

  const fade: Keyframe[] = [
    { offset: 0, opacity: 0 },
    { offset: 0.15 * share, opacity: peak },
    { offset: 0.75 * share, opacity: peak },
    { offset: share, opacity: 0 },
    { offset: 1, opacity: 0 },
  ];

  const timing: KeyframeAnimationOptions = {
    duration: cycle * 1000,
    iterations: Infinity,
    delay: stagger * readVar("--ghost-stagger", 0.4) * 1000,
  };
  return [el.animate(movement, timing), el.animate(fade, timing)];
};

/**
 * Runs the ghost while its connector is on screen. Paused animations keep
 * their place, so scrolling away and back (or re-rendering) never replays
 * them; hidden connectors (display: none) never start one.
 */
function useGhost(path: readonly Point[], stagger: number) {
  const ghostRef = useRef<HTMLSpanElement>(null);
  const pathKey = path.map((point) => point.join(",")).join(" ");

  useEffect(() => {
    const ghost = ghostRef.current;
    const box = ghost?.parentElement;
    if (!ghost || !box) return;

    const points = pathKey.split(" ").map((point) => point.split(",").map(Number) as unknown as Point);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animations: Animation[] = [];
    let visible = false;

    const play = () => {
      if (reducedMotion.matches) return;
      if (animations.length === 0) animations = createGhostAnimations(ghost, points, stagger);
      ghost.style.willChange = "transform, opacity";
      animations.forEach((animation) => animation.play());
    };
    const pause = () => {
      animations.forEach((animation) => animation.pause());
      ghost.style.willChange = "";
    };
    const stop = () => {
      animations.forEach((animation) => animation.cancel());
      animations = [];
      ghost.style.willChange = "";
    };

    const unobserve = observeVisibility(box, (isVisible) => {
      visible = isVisible;
      if (isVisible) play();
      else pause();
    });
    const onMotionPreference = () => {
      if (reducedMotion.matches) stop();
      else if (visible) play();
    };
    reducedMotion.addEventListener("change", onMotionPreference);

    return () => {
      unobserve();
      reducedMotion.removeEventListener("change", onMotionPreference);
      stop();
    };
  }, [pathKey, stagger]);

  return ghostRef;
}

/** The ghost dot, centred on `start` (px from the box's top-left). */
const Ghost = ({
  ghostRef,
  start,
  size,
}: {
  ghostRef: React.RefObject<HTMLSpanElement | null>;
  start: Point;
  size: number;
}) => (
  <span
    ref={ghostRef}
    className="connector-ghost"
    style={{ left: start[0] - size / 2, top: start[1] - size / 2, width: size, height: size }}
  />
);

/* ---- Connectors ------------------------------------------------------- */

/** Relative path for the ghost: start point plus offsets of each later point. */
const relative = (points: readonly Point[]) =>
  points.map(([x, y]) => [x - points[0][0], y - points[0][1]] as const);

export default function Connector(props: ConnectorProps) {
  const { className, style, stagger = 0 } = props;

  let width: number;
  let height: number;
  let svg: React.ReactNode;
  let route: Point[];

  if (props.variant === "horizontal" || props.variant === "vertical") {
    const { length, ghostFrom = "start" } = props;
    const horizontal = props.variant === "horizontal";
    const a: Point = horizontal ? [3, 4] : [4, 3];
    const b: Point = horizontal ? [length - 3, 4] : [4, length - 3];
    width = horizontal ? length : 8;
    height = horizontal ? 8 : length;
    route = ghostFrom === "start" ? [a, b] : [b, a];
    svg = (
      <>
        <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />
        <circle cx={a[0]} cy={a[1]} r="3" />
        <circle cx={b[0]} cy={b[1]} r="3" />
      </>
    );
  } else {
    // Elbows run down from the upper panel, then across to the lower one.
    const right = props.variant === "elbow-right";
    const top: Point = right ? [40, 0] : [4, 0];
    const corner: Point = right ? [40, 48] : [4, 48];
    const end: Point = right ? [0, 48] : [44, 48];
    width = 44;
    height = 52;
    route = [top, corner, end];
    svg = (
      <>
        <path d={right ? "M0 48 H40 V0" : "M44 48 H4 V0"} />
        <circle cx={end[0]} cy={end[1]} r="3" />
        <circle cx={corner[0]} cy={corner[1]} r="2" />
        <circle cx={top[0]} cy={top[1]} r="3" />
      </>
    );
  }

  const ghostRef = useGhost(relative(route), stagger);

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none hidden lg:block ${className}`}
      style={{ ...style, width, height }}
    >
      <svg
        className="code-connector block"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      >
        {svg}
      </svg>
      <Ghost ghostRef={ghostRef} start={route[0]} size={6} />
    </span>
  );
}

/** Short vertical line + node that stands in for the desktop connectors. */
export const StackedConnector = ({ stagger = 0 }: GhostProps) => {
  // Stem 32px, node 7px (overlapping the stem by 1px), stem 12px.
  const ghostRef = useGhost(
    [
      [0, 0],
      [0, 50],
    ],
    stagger,
  );

  // The ghost hangs off a zero-size positioned anchor at the top of the stem,
  // so the stem itself stays unpositioned and paints in its usual order.
  return (
    <div aria-hidden="true" className="flex flex-col items-start pl-6 lg:hidden">
      <span className="relative block h-0 w-0">
        <Ghost ghostRef={ghostRef} start={[0.5, 0]} size={7} />
      </span>
      <span className="code-connector-stem h-8 w-px" />
      <span className="code-node -mt-px -ml-[3px] h-[7px] w-[7px] rounded-full bg-[var(--gold)]" />
      <span className="code-connector-stem h-3 w-px" />
    </div>
  );
};
