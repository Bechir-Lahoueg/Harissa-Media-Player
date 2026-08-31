import electron from "electron";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { handleMediaRequest } from "./mediaProtocol.js";

const { app, BrowserWindow, dialog, ipcMain, protocol } = electron;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Stabilizes taskbar grouping/pinning identity on Windows. Must be set before
// any window is created; harmless to call in dev, where Electron already
// defaults to a similar id.
app.setAppUserModelId("com.harissa.player");

/** Kept in step with the --color-ink / --color-shell tokens in src/index.css. */
const CHROME = {
  ink: "#120E0D",
  shell: "#1A1413",
  ash: "#A2938D",
};

/**
 * Resolves the window/taskbar icon against `app.getAppPath()` rather than
 * `__dirname`, so the same lookup works both unpacked (this file lives in
 * dist-electron/, app root is one level up) and once packaged, provided the
 * packager includes `public/` in the bundle. Falls back to the dev-relative
 * path, then to no icon at all rather than crashing on a missing asset.
 */
function resolveIconPath(): string | undefined {
  const candidates = [
    path.join(app.getAppPath(), "public", "icon.png"),
    path.join(__dirname, "..", "public", "icon.png"),
  ];
  const found = candidates.find((candidate) => fs.existsSync(candidate));
  if (!found) {
    console.error("Harissa: window icon not found, checked:", candidates);
  }
  return found;
}

const ICON_PATH = resolveIconPath();

const AUDIO_EXTENSIONS = ["mp3", "m4a", "aac", "wav", "flac", "ogg", "oga", "opus", "weba"];
const VIDEO_EXTENSIONS = ["mp4", "m4v", "mkv", "webm", "mov", "avi", "ogv"];

// Disable battery-saver frame throttling; local playback always decodes at full fidelity.
app.commandLine.appendSwitch("disable-features", "MediaSessionPreventBatterySaver,BatterySaver");

protocol.registerSchemesAsPrivileged([
  {
    scheme: "media",
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      stream: true,
      bypassCSP: true,
    },
  },
]);

app.whenReady().then(() => {
  protocol.handle("media", handleMediaRequest);

  const win = new BrowserWindow({
    width: 1240,
    height: 820,
    minWidth: 900,
    minHeight: 560,
    resizable: true,
    show: false,
    title: "Harissa",
    // Replaces Electron's default icon in the taskbar, Alt-Tab, and window chrome.
    icon: ICON_PATH,
    backgroundColor: CHROME.ink,
    // Native window buttons, drawn over the app's own titlebar strip.
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: CHROME.shell,
      symbolColor: CHROME.ash,
      height: 52,
    },
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      // Keep decoding at full speed when the window is hidden or minimised,
      // otherwise playback stalls and the stream has to be re-established.
      backgroundThrottling: false,
    },
  });

  win.once("ready-to-show", () => win.show());

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile("dist/index.html");
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.handle("dialog:openFile", async () => {
  const result = await dialog.showOpenDialog({
    title: "Open media",
    properties: ["openFile", "multiSelections"],
    filters: [
      { name: "Media", extensions: [...AUDIO_EXTENSIONS, ...VIDEO_EXTENSIONS] },
      { name: "Audio", extensions: AUDIO_EXTENSIONS },
      { name: "Video", extensions: VIDEO_EXTENSIONS },
      { name: "All files", extensions: ["*"] },
    ],
  });

  if (result.canceled || result.filePaths.length === 0) {
    return null;
  }

  return result.filePaths;
});

/** Reads cover art embedded in the file, as a data URL the renderer can show. */
ipcMain.handle("media:artwork", async (_event, filePath: string) => {
  if (typeof filePath !== "string" || filePath === "") return null;
  try {
    const { parseFile } = await import("music-metadata");
    const metadata = await parseFile(filePath, { duration: false });
    const picture = metadata.common.picture?.[0];
    if (!picture) return null;
    const base64 = Buffer.from(picture.data).toString("base64");
    return `data:${picture.format};base64,${base64}`;
  } catch {
    return null;
  }
});
