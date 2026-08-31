/**
 * A fenced code sample with an optional file name header.
 *
 * Deliberately unhighlighted: the samples are short, and shipping a syntax
 * highlighter would add a dependency and a client bundle the docs do not need.
 */
export function CodeBlock({
  children,
  filename,
  label,
}: {
  children: string;
  /** Path shown in the header, e.g. "electron/preload.ts". */
  filename?: string;
  /** Alternative header text when the sample is not a file, e.g. "Terminal". */
  label?: string;
}) {
  const heading = filename ?? label;

  return (
    <figure className="my-6 overflow-hidden rounded-[10px] border border-line-soft bg-shell">
      {heading && (
        <figcaption className="flex items-center gap-2 border-b border-line-soft px-4 py-2 font-mono text-[11px] text-ash-dim">
          {filename && <span aria-hidden className="h-1 w-1 bg-chili" />}
          {heading}
        </figcaption>
      )}
      <pre className="scroll-thin overflow-x-auto px-4 py-3.5">
        <code className="font-mono text-[12.5px] leading-relaxed text-cream">
          {children.trim()}
        </code>
      </pre>
    </figure>
  );
}
