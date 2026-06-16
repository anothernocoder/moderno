import { icon, sub, demo, sectionShell, av } from '../ui.js'

/* ---------- charts SVG livianos ---------- */
const pts = [12, 18, 14, 24, 20, 30, 26, 38, 34, 44, 40, 52]
const toPath = (arr, w = 280, h = 80) => {
  const max = Math.max(...arr)
  const step = w / (arr.length - 1)
  return arr.map((v, i) => `${i ? 'L' : 'M'}${(i * step).toFixed(1)},${(h - (v / max) * (h - 8)).toFixed(1)}`).join(' ')
}
const lineChart = (w = 280, h = 80) => `
  <svg viewBox="0 0 ${w} ${h}" class="w-full" preserveAspectRatio="none" style="height:${h}px" aria-hidden="true">
    <path d="${toPath(pts, w, h)}" fill="none" stroke="var(--md-text-primary)" stroke-width="1.5"/>
  </svg>`
const areaChart = (w = 280, h = 90) => `
  <svg viewBox="0 0 ${w} ${h}" class="w-full" preserveAspectRatio="none" style="height:${h}px" aria-hidden="true">
    <path d="${toPath(pts, w, h)} L${w},${h} L0,${h} Z" fill="color-mix(in srgb, var(--md-text-primary) 12%, transparent)"/>
    <path d="${toPath(pts, w, h)}" fill="none" stroke="var(--md-text-primary)" stroke-width="1.5"/>
  </svg>`
const sparkline = (color = 'var(--md-success)') => `
  <svg viewBox="0 0 80 24" width="80" height="24" preserveAspectRatio="none" aria-hidden="true">
    <path d="${toPath([10, 14, 12, 18, 16, 22, 20, 26], 80, 24)}" fill="none" stroke="${color}" stroke-width="1.5"/>
  </svg>`
const barChart = () => `
  <div class="flex items-end gap-2 h-28">
    ${[40, 65, 50, 80, 60, 95, 72, 88, 55, 70, 92, 100].map((v) => `<div class="flex-1 bg-text-primary/80 hover:bg-text-primary transition-colors" style="height:${v}%"></div>`).join('')}
  </div>
  <div class="flex justify-between mt-2 spec"><span>jul</span><span>dic</span><span>jun</span></div>`
const donut = () => `
  <svg viewBox="0 0 42 42" width="120" height="120" aria-hidden="true">
    <circle cx="21" cy="21" r="15.9" fill="none" stroke="var(--md-border-default)" stroke-width="5"/>
    <circle cx="21" cy="21" r="15.9" fill="none" stroke="var(--md-text-primary)" stroke-width="5" stroke-dasharray="46 54" stroke-dashoffset="25"/>
    <circle cx="21" cy="21" r="15.9" fill="none" stroke="var(--md-text-secondary)" stroke-width="5" stroke-dasharray="28 72" stroke-dashoffset="-21"/>
    <text x="21" y="23.5" text-anchor="middle" fill="var(--md-text-primary)" style="font-size:7px">74 %</text>
  </svg>`

const feedItems = [
  ['LR', 'Laura Restrepo', 'aprobó el ajuste de inventario', 'hace 12 min', ''],
  ['MV', 'Mateo Vélez', 'creó la transferencia', 'hace 1 h', 'TRF-0291 · 24 uds a Bodega Norte'],
  ['JS', 'Julia Sáenz', 'comentó en el pedido PED-1102', 'hace 3 h', '“Confirmar dirección antes de despachar.”'],
]

export const toc = { num: '04', title: 'Aplicaciones', items: [
  ['a-pageheaders', 'Page headers'], ['a-cardheaders', 'Card headers'], ['a-sectiontop', 'Section top'],
  ['a-sectionbottom', 'Section bottom'], ['a-desclist', 'Description List'], ['a-stats', 'Stats'],
  ['a-calendars', 'Calendars'], ['a-charts', 'Charts'], ['a-kpi', 'KPI Cards'], ['a-spark', 'Spark Charts'],
  ['a-status', 'Status monitoring'], ['a-appcards', 'Cards'], ['a-tablas', 'Tables'], ['a-gridlists', 'Grid lists'],
  ['a-stacked', 'Stacked List'], ['a-feeds', 'Feeds'], ['a-toggles', 'Toggles'], ['a-actionpanels', 'Action panels'],
  ['a-checkboxes', 'Checkboxes'], ['a-combobox', 'Comboboxes'], ['a-radiogroups', 'Radio Groups'],
  ['a-textareas', 'Text areas'], ['a-inputgroups', 'Input Groups'], ['a-selectmenus', 'Select menus'],
  ['a-formlayouts', 'Form layouts'], ['a-alerts', 'Alerts'], ['a-appbanners', 'Banners'],
  ['a-emptystates', 'Empty states'], ['a-slideovers', 'Slide-overs'], ['a-modals', 'Modals / Dialogs'],
  ['a-shells', 'Application Shells'], ['a-mediaobjects', 'Media objects'], ['a-containers', 'Containers'],
  ['a-listcontainers', 'List containers'], ['a-panels', 'Panels'], ['a-native', 'Native mobile'],
]}

