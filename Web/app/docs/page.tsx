import type { Metadata } from "next";
import Link from "next/link";
import { DocHeader } from "@/components/docs/doc-header";
import { Callout } from "@/components/ui/callout";
import { docsNav } from "@/lib/nav";
import { platform, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Introduction",
  description:
    "What Harissa is, what it does not do, and where the first version stops.",
};

export default function IntroductionPage() {
  return (
    <>
      <DocHeader
        section="Start here"
        title="Introduction"
        summary="Harissa is a media player for Windows. You open a file that is already on your computer and it plays. That is the whole idea."
      />

      <div className="prose mt-9">
        <Callout tone="planned" title="No installer yet">
          Harissa has not had its first release, so there is nothing to download
          at the moment. If you have Node.js installed you can{" "}
          <Link href="/docs/installation">run it from the source code</Link>{" "}
          today.
        </Callout>

        <h2 id="what-it-is">What it is</h2>
        <p>
          A desktop application for {platform.os}. It plays the music and video
          you already have on your disk, and it does that without asking you to
          make an account, connect anything, or wait while it catalogues your
          drives.
        </p>
        <p>
          There is no online service behind Harissa. Nothing to sign in to,
          nothing that stops working when you go offline, and nowhere for your
          files to go.
        </p>

        <h2 id="what-you-can-do">What you can do with it</h2>
        <ul>
          <li>Open files from the Windows file picker, or drop them on the window</li>
          <li>Play MP3s and MP4s, plus a good number of other formats</li>
          <li>Pause, skip through a track, change the volume, mute</li>
          <li>Line up several files in a queue, with shuffle and repeat</li>
          <li>Watch video fullscreen</li>
          <li>See the cover art that is stored inside a file</li>
        </ul>
        <p>
          The <Link href="/docs/features">features page</Link> goes through all of
          it and marks which parts are finished, since the first version is still
          being put together.
        </p>

        <h2 id="what-it-does-not-do">What it does not do</h2>
        <p>
          Harissa is a player, not a music service. It has no library that scans
          your folders, no playlists you can save, no subtitles, no streaming, no
          accounts and no cloud storage. None of that is hiding behind a setting.
          It simply is not there.
        </p>
        <p>
          A few of those may come later. They are listed on the{" "}
          <Link href="/docs/roadmap">roadmap</Link> as ideas, which is not the
          same as work that has started.
        </p>

        <h2 id="why-so-small">Why keep it this small</h2>
        <p>
          Most media players grew into something else along the way: a store, a
          library, an account. Harissa stays at the one job so it opens fast,
          behaves the same every time, and does not need looking after.
        </p>

        <h2 id="where-to-go">Where to go from here</h2>
        <p>
          If you just want to use it, the first three sections below are enough.
          The rest is there for people who want to know how it works or want to
          build it themselves.
        </p>
      </div>

      <div className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {docsNav.map((section) => (
          <div key={section.title}>
            <p className="eyebrow">{section.title}</p>
            <ul className="mt-2.5 space-y-2.5">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[14px] text-cream underline decoration-line underline-offset-4 transition hover:decoration-chili"
                  >
                    {item.title}
                  </Link>
                  {item.summary && (
                    <p className="mt-0.5 text-[13px] leading-relaxed text-ash-dim">
                      {item.summary}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="prose mt-10">
        <h2 id="source-code">The code</h2>
        <p>
          Harissa is open source. The player and this website are in the same
          repository, under <code>Desktop App/</code> and <code>Web/</code>.
        </p>
        <p>
          <a href={site.repository}>github.com/Bechir-Lahoueg/Harissa-Media-Player</a>
        </p>
      </div>
    </>
  );
}
