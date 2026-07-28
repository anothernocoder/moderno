import { copyFile, mkdir } from 'node:fs/promises'
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  outDir: 'dist',
  async onSuccess() {
    // tsup doesn't handle CSS; copy the hand-authored stylesheets into dist so
    // `files: ["dist"]` alone is sufficient for `./styles.css`/`./tokens.css` to resolve.
    await mkdir('dist', { recursive: true })
    await copyFile('src/styles.css', 'dist/styles.css')
    await copyFile('src/tokens.css', 'dist/tokens.css')
  },
})
