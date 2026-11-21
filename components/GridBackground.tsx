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

    // The spotlight lives in the Hero only. Elsewhere (and on routes with no
    // Hero) nothing is attached; the pointermove/rAF work runs only while the
    // pointer is inside the Hero.
    const hero = document.getElementById("home");
    if (!hero) return;

    let frame = 0;
    let last = 0;
    let active = false; // pointermove listener attached
    let visible = false; // spotlight showing
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

    const inHero = (clientX: number, clientY: number) => {
      const r = hero.getBoundingClientRect();
      return (
        clientX >= r.left &&
        clientX <= r.right &&
        clientY >= r.top &&
        clientY <= r.bottom
      );
    };

    const onPointerMove = (event: PointerEvent) => {
      // Hero scrolled away under a stationary pointer: stop as soon as we see it.
      if (!inHero(event.clientX, event.clientY)) {
        deactivate();
        return;
      }
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

    const activate = () => {
      if (active) return;
      active = true;
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    };

    const deactivate = () => {
      if (active) {
        active = false;
        window.removeEventListener("pointermove", onPointerMove);
      }
      cancelAnimationFrame(frame);
      frame = 0;
      visible = false;
      el.dataset.spotlight = "off";
    };

    const onHeroEnter = () => activate();
    const onHeroLeave = () => deactivate();

    // Hero fully scrolled out of view: hide even if the pointer hasn't moved.
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) deactivate();
    });
    observer.observe(hero);

    hero.addEventListener("pointerenter", onHeroEnter);
    hero.addEventListener("pointerleave", onHeroLeave);
    window.addEventListener("blur", deactivate);
    const onVisibility = () => {
      if (document.hidden) deactivate();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      hero.removeEventListener("pointerenter", onHeroEnter);
      hero.removeEventListener("pointerleave", onHeroLeave);
      window.removeEventListener("blur", deactivate);
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
      deactivate();
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
