"use client";

import React from "react";
import { InlineWidget } from "react-calendly";
import { motion } from "framer-motion";

interface CalendlyBookingProps {
  url: string;
  className?: string;
}

const CalendlyBooking: React.FC<CalendlyBookingProps> = ({
  url,
  className = "",
}) => {
  return (
    // <div className={`calendly-container font-protest w-full ${className}`}>
    <div
      className={`calendly-container font-protest w-full bg-gray-950 ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full"
      >
        <InlineWidget
          url={url}
          styles={{
            height: "650px",
            width: "100%",
          }}
        />
      </motion.div>
    </div>
  );
};

export default CalendlyBooking;
