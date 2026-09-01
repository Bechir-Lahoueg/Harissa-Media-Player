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
    "How to install Harissa on Windows 10 and 11, what to expect from the SmartScreen warning, and how to run it from source.",
};

export default function InstallationPage() {
  return (
    <>
      <DocHeader
        section="Start here"
        title="Installation"
        summary="Two ways to get Harissa. The installer is the one most people will want. Running from source works too, if you have Node.js."
      />

      <div className="mt-9">
        <DownloadCard />
      </div>

      <div className="prose mt-12">
        <h2 id="installing">Installing</h2>
        <p>The ordinary Windows routine, with one detour explained below:</p>
        <ol>
          <li>Download the setup file from the panel above.</li>
          <li>
            Run it. Windows will warn you about an unrecognised app — see{" "}
            <a href="#smartscreen">the next section</a> for how to get past it.
          </li>
          <li>Pick where to install it, or accept the suggested folder.</li>
          <li>Open Harissa from the Start menu.</li>
        </ol>
        <p>
          It installs for your user account only, so it never asks for
          administrator rights. To remove it, use{" "}
          <strong>Settings → Apps → Installed apps</strong> and choose
          Harissa Media Player, the same as any other program.
        </p>

        <h2 id="smartscreen">The Windows warning</h2>
        <p>
          The installer is not code-signed, so the first time you run it Windows
          shows a blue <strong>&ldquo;Windows protected your PC&rdquo;</strong>{" "}
          panel. Click <strong>More info</strong>, then{" "}
          <strong>Run anyway</strong>.
        </p>
        <p>
          This is not a sign that anything is wrong with the file. A signing
          certificate costs money every year, and Harissa does not have one yet.
          If you would rather verify the download yourself, check its SHA-256
          against the checksum published with the release.
        </p>

        <Callout tone="planned" title="Smart App Control">
          On a clean Windows 11 install, Smart App Control may block the
          installer outright, with no &ldquo;Run anyway&rdquo; option. It only
          permits signed or well-known apps, and it cannot be told to make an
          exception for one file. Until Harissa is signed, the ways around it
          are to run it from source, or to install on a machine where Smart App
          Control is off.
        </Callout>

        <h2 id="requirements">What you need</h2>
        <ul>
          <li>
            <strong>Windows</strong> {platform.os}, {platform.arch}
          </li>
          <li>
            <strong>Disk space</strong> around 400 MB once installed
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
          Installing Harissa adds it to the <strong>Open with</strong> list for
          the audio and video types it supports. It deliberately does not make
          itself your default player: whatever opened your videos before still
          does, until you decide otherwise.
        </p>
        <p>
          To play something with it once, right-click the file and choose{" "}
          <strong>Open with → Harissa Media Player</strong>. To make it the
          default, tick <strong>Always use this app</strong> in that dialog, or
          set it under <strong>Settings → Apps → Default apps</strong>. Windows
          reserves that choice for you, and no installer can make it on your
          behalf.
        </p>
        <p>
          Opening a file this way starts playback straight away and puts the
          player in front, rather than adding it behind whatever was already
          queued. If Harissa is already running, the file opens in that window
          instead of starting a second copy.
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
