import logo from '../assets/logoo.png'
import { extensionOf, folderName, formatTime, trackTitle } from '../lib/media'
import { EqualizerIcon, OpenIcon } from './Icons'

interface StageProps {
  mediaRef: React.RefObject<HTMLVideoElement | null>
  mediaUrl: string | null
  trackPath: string | null
  artwork: string | null
  isVideo: boolean
  isPlaying: boolean
  duration: number
  position: number
  total: number
  error: string | null
  onError: (message: string) => void
  onOpenFiles: () => void
  onTogglePlay: () => void
}

export function Stage({
  mediaRef,
  mediaUrl,
  trackPath,
  artwork,
  isVideo,
  isPlaying,
  duration,
  position,
  total,
  error,
  onError,
  onOpenFiles,
  onTogglePlay,
}: StageProps) {
  return (
    <section className="scroll-thin relative flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center overflow-y-auto px-8 py-6">
      {/* A single <video> element backs both audio and video so playback survives
          every layout change; for audio it is simply not shown. */}
      <div
        className={
          trackPath && isVideo
            ? 'flex min-h-0 w-full max-w-[980px] flex-col items-center'
            : 'pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0'
        }
      >
        <div className="relative w-full overflow-hidden rounded-panel border border-line bg-black shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)]">
          <video
            ref={mediaRef}
            src={mediaUrl ?? undefined}
            onClick={onTogglePlay}
            onError={(e) => {
              const err = e.currentTarget.error
              onError(err?.message || `This file could not be decoded (code ${err?.code ?? '?'}).`)
            }}
            className="max-h-[58vh] w-full cursor-pointer bg-black"
          />
        </div>
      </div>

      {trackPath ? (
        <div className="rise mt-6 w-full max-w-[980px]">
          {!isVideo && <AudioArt artwork={artwork} isPlaying={isPlaying} />}

          <div className={`flex items-end justify-between gap-6 ${isVideo ? '' : 'mt-7'}`}>
            <div className="min-w-0">
              <div className="tnum text-[10px] uppercase tracking-[0.24em] text-ash-dim">
                Now playing
                {total > 1 && <span className="text-ash-dim"> · {position} of {total}</span>}
              </div>
              <h1
                className="font-display mt-2 truncate text-[30px] font-semibold leading-tight tracking-[-0.03em] text-cream"
                title={trackPath}
              >
                {trackTitle(trackPath)}
              </h1>
              <div className="mt-1.5 flex items-center gap-2 text-[12px] text-ash">
                <span className="tnum rounded border border-line px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-ash-dim">
                  {extensionOf(trackPath) || 'file'}
                </span>
                <span className="truncate">{folderName(trackPath) || 'Local file'}</span>
                {duration > 0 && (
                  <>
                    <span className="text-ash-dim">·</span>
                    <span className="tnum">{formatTime(duration)}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {error && (
            <p className="mt-5 rounded-[10px] border border-chili/40 bg-chili/10 px-4 py-3 text-[13px] text-chili-hi">
              {error} Try another file, or check that it still exists at that path.
            </p>
          )}
        </div>
      ) : (
        <EmptyState onOpenFiles={onOpenFiles} />
      )}
    </section>
  )
}

/**
 * The album cover when the file carries one; otherwise the mark on an ember
 * that brightens while the track plays.
 */
function AudioArt({ artwork, isPlaying }: { artwork: string | null; isPlaying: boolean }) {
  return (
    <div className="relative mx-auto flex aspect-[16/7] w-full items-center justify-center overflow-hidden rounded-panel border border-line bg-shell">
      {artwork ? (
        <>
          {/* The cover, blurred, fills the wide frame behind the square original. */}
          <img
            src={artwork}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-2xl"
          />
          <img
            src={artwork}
            alt=""
            className="relative h-full w-auto object-contain shadow-[0_18px_50px_-18px_rgba(0,0,0,0.9)]"
          />
        </>
      ) : (
        <>
          <div
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              opacity: isPlaying ? 1 : 0.45,
              background:
                'radial-gradient(60% 120% at 50% 118%, rgba(255,106,24,0.30) 0%, rgba(224,27,39,0.14) 38%, transparent 70%)',
            }}
          />
          <img
            src={logo}
            alt=""
            className="relative h-[58%] w-auto object-contain drop-shadow-[0_10px_36px_rgba(224,27,39,0.45)]"
          />
        </>
      )}

      <span className="absolute bottom-4 right-5 flex items-center gap-2 rounded-full bg-ink/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-ash">
        <span className="text-stem">
          <EqualizerIcon animated={isPlaying} className="h-3 w-3" />
        </span>
        {isPlaying ? 'Playing' : 'Paused'}
      </span>
    </div>
  )
}

function EmptyState({ onOpenFiles }: { onOpenFiles: () => void }) {
  return (
    <div className="rise flex max-w-[440px] flex-col items-center text-center">
      <img
        src={logo}
        alt=""
        className="h-[104px] w-[104px] object-contain opacity-90 drop-shadow-[0_14px_44px_rgba(224,27,39,0.35)]"
      />

      <h1 className="font-display mt-7 text-[30px] font-semibold leading-tight tracking-[-0.03em] text-cream">
        Nothing playing yet
      </h1>
      <p className="mt-2 text-[13px] leading-relaxed text-ash">
        Open audio or video from this computer. Harissa reads your files where they
        already live — nothing is copied, uploaded, or indexed.
      </p>

      <button
        type="button"
        onClick={onOpenFiles}
        className="ember mt-6 flex items-center gap-2 rounded-[10px] px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_6px_22px_-8px_rgba(224,27,39,0.9)] transition hover:brightness-110 active:scale-[0.98]"
      >
        <OpenIcon className="h-[17px] w-[17px]" />
        Open files
      </button>

      <p className="mt-3 text-[12px] text-ash-dim">or drop them anywhere in this window</p>

      <dl className="mt-9 grid w-full grid-cols-2 gap-x-6 gap-y-2 border-t border-line-soft pt-6 text-left">
        {[
          ['Space', 'Play or pause'],
          ['← / →', 'Back or forward 10s'],
          ['Ctrl + O', 'Open files'],
          ['Ctrl + B', 'Toggle sidebar'],
          ['M', 'Mute'],
          ['F', 'Fullscreen'],
        ].map(([keys, action]) => (
          <div key={keys} className="flex items-center justify-between gap-3">
            <dt className="tnum text-[11px] text-ash-dim">{keys}</dt>
            <dd className="text-[12px] text-ash">{action}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
