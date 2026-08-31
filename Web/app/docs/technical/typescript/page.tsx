import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/ui/callout";
import { CodeBlock } from "@/components/ui/code-block";
import { DocHeader } from "@/components/docs/doc-header";

export const metadata: Metadata = {
  title: "TypeScript",
  description:
    "How the Electron API is typed across the process boundary, and how the project is configured.",
};

export default function TypeScriptPage() {
  return (
    <>
      <DocHeader
        section="Technical"
        title="TypeScript"
        summary="The bridge between the renderer and Electron is a runtime injection. TypeScript is what turns it into something the compiler can check."
      />

      <div className="prose mt-9">
        <h2 id="the-problem">The problem it solves</h2>
        <p>
          The preload script adds <code>harissa</code> to the window at runtime.
          Nothing in the renderer&rsquo;s source imports it, so without a
          declaration TypeScript would see <code>window.harissa</code> as an
          error, and a mistyped channel or a wrong return type would only show up
          when someone clicked the button.
        </p>

        <h2 id="the-declaration">Declaring the API</h2>
        <p>
          One ambient declaration describes what the preload publishes. It is the
          contract between the two sides:
        </p>
      </div>

      <CodeBlock filename="Desktop App/src/types/electron.d.ts">
        {`export {};

declare global {
  interface Window {
    harissa: {
      openFile: () => Promise<string[] | null>;
      getPathForFile: (file: File) => string | null;
      getArtwork: (filePath: string) => Promise<string | null>;
    };
  }
}`}
      </CodeBlock>

      <div className="prose">
        <p>Two details are doing real work here:</p>
        <ul>
          <li>
            <code>export {}</code> makes the file a module, which is what allows{" "}
            <code>declare global</code> to augment the global{" "}
            <code>Window</code> rather than replace it.
          </li>
          <li>
            <code>null</code> is in every return type, because every one of these
            can fail to produce an answer: a cancelled dialog, a file whose path
            cannot be resolved, a file with no artwork. Calling code cannot reach
            for <code>filePaths.length</code> without dealing with that first.
          </li>
        </ul>

        <Callout>
          The declaration is a promise the preload has to keep. TypeScript checks
          that callers match it; it cannot check that{" "}
          <code>electron/preload.ts</code> still exposes what it says. Changing
          one means changing both — step three of{" "}
          <Link href="/docs/technical/preload-and-ipc#adding-a-channel">
            adding a channel
          </Link>
          .
        </Callout>

        <h2 id="config">Project configuration</h2>
        <p>
          The application splits its TypeScript configuration in two, because its
          code runs in two different places:
        </p>
        <ul>
          <li>
            <code>tsconfig.app.json</code> — the renderer, targeting the browser
            environment with DOM types
          </li>
          <li>
            <code>tsconfig.node.json</code> — the Electron main process, the
            preload and the Vite config, targeting Node.js
          </li>
        </ul>
        <p>
          Both are strict. The split keeps Node APIs from appearing available in
          renderer code, which is the same boundary the{" "}
          <Link href="/docs/technical/architecture">architecture</Link> enforces
          at runtime — expressed where it can be caught at compile time.
        </p>

        <h2 id="build">Type checking in the build</h2>
        <p>
          <code>npm run build</code> runs <code>tsc -b</code> before Vite. Type
          errors fail the build rather than shipping, so a broken bridge cannot
          be packaged into an installer.
        </p>
        <p>
          Details of each command are on the{" "}
          <Link href="/docs/development/workflow">workflow</Link> page.
        </p>
      </div>
    </>
  );
}
