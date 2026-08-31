# Harissa Media Player — Architecture

## 1. Architecture Overview

Harissa is a desktop-first media player built with Electron.

The application is divided into three major layers:

- Renderer
- Preload
- Main

The renderer is responsible for the user interface.
The preload layer provides a secure bridge between the renderer and main process.
The main process handles privileged desktop operations.

## 2. Process Architecture

### Renderer

Technology:
- React
- TypeScript
- Vite

Responsibilities:
- UI rendering
- Navigation
- User interactions
- Player controls
- Library views
- Queue state
- Search
- Visual feedback

The renderer must not directly access Node.js APIs.

### Preload

Technology:
- TypeScript
- Electron contextBridge / IPC

Responsibilities:
- Expose a controlled API to the renderer
- Communicate with the Electron main process
- Keep privileged functionality outside the renderer

The preload layer should expose only the APIs required by the application.

### Main Process

Technology:
- Electron
- TypeScript
- Node.js APIs

Responsibilities:
- Application lifecycle
- Native Windows functionality
- File and folder selection
- Filesystem operations
- Media engine integration
- IPC handlers
- Application-level services

## 3. Communication

Renderer and Main communicate through IPC.

The intended flow is:

Renderer
    ↓
Preload API
    ↓
IPC
    ↓
Main Process
    ↓
Operating System / Services

The renderer should never directly access privileged Node.js functionality.

## 4. Media Architecture

Media playback should be isolated behind a dedicated media service.

The UI should not directly depend on the underlying media engine.

Conceptually:

UI
 ↓
Player State
 ↓
Media Service
 ↓
Media Engine

This allows the media engine to be changed without rewriting the UI.

## 5. Library Architecture

The library will manage locally available media.

Conceptually:

Media Files
    ↓
Scanner
    ↓
Metadata Extraction
    ↓
Library
    ↓
Renderer

The library should support:

- Songs
- Artists
- Albums
- Recently Played
- Favorites
- Play Counts

## 6. Persistence

Application data should persist locally.

Initial persistent data may include:

- Library locations
- Recently played media
- Favorites
- Play counts
- Playback preferences
- Application settings
- Queue state where appropriate

No cloud account is required for V1.

## 7. Security

Electron security should be treated as a priority.

The application should:

- Keep Node.js APIs out of the renderer
- Use a preload bridge
- Expose minimal IPC APIs
- Validate IPC input
- Avoid unnecessary remote content
- Avoid enabling unrestricted Node.js access in the renderer

## 8. Application Layers

The project should be organized around responsibilities rather than putting all logic inside React components.

Target structure:

Renderer
- components
- pages
- features
- hooks
- state
- types

Electron
- main
- preload
- ipc
- services

Shared
- types
- constants
- utilities

## 9. Design Principle

Harissa should separate:

- UI
- application state
- desktop capabilities
- media playback
- persistence
- filesystem operations

Each layer should have a clear responsibility.

## 10. V1 Engineering Priorities

1. Application shell
2. Secure Electron bridge
3. File selection
4. Media playback
5. Player state
6. Library scanning
7. Metadata
8. Persistence
9. Search
10. Queue
11. Settings
12. Packaging for Windows