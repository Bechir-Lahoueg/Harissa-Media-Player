import { contextBridge, ipcRenderer, webUtils } from 'electron'
import type { IpcRendererEvent } from 'electron'

contextBridge.exposeInMainWorld('harissa', {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  /** Resolves a dropped File back to its path on disk. */
  getPathForFile: (file: File) => {
    try {
      return webUtils.getPathForFile(file)
    } catch {
      return null
    }
  },
  /** Cover art embedded in the file, as a data URL, or null when it has none. */
  getArtwork: (filePath: string) => ipcRenderer.invoke('media:artwork', filePath),
  /** The Windows display language, e.g. "fr-FR". */
  getLocale: (): Promise<string> => ipcRenderer.invoke('app:locale'),
  /**
   * Files handed to the app from outside: a launch argument, or a second launch
   * while this one is running. Returns an unsubscribe function.
   */
  onOpenFiles: (handler: (paths: string[]) => void) => {
    const listener = (_event: IpcRendererEvent, paths: string[]) => handler(paths)
    ipcRenderer.on('harissa:open', listener)
    return () => ipcRenderer.removeListener('harissa:open', listener)
  },
})
