# Kabiru Shaibu

Frontend-focused Full-Stack Product Engineer building accessible SaaS and Web3 products with React, TypeScript, Next.js, Node.js, Supabase and Solana.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

---

## About This Repository

This repository powers my personal portfolio website — the central place where I present my engineering work, product thinking and technical standards.

The site showcases:

- Selected product and engineering projects
- Frontend craftsmanship and full-stack capability
- Web3 and SaaS-oriented work
- Skills organised by depth of experience
- Contact options, scheduling and CV download

The implementation itself is part of the portfolio: dark editorial UI, typed React architecture, accessible interactions and a production Next.js App Router setup.

---

## About Me

I am a frontend-focused full-stack product engineer. I care about shipping interfaces and systems that are clear to use, maintainable as they grow, and solid enough for real production environments.

My approach prioritises:

- Solving real product problems before adding complexity
- Maintainable, typed codebases
- Accessibility and usable interaction design
- Security-conscious authentication and data flows
- Scalable structure without premature over-engineering
- Product thinking from idea through release

---

## What You'll Find

| Area | Description |
| --- | --- |
| **Projects** | Featured and supporting work across Web3, marketplaces, full-stack apps and community products |
| **Skills** | Core strengths and working knowledge across frontend, backend, data, Web3, AI and tooling |
| **Frontend** | React, TypeScript, Next.js, Tailwind CSS, accessible UI and component architecture |
| **Backend** | Node.js, Fastify/Express-style APIs, authentication and frontend-to-backend data flow |
| **Web3** | Solana-oriented product work, wallet authentication and on-chain loyalty systems |
| **AI** | Agent workflows and model API integration in selected projects |
| **Architecture** | Reusable components, shared design tokens, project data abstraction and responsive layouts |
| **Contact** | Email, LinkedIn, GitHub, Calendly booking and contact form |
| **Resume** | Downloadable CV available from the live site |

---

## Featured Projects

### Stay Loyal

Stay Loyal is a B2B SaaS loyalty infrastructure for Solana NFT communities, enabling staking, XP progression, NFT evolution, missions, rewards, analytics, and founder dashboards.

