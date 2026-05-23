"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { projects, projectCategories } from "./data/projectData";
import Header from "@/components/Header";

export default function Portfolio() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scrollOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const [isMounted, setIsMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      setIsMounted(false);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isDesktop = windowWidth >= 1024;

  const groupedProjects = projectCategories
    .map((category) => ({
      category,
      projects: projects.filter((project) => project.category === category),
    }))
    .filter((group) => group.projects.length > 0);

  const cardVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.06,
        duration: 0.45,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="w-full min-h-screen font-protest bg-gray-950">
      <Header />

      <div
        ref={containerRef}
        className="w-full max-w-6xl mx-auto px-5 md:px-8 py-28"
      >
        <div className="text-center pt-10">
          <h1 className="font-protest text-[#B8860B] font-bold text-2xl md:text-4xl tracking-[6px] uppercase relative inline-block opacity-90 pb-2">
            Portfolio
            {/* <span className="absolute left-0 -bottom-1 w-full h-[1px] bg-gradient-to-r from-transparent via-[#B8860B] to-transparent" /> */}
          </h1>
        </div>

        <motion.div
          style={{ opacity: isMounted ? 1 : scrollOpacity }}
          className="pt-10 space-y-20"
        >
          {groupedProjects.map((group) => (
            <section key={group.category} className="w-full">
              <div className="mb-8 flex items-center justify-center gap-5">
                <div className="hidden md:block h-px w-24 bg-gradient-to-r from-transparent to-[#B8860B]/50" />

                <h2 className="font-protest text-[#B8860B] font-bold text-lg md:text-2xl tracking-[7px] uppercase text-center">
                  {group.category}
                </h2>

                <div className="hidden md:block h-px w-24 bg-gradient-to-l from-transparent to-[#B8860B]/50" />
              </div>

              <div className="flex flex-wrap justify-center gap-4 md:gap-5">
                {group.projects.map((project, index) =>
                  isDesktop ? (
                    <motion.div
                      key={`desktop-${project.title}`}
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-40px" }}
                      className="relative w-[210px] h-[210px] overflow-hidden group border border-[#B8860B]/20 bg-black/40 shadow-lg shadow-black/30"
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={500}
                        height={500}
                        loading="lazy"
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black/90 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                        <h3 className="text-sm font-bold text-[#B8860B] leading-tight">
                          {project.title}
                        </h3>

                        <p className="text-[#B8860B]/75 mt-2 text-[10px] leading-snug line-clamp-3">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {project.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="px-1.5 py-[2px] text-[8px] border border-[#B8860B]/40 text-[#B8860B]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex gap-3 mt-4">
                          {project.githubUrl ? (
                            <Link
                              href={project.githubUrl}
                              target="_blank"
                              className="text-[#B8860B] hover:text-[#D4A017]"
                            >
                              <FaGithub className="w-4 h-4" />
                            </Link>
                          ) : (
                            <div className="text-[#B8860B]/20 cursor-not-allowed">
                              <FaGithub className="w-4 h-4" />
                            </div>
                          )}

                          <Link
                            href={project.liveUrl}
                            target="_blank"
                            className="text-[#B8860B] hover:text-[#D4A017]"
                          >
                            <FaExternalLinkAlt className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`mobile-${project.title}`}
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="w-full max-w-[210px] overflow-hidden bg-black/80 border border-[#B8860B]/20 shadow-lg"
                    >
                      <div className="w-full h-[135px] overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={500}
                          height={500}
                          loading="lazy"
                          className="w-full h-full object-cover object-center"
                        />
                      </div>

                      <div className="p-3">
                        <h3 className="text-sm font-bold text-[#B8860B]">
                          {project.title}
                        </h3>

                        <p className="text-[#B8860B]/70 mt-2 text-[10px] leading-snug">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {project.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="px-1.5 py-[2px] text-[8px] border border-[#B8860B]/40 text-[#B8860B]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex gap-3 mt-4">
                          {project.githubUrl ? (
                            <Link href={project.githubUrl} target="_blank">
                              <FaGithub className="w-4 h-4 text-[#B8860B]" />
                            </Link>
                          ) : (
                            <FaGithub className="w-4 h-4 text-[#B8860B]/20" />
                          )}

                          <Link href={project.liveUrl} target="_blank">
                            <FaExternalLinkAlt className="w-3.5 h-3.5 text-[#B8860B]" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ),
                )}
              </div>
            </section>
          ))}
        </motion.div>
      </div>
      <footer className="w-full flex justify-center items-center py-10">
        <div className="text-[#B8860B]/20 font-protest text-xs md:text-sm tracking-[6px] uppercase">
          Designed & Built by Kabiru — © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}
