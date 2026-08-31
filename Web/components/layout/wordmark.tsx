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

/** The logo and the name, used in the header. */
export function Wordmark() {
  return (
    <span className="flex items-center gap-2.5">
      <Logo size={34} />
      <span className="font-display text-[18px] font-semibold tracking-tight text-cream">
        Harissa
      </span>
    </span>
  );
}
