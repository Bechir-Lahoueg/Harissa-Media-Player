import electron from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { handleMediaRequest } from "./mediaProtocol.js";

const { app, BrowserWindow, dialog, ipcMain, protocol } = electron;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Kept in step with the --color-ink / --color-shell tokens in src/index.css. */
const CHROME = {
  ink: "#120E0D",
  shell: "#1A1413",
  ash: "#A2938D",
};

const AUDIO_EXTENSIONS = ["mp3", "m4a", "aac", "wav", "flac", "ogg", "oga", "opus", "weba"];
const VIDEO_EXTENSIONS = ["mp4", "m4v", "mkv", "webm", "mov", "avi", "ogv"];

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
