#!/usr/bin/env node
/**
 * @moderno/registry — minimal copy-paste CLI for Moderno blocks.
 *
 * Usage:
 *   moderno add <block> --framework <react|vue|svelte|solid> [--dest <dir>]
 *   moderno list
 *
 * Blocks are layout-heavy compositions delivered by copy (ADR-0001): the CLI
 * copies a block's per-framework source into your repo so you can edit it
 * freely. Distinct from the versioned @moderno/<framework> npm primitives.
 */
import { readFile, mkdir, copyFile, access } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const PKG_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const FRAMEWORKS = ['react', 'vue', 'svelte', 'solid']

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

async function cmdList() {
  const registry = await loadRegistry()
  console.log('\nBloques disponibles:\n')
  for (const [name, block] of Object.entries(registry.blocks)) {
    console.log(`  \x1b[1m${name}\x1b[0m — ${block.description}`)
  }
  console.log('\nUso: moderno add <block> --framework <react|vue|svelte|solid>\n')
}

async function cmdAdd(positional, flags) {
  const block = positional[0]
  const framework = flags.framework || flags.f
  const dest = flags.dest || './src/blocks'

  if (!block) fail('Falta el nombre del block. Ej: moderno add hero --framework react')
  if (!framework) fail('Falta --framework <react|vue|svelte|solid>')
  if (!FRAMEWORKS.includes(framework)) fail(`Framework inválido: ${framework}. Usa uno de: ${FRAMEWORKS.join(', ')}`)

  const registry = await loadRegistry()
  const entry = registry.blocks[block]
  if (!entry) fail(`Block desconocido: ${block}. Corre "moderno list" para ver los disponibles.`)

  const src = entry.files[framework]
  if (!src) fail(`El block "${block}" no tiene variante para ${framework}.`)

  const srcPath = join(PKG_ROOT, src)
  const destFile = entry.dest?.[framework] ?? src.split('/').pop()
  const destPath = resolve(process.cwd(), dest, destFile)

  if (await exists(destPath)) {
    fail(`Ya existe ${destPath}. Bórralo o usa otro --dest.`)
  }

  await mkdir(dirname(destPath), { recursive: true })
  await copyFile(srcPath, destPath)

  console.log(`\x1b[32m✔\x1b[0m Copiado \x1b[1m${block}\x1b[0m (${framework}) → ${destPath}`)
  const deps = (entry.dependencies ?? []).map((d) => d.replace('{framework}', framework))
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
      console.log('Comandos: moderno add <block> --framework <fw>  |  moderno list')
      process.exit(command ? 1 : 0)
  }
}

main().catch((err) => fail(err.message))
