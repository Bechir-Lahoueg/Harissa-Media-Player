import { contextBridge, ipcRenderer, webUtils } from 'electron'

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
})
