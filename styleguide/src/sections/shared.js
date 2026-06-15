import { icon, sub, demo, sectionShell, av } from '../ui.js'

const calendar = (label, selected = [12], range = []) => `
  <div class="card p-4 w-64">
    <div class="flex items-center justify-between mb-3">
      <button class="btn btn-ghost btn-sm btn-icon" aria-label="Mes anterior">${icon.chevronLeft()}</button>
      <span class="text-size-regular">${label}</span>
      <button class="btn btn-ghost btn-sm btn-icon" aria-label="Mes siguiente">${icon.chevronRight()}</button>
    </div>
    <div class="grid grid-cols-7 text-center text-size-tiny text-text-secondary mb-2">
      ${['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((d) => `<span>${d}</span>`).join('')}
    </div>
    <div class="grid grid-cols-7 text-center text-size-small gap-y-1">
      ${Array.from({ length: 30 }, (_, i) => {
        const d = i + 1
        const sel = selected.includes(d)
        const inR = range.length && d > range[0] && d < range[1]
        const edge = range.includes(d)
        return `<button class="h-8 w-8 mx-auto flex items-center justify-center transition-colors
          ${sel || edge ? 'bg-primary text-on-primary' : inR ? 'bg-border-default' : 'hover:bg-border-default'}">${d}</button>`
      }).join('')}
    </div>
  </div>`

export const toc = { num: '02', title: 'Componentes compartidos', items: [
  ['c-botones', 'Button'], ['c-textinput', 'Text input'], ['c-select', 'Dropdown / Selectbox'],
  ['c-textarea', 'Textarea'], ['c-datepicker', 'Date pickers'], ['c-checkbox', 'Checkbox'],
  ['c-radio', 'Radio'], ['c-toggle', 'Toggle'], ['c-list', 'List'], ['c-tabla', 'Table'],
  ['c-charts', 'Charts'], ['c-indicator', 'Indicator'], ['c-avatar', 'Avatar'], ['c-badge', 'Badge'],
  ['c-card', 'Card'], ['c-chips', 'Chips'], ['c-accordion', 'Accordion'], ['c-callout', 'Callout'],
  ['c-share', 'Share / Invite'], ['c-carousel', 'Carousel'], ['c-navbar', 'Navbars'],
  ['c-sidebar', 'Sidebar'], ['c-pagination', 'Pagination'], ['c-tabs', 'Tabs'],
  ['c-tooltip', 'Tooltip'], ['c-toast', 'Toast'], ['c-sheet', 'Sheet'], ['c-skeleton', 'Skeleton'],
  ['c-scrollbar', 'Scrollbar'], ['c-loaders', 'Loaders'], ['c-handler', 'Handler'], ['c-dividers', 'Dividers'],
]}

export const html = sectionShell('02 · Componentes compartidos', 'compartidos', 'Componentes compartidos',
  'Primitivas transversales reutilizadas por todos los dominios de producto. Átomos y moléculas del sistema.',
  `
  <!-- ============ 2.1 form inputs ============ -->
  <h6 class="mt-12 text-text-secondary">2.1 · Form inputs</h6>

  ${sub('c-botones', 'Button', 'Jerarquía primary / secondary / tertiary / ghost / link · tamaños sm / md / lg · estados · íconos opcionales. Una sola acción primaria por vista.')}
  ${demo('jerarquía', `
    <div class="flex flex-wrap items-center gap-3">
      <button class="btn btn-primary">Guardar cambios</button>
      <button class="btn btn-secondary">Cancelar</button>
      <button class="btn btn-tertiary">Duplicar</button>
      <button class="btn btn-ghost">Ver historial</button>
      <button class="btn btn-link">Ir a configuración</button>
      <button class="btn btn-danger">Eliminar</button>
    </div>`)}
  ${demo('tamaños · sm 32 / md 40 / lg 48', `
    <div class="flex flex-wrap items-center gap-3">
      <button class="btn btn-primary btn-sm">Pequeño</button>
      <button class="btn btn-primary">Mediano</button>
      <button class="btn btn-primary btn-lg">Grande</button>
    </div>`)}
  ${demo('ícono inicial · final · solo ícono · cargando · deshabilitado', `
    <div class="flex flex-wrap items-center gap-3">
      <button class="btn btn-secondary">${icon.download(14)} Exportar CSV</button>
      <button class="btn btn-secondary">Continuar ${icon.arrowRight(14)}</button>
      <button class="btn btn-secondary btn-icon" aria-label="Más opciones">${icon.dots(15)}</button>
      <button class="btn btn-primary" disabled><span class="spinner"></span> Procesando…</button>
      <button class="btn btn-primary" disabled>Deshabilitado</button>
      <button class="btn btn-secondary" disabled>Deshabilitado</button>
    </div>`)}

  ${sub('c-textinput', 'Text input', 'Etiqueta siempre visible, nunca solo placeholder. El error reemplaza al hint.')}
  ${demo('default · ícono inicial · error · deshabilitado', `
    <div class="grid md:grid-cols-2 gap-6 max-w-3xl">
      <div>
        <label class="field-label" for="ti-1">Nombre del producto</label>
        <input class="input" id="ti-1" placeholder="Ej. Café tostado 500 g">
        <p class="field-hint">Visible en el catálogo público.</p>
      </div>
      <div>
        <label class="field-label" for="ti-2">Buscar</label>
        <div class="relative">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">${icon.search(15)}</span>
          <input class="input pl-9" id="ti-2" type="search" placeholder="SKU, nombre o lote">
        </div>
      </div>
      <div>
        <label class="field-label" for="ti-3">Correo de facturación</label>
        <input class="input input-error" id="ti-3" type="email" value="ventas@bruno" aria-invalid="true" aria-describedby="ti-3-err">
        <p class="field-error" id="ti-3-err">Ingresa un correo válido, por ejemplo ventas@bruno.co.</p>
      </div>
      <div>
        <label class="field-label" for="ti-4">Campo deshabilitado</label>
        <input class="input" id="ti-4" value="No editable en este plan" disabled>
      </div>
    </div>`)}

  ${sub('c-select', 'Dropdown y Selectbox', 'Select nativo y menú dropdown custom para elegir una opción de una lista.')}
  ${demo('select nativo · dropdown custom', `
    <div class="grid md:grid-cols-2 gap-6 max-w-3xl items-start">
      <div>
        <label class="field-label" for="se-1">Bodega</label>
        <div class="relative">
          <select class="input" id="se-1">
            <option>Principal — Bogotá</option><option>Norte — Medellín</option><option>Pacífico — Cali</option>
          </select>
          <span class="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none">${icon.chevronDown(14)}</span>
        </div>
      </div>
      <div class="relative" data-dropdown>
        <span class="field-label">Acciones del pedido</span>
        <button class="btn btn-secondary w-full justify-between" data-dropdown-btn>Selecciona una acción ${icon.chevronDown(14)}</button>
        <div class="absolute left-0 right-0 mt-1 card shadow-large z-20 py-2 hidden" data-dropdown-menu>
          ${['Marcar como enviado', 'Generar guía', 'Descargar factura', 'Cancelar pedido'].map((o) => `
            <button class="w-full text-left px-4 py-2 text-size-regular hover:bg-border-default">${o}</button>`).join('')}
        </div>
      </div>
    </div>`)}

  ${sub('c-textarea', 'Textarea', 'Entrada multilínea para contenido libre largo.')}
  ${demo('default', `
    <div class="max-w-md">
      <label class="field-label" for="ta-1">Notas internas</label>
      <textarea class="input h-24" id="ta-1" placeholder="Solo visible para el equipo"></textarea>
      <p class="field-hint">Máximo 500 caracteres.</p>
    </div>`)}

  ${sub('c-datepicker', 'Date pickers', 'Selección de fecha única y de rango basada en calendario.')}
  ${demo('fecha única · rango', `
    <div class="flex flex-wrap gap-6">
      ${calendar('Junio 2026', [12])}
      ${calendar('Junio 2026', [], [8, 19])}
    </div>`)}

  ${sub('c-checkbox', 'Checkbox', 'Control booleano multi-selección, incluido el estado indeterminado.')}
  ${demo('estados', `
    <div class="space-y-3">
      <label class="flex items-center gap-3 text-size-regular cursor-pointer"><input type="checkbox" class="check" checked> Notificar quiebres de stock</label>
      <label class="flex items-center gap-3 text-size-regular cursor-pointer"><input type="checkbox" class="check"> Incluir productos archivados</label>
      <label class="flex items-center gap-3 text-size-regular cursor-pointer"><input type="checkbox" class="check" data-indeterminate> Seleccionar bodegas (2 de 4)</label>
      <label class="flex items-center gap-3 text-size-regular text-text-secondary cursor-not-allowed"><input type="checkbox" class="check" disabled> Sincronizar con POS (plan Pro)</label>
    </div>`)}

  ${sub('c-radio', 'Radio', 'Selección única dentro de un grupo mutuamente excluyente.')}
  ${demo('grupo', `
    <div class="space-y-3">
      <label class="flex items-center gap-3 text-size-regular cursor-pointer"><input type="radio" name="r-per" class="radio-input" checked> Resumen diario</label>
      <label class="flex items-center gap-3 text-size-regular cursor-pointer"><input type="radio" name="r-per" class="radio-input"> Resumen semanal</label>
      <label class="flex items-center gap-3 text-size-regular text-text-secondary cursor-not-allowed"><input type="radio" name="r-per" class="radio-input" disabled> Resumen mensual (próximamente)</label>
    </div>`)}

  ${sub('c-toggle', 'Toggle', 'Switch on/off para ajustes binarios instantáneos.')}
  ${demo('estados', `
    <div class="max-w-md">
      <label class="flex items-center justify-between gap-4 py-3 cursor-pointer">
        <span class="text-size-regular">Alertas por correo</span>
        <span class="inline-flex"><input type="checkbox" class="peer sr-only" checked><span class="switch"></span></span>
      </label>
      <label class="flex items-center justify-between gap-4 py-3 border-t border-border-default cursor-pointer">
        <span class="text-size-regular">Modo mantenimiento</span>
        <span class="inline-flex"><input type="checkbox" class="peer sr-only"><span class="switch"></span></span>
      </label>
      <label class="flex items-center justify-between gap-4 py-3 border-t border-border-default cursor-not-allowed">
        <span class="text-size-regular text-text-secondary">Facturación electrónica (gestionado por DIAN)</span>
        <span class="inline-flex"><input type="checkbox" class="peer sr-only" checked disabled><span class="switch"></span></span>
      </label>
    </div>`)}

  <!-- ============ 2.2 data & stats ============ -->
  <h6 class="mt-16 text-text-secondary">2.2 · Data y stats</h6>

  ${sub('c-list', 'List', 'Filas genéricas para registros o ítems.')}
  ${demo('lista de registros', `
    <div class="card divide-y divide-border-default max-w-xl">
      ${[['Café tostado 500 g', 'SKU-08841 · 248 uds', 'Activo', 'badge-success'], ['Panela orgánica 1 kg', 'SKU-04412 · 14 uds', 'Stock bajo', 'badge-warning'], ['Chocolate de mesa 250 g', 'SKU-07733 · 0 uds', 'Agotado', 'badge-error']]
        .map(([t, m, s, b]) => `
        <div class="flex items-center gap-4 px-5 py-4">
          <div class="flex-1 min-w-0"><p class="text-size-regular truncate">${t}</p><p class="text-size-small text-text-secondary">${m}</p></div>
          <span class="badge ${b}"><span class="badge-dot"></span>${s}</span>
          <button class="btn btn-ghost btn-sm btn-icon" aria-label="Opciones">${icon.dots(14)}</button>
        </div>`).join('')}
    </div>`)}

  ${sub('c-tabla', 'Table', 'Datos tabulares con encabezados, filas y celdas tipadas. Números a la derecha con cifras tabulares.')}
  ${demo('', `
    <div class="overflow-x-auto">
    <table class="table">
      <thead><tr><th>Producto</th><th>SKU</th><th>Estado</th><th class="num">Stock</th><th class="num">Precio</th></tr></thead>
      <tbody>
        <tr><td>Café tostado 500 g</td><td class="spec !text-text-secondary">SKU-08841</td><td><span class="badge badge-success"><span class="badge-dot"></span>Activo</span></td><td class="num">248</td><td class="num">$38.500</td></tr>
        <tr><td>Panela orgánica 1 kg</td><td class="spec !text-text-secondary">SKU-04412</td><td><span class="badge badge-warning"><span class="badge-dot"></span>Stock bajo</span></td><td class="num">14</td><td class="num">$12.900</td></tr>
        <tr><td>Chocolate de mesa 250 g</td><td class="spec !text-text-secondary">SKU-07733</td><td><span class="badge badge-error"><span class="badge-dot"></span>Agotado</span></td><td class="num">0</td><td class="num">$9.800</td></tr>
        <tr><td>Miel de abejas 330 ml</td><td class="spec !text-text-secondary">SKU-09120</td><td><span class="badge badge-info"><span class="badge-dot"></span>En tránsito</span></td><td class="num">96</td><td class="num">$21.400</td></tr>
      </tbody>
    </table></div>`, false)}

  ${sub('c-charts', 'Charts', 'Primitivas de gráficos: no disponibles en esta versión del sistema compartido. Ver composiciones de gráficos en Aplicaciones (4.2).')}
  ${demo('', `<p class="text-size-regular text-text-secondary">Las primitivas de charting llegan en una versión futura; mientras tanto las composiciones de Aplicaciones cubren área, barras, líneas, donut y sparklines.</p>`)}

  <!-- ============ 2.3 data display ============ -->
  <h6 class="mt-16 text-text-secondary">2.3 · Data display</h6>

  ${sub('c-indicator', 'Indicator', 'Dots y leyendas de estado · tamaños small/large · borde opcional · colores green/orange/blue/red/pink.')}
  ${demo('tamaños · colores · con borde · leyenda', `
    <div class="space-y-6">
      <div class="flex items-center gap-6">
        ${[['#34d399', 'green'], ['#fbbf24', 'orange'], ['#60a5fa', 'blue'], ['#f87171', 'red'], ['#f472b6', 'pink']]
          .map(([c, n]) => `<span class="flex items-center gap-2"><span class="indicator indicator-sm" style="background:${c}"></span><span class="indicator indicator-lg" style="background:${c}"></span><span class="indicator indicator-lg indicator-border" style="background:${c}"></span><span class="text-size-small text-text-secondary">${n}</span></span>`).join('')}
      </div>
      <div class="flex flex-wrap gap-6 text-size-regular">
        <span class="flex items-center gap-2"><span class="indicator indicator-sm bg-success"></span>Operativo</span>
        <span class="flex items-center gap-2"><span class="indicator indicator-sm bg-warning"></span>Degradado</span>
        <span class="flex items-center gap-2"><span class="indicator indicator-sm bg-error"></span>Caído</span>
      </div>
    </div>`)}

  ${sub('c-avatar', 'Avatar', 'Imagen de usuario/entidad con tamaños, fallback a iniciales y estado opcional.')}
  ${demo('tamaños · fallback · con estado · grupo', `
    <div class="flex flex-wrap items-end gap-6">
      <div class="flex items-end gap-3">${av('LR', 24)}${av('LR', 32)}${av('LR', 40)}${av('LR', 56)}</div>
      <span class="relative inline-flex">${av('MV', 40)}<span class="absolute bottom-0 right-0 indicator indicator-sm bg-success indicator-border"></span></span>
      <div class="flex -space-x-2">${av('LR', 32)}${av('MV', 32)}${av('JS', 32)}<span class="avatar" style="width:32px;height:32px;font-size:11px">+4</span></div>
    </div>`)}

  ${sub('c-badge', 'Badge', 'Token compacto de estado/etiqueta con variantes de color y estilo. Solo lectura.')}
  ${demo('variantes de estado · neutro · sólido · conteo', `
    <div class="flex flex-wrap items-center gap-3">
      <span class="badge badge-success"><span class="badge-dot"></span>Activo</span>
      <span class="badge badge-warning"><span class="badge-dot"></span>Stock bajo</span>
      <span class="badge badge-error"><span class="badge-dot"></span>Agotado</span>
      <span class="badge badge-info"><span class="badge-dot"></span>En tránsito</span>
      <span class="badge badge-neutral">v2.4.1</span>
      <span class="badge badge-neutral spec !text-text-secondary">SKU-08841</span>
      <span class="badge badge-solid">Nuevo</span>
      <span class="text-size-regular text-text-secondary inline-flex items-center gap-2">Pendientes <span class="badge badge-solid min-w-[22px] justify-center !px-2">12</span></span>
    </div>`)}

  ${sub('c-card', 'Card', 'Superficie contenedora que agrupa contenido y acciones. Borde por defecto; sombra solo si flota.')}
  ${demo('stat · entidad · acción', `
    <div class="grid md:grid-cols-3 gap-5">
      <div class="card p-6">
        <p class="text-size-small text-text-secondary">Ventas del mes</p>
        <p class="mt-1 text-headline-lg tabular-nums">$48,2 M</p>
        <p class="mt-1 text-size-small"><span class="text-success">+12,4 %</span> <span class="text-text-secondary">vs. mayo</span></p>
        <div class="mt-4 h-1 bg-border-default overflow-hidden"><div class="h-full w-[68%] bg-primary"></div></div>
        <p class="mt-2 spec">68 % de la meta · $70 M</p>
      </div>
      <div class="card p-6 flex flex-col">
        <div class="flex items-start justify-between gap-3">${av('BN', 36)}<span class="badge badge-success"><span class="badge-dot"></span>Activa</span></div>
        <h4 class="mt-3">Bodega Norte</h4>
        <p class="mt-1 text-size-regular text-text-secondary">Medellín · 1.240 referencias · responsable: L. Restrepo</p>
        <div class="mt-4 pt-4 border-t border-border-default flex items-center justify-between">
          <span class="spec">act. hace 2 h</span><button class="btn btn-ghost btn-sm">Abrir</button>
        </div>
      </div>
      <div class="card p-6 flex flex-col">
        <h4>Conteo cíclico de junio</h4>
        <p class="mt-1 text-size-regular text-text-secondary flex-1">Quedan 3 zonas por verificar. Diferencias mayores al 2 % requieren aprobación.</p>
        <div class="mt-4 flex gap-2"><button class="btn btn-primary btn-sm">Continuar</button><button class="btn btn-ghost btn-sm">Posponer</button></div>
      </div>
    </div>`)}

  ${sub('c-chips', 'Chips', 'Tags interactivos compactos: filtros, selecciones y tokens de input. A diferencia del badge, el chip se toca.')}
  ${demo('filtro (clic para alternar) · removible', `
    <div class="space-y-5">
      <div class="flex flex-wrap gap-2" data-chips>
        <button class="chip" data-selected="true">Bebidas</button>
        <button class="chip" data-selected="false">Granos</button>
        <button class="chip" data-selected="false">Lácteos</button>
        <button class="chip" data-selected="true">Panadería</button>
      </div>
      <div class="flex flex-wrap gap-2">
        ${['Bodega: Bogotá', 'Estado: Activo'].map((t) => `
          <span class="chip !cursor-default">${t}
            <button class="hover:text-text-primary -mr-1" aria-label="Quitar filtro ${t}" onclick="this.parentElement.remove()">${icon.x(12)}</button>
          </span>`).join('')}
      </div>
    </div>`)}

  ${sub('c-accordion', 'Accordion', 'Paneles colapsables para divulgación progresiva.')}
  ${demo('', `
    <div class="card divide-y divide-border-default max-w-2xl">
      ${[['¿Cómo se calcula el stock disponible?', 'Stock físico menos reservas activas de pedidos sin despachar. Se recalcula con cada movimiento de inventario.', true], ['¿Puedo mover stock entre bodegas?', 'Sí: crea una transferencia desde la bodega origen; el stock queda “en tránsito” hasta confirmar la recepción.', false], ['¿Qué pasa al archivar un producto?', 'Deja de aparecer en el catálogo y en las búsquedas, pero conserva su historial de movimientos.', false]]
        .map(([q, a, open]) => `
        <details class="group" ${open ? 'open' : ''}>
          <summary class="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none text-size-regular hover:bg-border-default/40">
            ${q}<span class="text-text-secondary transition-transform group-open:rotate-180">${icon.chevronDown(14)}</span>
          </summary>
          <p class="px-5 pb-5 text-size-regular text-text-secondary">${a}</p>
        </details>`).join('')}
    </div>`)}

  ${sub('c-callout', 'Callout', 'Bloque destacado que llama la atención sobre un mensaje o consejo.')}
  ${demo('info · éxito · advertencia · error', `
    <div class="grid lg:grid-cols-2 gap-4">
      ${[['info', icon.info(16), 'Sincronización programada', 'El catálogo se actualizará hoy a las 22:00. No se requiere acción.'], ['success', icon.checkCircle(16), 'Importación completada', '312 productos actualizados sin conflictos.'], ['warning', icon.warn(16), '8 productos con stock bajo', 'Revisa el punto de reorden antes del cierre del mes.'], ['error', icon.xCircle(16), 'Falló la conexión con el POS', 'Último intento: 09:41. <a href="#" class="underline underline-offset-2">Reintentar ahora</a>']]
        .map(([k, ic, t, b]) => `
        <div class="card p-4 flex gap-3 border-l-2" style="border-left-color:var(--md-${k})">
          <span class="shrink-0 mt-0.5 text-${k}">${ic}</span>
          <div class="text-size-regular"><p>${t}</p><p class="text-text-secondary mt-0.5">${b}</p></div>
        </div>`).join('')}
    </div>`)}

  ${sub('c-share', 'Share y Invite', 'UI para compartir recursos e invitar colaboradores.')}
  ${demo('', `
    <div class="card p-6 max-w-md">
      <h4>Compartir “Cierre Q2”</h4>
      <div class="mt-4 flex gap-2">
        <input class="input flex-1" value="https://app.moderno.co/r/cierre-q2" readonly>
        <button class="btn btn-secondary" data-copy>${icon.copy(14)} Copiar</button>
      </div>
      <div class="mt-5 flex gap-2">
        <input class="input flex-1" placeholder="correo@equipo.co">
        <button class="btn btn-primary">Invitar</button>
      </div>
      <div class="mt-5 divide-y divide-border-default">
        ${[['LR', 'Laura Restrepo', 'laura@bruno.co', 'Propietaria'], ['MV', 'Mateo Vélez', 'mateo@bruno.co', 'Editor'], ['JS', 'Julia Sáenz', 'julia@bruno.co', 'Lectora']]
          .map(([i, n, e, r]) => `
          <div class="flex items-center gap-3 py-3">
            ${av(i, 32)}
            <div class="flex-1 min-w-0"><p class="text-size-regular truncate">${n}</p><p class="text-size-small text-text-secondary truncate">${e}</p></div>
            <span class="text-size-small text-text-secondary">${r}</span>
          </div>`).join('')}
      </div>
    </div>`)}

  ${sub('c-carousel', 'Carousel', 'Galería de contenido con desplazamiento horizontal.')}
  ${demo('', `
    <div class="relative" data-carousel>
      <div class="flex gap-4 overflow-x-auto scroll-smooth pb-2" data-carousel-track>
        ${['Origen Huila', 'Tueste medio', 'Molienda', 'Empaque', 'Distribución', 'Punto de venta'].map((t, i) => `
          <div class="card w-56 shrink-0">
            <div class="h-32 well flex items-center justify-center text-text-secondary">${icon.box(22)}</div>
            <div class="p-4"><p class="text-size-regular">${t}</p><p class="text-size-small text-text-secondary">Paso ${i + 1} de 6</p></div>
          </div>`).join('')}
      </div>
      <button class="btn btn-secondary btn-icon !bg-surface-base absolute -left-3 top-1/2 -translate-y-1/2 shadow-medium" data-carousel-prev aria-label="Anterior">${icon.chevronLeft()}</button>
      <button class="btn btn-secondary btn-icon !bg-surface-base absolute -right-3 top-1/2 -translate-y-1/2 shadow-medium" data-carousel-next aria-label="Siguiente">${icon.chevronRight()}</button>
    </div>`)}

  <!-- ============ 2.4 navegación ============ -->
  <h6 class="mt-16 text-text-secondary">2.4 · Navegación</h6>

  ${sub('c-navbar', 'Navbars', 'Barras superiores para sitios y apps.')}
  ${demo('navbar de aplicación', `
    <div class="card flex items-center gap-6 px-5 h-14">
      <span class="text-weight-medium">moderno</span>
      <nav class="hidden md:flex items-center gap-5 text-size-regular text-text-secondary">
        <a href="#" class="text-text-primary">Resumen</a><a href="#" class="hover:text-text-primary">Inventario</a><a href="#" class="hover:text-text-primary">Pedidos</a><a href="#" class="hover:text-text-primary">Reportes</a>
      </nav>
      <div class="flex-1"></div>
      <button class="btn btn-ghost btn-sm btn-icon" aria-label="Notificaciones">${icon.bell()}</button>
      ${av('LR', 28)}
    </div>`, false)}

  ${sub('c-sidebar', 'Sidebar', 'Navegación lateral vertical / rail de aplicación.')}
  ${demo('', `
    <div class="card w-60 p-3">
      <div class="px-3 py-2 flex items-center gap-2"><span class="text-weight-medium">moderno</span><span class="badge badge-neutral !h-[18px] !text-[10px]">beta</span></div>
      <nav class="mt-2 space-y-1 text-size-regular">
        ${[['box', 'Inventario', true, ''], ['cart', 'Pedidos', false, '12'], ['users', 'Clientes', false, ''], ['calendar', 'Agenda', false, ''], ['filters', 'Configuración', false, '']]
          .map(([ic, t, act, n]) => `
          <a href="#" class="flex items-center gap-3 px-3 py-2 ${act ? 'bg-border-default text-text-primary' : 'text-text-secondary hover:text-text-primary hover:bg-border-default/50'}">
            ${icon[ic](15)} <span class="flex-1">${t}</span> ${n ? `<span class="badge badge-solid !h-[18px] !px-2 !text-[10px]">${n}</span>` : ''}
          </a>`).join('')}
      </nav>
    </div>`)}

  ${sub('c-pagination', 'Pagination', 'Navegación página a página para resultados largos.')}
  ${demo('', `
    <div class="flex items-center justify-between flex-wrap gap-4">
      <span class="text-size-small text-text-secondary">Mostrando 21–40 de 1.240</span>
      <div class="flex items-center gap-1">
        <button class="btn btn-ghost btn-sm btn-icon" disabled aria-label="Anterior">${icon.chevronLeft(14)}</button>
        <button class="btn btn-sm btn-icon btn-primary">1</button>
        <button class="btn btn-ghost btn-sm btn-icon">2</button>
        <button class="btn btn-ghost btn-sm btn-icon">3</button>
        <span class="text-text-secondary px-1">…</span>
        <button class="btn btn-ghost btn-sm btn-icon">62</button>
        <button class="btn btn-ghost btn-sm btn-icon" aria-label="Siguiente">${icon.chevronRight(14)}</button>
      </div>
    </div>`)}

  ${sub('c-tabs', 'Tabs', 'Cambio entre vistas hermanas del mismo contexto.')}
  ${demo('', `
    <div data-tabs>
      <div class="flex gap-1 border-b border-border-default" role="tablist">
        ${['General', 'Movimientos', 'Precios', 'Historial'].map((t, i) => `
          <button role="tab" data-tab="${i}" aria-selected="${i === 0}" class="px-4 py-2.5 text-size-regular border-b-2 -mb-px transition-colors ${i === 0 ? 'border-primary text-text-primary' : 'border-transparent text-text-secondary hover:text-text-primary'}">${t}</button>`).join('')}
      </div>
      <div class="pt-5 text-size-regular text-text-secondary">
        ${['Información general del producto: nombre, categoría, unidad de medida y bodegas asignadas.', 'Entradas, salidas y transferencias ordenadas por fecha.', 'Precio base, listas de precios e impuestos aplicables.', 'Auditoría de cambios con autor y marca de tiempo.']
          .map((c, i) => `<p data-tab-panel="${i}" ${i ? 'hidden' : ''}>${c}</p>`).join('')}
      </div>
    </div>`)}

  <!-- ============ 2.5 utilidades ============ -->
  <h6 class="mt-16 text-text-secondary">2.5 · Utilidades</h6>

  ${sub('c-tooltip', 'Tooltip', 'Pista contextual al hover/focus.')}
  ${demo('hover sobre los elementos', `
    <div class="flex flex-wrap items-center gap-4">
      <button class="btn btn-secondary" data-tip="Exporta el inventario actual">Exportar</button>
      <button class="btn btn-secondary btn-icon" data-tip="Actualizar datos" aria-label="Actualizar">${icon.refresh(14)}</button>
      <span class="text-size-regular underline decoration-dotted underline-offset-4 cursor-help" data-tip="Stock físico menos reservas">stock disponible</span>
    </div>`)}

  ${sub('c-toast', 'Toast', 'Notificación transitoria y no bloqueante. El sistema usa <a href="https://sileo.aaryan.design" class="underline underline-offset-2">sileo</a> (SVG morphing + spring physics) como implementación oficial; abajo también el toast CSS propio.')}
  ${demo('sileo · opinionated toast', `
    <div class="flex flex-wrap gap-3">
      <button class="btn btn-secondary" data-sileo="success">Éxito</button>
      <button class="btn btn-secondary" data-sileo="error">Error</button>
      <button class="btn btn-secondary" data-sileo="warning">Advertencia</button>
      <button class="btn btn-secondary" data-sileo="info">Info</button>
      <button class="btn btn-secondary" data-sileo="action">Con acción</button>
      <button class="btn btn-secondary" data-sileo="promise">Promise</button>
    </div>`)}
  ${demo('toast css del sistema', `
    <div class="flex flex-wrap gap-3">
      <button class="btn btn-secondary" data-toast="success" data-toast-msg="Inventario actualizado correctamente.">Toast de éxito</button>
      <button class="btn btn-secondary" data-toast="error" data-toast-msg="No se pudo guardar el cambio.">Toast de error</button>
      <button class="btn btn-secondary" data-toast="info" data-toast-msg="Exportación en curso, te avisaremos al terminar.">Toast informativo</button>
    </div>`)}

  ${sub('c-sheet', 'Sheet', 'Panel deslizante lateral para flujos de detalle o edición.')}
  ${demo('', `
    <button class="btn btn-secondary" data-open="#sg-sheet">Abrir sheet lateral</button>
    <dialog class="sheet" id="sg-sheet">
      <div class="flex items-center justify-between px-6 h-14 border-b border-border-default">
        <h4>Detalle del producto</h4>
        <button class="btn btn-ghost btn-sm btn-icon" data-close aria-label="Cerrar">${icon.x(14)}</button>
      </div>
      <div class="p-6 space-y-4 text-size-regular">
        <div><label class="field-label">Nombre</label><input class="input" value="Café tostado 500 g"></div>
        <div><label class="field-label">Categoría</label><input class="input" value="Bebidas"></div>
        <div><label class="field-label">Notas</label><textarea class="input h-24">Tueste medio, origen Huila.</textarea></div>
      </div>
      <div class="px-6 py-4 border-t border-border-default flex justify-end gap-2">
        <button class="btn btn-ghost" data-close>Cancelar</button><button class="btn btn-primary" data-close>Guardar</button>
      </div>
    </dialog>`)}

  ${sub('c-skeleton', 'Skeleton', 'Placeholders de carga que imitan el layout del contenido.')}
  ${demo('', `
    <div class="card p-6 max-w-md space-y-4">
      <div class="flex items-center gap-3">
        <div class="skeleton w-10 h-10 rounded-full"></div>
        <div class="flex-1 space-y-2"><div class="skeleton h-3 w-1/2"></div><div class="skeleton h-3 w-1/3"></div></div>
      </div>
      <div class="space-y-2"><div class="skeleton h-3"></div><div class="skeleton h-3"></div><div class="skeleton h-3 w-2/3"></div></div>
      <div class="skeleton h-24"></div>
    </div>`)}

  ${sub('c-scrollbar', 'Scrollbar', 'Estilo de scrollbar custom aplicado globalmente: 8px, thumb border-strong.')}
  ${demo('contenedor con overflow', `
    <div class="well h-40 overflow-y-auto p-5 max-w-md text-size-regular text-text-secondary space-y-3">
      ${Array.from({ length: 8 }, (_, i) => `<p>Movimiento ${i + 1}: transferencia de 24 unidades de la bodega Principal a Norte, confirmada por L. Restrepo.</p>`).join('')}
    </div>`)}

  ${sub('c-loaders', 'Loaders', 'Spinners e indicadores de progreso.')}
  ${demo('spinner · progreso determinado · indeterminado · dots', `
    <div class="flex flex-wrap items-center gap-10">
      <span class="spinner !w-5 !h-5"></span>
      <div class="w-48"><div class="h-1 bg-border-default overflow-hidden"><div class="h-full w-[64%] bg-primary"></div></div><p class="spec mt-2">64 %</p></div>
      <div class="w-48"><div class="h-1 bg-border-default overflow-hidden relative"><div class="h-full w-1/3 bg-primary absolute animate-[indet_1.2s_infinite_linear]"></div></div><p class="spec mt-2">indeterminado</p></div>
      <span class="flex gap-1.5">${[0, 1, 2].map((i) => `<span class="w-1.5 h-1.5 rounded-full bg-text-primary animate-bounce" style="animation-delay:${i * 120}ms"></span>`).join('')}</span>
    </div>
    <style>@keyframes indet { from { left: -33% } to { left: 100% } }</style>`)}

  ${sub('c-handler', 'Handler', 'Asas de arrastre/redimensión y affordances de interacción.')}
  ${demo('filas reordenables · asa de redimensión', `
    <div class="grid md:grid-cols-2 gap-6 max-w-3xl">
      <div class="card divide-y divide-border-default">
        ${['Resumen', 'Inventario', 'Pedidos'].map((t) => `
          <div class="flex items-center gap-3 px-4 py-3 text-size-regular">
            <span class="handler">${icon.grip(14)}</span> ${t}
          </div>`).join('')}
      </div>
      <div class="card h-32 relative flex items-center justify-center text-size-small text-text-secondary">
        panel redimensionable
        <span class="handler absolute right-0 top-0 bottom-0 w-2 border-r-2 border-border-strong hover:border-primary cursor-col-resize"></span>
      </div>
    </div>`)}

  ${sub('c-dividers', 'Dividers', 'Separadores visuales entre bloques de contenido.')}
  ${demo('horizontal · con etiqueta · vertical', `
    <div class="space-y-6 max-w-md">
      <hr class="divider">
      <div class="flex items-center gap-4"><hr class="divider flex-1"><span class="text-size-small text-text-secondary">o continúa con</span><hr class="divider flex-1"></div>
      <div class="flex items-center gap-4 text-size-regular"><span>Filtros</span><span class="w-px h-5 bg-border-strong"></span><span class="text-text-secondary">12 resultados</span></div>
    </div>`)}
  `)
