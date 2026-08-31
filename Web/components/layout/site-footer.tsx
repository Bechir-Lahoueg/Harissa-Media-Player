import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "./wordmark";

const COLUMNS = [
  {
    title: "Documentation",
    links: [
      { href: "/docs", label: "Introduction" },
      { href: "/docs/installation", label: "Installation" },
      { href: "/docs/getting-started", label: "Getting started" },
      { href: "/docs/shortcuts", label: "Keyboard shortcuts" },
    ],
  },
  {
    title: "Technical",
    links: [
      { href: "/docs/technical/architecture", label: "Architecture" },
      { href: "/docs/technical/preload-and-ipc", label: "Preload and IPC" },
      { href: "/docs/technical/security", label: "Security" },
      { href: "/docs/development/workflow", label: "Development" },
    ],
  },
  {
    title: "Project",
    links: [
      { href: "/docs/features", label: "Features" },
      { href: "/docs/roadmap", label: "Roadmap" },
      { href: "/docs/releases", label: "Releases" },
      { href: "/docs/faq", label: "FAQ" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line-soft">
      <div className="mx-auto max-w-[1180px] px-5 py-12 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo size={44} />
            <p className="mt-3 max-w-[26ch] text-[13px] leading-relaxed text-ash-dim">
              {site.tagline} No account, no server, no library scan.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="eyebrow">{column.title}</p>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13.5px] text-ash transition hover:text-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 border-t border-line-soft pt-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-[14px] text-cream font-medium">
                Developed with <span className="text-flame">♥</span> by{" "}
                <a
                  href="https://github.com/Bechir-Lahoueg"
                  className="text-chili underline decoration-chili underline-offset-2 hover:text-chili-hi transition"
                >
                  Bechir Lahoueg
                </a>
              </p>
              <p className="mt-2 font-mono text-[11.5px] text-ash-dim">
                {site.fullName} — documentation for a project in development
              </p>
            </div>
          
          </div>
        </div>
      </div>
    </footer>
  );
}
