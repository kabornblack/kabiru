"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { python, tech } from "@/components/data/skillData";
import Image from "next/image";

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
              index === currentIndex
                ? "bg-[#B8860B]"
                : "bg-gray-300 dark:bg-gray-600"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function Skills() {
  return (
    <div className="top-0 left-0 w-full min-h-screen transform transition-all duration-700 bg-gray-950 -mt-44">
      <div className="flex px-8 md:px-32 justify-center items-start -mt-32 min-h-screen max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col space-y-8 cursor-text"
        >
          <div className="flex max-w-7xl justify-start items-start  pt-36">
            <div className="flex flex-col space-y-6 cursor-text">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-center mb-16"
              >
                <h1 className="font-['Playfair_Display'] text-[#B8860B] font-bold text-2xl md:text-4xl tracking-[5px] leading-6 uppercase relative inline-block opacity-80">
                  Skills
                  <div className="absolute left-0 -bottom-1 w-full h-[1px] bg-gradient-to-r from-transparent via-[#B8860B] to-transparent"></div>
                </h1>
              </motion.div>
              <h3 className="text-[#B8860B] text-lg md:text-xl uppercase leading-6 tracking-[5px] font-hubballi">
                It started in 2020
              </h3>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="flex flex-wrap justify-center gap-3 pb-10 -mt-3"
              >
                {python.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs bg-white text-gray-800 uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
              <p className="text-[#B8860B] text-lg md:text-xl uppercase leading-1 tracking-[1px] font-hubballi">
                Where i am today in 2025
              </p>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="flex flex-wrap justify-center gap-2  mb-4 pb-4"
              >
                {tech.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs bg-white  text-gray-800 uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>

          <div className=" pb-10 blur-sm opacity-5">
            <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
            <div className="bg-gradient-to-r from-[#B8860B] via-gray-100 to-[#B8860B] dark:from-[#B8860B] dark:via-gray-950 dark:to-[#B8860B] h-1 " />
            <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
          </div>

          <div className="flex flex-col justify-center gap-6 text-center">
            {/* Project Details */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex flex-col gap-3 w-auto text-center"
            >
              <h4 className="text-[#B8860B] text-lg md:text-xl uppercase leading-1 tracking-[1px] font-semibold font-hubballi pb-3">
                Recent Project
              </h4>
              <p className="text-lg md:text-xl font-semibold text-gray-300 font-hubballi -mb-3">
                SWAPIFY
              </p>
              <a
                href="https://swapify.ee/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg md:text-xl flex justify-center items-center gap-1.5 text-gray-600 hover:text-gray-400 transition-colors duration-200 font-hubballi group pt-2 px-20"
              >
                <span className="">www.swapify.ee</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 inline-block transform group-hover:translate-x-0.5 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex flex-col gap-3 py-8"
            >
              <h4 className="text-[#B8860B] text-lg md:text-xl uppercase leading-1 tracking-[1px] font-hubballi pb-4">
                Project Description
              </h4>
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.5 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                // className="flex justify-center items-center h-auto w-auto py-2 px-6 bg-white border-gray-200 shadow-sm"
                className="relative pt-4 pb-4 px-4 bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-100 shadow-sm"
              >
                <p className="">
                  A barter and donation platform where users can swap goods or
                  donate unused items to individuals and organizations who needs
                  them
                </p>
              </motion.div>
            </motion.div>

            {/* Role */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex flex-col gap-3 pb-8"
            >
              <h4 className="text-[#B8860B] text-lg md:text-xl uppercase leading-1 tracking-[1px] font-hubballi pb-4">
                Role
              </h4>
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.5 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                // className="flex justify-center items-center h-10 w-auto bg-gray-800 border text-gray-100"
                className="relative pt-4 pb-4 px-4 bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-100 shadow-sm"
              >
                <p className="">Front-end Developer</p>
              </motion.div>
            </motion.div>

            {/* Activity */}
            <div className="flex flex-col gap-3">
              <h4 className="text-[#B8860B] text-lg md:text-xl uppercase leading-1 tracking-[1px] font-hubballi pb-10">
                Activity
              </h4>

              <motion.ul
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-sm md:text-base text-gray-600 dark:text-white font-hubballi"
              >
                <motion.li
                  initial={{ opacity: 0, y: 30, scale: 0.5 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
                >
                  <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
                    Routing
                  </strong>
                  <div className="mt-3">
                    Used Next.js routing for client-side navigation.
                  </div>
                </motion.li>

                <motion.li
                  initial={{ opacity: 0, y: 30, scale: 0.5 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
                >
                  <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
                    Styling
                  </strong>
                  <div className="mt-3">
                    Used Tailwind CSS for rapid and consistent styling.
                  </div>
                </motion.li>

                <motion.li
                  initial={{ opacity: 0, y: 30, scale: 0.5 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
                >
                  <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
                    Pagination
                  </strong>
                  <div className="mt-3">
                    Implemented pagination logic in the{" "}
                    <span className="inline-flex items-center px-2 py-0.5 m-0.5 text-xs font-medium border border-gray-200 dark:border-gray-600">
                      ProductList
                    </span>{" "}
                    component.
                  </div>
                </motion.li>

                <motion.li
                  initial={{ opacity: 0, y: 30, scale: 0.5 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
                >
                  <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
                    Responsive Design
                  </strong>
                  <div className="mt-3">
                    Used Tailwind CSS classes to create responsive layouts.
                  </div>
                </motion.li>

                <motion.li
                  initial={{ opacity: 0, y: 30, scale: 0.5 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
                >
                  <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
                    Error Handling
                  </strong>
                  <div className="mt-3">
                    Implemented error handling for API requests and form
                    submissions.
                  </div>
                </motion.li>

                <motion.li
                  initial={{ opacity: 0, y: 30, scale: 0.5 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
                >
                  <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
                    Image Upload
                  </strong>
                  <div className="mt-3">
                    Integrated Cloudinary for image uploads in the{" "}
                    <span className="inline-flex items-center px-2 py-0.5 m-0.5 text-xs font-medium border border-gray-200 dark:border-gray-600">
                      ItemImagesStep
                    </span>{" "}
                    component.
                  </div>
                </motion.li>

                <motion.li
                  initial={{ opacity: 0, y: 30, scale: 0.5 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
                >
                  <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
                    Accessibility
                  </strong>
                  <div className="mt-3">
                    Implemented ARIA attributes for better accessibility e.g in
                    the{" "}
                    <span className="inline-flex items-center px-2 py-0.5 m-0.5 text-xs font-medium border border-gray-200 dark:border-gray-600">
                      DeleteConfirmationModal
                    </span>
                  </div>
                </motion.li>

                <motion.li
                  initial={{ opacity: 0, y: 30, scale: 0.5 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
                >
                  <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
                    Performance Optimization
                  </strong>
                  <div className="mt-3">
                    Used React hooks and functional components for better
                    performance.
                  </div>
                </motion.li>

                <motion.li
                  initial={{ opacity: 0, y: 30, scale: 0.5 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
                >
                  <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
                    Component Development
                  </strong>
                  <div className="mt-3">
                    Created reusable UI components like{" "}
                    <span className="inline-flex items-center px-2 py-0.5 m-0.5 text-xs font-medium border border-gray-200 dark:border-gray-600">
                      ProductCard
                    </span>{" "}
                    <span className="inline-flex items-center px-2 py-0.5 m-0.5 text-xs font-medium border border-gray-200 dark:border-gray-600">
                      AccountSettings
                    </span>{" "}
                    <span className="inline-flex items-center px-2 py-0.5 m-0.5 text-xs font-medium border border-gray-200 dark:border-gray-600">
                      SidebarProfile
                    </span>
                  </div>
                </motion.li>

                <motion.li
                  initial={{ opacity: 0, y: 30, scale: 0.5 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
                >
                  <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
                    Form Handling
                  </strong>
                  <div className="mt-3">
                    Implemented form submission logic e.g in{" "}
                    <span className="inline-flex items-center px-2 py-0.5 m-0.5 text-xs font-medium border border-gray-200 dark:border-gray-600">
                      NewsLetterModal
                    </span>
                    and validated form inputs.
                  </div>
                </motion.li>

                <motion.li
                  initial={{ opacity: 0, y: 30, scale: 0.5 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
                >
                  <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
                    State Management
                  </strong>
                  <div className="mt-3">
                    Used React hooks{" "}
                    <span className="inline-flex items-center px-2 py-0.5 m-0.5 text-xs font-medium border border-gray-200 dark:border-gray-600">
                      useState
                    </span>{" "}
                    <span className="inline-flex items-center px-2 py-0.5 m-0.5 text-xs font-medium border border-gray-200 dark:border-gray-600">
                      useEffect
                    </span>{" "}
                    and implemented custom hooks{" "}
                    <span className="inline-flex items-center px-2 py-0.5 m-0.5 text-xs font-medium border border-gray-200 dark:border-gray-600">
                      useModal
                    </span>{" "}
                    for managing modals.
                  </div>
                </motion.li>

                <motion.li
                  initial={{ opacity: 0, y: 30, scale: 0.5 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
                >
                  <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
                    API Integration
                  </strong>
                  <div className="mt-3">
                    Set up Axios instance for making API requests and created
                    utility functions for{" "}
                    <span className="inline-flex items-center px-2 py-0.5 m-0.5 text-xs font-medium border border-gray-200 dark:border-gray-600">
                      GET
                    </span>
                    ,{" "}
                    <span className="inline-flex items-center px-2 py-0.5 m-0.5 text-xs font-medium border border-gray-200 dark:border-gray-600">
                      POST
                    </span>
                    ,{" "}
                    <span className="inline-flex items-center px-2 py-0.5 m-0.5 text-xs font-medium border border-gray-200 dark:border-gray-600">
                      PUT
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 m-0.5 text-xs font-medium border border-gray-200 dark:border-gray-600">
                      UPDATE
                    </span>
                    , and{" "}
                    <span className="inline-flex items-center px-2 py-0.5 m-0.5 text-xs font-medium border border-gray-200 dark:border-gray-600">
                      DELETE
                    </span>{" "}
                    requests.
                  </div>
                </motion.li>

                <motion.li
                  initial={{ opacity: 0, y: 30, scale: 0.5 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
                >
                  <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
                    TypeScript Integration
                  </strong>
                  <div className="mt-3">
                    Used TypeScript for type checking and improving code
                    quality. Created type definitions for API responses and
                    component props.
                  </div>
                </motion.li>

                <motion.li
                  initial={{ opacity: 0, y: 30, scale: 0.5 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
                >
                  <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
                    User Experience
                  </strong>
                  <div className="mt-3">
                    Implemented loading states and feedback (e.g., in the{" "}
                    <span className="inline-flex items-center px-2 py-0.5 m-0.5 text-xs font-medium border border-gray-200 dark:border-gray-600">
                      ActiveListingsGrid
                    </span>{" "}
                    component) and created interactive elements like modals and
                    confirmation dialogs.
                  </div>
                </motion.li>
              </motion.ul>
            </div>
          </div>

          <motion.h4
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[#B8860B] text-sm md:text-lg lg:text-xl uppercase leading-1 tracking-[1px] font-hubballi pt-28 pb-4"
          >
            Tech Stack, Libraries and Frameworks
          </motion.h4>
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col lg:flex-row gap-8 lg:gap-2 justify-evenly items-start py-4 px-1 md:px-10 mb-20 bg-transparent"
          >
            <div className="flex flex-col justify-start items-start">
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-md text-gray-600 dark:text-white font-hubballi">
                <motion.li
                  initial={{ opacity: 0, y: 30, scale: 0.5 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
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
        </motion.div>
      </div>
      <div className=" py-10 blur-sm opacity-5">
        <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
        <div className="bg-gradient-to-r from-[#B8860B] via-gray-100 to-[#B8860B] dark:from-[#B8860B] dark:via-gray-950 dark:to-[#B8860B] h-1 " />
        <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
      </div>
    </div>
  );
}
