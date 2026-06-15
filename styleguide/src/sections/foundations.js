import { icon, brandIcons, sub, demo, sectionShell } from '../ui.js'

// 1.1 — primitivas (solo documentación; los componentes consumen roles)
const primitives = {
  neutral: ['#fafafa', '#e5e5e5', '#c7c7c7', '#a3a3a3', '#737373', '#616161', '#404040', '#2e2e2e', '#1c1c1c', '#121212', '#0d0d0d', '#000000'],
  purple: ['#ede9fe', '#c4b5fd', '#8b5cf6', '#6d28d9', '#4c1d95'],
  blue: ['#dbeafe', '#93c5fd', '#60a5fa', '#2563eb', '#1e3a8a'],
  green: ['#d1fae5', '#6ee7b7', '#34d399', '#059669', '#064e3b'],
  orange: ['#ffedd5', '#fdba74', '#fbbf24', '#ea580c', '#7c2d12'],
  red: ['#fee2e2', '#fca5a5', '#f87171', '#dc2626', '#7f1d1d'],
  pink: ['#fce7f3', '#f9a8d4', '#f472b6', '#db2777', '#831843'],
}

const roles = [
  ['primary', 'Acción principal y énfasis (rol de marca)', '#fafafa', 'bg-primary'],
  ['on-primary', 'Texto/íconos sobre primary', '#18181b', 'bg-on-primary'],
  ['text-primary', 'Texto principal', '#fafafa', 'bg-text-primary'],
  ['text-secondary', 'Texto secundario y metadata', '#616161', 'bg-text-secondary'],
  ['text-tertiary', 'Texto oscuro sobre superficies claras', '#121212', 'bg-text-tertiary'],
  ['text-inverse', 'Texto sobre superficies invertidas', '#18181b', 'bg-text-inverse'],
  ['surface-base', 'Fondo de página y tarjetas', '#0d0d0d', 'bg-surface-base'],
  ['surface-muted', 'Pozos, inputs, nivel más bajo', '#000000', 'bg-surface-muted'],
  ['border-default', 'Bordes y divisores', '#1c1c1c', 'bg-border-default'],
  ['success', 'Estado: éxito (extensión)', '#34d399', 'bg-success'],
  ['warning', 'Estado: advertencia (extensión)', '#fbbf24', 'bg-warning'],
  ['error', 'Estado: error (extensión)', '#f87171', 'bg-error'],
  ['info', 'Estado: información (extensión)', '#60a5fa', 'bg-info'],
]

const ramp = (name, colors) => `
  <div class="flex items-center gap-3">
    <span class="spec w-16 shrink-0">${name}</span>
    <div class="flex flex-1">
      ${colors.map((c) => `<div class="h-8 flex-1" style="background:${c}" title="${c}"></div>`).join('')}
    </div>
  </div>`

const roleRow = ([name, usage, value, cls]) => `
  <tr>
    <td><span class="inline-flex items-center gap-3"><span class="w-6 h-6 border border-border-strong inline-block" style="background:var(--md-${name.replace('text-tertiary','text-tertiary')})"></span><span class="spec !text-text-primary">${name}</span></span></td>
    <td class="text-text-secondary text-size-regular">${usage}</td>
    <td><span class="spec">${value}</span></td>
    <td><span class="spec">.${cls}</span></td>
  </tr>`

const typeRow = (spec, cls, sample) => `
  <div class="p-5 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-8 border-b border-border-default last:border-0">
    <span class="spec w-48 shrink-0">${spec}</span>
    <p class="${cls} truncate">${sample}</p>
  </div>`

const spacingScale = [['1', 4], ['2', 6], ['3', 8], ['4', 12], ['5', 14], ['6', 16], ['7', 20], ['8', 24]]

const elevations = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge']

export const toc = { num: '01', title: 'Fundamentos', items: [
  ['f-color', '1.1 Color'], ['f-tipografia', '1.2 Tipografía'], ['f-spacing', '1.3 Spacing y layout'],
  ['f-sizing', '1.4 Sizing'], ['f-radius', '1.5 Radius'], ['f-elevacion', '1.6 Elevación'],
  ['f-bordes', '1.7 Bordes'], ['f-iconos', '1.8 Iconos'], ['f-theming', '1.9 Modelo de theming'],
]}

