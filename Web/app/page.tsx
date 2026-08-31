import Link from "next/link";
import { Logo, NameLockup } from "@/components/layout/wordmark";
import { DownloadCard } from "@/components/ui/download-card";
import { PathTrace } from "@/components/ui/path-trace";
import { Screenshot } from "@/components/ui/screenshot";
import { ShortcutTable } from "@/components/ui/shortcut-table";
import { TypedTagline } from "@/components/ui/typed-tagline";
import { platform, site } from "@/lib/site";

/* Plain-language feature list for the home page. The docs have the version with
   build statuses; someone deciding whether to try a media player does not need
   that yet. */
const WHAT_IT_DOES = [
  {
    title: "Music and video",
    body: "MP3s and MP4s play out of the box. WAV, FLAC, OGG, M4A, MKV, WebM and MOV open too.",
  },
  {
    title: "Open however you like",
    body: "Use the normal Windows file picker, or drag files straight onto the window.",
  },
  {
    title: "The controls you expect",
    body: "Play, pause, skip through with the progress bar, volume, mute, fullscreen.",
  },
  {
    title: "A queue",
    body: "Open a few files and they line up. Filter the list, shuffle it, or put one track on repeat.",
  },
  {
    title: "Cover art",
    body: "If the artwork is inside the file, you see it while the track plays.",
  },
  {
    title: "Starts empty, stays quick",
    body: "No library to build first and no waiting around for a scan to finish.",
  },
  {
    title: "Works offline",
    body: "There is no account and no server behind it, so it plays with the wifi off.",
  },
];

