/**
 * The three steps of using Harissa, on the rail the rest of the site uses.
 *
 * Plain language on purpose: this sits on the home page, where the reader is
 * deciding whether to try a media player, not reading about how one is built.
 * The technical version of this path lives on the architecture page.
 */
const STEPS = [
  { label: "Pick a file", note: "From anywhere on your computer" },
  { label: "It plays", note: "Music or video, straight away" },
  { label: "That's it", note: "Nothing uploaded, nothing saved" },
];

export function PathTrace() {
  return (
    <figure className="rounded-panel border border-line bg-shell/50 p-5 sm:p-6">
      <ol className="flex flex-col sm:flex-row sm:items-start">
        {STEPS.map((step, index) => (
          <li
            key={step.label}
            className="relative flex min-w-0 flex-1 items-start gap-3 pb-5 last:pb-0 sm:block sm:pb-0"
          >
            {/* Rail: vertical on narrow screens, horizontal from sm up. The
                bottom padding above is what lets it reach the next step. */}
            <span
              aria-hidden
              className={`absolute left-[5px] top-3 h-full w-px bg-line sm:left-0 sm:top-[5px] sm:h-px sm:w-full ${
                index === STEPS.length - 1 ? "hidden" : ""
              }`}
            />
            <span
              aria-hidden
              className="relative z-10 mt-1.5 h-[11px] w-[11px] shrink-0 rounded-full border-2 border-chili bg-chili sm:mt-0"
            />
            <div className="min-w-0 sm:mt-3.5 sm:pr-6">
              <p className="text-[14.5px] font-medium text-cream">
                {step.label}
              </p>
              <p className="mt-0.5 text-[13px] leading-relaxed text-ash-dim">
                {step.note}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
