import { useCallback, useEffect, useRef, useState } from 'react'
import { FullscreenPlayer } from './components/FullscreenPlayer'
import { PlayerBar, type RepeatMode } from './components/PlayerBar'
import { QueuePanel } from './components/QueuePanel'
import { Sidebar } from './components/Sidebar'
import { Stage } from './components/Stage'
import { TopBar } from './components/TopBar'
import { useArtwork } from './hooks/useArtwork'
import { useIdle } from './hooks/useIdle'
import { useMediaPlayer } from './hooks/useMediaPlayer'
import { MEDIA_EXTENSIONS, extensionOf, isVideoFile } from './lib/media'

/** Pressing previous within this many seconds goes to the previous track rather than restarting. */
const RESTART_THRESHOLD_SECONDS = 3
/** How long the pointer must be still before the fullscreen chrome and cursor go. */
const CONTROLS_FADE_MS = 2000

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  return target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable
}

function App() {
  const [playlist, setPlaylist] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [mediaError, setMediaError] = useState<string | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [queueOpen, setQueueOpen] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState<RepeatMode>('off')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isDropTarget, setIsDropTarget] = useState(false)

  const shellRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLVideoElement>(null)
  const autoPlayRef = useRef(false)
  const endedRef = useRef<() => void>(() => {})

  const trackPath = currentIndex >= 0 ? (playlist[currentIndex] ?? null) : null
  const mediaUrl = trackPath ? `media://local/${encodeURIComponent(trackPath)}` : null
  const isVideo = trackPath ? isVideoFile(trackPath) : false

  const player = useMediaPlayer(mediaRef, trackPath, {
    onEnded: () => endedRef.current(),
  })
  const artwork = useArtwork(trackPath)

  const goTo = useCallback((index: number, autoPlay = true) => {
    autoPlayRef.current = autoPlay
    setMediaError(null)
    setCurrentIndex(index)
  }, [])

  /** The track that follows this one, or null when the queue has run out. */
  const nextIndex = useCallback((): number | null => {
    if (playlist.length === 0) return null
    if (shuffle) {
      if (playlist.length === 1) return repeat === 'off' ? null : currentIndex
      let candidate = currentIndex
      while (candidate === currentIndex) {
        candidate = Math.floor(Math.random() * playlist.length)
      }
      return candidate
    }
    if (currentIndex < playlist.length - 1) return currentIndex + 1
    return repeat === 'all' ? 0 : null
  }, [playlist.length, shuffle, repeat, currentIndex])

  const handleNext = useCallback(() => {
    const next = nextIndex()
    if (next !== null) goTo(next)
  }, [nextIndex, goTo])

  const handlePrev = useCallback(() => {
    if (player.currentTime > RESTART_THRESHOLD_SECONDS) {
      player.seekTo(0)
      return
    }
    if (currentIndex > 0) {
      goTo(currentIndex - 1)
    } else if (repeat === 'all' && playlist.length > 0) {
      goTo(playlist.length - 1)
    } else {
      player.seekTo(0)
    }
  }, [player, currentIndex, repeat, playlist.length, goTo])

  // Kept in a ref so the media element's `ended` listener never has to rebind.
  useEffect(() => {
    endedRef.current = () => {
      if (repeat === 'one') {
        player.seekTo(0)
        player.play()
        return
      }
      const next = nextIndex()
      if (next !== null) goTo(next)
    }
  })

  /** Appends dropped files; starts playing only when nothing is loaded yet. */
  const addToQueue = useCallback(
    (paths: string[]) => {
      if (paths.length === 0) return
      const wasEmpty = playlist.length === 0 || currentIndex < 0
      setMediaError(null)
      setPlaylist((previous) => [...previous, ...paths])
      if (wasEmpty) {
        goTo(0)
      } else {
        setQueueOpen(true)
      }
    },
    [playlist.length, currentIndex, goTo],
  )

  const handleOpenFiles = useCallback(async () => {
    const filePaths = await window.harissa.openFile()
    if (!filePaths || filePaths.length === 0) return
    // Opening from the dialog replaces the queue; dropping files appends to it.
    setMediaError(null)
    setPlaylist(filePaths)
    goTo(0)
  }, [goTo])

  const handleRemove = useCallback(
    (index: number) => {
      const remaining = playlist.filter((_, i) => i !== index)
      setPlaylist(remaining)

      if (remaining.length === 0) {
        setCurrentIndex(-1)
      } else if (index < currentIndex) {
        setCurrentIndex(currentIndex - 1)
      } else if (index === currentIndex) {
        // The playing track was dropped; slide onto whatever took its place.
        autoPlayRef.current = player.isPlaying
        setCurrentIndex(Math.min(currentIndex, remaining.length - 1))
      }
    },
    [playlist, currentIndex, player.isPlaying],
  )

  const handleClear = useCallback(() => {
    setPlaylist([])
    setCurrentIndex(-1)
    setMediaError(null)
  }, [])

  const toggleFullscreen = useCallback(() => {
    const shell = shellRef.current
    if (!shell || !isVideo) return
    if (document.fullscreenElement) {
      void document.exitFullscreen()
    } else {
      void shell.requestFullscreen().catch(() => {
        /* Refused by the platform; the button simply stays inactive. */
      })
    }
  }, [isVideo])

  const cycleRepeat = useCallback(() => {
    setRepeat((mode) => (mode === 'off' ? 'all' : mode === 'all' ? 'one' : 'off'))
  }, [])

  // Start the new source once it is ready, but only when the change was a
  // deliberate play action rather than, say, a track being removed.
  useEffect(() => {
    const media = mediaRef.current
    if (!media) return

    if (!mediaUrl) {
      // Emptying the queue must also stop the sound and let go of the file.
      media.pause()
      media.removeAttribute('src')
      media.load()
      return
    }

    if (!autoPlayRef.current) return
    autoPlayRef.current = false
    const onCanPlay = () => player.play()
    media.addEventListener('canplay', onCanPlay, { once: true })
    return () => media.removeEventListener('canplay', onCanPlay)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaUrl])

  useEffect(() => {
    const onChange = () => setIsFullscreen(document.fullscreenElement !== null)
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return

      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'o':
            e.preventDefault()
            void handleOpenFiles()
            return
          case 'b':
            e.preventDefault()
            setSidebarCollapsed((c) => !c)
            return
          case 'j':
            e.preventDefault()
            setQueueOpen((o) => !o)
            return
          default:
            return
        }
      }

      if (!trackPath) return

      switch (e.key) {
        case ' ':
          e.preventDefault()
          player.togglePlay()
          break
        case 'ArrowLeft':
          e.preventDefault()
          player.stopSeeking(-1)
          break
        case 'ArrowRight':
          e.preventDefault()
          player.stopSeeking(1)
          break
        case 'ArrowUp':
          e.preventDefault()
          player.volumeStep(1)
          break
        case 'ArrowDown':
          e.preventDefault()
          player.volumeStep(-1)
          break
        case 'm':
        case 'M':
          player.toggleMute()
          break
        case 'f':
        case 'F':
          toggleFullscreen()
          break
        case 'n':
        case 'N':
          handleNext()
          break
        case 'p':
        case 'P':
          handlePrev()
          break
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [trackPath, player, toggleFullscreen, handleNext, handlePrev, handleOpenFiles])

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDropTarget(false)
    const paths = Array.from(e.dataTransfer.files)
      .map((file) => window.harissa.getPathForFile(file))
      .filter((path): path is string => Boolean(path))
      .filter((path) => MEDIA_EXTENSIONS.includes(extensionOf(path)))
    addToQueue(paths)
  }

  const canNext =
    playlist.length > 0 && (currentIndex < playlist.length - 1 || repeat === 'all' || shuffle)
  const canPrev = trackPath !== null

  // The stage already carries the position in the queue; don't repeat it here.
  const context = trackPath ? 'Now playing' : 'No media open'

  // In fullscreen the chrome fades once the pointer is still, but stays up while
  // paused so the state is never a mystery. The cursor goes either way — a still
  // pointer over a still picture is just clutter.
  const idle = useIdle(isFullscreen, CONTROLS_FADE_MS)
  const controlsVisible = !idle || !player.isPlaying
  const cursorHidden = isFullscreen && idle

  return (
    <div
      ref={shellRef}
      className={`relative flex h-full flex-col bg-ink ${
cursorHidden ? 'hide-cursor' : ''
      }`}
      onDragOver={(e) => {
        e.preventDefault()
        setIsDropTarget(true)
      }}
      onDragLeave={(e) => {
        if (e.currentTarget === e.target) setIsDropTarget(false)
      }}
      onDrop={handleDrop}
    >
      {!isFullscreen && (
        <TopBar
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed((c) => !c)}
          queueOpen={queueOpen}
          onToggleQueue={() => setQueueOpen((o) => !o)}
          queueCount={playlist.length}
          context={context}
        />
      )}

      <div className="flex min-h-0 flex-1">
        {!isFullscreen && (
          <Sidebar
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed((c) => !c)}
            queueOpen={queueOpen}
            onShowNowPlaying={() => setQueueOpen(false)}
            onShowQueue={() => setQueueOpen(true)}
            queueCount={playlist.length}
            onOpenFiles={handleOpenFiles}
          />
        )}

        {/* The Stage stays mounted in fullscreen so the <video> is never torn
            down and playback carries straight through the transition. */}
        <Stage
          mediaRef={mediaRef}
          mediaUrl={mediaUrl}
          trackPath={trackPath}
          artwork={artwork}
          isVideo={isVideo}
          isPlaying={player.isPlaying}
          duration={player.duration}
          position={currentIndex + 1}
          total={playlist.length}
          error={mediaError}
          immersive={isFullscreen}
          onError={setMediaError}
          onOpenFiles={handleOpenFiles}
          onTogglePlay={player.togglePlay}
        />

        <QueuePanel
          open={queueOpen && !isFullscreen}
          tracks={playlist}
          currentIndex={currentIndex}
          isPlaying={player.isPlaying}
          onSelect={(index) => goTo(index)}
          onRemove={handleRemove}
          onClear={handleClear}
          onClose={() => setQueueOpen(false)}
          onOpenFiles={handleOpenFiles}
        />
      </div>

      {!isFullscreen && (
        <PlayerBar
          player={player}
          trackPath={trackPath}
          artwork={artwork}
          mediaUrl={mediaUrl}
          isVideo={isVideo}
          isFullscreen={isFullscreen}
          canPrev={canPrev}
          canNext={canNext}
          onPrev={handlePrev}
          onNext={handleNext}
          shuffle={shuffle}
          onToggleShuffle={() => setShuffle((s) => !s)}
          repeat={repeat}
          onCycleRepeat={cycleRepeat}
          onToggleFullscreen={toggleFullscreen}
        />
      )}

      {isFullscreen && (
        <FullscreenPlayer
          player={player}
          trackPath={trackPath}
          position={currentIndex + 1}
          total={playlist.length}
          visible={controlsVisible}
          canPrev={canPrev}
          canNext={canNext}
          onPrev={handlePrev}
          onNext={handleNext}
          shuffle={shuffle}
          onToggleShuffle={() => setShuffle((s) => !s)}
          repeat={repeat}
          onCycleRepeat={cycleRepeat}
          onExit={toggleFullscreen}
        />
      )}

      {isDropTarget && (
        <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center bg-ink/70 backdrop-blur-[2px]">
          <div className="rounded-panel border-2 border-dashed border-flame px-8 py-6 text-center">
            <div className="font-display text-[20px] font-semibold tracking-[-0.02em] text-cream">
              Drop to add to the queue
            </div>
            <div className="tnum mt-1 text-[10px] uppercase tracking-[0.2em] text-ash-dim">
              Audio and video files
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
