import type { Metadata } from "next";
import Link from "next/link";
import { DocHeader } from "@/components/docs/doc-header";
import { Callout } from "@/components/ui/callout";
import { CodeBlock } from "@/components/ui/code-block";
import { DownloadCard } from "@/components/ui/download-card";
import { platform, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Installation",
  description:
    "Download Harissa when the installer is ready, or run it from the source code today.",
};

export default function InstallationPage() {
  return (
    <>
      <DocHeader
        section="Start here"
        title="Installation"
        summary="Two ways to get Harissa. The installer is the one most people will want, and it is not ready yet. Running from source works today if you have Node.js."
      />

      <div className="mt-9">
        <DownloadCard />
      </div>

      <div className="prose mt-12">
        <h2 id="installing">Installing, once the setup file exists</h2>
        <p>
          It will be the ordinary Windows routine, with nothing unusual about it:
        </p>
        <ol>
          <li>Download the setup file from the panel above.</li>
          <li>Run it, and say yes to the Windows security prompt.</li>
          <li>Pick where to install it, or accept the suggested folder.</li>
          <li>Open Harissa from the Start menu.</li>
        </ol>

        <Callout tone="planned" title="Still to be confirmed">
          The exact file name, where it installs by default, whether it asks for
          administrator rights, and how you uninstall it all depend on how the
          installer ends up being built. Those details go in once there is a real
          installer to check them against.
        </Callout>

        <h2 id="requirements">What you need</h2>
        <ul>
          <li>
            <strong>Windows</strong> {platform.os}, {platform.arch}
          </li>
          <li>
            <strong>Disk space</strong> to be measured from the first real build
          </li>
          <li>
            <strong>Internet</strong> only to download it. Harissa never needs a
            connection to run.
          </li>
        </ul>
        <p>
          There is no macOS or Linux version, and none is planned for the first
          release.
        </p>

        <h2 id="file-types">Opening files straight from Explorer</h2>
        <p>
          Whether Harissa offers to become your default player for MP3 and MP4,
          and whether it turns up under &ldquo;Open with&rdquo;, is decided by
          the installer. Since that does not exist yet, neither does the answer.
          This section gets filled in when it can actually be tested.
        </p>

        <hr />

        <h2 id="from-source">Running it from source</h2>
        <p>
          This is how to use Harissa today. You need{" "}
          <a href="https://nodejs.org">Node.js</a> 20.19 or newer and Git
          installed. The{" "}
          <Link href="/docs/development/requirements">requirements page</Link>{" "}
          has the details.
        </p>
      </div>

      <CodeBlock label="Terminal">
        {`git clone ${site.repository}.git
cd "Harissa-Media-Player/Desktop App"
npm install
npm run dev`}
      </CodeBlock>

      <div className="prose">
        <p>
          The player lives in the <code>Desktop App</code> folder. Quote it in
          the <code>cd</code> command, because the folder name has a space in it.
        </p>
        <p>
          The first <code>npm install</code> takes a few minutes, mostly
          downloading Electron. After <code>npm run dev</code> the Harissa window
          opens by itself. Keep the terminal open while you use it, since closing
          it shuts the app down.
        </p>

        <Callout>
          This is a development build. It starts more slowly than a packaged app
          will and comes with developer tools switched on.
        </Callout>

        <p>
          If it is this website you want to work on instead of the player, that
          project is in <code>Web/</code> and is covered under{" "}
          <Link href="/docs/development/workflow">workflow</Link>.
        </p>
      </div>
    </>
  );
}
