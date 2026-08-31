import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/ui/callout";
import { CodeBlock } from "@/components/ui/code-block";
import { DocHeader } from "@/components/docs/doc-header";

export const metadata: Metadata = {
  title: "Workflow",
  description:
    "What npm install, npm run dev and npm run build do in the Harissa application and in this documentation site.",
};

export default function WorkflowPage() {
  return (
    <>
      <DocHeader
        section="Development"
        title="Workflow"
        summary="Three commands cover day-to-day work on Harissa. This page says what each of them actually does, in both projects."
      />

      <div className="prose mt-9">
        <h2 id="the-application">The desktop application</h2>
        <p>
          All commands below run from the <code>Desktop App</code> folder. The
          folder name contains a space, so quote it.
        </p>
      </div>

      <CodeBlock label="Terminal">
        {`cd "Harissa-Media-Player/Desktop App"`}
      </CodeBlock>

      <div className="prose">
        <h3 id="install">npm install</h3>
        <p>
          Installs dependencies from <code>package-lock.json</code>, including the
          Electron binary itself, into <code>node_modules</code>. Run it once
          after cloning, and again whenever dependencies change. It needs a
          network connection; nothing after it does.
        </p>

        <h3 id="dev">npm run dev</h3>
        <p>
          The development loop. It starts Vite, which does three things at once:
        </p>
        <ul>
          <li>
            Serves the React renderer with hot module replacement, so interface
            edits appear without a restart
          </li>
          <li>
            Builds <code>electron/main.ts</code> and{" "}
            <code>electron/preload.ts</code> into{" "}
            <code>dist-electron/</code>
          </li>
          <li>Launches Electron and opens the Harissa window</li>
        </ul>
        <p>
          The main process is told where the dev server is through{" "}
          <code>VITE_DEV_SERVER_URL</code>, which is how it knows to load the
          server rather than files on disk — see{" "}
          <Link href="/docs/technical/main-process">main process</Link>.
        </p>

        <Callout>
          Renderer changes hot reload. Changes to{" "}
          <code>electron/main.ts</code> or <code>electron/preload.ts</code> mean
          the Electron process restarts, so expect the window to reopen.
        </Callout>

        <h3 id="build">npm run build</h3>
        <p>
          The production build, in two stages:
        </p>
        <ol>
          <li>
            <code>tsc -b</code> type checks every project reference — renderer,
            main process and preload. A type error stops the build here.
          </li>
          <li>
            <code>vite build</code> bundles the renderer into{" "}
            <code>dist/</code> and the Electron entries into{" "}
            <code>dist-electron/</code>.
          </li>
        </ol>
        <p>
          The result is a built application, not an installer. Turning it into
          one is <Link href="/docs/development/packaging">packaging</Link>, which
          is not implemented yet.
        </p>

        <h3 id="lint">npm run lint</h3>
        <p>
          Runs ESLint across the project with the TypeScript and React Hooks
          rules the repository configures. Worth running before opening a pull
          request.
        </p>

        <h2 id="the-website">This documentation site</h2>
        <p>
          The site is a separate Next.js project in <code>Web/</code>, with its
          own dependencies.
        </p>
      </div>

      <CodeBlock label="Terminal">
        {`cd Harissa-Media-Player/Web
npm install
npm run dev`}
      </CodeBlock>

      <div className="prose">
        <p>
          <code>npm run dev</code> serves the site at{" "}
          <code>http://localhost:3000</code> with fast refresh.{" "}
          <code>npm run build</code> produces the production build, and{" "}
          <code>npm run start</code> serves that build locally so you can check
          it before deploying. <code>npm run lint</code> runs ESLint.
        </p>

        <h2 id="editing-content">Editing the documentation</h2>
        <p>
          Content lives in ordinary React pages under <code>Web/app/docs/</code>,
          one folder per route. To add a page, create the folder with a{" "}
          <code>page.tsx</code>, then add one entry to{" "}
          <code>Web/lib/nav.ts</code> — that file drives the sidebar and the
          previous/next links, so the new page is wired in everywhere at once.
        </p>
        <p>
          Feature lists, shortcuts and release details are data, not prose:{" "}
          <code>lib/features.ts</code>, <code>lib/shortcuts.ts</code> and{" "}
          <code>lib/release.ts</code>. Editing them updates every page that shows
          them.
        </p>
      </div>
    </>
  );
}
