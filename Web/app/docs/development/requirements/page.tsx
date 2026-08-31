import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/ui/callout";
import { CodeBlock } from "@/components/ui/code-block";
import { DocHeader } from "@/components/docs/doc-header";

export const metadata: Metadata = {
  title: "Requirements",
  description:
    "The tooling you need before cloning and running the Harissa source.",
};

export default function RequirementsPage() {
  return (
    <>
      <DocHeader
        section="Development"
        title="Requirements"
        summary="What to install before cloning the repository. There is no database to provision and no service to configure — it is Node.js and Git."
      />

      <div className="prose mt-9">
        <h2 id="tooling">Tooling</h2>
        <ul>
          <li>
            <strong>Node.js 20.19 or newer</strong> — the 22 LTS line is a safe
            choice. Vite 8 and the Electron toolchain need a current runtime.
          </li>
          <li>
            <strong>npm 10 or newer</strong> — ships with Node. The repository
            has a <code>package-lock.json</code>, so npm is the supported
            package manager.
          </li>
          <li>
            <strong>Git</strong> — to clone the repository.
          </li>
        </ul>
        <p>Check what you have:</p>
      </div>

      <CodeBlock label="Terminal">
        {`node --version
npm --version
git --version`}
      </CodeBlock>

      <div className="prose">
        <h2 id="operating-system">Operating system</h2>
        <p>
          Harissa is a Windows application, so build and test it on Windows 10 or
          11. The renderer will run anywhere Node does, but a build produced on
          another platform is not something V1 supports or tests.
        </p>

        <h2 id="disk">Disk and network</h2>
        <p>
          Expect roughly 1 GB for dependencies once installed — Electron accounts
          for most of it. The first <code>npm install</code> downloads the
          Electron binary, so it needs a connection and takes a few minutes.
          After that, development works offline.
        </p>

        <Callout>
          The application itself never needs a network connection. This
          requirement is about installing dependencies, not about running
          Harissa.
        </Callout>

        <h2 id="editor">Editor</h2>
        <p>
          Any editor with TypeScript support. If you use VS Code, the built-in
          TypeScript and an ESLint extension cover the project as it is
          configured; nothing else is required.
        </p>

        <h2 id="two-projects">Two projects, two installs</h2>
        <p>The repository holds two independent npm projects:</p>
        <ul>
          <li>
            <code>Desktop App/</code> — the Electron media player
          </li>
          <li>
            <code>Web/</code> — this documentation site, built with Next.js
          </li>
        </ul>
        <p>
          They do not share a lockfile or a{" "}
          <code>node_modules</code>. Install dependencies in whichever one you
          are working on. Both are covered in the{" "}
          <Link href="/docs/development/workflow">workflow</Link>.
        </p>
      </div>
    </>
  );
}
