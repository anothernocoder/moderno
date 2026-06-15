import './styles.css'
import { icon } from './ui.js'
import { sileo } from 'sileo'
import { mountToaster, mountLiveChart } from './react-islands.js'

/* ================= datos ================= */

const MODALIDADES = [
  { id: 'directo', nombre: 'Directo', desc: 'Aciertas el número en el orden exacto del premio mayor.', paga: 4500 },
  { id: 'combinado', nombre: 'Combinado', desc: 'Aciertas el número en cualquier orden de sus cifras.', paga: 208 },
  { id: 'tres', nombre: '3 últimas', desc: 'Aciertas las tres últimas cifras en orden exacto.', paga: 400 },
  { id: 'dos', nombre: '2 últimas (pata)', desc: 'Aciertas las dos últimas cifras en orden exacto.', paga: 50 },
  { id: 'una', nombre: '1 cifra (uña)', desc: 'Aciertas la última cifra del premio mayor.', paga: 5 },
]

const LOTERIAS = [
  { id: 'paisita-d', nombre: 'Paisita Día', sorteo: 'hoy · 13:00' },
  { id: 'chontico-d', nombre: 'Chontico Día', sorteo: 'hoy · 13:00' },
  { id: 'sinuano-n', nombre: 'Sinuano Noche', sorteo: 'hoy · 22:30' },
  { id: 'bogota', nombre: 'Lotería de Bogotá', sorteo: 'jue · 22:30' },
  { id: 'medellin', nombre: 'Lotería de Medellín', sorteo: 'vie · 23:00' },
  { id: 'cruz-roja', nombre: 'Cruz Roja', sorteo: 'mar · 22:30' },
  { id: 'boyaca', nombre: 'Lotería de Boyacá', sorteo: 'sáb · 22:45' },
  { id: 'valle', nombre: 'Lotería del Valle', sorteo: 'mié · 23:00' },
]

const MONTOS = [500, 1000, 2000, 5000]
const PASOS = ['Números', 'Modalidad', 'Loterías', 'Confirmar']

const cop = (n) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n)

/* ================= estado ================= */

const state = {
  paso: 0,
  cifras: 4,
  digitos: [],
  modalidad: 'directo',
  monto: 1000,
  loterias: new Set(['paisita-d', 'sinuano-n']),
  ticket: null,
}

const numero = () => state.digitos.join('')
const numeroCompleto = () => state.digitos.length === state.cifras

// permutaciones distintas del número (para combinado)
const permutaciones = () => {
  const n = state.digitos.length
  if (!n) return 0
  let fact = 1
  for (let i = 2; i <= n; i++) fact *= i
  const counts = {}
  state.digitos.forEach((d) => { counts[d] = (counts[d] || 0) + 1 })
  let div = 1
  Object.values(counts).forEach((c) => { for (let i = 2; i <= c; i++) div *= i })
  return fact / div
}

const apuestas = () => (state.modalidad === 'combinado' ? permutaciones() : 1)
const total = () => state.monto * apuestas() * state.loterias.size

/* ================= vistas ================= */

const stepper = () => `
  <ol class="flex items-center gap-2 text-size-small">
    ${PASOS.map((p, i) => `
      <li class="flex items-center gap-2 ${i > 0 ? 'flex-1' : ''}">
        ${i > 0 ? `<span class="h-px flex-1 ${i <= state.paso ? 'bg-primary' : 'bg-border-strong'}"></span>` : ''}
        <button data-paso="${i}" ${i > state.paso ? 'disabled' : ''}
          class="flex items-center gap-2 ${i === state.paso ? 'text-text-primary' : 'text-text-secondary'} ${i < state.paso ? 'cursor-pointer hover:text-text-primary' : ''}">
          <span class="w-6 h-6 flex items-center justify-center text-size-tiny border
            ${i < state.paso ? 'bg-primary text-on-primary border-primary' : i === state.paso ? 'border-primary' : 'border-border-strong'}">
            ${i < state.paso ? icon.check(11) : i + 1}
          </span>
          <span class="hidden sm:inline">${p}</span>
        </button>
      </li>`).join('')}
  </ol>`

