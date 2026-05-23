"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IconType } from "react-icons";

function SocialIcon({
  icon: Icon,
  href,
  delay = 0,
}: {
  icon: IconType;
  href: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, delay }}
      className="relative z-50"
    >
      <Link
        href={href}
        target="_blank"
        className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-600 
                   transition-all duration-300 relative z-50"
      >
        <motion.div
          whileHover={{
            scale: 1.3,
            rotate: 360,
            transition: { duration: 0.3 },
          }}
        >
          <Icon className="w-8 h-8" />
        </motion.div>
      </Link>
    </motion.div>
  );
}

function Socials() {
  const socialLinks = [
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/kabiru-shaibu-a81082164/",
      delay: 0,
    },
    {
      icon: FaGithub,
      href: "https://github.com/kabornblack",
      delay: 0.2,
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mr-3 z-50">
      {socialLinks.map((social, index) => (
        <SocialIcon
          key={index}
          icon={social.icon}
          href={social.href}
          delay={social.delay}
        />
      ))}
    </div>
  );
}

export default Socials;
