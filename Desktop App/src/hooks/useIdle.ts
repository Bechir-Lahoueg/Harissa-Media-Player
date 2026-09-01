import { useEffect, useState } from 'react'

/**
 * True once the pointer and keyboard have been idle for `delayMs`.
 * Used to auto-hide the fullscreen controls and cursor.
 */
export function useIdle(enabled: boolean, delayMs: number): boolean {
  const [idle, setIdle] = useState(false)

  useEffect(() => {
    if (!enabled) return

    let timer: ReturnType<typeof setTimeout> | undefined

    const sleep = () => setIdle(true)
    const wake = () => {
      setIdle(false)
      if (timer) clearTimeout(timer)
      timer = setTimeout(sleep, delayMs)
    }

    // Entering fullscreen always starts awake, however the last session ended.
    wake()

    window.addEventListener('pointermove', wake, { passive: true })
    window.addEventListener('pointerdown', wake, { passive: true })
    window.addEventListener('wheel', wake, { passive: true })
    window.addEventListener('keydown', wake)

    return () => {
      if (timer) clearTimeout(timer)
      window.removeEventListener('pointermove', wake)
      window.removeEventListener('pointerdown', wake)
      window.removeEventListener('wheel', wake)
      window.removeEventListener('keydown', wake)
    }
  }, [enabled, delayMs])

  return enabled && idle
}
