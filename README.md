<div align="center">

<img src="Web/public/logo.png" alt="Harissa" width="120" />

# Harissa Media Player

**The spicy way to play.**

A small, free media player for Windows. Open your music or a video
and it plays. No account, no library to set up, nothing uploaded.

</div>

---

## Download

> **Not released yet.** The player works, but it still has to be packaged
> into a Windows installer. There is nothing to download at the moment.

| | |
| --- | --- |
| **Version** | V1 — in development |
| **Platform** | Windows 10 and 11 (x64) |
| **Installer** | Coming with the first public release |
| **Price** | Free, open source |

When it is ready the installer goes on the
[releases page](https://github.com/Bechir-Lahoueg/Harissa-Media-Player/releases)
and on the website. Watch this repository if you want to know the day it lands.

Until then you can [run it from source](#run-it-from-source-today).

### What installing will look like

1. Download `Harissa Setup.exe`
2. Run the installer
3. Follow the Windows installation steps
4. Launch Harissa from the Start menu

## What it looks like

![Harissa playing a track](Web/public/screenshots/harissa-playing.png)

## What Harissa does

| Feature | |
| --- | --- |
| Open local media files | Standard Windows file dialog, multiple selection |
| Drag and drop | Drop files onto the window to open them |
| MP3 playback | Local audio files |
| MP4 playback | Local video files |
| Further formats | WAV, FLAC, OGG, M4A, MKV, WebM, MOV and more open too — they play when the media engine can decode them |
| Queue | Open several files and they line up, with a filter, shuffle and repeat |
| Play and pause | Space, or the transport button |
| Seeking | Drag the progress bar, or jump 10 seconds with the arrow keys |
| Volume and mute | 5% steps, and muting remembers your level |
| Playback progress | Elapsed time and duration |
| Fullscreen | For video |
| Cover art | Artwork embedded in a file, shown while it plays |
| Resizable window | Custom title bar, down to 900 × 560 |

### What it does not do

No accounts, no cloud, no streaming service, no analytics, and nothing running in
the background going through your folders.

Harissa reads the files you pick, from wherever they already are, and plays them.
Nothing is copied and nothing is uploaded. It works fine with the wifi off.

## Keyboard shortcuts

| Keys | Action |
| --- | --- |
| `Space` | Play or pause |
| `←` / `→` | Back or forward 10 seconds |
| `↑` / `↓` | Volume up or down |
| `M` | Mute or unmute |
| `N` / `P` | Next or previous track |
| `F` | Fullscreen (video) |
| `Esc` | Leave fullscreen |
| `Ctrl + O` | Open files |
| `Ctrl + B` | Show or hide the sidebar |
| `Ctrl + J` | Show or hide the queue |

## Run it from source today

You need [Node.js](https://nodejs.org) 20.19 or newer and Git.

```bash
git clone https://github.com/Bechir-Lahoueg/Harissa-Media-Player.git
cd "Harissa-Media-Player/Desktop App"
npm install
npm run dev
```

The Harissa window opens on its own. Leave the terminal running — closing it
stops the application.

## Documentation

Full documentation lives in the `Web/` folder of this repository and is published
as the project website: installation, a user guide, the technical architecture,
development setup, the roadmap and an FAQ.

```bash
cd Harissa-Media-Player/Web
npm install
npm run dev      # http://localhost:3000
```

## Repository layout

```text
Harissa-Media-Player/
├── Desktop App/          The Electron media player
│   ├── electron/         Main process and preload bridge
│   ├── src/              React renderer — the interface
│   └── docs/             Design notes and product requirements
└── Web/                  The documentation website (Next.js)
    ├── app/              Routes and pages
    ├── components/       Reusable interface components
    ├── lib/              Site content as data
    └── public/           Logo and screenshots
```

## Built with

React · TypeScript · Vite · Tailwind CSS · Electron

## Roadmap

**V1** — local MP3 and MP4 playback, the controls listed above, and a Windows
installer.

**After V1 (ideas, not commitments)** — broader codec support, playlists, a media
library, metadata and cover art, subtitles, deeper Windows integration, playback
speed, and performance work.

## Licence

To be confirmed before the V1 release.
