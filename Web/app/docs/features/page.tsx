import type { Metadata } from "next";
import Link from "next/link";
import { DocHeader } from "@/components/docs/doc-header";
import { FeatureList } from "@/components/ui/feature-list";
import { StatusBadge } from "@/components/ui/status-badge";
import { featureGroups, nonGoals } from "@/lib/features";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Every capability in the Harissa V1 scope, with its current build status.",
};

export default function FeaturesPage() {
  return (
    <>
      <DocHeader
        section="Reference"
        title="Features"
        summary="Everything Harissa does, with an honest note on each one saying whether it is finished or still being worked on."
      />

      <div className="mt-8 rounded-panel border border-line-soft bg-shell/40 p-5">
        <p className="eyebrow">Reading the statuses</p>
        <dl className="mt-3.5 space-y-3">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <dt>
              <StatusBadge status="built" />
            </dt>
            <dd className="text-[13.5px] text-ash">
              Implemented in the application source today
            </dd>
          </div>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <dt>
              <StatusBadge status="v1" />
            </dt>
            <dd className="text-[13.5px] text-ash">
              In scope for the V1 release, not finished
            </dd>
          </div>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <dt>
              <StatusBadge status="planned" />
            </dt>
            <dd className="text-[13.5px] text-ash">
              An idea for after V1, not committed to
            </dd>
          </div>
        </dl>
      </div>

      {featureGroups.map((group) => (
        <section key={group.title} className="mt-12">
          <h2 className="font-display text-[22px] font-semibold tracking-tight text-cream">
            {group.title}
          </h2>
          <p className="mt-1.5 text-[14.5px] text-ash">{group.intro}</p>
          <FeatureList features={group.features} />
        </section>
      ))}

      <section className="mt-14">
        <h2 className="font-display text-[22px] font-semibold tracking-tight text-cream">
          Not in V1
        </h2>
        <p className="mt-1.5 max-w-[62ch] text-[14.5px] leading-relaxed text-ash">
          These are missing on purpose, not by accident. Harissa is a player for
          the files you already have, and adding any of this would turn it into
          something else.
        </p>
        <ul className="mt-4 divide-y divide-line-soft border-y border-line-soft">
          {nonGoals.map((item) => (
            <li key={item} className="py-2.5 text-[14px] text-ash">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[14px] text-ash">
          Other things, like playlists and subtitles, are just not done yet. Those
          are on the{" "}
          <Link
            href="/docs/roadmap"
            className="text-cream underline decoration-chili underline-offset-4"
          >
            roadmap
          </Link>
          .
        </p>
      </section>
    </>
  );
}