const vistaNumeros = () => `
  <div class="card p-8">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div><h3 class="text-headline-md">Elige tu número</h3>
      <p class="mt-1 text-size-regular text-text-secondary">Juega con 3 o 4 cifras, o deja que el azar decida.</p></div>
      <div class="flex gap-2" id="pg-cifras">
        <button class="chip" data-cifras="3" data-selected="${state.cifras === 3}">3 cifras</button>
        <button class="chip" data-cifras="4" data-selected="${state.cifras === 4}">4 cifras</button>
      </div>
    </div>

    <div class="mt-8 flex justify-center gap-3">
      ${Array.from({ length: state.cifras }, (_, i) => `
        <div class="w-16 h-20 sm:w-20 sm:h-24 flex items-center justify-center text-[40px] sm:text-[52px] leading-none border
          ${i === state.digitos.length ? 'border-primary' : 'border-border-strong'} ${i < state.digitos.length ? 'bg-surface-muted' : ''}">
          ${state.digitos[i] ?? '<span class="text-border-strong">·</span>'}
        </div>`).join('')}
    </div>

    <div class="mt-8 max-w-xs mx-auto grid grid-cols-3 gap-2" id="pg-keypad">
      ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `<button class="btn btn-secondary !h-12 !text-body-md" data-key="${n}">${n}</button>`).join('')}
      <button class="btn btn-ghost !h-12" data-key="back" aria-label="Borrar">⌫</button>
      <button class="btn btn-secondary !h-12 !text-body-md" data-key="0">0</button>
      <button class="btn btn-ghost !h-12" data-key="azar" data-tip="Número al azar">${icon.refresh(16)}</button>
    </div>
  </div>`

const vistaModalidad = () => `
  <div class="card p-8">
    <h3 class="text-headline-md">Modalidad y valor</h3>
    <p class="mt-1 text-size-regular text-text-secondary">Cómo quieres jugar el <span class="text-text-primary tabular-nums">${numero()}</span> y cuánto apuestas por lotería.</p>

    <div class="mt-6 space-y-3" id="pg-modalidades" role="radiogroup">
      ${MODALIDADES.map((m) => {
        const sel = state.modalidad === m.id
        const nota = m.id === 'combinado' ? ` · ${permutaciones()} combinaciones de tu número` : ''
        return `
        <label class="card !border ${sel ? '!border-primary' : ''} p-4 flex items-start gap-4 cursor-pointer hover:border-border-strong transition-colors">
          <input type="radio" name="pg-mod" class="radio-input mt-1" value="${m.id}" ${sel ? 'checked' : ''}>
          <span class="flex-1">
            <span class="flex items-center gap-3"><span class="text-size-medium">${m.nombre}</span>
            <span class="badge badge-neutral">paga ${m.paga.toLocaleString('es-CO')}× por peso</span></span>
            <span class="block text-size-small text-text-secondary mt-1">${m.desc}${nota}</span>
          </span>
        </label>`
      }).join('')}
    </div>

    <hr class="divider my-7">
    <h4>Valor por lotería</h4>
    <div class="mt-4 flex flex-wrap items-center gap-2" id="pg-montos">
      ${MONTOS.map((m) => `<button class="chip" data-monto="${m}" data-selected="${state.monto === m}">${cop(m)}</button>`).join('')}
      <div class="flex items-center gap-2 ml-2">
        <label class="text-size-small text-text-secondary" for="pg-monto-otro">Otro:</label>
        <input class="input !w-28 !h-9 tabular-nums" id="pg-monto-otro" type="number" min="500" step="500" placeholder="$">
      </div>
    </div>
    ${state.modalidad === 'combinado' ? `
      <p class="mt-4 text-size-small text-text-secondary flex items-center gap-2">${icon.info(13)}
      El combinado multiplica el valor por las ${permutaciones()} combinaciones: ${cop(state.monto)} × ${permutaciones()} = <span class="text-text-primary">${cop(state.monto * permutaciones())}</span> por lotería.</p>` : ''}
  </div>`

