  import './styles.css'
import { icon } from './ui.js'
import { sileo } from 'sileo'
import { mountToaster, mountLiveChart } from './react-islands.js'
import * as foundations from './sections/foundations.js'
import * as shared from './sections/shared.js'
import * as marketing from './sections/marketing.js'
import * as applications from './sections/applications.js'
import * as ecommerce from './sections/ecommerce.js'
import * as portfolio from './sections/portfolio.js'
import * as assets from './sections/assets.js'

const sections = [foundations, shared, marketing, applications, ecommerce, portfolio, assets]

const nav = sections.map((s) => `
  <details class="group" ${s.toc.num === '01' ? 'open' : ''}>
    <summary class="flex items-center justify-between cursor-pointer list-none py-1.5 text-size-regular hover:text-text-primary">
      <span><span class="spec mr-2">${s.toc.num}</span>${s.toc.title}</span>
      <span class="text-text-secondary transition-transform group-open:rotate-180">${icon.chevronDown(12)}</span>
    </summary>
    <div class="sg-nav pl-7 pb-2">
      ${s.toc.items.map(([id, label]) => `<a href="#${id}">${label}</a>`).join('')}
    </div>
  </details>`).join('')

document.querySelector('#app').innerHTML = `
<header class="sticky top-0 z-40 bg-surface-base/90 backdrop-blur border-b border-border-default">
  <div class="px-6 h-14 flex items-center gap-4">
    <button class="btn btn-ghost btn-sm btn-icon lg:hidden" id="nav-toggle" aria-label="Menú">${icon.menu()}</button>
    <span class="text-weight-medium">moderno</span>
    <span class="spec hidden sm:inline">ui style guide · v1.0</span>
    <div class="flex-1"></div>
    <span class="spec hidden md:inline">vite + tailwind v4 · tokens DESIGN.md</span>
    <a href="/playground.html" class="btn btn-ghost btn-sm">Playground ${icon.arrowRight(13)}</a>
    <button class="btn btn-secondary btn-sm" id="theme-toggle">Tema claro</button>
  </div>
</header>

<div class="flex">
  <aside class="w-64 shrink-0 border-r border-border-default p-5 sticky top-14 h-[calc(100vh-56px)] overflow-y-auto hidden lg:block" id="sidebar">
    ${nav}
  </aside>

  <main class="flex-1 min-w-0 px-6 lg:px-10 pb-32">
    <section class="pt-14 pb-10 border-b border-border-default">
      <p class="kicker mb-3">Moderno Design System</p>
      <h1 class="text-headline-lg max-w-xl">Guía de estilo y componentes</h1>
      <p class="mt-4 text-size-medium text-text-secondary max-w-xl">
        Referencia visual completa del sistema: fundamentos, componentes compartidos y librerías por dominio
        (marketing, aplicaciones, e-commerce, portafolio y assets). Construida sobre los tokens del
        <span class="spec">DESIGN.md</span> de Midday: monocromo oscuro, esquinas rectas y un solo acento de alto contraste.
      </p>
      <a href="/playground.html" class="card mt-8 p-5 flex items-center gap-4 max-w-xl hover:border-border-strong transition-colors group">
        <span class="w-11 h-11 well flex items-center justify-center shrink-0">${icon.cart(18)}</span>
        <span class="flex-1 min-w-0">
          <span class="block text-size-medium">Playground · flujo de chance</span>
          <span class="block text-size-small text-text-secondary mt-0.5">Apuesta de chance de punta a punta: números, modalidad, loterías, confirmación y ticket — armado con los componentes del sistema.</span>
        </span>
        <span class="text-text-secondary group-hover:text-text-primary group-hover:translate-x-1 transition-transform shrink-0">${icon.arrowRight(16)}</span>
      </a>
    </section>
    ${sections.map((s) => s.html).join('')}
    <footer class="mt-20 pt-6 border-t border-border-default flex items-center justify-between text-size-small text-text-secondary">
      <span>Moderno · junio 2026</span>
      <span class="spec">Hedvig Letters Sans · tokens.json · tailwind v4</span>
    </footer>
  </main>
</div>
<div id="toast-region" class="fixed bottom-6 right-6 z-50 space-y-3"></div>`

/* ================= interacciones ================= */

// tema claro / oscuro (1.9): solo se remapean los roles
const root = document.documentElement
document.getElementById('theme-toggle').addEventListener('click', (e) => {
  const dark = root.dataset.theme !== 'light'
  root.dataset.theme = dark ? 'light' : 'dark'
  e.currentTarget.textContent = dark ? 'Tema oscuro' : 'Tema claro'
})

// nav móvil
document.getElementById('nav-toggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('hidden')
})

// checkboxes indeterminados
document.querySelectorAll('[data-indeterminate]').forEach((c) => { c.indeterminate = true })

// chips de filtro
document.querySelectorAll('[data-chips]').forEach((g) => {
  g.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip[data-selected]')
    if (chip) chip.dataset.selected = chip.dataset.selected === 'true' ? 'false' : 'true'
  })
})

// tabs
document.querySelectorAll('[data-tabs]').forEach((w) => {
  w.addEventListener('click', (e) => {
    const tab = e.target.closest('[data-tab]')
    if (!tab) return
    const i = tab.dataset.tab
    w.querySelectorAll('[data-tab]').forEach((t) => {
      const on = t.dataset.tab === i
      t.setAttribute('aria-selected', on)
      t.classList.toggle('border-primary', on)
      t.classList.toggle('text-text-primary', on)
      t.classList.toggle('border-transparent', !on)
      t.classList.toggle('text-text-secondary', !on)
    })
    w.querySelectorAll('[data-tab-panel]').forEach((p) => { p.hidden = p.dataset.tabPanel !== i })
  })
})

