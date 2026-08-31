import Image from "next/image";

/**
 * The Harissa logo.
 *
 * The official mark: a chili curled around a play triangle. The source file is
 * `public/logo.png` — replacing that file updates the logo everywhere it is
 * used, including the browser tab icon, which is the same image at
 * `app/icon.png`.
 */
export function Logo({
  size = 22,
  className = "",
  priority = false,
}: {
  /** Rendered size in pixels. The source is square. */
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/logo.png"
      alt=""
      width={size}
      height={size}
      priority={priority}
      className={className}
      style={{ width: size, height: size }}
    />
  );
}

/**
 * The name, set as a two-line lockup.
 *
 * "Harissa" alone is a chili paste, a font, and several other products, so the
 * category always rides underneath it in letterspaced mono. The hero uses the
 * same arrangement at a larger size, which is what ties the two together.
 */
export function NameLockup({
  size = "sm",
}: {
  /** `sm` for the header bar, `lg` for the hero. */
  size?: "sm" | "lg";
}) {
  const large = size === "lg";

  return (
    <span className="flex flex-col leading-none">
      <span
        className={`font-display font-semibold tracking-[-0.03em] text-cream ${
          large ? "text-[40px] sm:text-[56px]" : "text-[17px]"
        }`}
      >
        Harissa
      </span>
      <span
        className={`font-mono uppercase text-ash-dim ${
          large
            ? "mt-2 text-[11px] tracking-[0.42em] sm:text-[13px]"
            : "mt-[3px] text-[8.5px] tracking-[0.22em]"
        }`}
      >
        Media Player
      </span>
    </span>
  );
}

/** The logo and the name, used in the header. */
export function Wordmark() {
  return (
    <span className="flex items-center gap-2.5">
      <Logo size={36} />
      <NameLockup />
    </span>
  );
}
