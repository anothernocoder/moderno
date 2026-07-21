import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const CLI = resolve(__dirname, '../bin/cli.mjs')

async function withTmpDir(t) {
  const dir = await mkdtemp(join(tmpdir(), 'moderno-registry-'))
  t.after(() => rm(dir, { recursive: true, force: true }))
  return dir
}

test('add copies the requested block+framework file to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'pricing', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /pricing/)
  const copied = await readFile(join(dest, 'Pricing.tsx'), 'utf8')
  assert.match(copied, /export function Pricing/)
})

test('add copies a different framework variant of the same block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'pricing', '--framework', 'vue', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'Pricing.vue'), 'utf8')
  assert.match(copied, /Moderno block — Pricing \(Vue\)/)
})

test('add copies the table block (applications domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'table', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /table/)
  const copied = await readFile(join(dest, 'Table.tsx'), 'utf8')
  assert.match(copied, /export function Table/)
})

test('add copies a different framework variant of the table block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'table', '--framework', 'svelte', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'Table.svelte'), 'utf8')
  assert.match(copied, /Moderno block — Table \(Svelte\)/)
})

test('add copies the product-details block (ecommerce domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'product-details', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /product-details/)
  const copied = await readFile(join(dest, 'ProductDetails.tsx'), 'utf8')
  assert.match(copied, /export function ProductDetails/)
})

test('add copies a different framework variant of the product-details block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'product-details', '--framework', 'vue', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'ProductDetails.vue'), 'utf8')
  assert.match(copied, /Moderno block — ProductDetails \(Vue\)/)
})

test('add copies the portfolio-sections block (portfolio domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync(
    'node',
    [CLI, 'add', 'portfolio-sections', '--framework', 'react', '--dest', dest],
    { encoding: 'utf8' },
  )

  assert.match(output, /portfolio-sections/)
  const copied = await readFile(join(dest, 'PortfolioSections.tsx'), 'utf8')
  assert.match(copied, /export function PortfolioSections/)
})

test('add copies a different framework variant of the portfolio-sections block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync(
    'node',
    [CLI, 'add', 'portfolio-sections', '--framework', 'svelte', '--dest', dest],
    { encoding: 'utf8' },
  )

  const copied = await readFile(join(dest, 'PortfolioSections.svelte'), 'utf8')
  assert.match(copied, /Moderno block — PortfolioSections \(Svelte\)/)
})

test('add copies the banner block (marketing domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'banner', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /banner/)
  const copied = await readFile(join(dest, 'Banner.tsx'), 'utf8')
  assert.match(copied, /export function Banner/)
})

test('add copies a different framework variant of the banner block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'banner', '--framework', 'svelte', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'Banner.svelte'), 'utf8')
  assert.match(copied, /Moderno block — Banner \(Svelte\)/)
})

test('add copies the header block (marketing domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'header', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /header/)
  const copied = await readFile(join(dest, 'Header.tsx'), 'utf8')
  assert.match(copied, /export function Header/)
})

test('add copies a different framework variant of the header block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'header', '--framework', 'svelte', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'Header.svelte'), 'utf8')
  assert.match(copied, /Moderno block — Header \(Svelte\)/)
})

test('add copies the features block (marketing domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'features', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /features/)
  const copied = await readFile(join(dest, 'Features.tsx'), 'utf8')
  assert.match(copied, /export function Features/)
})

test('add copies a different framework variant of the features block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'features', '--framework', 'svelte', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'Features.svelte'), 'utf8')
  assert.match(copied, /Moderno block — Features \(Svelte\)/)
})

test('add copies the content block (marketing domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'content', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /content/)
  const copied = await readFile(join(dest, 'Content.tsx'), 'utf8')
  assert.match(copied, /export function Content/)
})

test('add copies a different framework variant of the content block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'content', '--framework', 'svelte', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'Content.svelte'), 'utf8')
  assert.match(copied, /Moderno block — Content \(Svelte\)/)
})

test('add copies the careers block (marketing domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'careers', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /careers/)
  const copied = await readFile(join(dest, 'Careers.tsx'), 'utf8')
  assert.match(copied, /export function Careers/)
})

