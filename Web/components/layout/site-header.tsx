import Link from "next/link";
import { site } from "@/lib/site";
import { Wordmark } from "./wordmark";

const LINKS = [
  { href: "/docs", label: "Docs" },
  { href: "/docs/features", label: "Features" },
  { href: "/docs/roadmap", label: "Roadmap" },
  { href: "/docs/releases", label: "Releases" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line-soft bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="rounded-sm" aria-label={`${site.name} home`}>
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="flex items-center gap-1 sm:gap-2">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hidden rounded-md px-2.5 py-1.5 text-[13.5px] text-ash transition hover:text-cream sm:block"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/docs"
            className="rounded-md px-2.5 py-1.5 text-[13.5px] text-ash transition hover:text-cream sm:hidden"
          >
            Docs
          </Link>
          <a
            href={site.repository}
            className="ml-1 rounded-md border border-line px-3 py-1.5 text-[13px] text-ash transition hover:border-ash-dim hover:text-cream"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
