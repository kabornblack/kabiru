"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { projects } from "./data/projectData";
import Header from "@/components/Header";

export default function Portfolio() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Always call useTransform - critical for React hooks consistency
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Add state to track component mount status
  const [isMounted, setIsMounted] = useState(false);
  // Track window width for responsive behaviors
  const [windowWidth, setWindowWidth] = useState(0);

  // Use effect to set mounted state and handle window resize
  useEffect(() => {
    setIsMounted(true);
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      setIsMounted(false);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  // Determine if we're on desktop
  const isDesktop = windowWidth >= 1024;

  return (
    <div className="w-full">
      <Header />
      <div ref={containerRef} className="px-6 py-48 max-w-6xl mx-auto">
        <div className="flex flex-col pt-16 text-center">
          <h1 className="font-['Playfair_Display'] text-[#B8860B] font-bold text-2xl md:text-4xl tracking-[5px] leading-6 uppercase relative inline-block opacity-80 pb-1">
            Portfolio
            <div className="absolute left-0 -bottom-1 w-full h-[1px] bg-gradient-to-r from-transparent via-[#B8860B] to-transparent"></div>
          </h1>
        </div>

        <motion.div
          style={{
            opacity: isMounted ? 1 : scrollOpacity,
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pt-20 z-10 justify-items-center"
        >
          {projects.map((project, index) =>
            // Apply different layouts based on screen size
            isDesktop ? (
              // Desktop layout with hover effect - original design
              <motion.div
                key={`desktop-${project.title}`}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                // whileHover="hover"
                viewport={{ once: true, margin: "-50px" }}
                className="relative w-[250px] h-[250px] overflow-hidden group mx-auto"
              >
                {/* Square image container */}
                <div className="w-full h-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={600}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDAR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full h-full object-center"
                  />
                </div>

                {/* Overlay content that slides up on hover */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 bg-black/90 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  <h3 className="text-2xl font-bold mb-2 text-[#B8860B]">
                    {project.title}
                  </h3>

                  <p className="text-[#B8860B]/80 mb-4 mt-6 text-sm">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs border border-[#B8860B]/50 text-[#B8860B]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 mt-auto">
                    {project.githubUrl ? (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        className="text-[#B8860B] hover:text-[#D4A017] transition-colors"
                      >
                        <div className="transform hover:scale-125 hover:rotate-12 transition-transform duration-300">
                          <FaGithub className="w-6 h-6" />
                        </div>
                      </Link>
                    ) : (
                      <div className="text-[#B8860B]/20 cursor-not-allowed">
                        <FaGithub className="w-6 h-6" />
                      </div>
                    )}
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      className="text-[#B8860B] hover:text-[#D4A017] transition-colors"
                    >
                      <div className="transform hover:scale-125 hover:rotate-12 transition-transform duration-300">
                        <FaExternalLinkAlt className="w-5 h-5" />
                      </div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ) : (
              // Mobile/Tablet layout - card with image on top and info below
              <motion.div
                key={`mobile-${project.title}`}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="w-full max-w-[250px] overflow-hidden mx-auto bg-black/90 rounded-md shadow-xl"
              >
                {/* Image at the top */}
                <div className="w-full h-[180px] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={600}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDAR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full h-full object-center"
                  />
                </div>

                {/* Info content below the image */}
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-4 text-[#B8860B]">
                    {project.title}
                  </h3>

                  <p className="text-[#B8860B]/80 mb-4 text-sm">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs border border-[#B8860B]/50 text-[#B8860B]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 mt-4">
                    {project.githubUrl ? (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        className="text-[#B8860B] hover:text-[#D4A017] transition-colors"
                      >
                        <div className="transform hover:scale-125 transition-transform duration-300">
                          <FaGithub className="w-6 h-6" />
                        </div>
                      </Link>
                    ) : (
                      // <div className="text-[#B8860B] cursor-not-allowed">
                      <div className="text-[#B8860B]/20 cursor-not-allowed">
                        <FaGithub className="w-6 h-6" />
                      </div>
                    )}
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      className="text-[#B8860B] hover:text-[#D4A017] transition-colors"
                    >
                      <div className="transform hover:scale-125 transition-transform duration-300">
                        <FaExternalLinkAlt className="w-5 h-5" />
                      </div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </motion.div>
      </div>
    </div>
  );
}
