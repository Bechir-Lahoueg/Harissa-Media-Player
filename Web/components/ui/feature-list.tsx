import type { Feature } from "@/lib/features";
import { StatusBadge } from "./status-badge";

/** A feature with its build status. Used on the features page and the roadmap. */
export function FeatureList({ features }: { features: Feature[] }) {
  return (
    <ul className="mt-4 divide-y divide-line-soft border-y border-line-soft">
      {features.map((feature) => (
        <li
          key={feature.title}
          className="flex flex-wrap items-start justify-between gap-x-6 gap-y-1.5 py-3.5"
        >
          <div className="min-w-0 max-w-[52ch]">
            <p className="text-[14.5px] text-cream">{feature.title}</p>
            <p className="mt-0.5 text-[13.5px] leading-relaxed text-ash">
              {feature.description}
            </p>
          </div>
          <StatusBadge status={feature.status} className="mt-1" />
        </li>
      ))}
    </ul>
  );
}
