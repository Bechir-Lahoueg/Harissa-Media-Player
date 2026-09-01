import type { Metadata } from "next";
import Link from "next/link";
import { DocHeader } from "@/components/docs/doc-header";
import { DownloadCard } from "@/components/ui/download-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { releaseHistory } from "@/lib/release";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Releases",
  description:
    "Harissa version history and what will ship in the first public build.",
};

export default function ReleasesPage() {
  return (
    <>
      <DocHeader
        section="Reference"
        title="Releases"
        summary="Version 1.0.0 is built and waiting to be published. This page carries each version, its installer and its notes."
      />

      <div className="mt-8">
        <DownloadCard />
      </div>

      <section className="mt-14">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="font-display text-[22px] font-semibold tracking-tight text-cream">
            V1
          </h2>
          <StatusBadge status="v1" />
        </div>
        <p className="mt-2 max-w-[62ch] text-[14.5px] leading-relaxed text-ash">
          The first public release. It is finished when a Windows installer
          produces an application that does the following on a clean machine,
          with nothing else installed:
        </p>
        <ul className="mt-4 divide-y divide-line-soft border-y border-line-soft">
          {[
            "Opens local media through the Windows file dialog",
            "Plays MP3 audio",
            "Plays MP4 video",
            "Play, pause, seek, volume, mute",
            "Shows playback progress and duration",
            "Fullscreen for video",
            "Runs in a resizable window",
            "Installs and uninstalls cleanly",
          ].map((item) => (
            <li key={item} className="py-2.5 text-[14px] text-ash">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[14px] text-ash">
          No release date has been set. Progress is visible in the{" "}
          <a
            href={site.repository}
            className="text-cream underline decoration-chili underline-offset-4"
          >
            repository
          </a>
          .
        </p>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-[22px] font-semibold tracking-tight text-cream">
          Version history
        </h2>
        {releaseHistory.length === 0 ? (
          <div className="mt-4 rounded-panel border border-dashed border-line p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ash-dim">
              No versions published
            </p>
            <p className="mt-2 max-w-[58ch] text-[14px] leading-relaxed text-ash">
              Every release will be listed here with its version, date,
              installer size and SHA-256 checksum, newest first. The first entry
              will be V1.
            </p>
          </div>
        ) : (
          <ul className="mt-4 divide-y divide-line-soft border-y border-line-soft">
            {releaseHistory.map((release) => (
              <li
                key={release.version}
                className="flex flex-wrap items-baseline justify-between gap-4 py-3.5"
              >
                <span className="tnum text-[14px] text-cream">
                  {release.version}
                </span>
                <span className="tnum text-[13px] text-ash-dim">
                  {release.date}
                </span>
                {release.notesUrl && (
                  <a
                    href={release.notesUrl}
                    className="text-[13.5px] text-ash underline decoration-line underline-offset-4 hover:text-cream"
                  >
                    Release notes
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-14">
        <h2 className="font-display text-[22px] font-semibold tracking-tight text-cream">
          After V1
        </h2>
        <p className="mt-2 max-w-[62ch] text-[14.5px] leading-relaxed text-ash">
          Nothing beyond V1 is scheduled. Ideas under consideration are on the{" "}
          <Link
            href="/docs/roadmap"
            className="text-cream underline decoration-chili underline-offset-4"
          >
            roadmap
          </Link>
          , with no dates attached.
        </p>
      </section>
    </>
  );
}
