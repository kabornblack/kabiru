"use client";

import { useEffect, useRef } from "react";

/**
 * Button/link label that "rolls" when its button is hovered with a mouse or
 * focused from the keyboard: every letter cycles through a code-like glyph
 * sequence, then letters lock in left to right.
 *
 * Layout never moves: the real label stays in place (hidden while the effect
 * runs) and the rolling letters are drawn in an absolutely positioned layer
 * whose slots match the real glyph positions. Assistive tech reads the
 * visually hidden copy of the label only. Timing and colour live in the
 * --scramble-* custom properties in globals.css.
 */

// Ordered, so each slot reads like a fast odometer rather than random noise.
const GLYPHS = "<>/{}[]=+*#;:_ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

type ScrambleTextProps = {
  text: string;
  /** "parent" (default): the closest button/link triggers it. "self": only the text itself. */
  trigger?: "parent" | "self";
  className?: string;
};

/** Reads a CSS time custom property from :root, in ms. */
const readMs = (name: string, fallback: number) => {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const value = parseFloat(raw);
  if (Number.isNaN(value)) return fallback;
  return raw.endsWith("ms") ? value : value * 1000;
};

export default function ScrambleText({
  text,
  trigger = "parent",
  className = "",
}: ScrambleTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const baseRef = useRef<HTMLSpanElement>(null);
  const layerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const base = baseRef.current;
    const layer = layerRef.current;
    if (!root || !base || !layer) return;

    const host =
      trigger === "parent" ? (root.closest<HTMLElement>("a, button") ?? root) : root;
    let frame = 0;

    /** Ends any run and shows the real label again. */
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      layer.replaceChildren();
      delete root.dataset.active;
    };

    const play = () => {
      stop();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (host.matches(":disabled, [aria-disabled='true']")) return;

      const node = base.firstChild;
      if (!node || node.nodeType !== Node.TEXT_NODE) return;
      // Labels that wrap onto several lines stay static.
      if (base.getClientRects().length !== 1) return;

      // Slot widths from the real glyph positions (after fonts and
      // text-transform), so locked letters land exactly on the label.
      // (Indexed by UTF-16 unit to match Range offsets; labels are plain text.)
      // Underlines don't reach the overlay's slots by inheritance, so copy
      // the host's (e.g. a hover underline) onto them.
      const decoration = getComputedStyle(host);
      const underline =
        decoration.textDecorationLine === "none" ? "" : decoration.textDecoration;
      const range = document.createRange();
      const rects = Array.from({ length: text.length }, (_, i) => {
        range.setStart(node, i);
        range.setEnd(node, i + 1);
        return range.getBoundingClientRect();
      });
      const slots = rects.map((rect, i) => {
        const slot = document.createElement("span");
        const next = rects[i + 1];
        const width = next ? next.left - rect.left : rect.width;
        slot.style.width = `${Math.max(0, width)}px`;
        slot.style.textDecoration = underline;
        slot.textContent = text[i];
        return slot;
      });
      layer.replaceChildren(...slots);
      root.dataset.active = "";

      const delay = readMs("--scramble-delay", 60);
      const maxDuration = readMs("--scramble-max", 600);
      const stagger = Math.min(
        readMs("--scramble-stagger", 50),
        (maxDuration - delay) / Math.max(1, text.length - 1),
      );
      const step = Math.max(1, readMs("--scramble-step", 16));
      const end = delay + (text.length - 1) * stagger;
      const start = performance.now();

      const tick = (now: number) => {
        const elapsed = now - start;
        const shift = Math.floor(elapsed / step);
        slots.forEach((slot, i) => {
          const char = text[i];
          if (char === " " || elapsed >= delay + i * stagger) {
            if (slot.textContent !== char) slot.textContent = char;
            slot.removeAttribute("data-rolling");
          } else {
            slot.textContent = GLYPHS[(shift + i) % GLYPHS.length];
            slot.setAttribute("data-rolling", "");
          }
        });
        if (elapsed >= end) stop();
        else frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    // Mouse/pen hover only: taps go straight through with no effect or delay.
    const onPointerEnter = (event: PointerEvent) => {
      if (event.pointerType === "mouse" || event.pointerType === "pen") play();
    };
    const onFocus = () => {
      if (host.matches(":focus-visible")) play();
    };

    host.addEventListener("pointerenter", onPointerEnter);
    host.addEventListener("focus", onFocus);
    return () => {
      host.removeEventListener("pointerenter", onPointerEnter);
      host.removeEventListener("focus", onFocus);
      stop();
    };
  }, [text, trigger]);

  return (
    <span ref={rootRef} className={`scramble ${className}`}>
      <span className="sr-only">{text}</span>
      <span ref={baseRef} aria-hidden="true" className="scramble-base">
        {text}
      </span>
      <span ref={layerRef} aria-hidden="true" className="scramble-layer" />
    </span>
  );
}
