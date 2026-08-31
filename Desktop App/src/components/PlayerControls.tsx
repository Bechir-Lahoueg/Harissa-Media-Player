import { useCallback, useEffect, useRef, useState } from 'react'
import { useMediaPlayer } from '../hooks/useMediaPlayer'

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const totalSeconds = Math.floor(seconds)
  const mins = Math.floor(totalSeconds / 60)
  const secs = totalSeconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  return (
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.isContentEditable
  )
}

interface PlayerControlsProps {
  mediaRef: React.RefObject<HTMLMediaElement | null>
  trackKey: string | null
  isVideo: boolean
  canPrev: boolean
  canNext: boolean
  onPrev: () => void
  onNext: () => void
}

export function PlayerControls({
  mediaRef,
  trackKey,
  isVideo,
  canPrev,
  canNext,
  onPrev,
  onNext,
}: PlayerControlsProps) {
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    togglePlay,
    seekTo,
    startSeeking,
    stopSeeking,
    volumeStep,
    toggleMute,
  } = useMediaPlayer(mediaRef, trackKey)

  const hasMedia = trackKey !== null
  const barRef = useRef<HTMLDivElement>(null)
  const [isScrubbing, setIsScrubbing] = useState(false)

  const computeTimeFromClientX = useCallback(
    (clientX: number) => {
      const bar = barRef.current
      if (!bar || duration <= 0) return 0
      const rect = bar.getBoundingClientRect()
      const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1)
      return ratio * duration
    },
    [duration],
  )

  const handleBarPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (duration <= 0) return
    barRef.current?.setPointerCapture(e.pointerId)
    setIsScrubbing(true)
    seekTo(computeTimeFromClientX(e.clientX))
  }

  const handleBarPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isScrubbing) return
    seekTo(computeTimeFromClientX(e.clientX))
  }

  const handleBarPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsScrubbing(false)
    if (barRef.current?.hasPointerCapture(e.pointerId)) {
      barRef.current.releasePointerCapture(e.pointerId)
    }
  }

  const toggleFullscreen = useCallback(() => {
    const media = mediaRef.current
    if (!media || !isVideo) return
    if (document.fullscreenElement === media) {
      void document.exitFullscreen()
    } else {
      void media.requestFullscreen()
    }
  }, [mediaRef, isVideo])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!hasMedia || isTypingTarget(e.target)) return

      switch (e.key) {
        case ' ':
          e.preventDefault()
          togglePlay()
          break
        case 'ArrowLeft':
          e.preventDefault()
          stopSeeking(-1)
          break
        case 'ArrowRight':
          e.preventDefault()
          stopSeeking(1)
          break
        case 'ArrowUp':
          e.preventDefault()
          volumeStep(1)
          break
        case 'ArrowDown':
          e.preventDefault()
          volumeStep(-1)
          break
        case 'm':
        case 'M':
          toggleMute()
          break
        case 'f':
        case 'F':
          toggleFullscreen()
          break
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [hasMedia, togglePlay, stopSeeking, volumeStep, toggleMute, toggleFullscreen])

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="w-full select-none rounded-lg border border-zinc-800 bg-zinc-900/60 p-4">
      <div
        ref={barRef}
        onPointerDown={handleBarPointerDown}
        onPointerMove={handleBarPointerMove}
        onPointerUp={handleBarPointerUp}
        className={`group relative h-2 w-full rounded-full bg-zinc-700 ${
          hasMedia ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
        }`}
      >
        <div
          className="pointer-events-none h-full rounded-full bg-red-500"
          style={{ width: `${progressPercent}%` }}
        />
        <div
          className="pointer-events-none absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 -translate-x-1/2 rounded-full bg-red-500 opacity-0 transition-opacity group-hover:opacity-100"
          style={{ left: `${progressPercent}%` }}
        />
      </div>

      <div className="mt-1.5 flex justify-between text-xs text-zinc-400">
        <span>{formatTime(currentTime)}</span>
        <span>-{formatTime(Math.max(duration - currentTime, 0))}</span>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-y-2">
        <div className="flex flex-shrink-0 items-center gap-1">
          <ControlButton label="Previous" disabled={!canPrev} onClick={onPrev}>
            <PrevIcon />
          </ControlButton>

          <HoldButton
            label="Seek backward 10 seconds"
            disabled={!hasMedia}
            onStart={() => startSeeking(-1)}
            onEnd={() => stopSeeking(-1)}
          >
            <SeekIcon direction="back" />
          </HoldButton>

          <ControlButton
            label={isPlaying ? 'Pause' : 'Play'}
            disabled={!hasMedia}
            onClick={togglePlay}
            primary
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </ControlButton>

          <HoldButton
            label="Seek forward 10 seconds"
            disabled={!hasMedia}
            onStart={() => startSeeking(1)}
            onEnd={() => stopSeeking(1)}
          >
            <SeekIcon direction="forward" />
          </HoldButton>

          <ControlButton label="Next" disabled={!canNext} onClick={onNext}>
            <NextIcon />
          </ControlButton>
        </div>

        <div className="flex flex-shrink-0 items-center gap-1">
          <ControlButton
            label={isMuted || volume === 0 ? 'Unmute' : 'Mute'}
            disabled={!hasMedia}
            onClick={toggleMute}
            small
          >
            {isMuted || volume === 0 ? <VolumeMutedIcon /> : <VolumeIcon />}
          </ControlButton>

          <ControlButton
            label="Volume down"
            disabled={!hasMedia}
            onClick={() => volumeStep(-1)}
            small
          >
            <MinusIcon />
          </ControlButton>

          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-zinc-700">
            <div
              className="h-full bg-zinc-300"
              style={{ width: `${Math.round(volume * 100)}%` }}
            />
          </div>

          <ControlButton
            label="Volume up"
            disabled={!hasMedia}
            onClick={() => volumeStep(1)}
            small
          >
            <PlusIcon />
          </ControlButton>

          {isVideo && (
            <ControlButton
              label="Fullscreen"
              disabled={!hasMedia}
              onClick={toggleFullscreen}
              small
            >
              <FullscreenIcon />
            </ControlButton>
          )}
        </div>
      </div>
    </div>
  )
}

