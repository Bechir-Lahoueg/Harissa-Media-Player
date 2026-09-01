import electron from "electron";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { handleMediaRequest } from "./mediaProtocol.js";

const { BrowserWindow, Menu, app, dialog, ipcMain, protocol, shell } = electron;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isDev = Boolean(process.env.VITE_DEV_SERVER_URL);

// Stabilizes taskbar grouping/pinning identity on Windows. Must match the appId
// in package.json, or the running app and the installed app read as different
// applications and pinning breaks.
app.setAppUserModelId("com.harissa.player");

/** Kept in step with the --color-ink / --color-shell tokens in src/index.css. */
const CHROME = {
  ink: "#120E0D",
  shell: "#1A1413",
  ash: "#A2938D",
};

const AUDIO_EXTENSIONS = ["mp3", "m4a", "aac", "wav", "flac", "ogg", "oga", "opus", "weba"];
const VIDEO_EXTENSIONS = ["mp4", "m4v", "mkv", "webm", "mov", "avi", "ogv"];
const MEDIA_EXTENSIONS = new Set([...AUDIO_EXTENSIONS, ...VIDEO_EXTENSIONS]);

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

// Disable battery-saver frame throttling; local playback always decodes at full fidelity.
app.commandLine.appendSwitch("disable-features", "MediaSessionPreventBatterySaver,BatterySaver");

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

/** Playable files passed on the command line, e.g. from "Open with" or a shortcut. */
function mediaPathsFromArgv(argv: string[]): string[] {
  return argv.slice(1).filter((arg) => {
    if (arg.startsWith("-")) return false;
    const ext = path.extname(arg).slice(1).toLowerCase();
    return MEDIA_EXTENSIONS.has(ext) && fs.existsSync(arg);
  });
}

let mainWindow: electron.BrowserWindow | null = null;

function createWindow() {
  const win = new BrowserWindow({
    width: 1240,
    height: 820,
    minWidth: 900,
    minHeight: 560,
    resizable: true,
    show: false,
    title: "Harissa",
    icon: resolveIconPath(),
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

  // Nothing in the app opens external URLs; refuse both popups and in-place
  // navigation so a stray link can never replace the player with a web page.
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https://")) void shell.openExternal(url);
    return { action: "deny" };
  });
  win.webContents.on("will-navigate", (event, url) => {
    if (url !== win.webContents.getURL()) event.preventDefault();
  });

  if (isDev) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL!).catch((error: unknown) => {
      console.error("Harissa: dev server unreachable:", error);
    });
  } else {
    // Anchored to the app root rather than a relative path: once packaged the
    // working directory is wherever the .exe was launched from, not the app.
    win.loadFile(path.join(app.getAppPath(), "dist", "index.html")).catch((error: unknown) => {
      console.error("Harissa: failed to load the app:", error);
      dialog.showErrorBox("Harissa", "The application files could not be loaded.");
    });
  }

  return win;
}

/** Hands files to the renderer once it is ready to receive them. */
function openPaths(win: electron.BrowserWindow, paths: string[]) {
  if (paths.length === 0) return;
  if (win.webContents.isLoading()) {
    win.webContents.once("did-finish-load", () => win.webContents.send("harissa:open", paths));
  } else {
    win.webContents.send("harissa:open", paths);
  }
}

// A media player must not open twice over itself: a second launch (including
// "Open with" from Explorer) hands its files to the running window instead.
if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on("second-instance", (_event, argv) => {
    if (!mainWindow) return;
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
    openPaths(mainWindow, mediaPathsFromArgv(argv));
  });

  app.whenReady().then(() => {
    protocol.handle("media", handleMediaRequest);

    // Removes Electron's stock menu, whose accelerators would otherwise ship to
    // end users: Ctrl+R reloads and wipes playback state, Ctrl+Shift+I and F11
    // expose developer tooling. The app has no menu bar of its own by design.
    Menu.setApplicationMenu(null);

    mainWindow = createWindow();
    openPaths(mainWindow, mediaPathsFromArgv(process.argv));
  });
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("browser-window-created", (_event, win) => {
  // Menu.setApplicationMenu(null) drops the menu accelerators, but F12 and
  // Ctrl+Shift+I are wired directly into Chromium, so they are refused here too.
  win.webContents.on("before-input-event", (event, input) => {
    if (isDev || input.type !== "keyDown") return;
    const key = input.key.toLowerCase();
    const devToolsChord = input.control && input.shift && (key === "i" || key === "j" || key === "c");
    const reloadChord = input.control && (key === "r" || key === "w");
    if (key === "f12" || devToolsChord || reloadChord) {
      event.preventDefault();
    }
  });
});

/** The UI language to use, taken from the Windows display language. */
ipcMain.handle("app:locale", () => app.getLocale());

ipcMain.handle("dialog:openFile", async () => {
  const result = await dialog.showOpenDialog({
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
