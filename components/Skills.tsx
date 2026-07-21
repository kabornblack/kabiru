"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import SkillStackShowcase, { type SkillCategory } from "./SkillStackShowcase";
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
  FaUniversalAccess,
  FaCubes,
  FaMobileAlt,
  FaCloudUploadAlt,
  FaKey,
  FaLink,
  FaRobot,
  FaWallet,
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
  SiPrisma,
  SiFigma,
  SiStripe,
  SiFramer,
  SiGoogleanalytics,
  SiAlchemy,
} from "react-icons/si";
import { TbBrandAngular, TbBrandSvelte } from "react-icons/tb";
import { useReducedMotion } from "framer-motion";

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);
const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

const iconClass = "text-xl";

const skillCategories: SkillCategory[] = [
  {
    key: "frontend",
    title: "Frontend",
    subtitle: "Accessible interfaces and product-quality UX",
    description:
      "I ship production UIs with React and TypeScript — clear component architecture, accessibility, and performance that holds up beyond demos.",
    points: [
      "Responsive layouts for desktop, tablet and mobile",
      "Reusable, typed UI components",
      "Accessibility and interaction polish",
    ],
    items: [
      { name: "React", icon: <FaReact className={iconClass} />, tier: "core" },
      {
        name: "TypeScript",
        icon: <SiTypescript className={iconClass} />,
        tier: "core",
      },
      {
        name: "Next.js",
        icon: <SiNextdotjs className={iconClass} />,
        tier: "core",
      },
      {
        name: "JavaScript",
        icon: <SiJavascript className={iconClass} />,
        tier: "core",
      },
      {
        name: "Tailwind CSS",
        icon: <SiTailwindcss className={iconClass} />,
        tier: "core",
      },
      {
        name: "Accessibility",
        icon: <FaUniversalAccess className={iconClass} />,
        tier: "core",
      },
      {
        name: "Component architecture",
        icon: <FaCubes className={iconClass} />,
        tier: "core",
      },
      {
        name: "HTML5",
        icon: <FaHtml5 className={iconClass} />,
        tier: "core",
      },
      {
        name: "CSS3",
        icon: <FaCss3Alt className={iconClass} />,
        tier: "core",
      },
      {
        name: "SASS",
        icon: <FaSass className={iconClass} />,
        tier: "core",
      },
      {
        name: "Bootstrap",
        icon: <FaBootstrap className={iconClass} />,
        tier: "core",
      },
      {
        name: "Redux Toolkit",
        icon: <SiRedux className={iconClass} />,
        tier: "additional",
      },
      {
        name: "Framer Motion",
        icon: <SiFramer className={iconClass} />,
        tier: "core",
      },
      {
        name: "Mobile-first UI",
        icon: <FaMobileAlt className={iconClass} />,
        tier: "core",
      },
      {
        name: "Angular",
        icon: <TbBrandAngular className={iconClass} />,
        tier: "additional",
      },
      {
        name: "Svelte",
        icon: <TbBrandSvelte className={iconClass} />,
        tier: "additional",
      },
    ],
  },
  {
    key: "backend",
    title: "Backend",
    subtitle: "APIs, auth and application services",
    description:
      "I build Node and Fastify services that connect frontends to data securely — typed APIs, authentication, and business logic that support real product flows.",
    points: [
      "REST API design and integration",
      "Authentication and server-side logic",
      "Reliable frontend-to-backend data flow",
    ],
    items: [
      { name: "Node.js", icon: <FaNode className={iconClass} />, tier: "core" },
      {
        name: "TypeScript",
        icon: <SiTypescript className={iconClass} />,
        tier: "core",
      },
      {
        name: "Express.js",
        icon: <SiExpress className={iconClass} />,
        tier: "core",
      },
      {
        name: "REST API",
        icon: <SiOpenapiinitiative className={iconClass} />,
        tier: "core",
      },
      {
        name: "Supabase",
        icon: <SiSupabase className={iconClass} />,
        tier: "core",
      },
      {
        name: "Python",
        icon: <FaPython className={iconClass} />,
        tier: "core",
      },
      {
        name: "FastAPI",
        icon: <SiFastapi className={iconClass} />,
        tier: "core",
      },
      {
        name: "JWT Auth",
        icon: <FaKey className={iconClass} />,
        tier: "core",
      },
      {
        name: "Clerk Auth",
        icon: <SiClerk className={iconClass} />,
        tier: "core",
      },
      {
        name: "MongoDB",
        icon: <SiMongodb className={iconClass} />,
        tier: "core",
      },
      {
        name: "PostgreSQL",
        icon: <SiPostgresql className={iconClass} />,
        tier: "core",
      },
      {
        name: "Docker",
        icon: <SiDocker className={iconClass} />,
        tier: "core",
      },
      {
        name: "File uploads",
        icon: <FaCloudUploadAlt className={iconClass} />,
        tier: "core",
      },
      {
        name: "Webhooks",
        icon: <FaLink className={iconClass} />,
        tier: "core",
      },
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
      {
        name: "PostgreSQL",
        icon: <SiPostgresql className={iconClass} />,
        tier: "core",
      },
      {
        name: "Supabase",
        icon: <SiSupabase className={iconClass} />,
        tier: "core",
      },
      {
        name: "MongoDB",
        icon: <SiMongodb className={iconClass} />,
        tier: "core",
      },
      { name: "SQL", icon: <FaDatabase className={iconClass} />, tier: "core" },
      {
        name: "MySQL",
        icon: <SiMysql className={iconClass} />,
        tier: "additional",
      },
      {
        name: "Firebase",
        icon: <SiFirebase className={iconClass} />,
        tier: "additional",
      },
      {
        name: "Prisma",
        icon: <SiPrisma className={iconClass} />,
        tier: "additional",
      },
      {
        name: "Google Cloud",
        icon: <SiGooglecloud className={iconClass} />,
        tier: "core",
      },
      {
        name: "Cloudflare",
        icon: <SiCloudflare className={iconClass} />,
        tier: "core",
      },
      {
        name: "Docker",
        icon: <SiDocker className={iconClass} />,
        tier: "core",
      },
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
      {
        name: "OpenAI",
        icon: <SiOpenai className={iconClass} />,
        tier: "core",
      },
      {
        name: "Python",
        icon: <FaPython className={iconClass} />,
        tier: "core",
      },
      {
        name: "FastAPI",
        icon: <SiFastapi className={iconClass} />,
        tier: "core",
      },
      {
        name: "Gemini AI",
        icon: <FaRobot className={iconClass} />,
        tier: "additional",
      },
      {
        name: "Claude AI",
        icon: <FaRobot className={iconClass} />,
        tier: "core",
      },
      {
        name: "Node.js",
        icon: <FaNode className={iconClass} />,
        tier: "additional",
      },
      {
        name: "Vercel",
        icon: <SiVercel className={iconClass} />,
        tier: "additional",
      },
      {
        name: "Render",
        icon: <SiRender className={iconClass} />,
        tier: "additional",
      },
    ],
  },
  {
    key: "web3",
    title: "Web3",
    subtitle: "Solana products and wallet-secured experiences",
    description:
      "I build Web3 product surfaces around wallet auth, on-chain loyalty mechanics and scalable app architecture — especially on Solana.",
    points: [
      "Secure wallet authentication",
      "Frontend interaction with blockchain networks",
      "Product architecture for decentralized apps",
    ],
    items: [
      {
        name: "Solana",
        icon: <SiSolana className={iconClass} />,
        tier: "core",
      },
      {
        name: "React",
        icon: <FaReact className={iconClass} />,
        tier: "core",
      },
      {
        name: "Next.js",
        icon: <SiNextdotjs className={iconClass} />,
        tier: "core",
      },
      {
        name: "Web3 Auth",
        icon: <FaWallet className={iconClass} />,
        tier: "core",
      },
      {
        name: "Ethereum",
        icon: <SiEthereum className={iconClass} />,
        tier: "additional",
      },
      {
        name: "web3.js",
        icon: <SiWeb3Dotjs className={iconClass} />,
        tier: "additional",
      },
      {
        name: "Solidity",
        icon: <SiEthereum className={iconClass} />,
        tier: "additional",
      },
      {
        name: "Alchemy",
        icon: <SiAlchemy className={iconClass} />,
        tier: "additional",
      },
      {
        name: "Hardhat",
        icon: <FaCubes className={iconClass} />,
        tier: "additional",
      },
      {
        name: "IPFS",
        icon: <FaDatabase className={iconClass} />,
        tier: "additional",
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
      { name: "Git", icon: <SiGit className={iconClass} />, tier: "core" },
      {
        name: "GitHub",
        icon: <FaGithub className={iconClass} />,
        tier: "core",
      },
      {
        name: "Vercel",
        icon: <SiVercel className={iconClass} />,
        tier: "core",
      },
      {
        name: "Postman",
        icon: <SiPostman className={iconClass} />,
        tier: "core",
      },
      {
        name: "GitHub Actions",
        icon: <SiGithubactions className={iconClass} />,
        tier: "additional",
      },
      {
        name: "Clerk",
        icon: <SiClerk className={iconClass} />,
        tier: "core",
      },
      {
        name: "Sanity",
        icon: <SiSanity className={iconClass} />,
        tier: "additional",
      },
      {
        name: "Docker",
        icon: <SiDocker className={iconClass} />,
        tier: "additional",
      },
      {
        name: "Figma",
        icon: <SiFigma className={iconClass} />,
        tier: "core",
      },
      {
        name: "Stripe",
        icon: <SiStripe className={iconClass} />,
        tier: "core",
      },
      {
        name: "Google Analytics",
        icon: <SiGoogleanalytics className={iconClass} />,
        tier: "additional",
      },
      {
        name: "Render",
        icon: <SiRender className={iconClass} />,
        tier: "core",
      },
    ],
  },
];

export default function Skills() {
  const dividerRef = useRef<HTMLDivElement | null>(null);
  const [globalProgress, setGlobalProgress] = useState(0);
  const [screenWidth, setScreenWidth] = useState(1200);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let frameId: number;

    const updateProgress = () => {
      if (!dividerRef.current) return;
      setScreenWidth(window.innerWidth);

      if (reducedMotion) {
        setGlobalProgress(1);
        return;
      }

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
  }, [reducedMotion]);

  const letters = useMemo(() => "Skills".split(""), []);
  const letterCount = letters.length;
  const letterGap = screenWidth < 640 ? 38 : screenWidth < 1024 ? 52 : 66;

  const letterData = useMemo(() => {
    return letters.map((letter, idx) => {
      const finalX = (idx - (letterCount - 1) / 2) * letterGap;
      let startX = finalX;
      if (idx === 0) startX = -screenWidth / 2;
      if (idx === letterCount - 1) startX = screenWidth / 2;
      return { letter, startX, finalX, startScale: 0.3, finalScale: 1 };
    });
  }, [letters, letterCount, letterGap, screenWidth]);

  const progress = reducedMotion ? 1 : easeOutCubic(globalProgress);

  return (
    <div className="w-full bg-[var(--page-bg)] text-center">
      <div ref={dividerRef} className="section-title-wrap max-w-6xl">
        <div className="pointer-events-none absolute inset-x-6 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[rgba(184,134,11,0.3)] to-transparent" />
        <div className="relative h-14 w-full md:h-16">
          <h2 className="sr-only">Skills</h2>
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
                  }}
                  className="font-display absolute top-1/2 -translate-x-1/2 text-3xl font-black uppercase text-[var(--gold)] md:text-4xl"
                >
                  {letter}
                </span>
              );
            },
          )}
        </div>
      </div>

      <SkillStackShowcase categories={skillCategories} />
    </div>
  );
}
