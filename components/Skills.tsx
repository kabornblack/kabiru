"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaBootstrap,
  FaSass,
  FaReact,
  FaGithub,
  FaNode,
  FaDatabase,
  FaPython,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiExpress,
  SiSanity,
  SiMysql,
  SiMongodb,
  SiPostgresql,
  SiSupabase,
  SiFirebase,
  SiGooglecloud,
  SiOpenai,
  SiClerk,
  SiCloudflare,
  SiRedux,
} from "react-icons/si";
import { TbBrandAngular, TbBrandSvelte } from "react-icons/tb";
import RecentProject from "./RecentProject"; // Import the RecentProject component
import TechStack from "./TechStack"; // Import the TechStack component

export const tech = [
  { name: "html", icon: <FaHtml5 className="text-xl mb-1" /> },
  { name: "css", icon: <FaCss3Alt className="text-xl mb-1" /> },
  { name: "bootstrap", icon: <FaBootstrap className="text-xl mb-1" /> },
  { name: "sass", icon: <FaSass className="text-xl mb-1" /> },
  { name: "tailwind", icon: <SiTailwindcss className="text-xl mb-1" /> },
  { name: "shadcn", icon: <FaReact className="text-xl mb-1" /> },
  { name: "javascript", icon: <SiJavascript className="text-xl mb-1" /> },
  { name: "svelte", icon: <TbBrandSvelte className="text-xl mb-1" /> },
  { name: "angular", icon: <TbBrandAngular className="text-xl mb-1" /> },
  { name: "react", icon: <FaReact className="text-xl mb-1" /> },
  { name: "redux", icon: <SiRedux className="text-xl mb-1" /> },
  { name: "typescript", icon: <SiTypescript className="text-xl mb-1" /> },
  { name: "github", icon: <FaGithub className="text-xl mb-1" /> },
  { name: "nextjs", icon: <SiNextdotjs className="text-xl mb-1" /> },
  { name: "nodejs", icon: <FaNode className="text-xl mb-1" /> },
  { name: "express", icon: <SiExpress className="text-xl mb-1" /> },
  { name: "sanity", icon: <SiSanity className="text-xl mb-1" /> },
  { name: "sql", icon: <FaDatabase className="text-xl mb-1" /> },
  { name: "mySQL", icon: <SiMysql className="text-xl mb-1" /> },
  { name: "mongoDB", icon: <SiMongodb className="text-xl mb-1" /> },
  { name: "postgreSQL", icon: <SiPostgresql className="text-xl mb-1" /> },
  { name: "superbase", icon: <SiSupabase className="text-xl mb-1" /> },
  { name: "firebase", icon: <SiFirebase className="text-xl mb-1" /> },
  { name: "Google-Cloud", icon: <SiGooglecloud className="text-xl mb-1" /> },
  { name: "openai", icon: <SiOpenai className="text-xl mb-1" /> },
  { name: "clerk", icon: <SiClerk className="text-xl mb-1" /> },
  { name: "cloudflare", icon: <SiCloudflare className="text-xl mb-1" /> },
];

export const python = [
  { name: "python", icon: <FaPython className="text-xl mb-1" /> },
];

export default function Skills() {
  return (
    <div className="top-0 left-0 w-full min-h-screen transform transition-all duration-700 bg-gray-950 mt-6 text-center">
      <div className="flex flex-col py-16 text-center max-w-7xl mx-auto">
        <h1 className="font-['Playfair_Display'] text-[#B8860B] font-bold text-2xl md:text-4xl tracking-[5px] leading-6 uppercase relative inline-block opacity-80 pb-1">
          Skills
          <div className="absolute left-0 -bottom-1 w-full h-[1px] bg-gradient-to-r from-transparent via-[#B8860B] to-transparent"></div>
        </h1>
      </div>
      <div className="flex px-8 md:px-32 justify-center items-start -mt-32 min-h-screen max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col space-y-8 cursor-text"
        >
          <div className="flex max-w-7xl justify-start items-start pt-28">
            <div className="flex flex-col space-y-6 cursor-text">
              <h3 className="text-[#B8860B] text-lg md:text-xl uppercase leading-6 tracking-[5px] font-hubballi pb-6">
                It started in 2020
              </h3>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="flex flex-wrap justify-center gap-3 pb-10 -mt-3"
              >
                {python.map((item) => (
                  <span
                    key={item.name}
                    className="px-3 py-2 bg-white/20 hover:bg-white/30 shadow-sm text-[#B8860B] flex flex-col rounded-lg items-center justify-center hover:shadow-md transition-all duration-300 w-20 h-20"
                  >
                    {item.icon}
                    <span className="text-xs uppercase font-medium">
                      {item.name}
                    </span>
                  </span>
                ))}
              </motion.div>

              <p className="text-[#B8860B] text-lg md:text-xl uppercase leading-1 tracking-[1px] font-hubballi pb-6">
                Where i am today in 2025
              </p>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="flex flex-wrap justify-center gap-3 mb-4 pb-4"
              >
                {tech.map((item) => (
                  <span
                    key={item.name}
                    className="px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg shadow-sm text-[#B8860B] flex flex-col items-center justify-center hover:shadow-md transition-all duration-300 w-20 h-20"
                  >
                    {item.icon}
                    <span className="text-xs uppercase font-medium">
                      {item.name}
                    </span>
                  </span>
                ))}
              </motion.div>
            </div>
          </div>

          <div className=" pb-10 blur-sm opacity-5">
            <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
            <div className="bg-gradient-to-r from-[#B8860B] via-gray-100 to-[#B8860B] dark:from-[#B8860B] dark:via-gray-950 dark:to-[#B8860B] h-1 " />
            <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
          </div>

          {/* Recent Project Component */}
          <RecentProject />

          {/* Tech Stack Component */}
          <TechStack />
        </motion.div>
        <div className=" py-10 blur-sm opacity-5">
          <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
          <div className="bg-gradient-to-r from-[#B8860B] via-gray-100 to-[#B8860B] dark:from-[#B8860B] dark:via-gray-950 dark:to-[#B8860B] h-1 " />
          <div className="bg-gradient-to-r from-gray-100 via-[#B8860B] to-gray-100 dark:from-gray-950 dark:via-[#B8860B] dark:to-gray-950 h-1" />
        </div>
      </div>
    </div>
  );
}
