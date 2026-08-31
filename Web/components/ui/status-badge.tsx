import type { Status } from "@/lib/features";

const LABELS: Record<Status, string> = {
  built: "In the build",
  v1: "V1 target",
  planned: "Idea",
};

const STYLES: Record<Status, string> = {
  built: "border-stem/40 text-stem",
  v1: "border-flame/40 text-flame",
  planned: "border-line text-ash-dim",
};

/**
 * States what is true of a capability today.
 *
 * Harissa has no public binary yet, so every feature the site lists carries its
 * status. This badge is the site's main structural device for that reason.
 */
export function StatusBadge({
  status,
  className = "",
}: {
  status: Status;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] ${STYLES[status]} ${className}`}
    >
      <span
        aria-hidden
        className={`h-1 w-1 rounded-full ${
          status === "built"
            ? "bg-stem"
            : status === "v1"
              ? "bg-flame"
              : "bg-ash-dim"
        }`}
      />
      {LABELS[status]}
    </span>
  );
}
