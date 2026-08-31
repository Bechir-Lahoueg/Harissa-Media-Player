import type { Metadata } from "next";
import { Callout } from "@/components/ui/callout";
import { DocHeader } from "@/components/docs/doc-header";
import { ShortcutTable } from "@/components/ui/shortcut-table";
import { StatusBadge } from "@/components/ui/status-badge";

export const metadata: Metadata = {
  title: "Keyboard shortcuts",
  description:
    "The planned V1 key map for playback, video and window control in Harissa.",
};

export default function ShortcutsPage() {
  return (
    <>
      <DocHeader
        section="Reference"
        title="Keyboard shortcuts"
        summary="You can run the whole player from the keyboard. Here is every key, grouped by what it applies to."
      >
        <StatusBadge status="v1" />
      </DocHeader>

      <div className="prose mt-9">
        <Callout tone="planned" title="Confirmed at release">
          These come from the list the app itself shows you. They will all be
          checked again against the finished build, and anything that turns out
          different gets corrected here.
        </Callout>
      </div>

      <ShortcutTable />

      <div className="prose">
        <h2 id="notes">Notes</h2>
        <ul>
          <li>
            The keys only work while the Harissa window is the one you are using.
            They are not system-wide hotkeys, so they will not hijack anything
            while you are in another app.
          </li>
          <li>
            Holding <code>←</code> or <code>→</code> scans continuously instead
            of repeating ten-second jumps.
          </li>
          <li>
            <code>F</code> and <code>Esc</code> apply to video. Audio has no
            picture to make fullscreen.
          </li>
          <li>Shortcuts cannot be reassigned in V1.</li>
        </ul>

        <h2 id="not-bound">Nothing bound yet</h2>
        <p>
          There are no keys for playback speed, repeat, shuffle or subtitles,
          because none of those exist yet.
        </p>
      </div>
    </>
  );
}
