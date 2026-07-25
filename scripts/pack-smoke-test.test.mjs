import { test } from 'node:test'
import assert from 'node:assert/strict'
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

test('rejects a package path that does not exist', async () => {
  await assert.rejects(() => smokeTestPackage('packages/does-not-exist'))
})
