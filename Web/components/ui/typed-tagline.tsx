"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * The tagline, typed out like the readout on the player's own transport.
 *
 * The play triangle echoes the logo mark, so the lockup and the line beside it
 * read as one piece of brand. Visitors who ask for reduced motion get the
 * finished line on the first paint, with no caret blink.
 */
export function TypedTagline({
  text,
  className = "",
}: {
  /** The line to type. Announced in full to screen readers straight away. */
  text: string;
  className?: string;
}) {
  const reduced = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (reduced) return;

    let count = 0;
    const id = window.setInterval(() => {
      count += 1;
      setTyped(count);
      if (count >= text.length) window.clearInterval(id);
    }, 52);

    return () => window.clearInterval(id);
  }, [reduced, text]);

  const shown = reduced ? text.length : typed;
  const done = shown >= text.length;

  return (
    <p className={`flex items-center gap-2.5 ${className}`}>
      <svg
        aria-hidden
        viewBox="0 0 10 12"
        className="h-[11px] w-[9px] shrink-0 fill-chili"
      >
        <path d="M0 0l10 6-10 6z" />
      </svg>

      <span className="sr-only">{text}</span>

      <span aria-hidden className="min-w-0">
        {text.slice(0, shown)}
        <span className={done && !reduced ? "caret caret-blink" : "caret"} />
      </span>
    </p>
  );
}
