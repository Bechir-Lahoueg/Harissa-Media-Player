import fs from "node:fs";
import { Readable } from "node:stream";
import { mimeTypeFor, parseRange } from "./httpRange.js";

/** `media://local/<uri-encoded absolute path>` -> the path on disk. */
export function filePathFromUrl(url: string): string {
  return decodeURIComponent(new URL(url).pathname.slice(1));
}

function bodyFor(filePath: string, start: number, end: number): ReadableStream {
  return Readable.toWeb(fs.createReadStream(filePath, { start, end })) as ReadableStream;
}

/**
 * Serves a local file over the `media://` scheme with byte-range support.
 *
 * Chromium needs 206 responses to seek within a media file. Without them it can
 * only play from the start, and it re-requests the whole file whenever the
 * stream is interrupted — which is what made playback jump back to 0:00.
 */
export async function handleMediaRequest(request: Request): Promise<Response> {
  let filePath: string;
  try {
    filePath = filePathFromUrl(request.url);
  } catch {
    return new Response("Bad media URL", { status: 400 });
  }

  let size: number;
  try {
    const stats = await fs.promises.stat(filePath);
    if (!stats.isFile()) return new Response("Not a file", { status: 404 });
    size = stats.size;
  } catch {
    return new Response("File not found", { status: 404 });
  }

  const headers: Record<string, string> = {
    "Content-Type": mimeTypeFor(filePath),
    "Accept-Ranges": "bytes",
  };

  const rangeHeader = request.headers.get("Range");
  const range = parseRange(rangeHeader, size);

  if (rangeHeader && !range) {
    return new Response(null, {
      status: 416,
      headers: { ...headers, "Content-Range": `bytes */${size}` },
    });
  }

  if (!range) {
    return new Response(bodyFor(filePath, 0, Math.max(size - 1, 0)), {
      status: 200,
      headers: { ...headers, "Content-Length": String(size) },
    });
  }

  return new Response(bodyFor(filePath, range.start, range.end), {
    status: 206,
    headers: {
      ...headers,
      "Content-Length": String(range.end - range.start + 1),
      "Content-Range": `bytes ${range.start}-${range.end}/${size}`,
    },
  });
}
