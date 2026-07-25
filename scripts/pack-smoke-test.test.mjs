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

test('svelte: packs, installs outside the workspace, resolves styles.css, and renders Button against the built output', async () => {
  // @sveltejs/package ships components as raw, preprocessed .svelte files —
  // consumers are expected to compile them with their own bundler (Vite,
  // SvelteKit, ...), so a bare `import()` of the package's "." export from
  // plain Node can never succeed (Node has no loader for the .svelte
  // extension), independent of anything this repo controls. On top of that,
  // several components pull in @zag-js/svelte, whose own build (also via
  // @sveltejs/package) ships an `exports["."]` with only `types`/`svelte`
  // conditions and no `default`/`import` fallback, plus extensionless
  // relative imports (`./merge-props`) that only resolve under a bundler's
  // relaxed resolution — again outside this package's control. So instead of
  // asserting `result.ok` (which bakes in "the whole barrel bare-imports
  // under plain Node", not achievable for any Svelte component library with
  // these dependencies), this test registers a minimal loader that only
  // strips TypeScript from `.ts` files (letting Node load
  // @moderno-ui/class-contract's raw-TS "." export), compiles the *built*
  // dist/Button.svelte with `svelte/compiler` (`generate: 'server'`), and
  // renders it with `svelte/server` — a real, pragmatic exercise of the
  // packaged output per ticket #155's acceptance criteria.
  const tsStripLoaderSource = `
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { stripTypeScriptTypes } from 'node:module'

export async function load(url, context, nextLoad) {
  if (url.endsWith('.ts') && !url.endsWith('.d.ts')) {
    const source = await readFile(fileURLToPath(url), 'utf8')
    const stripped = stripTypeScriptTypes(source, { mode: 'strip' })
    return { format: 'module', source: stripped, shortCircuit: true }
  }
  return nextLoad(url, context)
}
`

  const extraSetupSource = `
const { writeFile: __writeLoader } = await import('node:fs/promises')
await __writeLoader('./ts-strip-loader.mjs', ${JSON.stringify(tsStripLoaderSource)})
const { register } = await import('node:module')
const { pathToFileURL } = await import('node:url')
register(pathToFileURL('./ts-strip-loader.mjs').href, import.meta.url)
`

  const extraVerifierSource = `
try {
  const { readFile, writeFile, mkdir } = await import('node:fs/promises')
  const { compile } = await import('svelte/compiler')
  const path = await import('node:path')
  const { pathToFileURL } = await import('node:url')

  const svelteSrc = await readFile('./node_modules/@moderno-ui/svelte/dist/Button.svelte', 'utf8')
  const { js } = compile(svelteSrc, { filename: 'Button.svelte', generate: 'server' })

  await mkdir('./.smoke-render', { recursive: true })
  const compiledPath = path.resolve('./.smoke-render/Button.server.js')
  await writeFile(compiledPath, js.code)

  const { default: Button } = await import(pathToFileURL(compiledPath).href)
  const { render } = await import('svelte/server')
  const { body } = render(Button, { props: { label: 'Click me' } })

  if (!body.includes('<button') || !body.includes('Click me')) {
    throw new Error('rendered output missing expected markup: ' + body)
  }

  checks.push({ kind: 'render', specifier: '@moderno-ui/svelte#Button', ok: true })
} catch (err) {
  checks.push({ kind: 'render', specifier: '@moderno-ui/svelte#Button', ok: false, detail: err.stack || err.message })
}
`

  const result = await smokeTestPackage('packages/svelte', { extraSetupSource, extraVerifierSource })

  const stylesCheck = result.checks.find((c) => c.specifier === '@moderno-ui/svelte/styles.css')
  const renderCheck = result.checks.find((c) => c.kind === 'render')

  assert.equal(stylesCheck?.ok, true, JSON.stringify(result.checks, null, 2))
  assert.equal(renderCheck?.ok, true, JSON.stringify(result.checks, null, 2))
})

test('rejects a package path that does not exist', async () => {
  await assert.rejects(() => smokeTestPackage('packages/does-not-exist'))
})
