"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, useReducedMotion } from "framer-motion";

declare global {
  interface Window {
    confetti?: (options?: {
      particleCount?: number;
      angle?: number;
      spread?: number;
      origin?: { x?: number; y?: number };
      colors?: string[];
      disableForReducedMotion?: boolean;
    }) => void;
  }
}

function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const reducedMotion = useReducedMotion();

  const triggerConfetti = () => {
    if (reducedMotion || typeof window === "undefined" || !window.confetti) {
      return;
    }

    const colors = ["#B8860B", "#CD853F", "#DAA520", "#D4AF37"];
    window.confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.55, x: 0.5 },
      colors,
      disableForReducedMotion: true,
    });
  };

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current || loading) return;

    const formData = new FormData(form.current);
    const honeypot = String(formData.get("company_website") || "");
    if (honeypot.trim()) {
      setStatus("success");
      setStatusMessage("Message sent successfully. Thank you!");
      form.current.reset();
      return;
    }

    setLoading(true);
    setStatus("idle");
    setStatusMessage("");

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC!,
      );

      setStatus("success");
      setStatusMessage("Message sent successfully. Thank you!");
      form.current.reset();
      triggerConfetti();
    } catch {
      setStatus("error");
      setStatusMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full">
      <motion.form
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.4 }}
        viewport={{ once: true }}
        ref={form}
        onSubmit={sendEmail}
        className="mx-auto flex w-full max-w-3xl flex-col space-y-4 text-left text-sm"
        noValidate
      >
        <div
          className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
          aria-hidden="true"
        >
          <label htmlFor="company_website">Company website</label>
          <input
            id="company_website"
            name="company_website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="contact-name"
              className="text-xs tracking-[0.08em] text-[var(--text-muted)] uppercase"
            >
              Name
            </label>
            <input
              id="contact-name"
              className="field-input focus-ring"
              name="name"
              type="text"
              placeholder="Your name"
              required
              autoComplete="name"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="contact-email"
              className="text-xs tracking-[0.08em] text-[var(--text-muted)] uppercase"
            >
              Email
            </label>
            <input
              id="contact-email"
              className="field-input focus-ring"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-subject"
            className="text-xs tracking-[0.08em] text-[var(--text-muted)] uppercase"
          >
            Subject
          </label>
          <input
            id="contact-subject"
            className="field-input focus-ring"
            name="subject"
            type="text"
            placeholder="What is this about?"
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-message"
            className="text-xs tracking-[0.08em] text-[var(--text-muted)] uppercase"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            className="field-input focus-ring h-28 resize-y"
            name="message"
            placeholder="Tell me about the role or project..."
            required
          />
        </div>

        <div
          className="min-h-5 text-sm"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {status === "success" ? (
            <p className="text-emerald-400">{statusMessage}</p>
          ) : null}
          {status === "error" ? (
            <p className="text-red-400">{statusMessage}</p>
          ) : null}
        </div>

        <div className="">
          <button
            className={[
              "focus-ring btn-primary w-full sm:w-auto",
              loading ? "cursor-not-allowed opacity-50" : "",
            ].join(" ")}
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>
      </motion.form>
    </div>
  );
}

export default ContactForm;
