import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import electron from 'vite-plugin-electron'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),

    electron([
      {
        entry: 'electron/main.ts',
        vite: {
          build: {
            rolldownOptions: {
              // Loaded from node_modules at runtime. Bundling it splits the main
              // process into chunks, which breaks the `electron` default import.
              external: ['music-metadata'],
            },
          },
        },
      },
      {
        entry: 'electron/preload.ts',
        vite: {
          build: {
            lib: {
              entry: 'electron/preload.ts',
              formats: ['cjs'],
              fileName: () => '[name].cjs',
            },
            rolldownOptions: {
              output: {
                format: 'cjs',
              },
            },
          },
        },
      },
    ]),
  ],
})