// dropdowns
document.querySelectorAll('[data-dropdown]').forEach((d) => {
  const btn = d.querySelector('[data-dropdown-btn]')
  const menu = d.querySelector('[data-dropdown-menu]')
  btn.addEventListener('click', () => menu.classList.toggle('hidden'))
  menu.addEventListener('click', () => menu.classList.add('hidden'))
  document.addEventListener('click', (e) => { if (!d.contains(e.target)) menu.classList.add('hidden') })
})

// combobox
document.querySelectorAll('[data-combobox]').forEach((c) => {
  const input = c.querySelector('[data-combobox-input]')
  const list = c.querySelector('[data-combobox-list]')
  const empty = c.querySelector('[data-combobox-empty]')
  const opts = [...c.querySelectorAll('[data-combobox-option]')]
  const filter = () => {
    const q = input.value.toLowerCase()
    let any = false
    opts.forEach((o) => {
      const hit = o.textContent.toLowerCase().includes(q)
      o.classList.toggle('hidden', !hit)
      if (hit) any = true
    })
    empty.classList.toggle('hidden', any)
  }
  input.addEventListener('focus', () => { list.classList.remove('hidden'); filter() })
  input.addEventListener('input', filter)
  list.addEventListener('click', (e) => {
    const o = e.target.closest('[data-combobox-option]')
    if (o) { input.value = o.textContent.trim(); list.classList.add('hidden') }
  })
  document.addEventListener('click', (e) => { if (!c.contains(e.target)) list.classList.add('hidden') })
})

// dialogs (modales y sheets)
document.querySelectorAll('[data-open]').forEach((b) => {
  b.addEventListener('click', () => document.querySelector(b.dataset.open)?.showModal())
})
document.querySelectorAll('dialog').forEach((d) => {
  d.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', () => d.close()))
  d.addEventListener('click', (e) => { if (e.target === d) d.close() })
})

// toasts
const toastIcons = {
  success: `<span class="text-success mt-0.5">${icon.checkCircle(16)}</span>`,
  error: `<span class="text-error mt-0.5">${icon.xCircle(16)}</span>`,
  info: `<span class="text-info mt-0.5">${icon.info(16)}</span>`,
}
document.querySelectorAll('[data-toast]').forEach((b) => {
  b.addEventListener('click', () => {
    const t = document.createElement('div')
    t.className = 'toast'
    t.innerHTML = `${toastIcons[b.dataset.toast]}<p class="flex-1 text-size-regular">${b.dataset.toastMsg}</p>
      <button class="text-text-secondary hover:text-text-primary" aria-label="Cerrar">${icon.x(13)}</button>`
    t.querySelector('button').addEventListener('click', () => t.remove())
    document.getElementById('toast-region').appendChild(t)
    setTimeout(() => t.remove(), 4500)
  })
})

// carousel
document.querySelectorAll('[data-carousel]').forEach((c) => {
  const track = c.querySelector('[data-carousel-track]')
  c.querySelector('[data-carousel-prev]').addEventListener('click', () => track.scrollBy({ left: -240, behavior: 'smooth' }))
  c.querySelector('[data-carousel-next]').addEventListener('click', () => track.scrollBy({ left: 240, behavior: 'smooth' }))
})

// sileo — toast del sistema (isla React)
mountToaster('bottom-right')
const sileoDemos = {
  success: () => sileo.success({ title: 'Inventario actualizado', description: '312 productos sincronizados sin conflictos.' }),
  error: () => sileo.error({ title: 'No se pudo guardar', description: 'El stock mínimo no puede superar el punto de reorden.' }),
  warning: () => sileo.warning({ title: 'Stock bajo', description: '8 productos cruzaron su punto de reorden.' }),
  info: () => sileo.info({ title: 'Sincronización programada', description: 'El catálogo se actualiza hoy a las 22:00.' }),
  action: () => sileo.action({
    title: 'Producto archivado',
    description: 'Café verde 1 kg ya no aparece en el catálogo.',
    button: { title: 'Deshacer', onClick: () => sileo.success({ title: 'Restaurado', description: 'El producto volvió al catálogo.' }) },
  }),
  promise: () => sileo.promise(new Promise((res) => setTimeout(res, 2000)), {
    loading: { title: 'Exportando inventario…', description: '1.240 referencias en proceso.' },
    success: { title: 'Exportación lista', description: 'inventario-junio.csv descargado.' },
    error: { title: 'Falló la exportación', description: 'Intenta de nuevo en unos minutos.' },
  }),
}
document.querySelectorAll('[data-sileo]').forEach((b) =>
  b.addEventListener('click', () => sileoDemos[b.dataset.sileo]()))

// liveline — chart en tiempo real (isla React)
const liveEl = document.getElementById('live-chart')
if (liveEl) mountLiveChart(liveEl, { base: 140 })

// copiar al portapapeles
document.querySelectorAll('[data-copy]').forEach((b) => {
  b.addEventListener('click', () => {
    const input = b.parentElement.querySelector('input')
    navigator.clipboard?.writeText(input.value)
    const prev = b.innerHTML
    b.innerHTML = 'Copiado ✓'
    setTimeout(() => { b.innerHTML = prev }, 1500)
  })
})
