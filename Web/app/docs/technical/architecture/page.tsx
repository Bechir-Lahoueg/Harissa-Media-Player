import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/ui/callout";
import { DocHeader } from "@/components/docs/doc-header";
import { RailFlow } from "@/components/ui/rail-flow";

export const metadata: Metadata = {
  title: "Architecture",
  description:
    "The four layers a file passes through in Harissa, from a click in React to bytes read off the disk.",
};

const LAYERS = [
  {
    layer: "Renderer",
    tech: "React, TypeScript, Tailwind CSS",
    owns: "Interface, player state, transport controls",
    privileges: "None",
  },
  {
    layer: "Preload",
    tech: "TypeScript, contextBridge",
    owns: "The single API object exposed to the window",
    privileges: "Bridge only",
  },
  {
    layer: "Main",
    tech: "Electron, Node.js",
    owns: "Window, dialogs, file reads, app lifecycle",
    privileges: "Full",
  },
  {
    layer: "Windows",
    tech: "The operating system",
    owns: "The file dialog and your files",
    privileges: "—",
  },
];

export default function ArchitecturePage() {
  return (
    <>
      <DocHeader
        section="Technical"
        title="Architecture"
        summary="Harissa is an Electron application with a strict division of labour: the part you see has no privileges, and the part with privileges has no interface."
      />

      <div className="prose mt-9">
        <h2 id="the-layers">The layers</h2>
        <p>
          Requests travel down this chain and results come back up it. There is
          no shortcut across the middle: the React code cannot reach the
          filesystem, and the main process does not render anything.
        </p>
      </div>

      <RailFlow
        steps={[
          {
            label: "React",
            note: "Components, playback state, what you see and click",
            file: "src/",
          },
          {
            label: "Electron renderer",
            note: "The Chromium window the interface runs inside, with no Node.js access",
          },
          {
            label: "Preload",
            note: "Publishes one frozen object, window.harissa, into the window",
            file: "electron/preload.ts",
          },
          {
            label: "IPC",
            note: "Named channels carrying serialisable messages across the process boundary",
          },
          {
            label: "Electron main",
            note: "The Node.js process: window lifecycle, dialogs, file streaming",
            file: "electron/main.ts",
          },
          {
            label: "Windows / local files",
            note: "The open dialog, and the media sitting on your disk",
          },
        ]}
        caption="Every privileged operation in Harissa follows this path."
      />

      <div className="prose">
        <h2 id="responsibilities">Who owns what</h2>
      </div>

      <div className="scroll-thin my-6 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line">
              {["Layer", "Built with", "Responsible for", "Privileges"].map(
                (heading) => (
                  <th
                    key={heading}
                    scope="col"
                    className="pb-2 pr-6 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ash-dim"
                  >
                    {heading}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {LAYERS.map((row) => (
              <tr key={row.layer} className="border-b border-line-soft">
                <td className="py-3 pr-6 font-mono text-[13px] text-cream">
                  {row.layer}
                </td>
                <td className="py-3 pr-6 text-[13.5px] text-ash">{row.tech}</td>
                <td className="py-3 pr-6 text-[13.5px] text-ash">{row.owns}</td>
                <td className="py-3 text-[13.5px] text-ash-dim">
                  {row.privileges}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose">
        <h2 id="two-processes">Two processes, one application</h2>
        <p>
          An Electron application runs at least two processes. The{" "}
          <strong>main process</strong> is Node.js: it creates windows, talks to
          the operating system and can read the disk. Each window runs in a{" "}
          <strong>renderer process</strong>, which is Chromium, and which
          deliberately cannot do any of that.
        </p>
        <p>
          They cannot share objects, only messages. That constraint is the reason
          the architecture is shaped the way it is, and it is what keeps a bug in
          the interface from becoming a bug that touches your filesystem.
        </p>

        <h2 id="how-media-reaches-the-player">How media reaches the player</h2>
        <p>
          Once a path is known, the file still has to reach the media element.
          Harissa does not read the file into memory and hand it over. The main
          process registers a private <code>media://</code> protocol and streams
          the file through it, so the renderer receives a URL it can play and
          seek within, and still never sees a filesystem path it could act on.
        </p>
        <p>
          Streaming also means a two-hour video does not have to be loaded before
          it starts, and seeking asks for only the part of the file it needs.
        </p>
        <p>
          The <Link href="/docs/technical/main-process">main process</Link> page
          covers the protocol handler.
        </p>

        <h2 id="why-electron">Why Electron</h2>
        <p>
          Electron brings three things this project needs: a media engine that
          already decodes the common formats, one codebase in a language the
          interface is written in, and a known path to a Windows installer.
        </p>
        <p>
          The cost is size. An Electron application ships a browser engine, so it
          will always be larger on disk than a native player of the same scope.
          For a V1 that has to play MP3 and MP4 reliably, that trade is worth
          making; if it stops being worth it, the layering above is what would
          make the media engine replaceable without rewriting the interface.
        </p>

        <Callout>
          The renderer talks to <code>window.harissa</code>, never to Electron
          directly. Keeping that boundary intact is what makes the decision above
          reversible.
        </Callout>

        <h2 id="project-layout">Project layout</h2>
        <p>
          The repository holds the application and this website side by side:
        </p>
        <ul>
          <li>
            <code>Desktop App/electron/</code> — main process and preload
          </li>
          <li>
            <code>Desktop App/src/</code> — the React renderer
          </li>
          <li>
            <code>Desktop App/docs/</code> — design notes for the application
          </li>
          <li>
            <code>Web/</code> — this documentation site
          </li>
        </ul>
      </div>
    </>
  );
}
