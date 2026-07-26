import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// Library build (issue #154): compiles the .vue SFCs + .ts sources under src/
// to a single ESM entry + rolled-up .d.ts under dist/.
//
// `vue`, `@zag-js/*`, and `@moderno-ui/*` are all real, independently-built
// npm packages (class-contract/chart-core gained their own tsup build in
// issue #152 — turbo's `^build` ordering builds them before this package),
// so they all stay external (peer/runtime deps, not bundled in) rather than
// duplicating their compiled output inside dist/index.js.
//
// styles.css isn't part of this build (no <style> blocks in any .vue SFC to
// extract); it's copied into dist/ separately by scripts/copy-styles.mjs.
const externalPackages = new Set(['vue'])
const externalPrefixes = ['@zag-js/', '@moderno-ui/']

export default defineConfig({
  plugins: [
    vue(),
    dts({
      entryRoot: 'src',
      include: ['src/**/*.ts', 'src/**/*.vue'],
      exclude: ['src/**/*.test.ts', '**/*.test.ts'],
      insertTypesEntry: true,
    }),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external: (id) => {
        if (id.startsWith('.') || id.startsWith('/')) return false
        if (externalPackages.has(id)) return true
        return externalPrefixes.some((prefix) => id.startsWith(prefix))
      },
    },
  },
})
