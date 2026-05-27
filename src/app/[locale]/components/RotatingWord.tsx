"use client";

import { useEffect, useState } from "react";

interface Props {
  words: string[];
  /** How long each word stays before swapping. Default 2.4s. */
  intervalMs?: number;
}

export function RotatingWord({ words, intervalMs = 2400 }: Props) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (words.length < 2) return;
    const fadeOut = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setVisible(true);
      }, 200);
    }, intervalMs);
    return () => clearInterval(fadeOut);
  }, [words, intervalMs]);

  return (
    <span
      className={`inline-block transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-live="polite"
    >
      {words[index]}
    </span>
  );
}
