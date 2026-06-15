import { icon, brandIcons, sub, demo, sectionShell, av, ph } from '../ui.js'

const faq = [
  ['¿Puedo cambiar de plan en cualquier momento?', 'Sí, el cambio se prorratea en la siguiente factura.'],
  ['¿Hay límite de usuarios?', 'El plan Starter incluye 3 asientos; Pro y Scale son ilimitados.'],
  ['¿Ofrecen soporte en español?', 'Sí, chat y correo en horario de Bogotá (GMT-5).'],
]

export const toc = { num: '03', title: 'Marketing Website', items: [
  ['m-banners', 'Banners'], ['m-hero', 'Hero'], ['m-headers', 'Headers'], ['m-features', 'Features'],
  ['m-content', 'Content'], ['m-careers', 'Careers'], ['m-pricing', 'Pricing'], ['m-footers', 'Footers'],
  ['m-contact', 'Contact'], ['m-faqs', 'FAQs'], ['m-testimonials', 'Testimonials'], ['m-logos', 'Logos'],
  ['m-team', 'Team'], ['m-cta', 'CTA'], ['m-blogheader', 'Blog headers'], ['m-blogsections', 'Blog sections'],
  ['m-blogpost', 'Blog post header'], ['m-newsletter', 'Newsletter'], ['m-stats', 'Stats'],
  ['m-contactmodal', 'Contact modals'], ['m-404', '404 Errors'], ['m-emails', 'Emails'],
]}

