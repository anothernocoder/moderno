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

test('add copies the alerts block (applications domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'alerts', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /alerts/)
  const copied = await readFile(join(dest, 'Alerts.tsx'), 'utf8')
  assert.match(copied, /export function Alerts/)
})

test('add copies a different framework variant of the alerts block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'alerts', '--framework', 'svelte', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'Alerts.svelte'), 'utf8')
  assert.match(copied, /Moderno block — Alerts \(Svelte\)/)
})

test('add copies the action-panels block (applications domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'action-panels', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /action-panels/)
  const copied = await readFile(join(dest, 'ActionPanels.tsx'), 'utf8')
  assert.match(copied, /export function ActionPanels/)
})

test('add copies a different framework variant of the action-panels block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'action-panels', '--framework', 'svelte', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'ActionPanels.svelte'), 'utf8')
  assert.match(copied, /Moderno block — ActionPanels \(Svelte\)/)
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

test('add copies the modals block (applications domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'modals', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /modals/)
  const copied = await readFile(join(dest, 'Modals.tsx'), 'utf8')
  assert.match(copied, /export function Modals/)
})

test('add copies a different framework variant of the modals block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'modals', '--framework', 'svelte', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'Modals.svelte'), 'utf8')
  assert.match(copied, /Moderno block — Modals \(Svelte\)/)
})

test('add copies the media-objects block (applications domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'media-objects', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /media-objects/)
  const copied = await readFile(join(dest, 'MediaObjects.tsx'), 'utf8')
  assert.match(copied, /export function MediaObjects/)
})

test('add copies a different framework variant of the media-objects block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'media-objects', '--framework', 'svelte', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'MediaObjects.svelte'), 'utf8')
  assert.match(copied, /Moderno block — Media objects \(Svelte\)/)
})

test('add copies the containers block (applications domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'containers', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /containers/)
  const copied = await readFile(join(dest, 'Containers.tsx'), 'utf8')
  assert.match(copied, /export function Containers/)
})

test('add copies a different framework variant of the containers block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'containers', '--framework', 'svelte', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'Containers.svelte'), 'utf8')
  assert.match(copied, /Moderno block — Containers \(Svelte\)/)
})

test('add copies the list-containers block (applications domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'list-containers', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /list-containers/)
  const copied = await readFile(join(dest, 'ListContainers.tsx'), 'utf8')
  assert.match(copied, /export function ListContainers/)
})

test('add copies a different framework variant of the list-containers block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'list-containers', '--framework', 'svelte', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'ListContainers.svelte'), 'utf8')
  assert.match(copied, /Moderno block — List containers \(Svelte\)/)
})

test('add copies the panels block (applications domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'panels', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /panels/)
  const copied = await readFile(join(dest, 'Panels.tsx'), 'utf8')
  assert.match(copied, /export function Panels/)
})

test('add copies a different framework variant of the panels block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'panels', '--framework', 'vue', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'Panels.vue'), 'utf8')
  assert.match(copied, /Moderno block — Panels \(Vue\)/)
})

test('add copies the slide-overs block (applications domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'slide-overs', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /slide-overs/)
  const copied = await readFile(join(dest, 'SlideOvers.tsx'), 'utf8')
  assert.match(copied, /export function SlideOvers/)
})

test('add copies a different framework variant of the slide-overs block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'slide-overs', '--framework', 'svelte', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'SlideOvers.svelte'), 'utf8')
  assert.match(copied, /Moderno block — SlideOvers \(Svelte\)/)
})

test('add copies the empty-states block (applications domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'empty-states', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /empty-states/)
  const copied = await readFile(join(dest, 'EmptyStates.tsx'), 'utf8')
  assert.match(copied, /export function EmptyStates/)
})

test('add copies a different framework variant of the empty-states block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'empty-states', '--framework', 'svelte', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'EmptyStates.svelte'), 'utf8')
  assert.match(copied, /Moderno block — EmptyStates \(Svelte\)/)
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

test('add copies the form-layouts block (applications domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'form-layouts', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /form-layouts/)
  const copied = await readFile(join(dest, 'FormLayouts.tsx'), 'utf8')
  assert.match(copied, /export function FormLayouts/)
})

