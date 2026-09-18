"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { FaHandshake } from "react-icons/fa";
import { scrollToHash } from "@/lib/scroll";

// Sections the badge should get out of the way of: the hero (its tech
// marquee sits low enough on mobile to collide with a bottom-anchored badge
// on first load) and Contact (so it never sits on the form or footer).
const AVOID_SECTION_IDS = ["home", "contact"];

/**
 * Persistent floating "open to opportunities" badge. Fixed bottom-right,
 * fades in shortly after load, and hides itself while the Hero or Contact
 * sections are in view so it never sits on top of their own content.
 */
export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [obscured, setObscured] = useState(false);
  const pathname = usePathname();
  const isPortfolio = pathname?.startsWith("/portfolio") ?? false;
  const reducedMotion = useReducedMotion();

  // Small entrance delay so it doesn't compete with the hero on first paint.
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

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

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isPortfolio) {
      event.preventDefault();
      scrollToHash("contact");
      window.history.replaceState(null, "", "/#contact");
    }
  };

  const shown = visible && !obscured;

  return (
    <motion.div
      initial={false}
      animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : 16 }}
      transition={{ duration: reducedMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: shown ? "auto" : "none" }}
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 sm:right-6 sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))]"
    >
      <Link
        href="/#contact"
        onClick={handleClick}
        aria-hidden={shown ? undefined : true}
        tabIndex={shown ? undefined : -1}
        aria-label="Open to opportunities — jump to contact"
        className="focus-ring group relative inline-flex min-h-12 items-center gap-2 rounded-full border border-[var(--gold)] bg-[rgba(184,134,11,0.16)] px-4 py-3 text-xs font-semibold tracking-[0.08em] text-[var(--gold)] uppercase shadow-[var(--shadow-gold)] backdrop-blur-md transition-all duration-200 hover:bg-[rgba(184,134,11,0.28)] hover:text-[var(--gold-hover)] hover:-translate-y-0.5 sm:px-5 sm:text-sm"
      >
        {!reducedMotion && <span className="cta-badge-pulse" aria-hidden="true" />}
        <FaHandshake className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
        <span className="sm:hidden">Let&apos;s talk</span>
        <span className="hidden sm:inline">Open to opportunities</span>
      </Link>
    </motion.div>
  );
}
