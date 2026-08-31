import { shortcuts, type Shortcut } from "@/lib/shortcuts";

function Keys({ keys }: { keys: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      {keys.split(" + ").map((key, index) => (
        <span key={key} className="inline-flex items-center gap-1">
          {index > 0 && <span className="text-ash-dim">+</span>}
          <kbd className="rounded-[5px] border border-line bg-raise px-2 py-0.5 font-mono text-[11.5px] text-cream">
            {key}
          </kbd>
        </span>
      ))}
    </span>
  );
}

/** The key map, grouped by where each binding applies. */
export function ShortcutTable({ scope }: { scope?: Shortcut["scope"] }) {
  const rows = scope ? shortcuts.filter((s) => s.scope === scope) : shortcuts;
  const scopes = [...new Set(rows.map((row) => row.scope))];

  return (
    <div className="my-7 space-y-7">
      {scopes.map((group) => (
        <div key={group}>
          <p className="eyebrow">{group}</p>
          <table className="mt-2.5 w-full border-collapse text-left">
            <thead className="sr-only">
              <tr>
                <th scope="col">Keys</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows
                .filter((row) => row.scope === group)
                .map((row) => (
                  <tr key={row.keys} className="border-t border-line-soft">
                    <td className="w-[42%] py-2.5 pr-4 align-middle">
                      <Keys keys={row.keys} />
                    </td>
                    <td className="py-2.5 text-[13.5px] text-ash">
                      {row.action}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
