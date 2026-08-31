"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNav } from "@/lib/nav";

function NavList({ pathname }: { pathname: string }) {
  return (
    <div className="space-y-7">
      {docsNav.map((section) => (
        <div key={section.title}>
          <p className="eyebrow">{section.title}</p>
          <ul className="mt-2.5 space-y-px">
            {section.items.map((item) => {
              const active = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative block rounded-md py-1.5 pl-3.5 pr-2 text-[13.5px] transition ${
                      active
                        ? "bg-raise/60 text-cream"
                        : "text-ash hover:bg-shell hover:text-cream"
                    }`}
                  >
                    {/* The active marker is a playhead on the sidebar rail. */}
                    {active && (
                      <span
                        aria-hidden
                        className="absolute left-0 top-1/2 h-3.5 w-[2px] -translate-y-1/2 rounded-full bg-chili"
                      />
                    )}
                    {item.title}
                  </Link>

                  {active && item.anchors && (
                    <ul className="mb-1 mt-1 space-y-px border-l border-line-soft pl-3.5">
                      {item.anchors.map((anchor) => (
                        <li key={anchor.hash}>
                          <Link
                            href={`${item.href}${anchor.hash}`}
                            className="block py-1 text-[12.5px] text-ash-dim transition hover:text-ash"
                          >
                            {anchor.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop: a persistent rail beside the content. */}
      <nav
        aria-label="Documentation"
        className="scroll-thin sticky top-16 hidden max-h-[calc(100vh-4rem)] w-[232px] shrink-0 overflow-y-auto py-9 pr-4 lg:block"
      >
        <NavList pathname={pathname} />
      </nav>

      {/* Mobile: the same tree behind a disclosure, so no drawer script is needed. */}
      <details className="group border-b border-line-soft lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-3.5 text-[13.5px] text-ash marker:hidden sm:px-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ash-dim">
            Documentation menu
          </span>
          <span
            aria-hidden
            className="text-ash-dim transition group-open:rotate-180"
          >
            ▾
          </span>
        </summary>
        <div className="px-5 pb-7 sm:px-8">
          <NavList pathname={pathname} />
        </div>
      </details>
    </>
  );
}
