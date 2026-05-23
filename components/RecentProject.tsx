"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaAngleDown } from "react-icons/fa";

// ContentSection component for expandable sections
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
    <div className="mb-8 w-full max-w-5xl mx-auto px-6 text-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between bg-white/20 dark:bg-white/5 hover:bg-white/30 dark:hover:bg-white/10 p-4 ${borderClass} group transition-all duration-300 hover:rounded-b-none`}
      >
        {/* Left Triple Arrow Stack */}
        {/* <div className="flex flex-col items-center">
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
        </div> */}
        <div className="flex flex-col items-center pl-6">
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
        <h3 className="text-[#B8860B] text-lg md:text-xl uppercase leading-6 tracking-[3px] font-hubballi">
          {title}
        </h3>

        {/* Right Triple Arrow Stack */}
        <div className="flex flex-col items-center pr-12">
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
            <div className="p-4 bg-gradient-to-b from-white/20 to-black/10 rounded-b-md mt-1 relative">
              <div className="text-lg text-gray-300 dark:text-white font-hubballi pt-3 text-center">
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function RecentProject() {
  return (
    // <div className="flex flex-col max-w-6xl mx-auto justify-center gap-6">
    <div className="flex flex-col max-w-5xl mx-auto justify-center gap-6">
      {/* Project Details */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="flex flex-col gap-3 w-full text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h1 className="font-['Playfair_Display'] text-[#B8860B] font-bold text-lg md:text-2xl tracking-[5px] leading-6 uppercase relative inline-block opacity-80">
            Recent Project
            <div className="absolute left-0 -bottom-1 w-full h-[1px] bg-gradient-to-r from-transparent via-[#B8860B] to-transparent"></div>
          </h1>
        </motion.div>

        <p className="text-lg md:text-2xl font-semibold text-gray-300 font-hubballi -mb-3">
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

      {/* Description and Role - Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 py-2">
        <ContentSection title="Project Description" borderPosition="top">
          <p>
            A barter and donation platform where users can swap goods or donate
            unused items to individuals and organizations who needs them
          </p>
        </ContentSection>

        <ContentSection title="Role" borderPosition="top">
          <p>Front-end Developer</p>
        </ContentSection>
      </div>

      {/* Activity - Full Width Expandable Section */}
      <div className="w-full -mt-6">
        <ContentSection title="Activity" borderPosition="top">
          <motion.ul
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-sm md:text-base text-gray-600 dark:text-white font-hubballi"
          >
            <motion.li
              initial={{ opacity: 0, y: 30, scale: 0.5 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
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
              viewport={{ once: true }}
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
              viewport={{ once: true }}
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
              viewport={{ once: true }}
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
              viewport={{ once: true }}
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
              viewport={{ once: true }}
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
              viewport={{ once: true }}
              className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
                Accessibility
              </strong>
              <div className="mt-3">
                Implemented ARIA attributes for better accessibility e.g in the{" "}
                <span className="inline-flex items-center px-2 py-0.5 m-0.5 text-xs font-medium border border-gray-200 dark:border-gray-600">
                  DeleteConfirmationModal
                </span>
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
              viewport={{ once: true }}
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
              viewport={{ once: true }}
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
              viewport={{ once: true }}
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
              viewport={{ once: true }}
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
                ,{" "}
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
              viewport={{ once: true }}
              className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
                TypeScript Integration
              </strong>
              <div className="mt-3">
                Used TypeScript for type checking and improving code quality.
                Created type definitions for API responses and component props.
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
        </ContentSection>
      </div>
    </div>
  );
}

// "use client";

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaAngleDown } from "react-icons/fa";

// // ContentSection component for expandable sections with proper TypeScript types
// interface ContentSectionProps {
//   title: string;
//   children: React.ReactNode;
//   borderPosition?: "left" | "top";
// }

// const ContentSection: React.FC<ContentSectionProps> = ({
//   title,
//   children,
//   borderPosition = "left",
// }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const borderClass =
//     borderPosition === "top"
//       ? "border-t-4 border-[#B8860B]"
//       : "border-l-4 border-[#B8860B]";

//   return (
//     // <div className="mb-8 max-w-6xl text-center">
//     <div className="mb-8 w-full max-w-5xl mx-auto px-6 text-center">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className={`w-full flex items-center justify-between bg-white/20 dark:bg-white/5 hover:bg-white/30 dark:hover:bg-white/10 p-4 ${borderClass} group transition-all duration-300 hover:rounded-b-none`}
//       >
//         {/* Left Triple Arrow Stack */}
//         <div className="flex flex-col items-center">
//           <motion.div
//             animate={{ rotate: isOpen ? 180 : 0 }}
//             transition={{ duration: 0.3 }}
//             className="text-[#B8860B]/20 group-hover:text-[#D4A017]/20 -mb-1"
//           >
//             <FaAngleDown />
//           </motion.div>
//           <motion.div
//             animate={{ rotate: isOpen ? 180 : 0 }}
//             transition={{ duration: 0.3, delay: 0.05 }}
//             className="text-[#B8860B]/50 group-hover:text-[#D4A017]/50 -mb-1"
//           >
//             <FaAngleDown />
//           </motion.div>
//           <motion.div
//             animate={{ rotate: isOpen ? 180 : 0 }}
//             transition={{ duration: 0.3, delay: 0.1 }}
//             className="text-[#B8860B]/90 group-hover:text-[#D4A017]/90"
//           >
//             <FaAngleDown />
//           </motion.div>
//         </div>

//         {/* Title */}
//         <h3 className="text-[#B8860B] text-lg md:text-xl uppercase leading-6 tracking-[3px] font-hubballi">
//           {title}
//         </h3>

//         {/* Right Triple Arrow Stack */}
//         <div className="flex flex-col items-center">
//           <motion.div
//             animate={{ rotate: isOpen ? 180 : 0 }}
//             transition={{ duration: 0.3 }}
//             className="text-[#B8860B]/20 group-hover:text-[#D4A017]20 -mb-1"
//           >
//             <FaAngleDown />
//           </motion.div>
//           <motion.div
//             animate={{ rotate: isOpen ? 180 : 0 }}
//             transition={{ duration: 0.3, delay: 0.05 }}
//             className="text-[#B8860B]/50 group-hover:text-[#D4A017]/50 -mb-1"
//           >
//             <FaAngleDown />
//           </motion.div>
//           <motion.div
//             animate={{ rotate: isOpen ? 180 : 0 }}
//             transition={{ duration: 0.3, delay: 0.1 }}
//             className="text-[#B8860B]/90 group-hover:text-[#D4A017]/90"
//           >
//             <FaAngleDown />
//           </motion.div>
//         </div>
//       </button>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.3, ease: "easeInOut" }}
//             className="overflow-hidden"
//           >
//             <div className="p-4 bg-gradient-to-b from-white/20 to-black/10 rounded-b-md mt-1 relative">
//               <div className="text-lg text-gray-300 dark:text-white font-hubballi pt-3 text-center">
//                 {children}
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default function RecentProject() {
//   return (
//     <div className="flex flex-col max-w-6xl justify-center gap-6 text-center">
//       {/* Project Details */}
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1, delay: 0.2 }}
//         className="flex flex-col gap-3 w-auto text-center"
//       >
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, delay: 0.2 }}
//           viewport={{ once: true }}
//           className="text-center mb-8"
//         >
//           <h1 className="font-['Playfair_Display'] text-[#B8860B] font-bold text-lg md:text-2xl tracking-[5px] leading-6 uppercase relative inline-block opacity-80">
//             Recent Project
//             <div className="absolute left-0 -bottom-1 w-full h-[1px] bg-gradient-to-r from-transparent via-[#B8860B] to-transparent"></div>
//           </h1>
//         </motion.div>

