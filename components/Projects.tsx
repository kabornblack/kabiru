"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Project data
export const projects = [
  {
    title: "C-U school",
    description:
      "Educational website. orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker i",
    githubUrl: "https://github.com/kabornblack/C-U-Language-School",
    liveUrl: "https://www.cuilschool.ee/",
    tags: ["React", "NextJs", "TypeScript"],
    image: "/cuschool.png",
  },
  {
    title: "Swapify",
    description:
      "Barter and donation platform.orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker i",
    githubUrl: "https://github.com/swapify-ou",
    liveUrl: "https://www.swapify.ee",
    tags: ["React", "JavaScript", "NextJs", "Dart"],
    image: "/swapify.png",
  },
  {
    title: "Upto-date",
    description:
      "Users can share a fact orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker i",
    githubUrl: "https://github.com/kabornblack/Upto-date",
    liveUrl: "https://uptodate-kabbi.netlify.app/",
    tags: ["HTML", "CSS", "React", "Superbase"],
    image: "/uptodate.png",
  },
  {
    title: "Disney-Clone",
    description:
      "A clone of the Disney website orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker i",
    githubUrl: "https://github.com/kabornblack/Disney-clone",
    liveUrl: "https://disney-clone-omega-henna.vercel.app/",
    tags: ["React", "NextJs", "TypeScript"],
    image: "/disneyclone.png",
  },
];

// StickyScroll component
export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    tags?: string[];
    image?: string;
    githubUrl?: string;
    liveUrl?: string;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <motion.div
      className="relative flex h-[30rem] justify-center space-x-10 overflow-y-auto rounded-md p-20 bg-gray-900"
      ref={ref}
    >
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-36">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-2xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-kg mt-4 max-w-sm text-slate-300"
              >
                {item.description}
              </motion.p>
              {item.tags && (
                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0.3,
                  }}
                  className="mt-3 flex flex-wrap gap-2"
                >
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div
        className={cn(
          "sticky top-10 hidden h-60 w-80 overflow-hidden rounded-md bg-slate-900 md:block",
          contentClassName
        )}
      >
        {content[activeCard].image && (
          <div className="relative h-full w-full group">
            <Image
              src={content[activeCard].image}
              alt={content[activeCard].title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Animated links container */}
            <div
              className="absolute left-0 right-0 bottom-0 flex justify-center gap-4 bg-black/70 p-3
              transform translate-y-full transition-transform duration-300 ease-in-out
              group-hover:translate-y-0"
            >
              {content[activeCard].githubUrl && (
                <motion.a
                  href={content[activeCard].githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded bg-slate-800 px-3 py-1 text-sm text-white hover:bg-slate-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  GitHub
                </motion.a>
              )}
              {content[activeCard].liveUrl && (
                <motion.a
                  href={content[activeCard].liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded bg-slate-800 px-3 py-1 text-sm text-white hover:bg-slate-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Live Demo
                </motion.a>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Main Projects component
export function Projects() {
  return (
    <div className="w-full py-4">
      <StickyScroll content={projects} />
    </div>
  );
}
