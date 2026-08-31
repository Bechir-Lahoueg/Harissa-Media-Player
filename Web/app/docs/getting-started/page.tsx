import type { Metadata } from "next";
import Link from "next/link";
import { DocHeader } from "@/components/docs/doc-header";
import { Callout } from "@/components/ui/callout";
import { Screenshot } from "@/components/ui/screenshot";
import { ShortcutTable } from "@/components/ui/shortcut-table";

export const metadata: Metadata = {
  title: "Getting started",
  description: "Open your first file in Harissa and get sound out of it.",
};

export default function GettingStartedPage() {
  return (
    <>
      <DocHeader
        section="Start here"
        title="Getting started"
        summary="Harissa opens empty. There is no setup step and nothing to import, so getting a track playing takes about ten seconds."
      />

      <div className="prose mt-9">
        <h2 id="open-harissa">1. Open Harissa</h2>
        <p>
          Until the installer is ready this means running it from the source
          code, which the{" "}
          <Link href="/docs/installation">installation page</Link> walks through.
          The window opens at a comfortable size and you can resize it however
          you like.
        </p>
        <p>
          What you see first is an empty player. Nothing is loaded yet, so the
          only thing to do is open something.
        </p>
      </div>

      <Screenshot
        src="/screenshots/harissa-main.png"
        alt="Harissa with nothing playing, showing the Open files button and the shortcut list"
        width={1545}
        height={1017}
        caption="The empty state. The shortcuts are listed right there so you do not have to go looking for them."
      />

      <div className="prose">
        <h2 id="open-a-file">2. Open a file</h2>
        <p>There are two ways in, and neither is better than the other:</p>
        <ul>
          <li>
            Click <strong>Open files</strong>, or press <code>Ctrl + O</code>,
            and pick something in the Windows file picker. Hold <code>Ctrl</code>{" "}
            or <code>Shift</code> to grab several files at once.
          </li>
          <li>
            Drag files out of a folder and drop them anywhere on the Harissa
            window.
          </li>
        </ul>
        <p>
          Either way your files stay where they are. Harissa reads them from
          their folder and does not copy them anywhere.
        </p>

        <h2 id="play">3. Play</h2>
        <p>
          Playback starts and the controls come alive. Music plays with the
          progress bar, and the cover art shows if the file has any. Video plays
          in the middle of the window, and <code>F</code> sends it fullscreen.
        </p>
        <p>
          If you opened several files, Harissa moves to the next one when the
          current one finishes.
        </p>

        <Callout>
          Harissa does not remember where you stopped. Open a file again and it
          starts from the beginning.
        </Callout>

        <h2 id="learn-four-keys">4. Learn four keys</h2>
        <p>
          You can drive the whole player from the keyboard. These are the ones
          worth knowing straight away.
        </p>
      </div>

      <ShortcutTable scope="Playback" />

      <div className="prose">
        <p>
          The <Link href="/docs/shortcuts">shortcuts page</Link> has the rest,
          including the window ones.
        </p>

        <h2 id="next">Next</h2>
        <ul>
          <li>
            <Link href="/docs/guide/opening-media">Opening media</Link>, for
            which formats work and which ones only sometimes do
          </li>
          <li>
            <Link href="/docs/guide/playback-controls">Playback controls</Link>,
            for every control in detail
          </li>
        </ul>
      </div>
    </>
  );
}
