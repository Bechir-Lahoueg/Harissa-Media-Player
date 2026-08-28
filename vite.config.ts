import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import electron from 'vite-plugin-electron'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),

    electron({
      entry: 'electron/main.ts',
    }),
  ],
})