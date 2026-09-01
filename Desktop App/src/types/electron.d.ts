export {}

declare global {
  interface Window {
    harissa: {
      openFile: () => Promise<string[] | null>
      getPathForFile: (file: File) => string | null
      getArtwork: (filePath: string) => Promise<string | null>
      getLocale: () => Promise<string>
      onOpenFiles: (handler: (paths: string[]) => void) => () => void
    }
  }
}
