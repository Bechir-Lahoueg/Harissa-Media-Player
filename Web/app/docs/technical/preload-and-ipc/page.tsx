import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/ui/callout";
import { CodeBlock } from "@/components/ui/code-block";
import { DocHeader } from "@/components/docs/doc-header";
import { RailFlow } from "@/components/ui/rail-flow";

export const metadata: Metadata = {
  title: "Preload and IPC",
  description:
    "The contextBridge API Harissa exposes to the renderer, and the single IPC channel behind it.",
};

export default function PreloadAndIpcPage() {
  return (
    <>
      <DocHeader
        section="Technical"
        title="Preload and IPC"
        summary="The preload script is the whole surface between your interface and your operating system. In V1 it is three functions, and nothing else crosses."
      />

      <div className="prose mt-9">
        <h2 id="the-bridge">The bridge</h2>
        <p>
          A preload script runs before the page, in the renderer process, but
          with access to Electron&rsquo;s APIs. It uses{" "}
          <code>contextBridge</code> to publish a chosen object into the page.
          Only what is published crosses over; the page cannot reach anything
          else, including the preload&rsquo;s own imports.
        </p>
      </div>

      <CodeBlock filename="Desktop App/electron/preload.ts">
        {`import { contextBridge, ipcRenderer, webUtils } from "electron";

contextBridge.exposeInMainWorld("harissa", {
  openFile: () => ipcRenderer.invoke("dialog:openFile"),

  /** Resolves a dropped File back to its path on disk. */
  getPathForFile: (file: File) => {
    try {
      return webUtils.getPathForFile(file);
    } catch {
      return null;
    }
  },

  /** Cover art embedded in the file, as a data URL, or null when it has none. */
  getArtwork: (filePath: string) =>
    ipcRenderer.invoke("media:artwork", filePath),
});`}
      </CodeBlock>

      <div className="prose">
        <p>
          That is the entire privileged surface of Harissa V1: ask for a file
          dialog, resolve a dropped file to its path, and read the cover art out
          of a file. The renderer cannot list a directory, delete anything, spawn
          a process, or reach the network through this object, because none of
          those were published.
        </p>

        <Callout>
          The bridge is a whitelist, not a filter. A capability that is not
          written into this file does not exist as far as the interface is
          concerned.
        </Callout>

        <h2 id="what-ipc-is">What IPC is</h2>
        <p>
          The renderer and the main process are separate operating system
          processes. They cannot share objects or call each other&rsquo;s
          functions, so they exchange messages over named channels — inter-process
          communication.
        </p>
        <p>
          Two of the three bridge functions cross to the main process over IPC;{" "}
          <code>getPathForFile</code> does not need to, because{" "}
          <code>webUtils</code> can answer it inside the preload.
        </p>
        <p>
          Harissa uses the request/response form:{" "}
          <code>ipcRenderer.invoke</code> sends a message and returns a promise,
          and <code>ipcMain.handle</code> answers it. The value the handler
          returns is what the promise resolves to, after being serialised across
          the boundary.
        </p>

        <h2 id="the-round-trip">The round trip</h2>
        <p>
          Opening a file is the round trip worth following end to end. Reading
          cover art over <code>media:artwork</code> takes exactly the same shape.
        </p>
      </div>

      <RailFlow
        steps={[
          {
            label: "onOpenFiles()",
            note: "A React event handler, in response to a click or Ctrl + O",
            file: "src/",
          },
          {
            label: "window.harissa.openFile()",
            note: "The published bridge function — the renderer sees nothing else",
            file: "electron/preload.ts",
          },
          {
            label: 'ipcRenderer.invoke("dialog:openFile")',
            note: "Sends the request and returns a promise",
          },
          {
            label: 'ipcMain.handle("dialog:openFile")',
            note: "The main process receives it and acts",
            file: "electron/main.ts",
          },
          {
            label: "dialog.showOpenDialog(...)",
            note: "Windows draws its own file picker; the user chooses",
          },
          {
            label: "string[] | null",
            note: "Paths resolve back through the promise, or null if cancelled",
          },
        ]}
        caption="One channel per capability, and one direction of initiative: the renderer asks, the main process decides."
      />

      <div className="prose">
        <h2 id="using-it">Using it from React</h2>
        <p>
          On the React side it is an ordinary async call. Nothing about Electron
          leaks into components:
        </p>
      </div>

      <CodeBlock filename="Desktop App/src/App.tsx">
        {`const handleOpenFile = async () => {
  const filePaths = await window.harissa.openFile();

  if (filePaths && filePaths.length > 0) {
    setPlaylist(filePaths);
    setCurrentIndex(0);
  }
};`}
      </CodeBlock>

      <div className="prose">
        <p>
          The <code>null</code> case is the cancelled dialog, and it is handled by
          doing nothing — whatever was playing keeps playing.{" "}
          <Link href="/docs/technical/typescript">TypeScript</Link> is what makes{" "}
          <code>window.harissa</code> a known shape rather than an assumption.
        </p>

        <h2 id="adding-a-channel">Adding a channel</h2>
        <p>
          Every new privileged capability follows the same four steps, in this
          order:
        </p>
        <ol>
          <li>
            Add a handler in <code>electron/main.ts</code> with a{" "}
            <code>namespace:action</code> channel name, and validate its
            arguments — they arrive from the renderer and are not to be trusted.
          </li>
          <li>
            Expose one function for it in <code>electron/preload.ts</code>,
            keeping it as narrow as the feature allows.
          </li>
          <li>
            Add its signature to the <code>Window</code> declaration in{" "}
            <code>src/types/electron.d.ts</code>.
          </li>
          <li>Call it from React and handle the failure case.</li>
        </ol>
        <p>
          Skipping step three still compiles nothing useful — TypeScript will
          reject the call — which is the point of keeping the declaration in step
          with the bridge.
        </p>

        <h2 id="build">How the preload is built</h2>
        <p>
          Preload scripts must be CommonJS. The application is an ES module, so
          Vite builds this one entry separately and emits <code>preload.cjs</code>{" "}
          next to the main bundle, which is the file{" "}
          <code>webPreferences.preload</code> points at.
        </p>
      </div>

      <CodeBlock filename="Desktop App/vite.config.ts">
        {`electron([
  { entry: "electron/main.ts" },
  {
    entry: "electron/preload.ts",
    vite: {
      build: {
        lib: {
          entry: "electron/preload.ts",
          formats: ["cjs"],
          fileName: () => "[name].cjs",
        },
      },
    },
  },
]);`}
      </CodeBlock>
    </>
  );
}
