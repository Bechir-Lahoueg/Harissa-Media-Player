import { Logo } from "@/components/layout/wordmark";
import { isReleased, latestRelease, type Release } from "@/lib/release";
import { platform, site } from "@/lib/site";

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * The download panel, driven entirely by `lib/release.ts`.
 *
 * Renders a download button with the version, size and checksum when a release
 * is live, and build-from-source instructions when one is not, so the page
 * never offers a link that does not resolve.
 */
export function DownloadCard({ release = latestRelease }: { release?: Release }) {
  const released = isReleased(release);

  return (
    <section
      aria-labelledby="download-heading"
      className="rounded-panel border border-line bg-shell/60 p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <Logo size={64} className="hidden sm:block" />
          <div>
            <h2
              id="download-heading"
              className="font-display text-[25px] font-semibold tracking-tight text-cream"
            >
              Download Harissa
            </h2>
            <p className="mt-1 text-[14.5px] text-ash">
              {released
                ? `Version ${release.version} · ${release.size} · ${platform.os}`
                : `Free and open source · ${platform.os}`}
            </p>
          </div>
        </div>

        {released ? (
          <a
            href={release.downloadUrl ?? undefined}
            className="rounded-[10px] bg-chili px-6 py-3 text-[15px] font-semibold text-white transition hover:bg-chili-hi"
          >
            Download for Windows
          </a>
        ) : (
          <span className="rounded-[10px] border border-dashed border-line px-6 py-3 text-[14px] text-ash-dim">
            Not ready yet
          </span>
        )}
      </div>

      <div className="mt-6 border-t border-line-soft pt-5">
        {released ? (
          <dl className="grid gap-x-10 gap-y-3 text-[13.5px] sm:grid-cols-2">
            <div className="flex gap-3">
              <dt className="text-ash-dim">Released</dt>
              <dd className="tnum text-ash">
                {release.date ? formatDate(release.date) : "—"}
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-ash-dim">File</dt>
              <dd className="text-ash">{release.fileName}</dd>
            </div>
            {release.sha256 && (
              <div className="sm:col-span-2">
                <dt className="text-ash-dim">
                  SHA-256, if you want to check your download
                </dt>
                <dd className="tnum mt-1 break-all text-[11.5px] text-ash">
                  {release.sha256}
                </dd>
              </div>
            )}
            {release.notesUrl && (
              <div className="sm:col-span-2">
                <a
                  href={release.notesUrl}
                  className="text-cream underline decoration-chili underline-offset-4"
                >
                  What changed in this version
                </a>
              </div>
            )}
          </dl>
        ) : (
          <>
            <p className="max-w-[62ch] text-[14.5px] leading-relaxed text-ash">
              There is no installer to download yet. The player itself works, but
              it still has to be packaged into a proper Windows setup file. When
              that is done, the download button appears right here.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={site.repository}
                className="rounded-[10px] border border-line px-5 py-2.5 text-[14px] text-ash transition hover:border-ash-dim hover:text-cream"
              >
                Follow the repository
              </a>
              <a
                href="/docs/installation"
                className="rounded-[10px] border border-line px-5 py-2.5 text-[14px] text-ash transition hover:border-ash-dim hover:text-cream"
              >
                Run it from source instead
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
