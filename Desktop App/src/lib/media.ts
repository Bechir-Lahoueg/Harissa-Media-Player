const VIDEO_EXTENSIONS = new Set([
  'mp4',
  'm4v',
  'mkv',
  'webm',
  'mov',
  'avi',
  'ogv',
])

export const MEDIA_EXTENSIONS = [
  'mp3',
  'm4a',
  'aac',
  'wav',
  'flac',
  'ogg',
  'oga',
  'opus',
  'weba',
  ...VIDEO_EXTENSIONS,
]

export function extensionOf(filePath: string): string {
  const base = filePath.split(/[\\/]/).pop() ?? ''
  const dot = base.lastIndexOf('.')
  return dot > 0 ? base.slice(dot + 1).toLowerCase() : ''
}

export function isVideoFile(filePath: string): boolean {
  return VIDEO_EXTENSIONS.has(extensionOf(filePath))
}

export function fileName(filePath: string): string {
  return filePath.split(/[\\/]/).pop() ?? filePath
}

/** Filename without its extension — the closest thing to a title we have without metadata. */
export function trackTitle(filePath: string): string {
  const base = fileName(filePath)
  const dot = base.lastIndexOf('.')
  return dot > 0 ? base.slice(0, dot) : base
}

export function folderName(filePath: string): string {
  const parts = filePath.split(/[\\/]/)
  parts.pop()
  return parts.pop() ?? ''
}

/** Renders seconds as m:ss, or h:mm:ss once the track passes an hour. */
export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const total = Math.floor(seconds)
  const hrs = Math.floor(total / 3600)
  const mins = Math.floor((total % 3600) / 60)
  const secs = total % 60
  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

/**
 * Reads a timecode a person typed into the elapsed-time field.
 * Accepts "90" (seconds), "2:00", "2.30", "1:02:03" and tolerates stray spaces.
 * Returns null when the text is not a time, so the field can reject it without guessing.
 */
export function parseTime(input: string): number | null {
  const text = input.trim().replace(/[.,]/g, ':')
  if (text === '') return null

  const parts = text.split(':')
  if (parts.length > 3) return null

  const numbers: number[] = []
  for (const part of parts) {
    if (!/^\d{1,3}$/.test(part.trim())) return null
    numbers.push(Number(part.trim()))
  }

  const [a, b, c] = numbers
  if (numbers.length === 1) return a
  if (numbers.length === 2) return a * 60 + b
  return a * 3600 + b * 60 + c
}
