import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('harissa', {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
})