export const html = sectionShell('03 · Marketing Website', 'marketing', 'Marketing Website',
  'Bloques para sitios públicos de landing y contenido. Las páginas de ejemplo (3.3) se componen con estas secciones: Home, Pricing, About, Contact, Blog, Legal, 404, Team y FAQ.',
  `
  ${sub('m-banners', 'Banners', 'Strips de anuncio/promoción al tope de la página.')}
  ${demo('', `
    <div class="bg-primary text-on-primary px-5 py-2.5 flex items-center justify-center gap-3 text-size-regular">
      <span>Moderno 2.0 ya está aquí — migración gratuita hasta julio.</span>
      <a href="#" class="underline underline-offset-2 text-weight-medium">Ver novedades</a>
      <button class="ml-2 opacity-70 hover:opacity-100" aria-label="Cerrar">${icon.x(13)}</button>
    </div>`, false)}

  ${sub('m-hero', 'Hero', 'Sección above-the-fold con titular, copy, media y CTAs. Único lugar donde vive el tamaño display.')}
  ${demo('', `
    <div class="py-16 px-6 text-center">
      <span class="badge badge-neutral mx-auto">Serie A · $12 M</span>
      <h1 class="mt-6 text-[clamp(40px,6vw,80px)] leading-[1.05] tracking-[-0.02em] max-w-4xl mx-auto text-balance">El stack de negocio para founders modernos</h1>
      <p class="mt-6 text-body-lg text-text-secondary max-w-xl mx-auto">Inventario, facturación y reportes en una sola superficie. Sin hojas de cálculo, sin fricción.</p>
      <div class="mt-8 flex flex-wrap justify-center gap-3">
        <button class="btn btn-primary btn-lg">Empezar gratis</button>
        <button class="btn btn-secondary btn-lg">Ver demo ${icon.arrowRight(14)}</button>
      </div>
    </div>`, false)}

  ${sub('m-headers', 'Headers', 'Headers de sitio / navegación de marketing.')}
  ${demo('', `
    <div class="flex items-center justify-between px-6 h-16 border-b border-border-default">
      <span class="text-weight-medium">moderno</span>
      <nav class="hidden md:flex gap-6 text-size-regular text-text-secondary">
        <a href="#" class="hover:text-text-primary">Producto</a><a href="#" class="hover:text-text-primary">Precios</a><a href="#" class="hover:text-text-primary">Clientes</a><a href="#" class="hover:text-text-primary">Blog</a>
      </nav>
      <div class="flex gap-2"><button class="btn btn-ghost btn-sm">Entrar</button><button class="btn btn-primary btn-sm">Crear cuenta</button></div>
    </div>`, false)}

  ${sub('m-features', 'Features', 'Secciones de features: grilla, media alternada, listas con ícono.')}
  ${demo('grilla de 3', `
    <div class="grid md:grid-cols-3 gap-5">
      ${[['box', 'Inventario en vivo', 'Stock por bodega con reservas y tránsitos calculados al instante.'], ['clock', 'Cierres automáticos', 'El cierre mensual corre solo y deja trazabilidad de cada ajuste.'], ['shield', 'Auditoría total', 'Cada cambio queda firmado con autor, fecha y valor anterior.']]
        .map(([ic, t, b]) => `
        <div class="card p-6">
          <span class="w-10 h-10 well flex items-center justify-center">${icon[ic](18)}</span>
          <h4 class="mt-4">${t}</h4>
          <p class="mt-2 text-size-regular text-text-secondary">${b}</p>
        </div>`).join('')}
    </div>`)}
  ${demo('media alternada', `
    <div class="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <span class="kicker">Reportes</span>
        <h3 class="mt-3 text-headline-md">Del dato a la decisión en un clic</h3>
        <p class="mt-3 text-size-regular text-text-secondary">Margen por producto, rotación por bodega y proyección de quiebres, exportable a CSV o directo a tu contador.</p>
        <ul class="mt-4 space-y-2 text-size-regular">
          ${['Márgenes por categoría', 'Alertas de reorden', 'Exportación programada'].map((t) => `<li class="flex items-center gap-2"><span class="text-success">${icon.check(14)}</span>${t}</li>`).join('')}
        </ul>
      </div>
      ${ph(220, 'captura del producto')}
    </div>`)}

  ${sub('m-content', 'Content', 'Secciones de contenido/prosa general.')}
  ${demo('', `
    <div class="max-w-2xl space-y-4 text-size-medium text-text-secondary">
      <h3 class="text-headline-md text-text-primary">Por qué eliminamos las hojas de cálculo</h3>
      <p>Cada hoja de cálculo compartida es una base de datos sin dueño. Los founders que entrevistamos perdían en promedio seis horas semanales reconciliando versiones.</p>
      <p>Moderno reemplaza ese ciclo con una sola fuente de verdad: cada movimiento de inventario, factura o pago vive en un registro auditable que todo el equipo lee en tiempo real.</p>
    </div>`)}

  ${sub('m-careers', 'Careers', 'Vacantes y secciones de página de carreras.')}
  ${demo('', `
    <div class="card divide-y divide-border-default max-w-2xl">
      ${[['Ingeniería', 'Senior Backend Engineer', 'Remoto · LATAM'], ['Producto', 'Product Designer', 'Bogotá · híbrido'], ['Ventas', 'Account Executive', 'Ciudad de México']]
        .map(([d, t, l]) => `
        <a href="#" class="flex items-center gap-4 px-5 py-4 hover:bg-border-default/40 group">
          <div class="flex-1"><p class="text-size-small text-text-secondary">${d}</p><p class="text-size-medium">${t}</p></div>
          <span class="text-size-small text-text-secondary">${l}</span>
          <span class="text-text-secondary group-hover:text-text-primary">${icon.arrowRight(14)}</span>
        </a>`).join('')}
    </div>`)}

  ${sub('m-pricing', 'Pricing', 'Tablas de precios y comparación de planes.')}
  ${demo('', `
    <div class="grid md:grid-cols-3 gap-5 items-start">
      ${[['Starter', '$0', 'Para validar tu idea', ['1 bodega', '3 usuarios', '500 SKUs'], false], ['Pro', '$49', 'Para operar en serio', ['Bodegas ilimitadas', 'Usuarios ilimitados', 'Reportes avanzados', 'Soporte prioritario'], true], ['Scale', '$199', 'Para multi-entidad', ['Todo lo de Pro', 'Multi-empresa', 'API y webhooks', 'SLA 99,9 %'], false]]
        .map(([n, p, d, f, hot]) => `
        <div class="card p-6 ${hot ? 'border-primary shadow-medium relative' : ''}">
          ${hot ? '<span class="badge badge-solid absolute -top-3 left-6">Recomendado</span>' : ''}
          <h4>${n}</h4>
          <p class="mt-3 text-headline-lg">${p}<span class="text-size-small text-text-secondary"> /mes</span></p>
          <p class="mt-1 text-size-small text-text-secondary">${d}</p>
          <button class="btn ${hot ? 'btn-primary' : 'btn-secondary'} w-full mt-5">Elegir ${n}</button>
          <ul class="mt-5 space-y-2 text-size-regular text-text-secondary">
            ${f.map((x) => `<li class="flex gap-2"><span class="text-success mt-0.5">${icon.check(13)}</span>${x}</li>`).join('')}
          </ul>
        </div>`).join('')}
    </div>`)}

  ${sub('m-footers', 'Footers', 'Footers con navegación, legales y social.')}
  ${demo('', `
    <div class="border-t border-border-default pt-10 pb-6 px-6">
      <div class="grid sm:grid-cols-4 gap-8 max-w-4xl">
        <div><span class="text-weight-medium">moderno</span><p class="mt-2 text-size-small text-text-secondary">El stack de negocio para founders modernos.</p></div>
        ${[['Producto', ['Inventario', 'Facturación', 'Reportes']], ['Compañía', ['Nosotros', 'Carreras', 'Blog']], ['Legal', ['Privacidad', 'Términos', 'Estado del servicio']]]
          .map(([t, ls]) => `<div><h6 class="text-text-secondary mb-3">${t}</h6><ul class="space-y-2 text-size-regular text-text-secondary">${ls.map((l) => `<li><a href="#" class="hover:text-text-primary">${l}</a></li>`).join('')}</ul></div>`).join('')}
      </div>
      <div class="mt-10 pt-5 border-t border-border-default flex items-center justify-between flex-wrap gap-4">
        <span class="text-size-small text-text-secondary">© 2026 Moderno Inc.</span>
        <div class="flex gap-4 text-text-secondary">${['X', 'LinkedIn', 'YouTube', 'Instagram'].map((k) => `<a href="#" class="hover:text-text-primary" aria-label="${k}">${brandIcons[k]}</a>`).join('')}</div>
      </div>
    </div>`, false)}

  ${sub('m-contact', 'Contact', 'Secciones y formularios de contacto.')}
  ${demo('', `
    <div class="grid md:grid-cols-2 gap-10 max-w-4xl">
      <div>
        <h3 class="text-headline-md">Hablemos</h3>
        <p class="mt-2 text-size-regular text-text-secondary">Respondemos en menos de un día hábil.</p>
        <div class="mt-6 space-y-3 text-size-regular text-text-secondary">
          <p class="flex items-center gap-3">${icon.email(15)} hola@moderno.co</p>
          <p class="flex items-center gap-3">${icon.phone(15)} +57 601 555 0134</p>
          <p class="flex items-center gap-3">${icon.pin(15)} Cra 11 #93-46, Bogotá</p>
        </div>
      </div>
      <form class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div><label class="field-label" for="mc-n">Nombre</label><input class="input" id="mc-n"></div>
          <div><label class="field-label" for="mc-e">Correo</label><input class="input" id="mc-e" type="email"></div>
        </div>
        <div><label class="field-label" for="mc-m">Mensaje</label><textarea class="input h-28" id="mc-m"></textarea></div>
        <button class="btn btn-primary" type="button">Enviar mensaje</button>
      </form>
    </div>`)}

  ${sub('m-faqs', 'FAQs', 'Secciones de preguntas frecuentes.')}
  ${demo('', `
    <div class="max-w-2xl">
      <h3 class="text-headline-md mb-6">Preguntas frecuentes</h3>
      <div class="card divide-y divide-border-default">
        ${faq.map(([q, a], i) => `
          <details class="group" ${i === 0 ? 'open' : ''}>
            <summary class="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none text-size-regular hover:bg-border-default/40">${q}<span class="text-text-secondary transition-transform group-open:rotate-180">${icon.chevronDown(14)}</span></summary>
            <p class="px-5 pb-5 text-size-regular text-text-secondary">${a}</p>
          </details>`).join('')}
      </div>
    </div>`)}

  ${sub('m-testimonials', 'Testimonials', 'Prueba social y citas de clientes.')}
  ${demo('', `
    <div class="grid md:grid-cols-2 gap-5 max-w-4xl">
      ${[['“Pasamos de cerrar inventario en tres días a hacerlo en una tarde. El equipo entero vive en Moderno.”', 'LR', 'Laura Restrepo', 'COO, Bruno Café'], ['“La auditoría automática nos salvó la due diligence. Cada número tenía respaldo.”', 'DM', 'Daniel Mora', 'CEO, Verde Logística']]
        .map(([q, i, n, r]) => `
        <figure class="card p-6">
          <div class="flex gap-1 text-warning">${Array(5).fill(icon.starFill(13)).join('')}</div>
          <blockquote class="mt-4 text-size-medium">${q}</blockquote>
          <figcaption class="mt-5 flex items-center gap-3">${av(i, 36)}<div><p class="text-size-regular">${n}</p><p class="text-size-small text-text-secondary">${r}</p></div></figcaption>
        </figure>`).join('')}
    </div>`)}

  ${sub('m-logos', 'Logos', 'Logo clouds / strips de “confían en nosotros”.')}
  ${demo('', `
    <p class="text-center text-size-small text-text-secondary mb-6">Equipos que operan con Moderno</p>
    <div class="flex flex-wrap justify-center items-center gap-x-12 gap-y-5 text-text-secondary">
      ${['BRUNO', 'verde·log', 'Kapital', 'NORTE', 'fábrica', 'Andina&Co'].map((l) => `<span class="text-body-lg tracking-wide opacity-60">${l}</span>`).join('')}
    </div>`)}

  ${sub('m-team', 'Team', 'Grillas de equipo y bios.')}
  ${demo('', `
    <div class="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-3xl">
      ${[['LR', 'Laura Restrepo', 'CEO'], ['MV', 'Mateo Vélez', 'CTO'], ['JS', 'Julia Sáenz', 'Diseño'], ['DM', 'Daniel Mora', 'Ventas']]
        .map(([i, n, r]) => `
        <div class="card p-5 text-center">
          <span class="mx-auto block w-fit">${av(i, 56)}</span>
          <p class="mt-3 text-size-regular">${n}</p><p class="text-size-small text-text-secondary">${r}</p>
        </div>`).join('')}
    </div>`)}

  ${sub('m-cta', 'CTA', 'Secciones de llamada a la acción.')}
  ${demo('', `
    <div class="bg-primary text-on-primary px-8 py-12 text-center">
      <h3 class="text-headline-lg">Tu operación, en orden esta semana</h3>
      <p class="mt-2 opacity-70">Migramos tus datos gratis. Sin tarjeta de crédito.</p>
      <button class="btn mt-6 !bg-surface-base !text-text-primary hover:opacity-90">Empezar ahora</button>
    </div>`, false)}

  ${sub('m-blogheader', 'Blog headers', 'Header del índice/landing del blog.')}
  ${demo('', `
    <div class="py-10 px-6 border-b border-border-default">
      <span class="kicker">Blog</span>
      <h2 class="mt-3 text-headline-lg">Operaciones sin drama</h2>
      <p class="mt-2 text-size-regular text-text-secondary max-w-lg">Guías prácticas de inventario, finanzas y herramientas para equipos que están creciendo.</p>
      <div class="mt-5 flex gap-2" data-chips>
        <button class="chip" data-selected="true">Todo</button><button class="chip" data-selected="false">Inventario</button><button class="chip" data-selected="false">Finanzas</button><button class="chip" data-selected="false">Producto</button>
      </div>
    </div>`, false)}

  ${sub('m-blogsections', 'Blog sections', 'Listados/previews de posts.')}
  ${demo('', `
    <div class="grid md:grid-cols-3 gap-5">
      ${[['Inventario', 'Cómo definir puntos de reorden que no fallen', '6 min'], ['Finanzas', 'El flujo de caja que tu contador quiere ver', '8 min'], ['Producto', 'Novedades de junio: transferencias masivas', '3 min']]
        .map(([c, t, m]) => `
        <a href="#" class="card group overflow-hidden">
          ${ph(140)}
          <div class="p-5">
            <p class="text-size-small text-text-secondary">${c} · ${m} de lectura</p>
            <h4 class="mt-2 group-hover:underline underline-offset-4">${t}</h4>
          </div>
        </a>`).join('')}
    </div>`)}

  ${sub('m-blogpost', 'Blog post header', 'Header de artículo individual: título, meta y hero.')}
  ${demo('', `
    <div class="max-w-2xl mx-auto py-8">
      <p class="text-size-small text-text-secondary"><a href="#" class="hover:text-text-primary">Blog</a> / Inventario</p>
      <h2 class="mt-4 text-headline-lg">Cómo definir puntos de reorden que no fallen</h2>
      <div class="mt-5 flex items-center gap-3">${av('JS', 36)}<div class="text-size-small"><p>Julia Sáenz</p><p class="text-text-secondary">11 de junio de 2026 · 6 min de lectura</p></div></div>
      <div class="mt-6">${ph(200, 'imagen hero del artículo')}</div>
    </div>`, false)}

  ${sub('m-newsletter', 'Newsletter', 'Secciones de suscripción por correo.')}
  ${demo('', `
    <div class="card p-8 max-w-xl text-center mx-auto">
      <h4>Una idea operativa por semana</h4>
      <p class="mt-2 text-size-regular text-text-secondary">Sin spam. Date de baja cuando quieras.</p>
      <form class="mt-5 flex gap-2 max-w-sm mx-auto">
        <input class="input flex-1" type="email" placeholder="tu@correo.co" aria-label="Correo">
        <button class="btn btn-primary" type="button">Suscribirme</button>
      </form>
    </div>`)}

  ${sub('m-stats', 'Stats', 'Secciones de métricas/números destacados.')}
  ${demo('', `
    <div class="grid grid-cols-2 md:grid-cols-4 gap-px bg-border-default border border-border-default">
      ${[['4.200+', 'empresas activas'], ['$180 M', 'inventario gestionado'], ['99,98 %', 'uptime último año'], ['< 4 h', 'tiempo de migración']]
        .map(([v, l]) => `<div class="bg-surface-base p-6 text-center"><p class="text-headline-lg tabular-nums">${v}</p><p class="mt-1 text-size-small text-text-secondary">${l}</p></div>`).join('')}
    </div>`, false)}

  ${sub('m-contactmodal', 'Contact modals', 'Captura de leads/contacto en modal.')}
  ${demo('', `
    <button class="btn btn-secondary" data-open="#m-modal-contact">Abrir modal de contacto</button>
    <dialog class="modal" id="m-modal-contact">
      <div class="flex items-center justify-between px-6 h-14 border-b border-border-default">
        <h4>Habla con ventas</h4>
        <button class="btn btn-ghost btn-sm btn-icon" data-close aria-label="Cerrar">${icon.x(14)}</button>
      </div>
      <div class="p-6 space-y-4">
        <div><label class="field-label">Correo de trabajo</label><input class="input" type="email" placeholder="tu@empresa.co"></div>
        <div><label class="field-label">Tamaño del equipo</label><div class="relative"><select class="input"><option>1–10</option><option>11–50</option><option>51+</option></select><span class="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none">${icon.chevronDown(14)}</span></div></div>
        <div><label class="field-label">¿Qué necesitas resolver?</label><textarea class="input h-20"></textarea></div>
      </div>
      <div class="px-6 py-4 border-t border-border-default flex justify-end gap-2">
        <button class="btn btn-ghost" data-close>Cancelar</button><button class="btn btn-primary" data-close>Enviar</button>
      </div>
    </dialog>`)}

  ${sub('m-404', '404 Errors', 'Secciones de error / 404 para el sitio.')}
  ${demo('', `
    <div class="py-16 text-center">
      <p class="text-display text-border-strong select-none">404</p>
      <h3 class="mt-2 text-headline-md">Esta página no existe</h3>
      <p class="mt-2 text-size-regular text-text-secondary">Quizá el enlace cambió o nunca estuvo aquí.</p>
      <div class="mt-6 flex justify-center gap-3"><button class="btn btn-primary">Ir al inicio</button><button class="btn btn-secondary">Contactar soporte</button></div>
    </div>`, false)}

  ${sub('m-emails', '3.2 · Emails', 'Plantillas de correo de marketing y transaccionales. Layout de una columna, 600px, mismos roles de color.')}
  ${demo('transaccional', `
    <div class="max-w-md mx-auto card">
      <div class="px-6 py-5 border-b border-border-default"><span class="text-weight-medium">moderno</span></div>
      <div class="p-6 space-y-4 text-size-regular">
        <h4>Tu cierre de mayo está listo</h4>
        <p class="text-text-secondary">Hola Laura: el cierre de inventario de mayo terminó sin diferencias pendientes. Puedes descargar el reporte firmado desde tu panel.</p>
        <button class="btn btn-primary w-full">Ver reporte</button>
        <p class="text-size-small text-text-secondary">Si no esperabas este correo, puedes ignorarlo.</p>
      </div>
      <div class="px-6 py-4 border-t border-border-default text-size-tiny text-text-secondary">© 2026 Moderno Inc. · Cra 11 #93-46, Bogotá · <a href="#" class="underline">Preferencias</a></div>
    </div>`)}
  `)
