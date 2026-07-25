// @sveltejs/package packages every file under src/ verbatim (it has no
// include/exclude option — see https://github.com/sveltejs/kit/tree/main/packages/package).
// That means *.test.ts, *.fixture.svelte, and vitest.d.ts — none of which are
// part of the public API (nothing in src/index.ts imports them) — end up in
// dist/ too. Strip them post-build so the published package only ships the
// built component/util output. Run via `pnpm --filter @moderno-ui/svelte build`.
import { readdirSync, rmSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

const distDir = fileURLToPath(new URL('../dist', import.meta.url))

const isInternalOnly = (name) =>
  /\.test\.(js|d\.ts)$/.test(name) || /\.fixture\.svelte(\.d\.ts)?$/.test(name) || name === 'vitest.d.ts'

function removeInternalFiles(dir) {
  let removed = 0
  for (const entry of readdirSync(dir)) {
    const entryPath = join(dir, entry)
    if (statSync(entryPath).isDirectory()) {
      removed += removeInternalFiles(entryPath)
      continue
    }
    if (isInternalOnly(entry)) {
      rmSync(entryPath)
      removed++
    }
  }
  return removed
}

const removed = removeInternalFiles(distDir)
console.log(`clean-dist: removed ${removed} test/fixture file(s) not part of the public API.`)
