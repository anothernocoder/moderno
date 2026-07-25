#!/usr/bin/env node
/**
 * Pack-and-smoke-test harness (ticket #151, tracer bullet for #137).
 *
 * Given a package, packs it with `pnpm pack` (not `npm pack` — pnpm rewrites
 * `workspace:*` internal deps to real pinned versions at pack time; plain
 * `npm pack` leaves the literal `workspace:*` in the tarball's package.json,
 * which `npm install` outside the workspace can't resolve at all), installs
 * the tarball into a fresh scratch directory outside the pnpm workspace, and
 * exercises its public entry point: every `exports` subpath is resolved and
 * loaded, every `bin` command is invoked with no args.
 *
 * A package's internal `@moderno-ui/*` `dependencies` (e.g. styles -> tokens)
 * are packed and installed alongside it in the same `npm install` — installing
 * them together lets npm satisfy the internal dependency from the local
 * tarball instead of trying to fetch an unpublished package from the real
 * npm registry.
 *
 * Usage: node scripts/pack-smoke-test.mjs <package-dir-or-name> [...more]
 *   node scripts/pack-smoke-test.mjs packages/tokens packages/styles packages/registry
 *   node scripts/pack-smoke-test.mjs @moderno-ui/tokens
 */
import { execFileSync } from 'node:child_process'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(__dirname, '..')

function packageDirFor(pkgPathOrName) {
  if (pkgPathOrName.startsWith('@')) {
    const shortName = pkgPathOrName.split('/')[1]
    return resolve(REPO_ROOT, 'packages', shortName)
  }
  return resolve(REPO_ROOT, pkgPathOrName)
}

async function readManifest(pkgDir) {
  const raw = await readFile(join(pkgDir, 'package.json'), 'utf8').catch(() => {
    throw new Error(`no package.json in ${pkgDir}`)
  })
  return JSON.parse(raw)
}

// Internal @moderno-ui/* deps (transitive, "dependencies" only — devDependencies
// never ship to a real install) that must be packed and installed alongside the
// target package so npm can resolve them locally instead of hitting the registry.
async function collectInternalDeps(pkgDir, manifest, seen) {
  for (const depName of Object.keys(manifest.dependencies ?? {})) {
    if (!depName.startsWith('@moderno-ui/') || seen.has(depName)) continue
    const depDir = packageDirFor(depName)
    const depManifest = await readManifest(depDir)
    seen.set(depName, depDir)
    await collectInternalDeps(depDir, depManifest, seen)
  }
  return seen
}

function pnpmPack(pkgDir, destDir) {
  const output = execFileSync('pnpm', ['pack', '--pack-destination', destDir], {
    cwd: pkgDir,
    encoding: 'utf8',
  })
  return output.trim().split('\n').pop().trim()
}

function exportSpecifiers(manifest) {
  if (!manifest.exports) return []
  const keys = typeof manifest.exports === 'string' ? ['.'] : Object.keys(manifest.exports)
  return keys.map((subpath) => (subpath === '.' ? manifest.name : `${manifest.name}${subpath.slice(1)}`))
}

function buildVerifierSource(manifest, { verifierPreamble, extraVerifierSource } = {}) {
  const specifiers = exportSpecifiers(manifest)
  const binNames = Object.keys(manifest.bin ?? {})
  return `
${verifierPreamble ?? ''}

import { spawnSync } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const checks = []

for (const specifier of ${JSON.stringify(specifiers)}) {
  try {
    const resolvedUrl = import.meta.resolve(specifier)
    if (resolvedUrl.endsWith('.css')) {
      const content = await readFile(fileURLToPath(resolvedUrl), 'utf8')
      if (!content.trim()) throw new Error('resolved CSS file is empty')
    } else if (resolvedUrl.endsWith('.json')) {
      const mod = await import(resolvedUrl, { with: { type: 'json' } })
      if (mod.default === undefined) throw new Error('no default export')
    } else {
      const mod = await import(resolvedUrl)
      if (!mod || Object.keys(mod).length === 0) throw new Error('module has no exports')
    }
    checks.push({ kind: 'export', specifier, ok: true })
  } catch (err) {
    checks.push({ kind: 'export', specifier, ok: false, detail: err.message })
  }
}

for (const binName of ${JSON.stringify(binNames)}) {
  const result = spawnSync(process.execPath, [\`./node_modules/.bin/\${binName}\`], { encoding: 'utf8' })
  if (result.status === 0) {
    checks.push({ kind: 'bin', specifier: binName, ok: true })
  } else {
    checks.push({
      kind: 'bin',
      specifier: binName,
      ok: false,
      detail: \`exited \${result.status}: \${result.stderr || result.error?.message}\`,
    })
  }
}

${extraVerifierSource ?? ''}

process.stdout.write(JSON.stringify(checks))
`
}

