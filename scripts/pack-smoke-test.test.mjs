import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { smokeTestPackage } from './pack-smoke-test.mjs'

// Renders <Button variant="primary">Click me</Button> via vue/server-renderer
// against the freshly-installed tarball's *built* output (dist/index.js) —
// not the monorepo source — and checks the resulting HTML carries both the
// slot content and the class-contract-derived `md-btn` class. This is a real
// exercise of the compiled component, not just an import/resolve check.
const vueButtonRenderSource = `
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Button } from '@moderno-ui/vue'

const app = createSSRApp({ render: () => h(Button, { variant: 'primary' }, () => 'Click me') })
const html = await renderToString(app)
if (!html.includes('Click me') || !html.includes('md-btn')) {
  throw new Error(\`unexpected render output: \${html}\`)
}
process.stdout.write(html)
`

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

test('vue: resolves its bundled internal deps and renders a Button against the built output', async () => {
  const result = await smokeTestPackage('packages/vue', {
    extraChecks: async ({ installDir }) => {
      const verifierPath = join(installDir, 'verify-render.mjs')
      await writeFile(verifierPath, vueButtonRenderSource)
      try {
        const stdout = execFileSync(process.execPath, [verifierPath], { cwd: installDir, encoding: 'utf8' })
        return [{ kind: 'render', specifier: 'Button', ok: true, detail: stdout.trim() }]
      } catch (err) {
        return [{ kind: 'render', specifier: 'Button', ok: false, detail: err.stderr?.toString() ?? err.message }]
      }
    },
  })
  assert.equal(result.ok, true, JSON.stringify(result.checks, null, 2))
  assert.ok(result.checks.some((c) => c.kind === 'render' && c.ok))
})

test('rejects a package path that does not exist', async () => {
  await assert.rejects(() => smokeTestPackage('packages/does-not-exist'))
})
