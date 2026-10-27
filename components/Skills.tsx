"use client";

import { motion } from "framer-motion";
import SkillStackShowcase, { type SkillCategory } from "./SkillStackShowcase";
import SectionTitle from "./SectionTitle";
import { StackedConnector, useReveal } from "./CodeWindow";

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
      { name: "React", tier: "core" },
      {
        name: "TypeScript",
       
        tier: "core",
      },
      {
        name: "Next.js",
       
        tier: "core",
      },
      {
        name: "JavaScript",
       
        tier: "core",
      },
      {
        name: "Tailwind CSS",
       
        tier: "core",
      },
      {
        name: "Accessibility",
       
        tier: "core",
      },
      {
        name: "Component architecture",
       
        tier: "core",
      },
      {
        name: "HTML5",
       
        tier: "core",
      },
      {
        name: "CSS3",
       
        tier: "core",
      },
      {
        name: "SASS",
       
        tier: "core",
      },
      {
        name: "Bootstrap",
       
        tier: "additional",
      },
      {
        name: "Redux Toolkit",
       
        tier: "core",
      },
      {
        name: "Framer Motion",
       
        tier: "core",
      },
      {
        name: "Mobile-first UI",
       
        tier: "core",
      },
      {
        name: "Angular",
       
        tier: "additional",
      },
      {
        name: "Svelte",
       
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
      { name: "Node.js", tier: "core" },
      {
        name: "TypeScript",
       
        tier: "core",
      },
      {
        name: "Express.js",
       
        tier: "core",
      },
      {
        name: "REST API",
       
        tier: "core",
      },
      {
        name: "Supabase",
       
        tier: "core",
      },
      {
        name: "JWT Auth",
       
        tier: "core",
      },
      {
        name: "MongoDB",
       
        tier: "core",
      },
      {
        name: "PostgreSQL",
       
        tier: "core",
      },
      {
        name: "Docker",
       
        tier: "core",
      },
      {
        name: "Python",
       
        tier: "core",
      },
      {
        name: "FastAPI",
       
        tier: "core",
      },
      {
        name: "Clerk Auth",
       
        tier: "core",
      },
      {
        name: "File uploads",
       
        tier: "additional",
      },
      {
        name: "Webhooks",
       
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
       
        tier: "core",
      },
      { name: "SQL", tier: "core" },
      {
        name: "Docker",
       
        tier: "core",
      },
      {
        name: "Cloudflare",
       
        tier: "core",
      },
      {
        name: "Firebase",
       
        tier: "core",
      },
      {
        name: "Prisma",
       
        tier: "core",
      },
      {
        name: "MySQL",
       
        tier: "additional",
      },
      {
        name: "MongoDB",
       
        tier: "additional",
      },
      {
        name: "Google Cloud",
       
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
       
        tier: "core",
      },
      {
        name: "Claude AI",
       
        tier: "core",
      },
      {
        name: "AI-assisted development",
       
        tier: "core",
      },
      {
        name: "Agentic workflows",
       
        tier: "core",
      },
      {
        name: "Prompt engineering",
       
        tier: "core",
      },
      {
        name: "Workflow automation",
       
        tier: "core",
      },
      {
        name: "Python",
       
        tier: "core",
      },
      {
        name: "Gemini AI",
       
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
       
        tier: "core",
      },
      {
        name: "React",
       
        tier: "core",
      },
      {
        name: "Next.js",
       
        tier: "core",
      },
      {
        name: "Web3 Auth",
       
        tier: "core",
      },
      {
        name: "Ethereum",
       
        tier: "additional",
      },
      {
        name: "web3.js",
       
        tier: "additional",
      },
      {
        name: "Solidity",
       
        tier: "additional",
      },
      {
        name: "Alchemy",
       
        tier: "additional",
      },
      {
        name: "Hardhat",
       
        tier: "additional",
      },
      {
        name: "IPFS",
       
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
      { name: "Git", tier: "core" },
      {
        name: "GitHub",
       
        tier: "core",
      },
      {
        name: "Postman",
       
        tier: "core",
      },
      {
        name: "GitHub Actions",
       
        tier: "core",
      },
      {
        name: "Docker",
       
        tier: "core",
      },
      {
        name: "Figma",
       
        tier: "core",
      },
      {
        name: "Vercel",
       
        tier: "core",
      },
      {
        name: "Render",
       
        tier: "core",
      },
      {
        name: "Code Reviews",
       
        tier: "core",
      },
      {
        name: "CI/CD",
       
        tier: "core",
      },
      {
        name: "Technical Documentation",
       
        tier: "additional",
      },
      {
        name: "Agile Delivery",
       
        tier: "additional",
      },
      {
        name: "Product Collaboration",
       
        tier: "additional",
      },
      {
        name: "Sanity",
       
        tier: "additional",
      },
      {
        name: "Stripe",
       
        tier: "additional",
      },
      {
        name: "Google Analytics",
       
        tier: "additional",
      },
    ],
  },
];

export default function Skills() {
  const reveal = useReveal();

  return (
    <div className="w-full">
      <SectionTitle
        text="Skills"
        headingId="skills-heading"
        gapSm={38}
        gapMd={52}
        gapLg={66}
      />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 px-6 pt-6 pb-6 md:px-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-center lg:gap-14 lg:px-14 lg:pt-10">
        <motion.div className="lg:col-start-2 lg:row-start-1" {...reveal(0)}>
          <p className="font-display text-4xl leading-[1.05] md:text-5xl">
            <span className="block text-[var(--gold)]">Core strengths</span>
            <span className="block text-[var(--text-primary)]">
              and working knowledge.
            </span>
          </p>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
            Across frontend, backend, database &amp; cloud, AI &amp;
            automation, Web3, and tools &amp; workflow.
          </p>
        </motion.div>

        <StackedConnector />

        <div className="lg:col-start-1 lg:row-start-1">
          <SkillStackShowcase categories={skillCategories} />
        </div>
      </div>
    </div>
  );
}
