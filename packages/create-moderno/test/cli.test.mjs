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
  const dir = await mkdtemp(join(tmpdir(), 'create-moderno-'))
  t.after(() => rm(dir, { recursive: true, force: true }))
  return dir
}

test('scaffolds a Vite + React project pre-wired with Moderno', async (t) => {
  const parent = await withTmpDir(t)
  const target = join(parent, 'my-app')

  const output = execFileSync('node', [CLI, target, '--framework', 'react'], { encoding: 'utf8' })
  assert.match(output, /Scaffolded a Moderno-ready react project/)

  const pkg = JSON.parse(await readFile(join(target, 'package.json'), 'utf8'))
  assert.equal(pkg.dependencies['@moderno-ui/react'], 'latest')
  assert.equal(pkg.dependencies['@moderno-ui/tokens'], 'latest')
  // create-vite's own deps must survive untouched.
  assert.ok(pkg.dependencies.react)

  const entry = await readFile(join(target, 'src/main.tsx'), 'utf8')
  assert.match(entry, /import '@moderno-ui\/tokens\/tokens\.css'/)
  assert.match(entry, /import '@moderno-ui\/react\/styles\.css'/)

  const indexHtml = await readFile(join(target, 'index.html'), 'utf8')
  assert.match(indexHtml, /<html[^>]*\bdata-theme="dark"[^>]*>/)
})

test('does not copy any Moderno block/screen/flow into the generated project', async (t) => {
  const parent = await withTmpDir(t)
  const target = join(parent, 'my-app')

  execFileSync('node', [CLI, target, '--framework', 'react'], { encoding: 'utf8' })

  const entry = await readFile(join(target, 'src/main.tsx'), 'utf8')
  assert.doesNotMatch(entry, /Moderno block/)
})

test('fails with a clear message when --framework is omitted and there is no TTY', async (t) => {
  const parent = await withTmpDir(t)
  const target = join(parent, 'my-app')

  assert.throws(() => execFileSync('node', [CLI, target], { encoding: 'utf8' }), /--framework/)
})

test('fails with a clear message when the target directory is missing', async (t) => {
  assert.throws(() => execFileSync('node', [CLI], { encoding: 'utf8' }), /Missing target directory/)
})
