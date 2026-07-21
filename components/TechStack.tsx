"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaAngleDown } from "react-icons/fa";
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
    <div className="mb-8 w-full max-w-5xl mx-auto -mt-10 px-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        //
        className={`w-full grid grid-cols-[40px_1fr_40px] items-center px-6 md:px-10 bg-white/20 dark:bg-white/5 hover:bg-white/30 dark:hover:bg-white/10 p-4 ${borderClass} group transition-all duration-300`}
      >
        {/* Left Triple Arrow Stack */}

        {/* <div className="flex flex-col items-center"> */}
        <div className="flex flex-col items-start justify-center">
          {[20, 50, 90].map((opacity, index) => (
            <motion.div
              key={index}
              animate={{
                opacity: isOpen ? 0 : opacity / 100,
                y: isOpen ? 4 : 0,
              }}
              transition={{
                duration: 0.2,
                delay: isOpen ? 0 : 0.3 + index * 0.05,
              }}
              className={`text-[#B8860B] group-hover:text-[#D4A017] ${
                index < 2 ? "-mb-1" : ""
              }`}
            >
              <FaAngleDown />
            </motion.div>
          ))}
        </div>

        {/* Title */}
        {/* <h3 className="text-[#B8860B] text-lg md:text-xl uppercase leading-6 tracking-[3px] font-hubballi"> */}
        <h3 className="text-center text-[#B8860B] text-lg md:text-xl uppercase leading-6 tracking-[3px] font-hubballi">
          {title}
        </h3>

        {/* Right Triple Arrow Stack */}
        {/* <div className="flex flex-col items-center"> */}
        <div className="flex flex-col items-start justify-center">
          {[20, 50, 90].map((opacity, index) => (
            <motion.div
              key={index}
              animate={{
                opacity: isOpen ? 0 : opacity / 100,
                y: isOpen ? 4 : 0,
              }}
              transition={{
                duration: 0.2,
                delay: isOpen ? 0 : 0.3 + index * 0.05,
              }}
              className={`text-[#B8860B] group-hover:text-[#D4A017] ${
                index < 2 ? "-mb-1" : ""
              }`}
            >
              <FaAngleDown />
            </motion.div>
          ))}
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
            <div className="p-4 bg-gradient-to-b from-white/20 to-black/10 mt-1 relative text-center">
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
        </motion.div>
      </ContentSection>
    </div>
  );
}
