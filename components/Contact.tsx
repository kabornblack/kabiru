"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import ContactForm from "./ContactForm";
import CalendlyBooking from "./CalendlyBooking";
import Script from "next/script";

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

function Contact() {
  const [activeTab, setActiveTab] = useState<"message" | "meeting">("message");

  const dividerRef = useRef<HTMLDivElement | null>(null);
  const [globalProgress, setGlobalProgress] = useState(0);
  const [screenWidth, setScreenWidth] = useState(1200);

  const CALENDLY_URL = "https://calendly.com/kabornblack";

  useEffect(() => {
    let frameId: number;

    const updateProgress = () => {
      if (!dividerRef.current) return;

      setScreenWidth(window.innerWidth);

      const rect = dividerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const start = windowHeight;
      const end = windowHeight * 0.35;

      const raw = (start - rect.top) / (start - end);
      setGlobalProgress(clamp(raw, 0, 1));
    };

    const handleScroll = () => {
      if (frameId) cancelAnimationFrame(frameId);
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
      if (frameId) cancelAnimationFrame(frameId);

      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("scroll", handleScroll);

      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const letters = useMemo(() => "Contact".split(""), []);
  const letterCount = letters.length;
  const letterGap = screenWidth < 640 ? 34 : screenWidth < 1024 ? 48 : 62;

  const letterData = useMemo(() => {
    return letters.map((letter, idx) => {
      const finalX = (idx - (letterCount - 1) / 2) * letterGap;

      let startX = finalX;

      if (idx === 0) startX = -screenWidth / 2;
      if (idx === letterCount - 1) startX = screenWidth / 2;

      return {
        letter,
        startX,
        finalX,
        startScale: 0.3,
        finalScale: 1,
      };
    });
  }, [letters, letterCount, letterGap, screenWidth]);

  const progress = easeOutCubic(globalProgress);

  return (
    <div className="relative">
      <Script
        src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("Confetti script loaded");
        }}
      />

      <div className="flex flex-col justify-center max-w-7xl font-protest mx-auto min-h-auto transition-all duration-700 text-center pt-20 ">
        <div
          ref={dividerRef}
          className="relative mx-auto flex max-w-7xl items-center justify-center overflow-hidden px-6 py-20 w-full"
        >
          <div className="pointer-events-none absolute inset-x-6 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[#B8860B]/30 to-transparent" />

          <div className="relative h-20 w-full">
            {letterData.map(
              ({ letter, startX, finalX, startScale, finalScale }, idx) => {
                const currentX = startX + (finalX - startX) * progress;
                const scale = startScale + (finalScale - startScale) * progress;

                return (
                  <span
                    key={`${letter}-${idx}`}
                    style={{
                      left: "50%",
                      transform: `translateX(${currentX}px) translateY(-50%) scale(${scale})`,
                      opacity: progress,
                      willChange: "transform, opacity",
                    }}
                    className="absolute top-1/2 -translate-x-1/2 text-3xl font-protest font-black uppercase text-[#B8860B] md:text-5xl"
                  >
                    {letter}
                  </span>
                );
              },
            )}
          </div>
        </div>

        <div className="flex flex-col px-8 md:px-32 max-w-7xl mx-auto justify-center items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-[#B8860B]/80 text-lg md:text-xl font-hubballi py-6">
              {`If you think I have what you need, let's talk.`}
            </h4>
          </motion.div>

          <motion.div
            className="flex-row"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center pb-4 space-x-2 text-gray-700 font-protest dark:text-gray-200 font-serif tracking-[2px]">
              <MapPinIcon className="h-4 w-4 text-[#B8860B] mt-1" />
              <p className="font-hubballi text-lg">Tallinn, Estonia</p>
            </div>
          </motion.div>

          <div className="flex items-center justify-center mb-8 w-full max-w-4xl">
            <nav className="flex justify-center w-full">
              <button
                onClick={() => setActiveTab("message")}
                className={`px-6 py-3 border-b-2 font-medium text-sm transition duration-150 ease-in-out ${
                  activeTab === "message"
                    ? "border-[#B8860B] text-[#B8860B]"
                    : "border-transparent text-gray-500"
                }`}
              >
                Send a Message
              </button>

              <button
                onClick={() => setActiveTab("meeting")}
                className={`px-6 py-3 border-b-2 font-medium text-sm transition duration-150 ease-in-out ${
                  activeTab === "meeting"
                    ? "border-[#B8860B] text-[#B8860B]"
                    : "border-transparent text-gray-500"
                }`}
              >
                Schedule a Meeting
              </button>
            </nav>
          </div>

          <div className="w-full max-w-4xl">
            {activeTab === "message" ? (
              <ContactForm />
            ) : (
              <CalendlyBooking url={CALENDLY_URL} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

// "use client";

// import React, { useState, useRef } from "react";
// import { MapPinIcon } from "@heroicons/react/24/solid";
// import { motion } from "framer-motion";
// import ContactForm from "./ContactForm";
// import CalendlyBooking from "./CalendlyBooking";
// import Script from "next/script";

// function Contact() {
//   const [activeTab, setActiveTab] = useState<"message" | "meeting">("message");
//   const CALENDLY_URL = "https://calendly.com/kabornblack";
//   const containerRef = useRef<HTMLDivElement>(null);

//   return (
//     <div ref={containerRef} className="relative">
//       {/* Load confetti script */}
//       <Script
//         src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"
//         strategy="afterInteractive"
//         onLoad={() => {
//           console.log("Confetti script loaded");
//           // triggerSimpleConfetti(); // Trigger for test/demo — move later if needed
//         }}
//       />

//       <div className="flex flex-col justify-center max-w-7xl font-protest mx-auto min-h-auto transition-all duration-700 text-center pt-28 pb-16">
//         <div className="flex flex-col pt-16 text-center">
//           <h1 className="font-['Playfair_Display'] text-[#B8860B] font-bold text-2xl md:text-4xl tracking-[5px] uppercase relative inline-block opacity-80 pb-1">
//             Contact
//             <div className="absolute left-0 -bottom-1 w-full h-[1px] bg-gradient-to-r from-transparent via-[#B8860B] to-transparent"></div>
//           </h1>
//         </div>

//         <div className="flex flex-col px-8 md:px-32 max-w-7xl mx-auto justify-center items-center text-center pt-24">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.5 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             viewport={{ once: true }}
//           />

//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             viewport={{ once: true }}
//           >
//             <h4 className="text-[#B8860B] text-lg md:text-xl font-hubballi py-6">
//               {`If you think I have what you need, let's talk.`}
//             </h4>
//           </motion.div>

//           <motion.div
//             className="flex-row"
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.6 }}
//             viewport={{ once: true }}
//           >
//             <div className="flex justify-center pb-4 space-x-2 text-gray-700 font-protest dark:text-gray-200 font-serif tracking-[2px]">
//               <MapPinIcon className="h-4 w-4 text-[#B8860B] mt-1" />
//               <p className="font-hubballi text-lg">Tallinn, Estonia</p>
//             </div>
//           </motion.div>

//           {/* Tab selector */}
//           <div className="flex items-center justify-center mb-8 w-full max-w-4xl">
//             <nav className="flex justify-center w-full">
//               <button
//                 onClick={() => setActiveTab("message")}
//                 className={`px-6 py-3 border-b-2 font-medium text-sm transition duration-150 ease-in-out ${
//                   activeTab === "message"
//                     ? "border-[#B8860B] text-[#B8860B]"
//                     : "border-transparent text-gray-500 "
//                 }`}
//               >
//                 Send a Message
//               </button>
//               <button
//                 onClick={() => setActiveTab("meeting")}
//                 className={`px-6 py-3 border-b-2 border-[#B8860B] font-medium text-sm transition duration-150 ease-in-out ${
//                   activeTab === "meeting"
//                     ? "border-[#B8860B] text-[#B8860B]"
//                     : "border-transparent text-gray-500 "
//                 }`}
//               >
//                 Schedule a Meeting
//               </button>
//             </nav>
//           </div>

//           {/* Tab content */}
//           <div className="w-full max-w-4xl">
//             {activeTab === "message" ? (
//               <ContactForm />
//             ) : (
//               <CalendlyBooking url={CALENDLY_URL} />
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="pb-10 blur-sm opacity-5">
//         <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
//         <div className="bg-gradient-to-r from-[#B8860B] via-gray-100 to-[#B8860B] dark:from-[#B8860B] dark:via-gray-950 dark:to-[#B8860B] h-1" />
//         <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
//       </div>
//     </div>
//   );
// }

// export default Contact;
