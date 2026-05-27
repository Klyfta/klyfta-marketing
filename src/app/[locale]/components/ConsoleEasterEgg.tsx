"use client";

import { useEffect } from "react";

// Logs a friendly message in the browser console exactly once per
// page load. Devs who open DevTools find a nod meant for them; no
// effect on regular users.
export function ConsoleEasterEgg() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const style = [
      "color: #fff",
      "background: #1f2937",
      "padding: 4px 8px",
      "border-radius: 4px",
      "font-weight: 600",
    ].join(";");
    /* eslint-disable no-console */
    console.log(
      "%cHi.",
      style,
    );
    console.log(
      "If you're reading this, you probably care about open standards, EU residency, or both.",
    );
    console.log(
      "We're a small European company building a calmer work suite. If that resonates: hello@verkio.eu.",
    );
    console.log(
      "%cPS: there's an API. /api/v1/openapi.json once we're live.",
      "color: #6b7280",
    );
    /* eslint-enable no-console */
  }, []);
  return null;
}
