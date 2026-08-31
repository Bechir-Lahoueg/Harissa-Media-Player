/**
 * The documentation tree.
 *
 * This single structure drives the sidebar, the mobile navigation and the
 * previous/next links at the foot of every page. Adding a page means adding a
 * `page.tsx` file and one entry here.
 */
export interface DocLink {
  title: string;
  href: string;
  /** Shown under the title in overview grids, and as the page's lead-in. */
  summary?: string;
  /** In-page anchors surfaced in the sidebar under the active page. */
  anchors?: { title: string; hash: string }[];
}

export interface DocSection {
  title: string;
  items: DocLink[];
}

export const docsNav: DocSection[] = [
  {
    title: "Start here",
    items: [
      {
        title: "Introduction",
        href: "/docs",
        summary: "What Harissa is, and what it leaves out.",
      },
      {
        title: "Installation",
        href: "/docs/installation",
        summary: "How to get it running now, and how installing will work later.",
      },
      {
        title: "Getting started",
        href: "/docs/getting-started",
        summary: "Open your first file and get sound out of it.",
      },
    ],
  },
  {
    title: "User guide",
    items: [
      {
        title: "Opening media",
        href: "/docs/guide/opening-media",
        summary: "The file picker, dropping files on the window, and which formats work.",
      },
      {
        title: "Audio playback",
        href: "/docs/guide/audio-playback",
        summary: "Playing music, and what you see while it plays.",
      },
      {
        title: "Video playback",
        href: "/docs/guide/video-playback",
        summary: "Playing video, resizing, and fullscreen.",
      },
      {
        title: "Playback controls",
        href: "/docs/guide/playback-controls",
        summary: "Every control in one place.",
        anchors: [
          { title: "Play and pause", hash: "#play-and-pause" },
          { title: "Seeking", hash: "#seeking" },
          { title: "Volume and mute", hash: "#volume-and-mute" },
          { title: "Fullscreen", hash: "#fullscreen" },
        ],
      },
    ],
  },
  {
    title: "Reference",
    items: [
      {
        title: "Features",
        href: "/docs/features",
        summary: "The full list, and how far along each part is.",
      },
      {
        title: "Keyboard shortcuts",
        href: "/docs/shortcuts",
        summary: "Every keyboard shortcut in the player.",
      },
      {
        title: "Releases",
        href: "/docs/releases",
        summary: "Downloads and version history.",
      },
      {
        title: "Roadmap",
        href: "/docs/roadmap",
        summary: "What is being finished now, and what might come later.",
      },
      {
        title: "FAQ",
        href: "/docs/faq",
        summary: "Quick answers about downloads, formats and privacy.",
      },
    ],
  },
  {
    title: "Technical",
    items: [
      {
        title: "Architecture",
        href: "/docs/technical/architecture",
        summary: "How the app is put together, from click to speaker.",
      },
      {
        title: "Main process",
        href: "/docs/technical/main-process",
        summary: "The window, the file dialog, and how files are streamed in.",
      },
      {
        title: "Preload and IPC",
        href: "/docs/technical/preload-and-ipc",
        summary: "The bridge between the interface and the operating system.",
      },
      {
        title: "Renderer",
        href: "/docs/technical/renderer",
        summary: "What React handles, and where playback state lives.",
      },
      {
        title: "TypeScript",
        href: "/docs/technical/typescript",
        summary: "How the two halves of the app stay in agreement.",
      },
      {
        title: "Security",
        href: "/docs/technical/security",
        summary: "What the app can reach, and what still needs tightening.",
      },
    ],
  },
  {
    title: "Development",
    items: [
      {
        title: "Requirements",
        href: "/docs/development/requirements",
        summary: "What to install before you clone the repository.",
      },
      {
        title: "Workflow",
        href: "/docs/development/workflow",
        summary: "What each npm command actually does.",
      },
      {
        title: "Packaging",
        href: "/docs/development/packaging",
        summary: "How the installer will be built. Not done yet.",
      },
    ],
  },
];

/** Every documentation page in reading order — used for previous/next links. */
export const docsFlat: DocLink[] = docsNav.flatMap((section) => section.items);

export function findNeighbours(pathname: string): {
  previous: DocLink | null;
  next: DocLink | null;
} {
  const index = docsFlat.findIndex((item) => item.href === pathname);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: index > 0 ? docsFlat[index - 1] : null,
    next: index < docsFlat.length - 1 ? docsFlat[index + 1] : null,
  };
}

export function findDoc(pathname: string): DocLink | undefined {
  return docsFlat.find((item) => item.href === pathname);
}

export function sectionOf(pathname: string): DocSection | undefined {
  return docsNav.find((section) =>
    section.items.some((item) => item.href === pathname),
  );
}
