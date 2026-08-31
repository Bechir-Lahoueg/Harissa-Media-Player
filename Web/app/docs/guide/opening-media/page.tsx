import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/ui/callout";
import { DocHeader } from "@/components/docs/doc-header";
import { RailFlow } from "@/components/ui/rail-flow";

export const metadata: Metadata = {
  title: "Opening media",
  description:
    "How Harissa opens local files: the Windows dialog, multiple selection, and the formats V1 accepts.",
};

export default function OpeningMediaPage() {
  return (
    <>
      <DocHeader
        section="User guide"
        title="Opening media"
        summary="Every file Harissa plays arrives the same way: you choose it in the Windows open dialog, and the application reads it from where it sits."
      />

      <div className="prose mt-9">
        <h2 id="the-dialog">The open dialog</h2>
        <p>
          Click <strong>Open files</strong>, or press <code>Ctrl + O</code>. What
          comes up is the ordinary Windows file picker, the same one every other
          program uses, so everything behaves the way you already expect. Quick
          access, recent folders, network drives, typing a path in by hand and
          search all work.
        </p>
        <p>
          Closing the dialog without choosing anything leaves the current
          playback untouched. Nothing is loaded and nothing is cleared.
        </p>

        <h2 id="multiple-files">Selecting more than one file</h2>
        <p>
          The dialog allows multiple selection. Hold <code>Ctrl</code> to pick
          individual files or <code>Shift</code> to pick a range, and Harissa
          loads the selection in the order Windows returns it, starting playback
          at the first.
        </p>
        <p>
          This is a selection, not a saved playlist. It exists for as long as the
          window is open, and opening a new selection replaces it. Persistent
          playlists are on the <Link href="/docs/roadmap">roadmap</Link>.
        </p>

        <h2 id="formats">Formats V1 accepts</h2>
        <p>
          Two formats are promised: <strong>MP3</strong> for music and{" "}
          <strong>MP4</strong> for video. Those are the ones Harissa plays
          dependably, because the media engine it is built on handles MP3, and
          MP4 files that use H.264 video with AAC audio. That covers almost
          everything you are likely to have.
        </p>
        <p>
          The dialog itself offers more than that. Its filters let you narrow to
          audio, to video, or to everything it recognises:
        </p>
        <ul>
          <li>
            <strong>Audio</strong> — MP3, M4A, AAC, WAV, FLAC, OGG, OGA, Opus,
            WebA
          </li>
          <li>
            <strong>Video</strong> — MP4, M4V, MKV, WebM, MOV, AVI, OGV
          </li>
        </ul>
        <p>
          Being listed is not a guarantee. Those files open, and they play if the
          media engine can decode them; MKV and AVI in particular often carry
          codecs it does not ship. When decoding fails, Harissa says so rather
          than sitting on a silent player.
        </p>

        <Callout>
          Promising all of those formats, not just offering them, would mean
          building in a decoder the app does not currently carry. That is on the{" "}
          <Link href="/docs/roadmap">roadmap</Link> as a maybe.
        </Callout>

        <h2 id="what-happens-next">What happens when you choose a file</h2>
        <p>
          The renderer never touches the filesystem itself. The path travels back
          across the bridge and the file is streamed into the media element
          through a private <code>media://</code> protocol registered by the main
          process:
        </p>
      </div>

      <RailFlow
        steps={[
          {
            label: "You select Open files",
            note: "In the window, or with Ctrl + O",
          },
          {
            label: "window.harissa.openFile()",
            note: "The only file API the renderer can see",
            file: "electron/preload.ts",
          },
          {
            label: "dialog:openFile",
            note: "The IPC channel that carries the request",
          },
          {
            label: "Windows open dialog",
            note: "Shown by the Electron main process",
            file: "electron/main.ts",
          },
          {
            label: "File paths returned",
            note: "An array of paths, or null if you cancelled",
          },
          {
            label: "media://local/<path>",
            note: "The file is streamed into the audio or video element",
          },
        ]}
        caption="The open-file round trip. The renderer asks; the main process is the only side that acts."
      />

      <div className="prose">
        <p>
          That whole round trip is written out in code on the{" "}
          <Link href="/docs/technical/preload-and-ipc">preload and IPC</Link>{" "}
          page, if you want the detail.
        </p>

        <h2 id="files-are-not-copied">Files are not copied or indexed</h2>
        <p>
          Harissa reads your media where it sits. Files are not imported into an
          app folder, not cached, and not written into any database, because there
          is no database. Close the window and nothing is kept about what you
          played.
        </p>

        <h2 id="drag-and-drop">Dropping files onto the window</h2>
        <p>
          You can also drag files from Explorer and drop them anywhere on the
          window. It loads the same way a dialog selection does, and multiple
          files dropped together become the current selection.
        </p>
        <p>
          Dropped files take a slightly different route inside the app than
          picked ones do. If you are curious how, that is covered under{" "}
          <Link href="/docs/technical/preload-and-ipc">preload and IPC</Link>.
        </p>
      </div>
    </>
  );
}
