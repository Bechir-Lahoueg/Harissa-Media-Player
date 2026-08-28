import { useState } from 'react'

function App() {
  const [mediaPath, setMediaPath] = useState<string | null>(null)
  const [mediaError, setMediaError] = useState<string | null>(null)

  const handleOpenFile = async () => {
    const filePath = await window.harissa.openFile()

    if (filePath) {
      setMediaError(null)
      setMediaPath(filePath)
    }
  }

  const isVideo = mediaPath?.toLowerCase().endsWith('.mp4')
  const mediaUrl = mediaPath ? `media://local/${encodeURIComponent(mediaPath)}` : null

  return (
    <main className="flex h-screen bg-zinc-950 text-white">
      <aside className="w-60 border-r border-zinc-800 p-6">
        <h1 className="text-2xl font-bold">Harissa</h1>

        <nav className="mt-8">
          <button className="w-full rounded-lg bg-zinc-800 px-4 py-3 text-left">
            Media
          </button>
        </nav>
      </aside>

      <section className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-3xl text-center">
          <h2 className="text-4xl font-bold">Harissa Media Player</h2>

          <p className="mt-3 text-zinc-400">
            Open a media file to start playing.
          </p>

          <button
            onClick={handleOpenFile}
            className="mt-6 rounded-lg bg-white px-6 py-3 font-medium text-black transition hover:bg-zinc-200"
          >
            Open File
          </button>

          {mediaPath && (
            <div className="mt-8">
              <p className="mb-4 truncate text-sm text-zinc-400">
                {mediaPath}
              </p>

              {isVideo ? (
                <video
                  src={mediaUrl ?? undefined}
                  controls
                  onError={(e) => {
                    const error = e.currentTarget.error
                    console.error('Media playback error:', error, mediaUrl)
                    setMediaError(error?.message ?? `Failed to load media (code ${error?.code})`)
                  }}
                  className="mx-auto max-h-[500px] w-full rounded-lg"
                />
              ) : (
                <audio
                  src={mediaUrl ?? undefined}
                  controls
                  onError={(e) => {
                    const error = e.currentTarget.error
                    console.error('Media playback error:', error, mediaUrl)
                    setMediaError(error?.message ?? `Failed to load media (code ${error?.code})`)
                  }}
                  className="w-full"
                />
              )}

              {mediaError && (
                <p className="mt-3 text-sm text-red-400">{mediaError}</p>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default App