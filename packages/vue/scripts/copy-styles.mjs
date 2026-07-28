// Copies src/styles.css and src/tokens.css into dist/ after the Vite library
// build (issue #154; tokens.css added in #173), so the package's
// "./styles.css"/"./tokens.css" exports — pointing at dist/ — resolve
// correctly from the built output instead of requiring src/ to ship in the
// published tarball.
import { copyFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const distDir = fileURLToPath(new URL('../dist', import.meta.url))
mkdirSync(distDir, { recursive: true })

for (const file of ['styles.css', 'tokens.css']) {
  const from = fileURLToPath(new URL(`../src/${file}`, import.meta.url))
  const to = fileURLToPath(new URL(`../dist/${file}`, import.meta.url))
  copyFileSync(from, to)
  console.log(`copied src/${file} -> dist/${file}`)
}
