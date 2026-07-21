"use client";

import React from "react";
import { InlineWidget } from "react-calendly";
import { motion, useReducedMotion } from "framer-motion";

interface CalendlyBookingProps {
  url: string;
  className?: string;
}

function CalendlyLoadingSpinner() {
  return (
    <div
      className="flex min-h-[320px] items-center justify-center text-sm text-[var(--text-muted)]"
      role="status"
    >
      Loading scheduling calendar…
    </div>
  );
}

const CalendlyBooking: React.FC<CalendlyBookingProps> = ({
  url,
  className = "",
}) => {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className={`calendly-container w-full bg-[var(--page-bg)] ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.5 }}
        viewport={{ once: true }}
        className="relative w-full overflow-hidden rounded-lg border border-[var(--border-subtle)]"
      >
        <InlineWidget
          url={url}
          styles={{
            height: "650px",
            width: "100%",
            minWidth: "280px",
          }}
          pageSettings={{
            backgroundColor: "030712",
            primaryColor: "b8860b",
            textColor: "e5e7eb",
          }}
          iframeTitle="Schedule a meeting with Kabiru Shaibu"
          LoadingSpinner={CalendlyLoadingSpinner}
        />
      </motion.div>
    </div>
  );
};

export default CalendlyBooking;
