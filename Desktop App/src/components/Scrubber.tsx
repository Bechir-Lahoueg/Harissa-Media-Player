import { useCallback, useEffect, useRef, useState } from 'react'
import { formatTime, parseTime } from '../lib/media'

interface ScrubberProps {
  currentTime: number
  duration: number
  disabled: boolean
  onSeek: (time: number) => void
  /** The fullscreen player gets a heavier bar and larger timecodes. */
  size?: 'md' | 'lg'
}

/**
 * The scrubber is the one loud element in the chrome: the played portion burns
 * from chili red into flame orange, and the elapsed timecode is editable, so a
 * track can be started at 2:00 by typing it rather than by aiming at a pixel.
 */
export function Scrubber({
  currentTime,
  duration,
  disabled,
  onSeek,
  size = 'md',
}: ScrubberProps) {
  const large = size === 'lg'
  const barRef = useRef<HTMLDivElement>(null)
  const [isScrubbing, setIsScrubbing] = useState(false)
  const [hoverRatio, setHoverRatio] = useState<number | null>(null)

  const ratioFromClientX = useCallback((clientX: number) => {
    const bar = barRef.current
    if (!bar) return 0
    const rect = bar.getBoundingClientRect()
    return Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1)
  }, [])

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || duration <= 0) return
    barRef.current?.setPointerCapture(e.pointerId)
    setIsScrubbing(true)
    onSeek(ratioFromClientX(e.clientX) * duration)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || duration <= 0) return
    const ratio = ratioFromClientX(e.clientX)
    setHoverRatio(ratio)
    if (isScrubbing) onSeek(ratio * duration)
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsScrubbing(false)
    if (barRef.current?.hasPointerCapture(e.pointerId)) {
      barRef.current.releasePointerCapture(e.pointerId)
    }
  }

  const percent = duration > 0 ? (currentTime / duration) * 100 : 0
  const remaining = Math.max(duration - currentTime, 0)

  return (
    <div className={`flex w-full items-center ${large ? 'gap-5' : 'gap-3'}`}>
      <TimeField
        seconds={currentTime}
        max={duration}
        disabled={disabled || duration <= 0}
        onCommit={onSeek}
        large={large}
      />

      <div className={`group relative flex flex-1 items-center ${large ? 'h-7' : 'h-5'}`}>
        {hoverRatio !== null && duration > 0 && !disabled && (
          <div
            className="tnum pointer-events-none absolute -top-[3px] z-10 -translate-x-1/2 -translate-y-full rounded-md border border-line bg-ink px-1.5 py-1 text-[11px] text-cream opacity-0 shadow-lg transition-opacity group-hover:opacity-100"
            style={{ left: `${hoverRatio * 100}%` }}
          >
            {formatTime(hoverRatio * duration)}
          </div>
        )}

        <div
          ref={barRef}
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={Math.round(duration)}
          aria-valuenow={Math.round(currentTime)}
          aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={() => setHoverRatio(null)}
          onKeyDown={(e) => {
            if (disabled || duration <= 0) return
            if (e.key === 'Home') {
              e.preventDefault()
              onSeek(0)
            } else if (e.key === 'End') {
              e.preventDefault()
              onSeek(duration)
            }
          }}
          className={`relative w-full rounded-full bg-line transition-[height] duration-150 ${
            large
              ? isScrubbing
                ? 'h-[8px]'
                : 'h-[6px] group-hover:h-[8px]'
              : isScrubbing
                ? 'h-[6px]'
                : 'h-[4px] group-hover:h-[6px]'
          } ${disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}`}
        >
          <div
            className="ember pointer-events-none h-full rounded-full"
            style={{ width: `${percent}%` }}
          />
          <div
            className={`ember ember-glow pointer-events-none absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-150 ${
              large ? 'h-4 w-4' : 'h-3 w-3'
            } ${
              isScrubbing ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
            style={{ left: `${percent}%` }}
          />
        </div>
      </div>

      <span
        className={`tnum flex-shrink-0 text-right ${
          large ? 'w-[74px] text-[15px] text-ash' : 'w-[52px] text-[12px] text-ash-dim'
        }`}
      >
        {duration > 0 ? `-${formatTime(remaining)}` : '--:--'}
      </span>
    </div>
  )
}

interface TimeFieldProps {
  seconds: number
  max: number
  disabled: boolean
  onCommit: (seconds: number) => void
  large: boolean
}

/** Click the elapsed time, type a timecode, press Enter to jump there. */
function TimeField({ seconds, max, disabled, onCommit, large }: TimeFieldProps) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')
  const [invalid, setInvalid] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) inputRef.current?.select()
  }, [editing])

  const beginEditing = () => {
    if (disabled) return
    setDraft(formatTime(seconds))
    setInvalid(false)
    setEditing(true)
  }

  const commit = () => {
    const parsed = parseTime(draft)
    if (parsed === null) {
      setInvalid(true)
      inputRef.current?.select()
      return
    }
    onCommit(Math.min(parsed, max))
    setEditing(false)
  }

  if (editing) {
    return (
      <input
        ref={inputRef}
        value={draft}
        autoFocus
        spellCheck={false}
        aria-label="Jump to time"
        onChange={(e) => {
          setDraft(e.target.value)
          setInvalid(false)
        }}
        onKeyDown={(e) => {
          e.stopPropagation()
          if (e.key === 'Enter') commit()
          if (e.key === 'Escape') setEditing(false)
        }}
        onBlur={() => setEditing(false)}
        className={`tnum flex-shrink-0 rounded-md border bg-ink text-center text-cream outline-none ${
          large ? 'w-[84px] px-2 py-1 text-[15px]' : 'w-[62px] px-1.5 py-[3px] text-[12px]'
        } ${invalid ? 'border-chili' : 'border-flame'}`}
      />
    )
  }

  return (
    <button
      type="button"
      onClick={beginEditing}
      disabled={disabled}
      title="Jump to a timecode — click and type, e.g. 2:00"
      className={`tnum flex-shrink-0 rounded-md border border-transparent text-center text-cream transition-colors hover:border-line hover:bg-raise/70 disabled:cursor-not-allowed disabled:text-ash-dim disabled:hover:border-transparent disabled:hover:bg-transparent ${
        large ? 'w-[84px] px-2 py-1 text-[15px]' : 'w-[62px] px-1.5 py-[3px] text-[12px]'
      }`}
    >
      {formatTime(seconds)}
    </button>
  )
}
