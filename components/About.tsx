"use client";

import { useEffect, useMemo, useRef, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaAngleDown } from "react-icons/fa";

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

interface ContentSectionProps {
  title: string;
  children: ReactNode;
}

interface ContentItem {
  title: string;
  content: string;
}

const ContentSection = ({ title, children }: ContentSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-8 w-full font-protest">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-white/20 hover:bg-white/30 p-4 border-l-4 border-[#B8860B] group transition-all duration-300"
      >
        <h3 className="text-[#B8860B] text-lg md:text-xl uppercase leading-6 tracking-[3px] font-protest text-left">
          {title}
        </h3>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-[#B8860B] group-hover:text-[#D4A017]"
        >
          <FaAngleDown />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-gradient-to-b from-white/20 to-black/10 mt-1 relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#B8860B]/40 to-[#B8860B]/1" />

              <div className="text-lg text-gray-300 dark:text-white font-hubballi">
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function About() {
  const dividerRef = useRef<HTMLDivElement | null>(null);
  const [globalProgress, setGlobalProgress] = useState(0);
  const [screenWidth, setScreenWidth] = useState(1200);

  useEffect(() => {
    let frameId: number;

    const updateProgress = () => {
      if (!dividerRef.current) return;

      setScreenWidth(window.innerWidth);

      const rect = dividerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const start = windowHeight;
      const end = windowHeight * 0.35;

      const raw = (start - rect.top) / (start - end);
      setGlobalProgress(clamp(raw, 0, 1));
    };

    const handleScroll = () => {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateProgress);
    };

    const scrollContainer = document.getElementById("page-scroll-container");

    updateProgress();

    window.addEventListener("resize", handleScroll);
    window.addEventListener("scroll", handleScroll, { passive: true });

    scrollContainer?.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      if (frameId) cancelAnimationFrame(frameId);

      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("scroll", handleScroll);

      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const label = "About";
  const letters = useMemo(() => label.split(""), []);
  const letterCount = letters.length;

  const letterGap = screenWidth < 640 ? 44 : screenWidth < 1024 ? 58 : 72;

  const letterData = useMemo(() => {
    return letters.map((letter, idx) => {
      const finalX = (idx - (letterCount - 1) / 2) * letterGap;

      let startX = finalX;

      if (idx === 0) {
        startX = -screenWidth / 2;
      }

      if (idx === letterCount - 1) {
        startX = screenWidth / 2;
      }

      return {
        letter,
        startX,
        finalX,
        startScale: 0.3,
        finalScale: 1,
      };
    });
  }, [letters, letterCount, letterGap, screenWidth]);

  const progress = easeOutCubic(globalProgress);

  const content: ContentItem[] = [
    {
      title: "Who am I?",
      content:
        "My name is <span class='text-[#B8860B] font-semibold'>Kabiru Shaibu</span> and I am a passionate software developer from Nigeria. I thrive on solving complex problems and turning ideas into functional and elegant digital solutions.",
    },
    {
      title: "What I do?",
      content:
        "I specialize in software development with over 5 years of experience building robust applications and scalable systems. My expertise spans frontend and backend development, with a strong focus on creating user-centered designs and efficient code.",
    },
    {
      title: "How it started?",
      content:
        "It all started in 2020 during the covid lockdown when we had nowhere to go but to sit at home and watch movies. Then I started thinking about what I could possibly do with my life, and I discovered a 100 Days of Code tutorial by <span class='text-[#B8860B] font-semibold'>Angela Yu</span>. From my first \"Hello, World!\" to working on full-scale applications, the journey has been exciting and rewarding.",
    },
    {
      title: "My philosophy?",
      content:
        "I believe in writing clean, maintainable code and prioritizing user experience above all else. For me, development is not just about functionality but also about creating seamless interactions that add value to users' lives.",
    },
  ];

  const leftColumnContent = content.filter((_, index) => index % 2 === 0);
  const rightColumnContent = content.filter((_, index) => index % 2 === 1);

  return (
    <div className="w-full h-auto bg-gray-950 font-protest">
      <div className="max-w-7xl mx-auto py-6">
        <div
          ref={dividerRef}
          className="relative mx-auto flex max-w-7xl items-center justify-center overflow-hidden px-6 py-20"
        >
          <div className="pointer-events-none absolute inset-x-6 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[#B8860B]/30 to-transparent" />

          <div className="relative h-20 w-full">
            {letterData.map(
              ({ letter, startX, finalX, startScale, finalScale }, idx) => {
                const currentX = startX + (finalX - startX) * progress;
                const scale = startScale + (finalScale - startScale) * progress;

                return (
                  <span
                    key={`${letter}-${idx}`}
                    style={{
                      left: "50%",
                      transform: `translateX(${currentX}px) translateY(-50%) scale(${scale})`,
                      opacity: progress,
                      willChange: "transform, opacity",
                    }}
                    className="absolute top-1/2 -translate-x-1/2 text-3xl font-protest font-black uppercase text-[#B8860B] md:text-5xl"
                  >
                    {letter}
                  </span>
                );
              },
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 sm:px-10 lg:px-32">
          <div className="space-y-2">
            {leftColumnContent.map((section, index) => (
              <ContentSection key={index} title={section.title}>
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              </ContentSection>
            ))}
          </div>

          <div className="space-y-2">
            {rightColumnContent.map((section, index) => (
              <ContentSection key={index} title={section.title}>
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              </ContentSection>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