//         <p className="text-lg md:text-2xl font-semibold text-gray-300 font-hubballi -mb-3">
//           SWAPIFY
//         </p>
//         <a
//           href="https://swapify.ee/"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-lg md:text-xl flex justify-center items-center gap-1.5 text-gray-600 hover:text-gray-400 transition-colors duration-200 font-hubballi group pt-2 px-20"
//         >
//           <span className="">www.swapify.ee</span>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-4 w-4 inline-block transform group-hover:translate-x-0.5 transition-transform"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
//             />
//           </svg>
//         </a>
//       </motion.div>

//       {/* Description and Role - Side by Side with ContentSection */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
//         {/* Project Description */}
//         <ContentSection title="Project Description" borderPosition="top">
//           <p>
//             A barter and donation platform where users can swap goods or donate
//             unused items to individuals and organizations who needs them
//           </p>
//         </ContentSection>

//         {/* Role */}
//         <ContentSection title="Role" borderPosition="top">
//           <p>Front-end Developer</p>
//         </ContentSection>
//       </div>

//       {/* Activity - Full Width Expandable Section */}
//       <div className="w-full -mt-6">
//         <ContentSection title="Activity" borderPosition="top">
//           <motion.ul
//             initial={{ opacity: 0, y: 50, scale: 0.8 }}
//             whileInView={{ opacity: 1, y: 0, scale: 1 }}
//             transition={{ duration: 1, delay: 0.2 }}
//             viewport={{ once: true }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-sm md:text-base text-gray-600 dark:text-white font-hubballi"
//           >
//             <motion.li
//               initial={{ opacity: 0, y: 30, scale: 0.5 }}
//               whileInView={{ opacity: 1, y: 0, scale: 1 }}
//               transition={{ duration: 1, delay: 0.2 }}
//               viewport={{ once: true }}
//               className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
//             >
//               <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
//                 Routing
//               </strong>
//               <div className="mt-3">
//                 Used Next.js routing for client-side navigation.
//               </div>
//             </motion.li>

