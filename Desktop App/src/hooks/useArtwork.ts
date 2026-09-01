import { useEffect, useState } from 'react'

interface ArtState {
  key: string | null
  url: string | null
}

/**
 * Cover art embedded in the media file (ID3 APIC, MP4 `covr`, etc.) as a data
 * URL. Null when the file carries none, so callers can fall back.
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
