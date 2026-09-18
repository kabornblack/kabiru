"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import ExitIntentForm from "./ExitIntentForm";
import { PUBLIC_EMAIL, PUBLIC_EMAIL_MAILTO } from "@/lib/contact";

const SESSION_KEY = "exit_intent_shown";
const ARM_DELAY_MS = 4000;

/**
 * Desktop-only exit-intent modal: arms after a short delay, then watches for
 * the mouse leaving through the top of the viewport (the classic "about to
 * close the tab / switch away" signal). Fires at most once per tab session.
 */
export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Mouse-based exit-intent only makes sense with a precise pointer.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // sessionStorage unavailable (private/locked-down browser) — skip
      // rather than risk showing on every mouse movement.
      alreadyShown = true;
    }
    if (alreadyShown) return;

    let armed = false;
    const armTimer = window.setTimeout(() => {
      armed = true;
    }, ARM_DELAY_MS);

    const handleMouseOut = (event: MouseEvent) => {
      if (!armed) return;
      // relatedTarget is null only when the pointer leaves the document
      // entirely (toward the tab strip, address bar, etc.), not when it
      // moves between elements inside the page.
      if (event.relatedTarget === null && event.clientY <= 0) {
        setIsOpen(true);
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          // ignore — worst case it can show again this session
        }
        document.removeEventListener("mouseout", handleMouseOut);
      }
    };

    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.clearTimeout(armTimer);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    // Pause the page's own scroll container while the modal is up.
    const scrollContainer = document.getElementById("page-scroll-container");
    const previousOverflow = scrollContainer?.style.overflow ?? "";
    if (scrollContainer) scrollContainer.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (scrollContainer) scrollContainer.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{
              duration: reducedMotion ? 0 : 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-intent-heading"
            className="surface-card relative w-full max-w-md p-5 text-left sm:p-7"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              aria-label="Close"
              className="focus-ring absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full text-[var(--text-muted)] transition-colors hover:bg-white/5 hover:text-[var(--gold)]"
            >
              <FaTimes className="h-4 w-4" aria-hidden="true" />
            </button>

            {sent ? (
              <div className="py-6 text-center">
                <p className="font-display text-lg tracking-[0.04em] text-[var(--gold)] uppercase">
                  Message sent
                </p>
                <p className="mt-2 text-sm text-[var(--text-muted)]">
                  Thanks for reaching out — I&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <>
                <p className="pr-8 text-[10px] tracking-[0.18em] text-[var(--gold)] uppercase">
                  Before you go
                </p>
                <h2
                  id="exit-intent-heading"
                  className="font-display mt-2 pr-8 text-lg tracking-[0.04em] text-[var(--text-primary)] uppercase sm:text-xl"
                >
                  Looking for a developer?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  Let&apos;s connect — drop a quick note and I&apos;ll get
                  back to you.
                </p>

                <div className="mt-5">
                  <ExitIntentForm onSuccess={() => setSent(true)} />
                </div>

                <p className="mt-4 text-center text-xs text-[var(--text-muted)]">
                  Or email me directly at{" "}
                  <a
                    href={PUBLIC_EMAIL_MAILTO}
                    className="focus-ring text-[var(--gold)] hover:text-[var(--gold-hover)]"
                  >
                    {PUBLIC_EMAIL}
                  </a>
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