test('add copies a different framework variant of the careers block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'careers', '--framework', 'svelte', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'Careers.svelte'), 'utf8')
  assert.match(copied, /Moderno block — Careers \(Svelte\)/)
})

test('add copies the footer block (marketing domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'footer', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /footer/)
  const copied = await readFile(join(dest, 'Footer.tsx'), 'utf8')
  assert.match(copied, /export function Footer/)
})

test('add copies a different framework variant of the footer block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'footer', '--framework', 'svelte', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'Footer.svelte'), 'utf8')
  assert.match(copied, /Moderno block — Footer \(Svelte\)/)
})

test('add copies the contact block (marketing domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'contact', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /contact/)
  const copied = await readFile(join(dest, 'Contact.tsx'), 'utf8')
  assert.match(copied, /export function Contact/)
})

test('add copies a different framework variant of the contact block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'contact', '--framework', 'svelte', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'Contact.svelte'), 'utf8')
  assert.match(copied, /Moderno block — Contact \(Svelte\)/)
})

test('add copies the faq block (marketing domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'faq', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /faq/)
  const copied = await readFile(join(dest, 'Faq.tsx'), 'utf8')
  assert.match(copied, /export function Faq/)
})

test('add copies a different framework variant of the faq block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'faq', '--framework', 'svelte', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'Faq.svelte'), 'utf8')
  assert.match(copied, /Moderno block — Faq \(Svelte\)/)
})

test('add fails for an unknown block', async (t) => {
  const dest = await withTmpDir(t)

  assert.throws(() => {
    execFileSync('node', [CLI, 'add', 'does-not-exist', '--framework', 'react', '--dest', dest], {
      encoding: 'utf8',
      stdio: 'pipe',
    })
  })
})

test('list groups blocks by domain and includes the marketing pricing block', () => {
  const output = execFileSync('node', [CLI, 'list'], { encoding: 'utf8' })

  const sections = output.split(/\n\s*\n/).filter((section) => section.trim().length > 0)
  const marketingSection = sections.find((section) => section.includes('marketing'))

  assert.ok(marketingSection, 'expected a "marketing" domain group in list output')
  assert.match(marketingSection, /hero/)
  assert.match(marketingSection, /banner/)
  assert.match(marketingSection, /pricing/)
  assert.match(marketingSection, /header/)
  assert.match(marketingSection, /features/)
  assert.match(marketingSection, /content/)
  assert.match(marketingSection, /careers/)
  assert.match(marketingSection, /footer/)
  assert.match(marketingSection, /contact/)
  assert.match(marketingSection, /faq/)
})

test('list groups blocks by domain and includes the applications table block', () => {
  const output = execFileSync('node', [CLI, 'list'], { encoding: 'utf8' })

  const sections = output.split(/\n\s*\n/).filter((section) => section.trim().length > 0)
  const applicationsSection = sections.find((section) => section.includes('applications'))

  assert.ok(applicationsSection, 'expected an "applications" domain group in list output')
  assert.match(applicationsSection, /stats/)
  assert.match(applicationsSection, /table/)
})

test('list groups blocks by domain and includes the ecommerce product-details block', () => {
  const output = execFileSync('node', [CLI, 'list'], { encoding: 'utf8' })

  const sections = output.split(/\n\s*\n/).filter((section) => section.trim().length > 0)
  const ecommerceSection = sections.find((section) => section.includes('ecommerce'))

  assert.ok(ecommerceSection, 'expected an "ecommerce" domain group in list output')
  assert.match(ecommerceSection, /product-card/)
  assert.match(ecommerceSection, /product-details/)
})

test('list groups blocks by domain and includes the portfolio-sections block', () => {
  const output = execFileSync('node', [CLI, 'list'], { encoding: 'utf8' })

  const sections = output.split(/\n\s*\n/).filter((section) => section.trim().length > 0)
  const portfolioSection = sections.find((section) => section.includes('portfolio'))

  assert.ok(portfolioSection, 'expected a "portfolio" domain group in list output')
  assert.match(portfolioSection, /portfolio-header/)
  assert.match(portfolioSection, /portfolio-sections/)
})
