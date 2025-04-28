"use client";
import React from "react";
import { SparklesCore } from "./ui/sparkles";
import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiDocker,
  SiGit,
  SiPython,
  SiPostgresql,
  SiRedux,
  SiGraphql,
} from "react-icons/si";

// Tech stack array with icons and names
const techStack = [
  { icon: SiReact, name: "React" },
  { icon: SiNextdotjs, name: "Next.js" },
  { icon: SiTypescript, name: "TypeScript" },
  { icon: SiJavascript, name: "JavaScript" },
  { icon: SiNodedotjs, name: "Node.js" },
  { icon: SiExpress, name: "Express" },
  { icon: SiMongodb, name: "MongoDB" },
  { icon: SiPostgresql, name: "PostgreSQL" },
  { icon: SiTailwindcss, name: "Tailwind CSS" },
  { icon: SiDocker, name: "Docker" },
  { icon: SiGit, name: "Git" },
  { icon: SiPython, name: "Python" },
  { icon: SiRedux, name: "Redux" },
  { icon: SiGraphql, name: "GraphQL" },
];

// Tech stack marquee component
const TechMarquee = () => {
  return (
    <div className="absolute bottom-16 w-full overflow-hidden bg-transparent px-8">
      <div className="flex flex-col space-y-4">
        <p className="text-center text-gray-300 text-lg font-mono mb-2">
          Passionate software developer specializing in web applications.
        </p>
        <div className="relative flex overflow-x-hidden">
          <motion.div
            className="flex space-x-8 py-2"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 70,
              ease: "linear",
            }}
          >
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 text-gray-400 hover:text-[#B8860B] transition-colors whitespace-nowrap"
              >
                <tech.icon className="w-5 h-5" />
                <span className="text-sm font-semibold">{tech.name}</span>
              </div>
            ))}
            {/* Duplicate items to create seamless loop */}
            {techStack.map((tech, index) => (
              <div
                key={`duplicate-${index}`}
                className="flex items-center space-x-2 text-gray-400 hover:text-[#B8860B] transition-colors whitespace-nowrap"
              >
                <tech.icon className="w-5 h-5" />
                <span className="text-sm font-semibold">{tech.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export function Hero() {
  return (
    <div className="h-screen max-w-7xl mx-auto bg-gray-950 flex flex-col items-center justify-center overflow-hidden relative">
      <h1 className="md:text-6xl text-4xl lg:text-7xl font-bold text-center text-[#B8860B] relative mt-48 pb-8 z-20">
        Kabiru Shaibu
      </h1>
      <div className="w-[40rem] h-40 relative pt-8">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-yellow-400 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-white to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-gray-100 to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#B8860B"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-gray-950 [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>

      {/* Technology Marquee */}
      <TechMarquee />
      <div className="py-10 blur-sm opacity-5">
        <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
        <div className="bg-gradient-to-r from-[#B8860B] via-gray-100 to-[#B8860B] dark:from-[#B8860B] dark:via-gray-950 dark:to-[#B8860B] h-1" />
        <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
      </div>
    </div>
  );
}
