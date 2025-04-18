// eslint-disable-next-line @typescript-eslint/no-unused-vars

"use client";

import React, { useEffect, useState } from "react";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import ContactForm from "./ContactForm";
// import ContactForm from "./ContactForm";
// import AnimatedCircles from "./AnimatedCircles";

function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  // const ref = useRef(null);

  useEffect(() => {
    // Trigger the animation after the component mounts
    setIsVisible(true);
  }, []);

  return (
    <div
      // ref={ref}
      // className="flex flex-col relative text-center px-10 justify-evenly max-w-3xl mx-auto items-center pt-20 pb-10"
      className={`relative top-0 left-0 w-full min-h-screen transform transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
      style={{
        background: `linear-gradient(
          to bottom, 
          var(--bg-start), 
          var(--bg-end)
        )`,
      }}
    >
      {/* <AnimatedCircles /> */}
      <div className="flex flex-col px-8 md:px-32 max-w-6xl  2xl:mx-auto justify-start 2xl:justify-center items-start min-h-3 py-48">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className=" py-4"
        >
          <h2 className="font-hubballi font-bold text-2xl md:text-3xl tracking-3xl leading-6 text-gray-500 dark:text-white uppercase">
            contact
          </h2>
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
    </div>
  );
}

export default Contact;
