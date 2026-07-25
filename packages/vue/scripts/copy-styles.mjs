// Copies src/styles.css into dist/ after the Vite library build (issue
// #154), so the package's "./styles.css" export — now pointing at
// dist/styles.css — resolves correctly from the built output instead of
// requiring src/ to ship in the published tarball.
import { copyFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const from = fileURLToPath(new URL('../src/styles.css', import.meta.url))
const distDir = fileURLToPath(new URL('../dist', import.meta.url))
const to = fileURLToPath(new URL('../dist/styles.css', import.meta.url))

mkdirSync(distDir, { recursive: true })
copyFileSync(from, to)
console.log('copied src/styles.css -> dist/styles.css')
