"use client";

import React, { useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  validateContact,
  type ContactErrors,
  type ContactField,
} from "@/lib/contactValidation";
import { HoneypotField, useEmailForm } from "@/lib/useEmailForm";

type FieldName = ContactField;
type FieldErrors = ContactErrors;

const FIELD_ORDER: FieldName[] = ["name", "email", "subject", "message"];

const labelClass = "text-xs tracking-[0.08em] text-[var(--text-muted)] uppercase";

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const reducedMotion = useReducedMotion();

  // Loaded only after a successful send, never for reduced motion.
  const triggerConfetti = async () => {
    if (reducedMotion) return;

    try {
      const { default: confetti } = await import("canvas-confetti");
      const colors = ["#B8860B", "#CD853F", "#DAA520", "#D4AF37"];
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.55, x: 0.5 },
        colors,
        disableForReducedMotion: true,
      });
    } catch {
      // Purely decorative; a failed chunk load must not affect the form.
    }
  };

  const clearError = (field: FieldName) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const { formRef, loading, handleSubmit } = useEmailForm({
    validate: (data) => {
      const nextErrors = validateContact(data, FIELD_ORDER);
      setErrors(nextErrors);
      const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
      if (!firstInvalid) return true;

      setStatus("idle");
      setStatusMessage("");
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return false;
    },
    onSending: () => {
      setStatus("idle");
      setStatusMessage("");
    },
    onSuccess: ({ honeypot }) => {
      setStatus("success");
      setStatusMessage("Message sent successfully. Thank you!");
      if (!honeypot) void triggerConfetti();
    },
    onError: () => {
      setStatus("error");
      setStatusMessage("Something went wrong. Please try again.");
    },
  });

  /** Props shared by every visible field: error wiring + scoped styling. */
  const fieldProps = (field: FieldName) => ({
    id: `contact-${field}`,
    name: field,
    required: true,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `contact-${field}-error` : undefined,
    onInput: () => clearError(field),
  });

  const FieldError = ({ field }: { field: FieldName }) =>
    errors[field] ? (
      <p
        id={`contact-${field}-error`}
        className="text-sm text-red-400"
        aria-live="polite"
      >
        {errors[field]}
      </p>
    ) : null;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      aria-busy={loading}
      className="flex w-full flex-1 flex-col space-y-4 text-left font-sans text-sm"
      noValidate
    >
      <HoneypotField id="company_website" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-name" className={labelClass}>
            Name
          </label>
          <input
            {...fieldProps("name")}
            className="field-input focus-ring contact-field"
            type="text"
            placeholder="Your name"
            autoComplete="name"
          />
          <FieldError field="name" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-email" className={labelClass}>
            Email
          </label>
          <input
            {...fieldProps("email")}
            className="field-input focus-ring contact-field"
            type="email"
            inputMode="email"
            placeholder="you@example.com"
            autoComplete="email"
          />
          <FieldError field="email" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-subject" className={labelClass}>
          Subject
        </label>
        <input
          {...fieldProps("subject")}
          className="field-input focus-ring contact-field"
          type="text"
          placeholder="What is this about?"
        />
        <FieldError field="subject" />
      </div>

      {/* Message grows into whatever height the panel has left. */}
      <div className="flex flex-1 flex-col gap-1.5">
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          {...fieldProps("message")}
          className="field-input focus-ring contact-field min-h-28 flex-1 resize-y"
          placeholder="Tell me about the role or project..."
        />
        <FieldError field="message" />
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

      <div>
        <button
          className={[
            "focus-ring btn-primary contact-submit w-full sm:w-auto",
            loading ? "cursor-not-allowed opacity-60" : "",
          ].join(" ")}
          type="submit"
          disabled={loading}
        >
          {loading && (
            <span
              aria-hidden="true"
              className="mr-2 h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
            />
          )}
          {loading ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
}

export default ContactForm;
