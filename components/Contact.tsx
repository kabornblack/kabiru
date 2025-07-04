"use client";

import React, { useState, useRef } from "react";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import ContactForm from "./ContactForm";
import CalendlyBooking from "./CalendlyBooking";
import Script from "next/script";

function Contact() {
  const [activeTab, setActiveTab] = useState<"message" | "meeting">("message");
  const CALENDLY_URL = "https://calendly.com/kabornblack";
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative">
      {/* Load confetti script */}
      <Script
        src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("Confetti script loaded");
          // triggerSimpleConfetti(); // Trigger for test/demo — move later if needed
        }}
      />

      <div className="flex flex-col justify-center max-w-7xl mx-auto min-h-auto transition-all duration-700 text-center">
        <div className="flex flex-col pt-16 text-center">
          <h1 className="font-['Playfair_Display'] text-[#B8860B] font-bold text-2xl md:text-4xl tracking-[5px] uppercase relative inline-block opacity-80 pb-1">
            Contact
            <div className="absolute left-0 -bottom-1 w-full h-[1px] bg-gradient-to-r from-transparent via-[#B8860B] to-transparent"></div>
          </h1>
        </div>

        <div className="flex flex-col px-8 md:px-32 max-w-7xl mx-auto justify-center items-center text-center pt-24">
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
            <h4 className="text-[#B8860B] text-lg md:text-xl font-hubballi py-6">
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
            <div className="flex justify-center pb-4 space-x-2 text-gray-700 dark:text-gray-200 font-serif tracking-[2px]">
              <MapPinIcon className="h-4 w-4 text-[#B8860B] mt-1" />
              <p className="font-hubballi text-lg">Tallinn, Estonia</p>
            </div>
          </motion.div>

          {/* Tab selector */}
          <div className="flex items-center justify-center mb-8 w-full max-w-4xl">
            <nav className="flex justify-center w-full">
              <button
                onClick={() => setActiveTab("message")}
                className={`px-6 py-3 border-b-2 font-medium text-sm transition duration-150 ease-in-out ${
                  activeTab === "message"
                    ? "border-[#B8860B] text-[#B8860B]"
                    : "border-transparent text-gray-500 "
                }`}
              >
                Send a Message
              </button>
              <button
                onClick={() => setActiveTab("meeting")}
                className={`px-6 py-3 border-b-2 font-medium text-sm transition duration-150 ease-in-out ${
                  activeTab === "meeting"
                    ? "border-[#B8860B] text-[#B8860B]"
                    : "border-transparent text-gray-500 "
                }`}
              >
                Schedule a Meeting
              </button>
            </nav>
          </div>

          {/* Tab content */}
          <div className="w-full max-w-4xl">
            {activeTab === "message" ? (
              <ContactForm />
            ) : (
              <CalendlyBooking url={CALENDLY_URL} />
            )}
          </div>
        </div>
      </div>

      <div className="pb-10 blur-sm opacity-5">
        <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
        <div className="bg-gradient-to-r from-[#B8860B] via-gray-100 to-[#B8860B] dark:from-[#B8860B] dark:via-gray-950 dark:to-[#B8860B] h-1" />
        <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
      </div>
    </div>
  );
}

export default Contact;
