"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IconType } from "react-icons";

function SocialIcon({
  icon: Icon,
  href,
  label,
}: {
  icon: IconType;
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="focus-ring inline-flex min-h-11 min-w-11 items-center justify-center text-[var(--text-muted)] transition-colors hover:text-[var(--gold)]"
    >
      <Icon className="h-6 w-6" aria-hidden="true" />
    </Link>
  );
}

function Socials({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={[
        "z-50 flex items-center",
        compact ? "gap-2" : "gap-3 lg:gap-4",
      ].join(" ")}
    >
      <SocialIcon
        icon={FaLinkedin}
        href="https://www.linkedin.com/in/kabiru-shaibu-a81082164/"
        label="Kabiru Shaibu on LinkedIn"
      />
      <SocialIcon
        icon={FaGithub}
        href="https://github.com/kabornblack"
        label="Kabiru Shaibu on GitHub"
      />
    </div>
  );
}

export default Socials;
