const NAMESPACE = "harissa-media-player-official";
const KEY = "site-downloads";
const BASE_URL = "https://abacus.jasoncameron.dev";

interface CounterResponse {
  value?: number;
  error?: string;
}

async function callCounter(action: "get" | "hit"): Promise<number | null> {
  try {
    const response = await fetch(`${BASE_URL}/${action}/${NAMESPACE}/${KEY}`, {
      // Lets the request complete even if the click also navigates away
      // to start the download.
      keepalive: true,
    });
    if (!response.ok) return null;
    const data = (await response.json()) as CounterResponse;
    return typeof data.value === "number" ? data.value : null;
  } catch {
    // Offline, or the service is down. The download still proceeds either way.
    return null;
  }
}

/** Reads the current tally without incrementing it. */
export function getDownloadCount(): Promise<number | null> {
  return callCounter("get");
}

/** Increments the tally by one and returns the new total. */
export function recordDownload(): Promise<number | null> {
  return callCounter("hit");
}
