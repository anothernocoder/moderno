#!/usr/bin/env node
/**
 * @moderno/registry — minimal copy-paste CLI for Moderno blocks, screens and flows.
 *
 * Usage:
 *   moderno add <block|screen|flow> --framework <react|vue|svelte|solid> [--dest <dir>] [--no-example]
 *   moderno list
 *
 * Blocks are layout-heavy compositions delivered by copy (ADR-0001). Screens and
 * flows (ADR-0005) sit above them: a flow `composes` screens, a screen may
 * `composes` blocks — the CLI resolves `composes` recursively and dedups by name,
 * copying every block/screen it touches plus (for a flow) its own example
 * assembly file. `--no-example` skips that example. Primitives are never copied;
 * they stay versioned `@moderno/<framework>` npm deps.
 */
import { readFile, mkdir, copyFile, access } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const PKG_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const FRAMEWORKS = ['react', 'vue', 'svelte', 'solid']
// Order matters for `list`: blocks, then screens, then flows.
const KINDS = [
  { key: 'blocks', label: 'block', heading: 'Bloques' },
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
  if (!found) fail(`Desconocido: ${name}. Corre "moderno list" para ver los disponibles.`)
  seen.set(name, found)
  for (const child of found.entry.composes ?? []) {
    resolveComposed(registry, child, seen)
  }
  return seen
}

async function cmdList() {
  const registry = await loadRegistry()

  for (const { key, label, heading } of KINDS) {
    const items = registry[key] ?? {}
    if (Object.keys(items).length === 0) continue

    console.log(`\n${heading} disponibles:\n`)
    const byDomain = new Map()
    for (const [name, item] of Object.entries(items)) {
      const domain = item.domain ?? (label === 'flow' ? 'cross-domain' : 'otros')
      if (!byDomain.has(domain)) byDomain.set(domain, [])
      byDomain.get(domain).push([name, item])
    }
    for (const [domain, entries] of byDomain) {
      console.log(`  \x1b[2m${domain}\x1b[0m`)
      for (const [name, item] of entries) {
        const composes = item.composes?.length ? ` (compone: ${item.composes.join(', ')})` : ''
        console.log(`    \x1b[1m${name}\x1b[0m — ${item.description}${composes}`)
      }
      console.log('')
    }
  }
  console.log('Uso: moderno add <block|screen|flow> --framework <react|vue|svelte|solid>\n')
}

async function cmdAdd(positional, flags) {
  const name = positional[0]
  const framework = flags.framework || flags.f
  const dest = flags.dest || './src/blocks'
  const noExample = Boolean(flags['no-example'])

  if (!name) fail('Falta el nombre. Ej: moderno add hero --framework react')
  if (!framework) fail('Falta --framework <react|vue|svelte|solid>')
  if (!FRAMEWORKS.includes(framework)) fail(`Framework inválido: ${framework}. Usa uno de: ${FRAMEWORKS.join(', ')}`)

  const registry = await loadRegistry()
  const found = findEntry(registry, name)
  if (!found) fail(`Desconocido: ${name}. Corre "moderno list" para ver los disponibles.`)

  const resolved = resolveComposed(registry, name)
  const toCopy = [...resolved.values()].filter(
    (item) => !(noExample && found.kind === 'flow' && item.name === name),
  )

  const copied = []
  for (const item of toCopy) {
    const src = item.entry.files[framework]
    if (!src) fail(`"${item.name}" no tiene variante para ${framework}.`)

    const destFile = item.entry.dest?.[framework] ?? src.split('/').pop()
    const destPath = resolve(process.cwd(), dest, destFile)
    if (await exists(destPath)) fail(`Ya existe ${destPath}. Bórralo o usa otro --dest.`)

    await mkdir(dirname(destPath), { recursive: true })
    await copyFile(join(PKG_ROOT, src), destPath)
    copied.push({ ...item, destPath })
  }

  for (const item of copied) {
    console.log(`\x1b[32m✔\x1b[0m Copiado \x1b[1m${item.name}\x1b[0m (${item.kind}, ${framework}) → ${item.destPath}`)
  }

  if (found.kind === 'flow') {
    const pulled = copied.filter((item) => item.name !== name).map((item) => item.name)
    console.log(pulled.length ? `  Trajo también: ${pulled.join(', ')}` : '  No compone nada más.')
  }

  const deps = (found.entry.dependencies ?? []).map((d) => d.replace('{framework}', framework))
  if (deps.length) console.log(`  Requiere: ${deps.join(', ')}`)
}

async function main() {
  const { command, positional, flags } = parseArgs(process.argv.slice(2))
  switch (command) {
    case 'add':
      await cmdAdd(positional, flags)
      break
    case 'list':
      await cmdList()
      break
    default:
      console.log('Comandos: moderno add <block|screen|flow> --framework <fw> [--no-example]  |  moderno list')
      process.exit(command ? 1 : 0)
  }
}

main().catch((err) => fail(err.message))
