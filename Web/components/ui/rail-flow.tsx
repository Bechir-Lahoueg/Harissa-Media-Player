export interface RailStep {
  /** The component or boundary the data passes through. */
  label: string;
  /** What happens at this step. */
  note?: string;
  /** Source file, when the step maps to one. */
  file?: string;
}

/**
 * A vertical rail with a station per step.
 *
 * Every data path in these docs — the process architecture, the open-file round
 * trip, the packaging pipeline — is drawn with the same rail, so a reader learns
 * the notation once. The rail is the site's recurring visual device; it is the
 * scrubber from the player, stood on its end.
 */
export function RailFlow({
  steps,
  caption,
}: {
  steps: RailStep[];
  caption?: string;
}) {
  return (
    <figure className="my-7">
      <ol className="relative space-y-0">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const isEdge = index === 0 || isLast;

          return (
            <li key={step.label} className="relative flex gap-4 pb-5 last:pb-0">
              {/* The rail itself, drawn behind each station except the last. */}
              {!isLast && (
                <span
                  aria-hidden
                  className="absolute left-[5px] top-2.5 h-full w-px bg-line"
                />
              )}
              <span
                aria-hidden
                className={`relative z-10 mt-2 h-[11px] w-[11px] shrink-0 rounded-full border-2 ${
                  isEdge
                    ? "border-chili bg-chili"
                    : "border-line bg-ink"
                }`}
              />
              <div className="min-w-0 pt-0.5">
                <p className="font-mono text-[13px] text-cream">{step.label}</p>
                {step.note && (
                  <p className="mt-0.5 text-[13px] leading-relaxed text-ash">
                    {step.note}
                  </p>
                )}
                {step.file && (
                  <p className="mt-1 font-mono text-[11px] text-ash-dim">
                    {step.file}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
      {caption && (
        <figcaption className="mt-3 border-t border-line-soft pt-2.5 text-[12.5px] text-ash-dim">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