test('add copies a different framework variant of the form-layouts block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'form-layouts', '--framework', 'svelte', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'FormLayouts.svelte'), 'utf8')
  assert.match(copied, /Moderno block — FormLayouts \(Svelte\)/)
})

test('add copies the grid-lists block (applications domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'grid-lists', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /grid-lists/)
  const copied = await readFile(join(dest, 'GridLists.tsx'), 'utf8')
  assert.match(copied, /export function GridLists/)
})

test('add copies a different framework variant of the grid-lists block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'grid-lists', '--framework', 'svelte', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'GridLists.svelte'), 'utf8')
  assert.match(copied, /Moderno block — GridLists \(Svelte\)/)
})

test('add copies the feeds block (applications domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'feeds', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /feeds/)
  const copied = await readFile(join(dest, 'Feeds.tsx'), 'utf8')
  assert.match(copied, /export function Feeds/)
})

test('add copies a different framework variant of the feeds block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'feeds', '--framework', 'svelte', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'Feeds.svelte'), 'utf8')
  assert.match(copied, /Moderno block — Feeds \(Svelte\)/)
})

test('add copies the stacked-list block (applications domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'stacked-list', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /stacked-list/)
  const copied = await readFile(join(dest, 'StackedList.tsx'), 'utf8')
  assert.match(copied, /export function StackedList/)
})

test('add copies a different framework variant of the stacked-list block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'stacked-list', '--framework', 'svelte', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'StackedList.svelte'), 'utf8')
  assert.match(copied, /Moderno block — StackedList \(Svelte\)/)
})

test('add copies the page-card-section-headers block (applications domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync(
    'node',
    [CLI, 'add', 'page-card-section-headers', '--framework', 'react', '--dest', dest],
    { encoding: 'utf8' },
  )

  assert.match(output, /page-card-section-headers/)
  const copied = await readFile(join(dest, 'PageCardSectionHeaders.tsx'), 'utf8')
  assert.match(copied, /export function PageCardSectionHeaders/)
})

test('add copies a different framework variant of the page-card-section-headers block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'page-card-section-headers', '--framework', 'svelte', '--dest', dest], {
    encoding: 'utf8',
  })

  const copied = await readFile(join(dest, 'PageCardSectionHeaders.svelte'), 'utf8')
  assert.match(copied, /Moderno block — PageCardSectionHeaders \(Svelte\)/)
})

test('add copies the status-monitoring block (applications domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'status-monitoring', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /status-monitoring/)
  const copied = await readFile(join(dest, 'StatusMonitoring.tsx'), 'utf8')
  assert.match(copied, /export function StatusMonitoring/)
})

test('add copies a different framework variant of the status-monitoring block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'status-monitoring', '--framework', 'svelte', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'StatusMonitoring.svelte'), 'utf8')
  assert.match(copied, /Moderno block — StatusMonitoring \(Svelte\)/)
})

test('add copies the kpi-cards block (applications domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'kpi-cards', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /kpi-cards/)
  const copied = await readFile(join(dest, 'KpiCards.tsx'), 'utf8')
  assert.match(copied, /export function KpiCards/)
})

test('add copies a different framework variant of the kpi-cards block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'kpi-cards', '--framework', 'svelte', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'KpiCards.svelte'), 'utf8')
  assert.match(copied, /Moderno block — KpiCards \(Svelte\)/)
})

test('add copies the description-list block (applications domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'description-list', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /description-list/)
  const copied = await readFile(join(dest, 'DescriptionList.tsx'), 'utf8')
  assert.match(copied, /export function DescriptionList/)
})

test('add copies a different framework variant of the description-list block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'description-list', '--framework', 'svelte', '--dest', dest], {
    encoding: 'utf8',
  })

  const copied = await readFile(join(dest, 'DescriptionList.svelte'), 'utf8')
  assert.match(copied, /Moderno block — DescriptionList \(Svelte\)/)
})

test('add copies the list block (applications domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'list', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /list/)
  const copied = await readFile(join(dest, 'List.tsx'), 'utf8')
  assert.match(copied, /export function List/)
})

