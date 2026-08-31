/**
 * The V1 feature list and the roadmap, kept as data.
 *
 * `status` is deliberately explicit on every row. The website is documentation
 * for software that has not shipped a binary yet, so a reader must always be
 * able to tell an implemented capability from an intended one.
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
        description: "Fill the display with the video surface and return with Escape.",
        status: "v1",
      },
      {
        title: "Further audio and video formats",
        description:
          "The open dialog also offers WAV, FLAC, OGG, M4A, MKV, WebM, MOV and more. They play when the media engine can decode them; MP3 and MP4 are the two V1 guarantees.",
        status: "v1",
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
        title: "Cover art",
        description:
          "Artwork stored inside a file is read out and shown while the track plays.",
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
        description: "A signed setup executable for the first public release.",
        status: "v1",
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
    title: "Windows integration",
    description:
      "File associations, jump lists and the system media transport controls.",
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
