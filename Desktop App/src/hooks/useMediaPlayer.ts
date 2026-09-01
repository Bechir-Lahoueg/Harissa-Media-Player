import { useCallback, useEffect, useRef, useState } from 'react'

const SEEK_STEP_SECONDS = 10
const HOLD_SEEK_STEP_SECONDS = 1
const HOLD_SEEK_INTERVAL_MS = 150
const HOLD_THRESHOLD_MS = 350
const VOLUME_STEP = 0.05

type SeekDirection = 1 | -1

interface MediaPlayerOptions {
  /** Called when the element reaches the end of the track. */
  onEnded?: () => void
}

export function useMediaPlayer(
  mediaRef: React.RefObject<HTMLMediaElement | null>,
  /** Changes whenever the mounted media element/source changes, forcing listeners to re-bind. */
  trackKey: string | number | null,
  options: MediaPlayerOptions = {},
) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(1)
  const [isMuted, setIsMuted] = useState(false)

  const volumeBeforeMuteRef = useRef(1)
  const holdTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const holdIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const isHoldingRef = useRef(false)

  // Held in a ref so a changing callback identity never re-binds the media listeners.
  const onEndedRef = useRef(options.onEnded)
  useEffect(() => {
    onEndedRef.current = options.onEnded
  })

  useEffect(() => {
    const media = mediaRef.current
    if (!media) return

    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onTimeUpdate = () => setCurrentTime(media.currentTime)
    const onDurationChange = () => setDuration(media.duration || 0)
    const onVolumeChange = () => {
      setVolumeState(media.volume)
      setIsMuted(media.volume === 0)
    }
    const onEnded = () => {
      setIsPlaying(false)
      onEndedRef.current?.()
    }
    // Fired when the source is detached, e.g. after the queue is cleared.
    const onEmptied = () => {
      setIsPlaying(false)
      setCurrentTime(0)
      setDuration(0)
    }

    media.addEventListener('play', onPlay)
    media.addEventListener('emptied', onEmptied)
    media.addEventListener('pause', onPause)
    media.addEventListener('timeupdate', onTimeUpdate)
    media.addEventListener('loadedmetadata', onDurationChange)
    media.addEventListener('durationchange', onDurationChange)
    media.addEventListener('seeked', onTimeUpdate)
    media.addEventListener('volumechange', onVolumeChange)
    media.addEventListener('ended', onEnded)

    setCurrentTime(media.currentTime)
    setDuration(media.duration || 0)
    setVolumeState(media.volume)
    setIsMuted(media.volume === 0)

    return () => {
      media.removeEventListener('play', onPlay)
      media.removeEventListener('emptied', onEmptied)
      media.removeEventListener('pause', onPause)
      media.removeEventListener('timeupdate', onTimeUpdate)
      media.removeEventListener('loadedmetadata', onDurationChange)
      media.removeEventListener('durationchange', onDurationChange)
      media.removeEventListener('seeked', onTimeUpdate)
      media.removeEventListener('volumechange', onVolumeChange)
      media.removeEventListener('ended', onEnded)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackKey])

  const clearHoldTimers = useCallback(() => {
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current)
      holdTimeoutRef.current = null
    }
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current)
      holdIntervalRef.current = null
    }
    isHoldingRef.current = false
  }, [])

  useEffect(() => clearHoldTimers, [clearHoldTimers])

  const play = useCallback(() => {
    const media = mediaRef.current
    if (!media) return
    void media.play().catch(() => {
      /* Autoplay may be rejected; the resulting pause event syncs the UI. */
    })
  }, [mediaRef])

  const togglePlay = useCallback(() => {
    const media = mediaRef.current
    if (!media) return
    if (media.paused) {
      play()
    } else {
      media.pause()
    }
  }, [mediaRef, play])

  const seekTo = useCallback(
    (time: number) => {
      const media = mediaRef.current
      if (!media || !Number.isFinite(media.duration)) return
      const target = Math.min(Math.max(time, 0), media.duration || 0)
      media.currentTime = target
      setCurrentTime(target)
    },
    [mediaRef],
  )

  const skip = useCallback(
    (deltaSeconds: number) => {
      const media = mediaRef.current
      if (!media) return
      seekTo(media.currentTime + deltaSeconds)
    },
    [mediaRef, seekTo],
  )

  const startSeeking = useCallback(
    (direction: SeekDirection) => {
      clearHoldTimers()
      holdTimeoutRef.current = setTimeout(() => {
        isHoldingRef.current = true
        holdIntervalRef.current = setInterval(() => {
          skip(direction * HOLD_SEEK_STEP_SECONDS)
        }, HOLD_SEEK_INTERVAL_MS)
      }, HOLD_THRESHOLD_MS)
    },
    [clearHoldTimers, skip],
  )

  const stopSeeking = useCallback(
    (direction: SeekDirection) => {
      const wasHolding = isHoldingRef.current
      clearHoldTimers()
      if (!wasHolding) {
        skip(direction * SEEK_STEP_SECONDS)
      }
    },
    [clearHoldTimers, skip],
  )

  const setVolume = useCallback(
    (value: number) => {
      const media = mediaRef.current
      if (!media) return
      const clamped = Math.min(Math.max(value, 0), 1)
      media.volume = clamped
      if (clamped > 0) {
        volumeBeforeMuteRef.current = clamped
      }
    },
    [mediaRef],
  )

  const volumeStep = useCallback(
    (deltaSteps: number) => {
      const media = mediaRef.current
      if (!media) return
      setVolume(media.volume + deltaSteps * VOLUME_STEP)
    },
    [mediaRef, setVolume],
  )

  const toggleMute = useCallback(() => {
    const media = mediaRef.current
    if (!media) return
    if (media.volume > 0) {
      volumeBeforeMuteRef.current = media.volume
      media.volume = 0
    } else {
      media.volume = volumeBeforeMuteRef.current || 1
    }
  }, [mediaRef])

  return {
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    play,
    togglePlay,
    seekTo,
    skip,
    startSeeking,
    stopSeeking,
    setVolume,
    volumeStep,
    toggleMute,
    seekStepSeconds: SEEK_STEP_SECONDS,
  }
}
