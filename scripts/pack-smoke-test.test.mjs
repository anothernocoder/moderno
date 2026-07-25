import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { smokeTestPackage } from './pack-smoke-test.mjs'

test('tokens: packs, installs outside the workspace, and resolves its exports', async () => {
  const result = await smokeTestPackage('packages/tokens')
  assert.equal(result.ok, true, JSON.stringify(result.checks, null, 2))
  assert.ok(result.checks.length > 0)
})

test('styles: resolves its internal @moderno-ui/tokens dependency without hitting the npm registry', async () => {
  const result = await smokeTestPackage('packages/styles')
  assert.equal(result.ok, true, JSON.stringify(result.checks, null, 2))
})

test('registry: installs the tarball and runs its bin', async () => {
  const result = await smokeTestPackage('packages/registry')
  assert.equal(result.ok, true, JSON.stringify(result.checks, null, 2))
  assert.ok(result.checks.some((c) => c.kind === 'bin'))
})

test('class-contract: packs, installs outside the workspace, and resolves its exports', async () => {
  const result = await smokeTestPackage('packages/class-contract')
  assert.equal(result.ok, true, JSON.stringify(result.checks, null, 2))
  assert.ok(result.checks.length > 0)
})

test('chart-core: packs, installs outside the workspace, and resolves its exports', async () => {
  const result = await smokeTestPackage('packages/chart-core')
  assert.equal(result.ok, true, JSON.stringify(result.checks, null, 2))
  assert.ok(result.checks.length > 0)
})

test('react: packs, installs outside the workspace, and renders Button with react-test-renderer against the built output', async () => {
  const result = await smokeTestPackage('packages/react', { keepInstallDir: true })
  try {
    // class-contract and chart-core (react's internal deps, packed alongside it
    // by smokeTestPackage) now ship built ESM dist output (see the class-contract
    // and chart-core tests above), so every export — including "." — must resolve
    // cleanly with no tolerated failures.
    assert.equal(result.ok, true, JSON.stringify(result.checks, null, 2))

    // Render an actual component from the freshly installed tarball using
    // React's test renderer. Bundle the entry with esbuild first (esbuild is
    // already a tsup dependency) so that any still-unbuilt internal deps get
    // transpiled on the fly, the same way tsup's own build handles them —
    // this exercises react's real built dist/index.js, not a mocked stand-in.
    execFileSync('npm', ['install', '--no-audit', '--no-fund', '--no-save', 'react-test-renderer', 'esbuild'], {
      cwd: result.installDir,
      encoding: 'utf8',
    })

    const entryPath = join(result.installDir, 'render-button.entry.mjs')
    await writeFile(
      entryPath,
      `
import { Button } from '@moderno-ui/react'
import TestRenderer, { act } from 'react-test-renderer'
import React from 'react'

globalThis.IS_REACT_ACT_ENVIRONMENT = true

let renderer
act(() => {
  renderer = TestRenderer.create(React.createElement(Button, { label: 'Click me' }))
})
const tree = renderer.toJSON()
if (!tree || tree.type !== 'button' || !tree.children?.includes('Click me')) {
  throw new Error('Button did not render as expected: ' + JSON.stringify(tree))
}
console.log('rendered ok')
`
    )

    const bundlePath = join(result.installDir, 'render-button.bundle.mjs')
    execFileSync(
      join(result.installDir, 'node_modules', '.bin', 'esbuild'),
      [
        entryPath,
        '--bundle',
        '--platform=node',
        '--format=esm',
        '--external:react',
        '--external:react-dom',
        '--external:react/jsx-runtime',
        '--external:react-test-renderer',
        `--outfile=${bundlePath}`,
      ],
      { cwd: result.installDir, encoding: 'utf8' }
    )

    const stdout = execFileSync(process.execPath, [bundlePath], { cwd: result.installDir, encoding: 'utf8' })
    assert.match(stdout, /rendered ok/)
  } finally {
    await rm(result.scratchRoot, { recursive: true, force: true })
  }
})

test('rejects a package path that does not exist', async () => {
  await assert.rejects(() => smokeTestPackage('packages/does-not-exist'))
})
