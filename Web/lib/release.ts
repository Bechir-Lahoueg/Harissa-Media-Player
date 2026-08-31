/**
 * ────────────────────────────────────────────────────────────────────────
 *  THE DOWNLOAD LINK GOES HERE.
 *
 *  This is the only file you need to touch when the installer is ready.
 *  Fill in the fields below and change `status` to "released", and the
 *  download button turns on everywhere it appears: the home page, the
 *  installation page and the releases page.
 *
 *  Example of a finished release:
 *
 *    version:     "1.0.0",
 *    date:        "2026-04-12",
 *    fileName:    "Harissa-Setup-1.0.0.exe",
 *    size:        "78 MB",
 *    downloadUrl: "https://github.com/…/releases/download/v1.0.0/Harissa-Setup-1.0.0.exe",
 *    sha256:      "9f2c…",
 *    notesUrl:    "https://github.com/…/releases/tag/v1.0.0",
 *    status:      "released",
 *
 *  Leave a field as null if you do not have it. Only `downloadUrl` and
 *  `status` decide whether the button works.
 * ────────────────────────────────────────────────────────────────────────
 */
export interface Release {
  /** Version string, e.g. "1.0.0". */
  version: string | null;
  /** ISO date the build was published, e.g. "2026-04-12". */
  date: string | null;
  /** Installer file name, e.g. "Harissa-Setup-1.0.0.exe". */
  fileName: string | null;
  /** Human-readable installer size, e.g. "78 MB". */
  size: string | null;
  /** Direct link to the installer. */
  downloadUrl: string | null;
  /** SHA-256 of the installer, so people can check their download. */
  sha256: string | null;
  /** Release notes page, usually the GitHub release. */
  notesUrl: string | null;
  status: "unreleased" | "released";
}

export const latestRelease: Release = {
  version: null,
  date: null,
  fileName: null,
  size: null,
  downloadUrl: null, // ← paste the installer link here
  sha256: null,
  notesUrl: null,
  status: "unreleased", // ← change to "released"
};

/**
 * Older versions, newest first. Empty until there is more than one release.
 * Move the previous `latestRelease` object in here when you publish a new one.
 */
export const releaseHistory: Release[] = [];

export function isReleased(release: Release): boolean {
  return release.status === "released" && release.downloadUrl !== null;
}