//             <motion.li
//               initial={{ opacity: 0, y: 30, scale: 0.5 }}
//               whileInView={{ opacity: 1, y: 0, scale: 1 }}
//               transition={{ duration: 1, delay: 0.2 }}
//               viewport={{ once: true }}
//               className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
//             >
//               <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
//                 Styling
//               </strong>
//               <div className="mt-3">
//                 Used Tailwind CSS for rapid and consistent styling.
//               </div>
//             </motion.li>

//             <motion.li
//               initial={{ opacity: 0, y: 30, scale: 0.5 }}
//               whileInView={{ opacity: 1, y: 0, scale: 1 }}
//               transition={{ duration: 1, delay: 0.2 }}
//               viewport={{ once: true }}
//               className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
//             >
//               <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
//                 Pagination
//               </strong>
//               <div className="mt-3">
//                 Implemented pagination logic in the{" "}
//                 <span className="inline-flex items-center px-2 py-0.5 m-0.5 text-xs font-medium border border-gray-200 dark:border-gray-600">
//                   ProductList
//                 </span>{" "}
//                 component.
//               </div>
//             </motion.li>

//             <motion.li
//               initial={{ opacity: 0, y: 30, scale: 0.5 }}
//               whileInView={{ opacity: 1, y: 0, scale: 1 }}
//               transition={{ duration: 1, delay: 0.2 }}
//               viewport={{ once: true }}
//               className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
//             >
//               <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
//                 Responsive Design
//               </strong>
//               <div className="mt-3">
//                 Used Tailwind CSS classes to create responsive layouts.
//               </div>
//             </motion.li>

//             <motion.li
//               initial={{ opacity: 0, y: 30, scale: 0.5 }}
//               whileInView={{ opacity: 1, y: 0, scale: 1 }}
//               transition={{ duration: 1, delay: 0.2 }}
//               viewport={{ once: true }}
//               className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
//             >
//               <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
//                 Error Handling
//               </strong>
//               <div className="mt-3">
//                 Implemented error handling for API requests and form
//                 submissions.
//               </div>
//             </motion.li>

