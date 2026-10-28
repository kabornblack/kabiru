"use client";

import { useEffect, useRef } from "react";

/** Share of the remaining distance the spotlight covers per 60fps frame. */
const EASE = 0.18;
/** Closer than this (px) to the cursor, the spotlight snaps and the loop stops. */
const SETTLE = 0.5;

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
    let last = 0;
    let visible = false;
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;

    // CSS variables are written straight onto the element so mouse movement
    // never triggers a React re-render.
    const write = () => {
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };

    // Glides toward the cursor, frame-rate independent; stops once settled.
    const tick = (now: number) => {
      const steps = last ? (now - last) / (1000 / 60) : 1;
      last = now;
      const k = 1 - Math.pow(1 - EASE, steps);
      x += (targetX - x) * k;
      y += (targetY - y) * k;

      if (Math.abs(targetX - x) < SETTLE && Math.abs(targetY - y) < SETTLE) {
        x = targetX;
        y = targetY;
        frame = 0;
      } else {
        frame = requestAnimationFrame(tick);
      }
      write();
    };

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      // Coming back from hidden: appear at the cursor, then fade in.
      if (!visible) {
        visible = true;
        cancelAnimationFrame(frame);
        frame = 0;
        x = targetX;
        y = targetY;
        write();
        el.dataset.spotlight = "on";
        return;
      }

      if (!frame) {
        last = 0;
        frame = requestAnimationFrame(tick);
      }
    };

    const hide = () => {
      visible = false;
      el.dataset.spotlight = "off";
    };

    const onPointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) hide();
    };

    const onVisibility = () => {
      if (document.hidden) hide();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerout", onPointerOut);
    window.addEventListener("blur", hide);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("blur", hide);
      document.removeEventListener("visibilitychange", onVisibility);
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
