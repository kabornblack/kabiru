// eslint-disable-next-line @typescript-eslint/no-unused-vars

"use client";

import React from "react";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import ContactForm from "./ContactForm";

function Contact() {
  return (
    <div className="flex flex-col justify-center w-full min-h-auto transform transition-all duration-700">
      {/* <AnimatedCircles /> */}
      <div className="flex flex-col px-8 md:px-32 max-w-6xl mx-auto justify-center items-start text-center min-h-3 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className=" py-4"
        >
          <h1 className="font-['Playfair_Display'] text-[#B8860B] font-bold text-2xl md:text-4xl tracking-[5px] leading-6 uppercase relative inline-block opacity-80 pb-1">
            Contact
            <div className="absolute left-0 -bottom-1 w-full h-[1px] bg-gradient-to-r from-transparent via-[#B8860B] to-transparent"></div>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        ></motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h4 className="text-[#B8860B] text-lg md:text-xl  leading-1  font-hubballi py-6">
            {`If you think I have what you need, let's talk.`}
          </h4>
        </motion.div>

        <motion.div
          className="flex-row"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex justify-center pb-4 space-x-2 text-gray-700 dark:text-gray-200 font-serif tracking-[2px]">
            <MapPinIcon className="h-4 w-4 text-[#B8860B] mt-1" />
            <p className="contact-p font-hubballi text-lg">Tallinn, Estonia</p>
          </div>
        </motion.div>

        <ContactForm />
      </div>
      <div className=" pb-10 blur-sm opacity-5">
        <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
        <div className="bg-gradient-to-r from-[#B8860B] via-gray-100 to-[#B8860B] dark:from-[#B8860B] dark:via-gray-950 dark:to-[#B8860B] h-1 " />
        <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
      </div>
    </div>
  );
}

export default Contact;
