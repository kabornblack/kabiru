"use client";

import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import Script from "next/script";

// Add TypeScript declarations for the confetti library
declare global {
  interface Window {
    confetti: {
      (options?: {
        particleCount?: number;
        angle?: number;
        spread?: number;
        startVelocity?: number;
        decay?: number;
        gravity?: number;
        drift?: number;
        ticks?: number;
        origin?: {
          x?: number;
          y?: number;
        };
        colors?: string[];
        shapes?: string[];
        scalar?: number;
        zIndex?: number;
        disableForReducedMotion?: boolean;
        duration?: number;
      }): Promise<void> | null;
      create(
        canvas: HTMLCanvasElement,
        options?: {
          resize?: boolean;
          useWorker?: boolean;
          disableForReducedMotion?: boolean;
        },
      ): (
        options?: Parameters<typeof window.confetti>[0],
      ) => Promise<void> | null;
      reset(): void;
    };
  }
}

function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Debug confetti availability
  useEffect(() => {
    if (scriptLoaded) {
      console.log("Confetti script is loaded and ready");
    }
  }, [scriptLoaded]);

  // Simple confetti function that doesn't rely on creating a canvas
  const triggerSimpleConfetti = () => {
    if (typeof window !== "undefined" && window.confetti) {
      console.log("Triggering simple confetti");

      // Colors that match your theme
      const colors = ["#B8860B", "#CD853F", "#DAA520", "#D4AF37"];

      // Center burst
      window.confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.5, x: 0.5 },
        colors: colors,
      });

      // Side bursts
      window.confetti({
        particleCount: 50,
        angle: 60,
        spread: 80,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });

      window.confetti({
        particleCount: 50,
        angle: 120,
        spread: 80,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });
    } else {
      console.error("Confetti is not available");
    }
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        e.currentTarget,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC!,
      )
      .then(
        (result) => {
          setLoading(false);
          console.log("SUCCESS!", result.text);

          // Try to trigger confetti when email is sent successfully
          if (typeof window.confetti === "function") {
            console.log("Email sent, triggering confetti");
            triggerSimpleConfetti();
          } else {
            console.error("Confetti not available after successful email");
          }
        },
        (error) => {
          setLoading(false);
          alert("Oops! Something went wrong. Please try again.");
          console.log("FAILED...", error.text);
        },
      );

    e.currentTarget.reset();
  };

  return (
    <div ref={containerRef} className="relative w-full font-protest">
      {/* Load the confetti script from CDN */}
      <Script
        src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"
        onLoad={() => {
          console.log("Confetti script loaded");
          setScriptLoaded(true);
        }}
        onError={(e) => console.error("Error loading confetti script:", e)}
        strategy="afterInteractive"
      />

      <motion.form
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        viewport={{ once: true }}
        ref={form}
        onSubmit={sendEmail}
        className="flex flex-col space-y-2 w-full max-w-4xl mx-auto font-protest text-gray-200 dark:text-gray-200 font-serif text-center text-sm pt-2"
      >
        <motion.div
          className="flex space-x-2"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <input
            className="w-full p-2 border border-gray-400 dark:border-gray-500 outline-none bg-transparent text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
            name="name"
            type="text"
            placeholder="Name"
            required
          />
          <input
            className="w-full p-2 border border-gray-400 dark:border-gray-500 outline-none bg-transparent text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
            name="email"
            type="email"
            placeholder="Email"
            required
          />
        </motion.div>

        <motion.div
          className="form-group"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <input
            className="w-full p-2 border border-gray-400 dark:border-gray-500 outline-none bg-transparent text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
            name="subject"
            type="text"
            placeholder="Subject"
            required
          />
        </motion.div>

        <motion.div
          className="form-group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          <textarea
            className="w-full p-2 h-28 border border-gray-400 dark:border-gray-500 outline-none bg-transparent text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
            name="message"
            placeholder="Message here.."
            required
          />
        </motion.div>

        <motion.div
          className="form-group pt-4"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.6 }}
        >
          <button
            className={`px-6 py-3 top-3 border border-border-[#B8860B] dark:border-border-[#B8860B] uppercase text-xs tracking-widest text-slate-500 placeholder-gray-400 dark:placeholder-gray-500 transition-all hover:border hover:bg-gray-800 hover:text-gray-300 mb-20 ${
              loading ? "opacity-50 cursor-not-allowed" : "active:cursor-wait"
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </motion.div>
      </motion.form>
    </div>
  );
}

export default ContactForm;
