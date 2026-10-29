/** Fixed Header height in px (its `h-17` classes). */
export const HEADER_HEIGHT = 68;

/** Hash scrolling lands a section this far from the top: clear of the header plus a small gap. */
export const HASH_SCROLL_OFFSET = HEADER_HEIGHT + 8;

/** A section counts as "current" for the nav once its top passes this line. */
export const ACTIVE_SECTION_OFFSET = HEADER_HEIGHT + 40;

export function scrollToHash(hash: string) {
  if (typeof window === "undefined") return;

  const id = hash.replace(/^#/, "");
  if (!id) return;

  const target = document.getElementById(id);
  if (!target) return;

  // An explicit "smooth" overrides the CSS scroll-behavior reset, so honour
  // reduced motion here too.
  const behavior: ScrollBehavior = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches
    ? "auto"
    : "smooth";

  const container = document.getElementById("page-scroll-container");

  if (container) {
    const containerTop = container.getBoundingClientRect().top;
    const targetTop = target.getBoundingClientRect().top;
    const nextTop = container.scrollTop + (targetTop - containerTop) - HASH_SCROLL_OFFSET;
    container.scrollTo({ top: Math.max(0, nextTop), behavior });
    return;
  }

  target.scrollIntoView({ behavior, block: "start" });
}