test('add copies a different framework variant of the list block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'list', '--framework', 'svelte', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'List.svelte'), 'utf8')
  assert.match(copied, /Moderno block — List \(Svelte\)/)
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

test('add copies the store-nav block (ecommerce domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'store-nav', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /store-nav/)
  const copied = await readFile(join(dest, 'StoreNav.tsx'), 'utf8')
  assert.match(copied, /export function StoreNav/)
})

test('add copies a different framework variant of the store-nav block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'store-nav', '--framework', 'svelte', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'StoreNav.svelte'), 'utf8')
  assert.match(copied, /Moderno block — StoreNav \(Svelte\)/)
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

test('add copies the application-shells block (applications domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'application-shells', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /application-shells/)
  const copied = await readFile(join(dest, 'ApplicationShells.tsx'), 'utf8')
  assert.match(copied, /export function ApplicationShells/)
})

test('add copies a different framework variant of the application-shells block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'application-shells', '--framework', 'svelte', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'ApplicationShells.svelte'), 'utf8')
  assert.match(copied, /Moderno block — Application Shells \(Svelte\)/)
})

test('add copies the app-banners block (applications domain) to --dest', async (t) => {
  const dest = await withTmpDir(t)

  const output = execFileSync('node', [CLI, 'add', 'app-banners', '--framework', 'react', '--dest', dest], {
    encoding: 'utf8',
  })

  assert.match(output, /app-banners/)
  const copied = await readFile(join(dest, 'AppBanners.tsx'), 'utf8')
  assert.match(copied, /export function AppBanners/)
})

test('add copies a different framework variant of the app-banners block', async (t) => {
  const dest = await withTmpDir(t)

  execFileSync('node', [CLI, 'add', 'app-banners', '--framework', 'svelte', '--dest', dest], { encoding: 'utf8' })

  const copied = await readFile(join(dest, 'AppBanners.svelte'), 'utf8')
  assert.match(copied, /Moderno block — AppBanners \(Svelte\)/)
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
  assert.match(applicationsSection, /alerts/)
  assert.match(applicationsSection, /action-panels/)
  assert.match(applicationsSection, /stacked-list/)
  assert.match(applicationsSection, /stats/)
  assert.match(applicationsSection, /form-layouts/)
  assert.match(applicationsSection, /table/)
  assert.match(applicationsSection, /application-shells/)
  assert.match(applicationsSection, /modals/)
  assert.match(applicationsSection, /slide-overs/)
  assert.match(applicationsSection, /empty-states/)
  assert.match(applicationsSection, /input-groups/)
  assert.match(applicationsSection, /app-banners/)
  assert.match(applicationsSection, /grid-lists/)
  assert.match(applicationsSection, /feeds/)
  assert.match(applicationsSection, /page-card-section-headers/)
  assert.match(applicationsSection, /status-monitoring/)
  assert.match(applicationsSection, /kpi-cards/)
  assert.match(applicationsSection, /description-list/)
  assert.match(applicationsSection, /media-objects/)
  assert.match(applicationsSection, /list/)
  assert.match(applicationsSection, /containers/)
  assert.match(applicationsSection, /list-containers/)
  assert.match(applicationsSection, /panels/)
})

test('list groups blocks by domain and includes the ecommerce product-details block', () => {
  const output = execFileSync('node', [CLI, 'list'], { encoding: 'utf8' })

  const sections = output.split(/\n\s*\n/).filter((section) => section.trim().length > 0)
  const ecommerceSection = sections.find((section) => section.includes('ecommerce'))

  assert.ok(ecommerceSection, 'expected an "ecommerce" domain group in list output')
  assert.match(ecommerceSection, /product-card/)
  assert.match(ecommerceSection, /product-details/)
  assert.match(ecommerceSection, /store-nav/)
})

test('list groups blocks by domain and includes the portfolio-sections block', () => {
  const output = execFileSync('node', [CLI, 'list'], { encoding: 'utf8' })

  const sections = output.split(/\n\s*\n/).filter((section) => section.trim().length > 0)
  const portfolioSection = sections.find((section) => section.includes('portfolio'))

  assert.ok(portfolioSection, 'expected a "portfolio" domain group in list output')
  assert.match(portfolioSection, /portfolio-header/)
  assert.match(portfolioSection, /portfolio-sections/)
})
