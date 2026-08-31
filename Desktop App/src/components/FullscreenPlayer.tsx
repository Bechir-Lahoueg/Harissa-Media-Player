import logo from '../assets/logoo.png'
import type { useMediaPlayer } from '../hooks/useMediaPlayer'
import { extensionOf, folderName, trackTitle } from '../lib/media'
import {
  EqualizerIcon,
  ExitFullscreenIcon,
  NextIcon,
  PauseIcon,
  PlayIcon,
  PrevIcon,
  RepeatIcon,
  RepeatOneIcon,
  SeekIcon,
  ShuffleIcon,
  VolumeIcon,
  VolumeMutedIcon,
} from './Icons'
import { HoldButton, IconButton, VolumeSlider, type RepeatMode } from './PlayerBar'
import { Scrubber } from './Scrubber'

type Player = ReturnType<typeof useMediaPlayer>

interface FullscreenPlayerProps {
  player: Player
  trackPath: string | null
  position: number
  total: number
  visible: boolean
  canPrev: boolean
  canNext: boolean
  onPrev: () => void
  onNext: () => void
  shuffle: boolean
  onToggleShuffle: () => void
  repeat: RepeatMode
  onCycleRepeat: () => void
  onExit: () => void
}

/**
 * The chrome that floats over the film in fullscreen.
 *
 * Same vocabulary as the docked bar — ember scrubber, mono timecodes, the mark —
 * but scaled up and laid on scrims that glow warm from the bottom edge, as if the
 * controls were sitting on coals. When the pointer goes quiet everything fades
 * out except one hairline of ember still burning along the bottom of the screen,
 * so progress survives without anything covering the picture.
 */
