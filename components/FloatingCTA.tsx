"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { scrollToHash } from "@/lib/scroll";
import ScrambleText from "./ScrambleText";

// Sections the badge should get out of the way of: the hero (its tech
// marquee sits low enough on mobile to collide with a bottom-anchored badge
// on first load) and Contact (so it never sits on the form or footer).
const AVOID_SECTION_IDS = ["home", "contact"];

const DISMISS_KEY = "cta_dismissed";
// Set before navigating from /portfolio so the home page can focus the form.
const FOCUS_KEY = "cta_focus_contact";
const COLLAPSE_AFTER_MS = 6000;
const SCROLL_GRACE_MS = 1500;

const readSession = (key: string) => {
  try {
    return sessionStorage.getItem(key) === "1";
  } catch {
    return false;
  }
};

const writeSession = (key: string, value: string | null) => {
  try {
    if (value === null) sessionStorage.removeItem(key);
    else sessionStorage.setItem(key, value);
  } catch {
    // sessionStorage can throw in private/locked-down contexts; the badge
    // simply won't remember the choice there.
  }
};

/**
 * Focus the contact form's Name field once the smooth scroll has settled.
 * Skipped on touch devices so the on-screen keyboard doesn't pop up.
 */
const focusContactNameAfterScroll = () => {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const container = document.getElementById("page-scroll-container");
  let last = -1;
  let stableFrames = 0;
  const started = performance.now();

  const tick = () => {
    const input = document.getElementById("contact-name");
    const top = container?.scrollTop ?? window.scrollY;
    stableFrames = top === last ? stableFrames + 1 : 0;
    last = top;

    if (input && (stableFrames >= 6 || performance.now() - started > 2500)) {
      input.focus({ preventScroll: true });
      return;
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

/**
 * Persistent floating "open to opportunities" chip. Fixed bottom-right,
 * fades in shortly after load, collapses to a status dot after a few seconds
 * or the first scroll, and hides while the Hero or Contact sections are in
 * view so it never sits on top of their own content.
 */
export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [obscured, setObscured] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const pathname = usePathname();
  const isPortfolio = pathname?.startsWith("/portfolio") ?? false;
  const reducedMotion = useReducedMotion();
  const shown = visible && !obscured;

  useEffect(() => {
    setDismissed(readSession(DISMISS_KEY));
    // Phones start compact so the chip never covers content.
    setCollapsed(window.matchMedia("(max-width: 639px)").matches);
  }, []);

  // Small entrance delay so it doesn't compete with the hero on first paint.
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  // Collapse after a few seconds or on the first scroll, whichever is first —
  // counted from when the chip is actually on screen, since it starts hidden
  // behind the Hero on the home page. The scroll that reveals it doesn't
  // count, so scrolling only collapses it after a short grace period.
  useEffect(() => {
    if (collapsed || !shown) return;
    const collapse = () => setCollapsed(true);
    const timer = window.setTimeout(collapse, COLLAPSE_AFTER_MS);
    let armed = false;
    const arm = window.setTimeout(() => {
      armed = true;
    }, SCROLL_GRACE_MS);
    const onScroll = () => {
      if (armed) collapse();
    };
    const container = document.getElementById("page-scroll-container");
    const target: HTMLElement | Window = container || window;
    target.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(arm);
      target.removeEventListener("scroll", onScroll);
    };
  }, [collapsed, shown]);

  useEffect(() => {
    if (isPortfolio || typeof IntersectionObserver === "undefined") return;

    const targets = AVOID_SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (targets.length === 0) return;

    const intersecting = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) intersecting.add(entry.target);
          else intersecting.delete(entry.target);
        });
        setObscured(intersecting.size > 0);
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [isPortfolio]);

  // Arrived on the home page from /portfolio via the chip: focus the form.
  useEffect(() => {
    if (isPortfolio || !readSession(FOCUS_KEY)) return;
    writeSession(FOCUS_KEY, null);
    focusContactNameAfterScroll();
  }, [isPortfolio]);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (isPortfolio) {
      // Let the link navigate to /#contact as the Header links do.
      writeSession(FOCUS_KEY, "1");
      return;
    }
    event.preventDefault();
    scrollToHash("contact");
    window.history.replaceState(null, "", "/#contact");
    focusContactNameAfterScroll();
  };

  const dismiss = () => {
    writeSession(DISMISS_KEY, "1");
    setDismissed(true);
  };

  if (dismissed) return null;

  const expanded = !collapsed || engaged;

  return (
    <motion.div
      initial={false}
      animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : 16 }}
      transition={{ duration: reducedMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: shown ? "auto" : "none" }}
      aria-hidden={shown ? undefined : true}
      onMouseEnter={() => setEngaged(true)}
      onMouseLeave={() => setEngaged(false)}
      onFocus={() => setEngaged(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setEngaged(false);
      }}
      data-expanded={expanded}
      className="cta-chip fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex items-center rounded-full sm:right-[max(1.5rem,env(safe-area-inset-right))] sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))]"
    >
      <Link
        href="/#contact"
        onClick={handleClick}
        tabIndex={shown ? undefined : -1}
        aria-label="Open to opportunities, contact me"
        className="focus-ring flex min-h-11 min-w-11 items-center justify-center rounded-full font-mono text-[13px] text-[var(--text-primary)]"
      >
        <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
          {!reducedMotion && <span className="cta-dot-pulse" />}
          <span className="relative h-2.5 w-2.5 rounded-full bg-[var(--gold)]" />
        </span>
        <span className="cta-label" aria-hidden="true">
          <ScrambleText text="Open to opportunities" />
        </span>
      </Link>
      <button
        type="button"
        onClick={dismiss}
        tabIndex={shown ? undefined : -1}
        aria-label="Dismiss"
        className="focus-ring -ml-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-mono text-[15px] text-[var(--text-muted)] transition-colors hover:text-[var(--gold)]"
      >
        <span aria-hidden="true">×</span>
      </button>
    </motion.div>
  );
}