//             <motion.li
//               initial={{ opacity: 0, y: 30, scale: 0.5 }}
//               whileInView={{ opacity: 1, y: 0, scale: 1 }}
//               transition={{ duration: 1, delay: 0.2 }}
//               viewport={{ once: true }}
//               className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
//             >
//               <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
//                 Image Upload
//               </strong>
//               <div className="mt-3">
//                 Integrated Cloudinary for image uploads in the{" "}
//                 <span className="inline-flex items-center px-2 py-0.5 m-0.5 text-xs font-medium border border-gray-200 dark:border-gray-600">
//                   ItemImagesStep
//                 </span>{" "}
//                 component.
//               </div>
//             </motion.li>

//             <motion.li
//               initial={{ opacity: 0, y: 30, scale: 0.5 }}
//               whileInView={{ opacity: 1, y: 0, scale: 1 }}
//               transition={{ duration: 1, delay: 0.2 }}
//               viewport={{ once: true }}
//               className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
//             >
//               <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
//                 Accessibility
//               </strong>
//               <div className="mt-3">
//                 Implemented ARIA attributes for better accessibility e.g in the{" "}
//                 <span className="inline-flex items-center px-2 py-0.5 m-0.5 text-xs font-medium border border-gray-200 dark:border-gray-600">
//                   DeleteConfirmationModal
//                 </span>
//               </div>
//             </motion.li>

//             <motion.li
//               initial={{ opacity: 0, y: 30, scale: 0.5 }}
//               whileInView={{ opacity: 1, y: 0, scale: 1 }}
//               transition={{ duration: 1, delay: 0.2 }}
//               viewport={{ once: true }}
//               className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
//             >
//               <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
//                 Performance Optimization
//               </strong>
//               <div className="mt-3">
//                 Used React hooks and functional components for better
//                 performance.
//               </div>
//             </motion.li>

//             <motion.li
//               initial={{ opacity: 0, y: 30, scale: 0.5 }}
//               whileInView={{ opacity: 1, y: 0, scale: 1 }}
//               transition={{ duration: 1, delay: 0.2 }}
//               viewport={{ once: true }}
//               className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
//             >
//               <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
//                 Component Development
//               </strong>
//               <div className="mt-3">
//                 Created reusable UI components like{" "}
//                 <span className="inline-flex items-center px-2 py-0.5 m-0.5 text-xs font-medium border border-gray-200 dark:border-gray-600">
//                   ProductCard
//                 </span>{" "}
//                 <span className="inline-flex items-center px-2 py-0.5 m-0.5 text-xs font-medium border border-gray-200 dark:border-gray-600">
//                   AccountSettings
//                 </span>{" "}
//                 <span className="inline-flex items-center px-2 py-0.5 m-0.5 text-xs font-medium border border-gray-200 dark:border-gray-600">
//                   SidebarProfile
//                 </span>
//               </div>
//             </motion.li>

//             <motion.li
//               initial={{ opacity: 0, y: 30, scale: 0.5 }}
//               whileInView={{ opacity: 1, y: 0, scale: 1 }}
//               transition={{ duration: 1, delay: 0.2 }}
//               viewport={{ once: true }}
//               className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
//             >
//               <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
//                 Form Handling
//               </strong>
//               <div className="mt-3">
//                 Implemented form submission logic e.g in{" "}
//                 <span className="inline-flex items-center px-2 py-0.5 m-0.5 text-xs font-medium border border-gray-200 dark:border-gray-600">
//                   NewsLetterModal
//                 </span>
//                 and validated form inputs.
//               </div>
//             </motion.li>

