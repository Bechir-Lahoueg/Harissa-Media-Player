import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { DocHeader } from "@/components/docs/doc-header";
import { platform, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Short answers about Harissa's scope, privacy, supported formats and platforms.",
};

function Question({
  question,
  children,
}: {
  question: string;
  children: ReactNode;
}) {
  return (
    <div className="border-t border-line-soft py-6">
      <h2 className="font-display text-[17px] font-semibold text-cream">
        {question}
      </h2>
      <div className="mt-2 max-w-[64ch] space-y-3 text-[14.5px] leading-relaxed text-ash [&_a]:text-cream [&_a]:underline [&_a]:decoration-chili [&_a]:underline-offset-4 [&_code]:rounded [&_code]:border [&_code]:border-line-soft [&_code]:bg-raise [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.86em] [&_code]:text-cream">
        {children}
      </div>
    </div>
  );
}

export default function FaqPage() {
  return (
    <>
      <DocHeader
        section="Reference"
        title="FAQ"
        summary="Short answers to the questions the rest of the documentation answers at length."
      />

      <div className="mt-9">
        <Question question="Can I download Harissa yet?">
          <p>
            Not yet. The player works, but it has not been packaged into a
            setup file anyone can install. If you have Node.js you can{" "}
            <Link href="/docs/installation">run it from source</Link> in the
            meantime, and the download button turns on here and on the{" "}
            <Link href="/docs/releases">releases page</Link> the day it is ready.
          </p>
        </Question>

        <Question question="Which files can it play?">
          <p>
            MP3 and MP4 are the two it promises. Plenty of others open as well,
            including WAV, FLAC, OGG, M4A, MKV, WebM and MOV, and they play if
            the codec inside them is one the player can read. There is more on
            that under <Link href="/docs/guide/opening-media">opening media</Link>.
          </p>
        </Question>

        <Question question="Does Harissa send anything over the network?">
          <p>
            No. There is no account system, no analytics and no server it could
            talk to. It reads files off your disk and plays them, and it works
            just as well with the wifi turned off.
          </p>
        </Question>

        <Question question="Does it scan or index my drives?">
          <p>
            No. It only ever touches the files you actually open. Nothing runs in
            the background going through your folders, and nothing is written
            down about what you own or what you listened to.
          </p>
        </Question>

        <Question question="Is there a media library, playlists or metadata?">
          <p>
            There is a queue. Open a handful of files and they line up in a
            panel you can filter and skip around, with shuffle and repeat in the
            bar at the bottom. What there is not is a library that scans your
            folders, or a way to save a queue and open it again next week. Cover
            art is read from inside a file, but titles and artists are not.
            Those are <Link href="/docs/roadmap">ideas for later</Link>.
          </p>
        </Question>

        <Question question="Will there be a macOS or Linux version?">
          <p>
            Not for the first release, which is {platform.os} only. The
            underlying tools could manage it, but supporting a platform properly
            means testing and packaging for it, and that is not on the plate
            right now.
          </p>
        </Question>

        <Question question="Why Electron and not a native Windows app?">
          <p>
            It comes with a media engine that already handles the common
            formats, and it keeps the whole app in one language. The cost is size:
            Harissa will always take more disk space than a player written
            natively for Windows. The{" "}
            <Link href="/docs/technical/architecture">architecture page</Link>{" "}
            goes into that trade.
          </p>
        </Question>

        <Question question="How is it different from the player already in Windows?">
          <p>
            It does less, on purpose. No store, no library, no account. And the
            code is public, so anyone can check what it really does instead of
            taking our word for it.
          </p>
        </Question>

        <Question question="Can I contribute?">
          <p>
            The code is on <a href={site.repository}>GitHub</a>. Issues and pull
            requests are the place to start. A proper contributing guide comes
            once the first release is out.
          </p>
        </Question>

        <Question question="Why is it called Harissa?">
          <p>
            After the chili paste. The colours come from it too: a warm, dark
            red-brown with one bright red on top. This site uses the same ones so
            the app and the website feel like the same thing.
          </p>
        </Question>
      </div>
    </>
  );
}
