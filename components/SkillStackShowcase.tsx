"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type SkillCategoryKey =
  | "frontend"
  | "backend"
  | "database"
  | "ai"
  | "web3"
  | "tools";

type SkillItem = {
  name: string;
  icon: React.ReactNode;
};

type SkillCategory = {
  key: SkillCategoryKey;
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  items: SkillItem[];
};

export default function SkillStackShowcase({
  categories,
}: {
  categories: SkillCategory[];
}) {
  const [activeCategory, setActiveCategory] =
    useState<SkillCategoryKey>("frontend");

  const activeIndex = useMemo(
    () => categories.findIndex((item) => item.key === activeCategory),
    [activeCategory, categories],
  );
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % categories.length;
      setActiveCategory(categories[nextIndex].key);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, categories, isAutoPlaying]);

  const selectedCategory =
    categories.find((category) => category.key === activeCategory) ||
    categories[0];

  return (
    <div className="mx-auto -mt-20 flex max-w-6xl flex-col px-6 pt-16 pb-10 md:px-10 lg:px-20">
      <div className="relative z-30 flex flex-wrap justify-center gap-3 pb-10">
        {categories.map((category) => {
          const isActive = activeCategory === category.key;

          return (
            <button
              key={category.key}
              type="button"
              onClick={() => {
                setActiveCategory(category.key);
                setIsAutoPlaying(false);
              }}
              className={[
                "relative z-30 cursor-pointer border px-4 py-3 text-xs uppercase tracking-[2px] transition-all duration-300 md:text-sm",
                isActive
                  ? "border-[#B8860B] bg-[#B8860B]/15 text-[#B8860B] shadow-[0_0_20px_rgba(184,134,11,0.15)]"
                  : "border-white/10 bg-white/5 text-gray-400 hover:border-[#B8860B]/60 hover:text-[#B8860B]",
              ].join(" ")}
            >
              {category.title}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory.key}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.4fr]"
        >
          {/* <motion.div
        className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.4fr]"
        layout
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="contents"
          > */}
          <div className="flex flex-col justify-center border border-white/10 bg-white/[0.03] p-6 text-left shadow-sm md:p-8">
            <p className="mb-3 text-xs uppercase tracking-[4px] text-[#B8860B]/70">
              Current capability
            </p>

            <h3 className="text-xl font-black uppercase tracking-[4px] text-[#B8860B] md:text-2xl">
              {selectedCategory.title}
            </h3>

            <p className="mt-3 font-hubballi text-sm text-gray-300 md:text-lg">
              {selectedCategory.subtitle}
            </p>

            <p className="mt-6 font-hubballi text-md leading-8 text-gray-400">
              {selectedCategory.description}
            </p>

            <ul className="mt-6 space-y-3">
              {selectedCategory.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 font-hubballi text-base text-gray-300 md:text-sm"
                >
                  <span className="mt-2 h-2 w-2 shrink-0 bg-[#B8860B]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
              {selectedCategory.items.map((item, index) => (
                <motion.div
                  key={`${selectedCategory.key}-${item.name}-${index}`}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.04,
                  }}
                  className="flex h-24 flex-col items-center justify-center bg-white/10 px-3 py-3 text-[#B8860B] transition-all duration-300 hover:bg-white/20"
                >
                  {item.icon}
                  <span className="text-center text-xs font-medium uppercase tracking-[1px]">
                    {item.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      {/* </motion.div> */}
    </div>
  );
}
