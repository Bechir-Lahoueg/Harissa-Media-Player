/**
 * The key map, taken from the keyboard handler in the application source
 * (Desktop App/src/App.tsx).
 *
 * The player keys only fire when something is loaded. The window keys work at
 * any time. Keys are ignored while you are typing in a field, such as the
 * queue filter.
 */
export interface Shortcut {
  keys: string;
  action: string;
  /** Where the binding applies. */
  scope: "Playback" | "Video" | "Window";
}

export const shortcuts: Shortcut[] = [
  { keys: "Space", action: "Play or pause", scope: "Playback" },
  { keys: "←", action: "Back 10 seconds, or hold to scan", scope: "Playback" },
  { keys: "→", action: "Forward 10 seconds, or hold to scan", scope: "Playback" },
  { keys: "↑", action: "Volume up", scope: "Playback" },
  { keys: "↓", action: "Volume down", scope: "Playback" },
  { keys: "M", action: "Mute or unmute", scope: "Playback" },
  { keys: "N", action: "Next track", scope: "Playback" },
  { keys: "P", action: "Previous track", scope: "Playback" },
  { keys: "F", action: "Toggle fullscreen", scope: "Video" },
  { keys: "Esc", action: "Leave fullscreen", scope: "Video" },
  { keys: "Ctrl + O", action: "Open files", scope: "Window" },
  { keys: "Ctrl + B", action: "Show or hide the sidebar", scope: "Window" },
  { keys: "Ctrl + J", action: "Show or hide the queue", scope: "Window" },
];
