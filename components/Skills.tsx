"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import Skill from "@/components/Skill";
import { python, tech } from "@/components/data/skillData";
import Image from "next/image";

// Animated Image Slider Component
const AnimatedImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const images = [
    {
      src: "/type.png",
      alt: "type",
    },
    {
      src: "/props.png",
      alt: "props",
    },
    {
      src: "/onnext.png",
      alt: "onnext",
    },
    {
      src: "/effect.png",
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
    <div className="w-full px-2 pl-5 lg:pl-16">
      <div className="relative h-80 md:h-96 lg:h-[450px] w-full overflow-hidden rounded-xl">
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
              className="object-cover rounded-lg"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60"
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
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60"
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
    <div className="top-0 left-0 w-full min-h-screen transform transition-all duration-700 bg-gray-950 ">
      <div className="flex px-8 md:px-32 justify-center items-start -mt-24 min-h-screen max-w-7xl mx-auto text-center border-x">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col space-y-8 cursor-text"
        >
          <div className="flex max-w-7xl justify-start items-start  pt-48">
            <div className="flex flex-col space-y-8 cursor-text">
              <h1 className="font-hubballi font-bold text-2xl md:text-4xl tracking-[5px] leading-6 pb-10 uppercase">
                Skills
              </h1>
              <h3 className="text-[#B8860B] text-lg md:text-xl uppercase leading-6 tracking-[5px] font-hubballi">
                It started in 2020
              </h3>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="flex flex-wrap justify-center gap-2  mb-4 pb-4"
              >
                {python.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm bg-gray-400 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
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
                className="flex flex-wrap justify-center gap-2  mb-4 pb-10"
              >
                {tech.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm bg-gray-400 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>

          <div className=" py-10 blur-sm opacity-5">
            <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
            <div className="bg-gradient-to-r from-[#B8860B] via-gray-100 to-[#B8860B] dark:from-[#B8860B] dark:via-gray-950 dark:to-[#B8860B] h-1 " />
            <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
          </div>

          <div className="flex flex-col justify-center gap-6 text-center">
            {/* Project Details */}
            <div className="flex flex-col gap-3 w-auto">
              <h4 className="text-[#B8860B] text-lg md:text-xl uppercase leading-1 tracking-[1px] font-hubballi">
                Recent Project
              </h4>
              <p className="text-lg md:text-xl text-gray-600 dark:text-white font-hubballi -mb-3">
                SWAPIFY
              </p>
              <a
                href="https://swapify.ee/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg md:text-xl max-w-auto text-gray-600 underline font-hubballi"
              >
                www.swapify.ee
              </a>
            </div>
            {/* <div className="flex flex-col gap-3">
              <h4 className="text-[#B8860B] text-lg md:text-xl w-auto uppercase leading-1 tracking-[1px] font-hubballi">
                Recent Project
              </h4>
              <p className="text-lg md:text-xl text-gray-600 dark:text-white font-hubballi -mb-3">
                SWAPIFY
              </p>
              <a
                href="https://swapify.ee/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-auto text-lg md:text-xl text-gray-600 underline font-hubballi"
              >
                www.swapify.ee
              </a>
            </div> */}

            {/* Description */}
            <div className="flex flex-col gap-3 py-8">
              <h4 className="text-[#B8860B] text-lg md:text-xl uppercase leading-1 tracking-[1px] font-hubballi pb-4">
                Description
              </h4>
              <div className="flex justify-center items-center h-auto w-auto py-2 px-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <p className="">
                  A barter and donation platform where users can swap goods or
                  donate unused items to individuals and organizations who needs
                  them.
                </p>
              </div>
            </div>
            {/* <div className="flex flex-col gap-3 pt-10">
              <h4 className="text-[#B8860B] text-lg md:text-xl uppercase leading-1 tracking-[1px] font-hubballi">
                Description
              </h4>
              <p className="text-lg md:text-xl text-gray-600 dark:text-white font-hubballi">
                A barter and donation platform where users can swap goods or
                donate unused items to individuals and organizations who needs
                them.
              </p>
            </div> */}

            {/* Link to Home Page */}
            {/* <div className="flex flex-col gap-3 pb-8">
              <h4 className="text-[#B8860B] text-lg md:text-xl uppercase leading-1 tracking-[1px] font-hubballi pb-4">
                Link to the home page
              </h4>
              <div className="flex justify-center items-center h-10 w-auto bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <p className="">Front-end Developer</p>
                <a
                  href="https://swapify.ee/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center h-10 w-auto bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm text-lg md:text-xl text-gray-400 underline font-hubballi"
                >
                  www.swapify.ee
                </a>
              </div>
            </div> */}
            {/* <div className="flex flex-col justify-center gap-3 py-6">
              <h4 className="text-[#B8860B] text-lg md:text-xl uppercase leading-1 tracking-[1px] font-hubballi">
                Link to the home page
              </h4>
              <a
                href="https://swapify.ee/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg md:text-xl text-gray-400 underline font-hubballi"
              >
                www.swapify.ee
              </a>
            </div> */}

            {/* Role */}
            <div className="flex flex-col gap-3 pb-8">
              <h4 className="text-[#B8860B] text-lg md:text-xl uppercase leading-1 tracking-[1px] font-hubballi pb-4">
                Role
              </h4>
              <div className="flex justify-center items-center h-10 w-auto bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <p className="">Front-end Developer</p>
              </div>
            </div>

            {/* Activity */}
            <div className="flex flex-col gap-3">
              <h4 className="text-[#B8860B] text-lg md:text-xl uppercase leading-1 tracking-[1px] font-hubballi pb-10">
                Activity
              </h4>

              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm md:text-base text-gray-600 dark:text-white font-hubballi">
                <li className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 rounded-md whitespace-nowrap">
                    Routing
                  </strong>
                  <div className="mt-3">
                    Used Next.js routing for client-side navigation.
                  </div>
                </li>

                <li className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 rounded-md whitespace-nowrap">
                    Styling
                  </strong>
                  <div className="mt-3">
                    Used Tailwind CSS for rapid and consistent styling.
                  </div>
                </li>

                <li className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 rounded-md whitespace-nowrap">
                    Pagination
                  </strong>
                  <div className="mt-3">
                    Implemented pagination logic in the{" "}
                    <span className="inline-flex items-center px-2 py-0.5 m-0.5 rounded-md text-xs font-medium border border-gray-200 dark:border-gray-600">
                      ProductList
                    </span>{" "}
                    component.
                  </div>
                </li>

                <li className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 rounded-md whitespace-nowrap">
                    Responsive Design
                  </strong>
                  <div className="mt-3">
                    Used Tailwind CSS classes to create responsive layouts.
                  </div>
                </li>

                <li className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 rounded-md whitespace-nowrap">
                    Error Handling
                  </strong>
                  <div className="mt-3">
                    Implemented error handling for API requests and form
                    submissions.
                  </div>
                </li>

                <li className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 rounded-md whitespace-nowrap">
                    Image Upload
                  </strong>
                  <div className="mt-3">
                    Integrated Cloudinary for image uploads in the{" "}
                    <span className="inline-flex items-center px-2 py-0.5 m-0.5 rounded-md text-xs font-medium border border-gray-200 dark:border-gray-600">
                      ItemImagesStep
                    </span>{" "}
                    component.
                  </div>
                </li>

                <li className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 rounded-md whitespace-nowrap">
                    Accessibility
                  </strong>
                  <div className="mt-3">
                    Implemented ARIA attributes for better accessibility e.g in
                    the{" "}
                    <span className="inline-flex items-center px-2 py-0.5 m-0.5 rounded-md text-xs font-medium border border-gray-200 dark:border-gray-600">
                      DeleteConfirmationModal
                    </span>
                  </div>
                </li>

                <li className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 rounded-md whitespace-nowrap">
                    Performance Optimization
                  </strong>
                  <div className="mt-3">
                    Used React hooks and functional components for better
                    performance.
                  </div>
                </li>

                <li className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 rounded-md whitespace-nowrap">
                    Component Development
                  </strong>
                  <div className="mt-3">
                    Created reusable UI components like{" "}
                    <span className="inline-flex items-center px-2 py-0.5 m-0.5 rounded-md text-xs font-medium border border-gray-200 dark:border-gray-600">
                      ProductCard
                    </span>{" "}
                    <span className="inline-flex items-center px-2 py-0.5 m-0.5 rounded-md text-xs font-medium border border-gray-200 dark:border-gray-600">
                      AccountSettings
                    </span>{" "}
                    <span className="inline-flex items-center px-2 py-0.5 m-0.5 rounded-md text-xs font-medium border border-gray-200 dark:border-gray-600">
                      SidebarProfile
                    </span>
                  </div>
                </li>

                <li className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 rounded-md whitespace-nowrap">
                    Form Handling
                  </strong>
                  <div className="mt-3">
                    Implemented form submission logic (e.g., in{" "}
                    <span className="inline-flex items-center px-2 py-0.5 m-0.5 rounded-md text-xs font-medium border border-gray-200 dark:border-gray-600">
                      NewsLetterModal
                    </span>
                    ) and validated form inputs.
                  </div>
                </li>

                <li className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 rounded-md whitespace-nowrap">
                    State Management
                  </strong>
                  <div className="mt-3">
                    Used React hooks{" "}
                    <span className="inline-flex items-center px-2 py-0.5 m-0.5 rounded-md text-xs font-medium border border-gray-200 dark:border-gray-600">
                      useState
                    </span>{" "}
                    <span className="inline-flex items-center px-2 py-0.5 m-0.5 rounded-md text-xs font-medium border border-gray-200 dark:border-gray-600">
                      useEffect
                    </span>{" "}
                    and implemented custom hooks{" "}
                    <span className="inline-flex items-center px-2 py-0.5 m-0.5 rounded-md text-xs font-medium border border-gray-200 dark:border-gray-600">
                      useModal
                    </span>{" "}
                    for managing modals.
                  </div>
                </li>

                <li className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 rounded-md whitespace-nowrap">
                    API Integration
                  </strong>
                  <div className="mt-3">
                    Set up Axios instance for making API requests and created
                    utility functions for{" "}
                    <span className="inline-flex items-center px-2 py-0.5 m-0.5 rounded-md text-xs font-medium border border-gray-200 dark:border-gray-600">
                      GET
                    </span>
                    ,{" "}
                    <span className="inline-flex items-center px-2 py-0.5 m-0.5 rounded-md text-xs font-medium border border-gray-200 dark:border-gray-600">
                      POST
                    </span>
                    ,{" "}
                    <span className="inline-flex items-center px-2 py-0.5 m-0.5 rounded-md text-xs font-medium border border-gray-200 dark:border-gray-600">
                      PUT
                    </span>
                    , and{" "}
                    <span className="inline-flex items-center px-2 py-0.5 m-0.5 rounded-md text-xs font-medium border border-gray-200 dark:border-gray-600">
                      DELETE
                    </span>{" "}
                    requests.
                  </div>
                </li>

                <li className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 rounded-md whitespace-nowrap">
                    TypeScript Integration
                  </strong>
                  <div className="mt-3">
                    Used TypeScript for type checking and improving code
                    quality. Created type definitions for API responses and
                    component props.
                  </div>
                </li>

                <li className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 rounded-md whitespace-nowrap">
                    User Experience
                  </strong>
                  <div className="mt-3">
                    Implemented loading states and feedback (e.g., in the{" "}
                    <span className="inline-flex items-center px-2 py-0.5 m-0.5 rounded-md text-xs font-medium border border-gray-200 dark:border-gray-600">
                      ActiveListingsGrid
                    </span>{" "}
                    component) and created interactive elements like modals and
                    confirmation dialogs.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <h4 className="text-[#B8860B] text-sm md:text-lg lg:text-xl uppercase leading-1 tracking-[1px] font-hubballi pt-28 pb-10">
            Tech Stack, Libraries and Frameworks
          </h4>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-2 justify-evenly items-start py-4 px-1 md:px-10 mb-20 bg-transparent">
            <div className="flex flex-col justify-start items-start">
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-md text-gray-600 dark:text-white font-hubballi">
                <li className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 rounded-md whitespace-nowrap">
                    Lucide React
                  </strong>
                  <div className="mt-3">Used for icons</div>
                </li>

                <li className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 rounded-md whitespace-nowrap">
                    Sonner
                  </strong>
                  <div className="mt-3">Used for toast notifications</div>
                </li>

                <li className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 rounded-md whitespace-nowrap">
                    React Hook Form
                  </strong>
                  <div className="mt-3">Used for form handling</div>
                </li>

                <li className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 rounded-md whitespace-nowrap">
                    Next.js
                  </strong>
                  <div className="mt-3">
                    Used as the React framework for server-side rendering,
                    routing, and API routes
                  </div>
                </li>

                <li className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 rounded-md whitespace-nowrap">
                    TypeScript
                  </strong>
                  <div className="mt-3">
                    Used for type checking, improving code quality and error
                    prevention
                  </div>
                </li>

                <li className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 rounded-md whitespace-nowrap">
                    React
                  </strong>
                  <div className="mt-3">
                    Used for building user interface and reusable components
                  </div>
                </li>

                <li className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 rounded-md whitespace-nowrap">
                    Tailwind CSS
                  </strong>
                  <div className="mt-3">
                    Used for styling and layout mobile first design.
                  </div>
                </li>

                <li className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 rounded-md whitespace-nowrap">
                    Axios
                  </strong>
                  <div className="mt-3">
                    Used for making HTTP requests to the backend, API requests.
                  </div>
                </li>

                <li className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 rounded-md whitespace-nowrap">
                    Cloudinary
                  </strong>
                  <div className="mt-3">
                    Used for image uploads, cloud-based image
                  </div>
                </li>
              </ul>
            </div>

            {/* Replace the Image Grid with AnimatedImageSlider */}
            <AnimatedImageSlider />
          </div>
        </motion.div>
      </div>
      <div className=" py-10 blur-sm opacity-5">
        <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
        <div className="bg-gradient-to-r from-[#B8860B] via-gray-100 to-[#B8860B] dark:from-[#B8860B] dark:via-gray-950 dark:to-[#B8860B] h-1 " />
        <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
      </div>
      <div className="flex justify-center items-center pb-20 pt-10">
        <h1 className="text-4xl text-center">SOME OTHER PROJECTS</h1>
      </div>
    </div>
  );
}