export default function Home() {
  return (
    <main id="content">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Heat coming off the mark. Sits behind everything and catches nothing. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 -top-44 h-[620px] w-[620px]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(224,27,39,0.15), rgba(255,106,24,0.05) 55%, transparent)",
          }}
        />

        <div className="relative mx-auto max-w-[1180px] px-5 pb-16 pt-12 sm:px-8 sm:pt-16">
          {/* The mark, then the name and the transport readout stacked beside it. */}
          <div className="flex items-center gap-4 sm:gap-7">
            <Logo size={80} priority className="shrink-0 sm:hidden" />
            <Logo size={128} priority className="hidden shrink-0 sm:block" />

            <div className="min-w-0">
              <h1>
                <NameLockup size="lg" />
              </h1>
              <TypedTagline
                text="The spicy way to play."
                className="mt-4 font-mono text-[14px] text-cream sm:mt-5 sm:text-[21px]"
              />
            </div>
          </div>

          <p className="mt-8 max-w-[54ch] text-[17px] leading-relaxed text-ash">
            A small, free media player for Windows. Open your music or a video
            and it plays. Nothing to sign up for, no library to set up, and your
            files never leave your computer.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#download"
              className="rounded-[10px] bg-chili px-6 py-3 text-[15px] font-semibold text-white transition hover:bg-chili-hi"
            >
              Get Harissa
            </a>
            <Link
              href="/docs/getting-started"
              className="rounded-[10px] border border-line px-5 py-3 text-[14.5px] text-ash transition hover:border-ash-dim hover:text-cream"
            >
              How it works
            </Link>
          </div>

          <p className="mt-6 font-mono text-[12px] tracking-wide text-ash-dim">
            Free · {platform.os} · Open source
          </p>

          <div className="mt-14">
            <PathTrace />
          </div>
        </div>
      </section>

      {/* Download */}
      <section
        id="download"
        className="mx-auto max-w-[1180px] scroll-mt-24 px-5 sm:px-8"
      >
        <DownloadCard />
      </section>

      {/* Screenshot */}
      <section className="mx-auto max-w-[1180px] px-5 pt-20 sm:px-8">
        <p className="eyebrow">A look at it</p>
        <h2 className="mt-2 font-display text-[27px] font-semibold tracking-tight text-cream">
          What Harissa looks like
        </h2>
        <p className="mt-2.5 max-w-[52ch] text-[15px] leading-relaxed text-ash">
          This is the actual application, not a mock-up. Artwork on the left,
          your queue on the right, and the controls along the bottom.
        </p>
        <Screenshot
          src="/screenshots/harissa-playing.png"
          alt="Harissa playing a track, with its artwork on the left and the queue open on the right"
          width={1547}
          height={1013}
          priority
        />
      </section>

      {/* What it does */}
      <section className="mx-auto max-w-[1180px] px-5 pt-20 sm:px-8">
        <p className="eyebrow">What it does</p>
        <h2 className="mt-2 max-w-[20ch] font-display text-[27px] font-semibold tracking-tight text-cream">
          Everything you need, and not much else
        </h2>

        <div className="mt-9 grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {WHAT_IT_DOES.map((item) => (
            <div key={item.title}>
              <div className="flex items-start gap-2.5">
                <span
                  aria-hidden
                  className="mt-[7px] h-[6px] w-[6px] shrink-0 bg-chili"
                />
                <h3 className="text-[15.5px] font-semibold text-cream">
                  {item.title}
                </h3>
              </div>
              <p className="mt-1.5 pl-[16px] text-[14px] leading-relaxed text-ash">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-9 text-[14.5px] text-ash">
          <Link
            href="/docs/features"
            className="text-cream underline decoration-chili underline-offset-4 hover:decoration-flame"
          >
            The full feature list
          </Link>{" "}
          says which parts are finished and which are still being worked on.
        </p>
      </section>

      {/* Shortcuts */}
      <section className="mx-auto max-w-[1180px] px-5 pt-20 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="eyebrow">Keyboard</p>
            <h2 className="mt-2 max-w-[16ch] font-display text-[27px] font-semibold tracking-tight text-cream">
              Play it without the mouse
            </h2>
            <p className="mt-3 max-w-[42ch] text-[15px] leading-relaxed text-ash">
              Space to pause, arrows to jump around. Hold an arrow down and it
              scans instead of jumping.
            </p>
            <Link
              href="/docs/shortcuts"
              className="mt-5 inline-block text-[14.5px] text-cream underline decoration-chili underline-offset-4 hover:decoration-flame"
            >
              All the shortcuts
            </Link>
          </div>
          <ShortcutTable scope="Playback" />
        </div>
      </section>

      {/* Privacy */}
      <section className="mx-auto max-w-[1180px] px-5 pt-20 sm:px-8">
        <div className="rounded-panel border border-line bg-shell/50 px-6 py-9 sm:px-10 sm:py-11">
          <p className="eyebrow">Your files, your computer</p>
          <h2 className="mt-2 max-w-[24ch] font-display text-[27px] font-semibold tracking-tight text-cream">
            Harissa has nowhere to send anything
          </h2>
          <div className="mt-4 grid max-w-[105ch] gap-x-14 gap-y-4 text-[15px] leading-relaxed text-ash lg:grid-cols-2">
            <p>
              When you open a track, Harissa reads it from wherever it already
              sits on your disk. It does not copy your media into some folder of
              its own, and it does not go through your drives in the background
              building an index of what you own.
            </p>
            <p>
              There is no account, no cloud, no analytics and no server for any of
              it to talk to. Close the window and nothing is left behind saying
              what you played. That is not a setting you have to find; it is just
              how the app is built.
            </p>
          </div>
        </div>
      </section>

      {/* For developers */}
      <section className="mx-auto max-w-[1180px] px-5 pt-20 sm:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t border-line-soft pt-7">
          <div>
            <p className="eyebrow">If you write code</p>
            <p className="mt-2 max-w-[56ch] text-[15px] leading-relaxed text-ash">
              Harissa is open source, built with React, TypeScript and Electron.
              The docs cover how it is put together and how to run it yourself.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[14px]">
            <Link
              href="/docs/technical/architecture"
              className="text-cream underline decoration-line underline-offset-4 transition hover:decoration-chili"
            >
              How it is built
            </Link>
            <Link
              href="/docs/development/workflow"
              className="text-cream underline decoration-line underline-offset-4 transition hover:decoration-chili"
            >
              Run it from source
            </Link>
            <a
              href={site.repository}
              className="text-cream underline decoration-line underline-offset-4 transition hover:decoration-chili"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="mx-auto max-w-[1180px] px-5 pt-16 sm:px-8">
        <div className="rounded-panel bg-shell/40 px-6 py-10 text-center sm:px-10">
          <h2 className="mx-auto max-w-[24ch] font-display text-[25px] font-semibold tracking-tight text-cream sm:text-[29px]">
            Harissa is nearly ready
          </h2>
          <p className="mx-auto mt-3 max-w-[50ch] text-[15px] leading-relaxed text-ash">
            The player works. What is left is packaging it into an installer for{" "}
            {platform.os}. Follow the repository and you will know when it lands.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href={site.repository}
              className="rounded-[10px] bg-chili px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-chili-hi"
            >
              Follow on GitHub
            </a>
            <Link
              href="/docs/roadmap"
              className="rounded-[10px] border border-line px-5 py-2.5 text-[14px] text-ash transition hover:border-ash-dim hover:text-cream"
            >
              What is coming
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