export const html = sectionShell('01 · Fundamentos', 'fundamentos', 'Fundamentos',
  'Decisiones primitivas que todo componente hereda. Los componentes nunca usan valores crudos: consumen roles semánticos, lo que hace el sistema re-tematizable.',
  `
  ${sub('f-color', '1.1 Color', 'Dos capas: paleta primitiva (tinta cruda, no se aplica directo) y roles semánticos (lo que consumen los componentes).')}
  ${demo('roles semánticos · nombre / uso / valor / clase bg-*', `
    <div class="overflow-x-auto -m-2 p-2">
    <table class="table"><thead><tr><th>Token</th><th>Uso</th><th>Valor (tema activo)</th><th>Utilidad</th></tr></thead>
    <tbody>${roles.map(roleRow).join('')}</tbody></table></div>`)}
  ${demo('paleta primitiva · familia neutral + tonos de marca (no usar directo en componentes)', `
    <div class="space-y-3">${Object.entries(primitives).map(([n, c]) => ramp(n, c)).join('')}</div>`)}

  ${sub('f-tipografia', '1.2 Tipografía', 'Dual: <span class="font-serif">Hedvig Letters Serif</span> para display y h1 (acento editorial); Hedvig Letters Sans para h2 en adelante y todo el cuerpo. Base 16/24 · peso 400.')}
  ${demo('escala de encabezados (h1–h6) + display', `
    <div class="-m-8">
      ${typeRow('display · 96/96 · serif', 'text-display', 'Moderno')}
      ${typeRow('h1 · 24/28 · serif', 'text-headline-lg', 'Cierre de inventario mensual')}
      ${typeRow('h2 · 20/24 · sans', 'text-headline-md', 'Cierre de inventario mensual')}
      ${typeRow('h3 · 18/22 · sans', 'text-body-lg', 'Cierre de inventario mensual')}
      ${typeRow('h4 · 16/24', 'text-body-md', 'Cierre de inventario mensual')}
      ${typeRow('h5 · 14/20', 'text-body-sm', 'Cierre de inventario mensual')}
      ${typeRow('h6 · 12/16 · caps', 'text-label-md uppercase tracking-wider', 'Cierre de inventario mensual')}
    </div>`)}
  ${demo('utilidades text-size-*', `
    <div class="-m-8">
      ${typeRow('text-size-medium · 16/24', 'text-size-medium', 'El cierre se ejecuta el último día hábil del mes.')}
      ${typeRow('text-size-regular · 14/20', 'text-size-regular', 'El cierre se ejecuta el último día hábil del mes.')}
      ${typeRow('text-size-small · 12/16', 'text-size-small', 'El cierre se ejecuta el último día hábil del mes.')}
      ${typeRow('text-size-tiny · 10/14', 'text-size-tiny', 'El cierre se ejecuta el último día hábil del mes.')}
    </div>`)}
  ${demo('utilidades text-weight-* (Hedvig expone 400; el resto se sintetiza)', `
    <div class="flex flex-wrap gap-x-8 gap-y-3">
      ${['black', 'bold', 'semibold', 'medium', 'normal', 'light'].map((w) => `<span class="text-weight-${w}">text-weight-${w}</span>`).join('')}
    </div>`)}

  ${sub('f-spacing', '1.3 Spacing y layout', 'Escala densa 4–24px que gobierna padding, gaps y márgenes. Tokenizada por componente y eje (spacing/{componente}/px·py·gap), responsiva por breakpoint.')}
  ${demo('escala', `
    <div class="space-y-3">
      ${spacingScale.map(([k, v]) => `
        <div class="flex items-center gap-4">
          <span class="spec w-20 shrink-0">space.${k} · ${v}px</span>
          <div class="bg-primary h-4" style="width:${v * 4}px"></div>
        </div>`).join('')}
    </div>`)}

  ${sub('f-sizing', '1.4 Sizing', 'Dimensiones tokenizadas en ritmo sm / md / lg, reutilizadas en todos los controles.')}
  ${demo('alturas de control · size/button-height/{sm,md,lg}', `
    <div class="flex flex-wrap items-end gap-4">
      <div class="text-center"><button class="btn btn-secondary btn-sm">32px</button><p class="spec mt-2">sm</p></div>
      <div class="text-center"><button class="btn btn-secondary">40px</button><p class="spec mt-2">md</p></div>
      <div class="text-center"><button class="btn btn-secondary btn-lg">48px</button><p class="spec mt-2">lg</p></div>
      <div class="text-center w-56"><input class="input" placeholder="input · 40px"><p class="spec mt-2">input md</p></div>
    </div>`)}

  ${sub('f-radius', '1.5 Radius', 'Lenguaje de forma rígido: 0px en todo componente estructural; 9999px (pill) reservado para badges, chips y dots.')}
  ${demo('escala', `
    <div class="flex items-end gap-6">
      <div class="text-center"><div class="w-16 h-16 well"></div><p class="spec mt-2">none · 0</p></div>
      <div class="text-center"><div class="w-16 h-16 well rounded-full"></div><p class="spec mt-2">full · 9999</p></div>
    </div>`)}

  ${sub('f-elevacion', '1.6 Sombras / elevación', 'Escala de 7 pasos. En tema oscuro la profundidad se lee por borde + sombra; los pasos bajos separan (cards, inputs), los altos flotan (menús, modales).')}
  ${demo('xxsmall → xxlarge', `
    <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6">
      ${elevations.map((e) => `<div class="text-center"><div class="h-20 bg-surface-raised shadow-${e}"></div><p class="spec mt-3">${e}</p></div>`).join('')}
    </div>`)}

  ${sub('f-bordes', '1.7 Bordes', 'Ancho y color tokenizados. border-default para divisores y contornos de superficie; border-strong para controles interactivos.')}
  ${demo('strokes y divisores', `
    <div class="grid sm:grid-cols-3 gap-6">
      <div><div class="h-16 border border-border-default"></div><p class="spec mt-2">1px · border-default</p></div>
      <div><div class="h-16 border border-border-strong"></div><p class="spec mt-2">1px · border-strong</p></div>
      <div><div class="h-16 border-2 border-primary"></div><p class="spec mt-2">2px · focus/activo</p></div>
    </div>`)}

  ${sub('f-iconos', '1.8 Iconos', 'Set embebido inline (hereda color y tamaño del texto) + set de marca/social.')}
  ${demo('iconos UI', `
    <div class="flex flex-wrap gap-3">
      ${[['chevronUp', 'chevron up'], ['chevronDown', 'chevron down'], ['chevronLeft', 'chevron left'], ['chevronRight', 'chevron right'], ['filters', 'filters'], ['link', 'link'], ['email', 'email'], ['chat', 'live chat'], ['phone', 'phone'], ['pin', 'pin'], ['clock', 'clock'], ['menu', 'menu']]
        .map(([k, n]) => `<span class="w-12 h-12 well flex items-center justify-center" data-tip="${n}">${icon[k](18)}</span>`).join('')}
    </div>`)}
  ${demo('iconos de marca / social', `
    <div class="flex flex-wrap gap-3 text-text-primary">
      ${Object.entries(brandIcons).map(([n, s]) => `<span class="w-12 h-12 well flex items-center justify-center" data-tip="${n}">${s}</span>`).join('')}
    </div>`)}

  ${sub('f-theming', '1.9 Modelo de theming', 'Tres capas: tema/color (re-skin), responsiva (densidad y breakpoints) y componente (radius, bordes, tipo). Los roles son el contrato — prueba el toggle del header: ningún componente cambia, solo el mapeo de roles.')}
  ${demo('capas', `
    <div class="grid sm:grid-cols-3 gap-4 text-size-regular">
      <div class="panel"><h6 class="mb-3 text-text-secondary">Capa tema / color</h6><p class="text-text-secondary">Roles semánticos. Se sobrescriben para re-skin o claro/oscuro.</p></div>
      <div class="panel"><h6 class="mb-3 text-text-secondary">Capa responsiva</h6><p class="text-text-secondary">Sizing y spacing escalan por breakpoint para cambiar densidad.</p></div>
      <div class="panel"><h6 class="mb-3 text-text-secondary">Capa componente</h6><p class="text-text-secondary">Decisiones por componente (radius, borde, tipo) que referencian las capas superiores.</p></div>
    </div>`)}
  `)
