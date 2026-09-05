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
  FaLightbulb,
  FaCogs,
  FaCheckCircle,
  FaSyncAlt,
  FaBook,
  FaTasks,
  FaUsers,
  FaProjectDiagram,
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
        tier: "additional",
      },
      {
        name: "Redux Toolkit",
        icon: <SiRedux className={iconClass} />,
        tier: "core",
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
    subtitle: "Secure APIs and product business logic",
    description:
      "I design backend services, authentication systems, APIs, and business workflows that support secure, production-ready products.",
    points: [
      "REST API and backend service design",
      "Authentication, authorization and access control",
      "Business logic and workflow automation",
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
        name: "JWT Auth",
        icon: <FaKey className={iconClass} />,
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
        name: "Clerk Auth",
        icon: <SiClerk className={iconClass} />,
        tier: "core",
      },
      {
        name: "File uploads",
        icon: <FaCloudUploadAlt className={iconClass} />,
        tier: "additional",
      },
      {
        name: "Webhooks",
        icon: <FaLink className={iconClass} />,
        tier: "additional",
      },
    ],
  },
  {
    key: "database",
    title: "Database & Cloud",
    subtitle: "Data modelling, deployment and cloud services",
    description:
      "I work with relational and NoSQL databases, managed backend platforms, containerized deployments, and cloud services that support reliable application delivery.",
    points: [
      "PostgreSQL data modelling and SQL",
      "Managed backend and storage services",
      "Containerized application deployment",
    ],
    items: [
      {
        name: "PostgreSQL",
        icon: <SiPostgresql className={iconClass} />,
        tier: "core",
      },
      { name: "SQL", icon: <FaDatabase className={iconClass} />, tier: "core" },
      {
        name: "Docker",
        icon: <SiDocker className={iconClass} />,
        tier: "core",
      },
      {
        name: "Cloudflare",
        icon: <SiCloudflare className={iconClass} />,
        tier: "core",
      },
      {
        name: "Firebase",
        icon: <SiFirebase className={iconClass} />,
        tier: "core",
      },
      {
        name: "Prisma",
        icon: <SiPrisma className={iconClass} />,
        tier: "core",
      },
      {
        name: "MySQL",
        icon: <SiMysql className={iconClass} />,
        tier: "additional",
      },
      {
        name: "MongoDB",
        icon: <SiMongodb className={iconClass} />,
        tier: "additional",
      },
      {
        name: "Google Cloud",
        icon: <SiGooglecloud className={iconClass} />,
        tier: "additional",
      },
    ],
  },
  {
    key: "ai",
    title: "AI & Automation",
    subtitle: "AI-assisted engineering and workflow automation",
    description:
      "I use AI throughout product planning, implementation, debugging, documentation, and technical review while keeping architecture and engineering decisions human-led.",
    points: [
      "AI-assisted planning and implementation",
      "Structured multi-agent development workflows",
      "Automation, debugging and documentation",
    ],
    items: [
      {
        name: "OpenAI",
        icon: <SiOpenai className={iconClass} />,
        tier: "core",
      },
      {
        name: "Claude AI",
        icon: <FaRobot className={iconClass} />,
        tier: "core",
      },
      {
        name: "AI-assisted development",
        icon: <FaLightbulb className={iconClass} />,
        tier: "core",
      },
      {
        name: "Agentic workflows",
        icon: <FaProjectDiagram className={iconClass} />,
        tier: "core",
      },
      {
        name: "Prompt engineering",
        icon: <FaCogs className={iconClass} />,
        tier: "core",
      },
      {
        name: "Workflow automation",
        icon: <FaSyncAlt className={iconClass} />,
        tier: "core",
      },
      {
        name: "Python",
        icon: <FaPython className={iconClass} />,
        tier: "core",
      },
      {
        name: "Gemini AI",
        icon: <FaRobot className={iconClass} />,
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
    subtitle: "Delivery, collaboration and engineering quality",
    description:
      "I use modern engineering tools and collaborative practices to take features from planning through implementation, review, deployment, and continuous improvement.",
    points: [
      "Git-based collaboration and code reviews",
      "CI/CD and deployment workflows",
      "Documentation and cross-functional delivery",
    ],
    items: [
      { name: "Git", icon: <SiGit className={iconClass} />, tier: "core" },
      {
        name: "GitHub",
        icon: <FaGithub className={iconClass} />,
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
        tier: "core",
      },
      {
        name: "Docker",
        icon: <SiDocker className={iconClass} />,
        tier: "core",
      },
      {
        name: "Figma",
        icon: <SiFigma className={iconClass} />,
        tier: "core",
      },
      {
        name: "Vercel",
        icon: <SiVercel className={iconClass} />,
        tier: "core",
      },
      {
        name: "Render",
        icon: <SiRender className={iconClass} />,
        tier: "core",
      },
      {
        name: "Code Reviews",
        icon: <FaCheckCircle className={iconClass} />,
        tier: "core",
      },
      {
        name: "CI/CD",
        icon: <FaSyncAlt className={iconClass} />,
        tier: "core",
      },
      {
        name: "Technical Documentation",
        icon: <FaBook className={iconClass} />,
        tier: "additional",
      },
      {
        name: "Agile Delivery",
        icon: <FaTasks className={iconClass} />,
        tier: "additional",
      },
      {
        name: "Product Collaboration",
        icon: <FaUsers className={iconClass} />,
        tier: "additional",
      },
      {
        name: "Sanity",
        icon: <SiSanity className={iconClass} />,
        tier: "additional",
      },
      {
        name: "Stripe",
        icon: <SiStripe className={iconClass} />,
        tier: "additional",
      },
      {
        name: "Google Analytics",
        icon: <SiGoogleanalytics className={iconClass} />,
        tier: "additional",
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
