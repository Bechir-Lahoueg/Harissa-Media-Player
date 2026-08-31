import type { ReactNode } from "react";

/** The masthead every documentation page opens with. */
export function DocHeader({
  section,
  title,
  summary,
  children,
}: {
  /** The sidebar group this page belongs to, e.g. "Technical". */
  section: string;
  title: string;
  summary: string;
  /** Optional status badges shown beside the section label. */
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-line-soft pb-7">
      <div className="flex flex-wrap items-center gap-3">
        <p className="eyebrow">{section}</p>
        {children}
      </div>
      <h1 className="mt-3 font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] text-cream sm:text-[38px]">
        {title}
      </h1>
      <p className="mt-3 max-w-[62ch] text-[16px] leading-relaxed text-ash">
        {summary}
      </p>
    </header>
  );
}
