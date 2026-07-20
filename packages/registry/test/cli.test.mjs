import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const CLI = resolve(__dirname, '../bin/cli.mjs')

async function withTmpDir(t) {
  const dir = await mkdtemp(join(tmpdir(), 'moderno-registry-'))
  t.after(() => rm(dir, { recursive: true, force: true }))
  return dir
}

test('add copies the requested block+framework file to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'pricing', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /pricing/)
  const copied = await readFile(join(dest, 'Pricing.tsx'), 'utf8')
  assert.match(copied, /export function Pricing/)
})

test('add copies a different framework variant of the same block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'pricing', '--framework', 'vue', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'Pricing.vue'), 'utf8')
  assert.match(copied, /Moderno block — Pricing \(Vue\)/)
})

test('add copies the table block (applications domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'table', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /table/)
  const copied = await readFile(join(dest, 'Table.tsx'), 'utf8')
  assert.match(copied, /export function Table/)
})

test('add copies a different framework variant of the table block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'table', '--framework', 'svelte', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'Table.svelte'), 'utf8')
  assert.match(copied, /Moderno block — Table \(Svelte\)/)
})

test('add fails for an unknown block', async (t) => {
  const dest = await withTmpDir(t)

  assert.throws(() => {
    execFileSync('node', [CLI, 'add', 'does-not-exist', '--framework', 'react', '--dest', dest], {
      encoding: 'utf8',
      stdio: 'pipe',
    })
  })
})

test('list groups blocks by domain and includes the marketing pricing block', () => {
  const output = execFileSync('node', [CLI, 'list'], { encoding: 'utf8' })

  const sections = output.split(/\n\s*\n/).filter((section) => section.trim().length > 0)
  const marketingSection = sections.find((section) => section.includes('marketing'))

  assert.ok(marketingSection, 'expected a "marketing" domain group in list output')
  assert.match(marketingSection, /hero/)
  assert.match(marketingSection, /pricing/)
})

test('list groups blocks by domain and includes the applications table block', () => {
  const output = execFileSync('node', [CLI, 'list'], { encoding: 'utf8' })

  const sections = output.split(/\n\s*\n/).filter((section) => section.trim().length > 0)
  const applicationsSection = sections.find((section) => section.includes('applications'))

  assert.ok(applicationsSection, 'expected an "applications" domain group in list output')
  assert.match(applicationsSection, /stats/)
  assert.match(applicationsSection, /table/)
})
