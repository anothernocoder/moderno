import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { writeFile } from 'node:fs/promises'
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
