"use client";

import { useState } from "react";
import {
  validateContact,
  type ContactErrors,
  type ContactField,
} from "@/lib/contactValidation";
import { HoneypotField, useEmailForm } from "@/lib/useEmailForm";
import ScrambleText from "./ScrambleText";

type ExitIntentFormProps = {
  onSuccess?: () => void;
};

/** Required here; the message is optional. */
const REQUIRED_FIELDS: ContactField[] = ["name", "email"];

const labelClass = "text-xs tracking-[0.08em] text-[var(--text-muted)] uppercase";

/** Compact name + email + optional message form — same EmailJS pipeline and template as the main ContactForm. */
function ExitIntentForm({ onSuccess }: ExitIntentFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [errors, setErrors] = useState<ContactErrors>({});

  const clearError = (field: ContactField) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const { formRef, loading, handleSubmit } = useEmailForm({
    validate: (data) => {
      const nextErrors = validateContact(data, REQUIRED_FIELDS);
      setErrors(nextErrors);
      const firstInvalid = REQUIRED_FIELDS.find((field) => nextErrors[field]);
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
      setStatusMessage(honeypot ? "Message sent. Thank you!" : "Message sent — I'll reply soon.");
      onSuccess?.();
    },
    onError: () => {
      setStatus("error");
      setStatusMessage("Something went wrong. Please try again, or email me directly.");
    },
  });

  /** Error wiring for a required field. */
  const fieldProps = (field: ContactField) => ({
    id: `exit-${field}`,
    name: field,
    required: true,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `exit-${field}-error` : undefined,
    onInput: () => clearError(field),
  });

  const FieldError = ({ field }: { field: ContactField }) =>
    errors[field] ? (
      <p id={`exit-${field}-error`} className="text-sm text-red-400" aria-live="polite">
        {errors[field]}
      </p>
    ) : null;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="relative flex flex-col gap-3 text-left text-sm"
      noValidate
    >
      {/* Matches ContactForm's field name so it fills the same EmailJS template variable. */}
      <input type="hidden" name="subject" value="Exit-intent contact" />

      <HoneypotField id="exit-company_website" />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="exit-name" className={labelClass}>
            Name
          </label>
          <input
            {...fieldProps("name")}
            className="field-input focus-ring"
            type="text"
            placeholder="Your name"
            autoComplete="name"
          />
          <FieldError field="name" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="exit-email" className={labelClass}>
            Email
          </label>
          <input
            {...fieldProps("email")}
            className="field-input focus-ring"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
          />
          <FieldError field="email" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="exit-message" className={labelClass}>
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
        <ScrambleText text={loading ? "Sending..." : "Send Message"} />
      </button>
    </form>
  );
}

export default ExitIntentForm;
