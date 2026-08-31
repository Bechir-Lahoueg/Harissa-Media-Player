import electron from "electron";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const { app, BrowserWindow, dialog, ipcMain, net, protocol } = electron;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

protocol.registerSchemesAsPrivileged([
  {
    scheme: "media",
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      stream: true,
    },
  },
]);

app.whenReady().then(() => {
  protocol.handle("media", (request) => {
    const filePath = decodeURIComponent(new URL(request.url).pathname.slice(1));

    return net.fetch(pathToFileURL(filePath).toString(), {
      headers: request.headers,
    });
  });

  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 480,
    minHeight: 320,
    resizable: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile("dist/index.html");
  }
});

ipcMain.handle('dialog:openFile', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile', 'multiSelections'],
    filters: [
      {
        name: 'Media Files',
        extensions: ['mp3', 'mp4'],
      },
    ],
  })

  if (result.canceled || result.filePaths.length === 0) {
    return null
  }

  return result.filePaths
})
