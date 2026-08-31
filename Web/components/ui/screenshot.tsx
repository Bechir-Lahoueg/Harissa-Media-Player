import Image from "next/image";

/**
 * A screenshot slot.
 *
 * Harissa has no public build yet, so there are no real screenshots to show.
 * Until there are, this renders an explicitly empty frame — never a mock-up
 * dressed as the application.
 *
 * To fill a slot: drop the file in `public/screenshots/`, then pass its path.
 *
 *   <Screenshot
 *     src="/screenshots/harissa-main.png"
 *     alt="Harissa with an audio file loaded"
 *     caption="The player after opening a track."
 *     width={2400}
 *     height={1500}
 *   />
 */
export function Screenshot({
  src,
  alt,
  caption,
  width = 2400,
  height = 1500,
  priority = false,
}: {
  src?: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  return (
    <figure className="my-7">
      <div className="overflow-hidden rounded-[12px] border border-line bg-shell">
        {/* Window chrome, so the frame reads as an application shot slot. */}
        <div className="flex items-center gap-1.5 border-b border-line-soft px-3.5 py-2.5">
          <span aria-hidden className="h-2 w-2 rounded-full bg-line" />
          <span aria-hidden className="h-2 w-2 rounded-full bg-line" />
          <span aria-hidden className="h-2 w-2 rounded-full bg-line" />
          <span className="ml-1.5 font-mono text-[10px] text-ash-dim">
            {src ? alt : "Harissa"}
          </span>
        </div>

        {src ? (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            className="block w-full"
          />
        ) : (
          <div
            role="img"
            aria-label={`Screenshot placeholder: ${alt}`}
            className="flex aspect-[16/10] flex-col items-center justify-center gap-2 px-6 text-center"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ash-dim">
              Screenshot pending
            </span>
            <span className="max-w-sm text-[13px] leading-relaxed text-ash">
              {alt}
            </span>
            <span className="mt-1 font-mono text-[11px] text-ash-dim">
              Added when the V1 build is available
            </span>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="mt-2.5 text-[12.5px] text-ash-dim">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
