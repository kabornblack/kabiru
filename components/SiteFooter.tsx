/** Footer shared by the home page and /portfolio. */
export default function SiteFooter() {
  return (
    <footer className="flex w-full items-center justify-center px-5 py-10">
      <div className="max-w-xl text-center">
        <p className="text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
          Building products with scalability, usability and long-term
          maintainability in mind.
        </p>
        <p className="mt-4 text-xs tracking-[0.16em] text-[var(--text-muted)] uppercase md:text-sm">
          Designed & Built by Kabiru — ©{" "}
          {/* Prerendered: the HTML carries the build year, so a client in a
              later year must not flag a hydration mismatch. */}
          <span suppressHydrationWarning>{new Date().getFullYear()}</span>
        </p>
      </div>
    </footer>
  );
}
