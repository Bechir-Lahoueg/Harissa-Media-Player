
/**
 * Release metadata for the download panel.
 *
 * `downloadUrl` and `status` together decide whether the button is live: the
 * panel falls back to build-from-source instructions until both are set. The
 * installer ships as a GitHub release asset rather than a file in `public/`,
 * because it is larger than GitHub's 100 MB per-file limit for repository
 * contents.
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
  version: "1.0.0",
  date: "2026-09-01",
  fileName: "Harissa-Media-Player-Setup-1.0.0.exe",
  size: "107 MB",
  downloadUrl:
    "https://github.com/Bechir-Lahoueg/Harissa-Media-Player/releases/download/v1.0.0/Harissa-Media-Player-Setup-1.0.0.exe",
  sha256: "b851ff9434602bc13afb3793b2fcaaeef1916bc5d7da1f21cb9ffb5c6a96b5ea",
  notesUrl:
    "https://github.com/Bechir-Lahoueg/Harissa-Media-Player/releases/tag/v1.0.0",
  status: "released",
};


export const releaseHistory: Release[] = [];

export function isReleased(release: Release): boolean {
  return release.status === "released" && release.downloadUrl !== null;
}
