"use client";

import Link from "next/link";
import React, { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaBars,
  FaBriefcase,
  FaChalkboardTeacher,
  FaEnvelope,
  FaHome,
  FaPalette,
  FaRobot,
  FaTimes,
  FaTools,
  FaUser,
} from "react-icons/fa";
import Socials from "./Socials";
import { scrollToHash } from "@/lib/scroll";

type NavLink = {
  label: string;
  href: string;
  icon: React.ElementType;
  match?: "home" | "portfolio" | "hash";
  hash?: string;
};

const navLinks: NavLink[] = [
  { label: "Home", href: "/#home", icon: FaHome, match: "home", hash: "home" },
  {
    label: "About",
    href: "/#about",
    icon: FaUser,
    match: "hash",
    hash: "about",
  },
  {
    label: "Skills",
    href: "/#skills",
    icon: FaTools,
    match: "hash",
    hash: "skills",
  },
  {
    label: "Projects",
    href: "/portfolio",
    icon: FaBriefcase,
    match: "portfolio",
  },
  {
    label: "Mentors",
    href: "/#mentors",
    icon: FaChalkboardTeacher,
    match: "hash",
    hash: "mentors",
  },
  {
    label: "Design",
    href: "/#design",
    icon: FaPalette,
    match: "hash",
    hash: "design",
  },
  {
    label: "AI Engineer",
    href: "/#ai-engineering",
    icon: FaRobot,
    match: "hash",
    hash: "ai-engineering",
  },
  {
    label: "Contact",
    href: "/#contact",
    icon: FaEnvelope,
    match: "hash",
    hash: "contact",
  },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("home");
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const isPortfolio = pathname?.startsWith("/portfolio") ?? false;

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

    const updateActiveSection = () => {
      if (isPortfolio) return;

      const sections = [
        "home",
        "about",
        "skills",
        "projects",
        "mentors",
        "design",
        "ai-engineering",
        "contact",
      ];
      const scrollY = getCurrentScrollY();
      let current = "home";

      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop - 120;
        if (scrollY >= top) current = id;
      }

      setActiveHash(current);
    };

    const handleScroll = () => {
      const currentScrollY = getCurrentScrollY();
      setScrolled(currentScrollY > 20);

      if (currentScrollY < 80) {
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY) {
        setShowHeader(false);
        setIsMenuOpen(false);
      } else {
        setShowHeader(true);
      }

      lastScrollY = currentScrollY;
      updateActiveSection();
    };

    updateActiveSection();
    target.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      target.removeEventListener("scroll", handleScroll);
    };
  }, [isPortfolio]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  const isActive = (link: NavLink) => {
    if (link.match === "portfolio") return isPortfolio;
    if (isPortfolio) return false;
    if (link.match === "home") return activeHash === "home";
    return activeHash === link.hash;
  };

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    link: NavLink,
  ) => {
    if (link.match === "portfolio") {
      setIsMenuOpen(false);
      return;
    }

    if (!isPortfolio && link.hash) {
      event.preventDefault();
      scrollToHash(link.hash);
      setActiveHash(link.hash);
      setIsMenuOpen(false);
      window.history.replaceState(null, "", `/#${link.hash}`);
    }
  };

  return (
    <motion.header
      initial={false}
      animate={{ y: showHeader ? 0 : "-100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={[
        "fixed top-0 left-0 z-50 h-20 w-full border-b transition-colors duration-300",
        scrolled
          ? "border-[var(--border-subtle)] bg-black/70 backdrop-blur-xl shadow-lg"
          : "border-white/5 bg-gradient-to-br from-white/10 to-[var(--page-bg)]",
      ].join(" ")}
    >
      <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-2 sm:px-4">
        <nav aria-label="Primary" className="hidden h-20 items-center lg:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link);

            return (
              <Link
                key={link.label}
                href={link.href}
                aria-label={link.label}
                aria-current={active ? "page" : undefined}
                title={link.label}
                onClick={(event) => handleNavClick(event, link)}
                className={[
                  "focus-ring group relative flex h-20 min-w-[5.5rem] flex-col items-center justify-center gap-1 px-3 transition-all duration-200",
                  active
                    ? "text-[var(--gold)]"
                    : "text-[var(--text-muted)] hover:text-[var(--gold)]",
                ].join(" ")}
              >
                <Icon
                  className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
                <span className="text-[10px] tracking-[0.12em] uppercase">
                  {link.label}
                </span>
                <span
                  className={[
                    "absolute right-3 bottom-0 left-3 h-0.5 origin-center bg-[var(--gold)] transition-transform duration-300",
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50",
                  ].join(" ")}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </nav>

        <Link
          href="/#home"
          className="focus-ring flex h-20 items-center px-3 text-[var(--gold)] lg:hidden"
          aria-label="Home"
        >
          <FaHome className="h-5 w-5" aria-hidden="true" />
          <span className="ml-2 text-sm tracking-[0.12em] uppercase">
            Home
          </span>
        </Link>

        <div className="hidden items-center px-4 lg:flex">
          <Socials />
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="focus-ring flex h-20 min-w-11 items-center justify-center px-4 text-[var(--text-muted)] lg:hidden"
          aria-expanded={isMenuOpen}
          aria-controls={menuId}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {isMenuOpen ? (
            <FaTimes className="h-6 w-6" aria-hidden="true" />
          ) : (
            <FaBars className="h-6 w-6" aria-hidden="true" />
          )}
        </button>

        <AnimatePresence>
          {isMenuOpen ? (
            <motion.div
              id={menuId}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute top-20 left-0 z-50 w-full border-b border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-4 py-4 shadow-2xl lg:hidden"
            >
              <nav aria-label="Mobile primary" className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link);

                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={(event) => handleNavClick(event, link)}
                      aria-current={active ? "page" : undefined}
                      className={[
                        "focus-ring flex min-h-12 items-center gap-3 rounded-md px-3 py-3 text-sm tracking-[0.12em] uppercase transition-colors",
                        active
                          ? "bg-[rgba(184,134,11,0.12)] text-[var(--gold)]"
                          : "text-[var(--text-muted)] hover:bg-white/5 hover:text-[var(--gold)]",
                      ].join(" ")}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-4 border-t border-[var(--border-subtle)] pt-4">
                <Socials />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

export default Header;
