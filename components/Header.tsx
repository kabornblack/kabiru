"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  FaBriefcase,
  FaHome,
  FaTools,
  FaUser,
  FaInfoCircle,
  FaUserTie,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Socials from "./Socials";

// =========================
// Parallax Icon
// =========================
const ParallaxIcon = ({
  Icon,
  className,
}: {
  Icon: React.ElementType;
  className: string;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = {
    damping: 25,
    stiffness: 300,
  };

  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) * 0.08);
    y.set((e.clientY - centerY) * 0.08);
  };

  return (
    <div
      className="relative w-full h-full flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.div
        style={{
          x: springX,
          y: springY,
        }}
      >
        <Icon className={className} />
      </motion.div>
    </div>
  );
};

// =========================
// Types
// =========================
interface DropdownItem {
  icon: React.ElementType;
  href?: string;
  title?: string;
}

interface NavItemProps {
  icon: React.ElementType;
  dropdownItems?: DropdownItem[];
  href?: string;
  baseUrl: string;
}

// =========================
// Desktop Dropdown Item
// =========================
const NavItemWithDropdown: React.FC<NavItemProps> = ({
  icon: Icon,
  dropdownItems = [],
  href = "/",
  baseUrl,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link href={baseUrl + href} className="text-gray-600 dark:text-gray-400">
        <div className="relative h-20 w-20 flex items-center justify-center border-x border-x-black/40 border-b border-b-black/40 hover:text-[#B8860B] hover:shadow-[inset_0_0_12px_rgba(184,134,11,0.35)] transition-all duration-300">
          <ParallaxIcon Icon={Icon} className="w-6 h-6" />
        </div>
      </Link>

      {dropdownItems.length > 0 && (
        <div
          className={`absolute left-0 top-20 w-28 transition-all duration-300 ease-in-out ${
            isOpen
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-2"
          }`}
        >
          {dropdownItems.map((item, index) => (
            <Link
              href={baseUrl + (item.href || "#")}
              key={index}
              onClick={() => setIsOpen(false)}
            >
              <div className="h-16 w-20 flex flex-col items-center justify-center group border border-black/10 bg-black/90 backdrop-blur-xl gap-2">
                <ParallaxIcon
                  Icon={item.icon}
                  className="w-5 h-5 text-gray-400 group-hover:text-[#B8860B]"
                />

                <span className="text-gray-400 font-thin font-serif group-hover:text-[#B8860B] text-xs uppercase tracking-[2px]">
                  {item.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

// =========================
// Main Header
// =========================
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();

  const baseUrl = pathname?.startsWith("/portfolio") ? "/" : "";

  // =========================
  // Scroll Hide / Show
  // =========================

  useEffect(() => {
    const scrollContainer = document.getElementById("page-scroll-container");

    const target = scrollContainer || window;

    let lastScrollY =
      scrollContainer?.scrollTop ||
      window.scrollY ||
      document.documentElement.scrollTop ||
      0;

    const getCurrentScrollY = () => {
      return scrollContainer?.scrollTop || window.scrollY || 0;
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
    };

    target.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      target.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const homeDropdownItems = [
    {
      icon: FaInfoCircle,
      href: "#about",
      // title: "about",
    },
    {
      icon: FaUserTie,
      href: "#contact",
      // title: "contact",
    },
  ];

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          y: showHeader ? 0 : "-100%",
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className={[
          "fixed top-0 left-0 w-full h-20 z-50 border-b transition-colors duration-300",
          scrolled
            ? "bg-black/70 backdrop-blur-xl border-white/10 shadow-lg"
            : "bg-gradient-to-br from-white/20 to-gray-950 border-white/5",
        ].join(" ")}
      >
        <div className="relative flex justify-between items-center h-20">
          {/* ========================= */}
          {/* LEFT SIDE */}
          {/* ========================= */}
          <div className="flex h-20">
            {/* HOME */}
            <Link
              href={baseUrl + "#home"}
              className="text-gray-600 dark:text-gray-400"
            >
              <div className="h-20 w-20 flex items-center justify-center hover:text-[#B8860B] transition-all duration-300">
                <ParallaxIcon Icon={FaHome} className="w-6 h-6" />
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center justify-center h-20">
              {/* ABOUT / CONTACT */}
              <NavItemWithDropdown
                icon={FaUser}
                dropdownItems={homeDropdownItems}
                baseUrl={baseUrl}
              />

              {/* SKILLS */}
              <Link
                href={baseUrl + "#skills"}
                className="group border-b border-b-black/40"
              >
                <div className="h-20 w-20 flex flex-col items-center justify-center gap-1 hover:text-[#B8860B] transition-all duration-300">
                  <ParallaxIcon
                    Icon={FaTools}
                    className="w-6 h-6 text-gray-400 group-hover:text-[#B8860B]"
                  />
                </div>
              </Link>

              {/* PORTFOLIO */}
              <Link
                href="/portfolio"
                className="group border-x border-x-black/40 border-b border-b-black/40"
              >
                <div className="h-20 w-20 flex flex-col items-center justify-center gap-1 hover:text-[#B8860B] transition-all duration-300">
                  <ParallaxIcon
                    Icon={FaBriefcase}
                    className="w-6 h-6 text-gray-400 group-hover:text-[#B8860B]"
                  />
                </div>
              </Link>
            </div>
          </div>

          {/* ========================= */}
          {/* SOCIALS */}
          {/* ========================= */}
          <div className="hidden lg:flex space-x-4 px-10 justify-center items-center h-20">
            <Socials />
          </div>

          {/* ========================= */}
          {/* MOBILE MENU BUTTON */}
          {/* ========================= */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden px-6 h-20 flex items-center justify-center text-gray-400"
          >
            <ParallaxIcon
              Icon={isMenuOpen ? FaTimes : FaBars}
              className="w-6 h-6"
            />
          </button>

          {/* ========================= */}
          {/* MOBILE MENU */}
          {/* ========================= */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 0,
                  scaleY: 0,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scaleY: 1,
                }}
                exit={{
                  opacity: 0,
                  y: 0,
                  scaleY: 0,
                }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                }}
                className="absolute top-20 left-0 pb-2 w-20 bg-black backdrop-blur-2xl shadow-2xl lg:hidden z-50"
              >
                <div className="py-2 px-4 space-y-1">
                  {/* ABOUT + CONTACT */}
                  {homeDropdownItems.map((item, index) => (
                    <Link
                      key={index}
                      href={baseUrl + (item.href || "#")}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <motion.div
                        initial={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                        }}
                        transition={
                          {
                            // delay: 2,
                          }
                        }
                        className="flex items-center space-x-2 p-4 hover:bg-white/5 rounded-xl group transition-all duration-300"
                      >
                        <item.icon className="w-5 h-5 text-gray-400 group-hover:text-[#B8860B]" />
                      </motion.div>
                    </Link>
                  ))}

                  {/* SKILLS */}
                  <Link
                    href={baseUrl + "#skills"}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <motion.div
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      transition={{
                        delay: 0.3,
                      }}
                      className="flex items-center space-x-4 p-4 hover:bg-white/5 rounded-xl group transition-all duration-300"
                    >
                      <FaTools className="w-5 h-5 text-gray-400 group-hover:text-[#B8860B]" />
                    </motion.div>
                  </Link>

                  {/* PORTFOLIO */}
                  <Link href="/portfolio" onClick={() => setIsMenuOpen(false)}>
                    <motion.div
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      transition={{
                        delay: 0.4,
                      }}
                      className="flex items-center space-x-4 p-4 hover:bg-white/5 rounded-xl group transition-all duration-300"
                    >
                      <FaBriefcase className="w-5 h-5 text-gray-400 group-hover:text-[#B8860B]" />
                    </motion.div>
                  </Link>

                  {/* SOCIAL ICONS INSIDE NAVBAR */}
                  <motion.div
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      delay: 0.5,
                    }}
                    className="group -ml-8 pt-1"
                  >
                    <div className="h-20 w-32 flex items-center justify-center gap-2 hover:text-[#B8860B] transition-all duration-300">
                      <Socials />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
}

export default Header;
