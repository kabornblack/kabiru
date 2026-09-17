"use client";

import { useEffect } from "react";

const SESSION_KEY = "visit_logged";

/**
 * Fires a one-time "someone's here" ping to /api/visit per browser session.
 * Renders nothing — mounted once in the root layout, right before </body>.
 */
export default function VisitorPing() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") return;
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // sessionStorage can throw in private/locked-down browser contexts —
      // skip the ping rather than risk firing on every render.
      return;
    }

    const page = window.location.pathname + window.location.hash;

    fetch("/api/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page }),
      keepalive: true,
    }).catch(() => {
      // Best-effort only — a failed ping should never affect the page.
    });
  }, []);

  return null;
}
