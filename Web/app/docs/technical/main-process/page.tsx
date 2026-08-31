import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/ui/callout";
import { CodeBlock } from "@/components/ui/code-block";
import { DocHeader } from "@/components/docs/doc-header";

export const metadata: Metadata = {
  title: "Main process",
  description:
    "electron/main.ts: the window, the Windows file dialog, and the media:// protocol that streams local files.",
};

export default function MainProcessPage() {
  return (
    <>
      <DocHeader
        section="Technical"
        title="Main process"
        summary="electron/main.ts is the desktop half of Harissa. It owns the window, the operating system dialogs and every read from disk."
      />

      <div className="prose mt-9">
        <h2 id="responsibilities">Responsibilities</h2>
        <p>
          The main process is a Node.js process. It is the only part of Harissa
          with real privileges, so its job list is kept short and explicit:
        </p>
        <ul>
          <li>Create the application window and manage its lifecycle</li>
          <li>Load the interface — the dev server, or the built files</li>
          <li>Show the Windows open dialog when the renderer asks</li>
          <li>Register and serve the <code>media://</code> protocol</li>
          <li>Handle IPC requests from the renderer</li>
        </ul>
        <p>
          It renders nothing. Anything visual belongs to the{" "}
          <Link href="/docs/technical/renderer">renderer</Link>.
        </p>

        <h2 id="the-window">Creating the window</h2>
        <p>
          The window opens at 1240 by 820 with a floor of 900 by 560. It draws
          its own title bar, with the native Windows buttons overlaid on it, and
          it keeps decoding at full speed when minimised — without that, playback
          stalls when the window is hidden. The <code>preload</code> option is the
          important line: it is what puts the bridge into the window before any
          page code runs.
        </p>
      </div>

      <CodeBlock filename="Desktop App/electron/main.ts">
        {`const win = new BrowserWindow({
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
    // Keep decoding at full speed when the window is hidden or minimised.
    backgroundThrottling: false,
  },
});`}
      </CodeBlock>

      <div className="prose">
        <p>
          The preload is loaded as <code>preload.cjs</code>, not{" "}
          <code>.js</code>. Preload scripts are CommonJS, while the rest of the
          application is an ES module, so Vite is configured to emit that one
          file in CommonJS with a <code>.cjs</code> extension.
        </p>

        <h2 id="loading-the-interface">Loading the interface</h2>
        <p>
          The same binary serves development and production. In development the
          window points at the Vite dev server, which gives hot reloading of the
          interface; in a packaged build it loads the files built to disk.
        </p>
      </div>

      <CodeBlock filename="Desktop App/electron/main.ts">
        {`if (process.env.VITE_DEV_SERVER_URL) {
  win.loadURL(process.env.VITE_DEV_SERVER_URL);
} else {
  win.loadFile("dist/index.html");
}`}
      </CodeBlock>

      <div className="prose">
        <h2 id="the-file-dialog">The file dialog</h2>
        <p>
          The dialog is opened by the main process on request. Multiple selection
          is enabled, and the filters let you narrow the picker to audio, to video,
          or to everything Harissa recognises. Cancelling returns{" "}
          <code>null</code> so the renderer can tell &ldquo;nothing chosen&rdquo;
          from &ldquo;a file chosen&rdquo; without inspecting an empty array.
        </p>
      </div>

      <CodeBlock filename="Desktop App/electron/main.ts">
        {`const AUDIO_EXTENSIONS = ["mp3", "m4a", "aac", "wav", "flac", "ogg", "oga", "opus", "weba"];
const VIDEO_EXTENSIONS = ["mp4", "m4v", "mkv", "webm", "mov", "avi", "ogv"];

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
});`}
      </CodeBlock>

      <div className="prose">
        <p>
          Being offered in the dialog is not the same as being guaranteed to
          play: the extension lists are wider than the two formats V1 commits to,
          and a file only plays if the media engine can decode it. See{" "}
          <Link href="/docs/guide/opening-media">opening media</Link>.
        </p>

        <h2 id="media-protocol">The media:// protocol</h2>
        <p>
          A Chromium window will not load <code>file://</code> URLs from a page
          for good reasons, so Harissa registers its own scheme instead. It is
          declared privileged before the application is ready — that ordering is
          required — and then handled once it is.
        </p>
      </div>

      <CodeBlock filename="Desktop App/electron/main.ts">
        {`protocol.registerSchemesAsPrivileged([
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
  // ...
});`}
      </CodeBlock>

      <div className="prose">
        <p>Each privilege earns its place:</p>
        <ul>
          <li>
            <strong>stream</strong> — the file is streamed rather than buffered,
            so playback starts before the whole file is read
          </li>
          <li>
            <strong>supportFetchAPI</strong> — range requests work, which is what
            makes seeking in a large file cheap
          </li>
          <li>
            <strong>secure</strong> and <strong>standard</strong> — the scheme
            behaves like a normal, trusted origin to Chromium
          </li>
        </ul>
        <p>
          Forwarding the request headers is what carries the{" "}
          <code>Range</code> header through, so a seek asks for the bytes it
          needs instead of the whole file.
        </p>

        <Callout>
          The handler resolves whatever path it is given. What that implies, and
          what should be added before wider use, is covered under{" "}
          <Link href="/docs/technical/security">security</Link>.
        </Callout>
      </div>
    </>
  );
}
