import { icon, sub, demo, sectionShell, av, ph } from '../ui.js'

const stars = (n) => `<span class="inline-flex gap-0.5 text-warning">${Array.from({ length: 5 }, (_, i) => `<span class="${i < n ? '' : 'opacity-25'}">${icon.starFill(12)}</span>`).join('')}</span>`

const product = (n, p, b = '') => `
  <a href="#" class="card group overflow-hidden">
    <div class="relative">${ph(150)}${b ? `<span class="badge badge-solid absolute top-3 left-3">${b}</span>` : ''}</div>
    <div class="p-4">
      <p class="text-size-regular group-hover:underline underline-offset-4">${n}</p>
      <p class="mt-1 text-size-regular tabular-nums">${p}</p>
    </div>
  </a>`

export const toc = { num: '05', title: 'E-Commerce', items: [
  ['e-nav', 'Store navigation'], ['e-promo', 'Promo sections'], ['e-catpreview', 'Category Preview'],
  ['e-filters', 'Category Filters'], ['e-productlists', 'Product Lists'], ['e-features', 'Product Features'],
  ['e-details', 'Product Details'], ['e-reviews', 'Reviews'], ['e-cart', 'Shopping cart'],
  ['e-checkout', 'Checkout forms'], ['e-ordersummary', 'Order summaries'], ['e-orderhistory', 'Order history'],
  ['e-incentives', 'Incentives'],
]}

