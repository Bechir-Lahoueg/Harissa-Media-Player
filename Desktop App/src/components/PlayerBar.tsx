import { useCallback, useRef, useState } from 'react'
import type { useMediaPlayer } from '../hooks/useMediaPlayer'
import { extensionOf, folderName, trackTitle } from '../lib/media'
import { Scrubber } from './Scrubber'
import { Thumbnail } from './Thumbnail'
import {
  EqualizerIcon,
  ExitFullscreenIcon,
  FullscreenIcon,
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

export type RepeatMode = 'off' | 'all' | 'one'

/** Matches the step the global ArrowUp/ArrowDown shortcut uses in useMediaPlayer. */
const VOLUME_KEY_STEP = 0.05

type Player = ReturnType<typeof useMediaPlayer>

interface PlayerBarProps {
  player: Player
  trackPath: string | null
  artwork: string | null
  mediaUrl: string | null
  isVideo: boolean
  isFullscreen: boolean
  canPrev: boolean
  canNext: boolean
  onPrev: () => void
  onNext: () => void
  shuffle: boolean
  onToggleShuffle: () => void
  repeat: RepeatMode
  onCycleRepeat: () => void
  onToggleFullscreen: () => void
}

export function PlayerBar({
  player,
  trackPath,
  artwork,
  mediaUrl,
  isVideo,
  isFullscreen,
  canPrev,
  canNext,
  onPrev,
  onNext,
  shuffle,
  onToggleShuffle,
  repeat,
  onCycleRepeat,
  onToggleFullscreen,
}: PlayerBarProps) {
  const hasMedia = trackPath !== null

  return (
    <footer className="z-20 flex h-[86px] flex-shrink-0 items-center gap-5 border-t border-line-soft bg-shell px-5">
      <TrackIdentity
        trackPath={trackPath}
        artwork={artwork}
        mediaUrl={mediaUrl}
        isVideo={isVideo}
        isPlaying={player.isPlaying}
      />

      <div className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
        <div className="flex items-center gap-1">
          <IconButton
            label="Shuffle"
            active={shuffle}
            disabled={!hasMedia}
            onClick={onToggleShuffle}
            size="sm"
          >
            <ShuffleIcon />
          </IconButton>

          <IconButton label="Previous track" disabled={!canPrev} onClick={onPrev}>
            <PrevIcon />
          </IconButton>

          <HoldButton
            label="Back 10 seconds — hold to rewind"
            disabled={!hasMedia}
            onStart={() => player.startSeeking(-1)}
            onEnd={() => player.stopSeeking(-1)}
          >
            <SeekIcon direction="back" />
          </HoldButton>

          <button
            type="button"
            aria-label={player.isPlaying ? 'Pause' : 'Play'}
            title={player.isPlaying ? 'Pause   Space' : 'Play   Space'}
            disabled={!hasMedia}
            onClick={player.togglePlay}
            className="ember mx-1.5 flex h-[42px] w-[42px] items-center justify-center rounded-full text-white shadow-[0_4px_16px_-4px_rgba(224,27,39,0.75)] transition hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-25 disabled:shadow-none"
          >
            {player.isPlaying ? <PauseIcon /> : <PlayIcon className="h-5 w-5" />}
          </button>

          <HoldButton
            label="Forward 10 seconds — hold to fast-forward"
            disabled={!hasMedia}
            onStart={() => player.startSeeking(1)}
            onEnd={() => player.stopSeeking(1)}
          >
            <SeekIcon direction="forward" />
          </HoldButton>

          <IconButton label="Next track" disabled={!canNext} onClick={onNext}>
            <NextIcon />
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
            size="sm"
          >
            {repeat === 'one' ? <RepeatOneIcon /> : <RepeatIcon />}
          </IconButton>
        </div>

        <div className="w-full max-w-[620px]">
          <Scrubber
            currentTime={player.currentTime}
            duration={player.duration}
            disabled={!hasMedia}
            onSeek={player.seekTo}
          />
        </div>
      </div>

      <div className="flex w-[196px] flex-shrink-0 items-center justify-end gap-2">
        <IconButton
          label={player.isMuted ? 'Unmute   M' : 'Mute   M'}
          disabled={!hasMedia}
          onClick={player.toggleMute}
          size="sm"
        >
          {player.isMuted ? <VolumeMutedIcon /> : <VolumeIcon />}
        </IconButton>

        <VolumeSlider
          volume={player.isMuted ? 0 : player.volume}
          disabled={!hasMedia}
          onChange={player.setVolume}
        />

        <IconButton
          label={isFullscreen ? 'Exit fullscreen   F' : 'Fullscreen   F'}
          disabled={!hasMedia || !isVideo}
          onClick={onToggleFullscreen}
          size="sm"
        >
          {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
        </IconButton>
      </div>
    </footer>
  )
}

function TrackIdentity({
  trackPath,
  artwork,
  mediaUrl,
  isVideo,
  isPlaying,
}: {
  trackPath: string | null
  artwork: string | null
  mediaUrl: string | null
  isVideo: boolean
  isPlaying: boolean
}) {
  return (
    <div className="flex w-[240px] flex-shrink-0 items-center gap-3">
      <div className="relative h-[52px] w-[52px] flex-shrink-0 overflow-hidden rounded-[10px] border border-line bg-raise">
        <Thumbnail
          artwork={artwork}
          mediaUrl={mediaUrl}
          isVideo={isVideo}
          hasTrack={trackPath !== null}
        />
        {isPlaying && (
          <span className="absolute bottom-1 right-1 rounded bg-ink/75 p-[3px] text-stem">
            <EqualizerIcon animated className="h-3 w-3" />
          </span>
        )}
      </div>

      <div className="min-w-0">
        {trackPath ? (
          <>
            <div className="truncate text-[13px] font-medium text-cream" title={trackPath}>
              {trackTitle(trackPath)}
            </div>
            <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-ash-dim">
              <span className="tnum rounded border border-line px-1 py-px text-[9px] uppercase tracking-wider">
                {extensionOf(trackPath) || 'file'}
              </span>
              <span className="truncate">{folderName(trackPath) || 'Local file'}</span>
            </div>
          </>
        ) : (
          <div className="text-[13px] text-ash-dim">Nothing queued</div>
        )}
      </div>
    </div>
  )
}

export function VolumeSlider({
  volume,
  disabled,
  onChange,
  className = 'w-[88px]',
}: {
  volume: number
  disabled: boolean
  onChange: (value: number) => void
  className?: string
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)

  const valueFromClientX = useCallback((clientX: number) => {
    const el = trackRef.current
    if (!el) return 0
    const rect = el.getBoundingClientRect()
    return Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1)
  }, [])

  return (
    <div
      ref={trackRef}
      role="slider"
      tabIndex={disabled ? -1 : 0}
      aria-label="Volume"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(volume * 100)}
      onPointerDown={(e) => {
        if (disabled) return
        trackRef.current?.setPointerCapture(e.pointerId)
        setDragging(true)
        onChange(valueFromClientX(e.clientX))
      }}
      onPointerMove={(e) => {
        if (!dragging) return
        onChange(valueFromClientX(e.clientX))
      }}
      onPointerUp={(e) => {
        setDragging(false)
        if (trackRef.current?.hasPointerCapture(e.pointerId)) {
          trackRef.current.releasePointerCapture(e.pointerId)
        }
      }}
      onKeyDown={(e) => {
        if (disabled) return
        // Owns its own arrow/Home/End handling per the WAI-ARIA slider pattern,
        // rather than relying on the window-level shortcut for ArrowUp/Down.
        switch (e.key) {
          case 'ArrowRight':
          case 'ArrowUp':
            e.preventDefault()
            e.stopPropagation()
            onChange(volume + VOLUME_KEY_STEP)
            break
          case 'ArrowLeft':
          case 'ArrowDown':
            e.preventDefault()
            e.stopPropagation()
            onChange(volume - VOLUME_KEY_STEP)
            break
          case 'Home':
            e.preventDefault()
            e.stopPropagation()
            onChange(0)
            break
          case 'End':
            e.preventDefault()
            e.stopPropagation()
            onChange(1)
            break
        }
      }}
      className={`group relative flex h-5 flex-shrink-0 items-center ${className} ${
        disabled ? 'pointer-events-none opacity-30' : 'cursor-pointer'
      }`}
    >
      <div className="h-[4px] w-full rounded-full bg-line">
        <div
          className="h-full rounded-full bg-ash transition-colors group-hover:bg-cream"
          style={{ width: `${volume * 100}%` }}
        />
      </div>
      <div
        className={`absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream transition-opacity ${
          dragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
        style={{ left: `${volume * 100}%` }}
      />
    </div>
  )
}

export function IconButton({
  label,
  disabled,
  active,
  onClick,
  children,
  size = 'md',
}: {
  label: string
  disabled?: boolean
  active?: boolean
  onClick: () => void
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}) {
  return (
    <button
      type="button"
      aria-label={label.split('   ')[0]}
      aria-pressed={active}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={`relative flex items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-25 ${
        size === 'sm' ? 'h-8 w-8' : size === 'lg' ? 'h-12 w-12' : 'h-9 w-9'
      } ${active ? 'text-chili-hi hover:bg-raise' : 'text-ash hover:bg-raise hover:text-cream'}`}
    >
      {children}
      {active && <span className="ember absolute bottom-[3px] h-[3px] w-[3px] rounded-full" />}
    </button>
  )
}

export function HoldButton({
  label,
  disabled,
  onStart,
  onEnd,
  children,
  size = 'md',
}: {
  label: string
  disabled?: boolean
  onStart: () => void
  onEnd: () => void
  children: React.ReactNode
  size?: 'md' | 'lg'
}) {
  // A press must have started on this button before it can end. Without this,
  // pointerleave fires the seek just for moving the cursor across the button.
  const pressed = useRef(false)

  const end = () => {
    if (!pressed.current) return
    pressed.current = false
    onEnd()
  }

  return (
    <button
      type="button"
      aria-label={label.split(' — ')[0]}
      title={label}
      disabled={disabled}
      onPointerDown={(e) => {
        if (disabled || e.button !== 0) return
        e.currentTarget.setPointerCapture(e.pointerId)
        pressed.current = true
        onStart()
      }}
      onPointerUp={end}
      onPointerLeave={end}
      onPointerCancel={end}
      onContextMenu={(e) => e.preventDefault()}
      className={`flex items-center justify-center rounded-full text-ash transition-colors hover:bg-raise hover:text-cream disabled:cursor-not-allowed disabled:opacity-25 ${
        size === 'lg' ? 'h-12 w-12' : 'h-9 w-9'
      }`}
    >
      {children}
    </button>
  )
}
