/**
 * The V1 feature list and the roadmap, kept as data.
 *
 * `status` is deliberately explicit on every row, so a reader can always tell an
 * implemented capability from an intended one.
 *
 *   "built"    — implemented in the application source today
 *   "v1"       — in scope for the V1 release, not finished
 *   "planned"  — an idea for after V1, not committed to
 */
export type Status = "built" | "v1" | "planned";

export interface Feature {
  title: string;
  description: string;
  status: Status;
}

export interface FeatureGroup {
  title: string;
  /** One line describing what this group of features covers. */
  intro: string;
  features: Feature[];
}

export const featureGroups: FeatureGroup[] = [
  {
    title: "Playback",
    intro: "What Harissa does with a file once you have opened it.",
    features: [
      {
        title: "MP3 playback",
        description: "Local MP3 files play through the renderer's audio element.",
        status: "built",
      },
      {
        title: "MP4 playback",
        description: "Local MP4 files play on a video surface sized to the window.",
        status: "built",
      },
      {
        title: "Play and pause",
        description: "A single transport control that reflects the real element state.",
        status: "built",
      },
      {
        title: "Seeking",
        description: "Drag the progress bar, or jump in ten-second steps.",
        status: "built",
      },
      {
        title: "Volume control",
        description: "A continuous volume slider, adjustable in five percent steps.",
        status: "built",
      },
      {
        title: "Mute and unmute",
        description: "Muting remembers the previous level and restores it.",
        status: "built",
      },
      {
        title: "Playback progress",
        description: "Elapsed and total time, updated as the file plays.",
        status: "built",
      },
      {
        title: "Fullscreen video",
        description:
          "Fills the display with its own controls. They fade out, along with the mouse pointer, after two seconds of stillness, and come back on the first movement.",
        status: "built",
      },
      {
        title: "Audio and video formats",
        description:
          "MP3, M4A, AAC, WAV, FLAC, OGG, OGA, Opus and WebA for audio; MP4, M4V, MKV, WebM, MOV, AVI and OGV for video. A file plays when the codec inside it is one the media engine can decode, which covers most everyday files.",
        status: "built",
      },
      {
        title: "Jump to a timecode",
        description:
          "Click the elapsed time and type where you want to be — 2:00, 1:02:03, or just 90 for ninety seconds — instead of aiming at a pixel on the bar.",
        status: "built",
      },
      {
        title: "Accurate seeking in large files",
        description:
          "Files are served to the player with byte-range support, so dragging the bar jumps straight to that point rather than replaying from the start.",
        status: "built",
      },
      {
        title: "Queue",
        description:
          "Open several files and they line up in a panel you can filter, skip around and clear.",
        status: "built",
      },
      {
        title: "Shuffle and repeat",
        description:
          "Shuffle the queue, and cycle repeat between off, the whole queue, and one track.",
        status: "built",
      },
      {
        title: "Next and previous",
        description: "Move between tracks in the queue with the transport buttons or N and P.",
        status: "built",
      },
      {
        title: "Cover art and thumbnails",
        description:
          "Artwork stored inside a file is read out and shown while the track plays. Video with no embedded artwork gets a still frame lifted from the film instead.",
        status: "built",
      },
    ],
  },
  {
    title: "Desktop",
    intro: "How Harissa behaves as a Windows application.",
    features: [
      {
        title: "Windows desktop application",
        description: "A native window, not a browser tab or a web app shell.",
        status: "built",
      },
      {
        title: "Resizable window",
        description: "A custom title bar, with the layout adapting down to 900 by 560.",
        status: "built",
      },
      {
        title: "Drag and drop",
        description: "Drop files onto the window to open them, as an alternative to the dialog.",
        status: "built",
      },
      {
        title: "Windows file selection",
        description: "The standard Windows open dialog, with filters for audio, video or both.",
        status: "built",
      },
      {
        title: "Local file access",
        description: "Files are read in place through Electron's main process.",
        status: "built",
      },
      {
        title: "Windows installer",
        description:
          "An NSIS setup executable that installs for the current user, adds Start Menu and desktop shortcuts, and removes itself cleanly. It is not code-signed, so Windows shows a SmartScreen warning the first time it runs.",
        status: "built",
      },
      {
        title: "Opens files from Explorer",
        description:
          "Harissa registers itself as an available player for the media types it supports, so it appears under “Open with”. It does not take over your existing default — that stays your choice.",
        status: "built",
      },
      {
        title: "One window",
        description:
          "Opening a second file hands it to the window already running instead of starting a rival copy of the player.",
        status: "built",
      },
      {
        title: "Follows your Windows language",
        description:
          "The interface reads the Windows display language and switches to it. English, French, Arabic, Spanish and German are translated; anything else falls back to English.",
        status: "built",
      },
    ],
  },
];

/** Roadmap items for after V1. None of these are committed to. */
export const roadmapAfterV1: Feature[] = [
  {
    title: "Broader codec support",
    description:
      "MKV, AVI and other containers that Chromium does not decode on its own.",
    status: "planned",
  },
  {
    title: "Saved playlists",
    description:
      "Keeping a queue between sessions, and reordering it by dragging. The queue itself already works, but it is gone when you close the window.",
    status: "planned",
  },
  {
    title: "Media library",
    description: "Scan chosen folders so files can be browsed without the dialog.",
    status: "planned",
  },
  {
    title: "Track metadata",
    description: "Read title, artist and album from file tags, beyond the cover art V1 reads.",
    status: "planned",
  },
  {
    title: "Subtitles",
    description: "External subtitle files and embedded subtitle tracks for video.",
    status: "planned",
  },
  {
    title: "Deeper Windows integration",
    description:
      "Jump lists, thumbnail toolbar buttons, and the system media transport controls that appear on the volume flyout.",
    status: "planned",
  },
  {
    title: "A code-signed installer",
    description:
      "Signing would remove the SmartScreen warning on first run, and let the app install on machines with Smart App Control switched on.",
    status: "planned",
  },
  {
    title: "More playback controls",
    description: "Playback speed, and picking up a file where you left off.",
    status: "planned",
  },
  {
    title: "Performance work",
    description: "Faster cold start and lower idle memory use.",
    status: "planned",
  },
];

/** Explicitly out of scope. Stated so the boundary is not ambiguous. */
export const nonGoals: string[] = [
  "Cloud storage and cloud synchronisation",
  "User accounts and authentication",
  "A backend API or a database",
  "Online streaming and third-party music services",
  "Social features",
  "A mobile application",
  "Telemetry and usage analytics",
];
