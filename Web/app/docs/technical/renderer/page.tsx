import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/ui/callout";
import { CodeBlock } from "@/components/ui/code-block";
import { DocHeader } from "@/components/docs/doc-header";

export const metadata: Metadata = {
  title: "Renderer",
  description:
    "How React presents the player, where playback state lives, and what the renderer is not allowed to do.",
};

export default function RendererPage() {
  return (
    <>
      <DocHeader
        section="Technical"
        title="Renderer"
        summary="The renderer is the window: React, TypeScript and Tailwind CSS, running with no more privilege than a web page."
      />

      <div className="prose mt-9">
        <h2 id="responsibilities">Responsibilities</h2>
        <p>
          Everything you see is the renderer&rsquo;s work, and nothing beyond it
          is:
        </p>
        <ul>
          <li>Laying out the window and the player</li>
          <li>Owning the media element and its playback state</li>
          <li>Turning clicks and key presses into playback commands</li>
          <li>Showing progress, duration, volume and errors</li>
          <li>
            Asking <code>window.harissa</code> when it needs something
            privileged
          </li>
        </ul>
        <p>
          It does not read files, show dialogs, or import Node modules. It cannot:
          the only thing it can reach across the boundary is the object the{" "}
          <Link href="/docs/technical/preload-and-ipc">preload</Link> published.
        </p>

        <h2 id="where-state-lives">Where playback state lives</h2>
        <p>
          The browser&rsquo;s media element is the source of truth. React does not
          keep a parallel idea of whether audio is playing — it subscribes to the
          element&rsquo;s events and mirrors what it reports.
        </p>
        <p>
          That is deliberate. A media element can pause for reasons the interface
          never initiated: the file ends, decoding fails, or the operating system
          interrupts. State derived from events stays correct in all of those
          cases; state set optimistically when a button is clicked does not.
        </p>
      </div>

      <CodeBlock filename="Desktop App/src/hooks/useMediaPlayer.ts">
        {`const onPlay = () => setIsPlaying(true);
const onPause = () => setIsPlaying(false);
const onTimeUpdate = () => setCurrentTime(media.currentTime);
const onDurationChange = () => setDuration(media.duration || 0);

media.addEventListener("play", onPlay);
media.addEventListener("pause", onPause);
media.addEventListener("timeupdate", onTimeUpdate);
media.addEventListener("durationchange", onDurationChange);`}
      </CodeBlock>

      <div className="prose">
        <p>
          The player logic lives in a hook rather than in components, so the
          controls stay presentational and the behaviour — seeking, volume steps,
          mute with recall — has one home.
        </p>

        <Callout>
          The hook returns commands and read-only state. A component that wants
          to seek calls <code>seekTo</code>; it never writes to the media element
          itself.
        </Callout>

        <h2 id="audio-or-video">Audio or video</h2>
        <p>
          The renderer picks its element from the file it was given: an{" "}
          <code>audio</code> element for a track, a <code>video</code> element for
          a film. Both are media elements with the same API, so the same hook and
          the same transport controls drive either one.
        </p>
        <p>
          The source is the <code>media://</code> URL built from the path, never a
          raw filesystem path:
        </p>
      </div>

      <CodeBlock filename="Desktop App/src/App.tsx">
        {`const mediaUrl = mediaPath
  ? \`media://local/\${encodeURIComponent(mediaPath)}\`
  : null;`}
      </CodeBlock>

      <div className="prose">
        <p>
          Encoding the path matters: Windows paths contain backslashes, spaces
          and, often enough, characters that would otherwise change what the URL
          means.
        </p>

        <h2 id="errors">Showing failures</h2>
        <p>
          When a file cannot be decoded the media element raises an error, and the
          renderer shows it rather than sitting on a silent, stopped player. This
          is the usual outcome for an MP4 whose codec Chromium does not support —
          see <Link href="/docs/guide/video-playback">video playback</Link>.
        </p>

        <h2 id="styling">Styling</h2>
        <p>
          Tailwind CSS, with the palette defined once as design tokens: a warm
          red-shifted charcoal ground, a chili red used sparingly, and a
          monospaced tabular face for timecodes so numbers do not shift width as
          they count. This documentation site is built from the same tokens.
        </p>
      </div>
    </>
  );
}
