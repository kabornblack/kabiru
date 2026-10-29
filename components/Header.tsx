"use client";

import Link from "next/link";
import React, { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import Socials from "./Socials";
import KsLogo from "./KsLogo";
import { ACTIVE_SECTION_OFFSET, scrollToHash } from "@/lib/scroll";
import ScrambleText from "@/components/ScrambleText";

type NavLink = {
  label: string;
  href: string;
  match?: "portfolio" | "hash";
  hash?: string;
};

const navLinks: NavLink[] = [
  { label: "About", href: "/#about", match: "hash", hash: "about" },
  { label: "Skills", href: "/#skills", match: "hash", hash: "skills" },
  { label: "Projects", href: "/portfolio", match: "portfolio" },
  { label: "Design", href: "/#design", match: "hash", hash: "design" },
  {
    label: "AI Engineering",
    href: "/#ai-engineering",
    match: "hash",
    hash: "ai-engineering",
  },
];

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/* Outlined gold: the Hero's Contact Me is the filled primary. */
const contactButtonClass =
  "focus-ring inline-flex min-h-11 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--gold)] px-4 text-xs font-semibold tracking-[0.14em] text-[var(--gold)] uppercase transition-colors duration-200 hover:bg-[color-mix(in_srgb,var(--gold)_12%,transparent)] hover:text-[var(--gold-hover)]";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("home");
  const menuId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();
  const isPortfolio = pathname?.startsWith("/portfolio") ?? false;
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const scrollContainer = document.getElementById("page-scroll-container");
    const target: HTMLElement | Window = scrollContainer || window;

    let lastScrollY =
      scrollContainer?.scrollTop ||
      window.scrollY ||
      document.documentElement.scrollTop ||
      0;

    const getCurrentScrollY = () =>
      scrollContainer?.scrollTop || window.scrollY || 0;

    const getMaxScrollY = () =>
      scrollContainer
        ? scrollContainer.scrollHeight - scrollContainer.clientHeight
        : document.documentElement.scrollHeight - window.innerHeight;

    const updateActiveSection = () => {
      if (isPortfolio) return;

      // "home", "projects" and "contact" have no nav link but stay listed:
      // scrolling into them clears the previous section's highlight.
      const sections = [
        "home",
        "about",
        "skills",
        "projects",
        "design",
        "ai-engineering",
        "contact",
      ];
      const scrollY = getCurrentScrollY();
      let current = "home";

      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop - ACTIVE_SECTION_OFFSET;
        if (scrollY >= top) current = id;
      }

      // Contact is too short to reach the line; at the bottom it is current.
      if (scrollY > 0 && scrollY >= getMaxScrollY() - 2) current = "contact";

      setActiveHash(current);
    };

    const updateProgress = () => {
      const bar = progressRef.current;
      if (!bar) return;
      const max = getMaxScrollY();
      const ratio = max > 0 ? Math.min(1, getCurrentScrollY() / max) : 0;
      bar.style.transform = `scaleX(${ratio})`;
    };

    const handleScroll = () => {
      const currentScrollY = getCurrentScrollY();
      setScrolled(currentScrollY > 20);

      if (currentScrollY < 80) {
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY) {
        // Keyboard focus inside the header keeps it on screen.
        if (!headerRef.current?.querySelector(":focus-visible")) setShowHeader(false);
        setIsMenuOpen(false);
      } else {
        setShowHeader(true);
      }

      lastScrollY = currentScrollY;
      updateActiveSection();
      updateProgress();
    };

    updateActiveSection();
    updateProgress();
    target.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      target.removeEventListener("scroll", handleScroll);
    };
  }, [isPortfolio]);

  // Arriving on /#section from /portfolio, Next scrolls the section flush to
  // the top, under the header; land it like an in-page click instead.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (isPortfolio || !hash) return;
    const frame = requestAnimationFrame(() => scrollToHash(hash));
    return () => cancelAnimationFrame(frame);
  }, [isPortfolio]);

  const closeMenu = () => {
    setIsMenuOpen(false);
    menuButtonRef.current?.focus({ preventScroll: true });
  };

  // While the menu is open: Escape closes it, Tab stays inside the header,
  // the page behind does not scroll, and widening to the desktop nav closes it.
  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !headerRef.current) return;

      const focusables = Array.from(
        headerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => !el.hasAttribute("data-skip-link") && el.getClientRects().length > 0);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const current = document.activeElement as HTMLElement | null;
      const inside = current ? focusables.includes(current) : false;

      if (event.shiftKey && (current === first || !inside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (current === last || !inside)) {
        event.preventDefault();
        first.focus();
      }
    };

    const scroller =
      document.getElementById("page-scroll-container") ?? document.documentElement;
    const previousOverflow = scroller.style.overflow;
    const previousGutter = scroller.style.scrollbarGutter;
    scroller.style.overflow = "hidden";
    if (scroller === document.documentElement) scroller.style.scrollbarGutter = "stable";

    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = () => {
      if (desktop.matches) setIsMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktop);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
      scroller.style.overflow = previousOverflow;
      scroller.style.scrollbarGutter = previousGutter;
    };
  }, [isMenuOpen]);

  const isActive = (link: NavLink) => {
    if (link.match === "portfolio") return isPortfolio;
    if (isPortfolio) return false;
    return activeHash === link.hash;
  };

  // /portfolio is a page; the rest are positions within the home page.
  const ariaCurrent = (link: NavLink) =>
    isActive(link) ? (link.match === "portfolio" ? "page" : "location") : undefined;

  /** On the home page, hash links scroll in place; from /portfolio they navigate. */
  const goToHash = (event: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (isMenuOpen) closeMenu();
    if (isPortfolio) return;

    event.preventDefault();
    scrollToHash(hash);
    setActiveHash(hash);
    window.history.replaceState(null, "", hash === "home" ? "/" : `/#${hash}`);
  };

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    link: NavLink,
  ) => {
    if (link.hash) {
      goToHash(event, link.hash);
    } else if (isMenuOpen) {
      closeMenu();
    }
  };

  // The main content gets focus (and, on the home page, keyboard scrolling).
  const skipToContent = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const main = document.querySelector("main");
    if (!main) return;
    event.preventDefault();
    if (!main.hasAttribute("tabindex")) main.setAttribute("tabindex", "-1");
    main.focus();
  };

  const logo = (
    <Link
      href="/"
      aria-label="Home"
      onClick={(event) => goToHash(event, "home")}
      className="focus-ring hit-target inline-flex shrink-0 rounded-lg transition-shadow duration-300 hover:shadow-[0_0_0_1px_color-mix(in_srgb,var(--gold)_40%,transparent),0_0_18px_color-mix(in_srgb,var(--gold)_30%,transparent)]"
    >
      <KsLogo size={38} className="block" />
    </Link>
  );

  // h-17 here is HEADER_HEIGHT (68px) in lib/scroll.ts; keep them in sync.
  return (
    <motion.header
      ref={headerRef}
      initial={false}
      animate={{ y: showHeader ? 0 : "-100%" }}
      transition={{ duration: reducedMotion ? 0 : 0.3, ease: "easeInOut" }}
      // Keyboard focus entering a hidden header brings it back.
      onFocusCapture={() => setShowHeader(true)}
      className={[
        "fixed top-0 left-0 z-50 h-17 w-full border-b transition-colors duration-300",
        scrolled
          ? "border-[var(--border-subtle)] bg-black/80 backdrop-blur-xl shadow-lg"
          : "border-white/5 bg-gradient-to-br from-white/10 to-[var(--page-bg)]",
      ].join(" ")}
    >
      <a
        href="#main-content"
        data-skip-link
        onClick={skipToContent}
        // .btn-primary's look on an opaque fill, so the logo can't show through.
        className="focus-ring sr-only items-center rounded-[var(--radius-sm)] border border-[var(--gold)] bg-[color-mix(in_srgb,var(--gold)_16%,var(--page-bg))] px-6 text-xs font-semibold tracking-[0.14em] text-[var(--gold)] uppercase focus:not-sr-only focus:absolute focus:top-2.5 focus:left-4 focus:z-[60] focus:inline-flex focus:min-h-12"
      >
        Skip to content
      </a>

      <div className="relative mx-auto flex h-17 max-w-7xl items-center gap-8 px-4 sm:px-6 xl:gap-10">
        {logo}

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link);

              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    aria-current={ariaCurrent(link)}
                    onClick={(event) => handleNavClick(event, link)}
                    className={[
                      "focus-ring group relative inline-flex h-11 items-center rounded-[var(--radius-sm)] px-3 text-xs font-semibold tracking-[0.12em] uppercase transition-colors duration-200",
                      active
                        ? "text-[var(--gold)]"
                        : "text-[var(--text-muted)] hover:text-[var(--gold)]",
                    ].join(" ")}
                  >
                    {link.label}
                    <span
                      className={[
                        "absolute right-3 bottom-1.5 left-3 h-0.5 origin-center bg-[var(--gold)] transition-transform duration-300",
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50",
                      ].join(" ")}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto hidden items-center gap-5 lg:flex">
          <Link
            href="/#contact"
            onClick={(event) => goToHash(event, "contact")}
            className={contactButtonClass}
          >
            <ScrambleText text="Contact" />
          </Link>
          <Socials />
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="focus-ring -mr-2 ml-auto flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-muted)] transition-colors hover:text-[var(--gold)] lg:hidden"
          aria-expanded={isMenuOpen}
          aria-controls={isMenuOpen ? menuId : undefined}
          aria-label="Navigation menu"
        >
          {isMenuOpen ? (
            <FaTimes className="h-6 w-6" aria-hidden="true" />
          ) : (
            <FaBars className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            className="absolute top-full left-0 h-[calc(100dvh-100%)] w-full lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60"
              onClick={closeMenu}
              aria-hidden="true"
            />
            <motion.div
              id={menuId}
              initial={{ y: reducedMotion ? 0 : -8 }}
              animate={{ y: 0 }}
              exit={{ y: reducedMotion ? 0 : -8 }}
              transition={{ duration: reducedMotion ? 0 : 0.2 }}
              className="relative max-h-full overflow-y-auto border-b border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-4 pt-3 pb-5 shadow-2xl sm:px-6"
            >
              <nav aria-label="Mobile primary">
                <ul className="flex flex-col gap-1">
                  {navLinks.map((link) => {
                    const active = isActive(link);

                    return (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          onClick={(event) => handleNavClick(event, link)}
                          aria-current={ariaCurrent(link)}
                          className={[
                            "focus-ring flex min-h-12 items-center rounded-md px-3 text-sm font-semibold tracking-[0.12em] uppercase transition-colors",
                            active
                              ? "bg-[color-mix(in_srgb,var(--gold)_12%,transparent)] text-[var(--gold)]"
                              : "text-[var(--text-muted)] hover:bg-white/5 hover:text-[var(--gold)]",
                          ].join(" ")}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-subtle)] pt-4">
                <Link
                  href="/#contact"
                  onClick={(event) => goToHash(event, "contact")}
                  className={`${contactButtonClass} min-h-12 flex-1 sm:flex-none sm:px-8`}
                >
                  <ScrambleText text="Contact" />
                </Link>
                <Socials />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <span
        ref={progressRef}
        className="pointer-events-none absolute right-0 -bottom-px left-0 h-0.5 origin-left [transform:scaleX(0)] bg-[var(--gold)] opacity-80 motion-reduce:hidden"
        aria-hidden="true"
      />
    </motion.header>
  );
}

export default Header;
