import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/ui/callout";
import { CodeBlock } from "@/components/ui/code-block";
import { DocHeader } from "@/components/docs/doc-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Security",
  description:
    "Harissa's security posture: context isolation, a minimal bridge, and the hardening still to do before V1.",
};

export default function SecurityPage() {
  return (
    <>
      <DocHeader
        section="Technical"
        title="Security"
        summary="A desktop application that reads your files deserves a plain account of what it can do. This page states the posture Harissa relies on, and what is still missing."
      />

      <div className="prose mt-9">
        <h2 id="the-shape-of-the-risk">The shape of the risk</h2>
        <p>
          Harissa fetches nothing and loads no remote content, so the usual
          Electron worry — a compromised web page reaching the operating system —
          barely applies. The realistic risk is narrower: a malformed media file
          is untrusted input, and the code that handles it should have as little
          reach as possible.
        </p>
        <p>
          That is what the layering in the{" "}
          <Link href="/docs/technical/architecture">architecture</Link> is for.
          The process that parses your files is the process with no privileges.
        </p>

        <h2 id="context-isolation">Context isolation</h2>
        <p>
          The renderer runs with Electron&rsquo;s modern defaults: context
          isolation on, Node.js integration off, and the sandbox enabled. Page
          code and preload code run in separate JavaScript contexts, so the page
          cannot reach the preload&rsquo;s scope, and it has no{" "}
          <code>require</code> and no <code>process</code> of its own.
        </p>

        <Callout tone="planned" title="Worth making explicit">
          Harissa inherits these settings rather than setting them. They are the
          defaults in current Electron, but writing{" "}
          <code>contextIsolation: true</code>, <code>nodeIntegration: false</code>{" "}
          and <code>sandbox: true</code> into{" "}
          <code>webPreferences</code> states the intent in the source and would
          survive a future default changing.
        </Callout>

        <h2 id="minimal-surface">A minimal bridge</h2>
        <p>
          The renderer receives three narrow functions and nothing more. Not a
          filesystem module, not <code>ipcRenderer</code> itself, and not a
          generic <code>invoke(channel, args)</code> escape hatch that would let
          any renderer code call any handler:
        </p>
      </div>

      <CodeBlock filename="Desktop App/electron/preload.ts">
        {`contextBridge.exposeInMainWorld("harissa", {
  openFile: () => ipcRenderer.invoke("dialog:openFile"),
  getPathForFile: (file: File) => { /* webUtils, no IPC needed */ },
  getArtwork: (filePath: string) =>
    ipcRenderer.invoke("media:artwork", filePath),
});`}
      </CodeBlock>

      <div className="prose">
        <p>
          For opening media the main process keeps the decision: it does not take
          a path from the renderer and open it, it shows a dialog and returns
          what <em>you</em> chose. A file gets read because a person selected it,
          not because the interface asked.
        </p>
        <p>
          <code>getArtwork</code> is the exception worth noting — it does take a
          path from the renderer. In practice that path always came from the
          dialog or a dropped file, but validating it in the handler would make
          that a rule rather than a convention.
        </p>

        <h2 id="no-remote-content">No remote content</h2>
        <p>
          The window loads the local dev server in development and local files in
          a packaged build. There is no remote URL, no embedded browser view, and
          no analytics or update check. Nothing outside your machine can reach
          the renderer, because nothing outside your machine is loaded.
        </p>

        <h2 id="known-gaps">Known gaps</h2>
        <p>
          These are open. They are written here because a security page that only
          lists what is right is not much use:
        </p>
        <ul>
          <li>
            <strong>
              The media:// handler and the artwork handler resolve any path they
              are given.
            </strong>{" "}
            Both act on a path from the renderer. Today only paths that came from
            the dialog or a dropped file are ever requested, but neither handler
            checks that. Restricting them to paths the user has actually selected
            would close the gap between what is true in practice and what the
            code enforces.
          </li>
          <li>
            <strong>No Content Security Policy is set.</strong> With no remote
            content the exposure is small, but a policy that forbids remote
            script and connection outright turns that from a fact about today
            into a rule.
          </li>
          <li>
            <strong>The webPreferences defaults are implicit</strong>, as noted
            above.
          </li>
          <li>
            <strong>The installer is not signed.</strong> Windows will warn on an
            unsigned installer, and users cannot verify what they downloaded.
            Signing and a published SHA-256 are part of{" "}
            <Link href="/docs/development/packaging">packaging</Link>.
          </li>
        </ul>

        <h2 id="what-harissa-never-does">What Harissa never does</h2>
        <ul>
          <li>Send your files, paths or usage anywhere — there is no network code</li>
          <li>Write a record of what you played</li>
          <li>Scan your drives or index your media</li>
          <li>Run in the background after the window is closed</li>
          <li>Install a service, driver or scheduled task</li>
        </ul>

        <h2 id="reporting">Reporting a problem</h2>
        <p>
          Security issues can be raised in the{" "}
          <a href={site.repository}>project repository</a>. A dedicated
          disclosure process will be published with the V1 release.
        </p>
      </div>
    </>
  );
}
