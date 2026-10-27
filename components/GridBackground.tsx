"use client";

import { useEffect, useRef } from "react";

export default function GridBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Spotlight is desktop-only and skipped for reduced motion; touch and
    // reduced-motion users get the static grid with no listeners attached.
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!finePointer || reducedMotion) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    // Write CSS variables straight onto the element so mouse movement never
    // triggers a React re-render; rAF caps updates at one per frame.
    const onPointerMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        el.style.setProperty("--mx", `${x}px`);
        el.style.setProperty("--my", `${y}px`);
        el.dataset.spotlight = "on";
      });
    };

    const onPointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) el.dataset.spotlight = "off";
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerout", onPointerOut);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerout", onPointerOut);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="grid-bg pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
    >
      <div className="grid-bg-glow" />
      <div className="grid-bg-lines" />
      <div className="grid-bg-spotlight" />
    </div>
  );
}
