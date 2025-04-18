"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the animation after the component mounts
    setIsVisible(true);
  }, []);

  return (
    <div
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
      <div className="flex px-8 md:px-32  justify-start items-start min-h-screen py-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col space-y-8 cursor-text"
        >
          <h1 className="font-hubballi font-bold text-2xl md:text-4xl tracking-[5px] leading-6 text-gray-500 dark:text-white uppercase">
            About
          </h1>
          <div className=" blur-sm opacity-5">
            <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
            <div className="bg-gradient-to-r from-[#B8860B] via-gray-100 to-[#B8860B] dark:from-[#B8860B] dark:via-gray-950 dark:to-[#B8860B] h-1 " />
            <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
          </div>
          <div className="space-y-4">
            <h3 className="text-[#B8860B] text-lg md:text-xl uppercase leading-6 tracking-[5px] font-hubballi">
              Who am I?
            </h3>
            <p className="tsxt-lg md:text-xl text-gray-600 dark:text-white font-hubballi">
              My name is{" "}
              <span className="text-[#B8860B] font-semibold">
                Kabiru Shaibu{" "}
              </span>
              and I am a passionate software developer from Nigeria. I thrive on
              solving complex problems and turning ideas into functional and
              elegant digital solutions.
            </p>
          </div>
          <div className=" blur-sm opacity-5">
            <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
            <div className="bg-gradient-to-r from-[#B8860B] via-gray-100 to-[#B8860B] dark:from-[#B8860B] dark:via-gray-950 dark:to-[#B8860B] h-1 " />
            <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
          </div>
          <div className="space-y-4">
            <h3 className="text-[#B8860B] text-lg md:text-xl uppercase leading-6 tracking-[5px] font-hubballi">
              What do I do?
            </h3>
            <p className="tsxt-lg md:text-xl text-gray-600 dark:text-white font-hubballi">
              I specialize in software development with over 5 years of
              experience building robust applications and scalable systems. My
              expertise spans frontend, backend, and full-stack development,
              with a strong focus on creating user-centered designs and
              efficient code.
            </p>
          </div>
          <div className=" blur-sm opacity-5">
            <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
            <div className="bg-gradient-to-r from-[#B8860B] via-gray-100 to-[#B8860B] dark:from-[#B8860B] dark:via-gray-950 dark:to-[#B8860B] h-1 " />
            <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
          </div>
          <div className="space-y-4">
            <h3 className="text-[#B8860B] text-lg md:text-xl uppercase leading-6 tracking-[5px] font-hubballi">
              How did it all start?
            </h3>
            <p className="tsxt-lg md:text-xl text-gray-600 dark:text-white font-hubballi">
              It all started in 2020 during the covid lockdown when we had no
              where to go but to sit at home and watch movies and then i started
              thinking what i could posible do with my life and then i
              discovered a 100 days of code tutorial by
              <span className="text-[#B8860B] font-semibold ">
                {" "}
                Angela Yu
              </span>{" "}
              {`A simple bit chonk python coding lectures and task and then i
              develope to love and passion i have today as a software developer.
              From my first "Hello, World!" to working on full-scale
              applications, the journey has been exciting and rewarding.`}
            </p>
          </div>
          <div className=" blur-sm opacity-5">
            <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
            <div className="bg-gradient-to-r from-[#B8860B] via-gray-100 to-[#B8860B] dark:from-[#B8860B] dark:via-gray-950 dark:to-[#B8860B] h-1 " />
            <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
          </div>
          <div className="space-y-4">
            <h3 className="text-[#B8860B] text-lg md:text-xl uppercase leading-6 tracking-[5px] font-hubballi">
              What is my development philosophy?
            </h3>
            <p className="tsxt-lg md:text-xl text-gray-600 dark:text-white font-hubballi">
              {`I believe in writing clean, maintainable code and prioritizing
              user experience above all else. For me, development is not just
              about functionality but also about creating seamless interactions
              that add value to users' lives.`}
            </p>
          </div>
          <div className=" blur-sm opacity-5">
            <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
            <div className="bg-gradient-to-r from-[#B8860B] via-gray-100 to-[#B8860B] dark:from-[#B8860B] dark:via-gray-950 dark:to-[#B8860B] h-1 " />
            <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
          </div>
          <div className="space-y-4">
            <h3 className="text-[#B8860B] text-lg md:text-xl uppercase leading-6 tracking-[5px] font-hubballi">
              What are my core skills?
            </h3>
            <p className="tsxt-lg md:text-xl text-gray-600 dark:text-white font-hubballi">
              {`Even though my journey started with Python but as at today my core skills include modern JavaScript frameworks (React,
              Next.js and Typescript), backend technologies (Node.js, Express), and database
              management (MongoDB, PostgreSQL). I am also proficient in tools
              like Docker, Git, and CI/CD pipelines, ensuring efficient
              workflows and deployments.`}
            </p>
          </div>
          <div className=" blur-sm opacity-5">
            <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
            <div className="bg-gradient-to-r from-[#B8860B] via-gray-100 to-[#B8860B] dark:from-[#B8860B] dark:via-gray-950 dark:to-[#B8860B] h-1 " />
            <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
          </div>
          <div className="space-y-4">
            <h3 className="text-[#B8860B] text-lg md:text-xl uppercase leading-6 tracking-[5px] font-hubballi">
              What drives me?
            </h3>
            <p className="tsxt-lg md:text-xl text-gray-600 dark:text-white font-hubballi">
              Curiosity and a desire to learn drive my work. I am always
              exploring new technologies, contributing to open-source projects,
              and collaborating with peers to stay at the forefront of the tech
              industry.
            </p>
          </div>
          <div className=" blur-sm opacity-5">
            <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
            <div className="bg-gradient-to-r from-[#B8860B] via-gray-100 to-[#B8860B] dark:from-[#B8860B] dark:via-gray-950 dark:to-[#B8860B] h-1 " />
            <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
          </div>
          <div className="space-y-4">
            <h3 className="text-[#B8860B] text-lg md:text-xl uppercase leading-6 tracking-[5px] font-hubballi">
              What are my future goals?
            </h3>
            <p className="tsxt-lg md:text-xl text-gray-600 dark:text-white font-hubballi">
              {`First, is to learn something new everyday, even if its just a simple line of code and i aim to lead impactful projects that not only solve problems but
              also inspire innovation. I’m constantly evolving, learning, and
              aspiring to contribute meaningfully to the ever-changing world of
              technology.`}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
