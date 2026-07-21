"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { motion, useReducedMotion } from "framer-motion";
import Script from "next/script";
import { FaEnvelope, FaFileDownload } from "react-icons/fa";
import ContactForm from "./ContactForm";
import CalendlyBooking from "./CalendlyBooking";
import Socials from "./Socials";
import {
  CV_FILENAME,
  CV_URL,
  PUBLIC_EMAIL,
  PUBLIC_EMAIL_MAILTO,
} from "@/lib/contact";

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);
const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

function Contact() {
  const [activeTab, setActiveTab] = useState<"message" | "meeting">("message");
  const dividerRef = useRef<HTMLDivElement | null>(null);
  const [globalProgress, setGlobalProgress] = useState(0);
  const [screenWidth, setScreenWidth] = useState(1200);
  const tabId = useId();
  const reducedMotion = useReducedMotion();
  const CALENDLY_URL = "https://calendly.com/kabornblack";

  useEffect(() => {
    let frameId: number;

    const updateProgress = () => {
      if (!dividerRef.current) return;
      setScreenWidth(window.innerWidth);

      if (reducedMotion) {
        setGlobalProgress(1);
        return;
      }

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
  }, [reducedMotion]);

  const letters = useMemo(() => "Contact".split(""), []);
  const letterCount = letters.length;
  const letterGap = screenWidth < 640 ? 34 : screenWidth < 1024 ? 48 : 62;

  const letterData = useMemo(() => {
    return letters.map((letter, idx) => {
      const finalX = (idx - (letterCount - 1) / 2) * letterGap;
      let startX = finalX;
      if (idx === 0) startX = -screenWidth / 2;
      if (idx === letterCount - 1) startX = screenWidth / 2;
      return { letter, startX, finalX, startScale: 0.3, finalScale: 1 };
    });
  }, [letters, letterCount, letterGap, screenWidth]);

  const progress = reducedMotion ? 1 : easeOutCubic(globalProgress);

  return (
    <div className="relative">
      <Script
        src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"
        strategy="afterInteractive"
      />

      <div className="mx-auto flex max-w-7xl flex-col justify-center pt-8 text-center md:pt-10">
        <div ref={dividerRef} className="section-title-wrap">
          <div className="pointer-events-none absolute inset-x-6 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[rgba(184,134,11,0.3)] to-transparent" />
          <div className="relative h-14 w-full md:h-16">
            <h2 className="sr-only">Contact</h2>
            {letterData.map(
              ({ letter, startX, finalX, startScale, finalScale }, idx) => {
                const currentX = startX + (finalX - startX) * progress;
                const scale = startScale + (finalScale - startScale) * progress;
                return (
                  <span
                    key={`${letter}-${idx}`}
                    aria-hidden="true"
                    style={{
                      left: "50%",
                      transform: `translateX(${currentX}px) translateY(-50%) scale(${scale})`,
                      opacity: progress,
                    }}
                    className="font-display absolute top-1/2 -translate-x-1/2 text-3xl font-black uppercase text-[var(--gold)] md:text-4xl"
                  >
                    {letter}
                  </span>
                );
              },
            )}
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center px-5 pb-12 text-center md:px-6">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.4 }}
            viewport={{ once: true }}
            className="max-w-xl text-sm text-[var(--text-muted)] md:text-base"
          >
            Open to roles where strong frontend craft meets full-stack product
            ownership. Let&apos;s talk.
          </motion.p>

          <div className="mt-3 flex items-center justify-center gap-2 text-[var(--text-muted)]">
            <MapPinIcon
              className="h-4 w-4 text-[var(--gold)]"
              aria-hidden="true"
            />
            <p className="text-sm md:text-base">Tallinn, Estonia</p>
          </div>

          <div className="mt-4 mb-6 flex flex-col items-center gap-4">
            <a
              href={PUBLIC_EMAIL_MAILTO}
              aria-label={`Email Kabiru Shaibu at ${PUBLIC_EMAIL}`}
              className="focus-ring inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--gold)] md:text-base"
            >
              <FaEnvelope
                className="h-4 w-4 text-[var(--gold)]"
                aria-hidden="true"
              />
              <span>{PUBLIC_EMAIL}</span>
            </a>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Socials />
              <a
                href={CV_URL}
                download={CV_FILENAME}
                aria-label="Download Kabiru Shaibu CV PDF"
                className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] px-4 text-xs tracking-[0.12em] text-[var(--text-muted)] uppercase transition-colors hover:border-[var(--border-gold)] hover:text-[var(--gold)]"
              >
                <FaFileDownload className="h-4 w-4" aria-hidden="true" />
                Download CV
              </a>
            </div>
          </div>

          <div className="surface-card w-full p-5 md:p-7">
            <div
              role="tablist"
              aria-label="Contact options"
              className="mb-6 inline-flex w-full rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-black/20 p-1"
            >
              <button
                id={`${tabId}-message`}
                type="button"
                role="tab"
                aria-selected={activeTab === "message"}
                aria-controls={`${tabId}-message-panel`}
                onClick={() => setActiveTab("message")}
                className={[
                  "focus-ring min-h-10 flex-1 rounded-[5px] px-3 py-2.5 text-xs font-semibold tracking-[0.08em] uppercase transition-all duration-200 md:text-sm",
                  activeTab === "message"
                    ? "bg-[rgba(184,134,11,0.18)] text-[var(--gold)] shadow-[var(--shadow-gold)]"
                    : "text-[var(--text-muted)] hover:text-[var(--gold)]",
                ].join(" ")}
              >
                Send a Message
              </button>
              <button
                id={`${tabId}-meeting`}
                type="button"
                role="tab"
                aria-selected={activeTab === "meeting"}
                aria-controls={`${tabId}-meeting-panel`}
                onClick={() => setActiveTab("meeting")}
                className={[
                  "focus-ring min-h-10 flex-1 rounded-[5px] px-3 py-2.5 text-xs font-semibold tracking-[0.08em] uppercase transition-all duration-200 md:text-sm",
                  activeTab === "meeting"
                    ? "bg-[rgba(184,134,11,0.18)] text-[var(--gold)] shadow-[var(--shadow-gold)]"
                    : "text-[var(--text-muted)] hover:text-[var(--gold)]",
                ].join(" ")}
              >
                Schedule a Meeting
              </button>
            </div>

            {activeTab === "message" ? (
              <div
                id={`${tabId}-message-panel`}
                role="tabpanel"
                aria-labelledby={`${tabId}-message`}
              >
                <ContactForm />
              </div>
            ) : (
              <div
                id={`${tabId}-meeting-panel`}
                role="tabpanel"
                aria-labelledby={`${tabId}-meeting`}
              >
                <CalendlyBooking url={CALENDLY_URL} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
