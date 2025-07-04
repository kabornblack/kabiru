"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomEyeCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState("normal");

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const cursor = cursorRef.current;
      if (!cursor) return;

      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;

      const el = document.elementFromPoint(e.clientX, e.clientY);
      const isPointer =
        el &&
        (el.tagName === "BUTTON" ||
          el.tagName === "A" ||
          (el as HTMLElement).onclick ||
          el.classList.contains("cursor-pointer"));

      setCursorState((prev) =>
        prev === "clicking" ? prev : isPointer ? "pointer" : "normal"
      );
    };

    const down = () => setCursorState("clicking");
    const up = () => {
      setTimeout(() => setCursorState("normal"), 150);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mousedown", down);
    document.addEventListener("mouseup", up);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mousedown", down);
      document.removeEventListener("mouseup", up);
    };
  }, []);

  const getEmoji = () => {
    switch (cursorState) {
      case "pointer":
        return "👀";
      case "clicking":
        return "🙈";
      default:
        return "👁️";
    }
  };

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-50 pointer-events-none text-2xl transition-transform duration-150 transform -translate-x-1/2 -translate-y-1/2"
    >
      {getEmoji()}
    </div>
  );
}
