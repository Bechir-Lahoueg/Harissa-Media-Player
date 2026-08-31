import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/ui/callout";
import { DocHeader } from "@/components/docs/doc-header";
import { Screenshot } from "@/components/ui/screenshot";

export const metadata: Metadata = {
  title: "Audio playback",
  description:
    "How MP3 files play in Harissa, and what the player shows while they do.",
};

export default function AudioPlaybackPage() {
  return (
    <>
      <DocHeader
        section="User guide"
        title="Audio playback"
        summary="Open an MP3 and Harissa plays it. There is no import, no tagging step and no waiting for a library to catch up."
      />

      <div className="prose mt-9">
        <h2 id="playing-an-audio-file">Playing an audio file</h2>
        <p>
          Choose an MP3 in the{" "}
          <Link href="/docs/guide/opening-media">open dialog</Link>. Harissa
          loads it and the controls come alive. There is no picture with music,
          so the window shows the track and where you are in it.
        </p>
        <p>While a track is loaded you can see:</p>
        <ul>
          <li>The file that is playing</li>
          <li>Elapsed time and total duration</li>
          <li>A progress bar you can drag to seek</li>
          <li>Play, pause, volume and mute controls</li>
        </ul>
      </div>

      <Screenshot
        src="/screenshots/harissa-playing.png"
        alt="A track playing in Harissa, with artwork, the file name, format and duration"
        width={1547}
        height={1013}
        caption="A track playing, with the queue open on the right."
      />

      <div className="prose">
        <h2 id="titles">Track titles</h2>
        <p>
          Harissa identifies a track by its file name. It does not read the title,
          artist or album out of a file&rsquo;s tags, so a file called{" "}
          <code>track_03_final_v2.mp3</code> is displayed as exactly that.
        </p>
        <p>
          Cover art is the exception. Artwork stored inside the file is pulled
          out and shown while the track plays. Files without any just show
          nothing in its place.
        </p>

        <Callout tone="planned" title="The rest of the tags">
          Title, artist and album from file tags are a roadmap item, not a V1
          feature. Until that exists, the file name is the only title Harissa has.
        </Callout>

        <h2 id="duration">Duration and progress</h2>
        <p>
          Duration is read from the file once its metadata has loaded, then
          elapsed time updates continuously as it plays. Times are shown as{" "}
          <code>m:ss</code>, or <code>h:mm:ss</code> once a file runs past an
          hour, in a tabular typeface so the numbers do not shift as they change.
        </p>

        <h2 id="several-files">Playing several files</h2>
        <p>
          Open several files at once and they go into the queue, which you can
          see on the right with <code>Ctrl + J</code>. Playback starts at the
          first and moves down the list. <code>N</code> and <code>P</code> jump
          between tracks, and the queue has a filter box for when the list gets
          long.
        </p>
        <p>
          Shuffle plays the queue in a random order. Repeat cycles through three
          settings: off, repeat the whole queue, and repeat the track you are on.
          Both live in the bar at the bottom.
        </p>
        <p>
          The queue lasts as long as the window does. Close Harissa and it is
          empty again next time.
        </p>

        <h2 id="limits">Current limits</h2>
        <ul>
          <li>
            V1 targets MP3. Other audio containers may open, but they are not in
            scope and are not tested.
          </li>
          <li>Playback stops when the window closes. There is no tray mode.</li>
          <li>
            Position is not saved. Reopening a file starts it from zero.
          </li>
          <li>
            There is no equaliser, no gapless playback and no playback speed
            control in V1.
          </li>
        </ul>
        <p>
          Continue to{" "}
          <Link href="/docs/guide/playback-controls">playback controls</Link> for
          each control in detail.
        </p>
      </div>
    </>
  );
}
