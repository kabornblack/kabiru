// eslint-disable-next-line @typescript-eslint/no-unused-vars

"use client";

// import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

function ContactForm() {
  // const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        // form.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(
        () => {
          alert("Congratulations! Email sent successfully.");
        },
        (error) => {
          alert("Oops! Something went wrong. Please try again.");
          console.log("FAILED...", error.text);
        }
      );

    e.currentTarget.reset();
  };

  return (
    <div>
      <motion.form
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        viewport={{ once: true }}
        // ref={form}
        onSubmit={sendEmail}
        className="flex flex-col space-y-2 w-full max-w-4xl mx-auto text-gray-200 dark:text-gray-200 font-serif text-sm pt-2"
      >
        <motion.div
          className="flex space-x-2"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <input
            className="w-full p-2 border border-gray-400 dark:border-gray-500  outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
            name="name"
            type="text"
            placeholder="Name"
            required
          />
          <input
            className="w-full p-2 border border-gray-400 dark:border-gray-500 outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
            name="email"
            type="email"
            placeholder="Email"
            required
          />
        </motion.div>

        <motion.div
          className="form-group"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <input
            className="w-full p-2 border border-gray-400 dark:border-gray-500 outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
            name="subject"
            type="text"
            placeholder="Subject"
            required
          />
        </motion.div>

        <motion.div
          className="form-group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          <textarea
            className="w-full p-2 h-28 border border-gray-400 dark:border-gray-500 outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
            name="message"
            placeholder="Message here.."
            required
          />
        </motion.div>

        <motion.div
          className="form-group pt-4"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.6 }}
        >
          <button
            className="px-6 py-3 top-3 border border-gray-400 dark:border-gray-500 uppercase text-xs tracking-widest text-slate-500 placeholder-gray-400 dark:placeholder-gray-500 transition-all hover:border hover:bg-gray-800 hover:text-gray-400 active:cursor-wait mb-20"
            type="submit"
          >
            Submit
          </button>
        </motion.div>
      </motion.form>
    </div>
  );
}

export default ContactForm;
