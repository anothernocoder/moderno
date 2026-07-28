#!/usr/bin/env node
/**
 * @moderno-ui/registry — minimal copy-paste CLI for Moderno blocks, screens and flows.
 *
 * Usage:
 *   moderno-ui init
 *   moderno-ui add <block|screen|flow> [--framework <react|vue|svelte|solid>] [--dest <dir>] [--no-example]
 *   moderno-ui list
 *
 * Blocks are layout-heavy compositions delivered by copy (ADR-0001). Screens and
 * flows (ADR-0005) sit above them: a flow `composes` screens, a screen may
 * `composes` blocks — the CLI resolves `composes` recursively and dedups by name,
 * copying every block/screen it touches plus (for a flow) its own example
 * assembly file. `--no-example` skips that example. Primitives are never copied;
 * they stay versioned `@moderno-ui/<framework>` npm deps.
 */
import { readFile, writeFile, mkdir, access } from 'node:fs/promises'
import { dirname, join, resolve, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const PKG_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const FRAMEWORKS = ['react', 'vue', 'svelte', 'solid']
// The npm package name for each framework differs from its `--framework` value for Solid.
const FRAMEWORK_DEP_NAMES = { react: 'react', vue: 'vue', svelte: 'svelte', solid: 'solid-js' }
const CONFIG_FILE = 'moderno.config.json'
// Order matters for `list`: blocks, then screens, then flows.
const KINDS = [
  { key: 'blocks', label: 'block', heading: 'Blocks' },
  { key: 'screens', label: 'screen', heading: 'Screens' },
  { key: 'flows', label: 'flow', heading: 'Flows' },
]

function parseArgs(argv) {
  const [command, ...rest] = argv
  const positional = []
  const flags = {}
  for (let i = 0; i < rest.length; i++) {
    const arg = rest[i]
    if (arg.startsWith('--')) {
      flags[arg.slice(2)] = rest[i + 1] && !rest[i + 1].startsWith('--') ? rest[++i] : true
    } else {
      positional.push(arg)
    }
  }
  return { command, positional, flags }
}

async function loadRegistry() {
  const raw = await readFile(join(PKG_ROOT, 'registry.json'), 'utf8')
  return JSON.parse(raw)
}

function fail(message) {
  console.error(`\x1b[31m✖\x1b[0m ${message}`)
  process.exit(1)
}

async function exists(path) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

/** Reads and parses a JSON file, returning `null` if it's missing or invalid. */
async function readJson(path) {
  try {
    return JSON.parse(await readFile(path, 'utf8'))
  } catch {
    return null
  }
}

/** Find `name` across blocks/screens/flows; returns its kind + registry entry. */
function findEntry(registry, name) {
  for (const { key, label } of KINDS) {
    const entry = registry[key]?.[name]
    if (entry) return { kind: label, name, entry }
  }
  return null
}

/** Resolve `composes` recursively (flow → screens → blocks), deduped by name. */
function resolveComposed(registry, name, seen = new Map()) {
  if (seen.has(name)) return seen
  const found = findEntry(registry, name)
  if (!found) fail(`Unknown: ${name}. Run "moderno-ui list" to see what's available.`)
  seen.set(name, found)
  for (const child of found.entry.composes ?? []) {
    resolveComposed(registry, child, seen)
  }
  return seen
}

const RELATIVE_IMPORT = /(\bfrom\s*)(['"])(\.\.?\/[^'"]+)\2/g

/** Strips a single trailing extension (`.tsx`, `.vue`, `.svelte`, ...), if any. */
function stripExt(path) {
  return path.replace(/\.[^./\\]+$/, '')
}

/**
 * Registry source files import sibling composed files (block from a screen,
 * screen from a flow) via relative paths that assume the monorepo's own
 * source-tree layout. Block dest paths are flat while screen/flow dest paths
 * mirror their nested source path (ADR-0001 vs ADR-0005), so a plain copy
 * leaves those relative imports pointing at paths that don't exist in the
 * copied tree. Rewrite each relative import against the actual planned dest
 * of the file it targets, using the same bare-vs-extension form as the
 * original specifier.
 */
function rewriteRelativeImports(content, srcPath, destPath, plan) {
  const srcDir = dirname(srcPath)
  return content.replace(RELATIVE_IMPORT, (full, prefix, quote, specifier) => {
    const resolvedSrc = resolve(srcDir, specifier)

    // Whether the specifier carried the target's real extension has to be read
    // off which form matched, not sniffed from the specifier text: Solid's own
    // bare imports (e.g. `ShoppingCart.solid`, no `.tsx`) end in something that
    // looks like an extension but isn't the file's actual one.
    let target = plan.find((item) => resolvedSrc === item.srcPath)
    let hasExt = Boolean(target)
    if (!target) target = plan.find((item) => resolvedSrc === stripExt(item.srcPath))
    if (!target) return full

    const targetDest = hasExt ? target.destPath : stripExt(target.destPath)
    let rel = relative(dirname(destPath), targetDest).split(sep).join('/')
    if (!rel.startsWith('.')) rel = `./${rel}`
    return `${prefix}${quote}${rel}${quote}`
  })
}

async function cmdList() {
  const registry = await loadRegistry()

  for (const { key, label, heading } of KINDS) {
    const items = registry[key] ?? {}
    if (Object.keys(items).length === 0) continue

    console.log(`\n${heading} available:\n`)
    const byDomain = new Map()
    for (const [name, item] of Object.entries(items)) {
      const domain = item.domain ?? (label === 'flow' ? 'cross-domain' : 'other')
      if (!byDomain.has(domain)) byDomain.set(domain, [])
      byDomain.get(domain).push([name, item])
    }
    for (const [domain, entries] of byDomain) {
      console.log(`  \x1b[2m${domain}\x1b[0m`)
      for (const [name, item] of entries) {
        const composes = item.composes?.length ? ` (composes: ${item.composes.join(', ')})` : ''
        console.log(`    \x1b[1m${name}\x1b[0m — ${item.description}${composes}`)
      }
      console.log('')
    }
  }
  console.log('Usage: moderno-ui add <block|screen|flow> [--framework <react|vue|svelte|solid>]\n')
}

/** Detects the consumer's framework from package.json deps and writes moderno.config.json. */
async function cmdInit() {
  const pkg = await readJson(join(process.cwd(), 'package.json'))
  const deps = { ...pkg?.dependencies, ...pkg?.devDependencies }
  const detected = FRAMEWORKS.filter((fw) => FRAMEWORK_DEP_NAMES[fw] in deps)

  if (detected.length !== 1) {
    console.log(
      `Could not detect exactly one framework (${Object.values(FRAMEWORK_DEP_NAMES).join(', ')}) in package.json.\n` +
        'Run "npm create moderno-ui@latest" to scaffold a new project instead.',
    )
    return
  }

  const framework = detected[0]
  await writeFile(join(process.cwd(), CONFIG_FILE), `${JSON.stringify({ framework }, null, 2)}\n`)
  console.log(`\x1b[32m✔\x1b[0m Detected \x1b[1m${framework}\x1b[0m. Wrote ${CONFIG_FILE}.`)
}

async function cmdAdd(positional, flags) {
  const name = positional[0]
  let framework = flags.framework || flags.f
  const dest = flags.dest || './src/blocks'
  const noExample = Boolean(flags['no-example'])

  if (!name) fail('Missing name. E.g.: moderno-ui add hero --framework react')
  if (!framework) {
    const config = await readJson(join(process.cwd(), CONFIG_FILE))
    framework = config?.framework
  }
  if (!framework) fail('Missing --framework <react|vue|svelte|solid>')
  if (!FRAMEWORKS.includes(framework)) fail(`Invalid framework: ${framework}. Use one of: ${FRAMEWORKS.join(', ')}`)

  const registry = await loadRegistry()
  const found = findEntry(registry, name)
  if (!found) fail(`Unknown: ${name}. Run "moderno-ui list" to see what's available.`)

  const resolved = resolveComposed(registry, name)
  const toCopy = [...resolved.values()].filter(
    (item) => !(noExample && found.kind === 'flow' && item.name === name),
  )

  // Plan every item's src/dest path upfront so relative imports between
  // composed files (e.g. a screen importing the block it composes) can be
  // rewritten against where files actually land, not just copied verbatim.
  const plan = toCopy.map((item) => {
    const src = item.entry.files[framework]
    if (!src) fail(`"${item.name}" has no variant for ${framework}.`)
    const destFile = item.entry.dest?.[framework] ?? src.split('/').pop()
    return { ...item, srcPath: join(PKG_ROOT, src), destPath: resolve(process.cwd(), dest, destFile) }
  })

  const copied = []
  for (const item of plan) {
    if (await exists(item.destPath)) fail(`${item.destPath} already exists. Delete it or use a different --dest.`)

    await mkdir(dirname(item.destPath), { recursive: true })
    const content = await readFile(item.srcPath, 'utf8')
    await writeFile(item.destPath, rewriteRelativeImports(content, item.srcPath, item.destPath, plan))
    copied.push(item)
  }

  for (const item of copied) {
    console.log(`\x1b[32m✔\x1b[0m Copied \x1b[1m${item.name}\x1b[0m (${item.kind}, ${framework}) → ${item.destPath}`)
  }

  if (found.kind === 'flow') {
    const pulled = copied.filter((item) => item.name !== name).map((item) => item.name)
    console.log(pulled.length ? `  Also pulled in: ${pulled.join(', ')}` : '  Composes nothing else.')
  }

  const deps = (found.entry.dependencies ?? []).map((d) => d.replace('{framework}', framework))
  if (deps.length) console.log(`  Requires: ${deps.join(', ')}`)
}

async function main() {
  const { command, positional, flags } = parseArgs(process.argv.slice(2))
  switch (command) {
    case 'init':
      await cmdInit()
      break
    case 'add':
      await cmdAdd(positional, flags)
      break
    case 'list':
      await cmdList()
      break
    default:
      console.log(
        'Commands: moderno-ui init  |  moderno-ui add <block|screen|flow> [--framework <fw>] [--no-example]  |  moderno-ui list',
      )
      process.exit(command ? 1 : 0)
  }
}

// Guarded so this module can be imported (e.g. from tests) without also running the CLI.
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => fail(err.message))
}

export { rewriteRelativeImports, stripExt }
