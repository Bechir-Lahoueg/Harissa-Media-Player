import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/ui/callout";
import { DocHeader } from "@/components/docs/doc-header";
import { ShortcutTable } from "@/components/ui/shortcut-table";

export const metadata: Metadata = {
  title: "Playback controls",
  description:
    "Play, pause, seeking, volume, mute and fullscreen: every Harissa control in one place.",
};

export default function PlaybackControlsPage() {
  return (
    <>
      <DocHeader
        section="User guide"
        title="Playback controls"
        summary="One page for every control in the player. Each one works the same way for audio and for video, except fullscreen, which needs a picture."
      />

      <div className="prose mt-9">
        <h2 id="play-and-pause">Play and pause</h2>
        <p>
          One control switches between playing and paused. Press{" "}
          <code>Space</code>, or click the play button. It always shows what the
          player is really doing, because it follows the file itself instead of
          guessing.
        </p>
        <p>
          Pausing holds the position. Playing again resumes from the same point,
          for as long as the file stays open.
        </p>

        <h2 id="seeking">Seeking</h2>
        <p>There are three ways to move through a file:</p>
        <ul>
          <li>
            <strong>Drag the progress bar</strong> to jump anywhere. The elapsed
            time follows as you drag.
          </li>
          <li>
            <strong>Press <code>←</code> or <code>→</code></strong> to move back
            or forward ten seconds.
          </li>
          <li>
            <strong>Hold <code>←</code> or <code>→</code></strong> to scan
            continuously, a second at a time, until you let go.
          </li>
        </ul>
        <p>
          Seeking is clamped to the file: you cannot seek before the start or
          past the end. Seeking is only possible once the duration is known,
          which is why the progress bar is inert for the first moment after a
          file opens.
        </p>

        <Callout>
          Chapter markers, A&ndash;B looping and frame-accurate stepping are not
          part of V1.
        </Callout>

        <h2 id="queue-controls">Moving between tracks</h2>
        <p>
          When you have more than one file open, the transport bar gets the rest
          of its buttons. Skip forward and back through the queue with the arrow
          buttons, or press <code>N</code> and <code>P</code>.
        </p>
        <p>
          <strong>Shuffle</strong> plays the queue in a random order.{" "}
          <strong>Repeat</strong> has three settings and cycles between them:
          off, repeat the whole queue, and repeat just the track you are on.
        </p>
        <p>
          The queue itself sits on the right, and <code>Ctrl + J</code> shows and
          hides it. It has a filter box, and you can drop tracks from it or clear
          it out entirely.
        </p>

        <h2 id="volume-and-mute">Volume and mute</h2>
        <p>
          Volume is a slider from silent to full. <code>↑</code> and{" "}
          <code>↓</code> move it in five percent steps, so you can settle on a
          level instead of hopping between a handful of them.
        </p>
        <p>
          <code>M</code> mutes and unmutes. Muting remembers where the volume
          was and puts it back when you unmute, so you never get blasted at full
          volume.
        </p>
        <p>
          The volume applies to Harissa only. It is the application&rsquo;s own
          level, independent of the Windows system volume and of the per-app
          level in the Windows volume mixer.
        </p>

        <h2 id="fullscreen">Fullscreen</h2>
        <p>
          <code>F</code> sends video fullscreen and <code>Esc</code> returns to
          the window. Fullscreen applies to video files; audio files have no
          picture to enlarge.
        </p>
        <p>
          See <Link href="/docs/guide/video-playback">video playback</Link> for
          how the picture is scaled.
        </p>

        <h2 id="progress">Progress and time</h2>
        <p>
          Elapsed and total time sit either side of the progress bar. Both use a
          tabular monospaced typeface, so the digits keep their width and the
          layout does not twitch as the seconds tick over. Times read{" "}
          <code>m:ss</code>, moving to <code>h:mm:ss</code> for files over an
          hour.
        </p>

        <h2 id="key-map">Key map</h2>
        <p>
          The full list, including window shortcuts, is on the{" "}
          <Link href="/docs/shortcuts">keyboard shortcuts</Link> page.
        </p>
      </div>

      <ShortcutTable />
    </>
  );
}
