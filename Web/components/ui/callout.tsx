import type { ReactNode } from "react";

type Tone = "note" | "planned" | "caution";

const TONES: Record<Tone, { label: string; bar: string; text: string }> = {
  note: { label: "Note", bar: "bg-ash-dim", text: "text-ash" },
  planned: { label: "Not built yet", bar: "bg-flame", text: "text-flame" },
  caution: { label: "Careful", bar: "bg-chili", text: "text-chili-hi" },
};

/**
 * A short aside beside the body copy.
 *
 * `planned` is used wherever the documentation describes something that does not
 * exist in the application yet, so a reader never mistakes an intention for a
 * feature.
 */
export function Callout({
  tone = "note",
  title,
  children,
}: {
  tone?: Tone;
  title?: string;
  children: ReactNode;
}) {
  const { label, bar, text } = TONES[tone];

  return (
    <div className="my-6 flex gap-3.5 rounded-r-[10px] bg-shell/70 py-4 pr-4">
      <span aria-hidden className={`w-[3px] shrink-0 rounded-full ${bar}`} />
      <div className="min-w-0">
        <p
          className={`font-mono text-[10px] uppercase tracking-[0.14em] ${text}`}
        >
          {title ?? label}
        </p>
        <div className="mt-1.5 space-y-2 text-[14px] leading-relaxed text-ash [&_a]:text-cream [&_a]:underline [&_a]:decoration-chili [&_a]:underline-offset-2 [&_code]:rounded [&_code]:border [&_code]:border-line-soft [&_code]:bg-raise [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.86em] [&_code]:text-cream">
          {children}
        </div>
      </div>
    </div>
  );
}
