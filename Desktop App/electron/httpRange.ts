const MIME_TYPES: Record<string, string> = {
  mp3: "audio/mpeg",
  m4a: "audio/mp4",
  aac: "audio/aac",
  wav: "audio/wav",
  flac: "audio/flac",
  ogg: "audio/ogg",
  oga: "audio/ogg",
  opus: "audio/ogg",
  weba: "audio/webm",
  mp4: "video/mp4",
  m4v: "video/mp4",
  mkv: "video/x-matroska",
  webm: "video/webm",
  mov: "video/quicktime",
  avi: "video/x-msvideo",
  ogv: "video/ogg",
};

export function mimeTypeFor(filePath: string): string {
  const base = filePath.split(/[\\/]/).pop() ?? "";
  const dot = base.lastIndexOf(".");
  const ext = dot > 0 ? base.slice(dot + 1).toLowerCase() : "";
  return MIME_TYPES[ext] ?? "application/octet-stream";
}

export interface ByteRange {
  start: number;
  end: number;
}

/**
 * Parses a single-range `Range: bytes=start-end` header against a known size.
 * Returns null for an absent, malformed, or unsatisfiable range so the caller
 * can answer with a full 200 or a 416 as appropriate.
 */
export function parseRange(header: string | null, size: number): ByteRange | null {
  if (!header || size <= 0) return null;

  const match = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!match) return null;

  const [, rawStart, rawEnd] = match;
  if (rawStart === "" && rawEnd === "") return null;

  let start: number;
  let end: number;

  if (rawStart === "") {
    // Suffix range: the last N bytes of the file.
    const suffix = Number(rawEnd);
    if (suffix <= 0) return null;
    start = Math.max(size - suffix, 0);
    end = size - 1;
  } else {
    start = Number(rawStart);
    end = rawEnd === "" ? size - 1 : Math.min(Number(rawEnd), size - 1);
  }

  if (!Number.isFinite(start) || !Number.isFinite(end) || start > end || start >= size) {
    return null;
  }

  return { start, end };
}