export function FullscreenPlayer({
  player,
  trackPath,
  position,
  total,
  visible,
  canPrev,
  canNext,
  onPrev,
  onNext,
  shuffle,
  onToggleShuffle,
  repeat,
  onCycleRepeat,
  onExit,
}: FullscreenPlayerProps) {
  const hasMedia = trackPath !== null
  const interactive = visible ? 'pointer-events-auto' : 'pointer-events-none'

  return (
    <div
      aria-hidden={!visible}
      className={`pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Top scrim: what is playing, and the way out. */}
      <div
        className={`absolute inset-x-0 top-0 px-10 pb-20 pt-7 ${interactive}`}
        style={{
          background:
            'linear-gradient(to bottom, rgba(18,14,13,0.94) 0%, rgba(18,14,13,0.55) 48%, transparent 100%)',
        }}
      >
        <div className="mx-auto flex w-full max-w-[1500px] items-start justify-between gap-8">
          <div className="flex min-w-0 items-center gap-4">
            <img
              src={logo}
              alt=""
              className="h-11 w-11 flex-shrink-0 object-contain drop-shadow-[0_4px_16px_rgba(224,27,39,0.7)]"
            />
            <div className="min-w-0">
              <div className="tnum flex items-center gap-2.5 text-[10px] uppercase tracking-[0.26em] text-ash-dim">
                <span className="text-stem">
                  <EqualizerIcon animated={player.isPlaying} className="h-3 w-3" />
                </span>
                <span>Now playing</span>
                {total > 1 && (
                  <>
                    <span className="text-line">/</span>
                    <span>
                      {position} of {total}
                    </span>
                  </>
                )}
              </div>
              <h1
                className="font-display mt-1.5 truncate text-[26px] font-semibold leading-tight tracking-[-0.035em] text-cream"
                title={trackPath ?? undefined}
              >
                {trackPath ? trackTitle(trackPath) : 'Nothing playing'}
              </h1>
              {trackPath && (
                <div className="mt-1 flex items-center gap-2 text-[12px] text-ash-dim">
                  <span className="tnum rounded border border-line px-1.5 py-0.5 text-[9px] uppercase tracking-wider">
                    {extensionOf(trackPath) || 'file'}
                  </span>
                  <span className="truncate">{folderName(trackPath) || 'Local file'}</span>
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onExit}
            aria-label="Exit fullscreen"
            title="Exit fullscreen   F or Esc"
            className={`flex flex-shrink-0 items-center gap-2 rounded-full border border-line bg-ink/50 px-4 py-2 text-[12px] text-ash backdrop-blur-sm transition hover:border-chili hover:bg-ink/70 hover:text-cream ${interactive}`}
          >
            <ExitFullscreenIcon className="h-4 w-4" />
            <span>Exit</span>
          </button>
        </div>
      </div>

      {/* One large affordance while paused; the film is the rest of the page. */}
      {hasMedia && !player.isPlaying && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span
            aria-hidden
            className="ember absolute inset-0 rounded-full"
            style={{ animation: 'harissa-halo 2.4s ease-out infinite' }}
          />
          <button
            type="button"
            onClick={player.togglePlay}
            aria-label="Play"
            className={`ember relative flex h-[92px] w-[92px] items-center justify-center rounded-full text-white shadow-[0_12px_54px_-10px_rgba(224,27,39,0.95)] transition hover:brightness-110 active:scale-95 ${interactive}`}
          >
            <PlayIcon className="h-11 w-11" />
          </button>
        </div>
      )}

      {/* Bottom scrim: an ember glow under the dark, then the controls. */}
      <div
        className={`absolute inset-x-0 bottom-0 px-10 pb-9 pt-36 ${interactive}`}
        style={{
          background:
            'radial-gradient(120% 160% at 50% 150%, rgba(255,106,24,0.22) 0%, rgba(224,27,39,0.11) 32%, transparent 60%), linear-gradient(to top, rgba(18,14,13,0.985) 0%, rgba(18,14,13,0.95) 26%, rgba(18,14,13,0.78) 48%, rgba(18,14,13,0.38) 72%, transparent 100%)',
        }}
      >
        <div className="mx-auto w-full max-w-[1500px]">
          <Scrubber
            size="lg"
            currentTime={player.currentTime}
            duration={player.duration}
            disabled={!hasMedia}
            onSeek={player.seekTo}
          />

          <div className="mt-6 flex items-center justify-between gap-10">
            {/* Modes on the left, transport in the middle, output on the right. */}
            <div className="flex w-[200px] flex-shrink-0 items-center gap-2">
              <IconButton
                label="Shuffle"
                active={shuffle}
                disabled={!hasMedia}
                onClick={onToggleShuffle}
              >
                <ShuffleIcon className="h-[18px] w-[18px]" />
              </IconButton>
              <IconButton
                label={
                  repeat === 'one'
                    ? 'Repeat track'
                    : repeat === 'all'
                      ? 'Repeat queue'
                      : 'Repeat off'
                }
                active={repeat !== 'off'}
                disabled={!hasMedia}
                onClick={onCycleRepeat}
              >
                {repeat === 'one' ? (
                  <RepeatOneIcon className="h-[18px] w-[18px]" />
                ) : (
                  <RepeatIcon className="h-[18px] w-[18px]" />
                )}
              </IconButton>
            </div>

            <div className="flex items-center gap-2">
              <IconButton label="Previous track" disabled={!canPrev} onClick={onPrev} size="lg">
                <PrevIcon className="h-5 w-5" />
              </IconButton>

              <HoldButton
                label="Back 10 seconds — hold to rewind"
                disabled={!hasMedia}
                onStart={() => player.startSeeking(-1)}
                onEnd={() => player.stopSeeking(-1)}
                size="lg"
              >
                <SeekIcon direction="back" className="h-5 w-5" />
              </HoldButton>

              <button
                type="button"
                aria-label={player.isPlaying ? 'Pause' : 'Play'}
                title={player.isPlaying ? 'Pause   Space' : 'Play   Space'}
                disabled={!hasMedia}
                onClick={player.togglePlay}
                className="ember mx-3 flex h-[62px] w-[62px] items-center justify-center rounded-full text-white shadow-[0_8px_30px_-6px_rgba(224,27,39,0.9)] transition hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-25 disabled:shadow-none"
              >
                {player.isPlaying ? (
                  <PauseIcon className="h-7 w-7" />
                ) : (
                  <PlayIcon className="h-7 w-7" />
                )}
              </button>

              <HoldButton
                label="Forward 10 seconds — hold to fast-forward"
                disabled={!hasMedia}
                onStart={() => player.startSeeking(1)}
                onEnd={() => player.stopSeeking(1)}
                size="lg"
              >
                <SeekIcon direction="forward" className="h-5 w-5" />
              </HoldButton>

              <IconButton label="Next track" disabled={!canNext} onClick={onNext} size="lg">
                <NextIcon className="h-5 w-5" />
              </IconButton>
            </div>

            <div className="flex w-[200px] flex-shrink-0 items-center justify-end gap-2.5">
              <IconButton
                label={player.isMuted ? 'Unmute   M' : 'Mute   M'}
                disabled={!hasMedia}
                onClick={player.toggleMute}
              >
                {player.isMuted ? (
                  <VolumeMutedIcon className="h-[18px] w-[18px]" />
                ) : (
                  <VolumeIcon className="h-[18px] w-[18px]" />
                )}
              </IconButton>
              <VolumeSlider
                volume={player.isMuted ? 0 : player.volume}
                disabled={!hasMedia}
                onChange={player.setVolume}
                className="w-[112px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
