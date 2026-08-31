import { useEffect, useState } from 'react'

interface ArtState {
  key: string | null
  url: string | null
}

/**
 * Cover art carried inside the file — an ID3 APIC frame, an MP4 `covr` atom, and
 * so on — as a data URL. Null when the file has none, so callers can fall back
 * to a video frame or to the Harissa mark.
 */
export function useArtwork(trackPath: string | null): string | null {
  const [art, setArt] = useState<ArtState>({ key: null, url: null })

  useEffect(() => {
    if (!trackPath) return
    let cancelled = false

    void window.harissa.getArtwork(trackPath).then((url) => {
      if (cancelled) return
      setArt({ key: trackPath, url })
    })

    return () => {
      cancelled = true
    }
  }, [trackPath])

  return art.key === trackPath ? art.url : null
}
