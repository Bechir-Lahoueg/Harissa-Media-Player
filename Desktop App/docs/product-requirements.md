# Harissa Media Player

## Product Vision
Harissa is a modern, fast and privacy-focused media player for Windows,
designed to provide a clean user experience while supporting powerful
local media playback features.

## Platform
- Windows 10/11
- Desktop application
- Electron

## Technology
- React
- TypeScript
- Vite
- Electron

## V1 Objective
Build a reliable local media player capable of opening and playing
common audio and video files through a modern desktop interface.

## V1 Features

### Media
- Open individual media files
- Open folders
- Play video
- Play audio
- Pause / resume
- Seek (progress bar with elapsed / remaining time)
- Volume control
- Fullscreen
- Playback speed
- Shuffle
- Repeat / loop
- Skip next / previous track
- Persistent bottom player bar (art, title, artist, transport controls, progress, volume) visible across all views

### Library
- Recently played media
- Local media library, organized into: Trends, Artists, Albums, Songs
- Search bar (global, top of window)
- Basic metadata (title, artist, play count / duration)
- "Top Artists" grid view with cover art
- Featured / highlighted media banner (large "Trending" card)

### Now Playing / Queue
- "Currently Playing" panel (art, title, artist, source album)
- "Next Songs" queue list with thumbnails, titles, and durations

### Interface
- Modern desktop UI, dark theme
- Left sidebar navigation (Library section: Trends / Artists / Albums / Songs; Discover section: Browse / Radio-style local mixes / Favorites)
- Right-hand panel: Currently Playing + Next Songs queue
- Center: Player/library view (trending banner, top artists grid)
- Bottom: persistent playback bar
- Top-right: theme toggle, user/profile icon
- Player view
- Media library
- Settings

## Non-Goals for V1
- Cloud storage
- User accounts
- Online streaming services (note: reference UI shows "Store"/streaming-style browsing — these are out of scope for V1; local-equivalent views only)
- Social features
- Mobile applications