function ControlButton({
  label,
  disabled,
  onClick,
  children,
  primary,
  small,
}: {
  label: string
  disabled?: boolean
  onClick: () => void
  children: React.ReactNode
  primary?: boolean
  small?: boolean
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={`flex items-center justify-center rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-500 disabled:cursor-not-allowed disabled:opacity-30 ${
        primary
          ? 'h-11 w-11 bg-red-500 text-white hover:bg-red-400 active:bg-red-600'
          : small
            ? 'h-8 w-8 text-zinc-300 hover:bg-zinc-800 hover:text-white'
            : 'h-9 w-9 text-zinc-300 hover:bg-zinc-800 hover:text-white'
      }`}
    >
      {children}
    </button>
  )
}

function HoldButton({
  label,
  disabled,
  onStart,
  onEnd,
  children,
}: {
  label: string
  disabled?: boolean
  onStart: () => void
  onEnd: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onPointerDown={(e) => {
        if (disabled) return
        e.currentTarget.setPointerCapture(e.pointerId)
        onStart()
      }}
      onPointerUp={() => {
        if (disabled) return
        onEnd()
      }}
      onPointerLeave={() => {
        if (disabled) return
        onEnd()
      }}
      onContextMenu={(e) => e.preventDefault()}
      className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-500 disabled:cursor-not-allowed disabled:opacity-30"
    >
      {children}
    </button>
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}
function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
    </svg>
  )
}
function PrevIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M6 6h2v12H6zM20 6L9 12l11 6z" />
    </svg>
  )
}
function NextIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M16 6h2v12h-2zM4 6l11 6L4 18z" />
    </svg>
  )
}
function SeekIcon({ direction }: { direction: 'back' | 'forward' }) {
  const flip = direction === 'back' ? 'scale-x-[-1]' : ''
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`h-4 w-4 ${flip}`}>
      <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
    </svg>
  )
}
function VolumeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M3 10v4h4l5 5V5L7 10H3zM16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
    </svg>
  )
}
function VolumeMutedIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M16.5 12A4.5 4.5 0 0014 7.97v2.21l2.45 2.45c.03-.2.05-.42.05-.63zM19 12c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 003.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
    </svg>
  )
}
function MinusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
      <path d="M5 11h14v2H5z" />
    </svg>
  )
}
function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
      <path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z" />
    </svg>
  )
}
function FullscreenIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
      <path d="M7 14H5v5h5v-2H7v-3zM5 10h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
    </svg>
  )
}
