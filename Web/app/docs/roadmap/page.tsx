import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/ui/callout";
import { DocHeader } from "@/components/docs/doc-header";
import { FeatureList } from "@/components/ui/feature-list";
import { featureGroups, nonGoals, roadmapAfterV1 } from "@/lib/features";

export const metadata: Metadata = {
  title: "Roadmap",
  description:
    "The Harissa V1 line, and the ideas being considered for after it.",
};

const v1Line = featureGroups.flatMap((group) => group.features);

export default function RoadmapPage() {
  return (
    <>
      <DocHeader
        section="Reference"
        title="Roadmap"
        summary="What is being finished for the first release, and a separate list of things that might follow. The two are kept apart so nobody plans around a maybe."
      />

      <section className="mt-10">
        <h2 className="font-display text-[22px] font-semibold tracking-tight text-cream">
          V1 — the current objective
        </h2>
        <p className="mt-2 max-w-[62ch] text-[14.5px] leading-relaxed text-ash">
          A Windows player that handles your local music and video properly,
          wrapped in an installer. Nothing new gets added to this list until it
          is out.
        </p>
        <FeatureList features={v1Line} />
      </section>

      <section className="mt-14">
        <h2 className="font-display text-[22px] font-semibold tracking-tight text-cream">
          Future ideas
        </h2>
        <p className="mt-2 max-w-[62ch] text-[14.5px] leading-relaxed text-ash">
          Things that might come next. None of them are scheduled or promised,
          nobody is working on them yet, and some will probably be dropped.
        </p>
        <FeatureList features={roadmapAfterV1} />
      </section>

      <div className="prose mt-12">
        <Callout>
          Nothing in that second list has a date on it. If you are working out
          whether Harissa is for you, go by{" "}
          <Link href="/docs/features">what it does today</Link>.
        </Callout>

        <h2 id="staying-out">What stays out</h2>
        <p>
          A few things are not on the list at all, and will not be. They would
          turn Harissa into a different kind of app:
        </p>
        <ul>
          {nonGoals.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>
          A player that works with no network, no account and no service behind
          it is the whole point. It is not a phase on the way to something
          bigger.
        </p>
      </div>
    </>
  );
}
