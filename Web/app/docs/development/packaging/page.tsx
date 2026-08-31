import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/ui/callout";
import { CodeBlock } from "@/components/ui/code-block";
import { DocHeader } from "@/components/docs/doc-header";
import { RailFlow } from "@/components/ui/rail-flow";
import { StatusBadge } from "@/components/ui/status-badge";

export const metadata: Metadata = {
  title: "Packaging",
  description:
    "How the Harissa Windows installer will be produced. Not implemented yet.",
};

export default function PackagingPage() {
  return (
    <>
      <DocHeader
        section="Development"
        title="Packaging"
        summary="Turning the build into a Windows installer is the last piece of V1. It has not been implemented, so this page describes the shape of the work rather than a procedure you can run."
      >
        <StatusBadge status="v1" />
      </DocHeader>

      <div className="prose mt-9">
        <Callout tone="planned" title="Nothing to run yet">
          No packaging tool is configured in the project, and there is no{" "}
          <code>npm run package</code> command. This page will be replaced with
          real steps and real output paths once the pipeline exists.
        </Callout>

        <h2 id="where-the-build-stops">Where the build stops today</h2>
        <p>
          <code>npm run build</code> produces a built application and nothing
          more:
        </p>
        <ul>
          <li>
            <code>dist/</code> — the compiled React renderer
          </li>
          <li>
            <code>dist-electron/</code> — <code>main.js</code> and{" "}
            <code>preload.cjs</code>
          </li>
        </ul>
        <p>
          Electron can run that, but it is not something you can hand to someone
          else. It has no runtime bundled, no icon, no Start menu entry and no
          uninstaller.
        </p>
      </div>

      <CodeBlock filename="Desktop App/package.json">
        {`{
  "main": "dist-electron/main.js",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build"
  }
}`}
      </CodeBlock>

      <div className="prose">
        <p>
          The <code>main</code> field is already what a packager would use as the
          application entry point, so the build output is in the right shape for
          the step that is missing.
        </p>

        <h2 id="the-pipeline">The pipeline to build</h2>
      </div>

      <RailFlow
        steps={[
          {
            label: "npm run build",
            note: "Type check, then bundle the renderer and the Electron entries",
          },
          {
            label: "Package",
            note: "Bundle the build with the Electron runtime into an application folder",
          },
          {
            label: "Installer",
            note: "Produce Harissa Setup.exe, with shortcuts and an uninstaller",
          },
          {
            label: "Sign",
            note: "Authenticode signing, so Windows does not warn on an unknown publisher",
          },
          {
            label: "Checksum and publish",
            note: "SHA-256 alongside the installer on the releases page",
          },
        ]}
        caption="The stages between today's build output and something a person can install."
      />

      <div className="prose">
        <h2 id="decisions">Decisions still open</h2>
        <p>
          None of these have been made, and each changes the instructions on the{" "}
          <Link href="/docs/installation">installation</Link> page:
        </p>
        <ul>
          <li>
            <strong>The packaging tool.</strong> electron-builder and Electron
            Forge are the obvious candidates. Whichever is chosen brings its own
            configuration file and its own output layout.
          </li>
          <li>
            <strong>Installer type.</strong> A conventional setup executable, a
            per-user install with no administrator prompt, or a portable build
            that runs from a folder.
          </li>
          <li>
            <strong>Code signing.</strong> A certificate has a cost and a renewal
            cycle. Without one, Windows SmartScreen warns on first run.
          </li>
          <li>
            <strong>Updates.</strong> Whether V1 checks for new versions at all.
            An updater would be the application&rsquo;s first network
            connection, which is a decision about what Harissa is, not just how
            it ships.
          </li>
          <li>
            <strong>File associations.</strong> Whether the installer offers to
            handle <code>.mp3</code> and <code>.mp4</code>.
          </li>
        </ul>

        <h2 id="acceptance">What done looks like</h2>
        <p>
          Packaging is finished when a clean Windows machine with no Node.js on it
          can:
        </p>
        <ol>
          <li>Run the installer and complete it without a developer toolchain</li>
          <li>Launch Harissa from the Start menu</li>
          <li>Open and play an MP3 and an MP4</li>
          <li>Uninstall cleanly, leaving nothing behind</li>
        </ol>
        <p>
          At that point the download panel on the{" "}
          <Link href="/docs/releases">releases page</Link> gets its version, size,
          link and checksum, and V1 is out.
        </p>
      </div>
    </>
  );
}
