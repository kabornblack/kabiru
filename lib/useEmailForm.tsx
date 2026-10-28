"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

/** Name of the hidden field bots fill in and people never see. */
const HONEYPOT_FIELD = "company_website";

/** Off-screen honeypot input; give each form its own `id`. */
export function HoneypotField({ id }: { id: string }) {
  return (
    <div
      className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      aria-hidden="true"
    >
      <label htmlFor={id}>Company website</label>
      <input
        id={id}
        name={HONEYPOT_FIELD}
        type="text"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}

type EmailFormOptions = {
  /** Client-side checks; return false to stop (show errors there). */
  validate?: (data: FormData) => boolean;
  /** Right before the EmailJS request. */
  onSending?: () => void;
  /** After a send, or straight away when the honeypot is filled (`honeypot: true`; nothing is sent). */
  onSuccess: (result: { honeypot: boolean }) => void;
  onError: () => void;
};

/**
 * Submit handling shared by the Contact and exit-intent forms: honeypot
 * check, validation hook, then EmailJS (same service and template).
 */
export function useEmailForm({ validate, onSending, onSuccess, onError }: EmailFormOptions) {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = formRef.current;
    if (!form || loading) return;

    const data = new FormData(form);
    if (String(data.get(HONEYPOT_FIELD) || "").trim()) {
      form.reset();
      onSuccess({ honeypot: true });
      return;
    }

    if (validate && !validate(data)) return;

    setLoading(true);
    onSending?.();

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC!,
      );
      form.reset();
      onSuccess({ honeypot: false });
    } catch {
      onError();
    } finally {
      setLoading(false);
    }
  };

  return { formRef, loading, handleSubmit };
}
