"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import ContactForm from "./ContactForm";
import SectionHeading from "./SectionHeading";
import Container from "./Container";
import Connector, { StackedConnector } from "./Connector";
import { SOCIAL_LINKS } from "./Socials";
import {
  CodePunct,
  CodeString,
  CodeWindow,
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
        className="focus-ring hit-target ml-2 inline-flex min-h-8 items-center rounded-[var(--radius-sm)] bg-[var(--ink-600)] px-2 align-middle text-[13px] text-[var(--text-muted)] transition-colors hover:text-[var(--gold)]"
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
    <section id="contact" aria-labelledby="contact-heading" className="section section--rust">
      <SectionHeading
        text="Contact"
        headingId="contact-heading"
      />
      <Container className="section-body">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-center lg:gap-x-[var(--gap)]">
          {/* Top-aligned, a little below the panel's top edge. */}
          <motion.div
            className="lg:col-start-2 lg:row-start-1 lg:self-start"
            {...reveal(0)}
          >
            <p className="display-lede">
              <span className="block text-[var(--gold)]">Open to roles.</span>
              <span className="relative block text-[var(--text-primary)]">
                Let&apos;s talk.
                {/* Main panel → headline, centred on the white line's first
                    row; spans the 56px column gap to the flat panel's right
                    edge. */}
                <Connector
                  variant="horizontal"
                  length={26}
                  ghostFrom="end"
                  className="absolute top-[var(--lede-row-center)] right-full -translate-y-1/2"
                />
              </span>
            </p>
            <p className="body-copy mt-3 max-w-md">
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

            <StackedConnector stagger={1} />

            <motion.div
              className="code-window-stage relative lg:-mt-3 lg:-mr-8 lg:ml-auto lg:w-[86%]"
              {...reveal(0.2)}
            >
              {/* Main panel → contact.json (elbow off the left edge) */}
              <Connector
                variant="elbow-left"
                stagger={1}
                className="absolute top-3 right-full"
              />

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
      </Container>
    </section>
  );
}

export default Contact;
