"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import SkillStackShowcase from "./SkillStackShowcase";
import {
  FaHtml5,
  FaCss3Alt,
  FaBootstrap,
  FaSass,
  FaReact,
  FaGithub,
  FaNode,
  FaDatabase,
  FaPython,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiExpress,
  SiSanity,
  SiMysql,
  SiMongodb,
  SiPostgresql,
  SiSupabase,
  SiFirebase,
  SiGooglecloud,
  SiOpenai,
  SiClerk,
  SiCloudflare,
  SiRedux,
  SiDocker,
  SiFastapi,
  SiVercel,
  SiRender,
  SiPostman,
  SiGit,
  SiGithubactions,
  SiOpenapiinitiative,
  SiSolana,
  SiEthereum,
  SiWeb3Dotjs,
} from "react-icons/si";
import { TbBrandAngular, TbBrandSvelte } from "react-icons/tb";

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

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

const skillCategories: SkillCategory[] = [
  {
    key: "frontend",
    title: "Frontend",
    subtitle: "Interfaces, animations and user experience",
    description:
      "I build responsive, clean and interactive user interfaces with modern frontend tools. My focus is on layout, accessibility, animations, performance and making the user experience feel smooth.",
    points: [
      "Responsive layouts for desktop, tablet and mobile",
      "Reusable UI components",
      "Modern animations and clean visual systems",
    ],
    items: [
      // Core Web Technologies
      { name: "html5", icon: <FaHtml5 className="text-xl mb-1" /> },
      { name: "css3", icon: <FaCss3Alt className="text-xl mb-1" /> },
      { name: "sass", icon: <FaSass className="text-xl mb-1" /> },

      // UI Frameworks & Styling
      { name: "bootstrap", icon: <FaBootstrap className="text-xl mb-1" /> },
      {
        name: "tailwind css",
        icon: <SiTailwindcss className="text-xl mb-1" />,
      },
      { name: "shadcn ui", icon: <FaReact className="text-xl mb-1" /> },

      // Programming Languages
      { name: "javascript", icon: <SiJavascript className="text-xl mb-1" /> },
      { name: "typescript", icon: <SiTypescript className="text-xl mb-1" /> },

      // Frontend Libraries & Frameworks
      { name: "react", icon: <FaReact className="text-xl mb-1" /> },
      { name: "next.js", icon: <SiNextdotjs className="text-xl mb-1" /> },
      { name: "redux toolkit", icon: <SiRedux className="text-xl mb-1" /> },
      {
        name: "framer motion",
        icon: <FaReact className="text-xl mb-1" />,
      },

      // Alternative Frontend Frameworks
      { name: "angular", icon: <TbBrandAngular className="text-xl mb-1" /> },
      { name: "svelte", icon: <TbBrandSvelte className="text-xl mb-1" /> },

      // Responsive Design & UX
      { name: "responsive design", icon: <FaReact className="text-xl mb-1" /> },
      { name: "mobile first ui", icon: <FaReact className="text-xl mb-1" /> },
      {
        name: "component architecture",
        icon: <FaReact className="text-xl mb-1" />,
      },

      // Frontend Performance
      { name: "seo optimization", icon: <FaReact className="text-xl mb-1" /> },
      {
        name: "frontend performance",
        icon: <FaReact className="text-xl mb-1" />,
      },
      { name: "axios", icon: <FaReact className="text-xl mb-1" /> },
    ],
  },
  {
    key: "backend",
    title: "Backend",
    subtitle: "APIs, server logic and application services",
    description:
      "I work with backend tools to build APIs, connect applications to databases, handle business logic and support full-stack application development.",
    points: [
      "REST API structure",
      "Server-side application logic",
      "Frontend-to-backend data flow",
    ],

    items: [
      // Backend Runtime & Languages
      { name: "node.js", icon: <FaNode className="text-xl mb-1" /> },
      { name: "python", icon: <FaPython className="text-xl mb-1" /> },
      { name: "typescript", icon: <SiTypescript className="text-xl mb-1" /> },
      // { name: "javascript", icon: <SiJavascript className="text-xl mb-1" /> },

      // Backend Frameworks
      { name: "express.js", icon: <SiExpress className="text-xl mb-1" /> },
      { name: "fastapi", icon: <SiFastapi className="text-xl mb-1" /> },

      // API Development
      {
        name: "rest api",
        icon: <SiOpenapiinitiative className="text-xl mb-1" />,
      },

      {
        name: "jwt authentication",
        icon: <FaReact className="text-xl mb-1" />,
      },
      { name: "clerk auth", icon: <SiClerk className="text-xl mb-1" /> },

      // Databases & Backend Services
      { name: "postgresql", icon: <SiPostgresql className="text-xl mb-1" /> },
      { name: "mongodb", icon: <SiMongodb className="text-xl mb-1" /> },
      { name: "supabase", icon: <SiSupabase className="text-xl mb-1" /> },
      { name: "firebase", icon: <SiFirebase className="text-xl mb-1" /> },

      // Cloud & Deployment
      { name: "docker", icon: <SiDocker className="text-xl mb-1" /> },
      { name: "render", icon: <SiRender className="text-xl mb-1" /> },

      // Backend Features
      { name: "server-side logic", icon: <FaReact className="text-xl mb-1" /> },
      { name: "api integration", icon: <FaReact className="text-xl mb-1" /> },
      { name: "file uploads", icon: <FaReact className="text-xl mb-1" /> },
      { name: "webhooks", icon: <FaReact className="text-xl mb-1" /> },

      // Performance & Architecture
      {
        name: "backend architecture",
        icon: <FaReact className="text-xl mb-1" />,
      },
      { name: "scalable apis", icon: <FaReact className="text-xl mb-1" /> },
    ],
  },
  {
    key: "database",
    title: "Database & Cloud",
    subtitle: "Storage, hosting and scalable data systems",
    description:
      "I use databases and cloud services to store, manage and retrieve application data. This includes relational databases, NoSQL tools, backend-as-a-service platforms and cloud infrastructure.",
    points: [
      "Relational and NoSQL databases",
      "Cloud-hosted app services",
      "Authentication, storage and deployment support",
    ],

    items: [
      // Relational Databases
      { name: "sql", icon: <FaDatabase className="text-xl mb-1" /> },
      { name: "mysql", icon: <SiMysql className="text-xl mb-1" /> },
      { name: "postgresql", icon: <SiPostgresql className="text-xl mb-1" /> },

      // NoSQL Databases
      { name: "mongodb", icon: <SiMongodb className="text-xl mb-1" /> },

      // Backend as a Service (BaaS)
      { name: "supabase", icon: <SiSupabase className="text-xl mb-1" /> },
      { name: "firebase", icon: <SiFirebase className="text-xl mb-1" /> },

      // Cloud Platforms
      {
        name: "google cloud",
        icon: <SiGooglecloud className="text-xl mb-1" />,
      },
      { name: "cloudflare", icon: <SiCloudflare className="text-xl mb-1" /> },

      // Authentication & Storage
      { name: "authentication", icon: <FaReact className="text-xl mb-1" /> },
      { name: "cloud storage", icon: <FaReact className="text-xl mb-1" /> },

      // ORM & Database Tools
      { name: "prisma", icon: <FaReact className="text-xl mb-1" /> },

      // API & Backend Integration
      { name: "rest api", icon: <FaReact className="text-xl mb-1" /> },
      {
        name: "database schema design",
        icon: <FaReact className="text-xl mb-1" />,
      },

      // Scalability & Performance
      { name: "realtime database", icon: <FaReact className="text-xl mb-1" /> },
      {
        name: "database optimization",
        icon: <FaReact className="text-xl mb-1" />,
      },

      // DevOps & Containers
      { name: "docker", icon: <SiDocker className="text-xl mb-1" /> },
    ],
  },
  {
    key: "ai",
    title: "AI & Automation",
    subtitle: "Smarter workflows and AI-powered features",
    description:
      "I use AI tools and APIs to build intelligent features, automate repetitive workflows and create more useful digital products.",
    points: [
      "AI-assisted product features",
      "Workflow automation",
      "Prompting and API integration",
    ],

    items: [
      // AI Models & APIs
      { name: "openai", icon: <SiOpenai className="text-xl mb-1" /> },
      { name: "claude ai", icon: <FaReact className="text-xl mb-1" /> },
      { name: "gemini ai", icon: <FaReact className="text-xl mb-1" /> },
      { name: "deepseek", icon: <FaReact className="text-xl mb-1" /> },
      { name: "llama", icon: <FaReact className="text-xl mb-1" /> },

      // Programming Languages
      { name: "python", icon: <FaPython className="text-xl mb-1" /> },
      { name: "typescript", icon: <SiTypescript className="text-xl mb-1" /> },

      // AI Backend & APIs
      { name: "fastapi", icon: <SiFastapi className="text-xl mb-1" /> },
      { name: "node.js", icon: <FaNode className="text-xl mb-1" /> },
      { name: "express.js", icon: <SiExpress className="text-xl mb-1" /> },

      // AI Features
      { name: "chatbots", icon: <FaReact className="text-xl mb-1" /> },
      { name: "speech to text", icon: <FaReact className="text-xl mb-1" /> },
      { name: "text to speech", icon: <FaReact className="text-xl mb-1" /> },

      // Deployment & Infrastructure
      { name: "docker", icon: <SiDocker className="text-xl mb-1" /> },
      { name: "render", icon: <SiRender className="text-xl mb-1" /> },
      { name: "vercel", icon: <SiVercel className="text-xl mb-1" /> },
    ],
  },
  {
    key: "web3",
    title: "Web3",
    subtitle: "Blockchain applications and decentralized systems",
    description:
      "I explore and build modern Web3 applications using blockchain technologies, wallet integrations and decentralized application architecture.",
    points: [
      "Wallet integrations and Web3 connections",
      "Frontend interaction with blockchain networks",
      "Modern decentralized application architecture",
    ],
    items: [
      {
        name: "ethereum",
        icon: <SiEthereum className="text-xl mb-1" />,
      },
      {
        name: "solana",
        icon: <SiSolana className="text-xl mb-1" />,
      },
      {
        name: "web3.js",
        icon: <SiWeb3Dotjs className="text-xl mb-1" />,
      },
      {
        name: "wallet connect",
        icon: <FaReact className="text-xl mb-1" />,
      },
      {
        name: "metamask",
        icon: <FaReact className="text-xl mb-1" />,
      },
      {
        name: "solidity",
        icon: <SiEthereum className="text-xl mb-1" />,
      },
      {
        name: "react",
        icon: <FaReact className="text-xl mb-1" />,
      },
      {
        name: "next.js",
        icon: <SiNextdotjs className="text-xl mb-1" />,
      },
      {
        name: "alchemy",
        icon: <FaReact className="text-xl mb-1" />,
      },
      {
        name: "infura",
        icon: <FaReact className="text-xl mb-1" />,
      },
      {
        name: "ipfs",
        icon: <FaReact className="text-xl mb-1" />,
      },
      {
        name: "web3 authentication",
        icon: <FaReact className="text-xl mb-1" />,
      },
      {
        name: "erc-20",
        icon: <SiEthereum className="text-xl mb-1" />,
      },
      {
        name: "erc-721",
        icon: <SiEthereum className="text-xl mb-1" />,
      },
      {
        name: "hardhat",
        icon: <FaReact className="text-xl mb-1" />,
      },
      {
        name: "node.js",
        icon: <FaNode className="text-xl mb-1" />,
      },
    ],
  },
  {
    key: "tools",
    title: "Tools & Workflow",
    subtitle: "Development, collaboration and product setup",
    description:
      "I use modern developer tools to manage projects, authentication, content, version control and production-ready workflows.",
    points: [
      "Version control and collaboration",
      "Authentication setup",
      "Content and project workflow management",
    ],
    items: [
      // Version Control & Collaboration
      { name: "git", icon: <SiGit className="text-xl mb-1" /> },
      { name: "github", icon: <FaGithub className="text-xl mb-1" /> },
      {
        name: "github actions",
        icon: <SiGithubactions className="text-xl mb-1" />,
      },

      // API Testing & Development
      { name: "postman", icon: <SiPostman className="text-xl mb-1" /> },

      // Deployment & Hosting
      { name: "vercel", icon: <SiVercel className="text-xl mb-1" /> },
      { name: "render", icon: <SiRender className="text-xl mb-1" /> },

      // Authentication
      { name: "clerk", icon: <SiClerk className="text-xl mb-1" /> },

      // CMS & Content
      { name: "sanity", icon: <SiSanity className="text-xl mb-1" /> },

      // Containers & DevOps
      { name: "docker", icon: <SiDocker className="text-xl mb-1" /> },

      // Cloud & Infrastructure
      { name: "cloudflare", icon: <SiCloudflare className="text-xl mb-1" /> },
      {
        name: "google cloud",
        icon: <SiGooglecloud className="text-xl mb-1" />,
      },

      // Design & Productivity
      { name: "figma", icon: <FaReact className="text-xl mb-1" /> },

      // Monitoring & Analytics
      { name: "google analytics", icon: <FaReact className="text-xl mb-1" /> },

      // Payments
      { name: "stripe", icon: <FaReact className="text-xl mb-1" /> },
    ],
  },
];

