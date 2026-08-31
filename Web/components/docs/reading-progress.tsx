"use client";

import { useEffect, useState } from "react";

/**
 * A scrubber for the page.
 *
 * The rail under the header fills as you read, with the position shown as a
 * percentage in the same tabular mono the player uses for timecodes. It is the
 * one piece of motion on the site, and it belongs here: these are the docs for
 * a media player, and progress is the thing a player draws.
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) {
        setProgress(0);
        return;
      }
      const ratio = window.scrollY / scrollable;
      setProgress(Math.min(Math.max(ratio, 0), 1));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const percent = Math.round(progress * 100);

  return (
    <div aria-hidden className="sticky top-16 z-40 h-px bg-line-soft">
      <div
        className="relative h-px bg-chili"
        style={{ width: `${percent}%` }}
      >
        <span className="absolute right-0 top-1/2 h-[7px] w-[7px] -translate-y-1/2 translate-x-1/2 rounded-full bg-chili" />
      </div>
    </div>
  );
}
