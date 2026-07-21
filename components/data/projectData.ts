export const projectCategories = [
  "E-commerce",
  "FinTech",
  "Gaming",
  "Web3",
  "AI & Productivity",
  "Marketplace Platforms",
  "Food & Grocery",
  "Entertainment",
  "Social & Community",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  category: ProjectCategory;
  title: string;
  description: string;
  githubUrl?: string;
  liveUrl: string;
  tags: string[];
  image: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    category: "Web3",
    title: "Stay Loyal",
    description:
      "NFT communities struggle to retain holders beyond short-term hype. Stay Loyal is a Solana loyalty engine that turns staking and engagement into on-chain reputation and XP, with wallet authentication and Supabase/PostgreSQL-backed data using Metaplex tooling.",
    githubUrl: "https://github.com/kabornblack/stay-loyal",
    liveUrl: "https://stayloyal.xyz/",
    tags: ["Solana", "TypeScript", "Supabase", "PostgreSQL", "Metaplex"],
    image: "/stayloyal.png",
    featured: true,
  },
  {
    category: "Gaming",
    title: "PredMakit",
    description:
      "A prediction-market product where users place YES/NO positions using TOKEN or NAIRA. Built with a Vite frontend, Fastify/Node.js API layer, and Supabase for application data and authentication.",
    githubUrl: "https://github.com/kabornblack/predmakit",
    liveUrl: "https://predmakit.com",
    tags: ["Fastify", "Node.js", "Vite", "Supabase", "TypeScript"],
    image: "/predmakit.png",
    featured: true,
  },
  {
    category: "Marketplace Platforms",
    title: "Swapify",
    description:
      "A barter and donation marketplace for exchanging or giving unused items. Focused on marketplace information architecture, responsive React/Next.js UI, and a clear path from listing to discovery.",
    githubUrl: "https://github.com/kabornblack/swapify-public-repo",
    liveUrl: "https://www.swapify.ee",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    image: "/swapify.png",
    featured: true,
  },
  {
    category: "Social & Community",
    title: "Global Update",
    description:
      "A Next.js and TypeScript interface for browsing global information in a clean, structured layout focused on readability and fast navigation.",
    githubUrl: "https://github.com/kabornblack/hello-world",
    liveUrl: "https://global-update-nine.vercel.app/",
    tags: ["Next.js", "React", "TypeScript"],
    image: "/global.png",
  },
  {
    category: "AI & Productivity",
    title: "AI Agent Builder",
    description:
      "A plug-and-play AI agent builder that connects model APIs with a FastAPI backend for configurable agent workflows.",
    githubUrl: "https://github.com/kabornblack/AI-Agent",
    liveUrl: "https://ai-agent-jsu7p4gzsdijlmymy9sdpp.streamlit.app/",
    tags: ["Python", "FastAPI", "Streamlit", "Google Gemini", "SQLAlchemy"],
    image: "/ai.png",
  },
  {
    category: "Social & Community",
    title: "Grey Geese",
    description:
      "A small-business website taken from design through production with a responsive Next.js frontend.",
    liveUrl: "https://grey-geese.vercel.app/",
    tags: ["Next.js", "React", "TypeScript"],
    image: "/image.png",
  },
  {
    category: "Social & Community",
    title: "C-U School",
    description:
      "An educational site with multi-language support, built as a typed React/Next.js frontend for clear content navigation.",
    githubUrl: "https://github.com/kabornblack/C-U-Language-School",
    liveUrl: "https://www.cuilschool.ee/",
    tags: ["Next.js", "React", "TypeScript"],
    image: "/cuschool.png",
  },
  {
    category: "Social & Community",
    title: "Upto-date",
    description:
      "A community fact-sharing app where users publish updates and vote, backed by React and Supabase.",
    githubUrl: "https://github.com/kabornblack/Upto-date",
    liveUrl: "https://uptodate-kabbi.netlify.app/",
    tags: ["React", "Supabase", "JavaScript"],
    image: "/uptodate.png",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export const FEATURED_ORDER = ["Stay Loyal", "PredMakit", "Swapify"] as const;

export function getFeaturedProjects(): Project[] {
  return FEATURED_ORDER.map((title) =>
    projects.find((project) => project.title === title),
  ).filter((project): project is Project => Boolean(project));
}
