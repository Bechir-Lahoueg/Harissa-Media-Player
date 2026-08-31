import { useRef, useState } from 'react'
import { PlayerControls } from './components/PlayerControls'

function App() {
  const [playlist, setPlaylist] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [mediaError, setMediaError] = useState<string | null>(null)
  const mediaRef = useRef<HTMLMediaElement>(null)

  const mediaPath = currentIndex >= 0 ? (playlist[currentIndex] ?? null) : null

  const handleOpenFile = async () => {
    const filePaths = await window.harissa.openFile()

    if (filePaths && filePaths.length > 0) {
      setMediaError(null)
      setPlaylist(filePaths)
      setCurrentIndex(0)
    }
  }

  const handlePrev = () => {
    setMediaError(null)
    setCurrentIndex((i) => Math.max(i - 1, 0))
  }

  const handleNext = () => {
    setMediaError(null)
    setCurrentIndex((i) => Math.min(i + 1, playlist.length - 1))
  }

  const isVideo = mediaPath?.toLowerCase().endsWith('.mp4') ?? false
  const mediaUrl = mediaPath ? `media://local/${encodeURIComponent(mediaPath)}` : null

  return (
    <main className="flex h-screen min-h-0 overflow-hidden bg-zinc-950 text-white">
      <aside className="hidden w-60 flex-shrink-0 border-r border-zinc-800 p-6 md:block">
        <h1 className="text-2xl font-bold">Harissa</h1>

        <nav className="mt-8">
          <button className="w-full rounded-lg bg-zinc-800 px-4 py-3 text-left">
            Media
          </button>
        </nav>
      </aside>

      <section className="flex min-w-0 flex-1 flex-col items-center justify-center gap-6 overflow-y-auto p-4 sm:p-8">
        <div className="w-full max-w-3xl text-center">
          <h2 className="text-2xl font-bold sm:text-4xl">Harissa Media Player</h2>

          <p className="mt-2 text-sm text-zinc-400 sm:mt-3">
            Open one or more media files to start playing.
          </p>

          <button
            onClick={handleOpenFile}
            className="mt-4 rounded-lg bg-white px-6 py-3 font-medium text-black transition hover:bg-zinc-200 sm:mt-6"
          >
            Open File
          </button>

          {mediaPath && (
            <div className="mt-6 sm:mt-8">
              <p className="mb-3 truncate text-sm text-zinc-400" title={mediaPath}>
                {mediaPath}
              </p>

              {isVideo ? (
                <video
                  ref={mediaRef as React.Ref<HTMLVideoElement>}
                  src={mediaUrl ?? undefined}
                  onError={(e) => {
                    const error = e.currentTarget.error
                    console.error('Media playback error:', error, mediaUrl)
                    setMediaError(error?.message ?? `Failed to load media (code ${error?.code})`)
                  }}
                  className="mx-auto max-h-[50vh] w-full rounded-lg bg-black"
                />
              ) : (
                <audio
                  ref={mediaRef as React.Ref<HTMLAudioElement>}
                  src={mediaUrl ?? undefined}
                  onError={(e) => {
                    const error = e.currentTarget.error
                    console.error('Media playback error:', error, mediaUrl)
                    setMediaError(error?.message ?? `Failed to load media (code ${error?.code})`)
                  }}
                  className="hidden"
                />
              )}

              {mediaError && (
                <p className="mt-3 text-sm text-red-400">{mediaError}</p>
              )}

              <div className="mt-6">
                <PlayerControls
                  mediaRef={mediaRef}
                  trackKey={mediaPath}
                  isVideo={isVideo}
                  canPrev={currentIndex > 0}
                  canNext={currentIndex >= 0 && currentIndex < playlist.length - 1}
                  onPrev={handlePrev}
                  onNext={handleNext}
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default App