/**
 * Packs pkgPathOrName (and its internal @moderno-ui/* deps), installs the
 * tarballs into a fresh scratch directory outside the pnpm workspace, and
 * exercises the package's public entry point (exports + bin).
 *
 * Returns { pkg, ok, checks, scratchRoot, installDir }, where checks is a flat
 * list of per-entry-point pass/fail results, and scratchRoot/installDir point
 * at the npm-install scratch directory used to run the checks.
 *
 * By default the scratch directory is removed before returning. Pass
 * `{ keepInstallDir: true }` to keep it around (e.g. to run additional,
 * package-specific checks against the freshly-installed tarball from the
 * caller's own process) — the caller is then responsible for removing
 * `scratchRoot` itself.
 *
 * `options.postInstall`, if given, is an async callback run against the same
 * scratch install *before* it's torn down — `({ installDir, pkgDir, manifest
 * }) => Promise<checks[]>` — for packages that need a stronger check than a
 * bare export-resolves smoke test (e.g. actually rendering a component
 * against the built output) from a separate process/toolchain of the
 * caller's choosing. Its returned checks (same `{ kind, specifier, ok,
 * detail? }` shape as the built-in ones) are folded into the result.
 *
 * `options.conditions`, if given, is a list of extra Node.js `--conditions`
 * flags to pass when running the built-in export-resolution check (e.g.
 * `['browser']` for a package whose compiled output calls DOM-only APIs at
 * module scope, and whose `exports` map requires the "browser" condition to
 * resolve to a build that provides them instead of an SSR/no-op stub).
 *
 * `options.extraNpmPackages`, if given, is a list of extra npm specifiers
 * (fetched from the real registry, not packed from the workspace) installed
 * alongside the tarballs — e.g. `['jsdom@^29.1.1']` to give a DOM-dependent
 * export-resolution check somewhere to render into.
 *
 * `options.verifierPreamble`, if given, is raw ESM source prepended to the
 * built-in export-resolution verifier script, run before it resolves/imports
 * each `exports` entry — e.g. to install jsdom globals, or register
 * `node:module` customization hooks so plain Node can load file types the
 * standard loader can't (such as `.svelte`), so that later imports —
 * including the standard export checks — succeed.
 *
 * `options.extraVerifierSource`, if given, is a snippet of ESM source spliced
 * in at the end of the generated verify.mjs (which runs from `installDir`,
 * against the freshly-installed tarball, before it's torn down, in the same
 * process/module-resolution context as `verifierPreamble` and the built-in
 * checks). It has an in-scope `checks` array to push additional `{ kind,
 * specifier, ok, detail? }` entries onto — use it for real, package-specific
 * checks (e.g. actually rendering a component) that need any loader hooks
 * registered by `verifierPreamble` to still be active.
 */
export async function smokeTestPackage(pkgPathOrName, options = {}) {
  const { keepInstallDir = false, postInstall, conditions, extraNpmPackages, verifierPreamble, extraVerifierSource } =
    options
  const pkgDir = packageDirFor(pkgPathOrName)
  const manifest = await readManifest(pkgDir)

  const internalDeps = await collectInternalDeps(pkgDir, manifest, new Map())

  const scratchRoot = await mkdtemp(join(tmpdir(), 'moderno-smoke-'))
  const tarballDir = join(scratchRoot, 'tarballs')
  const installDir = join(scratchRoot, 'install')
  try {
    await mkdir(tarballDir, { recursive: true })
    await mkdir(installDir, { recursive: true })

    const tarballs = [pnpmPack(pkgDir, tarballDir)]
    for (const depDir of internalDeps.values()) {
      tarballs.push(pnpmPack(depDir, tarballDir))
    }

    await writeFile(
      join(installDir, 'package.json'),
      JSON.stringify({ name: 'moderno-smoke-scratch', private: true, type: 'module', version: '0.0.0' }, null, 2)
    )

    execFileSync('npm', ['install', '--no-audit', '--no-fund', ...tarballs, ...(extraNpmPackages ?? [])], {
      cwd: installDir,
      encoding: 'utf8',
    })

    const verifierPath = join(installDir, 'verify.mjs')
    await writeFile(verifierPath, buildVerifierSource(manifest, { verifierPreamble, extraVerifierSource }))
    const nodeConditions = (conditions ?? []).map((condition) => `--conditions=${condition}`)
    const stdout = execFileSync(process.execPath, [...nodeConditions, verifierPath], {
      cwd: installDir,
      encoding: 'utf8',
    })
    const checks = JSON.parse(stdout)

    if (postInstall) {
      checks.push(...(await postInstall({ installDir, pkgDir, manifest })))
    }

    return { pkg: manifest.name, ok: checks.every((c) => c.ok), checks, scratchRoot, installDir }
  } finally {
    if (!keepInstallDir) {
      await rm(scratchRoot, { recursive: true, force: true })
    }
  }
}

async function main() {
  const targets = process.argv.slice(2)
  if (targets.length === 0) {
    console.error('usage: node scripts/pack-smoke-test.mjs <package-dir-or-name> [...more]')
    process.exit(1)
  }

  let allOk = true
  for (const target of targets) {
    const result = await smokeTestPackage(target)
    allOk &&= result.ok
    console.log(`\n${result.ok ? 'PASS' : 'FAIL'}  ${result.pkg}`)
    for (const check of result.checks) {
      console.log(`  ${check.ok ? 'ok' : 'FAIL'}  [${check.kind}] ${check.specifier}${check.detail ? ` — ${check.detail}` : ''}`)
    }
  }

  process.exit(allOk ? 0 : 1)
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}
