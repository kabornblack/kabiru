"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaAngleDown } from "react-icons/fa";

// Define interfaces for props
interface ContentSectionProps {
  title: string;
  children: ReactNode;
}

interface ContentItem {
  title: string;
  content: string;
}

// Content section component with expandable functionality
const ContentSection = ({ title, children }: ContentSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-8 w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-black/20 dark:bg-white/5 hover:bg-black/30 dark:hover:bg-white/10 p-4 rounded-md border-l-4 border-[#B8860B] group transition-all duration-300"
      >
        <h3 className="text-[#B8860B] text-lg md:text-xl uppercase leading-6 tracking-[3px] font-hubballi text-left">
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
            <div className="p-4 bg-black/10 dark:bg-white/5 rounded-b-md border-l-4 border-[#B8860B]/40 mt-1">
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

export default function AboutPage() {
  // Removed the animation that was causing the flash/movement on page load

  const content: ContentItem[] = [
    {
      title: "Who am I?",
      content:
        "My name is <span class='text-[#B8860B] font-semibold'>Kabiru Shaibu </span> and I am a passionate software developer from Nigeria. I thrive on solving complex problems and turning ideas into functional and elegant digital solutions.",
    },
    {
      title: "What do I do?",
      content:
        "I specialize in software development with over 5 years of experience building robust applications and scalable systems. My expertise spans frontend, backend, and full-stack development, with a strong focus on creating user-centered designs and efficient code.",
    },
    {
      title: "How did it all start?",
      content:
        "It all started in 2020 during the covid lockdown when we had no where to go but to sit at home and watch movies and then i started thinking what i could posible do with my life and then i discovered a 100 days of code tutorial by <span class='text-[#B8860B] font-semibold'> Angela Yu</span> A simple bit chonk python coding lectures and task and then i develope to love and passion i have today as a software developer. From my first \"Hello, World!\" to working on full-scale applications, the journey has been exciting and rewarding.",
    },
    {
      title: "What is my development philosophy?",
      content:
        "I believe in writing clean, maintainable code and prioritizing user experience above all else. For me, development is not just about functionality but also about creating seamless interactions that add value to users' lives.",
    },
    {
      title: "What are my core skills?",
      content:
        "Even though my journey started with Python but as at today my core skills include modern JavaScript frameworks (React, Next.js and Typescript), backend technologies (Node.js, Express), and database management (MongoDB, PostgreSQL). I am also proficient in tools like Docker, Git, and CI/CD pipelines, ensuring efficient workflows and deployments.",
    },
    {
      title: "What drives me?",
      content:
        "Curiosity and a desire to learn drive my work. I am always exploring new technologies, contributing to open-source projects, and collaborating with peers to stay at the forefront of the tech industry.",
    },
    {
      title: "What are my future goals?",
      content:
        "First, is to learn something new everyday, even if its just a simple line of code and i aim to lead impactful projects that not only solve problems but also inspire innovation. I'm constantly evolving, learning, and aspiring to contribute meaningfully to the ever-changing world of technology.",
    },
  ];

  // Split content into left and right columns
  const leftColumnContent = content.filter((_, index) => index % 2 === 0);
  const rightColumnContent = content.filter((_, index) => index % 2 === 1);

  return (
    <div className="w-full min-h-screen bg-gray-950">
      <div className="py-10 blur-sm opacity-5">
        <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
        <div className="bg-gradient-to-r from-[#B8860B] via-gray-100 to-[#B8860B] dark:from-[#B8860B] dark:via-gray-950 dark:to-[#B8860B] h-1" />
        <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-32 py-20">
        <motion.div
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="font-['Playfair_Display'] text-[#B8860B] font-bold text-2xl md:text-4xl tracking-[5px] leading-6 uppercase relative inline-block opacity-80">
            About
            <div className="absolute left-0 -bottom-1 w-full h-[1px] bg-gradient-to-r from-transparent via-[#B8860B] to-transparent"></div>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-2">
            {leftColumnContent.map((section, index) => (
              <ContentSection key={index} title={section.title}>
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              </ContentSection>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-2">
            {rightColumnContent.map((section, index) => (
              <ContentSection key={index} title={section.title}>
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              </ContentSection>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-10 blur-sm opacity-5">
        <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
        <div className="bg-gradient-to-r from-[#B8860B] via-gray-100 to-[#B8860B] dark:from-[#B8860B] dark:via-gray-950 dark:to-[#B8860B] h-1" />
        <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
      </div>
    </div>
  );
}
