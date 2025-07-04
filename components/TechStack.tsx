"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa";

// ContentSection component for expandable sections with proper TypeScript types
interface ContentSectionProps {
  title: string;
  children: React.ReactNode;
  borderPosition?: "left" | "top";
}

const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  children,
  borderPosition = "left",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const borderClass =
    borderPosition === "top"
      ? "border-t-4 border-[#B8860B]"
      : "border-l-4 border-[#B8860B]";

  return (
    <div className="mb-8 w-full -mt-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between bg-white/20 dark:bg-white/5 hover:bg-white/30 dark:hover:bg-white/10 p-4 rounded-md ${borderClass} group transition-all duration-300 hover:rounded-b-none`}
      >
        {/* Left Triple Arrow Stack */}
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-[#B8860B]/20 group-hover:text-[#D4A017]/20 -mb-1"
          >
            <FaAngleDown />
          </motion.div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="text-[#B8860B]/50 group-hover:text-[#D4A017]/50 -mb-1"
          >
            <FaAngleDown />
          </motion.div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-[#B8860B]/90 group-hover:text-[#D4A017]/90"
          >
            <FaAngleDown />
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="text-[#B8860B] text-lg md:text-xl uppercase leading-6 tracking-[3px] font-hubballi">
          {title}
        </h3>

        {/* Right Triple Arrow Stack */}
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-[#B8860B]/20 group-hover:text-[#D4A017]/20 -mb-1"
          >
            <FaAngleDown />
          </motion.div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="text-[#B8860B]/50 group-hover:text-[#D4A017]/50 -mb-1"
          >
            <FaAngleDown />
          </motion.div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-[#B8860B] group-hover:text-[#D4A017]"
          >
            <FaAngleDown />
          </motion.div>
        </div>
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
            <div className="p-4 bg-gradient-to-b from-white/20 to-black/10 rounded-b-md mt-1 relative text-center">
              <div className="text-lg text-gray-300 dark:text-white font-hubballi text-center">
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Animated Image Slider Component
const AnimatedImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const images = [
    {
      src: "/react.png",
      alt: "type",
    },
    {
      src: "/axios.PNG",
      alt: "props",
    },
    {
      src: "/ts.png",
      alt: "onnext",
    },
    {
      src: "/next.png",
      alt: "effect",
    },
  ];

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length, isAutoPlaying]);

  // Functions to control slides
  const handleNext = () => {
    setIsAutoPlaying(false);
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Animation variants
  const slideVariants = {
    hiddenRight: {
      x: "100%",
      opacity: 0,
    },
    hiddenLeft: {
      x: "-100%",
      opacity: 0,
    },
    visible: {
      x: "0",
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <div className="w-full px-2 lg:pl-6">
      <div className="relative h-80 md:h-96 lg:h-[450px] w-full overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial={direction > 0 ? "hiddenRight" : "hiddenLeft"}
            animate="visible"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-black/40 p-2 text-white hover:bg-black/60"
          aria-label="Previous image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-black/40 p-2 text-white hover:bg-black/60"
          aria-label="Next image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>

      {/* Dots indicator */}
      <div className="mt-6 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsAutoPlaying(false);
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? "bg-[#B8860B]" : "bg-black dark:bg-black"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function TechStack() {
  return (
    <div className="w-full pt-10">
      <ContentSection
        title="Tech Stack, Libraries and Frameworks"
        borderPosition="top"
      >
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row gap-8 lg:gap-2 justify-evenly items-start py-4 px-1 md:px-10 mb-20 bg-transparent"
        >
          <div className="flex flex-col justify-start items-start">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-md text-gray-600 dark:text-white font-hubballi">
              <motion.li
                initial={{ opacity: 0, y: 30, scale: 0.5 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
                  Lucide React
                </strong>
                <div className="mt-3">Used for icons</div>
              </motion.li>

              <motion.li
                initial={{ opacity: 0, y: 30, scale: 0.5 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
                  Sonner
                </strong>
                <div className="mt-3">Used for toast notifications</div>
              </motion.li>

              <motion.li
                initial={{ opacity: 0, y: 30, scale: 0.5 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
                  React Hook Form
                </strong>
                <div className="mt-3">Used for form handling</div>
              </motion.li>

              <motion.li
                initial={{ opacity: 0, y: 30, scale: 0.5 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
                  Next.js
                </strong>
                <div className="mt-3">
                  Used as the React framework for server-side rendering,
                  routing, and API routes
                </div>
              </motion.li>

              <motion.li
                initial={{ opacity: 0, y: 30, scale: 0.5 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
                  TypeScript
                </strong>
                <div className="mt-3">
                  Used for type checking, improving code quality and error
                  prevention
                </div>
              </motion.li>

              <motion.li
                initial={{ opacity: 0, y: 30, scale: 0.5 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
                  React
                </strong>
                <div className="mt-3">
                  Used for building user interface and reusable components
                </div>
              </motion.li>

              <motion.li
                initial={{ opacity: 0, y: 30, scale: 0.5 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
                  Tailwind CSS
                </strong>
                <div className="mt-3">
                  Used for styling and layout mobile first design.
                </div>
              </motion.li>

              <motion.li
                initial={{ opacity: 0, y: 30, scale: 0.5 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
                  Axios
                </strong>
                <div className="mt-3">
                  Used for making HTTP requests to the backend, API requests.
                </div>
              </motion.li>

              <motion.li
                initial={{ opacity: 0, y: 30, scale: 0.5 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
                  Cloudinary
                </strong>
                <div className="mt-3">
                  Used for image uploads, cloud-based image
                </div>
              </motion.li>
            </ul>
          </div>

          {/* Replace the Image Grid with AnimatedImageSlider */}
          <AnimatedImageSlider />
        </motion.div>
      </ContentSection>
    </div>
  );
}