const vistaLoterias = () => `
  <div class="card p-8">
    <div class="flex items-center justify-between flex-wrap gap-3">
      <div><h3 class="text-headline-md">¿Con qué loterías juegas?</h3>
      <p class="mt-1 text-size-regular text-text-secondary">Tu apuesta corre por cada sorteo que elijas.</p></div>
      <button class="btn btn-ghost btn-sm" id="pg-todas">${state.loterias.size === LOTERIAS.length ? 'Quitar todas' : 'Seleccionar todas'}</button>
    </div>

    <div class="mt-6 grid sm:grid-cols-2 gap-3" id="pg-loterias">
      ${LOTERIAS.map((l) => {
        const sel = state.loterias.has(l.id)
        return `
        <label class="card !border ${sel ? '!border-primary' : ''} p-4 flex items-center gap-4 cursor-pointer hover:border-border-strong transition-colors">
          <input type="checkbox" class="check" value="${l.id}" ${sel ? 'checked' : ''}>
          <span class="flex-1 min-w-0">
            <span class="block text-size-regular truncate">${l.nombre}</span>
            <span class="text-size-small text-text-secondary flex items-center gap-1.5 mt-0.5">${icon.clock(12)} próximo sorteo: ${l.sorteo}</span>
          </span>
        </label>`
      }).join('')}
    </div>
    <p class="mt-5 text-size-small text-text-secondary">${state.loterias.size} ${state.loterias.size === 1 ? 'lotería seleccionada' : 'loterías seleccionadas'}</p>

    <div class="mt-6 well p-5">
      <div class="flex items-center justify-between mb-2">
        <p class="text-size-small text-text-secondary">Apuestas por minuto en la red</p>
        <span class="badge badge-success"><span class="badge-dot"></span>En vivo</span>
      </div>
      <div id="pg-live" style="height:120px"></div>
    </div>
  </div>`

const vistaConfirmar = () => {
  const mod = MODALIDADES.find((m) => m.id === state.modalidad)
  return `
  <div class="card p-8">
    <h3 class="text-headline-md">Confirma tu apuesta</h3>
    <p class="mt-1 text-size-regular text-text-secondary">Revisa los datos antes de pagar. Después de confirmar no hay cambios.</p>

    <div class="mt-6 grid md:grid-cols-[200px_1fr] gap-6 items-start">
      <div class="well p-6 text-center">
        <p class="text-size-tiny text-text-secondary uppercase tracking-wider">Tu número</p>
        <p class="mt-2 text-[44px] leading-none tabular-nums tracking-[0.08em]">${numero()}</p>
        <span class="badge badge-solid mt-4">${mod.nombre}</span>
      </div>
      <dl class="divide-y divide-border-default text-size-regular">
        <div class="flex justify-between py-3"><dt class="text-text-secondary">Modalidad</dt><dd>${mod.nombre} · paga ${mod.paga.toLocaleString('es-CO')}×</dd></div>
        <div class="flex justify-between py-3"><dt class="text-text-secondary">Valor por lotería</dt>
          <dd class="tabular-nums">${cop(state.monto)}${apuestas() > 1 ? ` × ${apuestas()} comb. = ${cop(state.monto * apuestas())}` : ''}</dd></div>
        ${[...state.loterias].map((id) => {
          const l = LOTERIAS.find((x) => x.id === id)
          return `<div class="flex justify-between py-3"><dt class="text-text-secondary flex items-center gap-2">${icon.check(13)} ${l.nombre} <span class="text-size-tiny">(${l.sorteo})</span></dt><dd class="tabular-nums">${cop(state.monto * apuestas())}</dd></div>`
        }).join('')}
        <div class="flex justify-between py-4 text-body-lg"><dt>Total a pagar</dt><dd class="tabular-nums text-weight-medium">${cop(total())}</dd></div>
      </dl>
    </div>

    <div class="mt-6 flex items-start gap-3 px-4 py-3 text-size-small text-text-secondary border border-border-default">
      <span class="mt-0.5 shrink-0">${icon.info(14)}</span>
      <p>Juego autorizado para mayores de 18 años. El premio se calcula sobre el valor apostado por lotería según la modalidad. Premios mayores a $200.000 están sujetos a retención.</p>
    </div>
  </div>`
}

