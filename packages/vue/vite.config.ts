import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// Library build (issue #154): compiles the .vue SFCs + .ts sources under src/
// to a single ESM entry + rolled-up .d.ts under dist/.
//
// `vue` and `@zag-js/*` are real, independently-published, already-built npm
// packages, so they stay external (peer/runtime deps, not bundled in).
//
// `@moderno-ui/class-contract` and `@moderno-ui/chart-core` are workspace
// deps that do NOT have their own build yet (out of scope for this ticket —
// see issue #154 context). They ship raw .ts as their package "exports",
// which Vite/Rollup can transform fine at *this* build time, but which a
// plain `node` import of the *installed* @moderno-ui/vue package can't load
// at all — Node refuses TypeScript type-stripping for any file under
// node_modules. So instead of leaving them external, they're bundled
// straight into dist/index.js: by build time they're just compiled JS, no
// unbuilt sibling package needs to be resolvable at runtime. (Their .d.ts
// type-only imports still show up in dist/*.d.ts — that's a separate,
// TS-only resolution path unaffected by this JS bundling choice — so they
// stay listed in "dependencies" for consumers' type-checking.)
//
// styles.css isn't part of this build (no <style> blocks in any .vue SFC to
// extract); it's copied into dist/ separately by scripts/copy-styles.mjs.
const externalPackages = new Set(['vue'])
const externalPrefixes = ['@zag-js/']

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