//             <motion.li
//               initial={{ opacity: 0, y: 30, scale: 0.5 }}
//               whileInView={{ opacity: 1, y: 0, scale: 1 }}
//               transition={{ duration: 1, delay: 0.2 }}
//               viewport={{ once: true }}
//               className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
//             >
//               <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
//                 State Management
//               </strong>
//               <div className="mt-3">
//                 Used React hooks{" "}
//                 <span className="inline-flex items-center px-2 py-0.5 m-0.5 text-xs font-medium border border-gray-200 dark:border-gray-600">
//                   useState
//                 </span>{" "}
//                 <span className="inline-flex items-center px-2 py-0.5 m-0.5 text-xs font-medium border border-gray-200 dark:border-gray-600">
//                   useEffect
//                 </span>{" "}
//                 and implemented custom hooks{" "}
//                 <span className="inline-flex items-center px-2 py-0.5 m-0.5 text-xs font-medium border border-gray-200 dark:border-gray-600">
//                   useModal
//                 </span>{" "}
//                 for managing modals.
//               </div>
//             </motion.li>

//             <motion.li
//               initial={{ opacity: 0, y: 30, scale: 0.5 }}
//               whileInView={{ opacity: 1, y: 0, scale: 1 }}
//               transition={{ duration: 1, delay: 0.2 }}
//               viewport={{ once: true }}
//               className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
//             >
//               <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
//                 API Integration
//               </strong>
//               <div className="mt-3">
//                 Set up Axios instance for making API requests and created
//                 utility functions for{" "}
//                 <span className="inline-flex items-center px-2 py-0.5 m-0.5 text-xs font-medium border border-gray-200 dark:border-gray-600">
//                   GET
//                 </span>
//                 ,{" "}
//                 <span className="inline-flex items-center px-2 py-0.5 m-0.5 text-xs font-medium border border-gray-200 dark:border-gray-600">
//                   POST
//                 </span>
//                 ,{" "}
//                 <span className="inline-flex items-center px-2 py-0.5 m-0.5 text-xs font-medium border border-gray-200 dark:border-gray-600">
//                   PUT
//                 </span>
//                 <span className="inline-flex items-center px-2 py-0.5 m-0.5 text-xs font-medium border border-gray-200 dark:border-gray-600">
//                   UPDATE
//                 </span>
//                 , and{" "}
//                 <span className="inline-flex items-center px-2 py-0.5 m-0.5 text-xs font-medium border border-gray-200 dark:border-gray-600">
//                   DELETE
//                 </span>{" "}
//                 requests.
//               </div>
//             </motion.li>

//             <motion.li
//               initial={{ opacity: 0, y: 30, scale: 0.5 }}
//               whileInView={{ opacity: 1, y: 0, scale: 1 }}
//               transition={{ duration: 1, delay: 0.2 }}
//               viewport={{ once: true }}
//               className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
//             >
//               <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
//                 TypeScript Integration
//               </strong>
//               <div className="mt-3">
//                 Used TypeScript for type checking and improving code quality.
//                 Created type definitions for API responses and component props.
//               </div>
//             </motion.li>

//             <motion.li
//               initial={{ opacity: 0, y: 30, scale: 0.5 }}
//               whileInView={{ opacity: 1, y: 0, scale: 1 }}
//               transition={{ duration: 1, delay: 0.2 }}
//               viewport={{ once: true }}
//               className="relative pt-4 pb-4 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
//             >
//               <strong className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 py-1 px-3 whitespace-nowrap">
//                 User Experience
//               </strong>
//               <div className="mt-3">
//                 Implemented loading states and feedback (e.g., in the{" "}
//                 <span className="inline-flex items-center px-2 py-0.5 m-0.5 text-xs font-medium border border-gray-200 dark:border-gray-600">
//                   ActiveListingsGrid
//                 </span>{" "}
//                 component) and created interactive elements like modals and
//                 confirmation dialogs.
//               </div>
//             </motion.li>
//           </motion.ul>
//         </ContentSection>
//       </div>
//     </div>
//   );
// }
