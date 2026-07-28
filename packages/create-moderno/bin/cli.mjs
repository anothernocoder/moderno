#!/usr/bin/env node
/**
 * create-moderno — scaffolds a brand-new project pre-wired with Moderno (the
 * "Starter" distribution tier, ADR-0006), invoked via `npm create moderno@latest`.
 *
 * Usage:
 *   npm create moderno@latest <target-dir> -- --framework react
 *
 * v1 only ships the React+Vite template — the framework prompt only ever lists
 * what actually exists (Vue lands in a follow-up ticket, see issue #138), so
 * there's no "coming soon" entry to pick.
 */
import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { createInterface } from 'node:readline/promises'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { basename, dirname, join, resolve } from 'node:path'

const require = createRequire(import.meta.url)

// Keyed so a follow-up ticket can add `vue` here without touching the flow below.
const FRAMEWORKS = {
  react: {
    viteTemplate: 'react-ts',
    entryFile: 'src/main.tsx',
    packageName: '@moderno-ui/react',
  },
}

function parseArgs(argv) {
  const positional = []
  const flags = {}
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg.startsWith('--')) {
      flags[arg.slice(2)] = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true
    } else {
      positional.push(arg)
    }
  }
  return { positional, flags }
}

function fail(message) {
  console.error(`\x1b[31m✖\x1b[0m ${message}`)
  process.exit(1)
}

async function promptFramework() {
  if (!process.stdin.isTTY) {
    fail('Missing --framework <react>. Pass it explicitly when running non-interactively.')
  }
  const rl = createInterface({ input: process.stdin, output: process.stdout })
  const answer = (await rl.question('Which framework? (react) ')).trim().toLowerCase()
  rl.close()
  return answer || 'react'
}

/**
 * Scaffolds via create-vite's own template, unmodified — Moderno wiring happens after.
 *
 * create-vite joins its target-dir argument onto its own cwd with `path.join`, which
 * (unlike `path.resolve`) doesn't re-root on a leading slash — passed an absolute
 * targetDir directly, it would nest the project under create-vite's cwd instead.
 * Running it from targetDir's parent with just the basename sidesteps that.
 */
async function runCreateVite(targetDir, viteTemplate) {
  const createViteBin = require.resolve('create-vite/index.js')
  const parentDir = dirname(targetDir)
  await mkdir(parentDir, { recursive: true })
  execFileSync(process.execPath, [createViteBin, basename(targetDir), '--template', viteTemplate], {
    cwd: parentDir,
    stdio: 'inherit',
  })
}

// 'latest' (not a pinned version) so this file never goes stale against Moderno's
// own release cadence — matches the unpinned `npm install @moderno-ui/react` in the docs.
async function addDependencies(targetDir, packageName) {
  const pkgPath = join(targetDir, 'package.json')
  const pkg = JSON.parse(await readFile(pkgPath, 'utf8'))
  pkg.dependencies = {
    ...pkg.dependencies,
    [packageName]: 'latest',
    '@moderno-ui/tokens': 'latest',
  }
  await writeFile(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`)
}

/** Prepends the token/style CSS imports so components render styled from the first run. */
async function wireEntryImports(targetDir, entryFile, packageName) {
  const entryPath = join(targetDir, entryFile)
  const content = await readFile(entryPath, 'utf8')
  const imports = `import '@moderno-ui/tokens/tokens.css'\nimport '${packageName}/styles.css'\n`
  await writeFile(entryPath, imports + content)
}

/** Matches Moderno's dark-first default (see the installation docs). */
async function setDarkTheme(targetDir) {
  const indexPath = join(targetDir, 'index.html')
  const html = await readFile(indexPath, 'utf8')
  const updated = html.replace(/<html\b([^>]*)>/, (full, attrs) =>
    /\bdata-theme=/.test(attrs) ? full : `<html${attrs} data-theme="dark">`,
  )
  await writeFile(indexPath, updated)
}

async function scaffold(targetDir, framework) {
  const config = FRAMEWORKS[framework]
  if (!config) fail(`Unknown framework: ${framework}. Use one of: ${Object.keys(FRAMEWORKS).join(', ')}`)

  await runCreateVite(targetDir, config.viteTemplate)
  await addDependencies(targetDir, config.packageName)
  await wireEntryImports(targetDir, config.entryFile, config.packageName)
  await setDarkTheme(targetDir)

  console.log(`\x1b[32m✔\x1b[0m Scaffolded a Moderno-ready ${framework} project in ${targetDir}`)
}

async function main() {
  const { positional, flags } = parseArgs(process.argv.slice(2))
  if (!positional[0]) fail('Missing target directory. E.g.: npm create moderno@latest my-app -- --framework react')
  const targetDir = resolve(process.cwd(), positional[0])

  const framework = flags.framework || flags.f || (await promptFramework())
  await scaffold(targetDir, framework)
}

// Guarded so this module can be imported (e.g. from tests) without also running the CLI.
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => fail(err.message))
}
