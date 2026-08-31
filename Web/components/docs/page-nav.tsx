"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { findNeighbours } from "@/lib/nav";

/** Previous and next links, derived from the documentation tree in lib/nav.ts. */
export function PageNav() {
  const pathname = usePathname();
  const { previous, next } = findNeighbours(pathname);

  if (!previous && !next) return null;

  return (
    <nav
      aria-label="Documentation pages"
      className="mt-16 grid gap-3 border-t border-line-soft pt-7 sm:grid-cols-2"
    >
      {previous ? (
        <Link
          href={previous.href}
          className="group rounded-[10px] border border-line-soft px-4 py-3 transition hover:border-line hover:bg-shell/60"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ash-dim">
            ← Previous
          </span>
          <span className="mt-1 block text-[14px] text-ash transition group-hover:text-cream">
            {previous.title}
          </span>
        </Link>
      ) : (
        <span />
      )}

      {next && (
        <Link
          href={next.href}
          className="group rounded-[10px] border border-line-soft px-4 py-3 text-right transition hover:border-line hover:bg-shell/60 sm:col-start-2"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ash-dim">
            Next →
          </span>
          <span className="mt-1 block text-[14px] text-ash transition group-hover:text-cream">
            {next.title}
          </span>
        </Link>
      )}
    </nav>
  );
}