export const html = sectionShell('05 · E-Commerce', 'ecommerce', 'E-Commerce',
  'Bloques de storefront y flujos de compra completos. Las páginas de ejemplo (5.2) — storefront, producto, categoría, carrito, checkout, pedidos — se componen con estos módulos.',
  `
  ${sub('e-nav', 'Store navigation', 'Headers de tienda, menús y navegación por categoría.')}
  ${demo('', `
    <div class="border-b border-border-default">
      <div class="flex items-center gap-6 px-6 h-16">
        <span class="text-weight-medium">bruno·store</span>
        <nav class="hidden md:flex gap-5 text-size-regular text-text-secondary">
          <a href="#" class="text-text-primary">Café</a><a href="#" class="hover:text-text-primary">Despensa</a><a href="#" class="hover:text-text-primary">Equipos</a><a href="#" class="hover:text-text-primary">Ofertas</a>
        </nav>
        <div class="flex-1"></div>
        <div class="relative w-56 hidden lg:block">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">${icon.search(14)}</span>
          <input class="input !h-9 pl-9" placeholder="Buscar productos">
        </div>
        <button class="btn btn-ghost btn-sm btn-icon" aria-label="Cuenta">${icon.user(16)}</button>
        <button class="btn btn-ghost btn-sm btn-icon relative" aria-label="Carrito, 3 items">${icon.cart(16)}<span class="absolute -top-1 -right-1 badge badge-solid !h-4 !px-1.5 !text-[10px]">3</span></button>
      </div>
    </div>`, false)}

  ${sub('e-promo', 'Promo sections', 'Secciones promocionales / merchandising.')}
  ${demo('', `
    <div class="grid md:grid-cols-2 gap-px bg-border-default border border-border-default">
      <div class="bg-surface-base p-8">
        <span class="kicker">Solo esta semana</span>
        <h3 class="mt-3 text-headline-md">2×1 en tueste medio</h3>
        <p class="mt-2 text-size-regular text-text-secondary">Aplica a bolsas de 500 g del origen Huila.</p>
        <button class="btn btn-primary mt-5">Comprar ahora</button>
      </div>
      <div class="bg-primary text-on-primary p-8">
        <span class="kicker !text-on-primary opacity-60">Nuevo</span>
        <h3 class="mt-3 text-headline-md">Suscripción mensual</h3>
        <p class="mt-2 opacity-70">Café fresco en tu puerta cada mes, con 15 % de descuento.</p>
        <button class="btn mt-5 !bg-surface-base !text-text-primary hover:opacity-90">Conocer el plan</button>
      </div>
    </div>`, false)}

  ${sub('e-catpreview', 'Category Preview', 'Bloques de showcase de categoría.')}
  ${demo('', `
    <div class="flex items-center justify-between mb-5"><h3 class="text-headline-md">Compra por categoría</h3><a href="#" class="btn btn-link text-size-regular">Ver todas</a></div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      ${[['Café en grano', '32'], ['Molido', '18'], ['Cápsulas', '9'], ['Equipos', '24']].map(([c, n]) => `
        <a href="#" class="card group overflow-hidden">${ph(110)}<div class="p-4"><p class="text-size-regular group-hover:underline underline-offset-4">${c}</p><p class="text-size-small text-text-secondary">${n} productos</p></div></a>`).join('')}
    </div>`)}

  ${sub('e-filters', 'Category Filters', 'Controles de filtrado facetado.')}
  ${demo('', `
    <div class="grid md:grid-cols-[220px_1fr] gap-6">
      <aside class="space-y-6">
        <div>
          <h6 class="text-text-secondary mb-3">Origen</h6>
          <div class="space-y-2 text-size-regular">
            ${[['Huila', 14, true], ['Nariño', 9, false], ['Sierra Nevada', 6, false]].map(([o, n, c]) => `
              <label class="flex items-center gap-2.5 cursor-pointer"><input type="checkbox" class="check" ${c ? 'checked' : ''}>${o} <span class="text-text-secondary text-size-small">(${n})</span></label>`).join('')}
          </div>
        </div>
        <div>
          <h6 class="text-text-secondary mb-3">Precio</h6>
          <div class="flex items-center gap-2"><input class="input !h-9" value="$10.000"><span class="text-text-secondary">–</span><input class="input !h-9" value="$60.000"></div>
        </div>
        <button class="btn btn-secondary btn-sm w-full">Limpiar filtros</button>
      </aside>
      <div>
        <div class="flex items-center justify-between mb-4">
          <div class="flex gap-2" data-chips><button class="chip" data-selected="true">Huila</button><button class="chip" data-selected="false">En oferta</button></div>
          <span class="text-size-small text-text-secondary">29 resultados</span>
        </div>
        <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
          ${product('Café tostado 500 g', '$38.500', 'Oferta')}${product('Café molido 340 g', '$29.900')}${product('Cápsulas ×10', '$24.000')}
        </div>
      </div>
    </div>`)}

  ${sub('e-productlists', 'Product Lists', 'Grillas / listas de producto.')}
  ${demo('', `
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      ${product('Café tostado 500 g', '$38.500', 'Más vendido')}${product('Panela orgánica 1 kg', '$12.900')}${product('Miel de abejas 330 ml', '$21.400')}${product('Chocolate de mesa', '$9.800', 'Nuevo')}
    </div>`)}

  ${sub('e-features', 'Product Features', 'Destacados de características del producto.')}
  ${demo('', `
    <div class="grid md:grid-cols-2 gap-8 items-center max-w-4xl">
      ${ph(220, 'detalle del producto')}
      <div>
        <h3 class="text-headline-md">Tueste medio, perfil dulce</h3>
        <dl class="mt-5 space-y-3 text-size-regular">
          ${[['Origen', 'Pitalito, Huila · 1.700 msnm'], ['Notas', 'Panela, naranja, cacao'], ['Proceso', 'Lavado · secado al sol'], ['Tueste', 'Medio · ideal para filtrados']]
            .map(([k, v]) => `<div class="flex gap-4 pb-3 border-b border-border-default"><dt class="w-20 shrink-0 text-text-secondary">${k}</dt><dd>${v}</dd></div>`).join('')}
        </dl>
      </div>
    </div>`)}

  ${sub('e-details', 'Product Details', 'Módulo de detalle: galería, info y add-to-cart.')}
  ${demo('', `
    <div class="grid md:grid-cols-2 gap-8 max-w-4xl">
      <div class="space-y-3">
        ${ph(280, 'imagen principal')}
        <div class="grid grid-cols-4 gap-3">${Array.from({ length: 4 }, (_, i) => ph(60, '', i === 0 ? '!border-primary' : '')).join('')}</div>
      </div>
      <div>
        <span class="badge badge-success"><span class="badge-dot"></span>En stock</span>
        <h2 class="mt-3 text-headline-lg">Café tostado 500 g</h2>
        <div class="mt-2 flex items-center gap-2 text-size-small text-text-secondary">${stars(4)} 4,6 · <a href="#" class="underline underline-offset-2">128 reseñas</a></div>
        <p class="mt-4 text-headline-md tabular-nums">$38.500</p>
        <div class="mt-5">
          <span class="field-label">Molienda</span>
          <div class="flex gap-2" data-chips>
            <button class="chip" data-selected="true">Grano entero</button><button class="chip" data-selected="false">Filtrado</button><button class="chip" data-selected="false">Espresso</button>
          </div>
        </div>
        <div class="mt-5 flex gap-3">
          <div class="flex items-center border border-border-strong">
            <button class="btn btn-ghost btn-icon" aria-label="Menos">${icon.minus(13)}</button>
            <span class="w-10 text-center text-size-regular tabular-nums">1</span>
            <button class="btn btn-ghost btn-icon" aria-label="Más">${icon.plus(13)}</button>
          </div>
          <button class="btn btn-primary flex-1">${icon.cart(15)} Agregar al carrito</button>
          <button class="btn btn-secondary btn-icon" aria-label="Favorito">${icon.heart(15)}</button>
        </div>
        <p class="mt-4 text-size-small text-text-secondary flex items-center gap-2">${icon.truck(14)} Envío gratis desde $80.000 · llega mañana en Bogotá</p>
      </div>
    </div>`)}

  ${sub('e-reviews', 'Reviews', 'Bloques de calificaciones y reseñas.')}
  ${demo('', `
    <div class="grid md:grid-cols-[200px_1fr] gap-8 max-w-3xl">
      <div>
        <p class="text-display !text-[56px] !leading-none">4,6</p>
        <div class="mt-2">${stars(5)}</div>
        <p class="mt-1 text-size-small text-text-secondary">128 reseñas</p>
        <div class="mt-4 space-y-1.5">
          ${[[5, 78], [4, 32], [3, 12], [2, 4], [1, 2]].map(([s, n]) => `
            <div class="flex items-center gap-2 text-size-small"><span class="w-3 text-text-secondary">${s}</span>
            <div class="flex-1 h-1.5 bg-border-default"><div class="h-full bg-warning" style="width:${(n / 128) * 100}%"></div></div>
            <span class="w-6 text-right text-text-secondary tabular-nums">${n}</span></div>`).join('')}
        </div>
      </div>
      <div class="divide-y divide-border-default">
        ${[['CA', 'Camila A.', 5, 'Compra verificada', 'El mejor café que he pedido online. El tueste medio es exacto para V60.'], ['RT', 'Ricardo T.', 4, 'Compra verificada', 'Muy bueno, aunque el empaque llegó golpeado. El producto, impecable.']]
          .map(([i, n, s, v, b]) => `
          <div class="py-5 first:pt-0">
            <div class="flex items-center gap-3">${av(i, 32)}<div><p class="text-size-regular">${n}</p><p class="text-size-tiny text-text-secondary">${v}</p></div><span class="ml-auto">${stars(s)}</span></div>
            <p class="mt-3 text-size-regular text-text-secondary">${b}</p>
          </div>`).join('')}
      </div>
    </div>`)}

  ${sub('e-cart', 'Shopping cart', 'Líneas de carrito y resumen.')}
  ${demo('', `
    <div class="grid lg:grid-cols-[1fr_300px] gap-6 max-w-4xl items-start">
      <div class="card divide-y divide-border-default">
        ${[['Café tostado 500 g', 'Grano entero', 2, '$77.000'], ['Miel de abejas 330 ml', '', 1, '$21.400']].map(([n, v, q, t]) => `
          <div class="flex gap-4 p-5">
            <div class="w-16 h-16 well shrink-0"></div>
            <div class="flex-1 min-w-0">
              <p class="text-size-regular">${n}</p>${v ? `<p class="text-size-small text-text-secondary">${v}</p>` : ''}
              <div class="mt-2 flex items-center gap-3">
                <div class="flex items-center border border-border-strong">
                  <button class="btn btn-ghost btn-sm btn-icon" aria-label="Menos">${icon.minus(12)}</button>
                  <span class="w-8 text-center text-size-small tabular-nums">${q}</span>
                  <button class="btn btn-ghost btn-sm btn-icon" aria-label="Más">${icon.plus(12)}</button>
                </div>
                <button class="btn btn-link text-size-small !text-text-secondary">Quitar</button>
              </div>
            </div>
            <p class="text-size-regular tabular-nums">${t}</p>
          </div>`).join('')}
      </div>
      <div class="card p-5">
        <h4>Resumen</h4>
        <dl class="mt-4 space-y-2 text-size-regular">
          <div class="flex justify-between"><dt class="text-text-secondary">Subtotal</dt><dd class="tabular-nums">$98.400</dd></div>
          <div class="flex justify-between"><dt class="text-text-secondary">Envío</dt><dd class="text-success">Gratis</dd></div>
          <div class="flex justify-between pt-3 border-t border-border-default text-weight-medium"><dt>Total</dt><dd class="tabular-nums">$98.400</dd></div>
        </dl>
        <button class="btn btn-primary w-full mt-5">Ir al checkout</button>
      </div>
    </div>`)}

  ${sub('e-checkout', 'Checkout forms', 'Formularios de checkout, envío y pago.')}
  ${demo('', `
    <form class="max-w-xl space-y-6">
      <div>
        <h5 class="text-weight-medium mb-4">Contacto</h5>
        <input class="input" type="email" placeholder="correo@ejemplo.co" aria-label="Correo">
      </div>
      <div>
        <h5 class="text-weight-medium mb-4">Envío</h5>
        <div class="grid grid-cols-2 gap-4">
          <input class="input" placeholder="Nombre" aria-label="Nombre"><input class="input" placeholder="Apellido" aria-label="Apellido">
          <input class="input col-span-2" placeholder="Dirección" aria-label="Dirección">
          <input class="input" placeholder="Ciudad" aria-label="Ciudad">
          <div class="relative"><select class="input" aria-label="Departamento"><option>Cundinamarca</option><option>Antioquia</option></select><span class="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none">${icon.chevronDown(14)}</span></div>
        </div>
      </div>
      <div>
        <h5 class="text-weight-medium mb-4">Pago</h5>
        <div class="grid grid-cols-2 gap-4">
          <input class="input col-span-2" placeholder="Número de tarjeta" aria-label="Número de tarjeta">
          <input class="input" placeholder="MM/AA" aria-label="Vencimiento"><input class="input" placeholder="CVC" aria-label="CVC">
        </div>
      </div>
      <button class="btn btn-primary btn-lg w-full" type="button">Pagar $98.400</button>
    </form>`)}

  ${sub('e-ordersummary', 'Order summaries', 'Paneles de resumen de pedido.')}
  ${demo('', `
    <div class="card p-6 max-w-md">
      <div class="flex items-center justify-between"><h4>Pedido PED-1104</h4><span class="badge badge-success"><span class="badge-dot"></span>Despachado</span></div>
      <p class="mt-1 text-size-small text-text-secondary">Realizado el 9 de junio · llega el 12 de junio</p>
      <div class="mt-5 space-y-3">
        ${[['Café tostado 500 g × 2', '$77.000'], ['Miel de abejas 330 ml × 1', '$21.400']].map(([n, p]) => `<div class="flex justify-between text-size-regular"><span class="text-text-secondary">${n}</span><span class="tabular-nums">${p}</span></div>`).join('')}
        <div class="flex justify-between pt-3 border-t border-border-default text-weight-medium"><span>Total</span><span class="tabular-nums">$98.400</span></div>
      </div>
      <div class="mt-5 flex gap-2"><button class="btn btn-secondary flex-1">Rastrear envío</button><button class="btn btn-ghost">Factura</button></div>
    </div>`)}

  ${sub('e-orderhistory', 'Order history', 'Lista de pedidos pasados.')}
  ${demo('', `
    <div class="card max-w-2xl divide-y divide-border-default">
      ${[['PED-1104', '9 jun 2026', 'Despachado', 'badge-success', '$98.400'], ['PED-1067', '28 may 2026', 'Entregado', 'badge-neutral', '$214.900'], ['PED-1031', '12 may 2026', 'Entregado', 'badge-neutral', '$56.200']]
        .map(([id, f, s, b, t]) => `
        <a href="#" class="flex items-center gap-4 px-5 py-4 hover:bg-border-default/40 group">
          <div class="flex-1"><p class="spec !text-text-primary">${id}</p><p class="text-size-small text-text-secondary">${f}</p></div>
          <span class="badge ${b}">${s}</span>
          <span class="text-size-regular tabular-nums w-24 text-right">${t}</span>
          <span class="text-text-secondary group-hover:text-text-primary">${icon.chevronRight(14)}</span>
        </a>`).join('')}
    </div>`)}

  ${sub('e-incentives', 'Incentives', 'Bloques de incentivos: envío, devoluciones, garantía.')}
  ${demo('', `
    <div class="grid sm:grid-cols-3 gap-px bg-border-default border border-border-default">
      ${[['truck', 'Envío gratis', 'En pedidos desde $80.000'], ['refresh', 'Devoluciones 30 días', 'Sin preguntas, etiqueta incluida'], ['shield', 'Pago protegido', 'Cifrado y antifraude en cada compra']]
        .map(([ic, t, d]) => `<div class="bg-surface-base p-6 text-center"><span class="mx-auto w-10 h-10 well flex items-center justify-center">${icon[ic](17)}</span><p class="mt-3 text-size-regular">${t}</p><p class="mt-1 text-size-small text-text-secondary">${d}</p></div>`).join('')}
    </div>`, false)}
  `)
