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
    const nextTop = container.scrollTop + (targetTop - containerTop) - 88;
    container.scrollTo({ top: Math.max(0, nextTop), behavior });
    return;
  }

  target.scrollIntoView({ behavior, block: "start" });
}
