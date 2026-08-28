export {}

declare global {
  interface Window {
    harissa: {
      openFile: () => Promise<string | null>
    }
  }
}