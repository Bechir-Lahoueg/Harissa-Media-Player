import { useMemo, useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import { extensionOf, trackTitle } from '../lib/media'
import { CloseIcon, EqualizerIcon, OpenIcon } from './Icons'

interface QueuePanelProps {
  open: boolean
  tracks: string[]
  currentIndex: number
  isPlaying: boolean
  onSelect: (index: number) => void
  onRemove: (index: number) => void
  onClear: () => void
  onClose: () => void
  onOpenFiles: () => void
}

export function QueuePanel({
  open,
  tracks,
  currentIndex,
  isPlaying,
  onSelect,
  onRemove,
  onClear,
  onClose,
  onOpenFiles,
}: QueuePanelProps) {
  const { t, f, n } = useTranslation()
  const [filter, setFilter] = useState('')

  const visible = useMemo(() => {
    const needle = filter.trim().toLowerCase()
    return tracks
      .map((path, index) => ({ path, index }))
      .filter(({ path }) => needle === '' || path.toLowerCase().includes(needle))
  }, [tracks, filter])

  if (!open) return null

  return (
    <aside className="flex h-full w-[304px] flex-shrink-0 flex-col border-l border-line-soft bg-shell">
      <header className="drag flex h-[52px] flex-shrink-0 items-center justify-between pl-5 pr-2">
        <div className="flex items-baseline gap-2">
          {/* Body face rather than the display face: Bricolage's Q sweeps a tail
              under the following letters, which reads as a stray rule at this size. */}
          <h2 className="text-[14px] font-semibold text-cream">{t.queue}</h2>
          <span className="tnum text-[10px] uppercase tracking-[0.18em] text-ash-dim">
            {tracks.length} {n(tracks.length, t.trackCountOne, t.trackCountOther)}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={t.hideQueue}
          title={`${t.hideQueue}   Ctrl+J`}
          className="no-drag flex h-7 w-7 items-center justify-center rounded-md text-ash-dim transition hover:bg-raise hover:text-cream"
        >
          <CloseIcon />
        </button>
      </header>

      {tracks.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
          <p className="text-[12px] leading-relaxed text-ash-dim">
            {t.queueEmpty}
          </p>
          <button
            type="button"
            onClick={onOpenFiles}
            className="flex items-center gap-2 rounded-[9px] border border-line px-3 py-1.5 text-[12px] text-ash transition hover:border-ash-dim hover:text-cream"
          >
            <OpenIcon className="h-4 w-4" />
            {t.openFiles}
          </button>
        </div>
      ) : (
        <>
          <div className="px-3 pb-2">
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              onKeyDown={(e) => e.stopPropagation()}
              placeholder={t.filterQueue}
              aria-label={t.filterQueue}
              spellCheck={false}
              className="w-full rounded-[9px] border border-line-soft bg-ink px-3 py-1.5 text-[12px] text-cream placeholder:text-ash-dim focus:border-line focus:outline-none"
            />
          </div>

          <ol className="scroll-thin min-h-0 flex-1 overflow-y-auto px-2 pb-2">
            {visible.map(({ path, index }) => {
              const active = index === currentIndex
              return (
                <li key={`${path}-${index}`}>
                  <div
                    className={`group flex items-center gap-2.5 rounded-[10px] px-2 py-2 transition-colors ${
                      active ? 'bg-raise' : 'hover:bg-raise/60'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => onSelect(index)}
                      className="flex min-w-0 flex-1 items-center gap-2.5 text-left"
                    >
                      <span
                        className={`tnum flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md text-[10px] ${
                          active ? 'text-stem' : 'text-ash-dim group-hover:text-ash'
                        }`}
                      >
                        {active ? (
                          <EqualizerIcon animated={isPlaying} className="h-3 w-3" />
                        ) : (
                          index + 1
                        )}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span
                          className={`block truncate text-[12.5px] ${
                            active ? 'font-medium text-cream' : 'text-ash group-hover:text-cream'
                          }`}
                          title={path}
                        >
                          {trackTitle(path)}
                        </span>
                        <span className="tnum block text-[10px] uppercase tracking-wider text-ash-dim">
                          {extensionOf(path) || t.file}
                        </span>
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onRemove(index)}
                      aria-label={`${t.removeFromQueue}: ${trackTitle(path)}`}
                      title={t.removeFromQueue}
                      className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md text-ash-dim opacity-0 transition hover:bg-raise-hi hover:text-cream focus-visible:opacity-100 group-hover:opacity-100"
                    >
                      <CloseIcon className="h-3 w-3" />
                    </button>
                  </div>
                </li>
              )
            })}

            {visible.length === 0 && (
              <li className="px-3 py-6 text-center text-[12px] text-ash-dim">
                {f(t.noTrackMatches, { query: filter })}
              </li>
            )}
          </ol>

          <div className="flex-shrink-0 border-t border-line-soft p-3">
            <button
              type="button"
              onClick={onClear}
              className="w-full rounded-[9px] border border-line-soft py-1.5 text-[12px] text-ash-dim transition hover:border-chili/50 hover:text-chili-hi"
            >
              {t.clearQueue}
            </button>
          </div>
        </>
      )}
    </aside>
  )
}
