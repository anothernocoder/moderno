// Regenerate src/styles.css from the partials in src/partials, enforcing the
// class contract. Run via `pnpm --filter @moderno/styles build:css`.
// Node (>=23) strips types, so importing the .ts generator directly works.
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { legalNames } from '@moderno/class-contract'
import { assembleStyles, STYLE_SEGMENTS } from '../src/generate.ts'

const fromSrc = (rel) => fileURLToPath(new URL(`../src/${rel}`, import.meta.url))

const segments = STYLE_SEGMENTS.map((s) => ({
  kind: s.kind,
  name: s.name,
  css: readFileSync(fromSrc(s.file), 'utf8'),
}))

const css = assembleStyles(segments, legalNames())
writeFileSync(fromSrc('./styles.css'), css)
console.log(`styles.css regenerated from ${segments.length} segments — contract enforced.`)
