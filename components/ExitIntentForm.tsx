"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

type ExitIntentFormProps = {
  onSuccess?: () => void;
};

/** Compact name + email + optional message form — same EmailJS pipeline and template as the main ContactForm. */
function ExitIntentForm({ onSuccess }: ExitIntentFormProps) {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const sendEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.current || loading) return;

    const formData = new FormData(form.current);
    const honeypot = String(formData.get("company_website") || "");
    if (honeypot.trim()) {
      setStatus("success");
      setStatusMessage("Message sent. Thank you!");
      form.current.reset();
      onSuccess?.();
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
      setStatusMessage("Message sent — I'll reply soon.");
      form.current.reset();
      onSuccess?.();
    } catch {
      setStatus("error");
      setStatusMessage("Something went wrong. Please try again, or email me directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      ref={form}
      onSubmit={sendEmail}
      className="relative flex flex-col gap-3 text-left text-sm"
      noValidate
    >
      {/* Matches ContactForm's field name so it fills the same EmailJS template variable. */}
      <input type="hidden" name="subject" value="Exit-intent contact" />

      <div
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="exit-company_website">Company website</label>
        <input
          id="exit-company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="exit-name"
            className="text-xs tracking-[0.08em] text-[var(--text-muted)] uppercase"
          >
            Name
          </label>
          <input
            id="exit-name"
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
            htmlFor="exit-email"
            className="text-xs tracking-[0.08em] text-[var(--text-muted)] uppercase"
          >
            Email
          </label>
          <input
            id="exit-email"
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
          htmlFor="exit-message"
          className="text-xs tracking-[0.08em] text-[var(--text-muted)] uppercase"
        >
          Message <span className="normal-case text-[var(--text-muted)]">(optional)</span>
        </label>
        <textarea
          id="exit-message"
          className="field-input focus-ring h-20 resize-y"
          name="message"
          placeholder="What are you working on?"
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

      <button
        type="submit"
        disabled={loading}
        className={[
          "focus-ring btn-primary w-full",
          loading ? "cursor-not-allowed opacity-50" : "",
        ].join(" ")}
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

export default ExitIntentForm;