export default function Skills() {
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

  const letters = useMemo(() => "Skills".split(""), []);
  const letterCount = letters.length;
  const letterGap = screenWidth < 640 ? 38 : screenWidth < 1024 ? 52 : 66;

  const letterData = useMemo(() => {
    return letters.map((letter, idx) => {
      const finalX = (idx - (letterCount - 1) / 2) * letterGap;

      let startX = finalX;

      if (idx === 0) startX = -screenWidth / 2;
      if (idx === letterCount - 1) startX = screenWidth / 2;

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

  return (
    <div className="top-0 left-0 w-full min-h-screen transform transition-all duration-700 bg-gray-950 mt-6 text-center">
      <div
        ref={dividerRef}
        className="relative mx-auto flex max-w-6xl items-center justify-center overflow-hidden px-6 py-20"
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

      <SkillStackShowcase categories={skillCategories} />
      {/* 
      <div className="py-12 blur-sm opacity-5">
        <div className="h-1 bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950" />
        <div className="h-1 bg-gradient-to-r from-[#B8860B] via-gray-100 to-[#B8860B] dark:from-[#B8860B] dark:via-gray-950 dark:to-[#B8860B]" />
        <div className="h-1 bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950" />
      </div>

      <RecentProject />
      <TechStack /> */}
    </div>
  );
}
