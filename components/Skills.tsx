"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
// import Skill from "@/components/Skill";
import { python, tech } from "@/components/data/skillData";
import Image from "next/image";

export default function Skills() {
  // const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the animation after the component mounts
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`relative top-0 left-0 w-full min-h-screen transform transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
      style={{
        background: `linear-gradient(
          to bottom, 
          var(--bg-start), 
          var(--bg-end)
        )`,
      }}
    >
      <div className="flex px-8 md:px-32 max-w-7xl justify-center items-start min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col space-y-8 cursor-text"
        >
          <div className="flex max-w-7xl justify-start items-start  pt-48">
            <div className="flex flex-col space-y-8 cursor-text">
              <h1 className="font-hubballi font-bold text-2xl md:text-4xl tracking-[5px] leading-6 text-gray-500 dark:text-white uppercase">
                Skills
              </h1>
              <h3 className="text-[#B8860B] text-lg md:text-xl uppercase leading-6 tracking-[5px] font-hubballi">
                It started in 2020
              </h3>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="flex flex-wrap justify-start gap-2  mb-4 pb-4"
              >
                {python.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
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
                className="flex flex-wrap justify-start gap-2  mb-4 pb-10"
              >
                {tech.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>

          <div className=" py-20 blur-sm opacity-5">
            <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
            <div className="bg-gradient-to-r from-[#B8860B] via-gray-100 to-[#B8860B] dark:from-[#B8860B] dark:via-gray-950 dark:to-[#B8860B] h-1 " />
            <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
          </div>

          <div className="flex flex-col gap-2">
            {/* Project Details */}
            <div className="flex gap-3">
              <h4 className="text-[#B8860B] text-lg md:text-xl uppercase leading-1 tracking-[1px] font-hubballi">
                Project:
              </h4>
              <p className="text-lg md:text-xl text-gray-600 dark:text-white font-hubballi">
                SWAPIFY
              </p>
            </div>

            {/* Description */}
            <div className="flex gap-3">
              <h4 className="text-[#B8860B] text-lg md:text-xl uppercase leading-1 tracking-[1px] font-hubballi">
                Description:
              </h4>
              <p className="text-lg md:text-xl text-gray-600 dark:text-white font-hubballi">
                A barter and donation platform where users can swap goods or
                donate unused items to individuals and organizations in need.
              </p>
            </div>

            {/* Status */}
            <div className="flex gap-3">
              <h4 className="text-[#B8860B] text-lg md:text-xl uppercase leading-1 tracking-[1px] font-hubballi">
                Status:
              </h4>
              <p className="text-lg md:text-xl text-gray-600 dark:text-white font-hubballi ">
                <strong className="bg-gray-200 dark:bg-gray-600 py-[2px] px-2 rounded-full">
                  {" "}
                  Ongoing
                </strong>{" "}
                Currently user can join the waitlist as we continue to develope
                to lauch an MVP in February
              </p>
            </div>

            {/* Role */}
            <div className="flex gap-3">
              <h4 className="text-[#B8860B] text-lg md:text-xl uppercase leading-1 tracking-[1px] font-hubballi">
                Role:
              </h4>
              <p className="text-lg md:text-xl text-gray-600 dark:text-white font-hubballi">
                Front-end Developer
              </p>
            </div>

            {/* Activity */}
            <div className="flex gap-3">
              <h4 className="text-[#B8860B] text-lg md:text-xl uppercase leading-1 tracking-[1px] font-hubballi">
                Activity:
              </h4>
              <ul className=" pl-5 text-lg md:text-xl text-gray-600 dark:text-white font-hubballi">
                <li>
                  <strong className="bg-gray-200 dark:bg-gray-600 py-[2px] px-2 rounded-full">
                    Component Development
                  </strong>{" "}
                  Created reusable UI components like{" "}
                  <span className="border rounded-full px-2">ProductCard</span>{" "}
                  <span className="border rounded-full px-2">
                    AccountSettings
                  </span>{" "}
                  <span className="border rounded-full px-2">
                    SidebarProfile
                  </span>
                  .
                </li>
                <li>
                  <strong className="bg-gray-200 dark:bg-gray-600 py-[2px] px-2 rounded-full">
                    State Management
                  </strong>{" "}
                  Used React hooks{" "}
                  <span className="border rounded-full px-2"> useState</span>{" "}
                  <span className="border rounded-full px-2">useEffect</span>{" "}
                  and implemented custom hooks{" "}
                  <span className="border rounded-full px-2">useModal</span> for
                  managing modals.
                </li>
                <li>
                  <strong className="bg-gray-200 dark:bg-gray-600 py-[2px] px-2 rounded-full">
                    API Integration
                  </strong>{" "}
                  Set up Axios instance for making API requests and created
                  utility functions for{" "}
                  <span className="border rounded-full px-2">GET</span>,{" "}
                  <span className="border rounded-full px-2">POST</span>,{" "}
                  <span className="border rounded-full px-2">PUT</span>, and{" "}
                  <span className="border rounded-full px-2">DELETE</span>{" "}
                  requests.
                </li>
                <li>
                  <strong className="bg-gray-200 dark:bg-gray-600 py-[2px] px-2 rounded-full">
                    Form Handling
                  </strong>{" "}
                  Implemented form submission logic (e.g., in{" "}
                  <span className="border rounded-full px-2">
                    NewsLetterModal
                  </span>
                  ) and validated form inputs (e.g., email validation).
                </li>
                <li>
                  <strong className="bg-gray-200 dark:bg-gray-600 py-[2px] px-2 rounded-full">
                    Image Upload
                  </strong>{" "}
                  Integrated Cloudinary for image uploads in the{" "}
                  <span className="border rounded-full px-2">
                    ItemImagesStep
                  </span>{" "}
                  component.
                </li>
                <li>
                  <strong className="bg-gray-200 dark:bg-gray-600 py-[2px] px-2 rounded-full">
                    Pagination
                  </strong>{" "}
                  Implemented pagination logic in the{" "}
                  <span className="border rounded-full px-2">ProductList</span>{" "}
                  component.
                </li>
                <li>
                  <strong className="bg-gray-200 dark:bg-gray-600 py-[2px] px-2 rounded-full">
                    Error Handling
                  </strong>{" "}
                  Implemented error handling for API requests and form
                  submissions.
                </li>
                <li>
                  <strong className="bg-gray-200 dark:bg-gray-600 py-[2px] px-2 rounded-full">
                    Responsive Design
                  </strong>{" "}
                  Used Tailwind CSS classes to create responsive layouts.
                </li>
                <li>
                  <strong className="bg-gray-200 dark:bg-gray-600 py-[2px] px-2 rounded-full">
                    Accessibility
                  </strong>{" "}
                  Implemented ARIA attributes for better accessibility (e.g., in
                  the{" "}
                  <span className="border rounded-full px-2">
                    DeleteConfirmationModal
                  </span>
                  ).
                </li>
                <li>
                  <strong className="bg-gray-200 dark:bg-gray-600 py-[2px] px-2 rounded-full">
                    Performance Optimization
                  </strong>{" "}
                  Used React hooks and functional components for better
                  performance.
                </li>
                <li>
                  <strong className="bg-gray-200 dark:bg-gray-600 py-[2px] px-2 rounded-full">
                    User Experience
                  </strong>{" "}
                  Implemented loading states and feedback (e.g., in the{" "}
                  <span className="border rounded-full px-2">
                    ActiveListingsGrid
                  </span>{" "}
                  component) and created interactive elements like modals and
                  confirmation dialogs.
                </li>
                <li>
                  <strong className="bg-gray-200 dark:bg-gray-600 py-[2px] px-2 rounded-full">
                    Styling
                  </strong>{" "}
                  Used Tailwind CSS for rapid and consistent styling.
                </li>
                <li>
                  <strong className="bg-gray-200 dark:bg-gray-600 py-[2px] px-2 rounded-full">
                    Routing
                  </strong>{" "}
                  Used Next.js routing for client-side navigation.
                </li>
                <li>
                  <strong className="bg-gray-200 dark:bg-gray-600 py-[2px] px-2 rounded-full">
                    TypeScript Integration
                  </strong>{" "}
                  Used TypeScript for type checking and improving code quality.
                  Created type definitions for API responses and component
                  props.
                </li>
              </ul>
            </div>

            {/* Link to Home Page */}
            <div className="flex gap-3">
              <h4 className="text-[#B8860B] text-lg md:text-xl uppercase leading-1 tracking-[1px] font-hubballi">
                Link to the home page:
              </h4>
              <a
                href="https://swapify.ee/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg md:text-xl text-blue-600 dark:text-blue-400 underline font-hubballi"
              >
                https://swapify.ee/
              </a>
            </div>

            {/* Link to Actual Product */}
            <div className="flex gap-3">
              <h4 className="text-[#B8860B] text-lg md:text-xl uppercase leading-1 tracking-[1px] font-hubballi">
                Link to actual product:
              </h4>
              <a
                href="https://swapify-website.vercel.app/swapified-user/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg md:text-xl text-blue-600 dark:text-blue-400 underline font-hubballi"
              >
                https://swapify-website.vercel.app/swapified-user/
              </a>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-2 justify-evenly items-start py-20 mb-20 bg-transparent">
            <div className="flex justify-between w-full h-auto gap-10  items-start">
              {/* Key Libraries and Frameworks */}
              <div className="flex flex-col justify-center items-start">
                <h4 className="text-[#B8860B] md:text-lg lg:text-xl uppercase leading-1 tracking-[1px] font-hubballi py-3">
                  Tech Stack, Libraries and Frameworks
                </h4>
                <ul className=" pl-5 list-inside text-lg md:text-xl text-gray-600 dark:text-white font-hubballi space-y-2">
                  <li>
                    <strong className="bg-gray-200 dark:bg-gray-600 py-[2px] px-2 rounded-full">
                      Next.js
                    </strong>{" "}
                    Used as the React framework for server-side rendering,
                    routing, and API routes
                  </li>
                  <li>
                    <strong className="bg-gray-200 dark:bg-gray-600 py-[2px] px-2 rounded-full">
                      TypeScript
                    </strong>{" "}
                    Used for type checking, improving code quality and error
                    prevention
                  </li>
                  <li>
                    <strong className="bg-gray-200 dark:bg-gray-600 py-[2px] px-2 rounded-full">
                      React
                    </strong>{" "}
                    Used for building user interface and reusable components
                  </li>

                  <li>
                    <strong className="bg-gray-200 dark:bg-gray-600 py-[2px] px-2 rounded-full">
                      Tailwind CSS
                    </strong>{" "}
                    Used for styling and layout mobile first design.
                  </li>

                  <li>
                    <strong className="bg-gray-200 dark:bg-gray-600 py-[2px] px-2 rounded-full">
                      Axios
                    </strong>{" "}
                    Used for making HTTP requests to the backend, API requests.
                  </li>
                  <li>
                    <strong className="bg-gray-200 dark:bg-gray-600 py-[2px] px-2 rounded-full">
                      Cloudinary
                    </strong>{" "}
                    Used for image uploads, cloud-based image
                  </li>

                  <li>
                    <strong className="bg-gray-200 dark:bg-gray-600 py-[2px] px-2 rounded-full">
                      Sonner
                    </strong>{" "}
                    Used for toast notifications
                  </li>
                  <li>
                    <strong className="bg-gray-200 dark:bg-gray-600 py-[2px] px-2 rounded-full">
                      Lucide React
                    </strong>{" "}
                    Used for icons
                  </li>
                  <li>
                    <strong className="bg-gray-200 dark:bg-gray-600 py-[2px] px-2 rounded-full">
                      React Hook Form
                    </strong>{" "}
                    Used for form handling
                  </li>
                </ul>
              </div>
            </div>

            {/* <div className="flex justify-end w-full h-auto"></div> */}
            {/* Image Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full px-2 pl-5 lg:pl-16">
              <Image
                src="/type.png"
                alt="type"
                width={1000}
                height={1000}
                className="w-full h-auto rounded-lg"
              />
              <Image
                src="/props.png"
                alt="props"
                width={1000}
                height={1000}
                className="w-full h-auto rounded-lg"
              />
              <Image
                src="/onnext.png"
                alt="onnext"
                width={1000}
                height={1000}
                className="w-full h-auto rounded-lg md:col-span-2 lg:col-span-1"
              />
              <Image
                src="/effect.png"
                alt="effect"
                width={1000}
                height={1000}
                className="w-full h-auto rounded-lg md:col-span-2 lg:col-span-1"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