export const html = sectionShell('04 · Aplicaciones', 'aplicaciones', 'Aplicaciones',
  'Componentes y pantallas para apps, dashboards y SaaS. Las pantallas de ejemplo (4.8) — logins, onboarding, dashboard, settings, billing, tasks — se componen con estos bloques.',
  `
  <!-- ============ 4.1 headings ============ -->
  <h6 class="mt-12 text-text-secondary">4.1 · Headings</h6>

  ${sub('a-pageheaders', 'Page headers', 'Títulos de página con acciones, breadcrumbs y meta.')}
  ${demo('', `
    <div>
      <p class="text-size-small text-text-secondary"><a href="#" class="hover:text-text-primary">Inventario</a> / <a href="#" class="hover:text-text-primary">Bodegas</a> / Norte</p>
      <div class="mt-3 flex flex-wrap items-center gap-4">
        <h2 class="text-headline-md flex-1">Bodega Norte</h2>
        <button class="btn btn-secondary">${icon.download(14)} Exportar</button>
        <button class="btn btn-primary">${icon.plus(14)} Nuevo movimiento</button>
      </div>
      <div class="mt-2 flex flex-wrap gap-5 text-size-small text-text-secondary">
        <span class="flex items-center gap-1.5">${icon.pin(13)} Medellín</span>
        <span class="flex items-center gap-1.5">${icon.box(13)} 1.240 referencias</span>
        <span class="flex items-center gap-1.5">${icon.clock(13)} actualizada hace 2 h</span>
      </div>
    </div>`)}

  ${sub('a-cardheaders', 'Card headers', 'Headers para tarjetas y paneles.')}
  ${demo('', `
    <div class="card max-w-xl">
      <div class="flex items-center gap-3 px-5 py-4 border-b border-border-default">
        <h4 class="flex-1">Movimientos recientes</h4>
        <button class="btn btn-ghost btn-sm">Ver todos</button>
        <button class="btn btn-ghost btn-sm btn-icon" aria-label="Opciones">${icon.dots(14)}</button>
      </div>
      <div class="p-5 text-size-regular text-text-secondary">Contenido de la tarjeta…</div>
    </div>`)}

  ${sub('a-sectiontop', 'Section top', 'Headers de sección dentro de una vista.')}
  ${demo('', `
    <div class="flex items-center gap-4 pb-3 border-b border-border-default">
      <div class="flex-1"><h5 class="text-weight-medium">Reservas activas</h5><p class="text-size-small text-text-secondary">Pedidos sin despachar que bloquean stock.</p></div>
      <button class="btn btn-secondary btn-sm">${icon.filters(13)} Filtrar</button>
    </div>`)}

  ${sub('a-sectionbottom', 'Section bottom', 'Barras inferiores de sección (acciones / resumen).')}
  ${demo('', `
    <div class="flex items-center gap-4 pt-4 border-t border-border-default">
      <span class="text-size-small text-text-secondary flex-1">3 cambios sin guardar</span>
      <button class="btn btn-ghost">Descartar</button>
      <button class="btn btn-primary">Guardar cambios</button>
    </div>`)}

  <!-- ============ 4.2 data display ============ -->
  <h6 class="mt-16 text-text-secondary">4.2 · Data display</h6>

  ${sub('a-desclist', 'Description List', 'Listas de detalle clave/valor.')}
  ${demo('', `
    <dl class="card max-w-xl divide-y divide-border-default text-size-regular">
      ${[['Nombre', 'Café tostado 500 g'], ['SKU', 'SKU-08841'], ['Categoría', 'Bebidas'], ['Unidad', 'Paquete'], ['Costo promedio', '$24.100'], ['Creado', '3 de marzo de 2025']]
        .map(([k, v]) => `<div class="grid grid-cols-3 gap-4 px-5 py-3"><dt class="text-text-secondary">${k}</dt><dd class="col-span-2">${v}</dd></div>`).join('')}
    </dl>`)}

  ${sub('a-stats', 'Stats', 'Bloques y tiles de métricas.')}
  ${demo('', `
    <div class="grid sm:grid-cols-3 gap-px bg-border-default border border-border-default">
      ${[['Pedidos hoy', '142', '+8 %', 'text-success'], ['Ticket promedio', '$86.400', '−2 %', 'text-error'], ['Tasa de quiebre', '1,2 %', '−0,4 pts', 'text-success']]
        .map(([l, v, d, c]) => `<div class="bg-surface-base p-5"><p class="text-size-small text-text-secondary">${l}</p><p class="mt-1 text-headline-md tabular-nums">${v}</p><p class="mt-1 text-size-small ${c}">${d} <span class="text-text-secondary">vs. ayer</span></p></div>`).join('')}
    </div>`, false)}

  ${sub('a-calendars', 'Calendars', 'Vistas de calendario y fecha.')}
  ${demo('vista de mes con eventos', `
    <div class="card p-5 max-w-2xl">
      <div class="flex items-center justify-between mb-4">
        <h4>Junio 2026</h4>
        <div class="flex gap-1"><button class="btn btn-ghost btn-sm btn-icon" aria-label="Anterior">${icon.chevronLeft(14)}</button><button class="btn btn-ghost btn-sm">Hoy</button><button class="btn btn-ghost btn-sm btn-icon" aria-label="Siguiente">${icon.chevronRight(14)}</button></div>
      </div>
      <div class="grid grid-cols-7 text-size-tiny text-text-secondary mb-2">${['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'].map((d) => `<span class="px-2">${d}</span>`).join('')}</div>
      <div class="grid grid-cols-7 gap-px bg-border-default border border-border-default text-size-small">
        ${Array.from({ length: 28 }, (_, i) => {
          const d = i + 1
          const ev = { 4: ['Conteo cíclico', 'badge-info'], 11: ['Cierre fiscal', 'badge-warning'], 18: ['Auditoría', 'badge-success'] }[d]
          return `<div class="bg-surface-base min-h-16 p-2 ${d === 11 ? 'outline outline-1 outline-primary -outline-offset-1' : ''}">
            <span class="${d === 11 ? 'text-text-primary' : 'text-text-secondary'}">${d}</span>
            ${ev ? `<span class="badge ${ev[1]} !h-[16px] !px-1.5 !text-[9px] mt-1 max-w-full"><span class="truncate">${ev[0]}</span></span>` : ''}
          </div>`
        }).join('')}
      </div>
    </div>`)}

  ${sub('a-charts', 'Charts', 'Composiciones de área, barras, bar lists, líneas, donut y barras compuestas. Los charts en tiempo real usan <a href="https://benji.org/liveline" class="underline underline-offset-2">liveline</a> (canvas, 60fps).')}
  ${demo('tiempo real · liveline', `
    <div class="card p-5">
      <div class="flex items-center justify-between mb-3">
        <div><p class="text-size-small text-text-secondary">Transacciones por minuto</p><p class="text-size-tiny text-text-secondary mt-0.5">stream simulado · interpolación 60fps</p></div>
        <span class="badge badge-success"><span class="badge-dot"></span>En vivo</span>
      </div>
      <div id="live-chart" style="height:200px"></div>
    </div>`)}
  ${demo('área · línea', `
    <div class="grid md:grid-cols-2 gap-5">
      <div class="card p-5"><p class="text-size-small text-text-secondary">Ingresos últimos 12 meses</p><p class="text-headline-md mt-1 tabular-nums">$412 M</p><div class="mt-4">${areaChart()}</div></div>
      <div class="card p-5"><p class="text-size-small text-text-secondary">Unidades despachadas</p><p class="text-headline-md mt-1 tabular-nums">28.410</p><div class="mt-4">${lineChart()}</div></div>
    </div>`)}
  ${demo('barras · donut · bar list', `
    <div class="grid md:grid-cols-3 gap-5">
      <div class="card p-5"><p class="text-size-small text-text-secondary mb-4">Ventas por mes</p>${barChart()}</div>
      <div class="card p-5 flex flex-col items-center"><p class="text-size-small text-text-secondary self-start mb-2">Distribución por canal</p>${donut()}
        <div class="mt-3 space-y-1 text-size-small self-stretch">
          <p class="flex items-center gap-2"><span class="indicator indicator-sm bg-text-primary"></span>Directo · 46 %</p>
          <p class="flex items-center gap-2"><span class="indicator indicator-sm bg-text-secondary"></span>Marketplace · 28 %</p>
          <p class="flex items-center gap-2"><span class="indicator indicator-sm bg-border-strong"></span>Mayorista · 26 %</p>
        </div>
      </div>
      <div class="card p-5"><p class="text-size-small text-text-secondary mb-4">Top productos</p>
        <div class="space-y-3 text-size-small">
          ${[['Café tostado', 92], ['Panela orgánica', 71], ['Miel de abejas', 54], ['Chocolate', 38]].map(([n, v]) => `
            <div><div class="flex justify-between mb-1"><span>${n}</span><span class="text-text-secondary tabular-nums">${v}</span></div>
            <div class="h-4 bg-border-default"><div class="h-full bg-text-primary/80" style="width:${v}%"></div></div></div>`).join('')}
        </div>
      </div>
    </div>`)}

  ${sub('a-kpi', 'KPI Cards', 'Tarjetas de métrica principal con tendencia.')}
  ${demo('', `
    <div class="grid sm:grid-cols-3 gap-5">
      ${[['MRR', '$92,4 M', '+6,1 %', true], ['Churn mensual', '1,8 %', '+0,3 pts', false], ['Clientes activos', '4.218', '+212', true]]
        .map(([l, v, d, up]) => `
        <div class="card p-5 flex items-start justify-between gap-3">
          <div><p class="text-size-small text-text-secondary">${l}</p><p class="mt-1 text-headline-md tabular-nums">${v}</p>
          <span class="badge ${up ? 'badge-success' : 'badge-error'} mt-2">${d}</span></div>
          ${sparkline(up ? 'var(--md-success)' : 'var(--md-error)')}
        </div>`).join('')}
    </div>`)}

  ${sub('a-spark', 'Spark Charts', 'Sparklines inline para tablas y resúmenes.')}
  ${demo('', `
    <div class="card max-w-xl divide-y divide-border-default">
      ${[['Bogotá', '$28,1 M', 'var(--md-success)'], ['Medellín', '$14,9 M', 'var(--md-success)'], ['Cali', '$5,2 M', 'var(--md-error)']]
        .map(([c, v, col]) => `<div class="flex items-center gap-4 px-5 py-3 text-size-regular"><span class="flex-1">${c}</span>${sparkline(col)}<span class="tabular-nums w-20 text-right">${v}</span></div>`).join('')}
    </div>`)}

  ${sub('a-status', 'Status monitoring', 'Displays de salud/estado del servicio.')}
  ${demo('', `
    <div class="card p-5 max-w-2xl">
      <div class="flex items-center gap-3 mb-5"><span class="indicator indicator-lg bg-success"></span><h4 class="flex-1">Todos los sistemas operativos</h4><span class="spec">uptime 99,98 %</span></div>
      <div class="space-y-4">
        ${[['API', 100], ['Panel web', 100], ['Sincronización POS', 96], ['Webhooks', 99]].map(([s, u]) => `
          <div>
            <div class="flex justify-between text-size-small mb-1.5"><span>${s}</span><span class="text-text-secondary">${u === 100 ? 'operativo' : 'degradado'}</span></div>
            <div class="flex gap-px">${Array.from({ length: 40 }, (_, i) => `<span class="h-6 flex-1 ${u < 100 && (i === 22 || i === 23) ? 'bg-warning' : u < 99 && i > 30 ? 'bg-error' : 'bg-success/70'}"></span>`).join('')}</div>
          </div>`).join('')}
      </div>
    </div>`)}

  ${sub('a-appcards', 'Cards', 'Tarjetas de contenido de aplicación.')}
  ${demo('', `
    <div class="grid md:grid-cols-2 gap-5 max-w-3xl">
      <div class="card p-5">
        <div class="flex items-center justify-between"><h4>Tareas del cierre</h4><span class="badge badge-warning">3 pendientes</span></div>
        <ul class="mt-4 space-y-2.5 text-size-regular">
          ${[['Conciliar bodega Norte', true], ['Validar diferencias > 2 %', false], ['Firmar acta de cierre', false]].map(([t, done]) => `
            <li class="flex items-center gap-3 ${done ? 'text-text-secondary line-through' : ''}"><input type="checkbox" class="check" ${done ? 'checked' : ''}>${t}</li>`).join('')}
        </ul>
      </div>
      <div class="card p-5 flex flex-col">
        <h4>Capacidad de bodega</h4>
        <div class="mt-4 flex-1 space-y-3">
          ${[['Principal', 84], ['Norte', 56], ['Pacífico', 31]].map(([b, p]) => `
            <div><div class="flex justify-between text-size-small mb-1"><span>${b}</span><span class="text-text-secondary">${p} %</span></div>
            <div class="h-1.5 bg-border-default"><div class="h-full ${p > 80 ? 'bg-warning' : 'bg-primary'}" style="width:${p}%"></div></div></div>`).join('')}
        </div>
      </div>
    </div>`)}

  <!-- ============ 4.3 listas ============ -->
  <h6 class="mt-16 text-text-secondary">4.3 · Listas</h6>

  ${sub('a-tablas', 'Tables', 'Tablas de datos de aplicación: orden, selección y acciones por fila.')}
  ${demo('', `
    <div class="overflow-x-auto">
    <table class="table">
      <thead><tr>
        <th class="w-10"><input type="checkbox" class="check" data-indeterminate aria-label="Seleccionar todo"></th>
        <th><button class="inline-flex items-center gap-1 hover:text-text-primary">Pedido ${icon.chevronDown(12)}</button></th>
        <th>Cliente</th><th>Estado</th><th class="num">Total</th><th class="w-12"></th>
      </tr></thead>
      <tbody>
        ${[['PED-1104', 'Bruno Café', 'Despachado', 'badge-success', '$412.800', true], ['PED-1103', 'Verde Logística', 'Preparando', 'badge-info', '$1.208.400', true], ['PED-1102', 'Kapital Foods', 'Pago pendiente', 'badge-warning', '$96.500', false]]
          .map(([id, c, s, b, t, sel]) => `
          <tr>
            <td><input type="checkbox" class="check" ${sel ? 'checked' : ''} aria-label="Seleccionar ${id}"></td>
            <td class="spec !text-text-primary">${id}</td><td>${c}</td>
            <td><span class="badge ${b}"><span class="badge-dot"></span>${s}</span></td>
            <td class="num">${t}</td>
            <td><button class="btn btn-ghost btn-sm btn-icon" aria-label="Acciones de ${id}">${icon.dots(14)}</button></td>
          </tr>`).join('')}
      </tbody>
    </table>
    <div class="px-4 py-3 border-t border-border-strong flex items-center justify-between text-size-small text-text-secondary">
      <span>2 seleccionados</span>
      <div class="flex gap-2"><button class="btn btn-secondary btn-sm">Exportar</button><button class="btn btn-danger btn-sm">Cancelar pedidos</button></div>
    </div></div>`, false)}

  ${sub('a-gridlists', 'Grid lists', 'Layouts de tarjetas/tiles en grilla.')}
  ${demo('', `
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      ${[['Principal', '8.412'], ['Norte', '1.240'], ['Pacífico', '964'], ['Tránsito', '128']].map(([n, c]) => `
        <a href="#" class="card p-5 hover:border-border-strong transition-colors">
          <span class="w-9 h-9 well flex items-center justify-center">${icon.box(16)}</span>
          <p class="mt-3 text-size-regular">${n}</p><p class="text-size-small text-text-secondary tabular-nums">${c} unidades</p>
        </a>`).join('')}
    </div>`)}

  ${sub('a-stacked', 'Stacked List', 'Listas de registros apiladas verticalmente.')}
  ${demo('', `
    <div class="card max-w-xl divide-y divide-border-default">
      ${[['LR', 'Laura Restrepo', 'laura@bruno.co', 'Admin', 'hace 5 min'], ['MV', 'Mateo Vélez', 'mateo@bruno.co', 'Editor', 'hace 2 h'], ['JS', 'Julia Sáenz', 'julia@bruno.co', 'Lectora', 'ayer']]
        .map(([i, n, e, r, t]) => `
        <div class="flex items-center gap-4 px-5 py-4">
          ${av(i, 36)}
          <div class="flex-1 min-w-0"><p class="text-size-regular truncate">${n}</p><p class="text-size-small text-text-secondary truncate">${e}</p></div>
          <div class="text-right"><p class="text-size-small">${r}</p><p class="text-size-tiny text-text-secondary">activo ${t}</p></div>
        </div>`).join('')}
    </div>`)}

  ${sub('a-feeds', 'Feeds', 'Feeds de actividad / línea de tiempo.')}
  ${demo('', `
    <div class="max-w-xl space-y-0">
      ${feedItems.map(([i, n, a, t, d], idx) => `
        <div class="flex gap-4 ${idx < feedItems.length - 1 ? 'pb-6 relative' : ''}">
          ${idx < feedItems.length - 1 ? '<span class="absolute left-[17px] top-10 bottom-0 w-px bg-border-default"></span>' : ''}
          ${av(i, 36)}
          <div class="flex-1 pt-1.5">
            <p class="text-size-regular"><span class="text-weight-medium">${n}</span> <span class="text-text-secondary">${a}</span></p>
            ${d ? `<p class="mt-1.5 text-size-small text-text-secondary card px-3 py-2 inline-block">${d}</p>` : ''}
            <p class="mt-1 text-size-tiny text-text-secondary">${t}</p>
          </div>
        </div>`).join('')}
    </div>`)}

  <!-- ============ 4.4 forms ============ -->
  <h6 class="mt-16 text-text-secondary">4.4 · Forms</h6>

  ${sub('a-toggles', 'Toggles', 'Filas de ajustes con toggle dentro de la app.')}
  ${demo('', `
    <div class="card max-w-xl divide-y divide-border-default">
      ${[['Notificaciones de stock', 'Recibe un correo cuando un producto cruce su punto de reorden.', true], ['Resumen semanal', 'Un correo los lunes con el estado de la operación.', true], ['Acceso del contador', 'Permite lectura de reportes financieros a usuarios externos.', false]]
        .map(([t, d, on]) => `
        <label class="flex items-start justify-between gap-6 px-5 py-4 cursor-pointer">
          <span><span class="text-size-regular block">${t}</span><span class="text-size-small text-text-secondary">${d}</span></span>
          <span class="inline-flex mt-1"><input type="checkbox" class="peer sr-only" ${on ? 'checked' : ''}><span class="switch"></span></span>
        </label>`).join('')}
    </div>`)}

  ${sub('a-actionpanels', 'Action panels', 'Paneles que emparejan una descripción con una acción.')}
  ${demo('', `
    <div class="space-y-4 max-w-2xl">
      <div class="card p-5 flex flex-wrap items-center gap-4">
        <div class="flex-1 min-w-52"><h5 class="text-weight-medium">Exportar contabilidad</h5><p class="text-size-small text-text-secondary mt-1">Genera el archivo para tu software contable con los movimientos del periodo.</p></div>
        <button class="btn btn-secondary">Generar archivo</button>
      </div>
      <div class="card p-5 flex flex-wrap items-center gap-4 border-error/40">
        <div class="flex-1 min-w-52"><h5 class="text-weight-medium text-error">Eliminar bodega</h5><p class="text-size-small text-text-secondary mt-1">Esta acción es permanente. El stock debe transferirse antes.</p></div>
        <button class="btn btn-danger">Eliminar</button>
      </div>
    </div>`)}

  ${sub('a-checkboxes', 'Checkboxes', 'Grupos de checkbox de aplicación, con descripción.')}
  ${demo('', `
    <fieldset class="max-w-md space-y-4">
      <legend class="field-label !mb-4">Notificarme cuando…</legend>
      ${[['un pedido se pague', 'Incluye pagos parciales.', true], ['haya un quiebre de stock', 'Solo productos activos.', true], ['un usuario invite a otro', '', false]]
        .map(([t, d, c]) => `
        <label class="flex gap-3 cursor-pointer">
          <input type="checkbox" class="check mt-0.5" ${c ? 'checked' : ''}>
          <span><span class="text-size-regular block">${t}</span>${d ? `<span class="text-size-small text-text-secondary">${d}</span>` : ''}</span>
        </label>`).join('')}
    </fieldset>`)}

  ${sub('a-combobox', 'Comboboxes', 'Select con búsqueda / autocompletar. Escribe para filtrar.')}
  ${demo('', `
    <div class="max-w-sm relative" data-combobox>
      <label class="field-label" for="cb-1">Producto</label>
      <div class="relative">
        <input class="input pr-9" id="cb-1" placeholder="Busca por nombre o SKU" autocomplete="off" data-combobox-input>
        <span class="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none">${icon.chevronDown(14)}</span>
      </div>
      <div class="absolute left-0 right-0 mt-1 card shadow-large z-20 py-2 hidden max-h-56 overflow-y-auto" data-combobox-list>
        ${['Café tostado 500 g — SKU-08841', 'Café verde 1 kg — SKU-08902', 'Panela orgánica 1 kg — SKU-04412', 'Chocolate de mesa 250 g — SKU-07733', 'Miel de abejas 330 ml — SKU-09120']
          .map((o) => `<button class="w-full text-left px-4 py-2 text-size-regular hover:bg-border-default" data-combobox-option>${o}</button>`).join('')}
        <p class="px-4 py-2 text-size-regular text-text-secondary hidden" data-combobox-empty>Sin resultados</p>
      </div>
    </div>`)}

  ${sub('a-radiogroups', 'Radio Groups', 'Patrones de grupo radio en tarjetas seleccionables.')}
  ${demo('', `
    <div class="grid sm:grid-cols-3 gap-4 max-w-2xl" role="radiogroup">
      ${[['Estándar', '3–5 días hábiles', 'Gratis', true], ['Express', '24–48 horas', '$12.000', false], ['Mismo día', 'Solo Bogotá', '$28.000', false]]
        .map(([t, d, p, c]) => `
        <label class="card p-4 cursor-pointer has-[:checked]:border-primary transition-colors">
          <span class="flex items-start justify-between"><input type="radio" name="rg-env" class="radio-input" ${c ? 'checked' : ''}><span class="text-size-small">${p}</span></span>
          <span class="block mt-2 text-size-regular">${t}</span><span class="text-size-small text-text-secondary">${d}</span>
        </label>`).join('')}
    </div>`)}

  ${sub('a-textareas', 'Text areas', 'Multilínea con contador y estados, para apps.')}
  ${demo('', `
    <div class="max-w-md">
      <label class="field-label" for="ata-1">Motivo del ajuste <span class="text-error">*</span></label>
      <textarea class="input h-24" id="ata-1">Diferencia detectada en conteo cíclico, zona B.</textarea>
      <div class="flex justify-between mt-1.5"><p class="field-hint !mt-0">Requerido para ajustes negativos.</p><span class="spec">52/200</span></div>
    </div>`)}

  ${sub('a-inputgroups', 'Input Groups', 'Inputs compuestos con prefijos, sufijos y add-ons.')}
  ${demo('', `
    <div class="grid md:grid-cols-2 gap-6 max-w-3xl">
      <div>
        <label class="field-label" for="ig-1">Precio</label>
        <div class="flex">
          <span class="inline-flex items-center px-3 border border-r-0 border-border-strong bg-border-default text-size-regular text-text-secondary">$</span>
          <input class="input" id="ig-1" value="38.500">
          <span class="inline-flex items-center px-3 border border-l-0 border-border-strong bg-border-default text-size-regular text-text-secondary">COP</span>
        </div>
      </div>
      <div>
        <label class="field-label" for="ig-2">Subdominio</label>
        <div class="flex">
          <input class="input" id="ig-2" value="bruno">
          <span class="inline-flex items-center px-3 border border-l-0 border-border-strong bg-border-default text-size-regular text-text-secondary">.moderno.co</span>
        </div>
      </div>
    </div>`)}

  ${sub('a-selectmenus', 'Select menus', 'Menús de selección de aplicación, con avatar/metadata.')}
  ${demo('', `
    <div class="max-w-sm relative" data-dropdown>
      <span class="field-label">Responsable</span>
      <button class="btn btn-secondary w-full !justify-between" data-dropdown-btn><span class="flex items-center gap-2">${av('LR', 22)} Laura Restrepo</span> ${icon.chevronDown(14)}</button>
      <div class="absolute left-0 right-0 mt-1 card shadow-large z-20 py-2 hidden" data-dropdown-menu>
        ${[['LR', 'Laura Restrepo', 'Admin'], ['MV', 'Mateo Vélez', 'Editor'], ['JS', 'Julia Sáenz', 'Lectora']].map(([i, n, r]) => `
          <button class="w-full flex items-center gap-3 px-4 py-2 text-size-regular hover:bg-border-default">${av(i, 24)}<span class="flex-1 text-left">${n}</span><span class="text-size-small text-text-secondary">${r}</span></button>`).join('')}
      </div>
    </div>`)}

  ${sub('a-formlayouts', 'Form layouts', 'Patrones de layout de formulario completo.')}
  ${demo('dos columnas con secciones', `
    <form class="max-w-2xl space-y-8">
      <div class="grid md:grid-cols-3 gap-6">
        <div><h5 class="text-weight-medium">Identidad</h5><p class="text-size-small text-text-secondary mt-1">Cómo aparece el producto en catálogo y facturas.</p></div>
        <div class="md:col-span-2 space-y-4">
          <div><label class="field-label">Nombre</label><input class="input" value="Café tostado 500 g"></div>
          <div class="grid grid-cols-2 gap-4">
            <div><label class="field-label">SKU</label><input class="input" value="SKU-08841"></div>
            <div><label class="field-label">Código de barras</label><input class="input" placeholder="EAN-13"></div>
          </div>
        </div>
      </div>
      <hr class="divider">
      <div class="grid md:grid-cols-3 gap-6">
        <div><h5 class="text-weight-medium">Inventario</h5><p class="text-size-small text-text-secondary mt-1">Reglas de stock y reorden.</p></div>
        <div class="md:col-span-2 grid grid-cols-2 gap-4">
          <div><label class="field-label">Stock mínimo</label><input class="input" value="40"></div>
          <div><label class="field-label">Punto de reorden</label><input class="input" value="60"></div>
        </div>
      </div>
      <div class="flex justify-end gap-2 pt-4 border-t border-border-default">
        <button class="btn btn-ghost" type="button">Cancelar</button><button class="btn btn-primary" type="button">Guardar producto</button>
      </div>
    </form>`)}

  <!-- ============ 4.5 feedback ============ -->
  <h6 class="mt-16 text-text-secondary">4.5 · Feedback</h6>

  ${sub('a-alerts', 'Alerts', 'Mensajes inline: info / éxito / advertencia / error.')}
  ${demo('', `
    <div class="space-y-3 max-w-2xl">
      ${[['info', icon.info(15), 'La sincronización con el POS corre cada 5 minutos.'], ['success', icon.checkCircle(15), 'Producto guardado. Ya está visible en el catálogo.'], ['warning', icon.warn(15), 'Este SKU existe en otra bodega con costo distinto.'], ['error', icon.xCircle(15), 'No se pudo guardar: el stock mínimo no puede superar el punto de reorden.']]
        .map(([k, ic, m]) => `
        <div class="flex items-start gap-3 px-4 py-3 text-size-regular border" style="border-color:color-mix(in srgb, var(--md-${k}) 35%, transparent); background:color-mix(in srgb, var(--md-${k}) 7%, transparent)">
          <span class="text-${k} mt-0.5 shrink-0">${ic}</span><p>${m}</p>
        </div>`).join('')}
    </div>`)}

  ${sub('a-appbanners', 'Banners', 'Notificaciones a nivel de aplicación.')}
  ${demo('', `
    <div class="flex items-center gap-3 px-5 py-3 border border-warning/40 bg-warning/8 text-size-regular">
      <span class="text-warning shrink-0">${icon.warn(15)}</span>
      <p class="flex-1">Tu plan vence en 5 días. Renueva para no perder acceso a reportes.</p>
      <button class="btn btn-primary btn-sm">Renovar</button>
      <button class="btn btn-ghost btn-sm btn-icon" aria-label="Cerrar">${icon.x(13)}</button>
    </div>`, false)}

  ${sub('a-emptystates', 'Empty states', 'Estados de cero datos / primer uso.')}
  ${demo('', `
    <div class="card py-14 px-6 text-center max-w-xl mx-auto">
      <span class="mx-auto w-12 h-12 well flex items-center justify-center text-text-secondary">${icon.box(20)}</span>
      <h4 class="mt-4">Aún no hay movimientos</h4>
      <p class="mt-1 text-size-regular text-text-secondary max-w-sm mx-auto">Registra tu primera entrada de inventario o importa un archivo CSV con tu stock actual.</p>
      <div class="mt-5 flex justify-center gap-3">
        <button class="btn btn-primary">${icon.plus(14)} Registrar entrada</button>
        <button class="btn btn-secondary">${icon.upload(14)} Importar CSV</button>
      </div>
    </div>`)}

  <!-- ============ 4.6 overlays ============ -->
  <h6 class="mt-16 text-text-secondary">4.6 · Overlays</h6>

  ${sub('a-slideovers', 'Slide-overs', 'Drawers laterales para flujos de detalle/edición.')}
  ${demo('', `
    <button class="btn btn-secondary" data-open="#a-slideover">Abrir slide-over</button>
    <dialog class="sheet" id="a-slideover">
      <div class="flex items-center justify-between px-6 h-14 border-b border-border-default">
        <h4>PED-1103 · Verde Logística</h4>
        <button class="btn btn-ghost btn-sm btn-icon" data-close aria-label="Cerrar">${icon.x(14)}</button>
      </div>
      <div class="p-6 space-y-5 text-size-regular overflow-y-auto">
        <span class="badge badge-info"><span class="badge-dot"></span>Preparando</span>
        <dl class="space-y-2">
          ${[['Total', '$1.208.400'], ['Items', '18 productos'], ['Entrega', 'Cl 10 #43E-31, Medellín']].map(([k, v]) => `<div class="flex justify-between"><dt class="text-text-secondary">${k}</dt><dd>${v}</dd></div>`).join('')}
        </dl>
        <hr class="divider">
        <p class="text-text-secondary">El pedido se preparó en bodega Norte y espera guía de transporte.</p>
      </div>
      <div class="mt-auto px-6 py-4 border-t border-border-default flex gap-2 justify-end">
        <button class="btn btn-ghost" data-close>Cerrar</button><button class="btn btn-primary" data-close>Generar guía</button>
      </div>
    </dialog>`)}

  ${sub('a-modals', 'Modals o Dialogs', 'Diálogos modales centrados.')}
  ${demo('confirmación destructiva', `
    <button class="btn btn-secondary" data-open="#a-modal-del">Abrir modal</button>
    <dialog class="modal" id="a-modal-del">
      <div class="p-6">
        <span class="w-10 h-10 flex items-center justify-center bg-error/10 text-error">${icon.trash(16)}</span>
        <h4 class="mt-4">¿Eliminar la bodega Pacífico?</h4>
        <p class="mt-2 text-size-regular text-text-secondary">Esta acción no se puede deshacer. Las 964 unidades en stock deben transferirse primero.</p>
      </div>
      <div class="px-6 py-4 border-t border-border-default flex justify-end gap-2">
        <button class="btn btn-ghost" data-close>Cancelar</button>
        <button class="btn btn-danger" data-close>Sí, eliminar</button>
      </div>
    </dialog>`)}

  <!-- ============ 4.7 layouts ============ -->
  <h6 class="mt-16 text-text-secondary">4.7 · Layouts</h6>

  ${sub('a-shells', 'Application Shells', 'Marcos de app: sidebar + topbar + región de contenido.')}
  ${demo('', `
    <div class="card overflow-hidden">
      <div class="flex h-80">
        <div class="w-48 border-r border-border-default p-3 hidden sm:block">
          <p class="px-2 py-1.5 text-weight-medium text-size-regular">moderno</p>
          <nav class="mt-2 space-y-1 text-size-small">
            ${[['Resumen', true], ['Inventario', false], ['Pedidos', false], ['Reportes', false]].map(([t, a]) => `<a href="#" class="block px-2 py-1.5 ${a ? 'bg-border-default' : 'text-text-secondary hover:text-text-primary'}">${t}</a>`).join('')}
          </nav>
        </div>
        <div class="flex-1 flex flex-col min-w-0">
          <div class="h-12 border-b border-border-default flex items-center gap-3 px-4">
            <span class="text-size-regular flex-1">Resumen</span>
            <span class="text-text-secondary">${icon.bell(15)}</span>${av('LR', 24)}
          </div>
          <div class="flex-1 p-4 grid grid-cols-2 gap-3 content-start bg-surface-muted/40">
            <div class="card h-20 p-3"><p class="text-size-tiny text-text-secondary">Ventas</p><p class="text-body-lg tabular-nums mt-1">$48,2 M</p></div>
            <div class="card h-20 p-3"><p class="text-size-tiny text-text-secondary">Pedidos</p><p class="text-body-lg tabular-nums mt-1">142</p></div>
            <div class="card col-span-2 h-24 p-3"><p class="text-size-tiny text-text-secondary mb-2">Tendencia</p>${lineChart(400, 44)}</div>
          </div>
        </div>
      </div>
    </div>`, false)}

  ${sub('a-mediaobjects', 'Media objects', 'Patrones de media + texto.')}
  ${demo('', `
    <div class="space-y-5 max-w-xl">
      <div class="flex gap-4">
        <span class="w-14 h-14 well flex items-center justify-center shrink-0">${icon.box(20)}</span>
        <div><h5 class="text-weight-medium">Transferencia TRF-0291</h5><p class="text-size-regular text-text-secondary mt-1">24 unidades de Café tostado 500 g hacia Bodega Norte. Confirmada por L. Restrepo.</p></div>
      </div>
      <div class="flex gap-4 flex-row-reverse text-right">
        <span class="w-14 h-14 well flex items-center justify-center shrink-0">${icon.truck(20)}</span>
        <div><h5 class="text-weight-medium">Despacho en ruta</h5><p class="text-size-regular text-text-secondary mt-1">La guía 9981-2 salió del centro de distribución a las 08:14.</p></div>
      </div>
    </div>`)}

  ${sub('a-containers', 'Containers', 'Wrappers de layout con ancho máximo y padding consistente.')}
  ${demo('', `
    <div class="space-y-3">
      ${[['max-w-7xl · páginas de app', '100%'], ['max-w-3xl · formularios y detalle', '66%'], ['max-w-xl · diálogos y lectura', '42%']]
        .map(([l, w]) => `<div class="well py-3 text-center text-size-small text-text-secondary mx-auto" style="width:${w}">${l}</div>`).join('')}
    </div>`)}

  ${sub('a-listcontainers', 'List containers', 'Contenedores especializados para listas: header, cuerpo scrolleable y footer.')}
  ${demo('', `
    <div class="card max-w-xl">
      <div class="px-5 py-3 border-b border-border-default flex items-center justify-between">
        <h5 class="text-weight-medium">Quiebres de stock</h5><span class="badge badge-error">8</span>
      </div>
      <div class="max-h-44 overflow-y-auto divide-y divide-border-default">
        ${['Chocolate de mesa 250 g', 'Té verde 20 sobres', 'Azúcar morena 1 kg', 'Avena en hojuelas', 'Harina de maíz'].map((p) => `
          <div class="flex items-center justify-between px-5 py-3 text-size-regular"><span>${p}</span><button class="btn btn-ghost btn-sm">Reordenar</button></div>`).join('')}
      </div>
      <div class="px-5 py-3 border-t border-border-default text-size-small text-text-secondary">Actualizado hace 4 min</div>
    </div>`)}

  ${sub('a-panels', 'Panels', 'Superficies de panel genéricas.')}
  ${demo('', `
    <div class="grid md:grid-cols-3 gap-4">
      <div class="panel"><h6 class="text-text-secondary mb-2">Panel plano</h6><p class="text-size-regular text-text-secondary">Borde default, sin sombra. El panel de trabajo estándar.</p></div>
      <div class="panel shadow-small"><h6 class="text-text-secondary mb-2">Panel elevado</h6><p class="text-size-regular text-text-secondary">Elevación small para separación sutil.</p></div>
      <div class="panel !bg-surface-muted"><h6 class="text-text-secondary mb-2">Panel hundido</h6><p class="text-size-regular text-text-secondary">surface-muted para wells y zonas de soporte.</p></div>
    </div>`)}

  ${sub('a-native', '4.9 · Native mobile (iOS y Android)', 'Las apps nativas usan componentes de plataforma (HIG / Material 3), no web reskineada. Las fundaciones Moderno se mapean al theming de cada plataforma.')}
  ${demo('mapeo de fundaciones · web → nativo', `
    <div class="overflow-x-auto">
    <table class="table text-size-small">
      <thead><tr><th>Fundación Moderno</th><th>iOS (SwiftUI / UIKit)</th><th>Android (Compose / M3)</th></tr></thead>
      <tbody>
        ${[['Roles de color semánticos', 'Colores semánticos de asset catalog + apariencia claro/oscuro', 'Material color scheme (primary, surface, onSurface…)'], ['Tipografía h1–h6 / text-size-*', 'Dynamic Type (largeTitle…caption)', 'Material type scale (display…label)'], ['Spacing', 'Puntos (pt), safe-area aware', 'dp, window-insets aware'], ['Touch target mínimo', '≥ 44×44 pt', '≥ 48×48 dp'], ['Radius', 'cornerRadius / clipShape', 'Shapes (XS → XL)'], ['Elevación xxsmall–xxlarge', 'Capas, materiales/blur, sombras sutiles', 'Elevación tonal + sombra (0–5)'], ['Iconos', 'SF Symbols + marca', 'Material Symbols + marca']]
          .map((r) => `<tr>${r.map((c, i) => `<td class="${i ? 'text-text-secondary' : ''}">${c}</td>`).join('')}</tr>`).join('')}
      </tbody>
    </table></div>
    <p class="mt-4 text-size-small text-text-secondary max-w-2xl">Guía transversal: navegación nativa por plataforma (tab bar + stack + sheets en iOS; Scaffold + bottom bar/rail/drawer en Android), adaptación por form factor, ergonomía de plataforma y theming por roles — una sola definición de marca alimenta ambas apps.</p>`)}
  `)
