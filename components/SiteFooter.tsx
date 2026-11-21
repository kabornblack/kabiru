import Container from "./Container";

/** Footer shared by the home page and /portfolio. */
export default function SiteFooter() {
  return (
    <footer className="section section--footer">
      <Container className="flex flex-col items-center text-center">
        <p className="body-copy max-w-xl">
          Building products with scalability, usability and long-term
          maintainability in mind.
        </p>
        <p className="eyebrow mt-4">
          Designed & Built by Kabiru — ©{" "}
          {/* Prerendered: the HTML carries the build year, so a client in a
              later year must not flag a hydration mismatch. */}
          <span suppressHydrationWarning>{new Date().getFullYear()}</span>
        </p>
      </Container>
    </footer>
  );
}