- **Live:** [stayloyal.xyz](https://stayloyal.xyz/)
- **Code:** [github.com/kabornblack/stay-loyal](https://github.com/kabornblack/stay-loyal)
- **Stack:** Solana · TypeScript · Supabase · PostgreSQL · Metaplex

### PredMakit

Prediction-market product where users place YES/NO positions using TOKEN or NAIRA. Vite frontend with a Fastify/Node.js API layer and Supabase for application data and authentication.

- **Live:** [predmakit.com](https://predmakit.com)
- **Code:** [github.com/kabornblack/predmakit](https://github.com/kabornblack/predmakit)
- **Stack:** Fastify · Node.js · Vite · Supabase · TypeScript

### Swapify

Barter and donation marketplace focused on clear information architecture, responsive React/Next.js UI and a practical path from listing to discovery.

- **Live:** [swapify.ee](https://www.swapify.ee)
- **Code:** [github.com/kabornblack/swapify-public-repo](https://github.com/kabornblack/swapify-public-repo)
- **Stack:** Next.js · React · TypeScript · Tailwind CSS

### Other showcased work

| Project | Focus |
| --- | --- |
| **Global Update** | Next.js / TypeScript interface for structured global information browsing |
| **AI Agent Builder** | Configurable AI agent workflows with FastAPI, Streamlit and model APIs |
| **Grey Geese** | Small-business site delivered from design through a production Next.js frontend |
| **C-U School** | Educational site with multi-language support on React / Next.js / TypeScript |
| **Upto-date** | Community fact-sharing app with React and Supabase |

---

## Technology Stack

### This portfolio (implementation)

| Layer | Technologies |
| --- | --- |
| Framework | Next.js 15 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 4, CSS design tokens |
| Motion | Framer Motion, tsparticles (hero accents) |
| Forms & booking | EmailJS, react-calendly |
| UI utilities | clsx, tailwind-merge, react-icons, Heroicons |

### Frontend

| Technology | Role |
| --- | --- |
| React | UI and component architecture |
| TypeScript | Typed application code |
| Next.js | App Router, routing, image and font optimisation |
| JavaScript | Core language and tooling |
| Tailwind CSS | Utility-first styling and responsive layout |
| Framer Motion | Section transitions and interaction polish |

### Backend

| Technology | Role |
| --- | --- |
| Node.js | Server-side application services |
| Fastify / Express | API and service layers in product work |
| TypeScript | Typed APIs and shared contracts |
| REST APIs | Frontend-to-backend integration |
| Authentication | JWT / Clerk patterns where used in product work |

### Database & Cloud

| Technology | Role |
| --- | --- |
| PostgreSQL | Relational data |
| Supabase | Backend services and app data |
| MongoDB | Document-oriented data where used |
| Docker | Containerised workflows |
| Vercel / Render | Hosting and deployment targets in project work |

### Web3

| Technology | Role |
| --- | --- |
| Solana | On-chain product work (Stay Loyal) |
| Metaplex | NFT / loyalty tooling |
| TypeScript | Application layer around chain interactions |
| Wallet authentication | Secure client connection flows |

### AI

| Technology | Role |
| --- | --- |
| Python | AI / automation services |
| FastAPI | API layer for agent tooling |
| Streamlit | Rapid AI product surfaces |
| OpenAI / Gemini | Model API integration in selected work |

### Developer tools

| Technology | Role |
| --- | --- |
| Git / GitHub | Version control and collaboration |
| ESLint | Static analysis for this repository |
| Postman | API exploration in product workflows |
| Figma | Design collaboration where relevant |

---

## Design Principles

The portfolio is intentionally dark, editorial and restrained — navy surfaces, gold accent, Protest Revolution for brand headings and Quicksand for readable UI text.

| Principle | How it shows up |
| --- | --- |
| Responsive | Layouts adapt from ~320px through wide desktop |
| Accessible | Labels, focus states, accordion ARIA, reduced-motion paths |
| Performance | `next/image`, selective client boundaries, controlled animation cost |
| Typography | Display font reserved for brand; body/UI stay readable |
| Mobile-first | Stacked sections, touch-friendly targets, usable navigation |
| Consistency | Shared buttons, surfaces, focus rings and card patterns |
| SEO | Professional metadata for home and `/portfolio` |
| App Router | Next.js App Router for routing and metadata |

---

## Engineering Highlights

Implementation details that reflect how I build product software:

- **Component architecture** — Section components for Hero, About, Skills, Portfolio and Contact, with shared UI primitives
- **Reusable project cards** — One `ProjectCard` model for featured and supporting work
- **Project data abstraction** — Central `projectData` source for titles, tags, links and featured ordering
- **Design system tokens** — CSS variables for surfaces, gold accent, borders, radius and focus
- **Responsive layouts** — CSS-first breakpoints; featured cards densify information without hover-only content
- **Motion with restraint** — Framer Motion for section reveals; marquee and particles respect reduced motion
- **Accessibility** — Semantic landmarks, labelled icon links, form labels, live status region, keyboard-friendly nav
- **TypeScript throughout** — Strict typing for data models and component props
- **Image optimisation** — `next/image` with meaningful `sizes` and priority for primary featured media
- **Contact paths** — EmailJS form, Calendly embed, mailto and CV download without exposing private service secrets in UI copy

---

## Repository Structure

```text
kabiru/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Home composition
│   ├── globals.css         # Design tokens and shared styles
│   ├── favicon.ico
│   └── portfolio/
│       └── page.tsx        # Dedicated portfolio route
├── components/
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── SkillStackShowcase.tsx
│   ├── Portfolio.tsx
│   ├── PortfolioShowcase.tsx
│   ├── ProjectCard.tsx
│   ├── Header.tsx
│   ├── Contact.tsx
│   ├── ContactForm.tsx
│   ├── CalendlyBooking.tsx
│   ├── Socials.tsx
│   ├── data/
│   │   └── projectData.ts  # Projects, categories, featured order
│   └── ui/                 # Shared visual primitives
├── lib/
│   ├── contact.ts          # Public email and CV paths
│   ├── scroll.ts           # Hash scrolling for nested layout
│   └── utils.ts
├── public/                 # Static assets, screenshots, CV PDF
├── package.json
└── README.md
```

---

## Local Development

Prerequisites: Node.js and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful scripts:

```bash
npm run lint    # ESLint
npm run build   # Production build
npm run start   # Serve the production build
```

Contact form submission expects EmailJS public environment variables in `.env.local` (service ID, template ID and public key). Those values are not committed.

---

## Deployment

The portfolio is a standard Next.js App Router application and is ready for production deployment on Vercel and compatible with any modern Next.js hosting platform.

Build output is generated with:

```bash
npm run build
```

Configure the same public EmailJS variables in the host environment so the contact form continues to work after deploy.

---

## Why I Built This

This portfolio is more than a formatted résumé.

I built it to show how I think about products, how I structure interfaces and how I hold an engineering standard from layout through accessibility and typed implementation. The projects are the evidence; the site is the craft wrapper around that evidence — intentional hierarchy, reusable components and production-minded details rather than a generic template.

---

## Contact

| Channel | Link |
| --- | --- |
| **Email** | [shaibu.kabiru@email.com](mailto:shaibu.kabiru@email.com) |
| **LinkedIn** | [linkedin.com/in/kabiru-shaibu-a81082164](https://www.linkedin.com/in/kabiru-shaibu-a81082164/) |
| **GitHub** | [github.com/kabornblack](https://github.com/kabornblack) |
| **CV** | Download from the live site (`/Kabiru-Shaibu-Frontend-Engineer-CV.pdf`) |
| **Portfolio** | Deployed Next.js application from this repository |

You can also schedule a meeting through Calendly from the Contact section of the site.

---

## License

This project is licensed under the [MIT License](./LICENSE).
