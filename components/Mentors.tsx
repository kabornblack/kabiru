"use client";

import {
  CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { FaGlobe } from "react-icons/fa";

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

type Mentor = {
  name: string;
  tagline: string;
  description: string;
  host: string;
  focus: string;
  website: string;
  image: string;
  imageAlt: string;
};

const mentors: Mentor[] = [
  {
    name: "Zero to Full Stack Hero",
    tagline: "PAPAFAM",
    description:
      "Sonny Sangha’s full-stack learning community — real-world builds, coaching energy, and developers shipping together.",
    host: "Sonny Sangha",
    focus: "Full-stack · Next.js · Product builds",
    website: "https://www.papareact.com/course",
    image: "/mentors/sonny-sangha.png",
    imageAlt: "Portrait of Sonny Sangha",
  },
  {
    name: "Jonas Schmedtmann",
    tagline: "Web Dev Done Right",
    description:
      "Jonas Schmedtmann’s teaching world for HTML, CSS, JavaScript, React and Node — structured courses and student community.",
    host: "Jonas Schmedtmann",
    focus: "JavaScript · React · Node.js · CSS",
    website: "https://jonas.io/",
    image: "/mentors/jonas-schmedtmann.png",
    imageAlt: "Portrait of Jonas Schmedtmann",
  },
  {
    name: "Zero To Mastery",
    tagline: "ZTM Academy",
    description:
      "A career-focused developer community around Zero To Mastery Academy — courses, accountability, and job-ready skill paths.",
    host: "Andrei Neagoie",
    focus: "Career paths · Full-stack · AI · Job prep",
    website: "https://zerotomastery.io/community/",
    image: "/mentors/andrei-neagoie.png",
    imageAlt: "Portrait of Andrei Neagoie",
  },
  {
    name: "Code with Mosh",
    tagline: "Programming with Mosh",
    description:
      "Mosh Hamedani’s clear, practical courses and learning paths — from fundamentals to professional frontend, backend and mobile.",
    host: "Mosh Hamedani",
    focus: "Clean code · React · Node · Career skills",
    website: "https://codewithmosh.com/",
    image: "/mentors/mosh-hamedani.png",
    imageAlt: "Portrait of Mosh Hamedani",
  },
  {
    name: "The App Brewery",
    tagline: "Dr. Angela Yu",
    description:
      "Angela Yu’s App Brewery — beginner-friendly bootcamp-style learning across web and mobile, built around hands-on projects.",
    host: "Dr. Angela Yu",
    focus: "Web · iOS · Full-stack · Projects",
    website: "https://www.appbrewery.com/",
    image: "/mentors/angela-yu.png",
    imageAlt: "Portrait of Dr. Angela Yu",
  },
];

const GLOW_TIMINGS = [
  { duration: 10, delay: 0, reverse: false },
  { duration: 13.5, delay: 1.8, reverse: true },
  { duration: 8.5, delay: 3.2, reverse: false },
  { duration: 12, delay: 0.9, reverse: true },
  { duration: 15, delay: 2.4, reverse: false },
] as const;

type MentorCardProps = {
  mentor: Mentor;
  glowDuration: number;
  glowDelay: number;
  glowReverse: boolean;
  reducedMotion: boolean | null;
  duplicate?: boolean;
};

function MentorCard({
  mentor,
  glowDuration,
  glowDelay,
  glowReverse,
  reducedMotion,
  duplicate = false,
}: MentorCardProps) {
  const glowStyle = {
    "--mentor-glow-duration": `${glowDuration}s`,
    "--mentor-glow-delay": `${glowDelay}s`,
    "--mentor-glow-duration-alt": `${glowDuration * 1.35}s`,
  } as CSSProperties;

  return (
    <article
      className="mentor-card h-full w-[min(86vw,22.5rem)] shrink-0 text-left"
      aria-hidden={duplicate ? true : undefined}
    >
      {!reducedMotion && (
        <>
          <span
            className={`mentor-card-glow${glowReverse ? " mentor-card-glow--reverse" : ""}`}
            style={glowStyle}
            aria-hidden="true"
          />
          <span
            className={`mentor-card-glow mentor-card-glow--secondary${glowReverse ? "" : " mentor-card-glow--reverse"}`}
            style={glowStyle}
            aria-hidden="true"
          />
        </>
      )}

      <div className="mentor-card-inner">
        <div className="flex h-full min-h-[22rem] flex-col">
          <div className="flex flex-1 flex-col px-5 pt-5 pb-4 md:px-6 md:pt-6">
            <p className="text-[10px] tracking-[0.18em] text-[var(--gold)] uppercase">
              {mentor.tagline}
            </p>
            <h3 className="font-display mt-2 text-lg tracking-[0.08em] text-[var(--text-primary)] uppercase md:text-xl">
              {mentor.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
              {mentor.description}
            </p>
          </div>

          <div className="mt-auto flex min-h-[11.5rem] border-t border-[var(--border-subtle)]">
            <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 px-5 py-4 md:px-6">
              <div className="space-y-1.5">
                <p className="text-xs tracking-[0.08em] text-[var(--text-muted)] uppercase">
                  Mentored by{" "}
                  <span className="text-[var(--gold)]">{mentor.host}</span>
                </p>
                <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                  {mentor.focus}
                </p>
              </div>

              <a
                href={mentor.website}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={duplicate ? -1 : undefined}
                className="focus-ring btn-primary !min-h-10 !w-fit !px-3.5 !py-2 !text-[11px]"
                aria-label={`Visit ${mentor.name} website`}
              >
                <FaGlobe className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
                Website
              </a>
            </div>

            <div className="flex w-[7.25rem] shrink-0 items-center justify-center self-stretch px-2 py-3 sm:w-32 md:w-36">
              <div className="relative aspect-square h-[90%] max-h-[9.75rem] w-auto overflow-hidden rounded-full bg-transparent">
                <Image
                  src={mentor.image}
                  alt={duplicate ? "" : mentor.imageAlt}
                  fill
                  sizes="156px"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Mentors() {
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
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

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
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("scroll", handleScroll);
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, [reducedMotion]);

  const letters = useMemo(() => "Mentors".split(""), []);
  const letterCount = letters.length;
  const letterGap = screenWidth < 640 ? 34 : screenWidth < 1024 ? 46 : 58;

  const letterData = useMemo(() => {
    return letters.map((letter, index) => {
      const finalX = (index - (letterCount - 1) / 2) * letterGap;

      let startX = finalX;

      if (index === 0) {
        startX = -screenWidth / 2;
      }

      if (index === letterCount - 1) {
        startX = screenWidth / 2;
      }

      return {
        letter,
        startX,
        finalX,
        startScale: 0.3,
        finalScale: 1,
      };
    });
  }, [letters, letterCount, letterGap, screenWidth]);

  const progress = reducedMotion ? 1 : easeOutCubic(globalProgress);
  const loopItems = useMemo(() => [...mentors, ...mentors], []);

  const renderCards = (items: Mentor[], duplicated = false) =>
    items.map((mentor, index) => {
      const timing = GLOW_TIMINGS[index % mentors.length] ?? GLOW_TIMINGS[0];

      return (
        <MentorCard
          key={`${mentor.name}-${duplicated ? "b" : "a"}-${index}`}
          mentor={mentor}
          glowDuration={timing.duration}
          glowDelay={timing.delay}
          glowReverse={timing.reverse}
          reducedMotion={reducedMotion}
          duplicate={duplicated || index >= mentors.length}
        />
      );
    });

  return (
    <section
      id="mentors"
      aria-labelledby="mentors-heading"
      className="w-full bg-[var(--page-bg)] pb-8"
    >
      <div ref={dividerRef} className="section-title-wrap max-w-6xl">
        <div className="pointer-events-none absolute inset-x-6 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[rgba(184,134,11,0.3)] to-transparent" />

        <div className="relative h-14 w-full md:h-16">
          <h2 id="mentors-heading" className="sr-only">
            Mentors
          </h2>

          {letterData.map(
            ({ letter, startX, finalX, startScale, finalScale }, index) => {
              const currentX = startX + (finalX - startX) * progress;
              const scale = startScale + (finalScale - startScale) * progress;

              return (
                <span
                  key={`${letter}-${index}`}
                  aria-hidden="true"
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

      <div className="mx-auto w-full max-w-6xl px-6 pb-2 md:px-10 lg:px-14">
        <p className="mx-auto mb-7 max-w-2xl text-center text-sm leading-relaxed text-[var(--text-muted)]">
          Mentors and teachers whose courses and communities have shaped how I
          learn, build, and ship as a product engineer.
        </p>
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 md:px-10 lg:px-14">
        {reducedMotion ? (
          <div className="overflow-x-auto pb-2 [scrollbar-width:thin]">
            <div className="flex w-max gap-4">{renderCards(mentors)}</div>
          </div>
        ) : (
          <div className="mentor-marquee marquee-fade relative overflow-hidden">
            <div className="mentor-marquee-track">
              {renderCards(loopItems)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
