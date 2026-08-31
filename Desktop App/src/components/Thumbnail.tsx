import { useEffect, useRef } from 'react'
import logo from '../assets/logoo.png'

/** Where to park the preview so it lands on a real frame rather than a black one. */
const PREVIEW_AT_SECONDS = 4

interface ThumbnailProps {
  /** Cover art embedded in the file, if it has any. */
  artwork: string | null
  /** Used to pull a still frame when the file is a video with no cover art. */
  mediaUrl: string | null
  isVideo: boolean
  hasTrack: boolean
  className?: string
}

/**
 * The picture that stands for the current track: its own cover art, else a frame
 * from the video, else the Harissa mark. The video frame comes from a second,
 * muted, never-played element parked a few seconds in — reading one off a canvas
 * would need CORS that the media:// scheme cannot satisfy.
 */
export function Thumbnail({ artwork, mediaUrl, isVideo, hasTrack, className = '' }: ThumbnailProps) {
  if (artwork) {
    return <img src={artwork} alt="" className={`h-full w-full object-cover ${className}`} />
  }

  if (isVideo && mediaUrl) {
    return <VideoFrame mediaUrl={mediaUrl} className={className} />
  }

  return (
    <img
      src={logo}
      alt=""
      className={`h-full w-full object-contain p-1.5 transition-opacity duration-300 ${
        hasTrack ? 'opacity-100' : 'opacity-30'
      } ${className}`}
    />
  )
}

function VideoFrame({ mediaUrl, className }: { mediaUrl: string; className: string }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    const onLoadedMetadata = () => {
      // Short clips get their midpoint; anything longer gets a fixed early frame.
      const target = Number.isFinite(video.duration)
        ? Math.min(PREVIEW_AT_SECONDS, video.duration / 2)
        : PREVIEW_AT_SECONDS
      try {
        video.currentTime = target
      } catch {
        // Not seekable yet; the poster stays on frame zero, which is fine.
      }
    }

    video.addEventListener('loadedmetadata', onLoadedMetadata)
    return () => video.removeEventListener('loadedmetadata', onLoadedMetadata)
  }, [mediaUrl])

  return (
    <video
      ref={ref}
      key={mediaUrl}
      src={mediaUrl}
      muted
      playsInline
      preload="metadata"
      tabIndex={-1}
      aria-hidden
      className={`pointer-events-none h-full w-full object-cover ${className}`}
    />
  )
}
