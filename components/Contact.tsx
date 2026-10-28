"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import ContactForm from "./ContactForm";
import SectionTitle from "./SectionTitle";
import { SOCIAL_LINKS } from "./Socials";
import {
  CodePunct,
  CodeString,
  CodeWindow,
  StackedConnector,
  useReveal,
} from "./CodeWindow";
import { PUBLIC_EMAIL, PUBLIC_EMAIL_MAILTO } from "@/lib/contact";

const Key = ({ children }: { children: string }) => (
  <span className="text-[var(--gold)]">&quot;{children}&quot;</span>
);

const linkClass =
  "focus-ring text-[var(--text-primary)] underline decoration-[color-mix(in_srgb,var(--gold)_50%,transparent)] underline-offset-4 transition-colors hover:text-[var(--gold)]";

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PUBLIC_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure context, permissions): open the mail client instead.
      window.location.href = PUBLIC_EMAIL_MAILTO;
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy email address ${PUBLIC_EMAIL}`}
        className="focus-ring hit-target ml-2 inline-flex min-h-8 items-center rounded-[var(--radius-sm)] bg-white/[0.06] px-2 align-middle text-[13px] text-[var(--text-muted)] transition-colors hover:text-[var(--gold)]"
      >
        {copied ? "copied" : "copy"}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
    </>
  );
}

function Contact() {
  const reveal = useReveal();

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative pb-8">
      <SectionTitle
        text="Contact"
        headingId="contact-heading"
        gapSm={34}
        gapMd={48}
        gapLg={62}
      />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 px-6 pt-6 pb-6 md:px-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-center lg:gap-14 lg:px-14 lg:pt-10">
        <motion.div
          className="relative lg:col-start-2 lg:row-start-1"
          {...reveal(0)}
        >
          {/* Headline → main panel. Anchored to the headline (not the panel)
              so it stays level with it however tall the form panel is; spans
              the 56px column gap to the flat panel's right edge. */}
          <svg
            aria-hidden="true"
            className="code-connector pointer-events-none absolute top-1/2 right-full hidden -translate-y-1/2 lg:block"
            width="56"
            height="8"
            viewBox="0 0 56 8"
          >
            <line x1="3" y1="4" x2="53" y2="4" />
            <circle cx="3" cy="4" r="3" />
            <circle cx="53" cy="4" r="3" />
          </svg>
          <p className="font-display text-4xl leading-[1.05] md:text-5xl">
            <span className="block text-[var(--gold)]">Open to roles.</span>
            <span className="block text-[var(--text-primary)]">
              Let&apos;s talk.
            </span>
          </p>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
            Where strong frontend craft meets full-stack product ownership.
          </p>
        </motion.div>

        <StackedConnector />

        <div className="lg:col-start-1 lg:row-start-1 lg:pb-6">
          {/* No tilt on either panel: the main one holds a form. */}
          <motion.div className="code-window-stage relative" {...reveal(0.1)}>
            <CodeWindow title="message.ts">
              <ContactForm />
            </CodeWindow>
          </motion.div>

          <StackedConnector />

          <motion.div
            className="code-window-stage relative lg:-mt-3 lg:-mr-8 lg:ml-auto lg:w-[86%]"
            {...reveal(0.2)}
          >
            {/* Main panel → contact.json (elbow off the left edge) */}
            <svg
              aria-hidden="true"
              className="code-connector pointer-events-none absolute top-3 right-full hidden lg:block"
              width="44"
              height="52"
              viewBox="0 0 44 52"
            >
              <path d="M44 48 H4 V0" />
              <circle cx="44" cy="48" r="3" />
              <circle cx="4" cy="48" r="2" />
              <circle cx="4" cy="0" r="3" />
            </svg>

            <CodeWindow title="contact.json">
              <CodePunct>{"{"}</CodePunct>
              <div className="space-y-1 pl-4">
                <div>
                  <Key>email</Key>
                  <CodePunct>: </CodePunct>
                  <a
                    href={PUBLIC_EMAIL_MAILTO}
                    aria-label={`Email Kabiru Shaibu at ${PUBLIC_EMAIL}`}
                    className={linkClass}
                  >
                    &quot;{PUBLIC_EMAIL}&quot;
                  </a>
                  <CodePunct>,</CodePunct>
                  <CopyEmail />
                </div>
                <div>
                  <Key>location</Key>
                  <CodePunct>: </CodePunct>
                  <CodeString>Tallinn, Estonia</CodeString>
                  <CodePunct>,</CodePunct>
                </div>
                <div>
                  <Key>linkedin</Key>
                  <CodePunct>: </CodePunct>
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Kabiru Shaibu on LinkedIn (opens in a new tab)"
                    className={linkClass}
                  >
                    &quot;in/kabiru-shaibu-a81082164&quot;
                  </a>
                  <CodePunct>,</CodePunct>
                </div>
                <div>
                  <Key>github</Key>
                  <CodePunct>: </CodePunct>
                  <a
                    href={SOCIAL_LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Kabiru Shaibu on GitHub (opens in a new tab)"
                    className={linkClass}
                  >
                    &quot;kabornblack&quot;
                  </a>
                </div>
              </div>
              <CodePunct>{"}"}</CodePunct>
            </CodeWindow>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
