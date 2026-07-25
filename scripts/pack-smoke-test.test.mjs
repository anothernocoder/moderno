import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { rm, writeFile } from 'node:fs/promises'
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

test('vue: resolves its internal @moderno-ui/* deps and renders a Button against the built output', async () => {
  const result = await smokeTestPackage('packages/vue', {
    postInstall: async ({ installDir }) => {
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

  const verifierPreamble = `
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

  const result = await smokeTestPackage('packages/svelte', { verifierPreamble, extraVerifierSource })

  const stylesCheck = result.checks.find((c) => c.specifier === '@moderno-ui/svelte/styles.css')
  const renderCheck = result.checks.find((c) => c.kind === 'render')

  assert.equal(stylesCheck?.ok, true, JSON.stringify(result.checks, null, 2))
  assert.equal(renderCheck?.ok, true, JSON.stringify(result.checks, null, 2))
})

// Solid's compiled output calls solid-js/web's DOM-only `template()` at
// module scope for every component (that's how Solid caches and clones each
// component's template once per module load) — so anything that imports
// @moderno-ui/solid's built output needs `document` (etc.) on globalThis
// *before* that import happens. Shared by the base export-resolution check
// (via `verifierPreamble`) and the custom reactivity check below.
const JSDOM_GLOBALS_PREAMBLE = `
import { JSDOM } from 'jsdom'

const dom = new JSDOM('<!doctype html><html><body></body></html>')
// Node >=21 already defines a few of these (navigator, in particular) as a
// non-configurable-looking accessor on globalThis, so overwrite defensively
// via defineProperty instead of plain assignment.
for (const [key, value] of Object.entries({
  window: dom.window,
  document: dom.window.document,
  navigator: dom.window.navigator,
  Node: dom.window.Node,
  Text: dom.window.Text,
  HTMLElement: dom.window.HTMLElement,
  customElements: dom.window.customElements,
  requestAnimationFrame: dom.window.requestAnimationFrame?.bind(dom.window) ?? ((cb) => setTimeout(cb, 0)),
  cancelAnimationFrame: dom.window.cancelAnimationFrame?.bind(dom.window) ?? clearTimeout,
})) {
  Object.defineProperty(globalThis, key, { value, writable: true, configurable: true })
}
`

// Verifier run inside the fresh scratch install (after the tarball is
// installed): renders Button from the *built* dist output and drives it with
// a signal update, to prove Solid's own JSX transform (fine-grained,
// signal-driven DOM patching) was applied — not a generic JSX-to-`createElement`
// transform, which would need a whole-component re-run (and typically a new
// DOM node) to reflect the same change.
const SOLID_REACTIVITY_VERIFIER = `
${JSDOM_GLOBALS_PREAMBLE}
import { createSignal } from 'solid-js'

// solid-js/web (and, through it, @moderno-ui/solid's built bundle) reads
// \`document\` at module scope. Static imports are hoisted and evaluated
// before this file's own top-level statements run, so they must be dynamic
// imports here, executed only after the jsdom globals above are installed.
const { render } = await import('solid-js/web')
const { Button } = await import('@moderno-ui/solid')

const checks = []
const container = document.createElement('div')
document.body.appendChild(container)

const [label, setLabel] = createSignal('Click me')
// A plain getter, mirroring what Solid's compiler emits for a dynamic JSX
// prop expression (e.g. <Button label={label()} />) — the prop stays a live
// accessor rather than a value snapshotted at call time.
const props = {
  get label() {
    return label()
  },
}

let dispose
try {
  dispose = render(() => Button(props), container)

  const button = container.querySelector('button')
  const initialText = button?.textContent
  checks.push({
    kind: 'component-render',
    specifier: '@moderno-ui/solid#Button (initial render)',
    ok: Boolean(button) && initialText === 'Click me' && button.className.includes('md-btn'),
    detail: !button
      ? 'Button did not render a <button> element'
      : \`textContent=\${JSON.stringify(initialText)} className=\${JSON.stringify(button.className)}\`,
  })

  setLabel('Updated')

  const buttonAfter = container.querySelector('button')
  const sameNode = buttonAfter === button
  const updatedText = buttonAfter?.textContent

  checks.push({
    kind: 'component-reactivity',
    specifier: '@moderno-ui/solid#Button (signal-driven update)',
    ok: sameNode && updatedText === 'Updated',
    detail: \`sameNode=\${sameNode} updatedText=\${JSON.stringify(updatedText)}\`,
  })
} catch (err) {
  checks.push({
    kind: 'component-reactivity',
    specifier: '@moderno-ui/solid#Button (signal-driven update)',
    ok: false,
    detail: err.stack ?? err.message,
  })
} finally {
  dispose?.()
}

process.stdout.write(JSON.stringify(checks))
`

test('solid: packs, installs outside the workspace, and Button reacts to a signal update against the built output', async () => {
  const result = await smokeTestPackage('packages/solid', {
    // solid-js's own `exports` map resolves to an SSR build under Node's
    // default "node" condition, whose DOM-only APIs deliberately throw
    // ("Client-only API called on the server side") — force "browser" (the
    // same fix packages/solid/vitest.config.ts applies for its own test
    // run) so `solid-js/web` resolves to the real DOM-patching build.
    conditions: ['browser'],
    // jsdom is only a devDependency (used for the package's own vitest
    // suite), so it isn't part of the packed tarball's installed deps —
    // pull it into the scratch install to give both the base export check
    // and the reactivity check below a DOM to import/render against.
    extraNpmPackages: ['jsdom@^29.1.1'],
    verifierPreamble: JSDOM_GLOBALS_PREAMBLE,
    postInstall: async ({ installDir }) => {
      const verifierPath = join(installDir, 'verify-reactivity.mjs')
      await writeFile(verifierPath, SOLID_REACTIVITY_VERIFIER)
      const stdout = execFileSync(process.execPath, ['--conditions=browser', verifierPath], {
        cwd: installDir,
        encoding: 'utf8',
      })
      return JSON.parse(stdout)
    },
  })

  assert.equal(result.ok, true, JSON.stringify(result.checks, null, 2))
  assert.ok(result.checks.some((c) => c.kind === 'component-render' && c.ok))
  assert.ok(result.checks.some((c) => c.kind === 'component-reactivity' && c.ok))
})

test('rejects a package path that does not exist', async () => {
  await assert.rejects(() => smokeTestPackage('packages/does-not-exist'))
})