const vistaTicket = () => {
  const t = state.ticket
  return `
  <div class="max-w-md mx-auto">
    <div class="text-center mb-6">
      <span class="inline-flex w-12 h-12 items-center justify-center bg-success/12 text-success rounded-full">${icon.checkCircle(22)}</span>
      <h3 class="text-headline-md mt-3">¡Apuesta registrada!</h3>
      <p class="mt-1 text-size-regular text-text-secondary">Guarda tu ticket: lo necesitas para reclamar el premio.</p>
    </div>

    <div class="card shadow-large" id="pg-ticket">
      <div class="px-6 py-4 border-b border-border-default flex items-center justify-between">
        <span class="text-weight-medium">moderno<span class="text-text-secondary">·chance</span></span>
        <span class="badge badge-success"><span class="badge-dot"></span>Pagado</span>
      </div>
      <div class="px-6 py-5 text-center border-b border-dashed border-border-strong">
        <p class="text-size-tiny text-text-secondary uppercase tracking-wider">Número jugado</p>
        <p class="mt-1 text-[56px] leading-none tabular-nums tracking-[0.1em]">${t.numero}</p>
        <p class="mt-3 flex justify-center gap-2"><span class="badge badge-solid">${t.modalidad}</span><span class="badge badge-neutral">${t.cifras} cifras</span></p>
      </div>
      <dl class="px-6 py-4 text-size-small divide-y divide-border-default">
        <div class="flex justify-between py-2"><dt class="text-text-secondary">Serial</dt><dd class="spec !text-text-primary">${t.serial}</dd></div>
        <div class="flex justify-between py-2"><dt class="text-text-secondary">Fecha</dt><dd>${t.fecha}</dd></div>
        ${t.loterias.map((l) => `<div class="flex justify-between py-2"><dt class="text-text-secondary">${l.nombre} · ${l.sorteo}</dt><dd class="tabular-nums">${cop(t.porLoteria)}</dd></div>`).join('')}
        <div class="flex justify-between py-3 text-size-medium"><dt>Total pagado</dt><dd class="tabular-nums text-weight-medium">${cop(t.total)}</dd></div>
      </dl>
      <div class="px-6 pb-6 pt-2">
        <div class="h-12" style="background:repeating-linear-gradient(90deg, var(--md-text-primary) 0 2px, transparent 2px 5px, var(--md-text-primary) 5px 6px, transparent 6px 11px)"></div>
        <p class="spec text-center mt-2">${t.serial}</p>
      </div>
    </div>

    <div class="mt-6 flex gap-3 justify-center">
      <button class="btn btn-primary" id="pg-nueva">${icon.plus(14)} Nueva apuesta</button>
      <button class="btn btn-secondary" onclick="window.print()">${icon.download(14)} Imprimir</button>
    </div>
  </div>`
}

/* ================= shell ================= */

const puedeContinuar = () => {
  if (state.paso === 0) return numeroCompleto()
  if (state.paso === 2) return state.loterias.size > 0
  return true
}

let chartCleanup = null

const render = () => {
  chartCleanup?.()
  chartCleanup = null
  const app = document.querySelector('#app')
  if (state.ticket) {
    app.querySelector('#pg-main').innerHTML = vistaTicket()
    app.querySelector('#pg-footer').innerHTML = ''
    app.querySelector('#pg-stepper').innerHTML = ''
    bindTicket()
    return
  }
  app.querySelector('#pg-stepper').innerHTML = stepper()
  app.querySelector('#pg-main').innerHTML = [vistaNumeros, vistaModalidad, vistaLoterias, vistaConfirmar][state.paso]()
  app.querySelector('#pg-footer').innerHTML = `
    <button class="btn btn-ghost" id="pg-atras" ${state.paso === 0 ? 'disabled' : ''}>${icon.arrowLeft(14)} Atrás</button>
    <div class="flex-1 text-right mr-4 text-size-small text-text-secondary self-center">
      ${numeroCompleto() ? `Nº <span class="text-text-primary tabular-nums">${numero()}</span> · ${state.loterias.size} lot. · <span class="text-text-primary">${cop(total())}</span>` : ''}
    </div>
    ${state.paso < 3
      ? `<button class="btn btn-primary" id="pg-siguiente">Continuar ${icon.arrowRight(14)}</button>`
      : `<button class="btn btn-primary btn-lg" id="pg-confirmar">${icon.check(15)} Confirmar y pagar ${cop(total())}</button>`}
  `
  bind()
  const liveEl = document.getElementById('pg-live')
  if (liveEl) chartCleanup = mountLiveChart(liveEl, { base: 80, tick: 500, showValue: false, fill: true })
}

/* ================= eventos ================= */

