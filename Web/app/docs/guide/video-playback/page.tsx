import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/ui/callout";
import { DocHeader } from "@/components/docs/doc-header";
import { Screenshot } from "@/components/ui/screenshot";

export const metadata: Metadata = {
  title: "Video playback",
  description:
    "MP4 playback in Harissa: the video surface, resizing, fullscreen and codec limits.",
};

export default function VideoPlaybackPage() {
  return (
    <>
      <DocHeader
        section="User guide"
        title="Video playback"
        summary="Open an MP4 and it plays on a video surface in the middle of the window, with the same transport controls audio uses."
      />

      <div className="prose mt-9">
        <h2 id="the-video-surface">The video surface</h2>
        <p>
          Harissa decides between audio and video from the file you opened. A
          video file gets a picture that scales with the window and keeps its
          original shape, so a widescreen film in a tall window gets black bars
          instead of being stretched out of proportion.
        </p>
        <p>
          Resizing the window resizes the picture with it, down to the
          window&rsquo;s 900 by 560 minimum.
        </p>
      </div>

      <Screenshot
        src="/screenshots/harissa-playing.png"
        alt="An MP4 open in Harissa, with the picture in the middle of the window"
        width={1547}
        height={1013}
        caption="An MP4 playing. The picture sits in the middle, with the queue alongside it."
      />

      <div className="prose">
        <h2 id="controls">Controls during playback</h2>
        <p>
          Video uses the same controls as audio: play and pause, the progress
          bar, ten-second jumps, volume and mute. They are documented together on{" "}
          <Link href="/docs/guide/playback-controls">playback controls</Link>.
        </p>

        <h2 id="fullscreen">Fullscreen</h2>
        <p>
          Video can fill the display, with <code>F</code> to enter and{" "}
          <code>Esc</code> to leave. Audio files have no picture, so fullscreen
          does not apply to them.
        </p>
        <p>
          Fullscreen keeps Harissa&rsquo;s own controls rather than handing you
          the ones the browser engine would draw. The title sits at the top, the
          transport and progress bar along the bottom, and both fade away, along
          with the mouse pointer, after about two seconds without movement. Move
          the mouse or press a key and they come straight back. While a video is
          paused the controls stay put, so the state is never a mystery.
        </p>

        <h2 id="codecs">Which MP4 files play</h2>
        <p>
          In practice, MP4 files with H.264 video and AAC audio play. That is
          what phone recordings, video exports and most downloads give you, so
          the common case is covered.
        </p>
        <p>
          An MP4 is really just a wrapper, so a file ending in .mp4 can still
          hold video the player cannot read. When that happens Harissa tells you
          the file failed to load instead of sitting there on a black screen.
        </p>

        <Callout>
          MKV, MOV, AVI and WebM can be opened from the dialog, but they are not
          V1 guarantees: they play only when the codecs inside them are ones
          Chromium ships. Guaranteeing them needs a different decoding path,
          which is a roadmap item.
        </Callout>

        <h2 id="limits">Current limits</h2>
        <ul>
          <li>No subtitle support, neither external files nor embedded tracks</li>
          <li>No audio or video track selection for multi-track files</li>
          <li>No playback speed control, and no frame stepping</li>
          <li>No picture-in-picture and no always-on-top mode</li>
          <li>No screenshot or frame capture</li>
        </ul>
      </div>
    </>
  );
}
