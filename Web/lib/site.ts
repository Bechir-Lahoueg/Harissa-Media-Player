/**
 * Site-wide constants.
 *
 * Anything that would otherwise be retyped across pages lives here, so a single
 * edit updates the header, the footer, the metadata and every in-page link.
 */
export const site = {
  name: "Harissa",
  fullName: "Harissa Media Player",
  tagline: "A lightweight, local-first media player for Windows.",
  description:
    "Harissa is a lightweight, local-first media player for Windows built with React, TypeScript, and Electron.",
  repository: "https://github.com/Bechir-Lahoueg/Harissa-Media-Player",
  /**
   * Public URL of the deployed documentation site.
   * Update this before the first deployment — it is the base for canonical and
   * Open Graph URLs.
   */
  url: "https://harissa-media-player.vercel.app",
} as const;

/** The platform Harissa targets. Kept as data so pages never disagree. */
export const platform = {
  os: "Windows 10 and 11",
  arch: "x64",
} as const;

/** Stack used by the desktop application, shown on the home page. */
export const stack = [
  { name: "React 19", role: "User interface in the Electron renderer" },
  { name: "TypeScript", role: "Types across the renderer, preload and main process" },
  { name: "Vite", role: "Dev server and production bundling" },
  { name: "Tailwind CSS", role: "Styling for the player interface" },
  { name: "Electron", role: "Windows window, file dialog and local file access" },
] as const;
