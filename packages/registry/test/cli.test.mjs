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

test('add copies the input-groups block (applications domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'input-groups', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /input-groups/)
  const copied = await readFile(join(dest, 'InputGroups.tsx'), 'utf8')
  assert.match(copied, /export function InputGroups/)
})

test('add copies a different framework variant of the input-groups block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'input-groups', '--framework', 'svelte', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'InputGroups.svelte'), 'utf8')
  assert.match(copied, /Moderno block — InputGroups \(Svelte\)/)
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

test('add copies the testimonials block (marketing domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'testimonials', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /testimonials/)
  const copied = await readFile(join(dest, 'Testimonials.tsx'), 'utf8')
  assert.match(copied, /export function Testimonials/)
})

test('add copies a different framework variant of the testimonials block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'testimonials', '--framework', 'svelte', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'Testimonials.svelte'), 'utf8')
  assert.match(copied, /Moderno block — Testimonials \(Svelte\)/)
})

test('add copies the logos block (marketing domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'logos', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /logos/)
  const copied = await readFile(join(dest, 'Logos.tsx'), 'utf8')
  assert.match(copied, /export function Logos/)
})

test('add copies a different framework variant of the logos block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'logos', '--framework', 'svelte', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'Logos.svelte'), 'utf8')
  assert.match(copied, /Moderno block — Logos \(Svelte\)/)
})

test('add copies the team block (marketing domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'team', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /team/)
  const copied = await readFile(join(dest, 'Team.tsx'), 'utf8')
  assert.match(copied, /export function Team/)
})

test('add copies a different framework variant of the team block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'team', '--framework', 'svelte', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'Team.svelte'), 'utf8')
  assert.match(copied, /Moderno block — Team \(Svelte\)/)
})

test('add copies the cta block (marketing domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'cta', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /cta/)
  const copied = await readFile(join(dest, 'Cta.tsx'), 'utf8')
  assert.match(copied, /export function Cta/)
})

test('add copies a different framework variant of the cta block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'cta', '--framework', 'svelte', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'Cta.svelte'), 'utf8')
  assert.match(copied, /Moderno block — Cta \(Svelte\)/)
})

test('add copies the blog-header block (marketing domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'blog-header', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /blog-header/)
  const copied = await readFile(join(dest, 'BlogHeader.tsx'), 'utf8')
  assert.match(copied, /export function BlogHeader/)
})

test('add copies a different framework variant of the blog-header block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'blog-header', '--framework', 'svelte', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'BlogHeader.svelte'), 'utf8')
  assert.match(copied, /Moderno block — BlogHeader \(Svelte\)/)
})

test('add copies the blog-sections block (marketing domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'blog-sections', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /blog-sections/)
  const copied = await readFile(join(dest, 'BlogSections.tsx'), 'utf8')
  assert.match(copied, /export function BlogSections/)
})

test('add copies a different framework variant of the blog-sections block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'blog-sections', '--framework', 'svelte', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'BlogSections.svelte'), 'utf8')
  assert.match(copied, /Moderno block — BlogSections \(Svelte\)/)
})

test('add copies the blog-post-header block (marketing domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'blog-post-header', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /blog-post-header/)
  const copied = await readFile(join(dest, 'BlogPostHeader.tsx'), 'utf8')
  assert.match(copied, /export function BlogPostHeader/)
})

test('add copies a different framework variant of the blog-post-header block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'blog-post-header', '--framework', 'svelte', '--dest', dest], {
    encoding: 'utf8',
  })

  const copied = await readFile(join(dest, 'BlogPostHeader.svelte'), 'utf8')
  assert.match(copied, /Moderno block — BlogPostHeader \(Svelte\)/)
})

test('add copies the newsletter block (marketing domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'newsletter', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /newsletter/)
  const copied = await readFile(join(dest, 'Newsletter.tsx'), 'utf8')
  assert.match(copied, /export function Newsletter/)
})

test('add copies a different framework variant of the newsletter block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'newsletter', '--framework', 'svelte', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'Newsletter.svelte'), 'utf8')
  assert.match(copied, /Moderno block — Newsletter \(Svelte\)/)
})

test('add copies the marketing-stats block (marketing domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'marketing-stats', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /marketing-stats/)
  const copied = await readFile(join(dest, 'MarketingStats.tsx'), 'utf8')
  assert.match(copied, /export function MarketingStats/)
})

test('add copies a different framework variant of the marketing-stats block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'marketing-stats', '--framework', 'svelte', '--dest', dest], {
    encoding: 'utf8',
  })

  const copied = await readFile(join(dest, 'MarketingStats.svelte'), 'utf8')
  assert.match(copied, /Moderno block — MarketingStats \(Svelte\)/)
})

test('add copies the contact-modal block (marketing domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'contact-modal', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /contact-modal/)
  const copied = await readFile(join(dest, 'ContactModal.tsx'), 'utf8')
  assert.match(copied, /export function ContactModal/)
})

test('add copies a different framework variant of the contact-modal block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'contact-modal', '--framework', 'svelte', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'ContactModal.svelte'), 'utf8')
  assert.match(copied, /Moderno block — ContactModal \(Svelte\)/)
})

test('add copies the not-found block (marketing domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'not-found', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /not-found/)
  const copied = await readFile(join(dest, 'NotFound.tsx'), 'utf8')
  assert.match(copied, /export function NotFound/)
})

test('add copies a different framework variant of the not-found block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'not-found', '--framework', 'svelte', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'NotFound.svelte'), 'utf8')
  assert.match(copied, /Moderno block — NotFound \(Svelte\)/)
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
  assert.match(marketingSection, /testimonials/)
  assert.match(marketingSection, /logos/)
  assert.match(marketingSection, /team/)
  assert.match(marketingSection, /cta/)
  assert.match(marketingSection, /blog-header/)
  assert.match(marketingSection, /blog-sections/)
  assert.match(marketingSection, /blog-post-header/)
  assert.match(marketingSection, /newsletter/)
  assert.match(marketingSection, /marketing-stats/)
  assert.match(marketingSection, /contact-modal/)
  assert.match(marketingSection, /not-found/)
})

test('list groups blocks by domain and includes the applications table block', () => {
  const output = execFileSync('node', [CLI, 'list'], { encoding: 'utf8' })

  const sections = output.split(/\n\s*\n/).filter((section) => section.trim().length > 0)
  const applicationsSection = sections.find((section) => section.includes('applications'))

  assert.ok(applicationsSection, 'expected an "applications" domain group in list output')
  assert.match(applicationsSection, /stats/)
  assert.match(applicationsSection, /table/)
  assert.match(applicationsSection, /input-groups/)
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
