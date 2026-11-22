"use client";

import { useCallback, useLayoutEffect, useState } from "react";
import Image from "next/image";

/* To swap in real photos, change `src` / `alt` here — nothing
   else needs to know. Order: [0] is the lead photo, [1] peeks out left, [2] right. */
const PHOTOS = [
  {
    src: "/kabiru.png",
    size: 1254,
    alt: "Portrait of Kabiru Shaibu wearing a black cap and hoodie against a dark blue backdrop",
  },
  {
    src: "/kabiru1.jpg",
    size: 1254,
    alt: "Kabiru Shaibu in a white cap and navy jacket, smiling with a hand at his chin, seated at a table with a glass of red wine",
  },
  {
    src: "/kabiru2.jpg",
    size: 460,
    alt: "Close-up of Kabiru Shaibu in glasses and a blue-patterned white shirt, in front of a colourful painting",
  },
] as const;

/** All three files are square (`size` = real pixel width and height); the row relies on 1:1. */
const ASPECT = 1;

const POSITIONS = ["center", "left", "right"] as const;

/** Only this presentation ever collapses; keep identical to the media query in globals.css. */
const COLLAPSE_QUERY =
  "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

/** Once opened, the stack stays open for the tab's session (survives refresh, not a new tab). */
const STORAGE_KEY = "ks:hero-stack-open";

const readLatch = () => {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
};

const writeLatch = () => {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* storage blocked: it stays open for this page view only */
  }
};

/** Runs before first paint (inline, right after the stack in the HTML) so a
    returning visitor never sees the collapsed state flash before hydration. */
const EARLY_SCRIPT = `try{if(matchMedia(${JSON.stringify(COLLAPSE_QUERY)}).matches&&sessionStorage.getItem(${JSON.stringify(STORAGE_KEY)})==="1")document.documentElement.setAttribute("data-stack-open","")}catch(e){}`;

export default function HeroPhotoStack() {
  // The photo markup is identical everywhere; CSS decides whether the collapsed
  // presentation applies. These two flags only decide whether the (desktop-only)
  // control exists and whether it has already been used.
  const [canCollapse, setCanCollapse] = useState(false);
  const [open, setOpen] = useState(false);
  const [instant, setInstant] = useState(false);

  useLayoutEffect(() => {
    const mq = window.matchMedia(COLLAPSE_QUERY);
    setCanCollapse(mq.matches);
    if (mq.matches && readLatch()) {
      // Already opened earlier this session: show it open with no animation.
      setInstant(true);
      setOpen(true);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setInstant(false)),
      );
    }
    const onChange = () => setCanCollapse(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const latch = useCallback(() => {
    setOpen(true);
    writeLatch(); // only reachable when the collapsed presentation exists
  }, []);

  return (
    <div
      className="photo-stack-wrap hero-enter"
      style={{ animationDelay: "70ms" }}
    >
      <div
        role="group"
        aria-label="Photos of Kabiru Shaibu"
        data-open={open}
        data-no-transition={instant ? "" : undefined}
        data-no-spotlight=""
        className="photo-stack"
        style={{ "--ar": ASPECT } as React.CSSProperties}
      >
        {/* Decorative slivers: shown only in the collapsed presentation. */}
        <span aria-hidden="true" className="ps-sliver ps-sliver--l1" />
        <span aria-hidden="true" className="ps-sliver ps-sliver--l2" />
        <span aria-hidden="true" className="ps-sliver ps-sliver--r1" />
        <span aria-hidden="true" className="ps-sliver ps-sliver--r2" />

        {PHOTOS.map((photo, i) => (
          <div
            key={photo.src}
            className={`ps-photo ps-photo--${POSITIONS[i]}`}
          >
            <div className="ps-media">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.size}
                height={photo.size}
                priority={i === 0}
                sizes="(min-width: 1024px) 300px, 220px"
                draggable={false}
              />
              <span className="ps-grade" />
            </div>
          </div>
        ))}

        {/* A control only while there is something to open: desktop, not yet
            opened. Hover, keyboard focus or click opens it for good, and the
            button is then removed rather than left doing nothing. */}
        {canCollapse && !open && (
          <button
            type="button"
            aria-label="Show all photos"
            className="ps-trigger focus-ring"
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse" || e.pointerType === "pen") latch();
            }}
            onFocus={(e) => {
              if (e.currentTarget.matches(":focus-visible")) latch();
            }}
            onClick={latch}
          />
        )}
      </div>
      <script dangerouslySetInnerHTML={{ __html: EARLY_SCRIPT }} />
    </div>
  );
}