const bind = () => {
  // stepper: volver a pasos anteriores
  document.querySelectorAll('[data-paso]').forEach((b) =>
    b.addEventListener('click', () => { const p = +b.dataset.paso; if (p < state.paso) { state.paso = p; render() } }))

  document.getElementById('pg-atras')?.addEventListener('click', () => { state.paso--; render() })
  document.getElementById('pg-siguiente')?.addEventListener('click', () => {
    if (!puedeContinuar()) {
      if (state.paso === 0) sileo.error({ title: 'Número incompleto', description: `Te ${state.cifras - state.digitos.length === 1 ? 'falta 1 cifra' : `faltan ${state.cifras - state.digitos.length} cifras`} para completar tu número.` })
      else sileo.error({ title: 'Elige al menos una lotería', description: 'Tu apuesta necesita mínimo un sorteo para jugar.' })
      return
    }
    state.paso++
    render()
  })

  // paso 1: cifras + keypad
  document.querySelectorAll('#pg-cifras [data-cifras]').forEach((b) =>
    b.addEventListener('click', () => {
      state.cifras = +b.dataset.cifras
      state.digitos = state.digitos.slice(0, state.cifras)
      render()
    }))
  document.getElementById('pg-keypad')?.addEventListener('click', (e) => {
    const k = e.target.closest('[data-key]')?.dataset.key
    if (!k) return
    if (k === 'back') state.digitos.pop()
    else if (k === 'azar') state.digitos = Array.from({ length: state.cifras }, () => String(Math.floor(Math.random() * 10)))
    else if (state.digitos.length < state.cifras) state.digitos.push(k)
    render()
  })

  // paso 2: modalidad + monto
  document.querySelectorAll('input[name="pg-mod"]').forEach((r) =>
    r.addEventListener('change', () => { state.modalidad = r.value; render() }))
  document.querySelectorAll('#pg-montos [data-monto]').forEach((b) =>
    b.addEventListener('click', () => { state.monto = +b.dataset.monto; render() }))
  document.getElementById('pg-monto-otro')?.addEventListener('change', (e) => {
    const v = Math.max(500, Math.round(+e.target.value / 500) * 500)
    if (v) { state.monto = v; render() }
  })

  // paso 3: loterías
  document.querySelectorAll('#pg-loterias input[type="checkbox"]').forEach((c) =>
    c.addEventListener('change', () => {
      c.checked ? state.loterias.add(c.value) : state.loterias.delete(c.value)
      render()
    }))
  document.getElementById('pg-todas')?.addEventListener('click', () => {
    state.loterias = state.loterias.size === LOTERIAS.length ? new Set() : new Set(LOTERIAS.map((l) => l.id))
    render()
  })

  // paso 4: confirmar → pago simulado (sileo.promise) → ticket
  document.getElementById('pg-confirmar')?.addEventListener('click', (e) => {
    e.currentTarget.disabled = true
    sileo.promise(new Promise((res) => setTimeout(res, 1600)), {
      loading: { title: 'Procesando pago…', description: `${cop(total())} · ${state.loterias.size} ${state.loterias.size === 1 ? 'lotería' : 'loterías'}` },
      success: { title: '¡Apuesta registrada!', description: `Número ${numero()} jugado. Mucha suerte.` },
      error: { title: 'No pudimos procesar el pago', description: 'Intenta de nuevo.' },
    }).then(() => {
      const mod = MODALIDADES.find((m) => m.id === state.modalidad)
      state.ticket = {
        serial: 'CH-' + Date.now().toString(36).toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000),
        fecha: new Date().toLocaleString('es-CO', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        numero: numero(),
        cifras: state.cifras,
        modalidad: mod.nombre,
        porLoteria: state.monto * apuestas(),
        loterias: [...state.loterias].map((id) => LOTERIAS.find((l) => l.id === id)),
        total: total(),
      }
      render()
    })
  })
}

const bindTicket = () => {
  document.getElementById('pg-nueva')?.addEventListener('click', () => {
    Object.assign(state, { paso: 0, digitos: [], modalidad: 'directo', monto: 1000, loterias: new Set(['paisita-d', 'sinuano-n']), ticket: null })
    render()
  })
}

/* ================= layout base ================= */

document.querySelector('#app').innerHTML = `
<header class="sticky top-0 z-40 bg-surface-base/90 backdrop-blur border-b border-border-default">
  <div class="max-w-3xl mx-auto px-6 h-14 flex items-center gap-4">
    <span class="text-weight-medium">moderno<span class="text-text-secondary">·chance</span></span>
    <span class="spec hidden sm:inline">playground</span>
    <div class="flex-1"></div>
    <a href="/index.html" class="btn btn-ghost btn-sm">${icon.arrowLeft(13)} Style guide</a>
    <button class="btn btn-secondary btn-sm" id="theme-toggle">Tema claro</button>
  </div>
</header>

<main class="max-w-3xl mx-auto px-6 pb-24">
  <div class="pt-10 pb-8" id="pg-stepper"></div>
  <div id="pg-main"></div>
  <div class="mt-6 flex items-center gap-3" id="pg-footer"></div>
</main>`

document.getElementById('theme-toggle').addEventListener('click', (e) => {
  const dark = document.documentElement.dataset.theme !== 'light'
  document.documentElement.dataset.theme = dark ? 'light' : 'dark'
  e.currentTarget.textContent = dark ? 'Tema oscuro' : 'Tema claro'
})

mountToaster('top-center')
render()
