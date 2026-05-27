"use client";

import { useEffect, useState } from "react";

interface Props {
  words: string[];
  /** How long each word stays before swapping. Default 2.4s. */
  intervalMs?: number;
}

// All words are rendered into a single grid cell so the container's
// width is fixed by the longest word and swapping never causes layout
// shift. Only the active word is opacity-100; the rest fade out.
export function RotatingWord({ words, intervalMs = 2400 }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [words, intervalMs]);

  if (words.length === 1) {
    return <span>{words[0]}</span>;
  }

  return (
    <span
      className="relative inline-grid align-baseline"
      aria-live="polite"
    >
      {words.map((word, i) => (
        <span
          key={word}
          aria-hidden={i === index ? undefined : true}
          className={`col-start-1 row-start-1 transition-opacity duration-300 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
