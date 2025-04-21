"use client";

import Link from "next/link";
import React, { useState } from "react";
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
  //   FaQuoteLeft,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Socials from "./Socials";

// ParallaxIcon Component
const ParallaxIcon = ({
  Icon,
  className,
}: {
  Icon: React.ElementType;
  className: string;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const moveX = (e.clientX - centerX) * 0.1;
    const moveY = (e.clientY - centerY) * 0.1;

    x.set(moveX);
    y.set(moveY);
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
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
        }}
      >
        <Icon className={className} />
      </motion.div>
    </div>
  );
};

// Type definitions
interface DropdownItem {
  icon: React.ElementType;
  href?: string;
  title: string;
}

interface NavItemProps {
  icon: React.ElementType;
  dropdownItems?: DropdownItem[];
  href?: string;
}

// NavItemWithDropdown Component
const NavItemWithDropdown: React.FC<NavItemProps> = ({
  icon: Icon,
  dropdownItems = [],
  href = "/",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={href}
        className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
      >
        <div className="h-32 w-32 flex items-center justify-center hover:text-[#B8860B] border-r border-gray-50 dark:border-gray-950">
          <ParallaxIcon Icon={Icon} className="w-7 h-7" />
        </div>
      </Link>

      {dropdownItems.length > 0 && (
        <div
          className={`absolute left-0 w-32 transition-all duration-300 ease-in-out ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {dropdownItems.map((item, index) => (
            <Link
              href={item.href || "#"}
              key={index}
              onClick={() => setIsOpen(false)}
            >
              <div className="h-32 w-32 bg-gray-200 dark:bg-[#171717] flex flex-col items-center justify-center border-t group border-gray-100 dark:border-gray-950 shadow-lg gap-1 pt-5">
                <ParallaxIcon
                  Icon={item.icon}
                  className="w-6 h-6 text-gray-500 dark:text-gray-400 group-hover:text-[#B8860B] dark:group-hover:text-[#B8860B]"
                />
                <span className="text-gray-500 dark:text-gray-400 font-thin font-serif group-hover:text-[#B8860B] dark:group-hover:text-[#B8860B] text-xs uppercase tracking-[4px] leading-5 pb-8">
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

// Main Header Component
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const homeDropdownItems = [
    {
      icon: FaInfoCircle,
      href: "#about",
      title: "about",
    },
    {
      icon: FaUserTie,
      href: "#contact",
      title: "contact",
    },
  ];

  return (
    <>
      <header className="fixed top-0 w-screen h-32 bg-gray-200 dark:bg-[#171717] z-50">
        <div className="relative flex justify-between items-center">
          {/* Home link - always visible */}
          <div className="flex">
            <Link
              href="#home"
              className="text-gray-600 dark:text-gray-400 hover:text-[#B8860B]"
            >
              <div className="h-32 w-32 flex items-center justify-center hover:text-[#B8860B] border-r border-gray-50 dark:border-gray-950">
                <ParallaxIcon Icon={FaHome} className="w-7 h-7" />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center">
              <NavItemWithDropdown
                icon={FaUser}
                // icon={ImageIcon}
                dropdownItems={homeDropdownItems}
              />

              <Link
                href="#skills"
                className="text-gray-600 dark:text-gray-400 hover:text-[#B8860B]  group"
              >
                <div className="h-32 w-32 flex flex-col items-center justify-center hover:text-[#B8860B]  border-r border-gray-50 dark:border-gray-950 gap-2">
                  <ParallaxIcon
                    Icon={FaTools}
                    className="w-7 h-7 -mb-6 group-hover:text-[#B8860B]"
                  />
                  <p className="text-gray-500 dark:text-gray-400 font-thin font-serif group-hover:text-[#B8860B]  text-xs uppercase tracking-[2px] leading-2 pb-8">
                    Skills
                  </p>
                </div>
              </Link>

              <Link
                href="/portfolio"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white group"
              >
                <div className="h-32 w-32 flex flex-col items-center justify-center hover:text-[#B8860B] border-r border-gray-50 dark:border-gray-950 gap-2">
                  <ParallaxIcon
                    Icon={FaBriefcase}
                    className="w-7 h-7 -mb-6 group-hover:text-[#B8860B]"
                  />
                  <p className="text-gray-500 dark:text-gray-400 font-thin font-serif group-hover:text-[#B8860B] text-xs uppercase tracking-[2px] leading-2 pb-8">
                    Portfolio
                  </p>
                </div>
              </Link>
            </div>
          </div>
          {/* Desktop Social Links */}
          <div className="hidden lg:flex space-x-4 px-12 justify-center items-center h-32">
            <Socials />
          </div>

          {/* Mobile Burger Menu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden px-8 h-32 flex items-center justify-center text-gray-600 dark:text-gray-400"
          >
            <ParallaxIcon
              Icon={isMenuOpen ? FaTimes : FaBars}
              className="w-7 h-7"
            />
          </button>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="absolute top-32 left-0 w-full bg-white dark:bg-[#171717] border-t border-gray-200 dark:border-gray-950 shadow-xl lg:hidden"
              >
                {/* Mobile Navigation Links */}
                <div className="py-4 px-4 space-y-4">
                  {homeDropdownItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href || "#"}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg group"
                      >
                        <item.icon className="w-6 h-6 text-gray-500 dark:text-gray-400 group-hover:text-[#B8860B]" />
                        <span className="text-gray-600 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white">
                          {item.title}
                        </span>
                      </motion.div>
                    </Link>
                  ))}
                  {/* Skills */}
                  <Link href="#skills" onClick={() => setIsMenuOpen(false)}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex items-center space-x-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg group"
                    >
                      <FaTools className="w-6 h-6 text-gray-500 dark:text-gray-400 group-hover:text-[#B8860B]" />
                      <span className="text-gray-600 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white">
                        Skills
                      </span>
                    </motion.div>
                  </Link>

                  {/* Portfolio */}
                  <Link href="/portfolio" onClick={() => setIsMenuOpen(false)}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center space-x-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg group"
                    >
                      <FaBriefcase className="w-6 h-6 text-gray-500 dark:text-gray-400 group-hover:text-[#B8860B]" />
                      <span className="text-gray-600 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white">
                        Portfolio
                      </span>
                    </motion.div>
                  </Link>

                  {/* Mobile Social Links */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-center items-center gap-8 p-4 border-t border-gray-200 dark:border-gray-800"
                  >
                    <Socials />
                    <div className="mt-4"></div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}

export default Header;
