import { sub, demo, sectionShell, av, ph } from '../ui.js'

export const toc = { num: '06', title: 'Portafolio', items: [
  ['p-headers', 'Portfolio Headers'], ['p-sections', 'Portfolio sections'], ['p-longform', 'Long Form Content'],
]}

export const html = sectionShell('06 · Portafolio', 'portafolio', 'Portafolio',
  'Bloques para sitios de portafolio personales y de agencia. Las páginas de ejemplo (6.2) combinan estos módulos con plantillas de correo relacionadas.',
  `
  ${sub('p-headers', 'Portfolio Headers', 'Headers de presentación / intro.')}
  ${demo('', `
    <div class="py-14 px-6 max-w-3xl">
      <span class="flex items-center gap-3">${av('JS', 48)}<span class="badge badge-success"><span class="badge-dot"></span>Disponible para proyectos</span></span>
      <h1 class="mt-6 text-[clamp(32px,6vw,64px)] leading-[1.1] tracking-[-0.02em]">Julia Sáenz — diseño de producto con foco en sistemas</h1>
      <p class="mt-5 text-body-lg text-text-secondary max-w-xl">Ocho años diseñando herramientas B2B en LATAM. Antes en Moderno, Rappi y Platzi.</p>
      <div class="mt-7 flex gap-3"><button class="btn btn-primary">Ver proyectos</button><button class="btn btn-secondary">Descargar CV</button></div>
    </div>`, false)}

  ${sub('p-sections', 'Portfolio sections', 'Showcase de trabajo / proyectos.')}
  ${demo('', `
    <div class="grid md:grid-cols-2 gap-5">
      ${[['Moderno — sistema de diseño', 'Design systems · 2025', 220], ['Checkout de Rappi Turbo', 'Producto · 2024', 220]]
        .map(([t, m, h]) => `
        <a href="#" class="card group overflow-hidden">
          ${ph(h)}
          <div class="p-5 flex items-center justify-between">
            <div><p class="text-size-medium group-hover:underline underline-offset-4">${t}</p><p class="text-size-small text-text-secondary mt-0.5">${m}</p></div>
            <span class="text-text-secondary group-hover:text-text-primary group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </a>`).join('')}
    </div>`)}

  ${sub('p-longform', 'Long Form Content', 'Layouts de caso de estudio / lectura larga.')}
  ${demo('', `
    <article class="max-w-2xl mx-auto space-y-6">
      <header>
        <p class="kicker">Caso de estudio · 12 min</p>
        <h2 class="mt-3 text-headline-lg">Rediseñando el cierre de inventario de Moderno</h2>
        <p class="mt-3 text-size-medium text-text-secondary">Cómo pasamos de un proceso de tres días a una tarde, sin perder trazabilidad contable.</p>
      </header>
      ${ph(200, 'imagen de portada')}
      <div class="space-y-4 text-size-medium text-text-secondary">
        <h3 class="text-body-lg text-text-primary">El problema</h3>
        <p>El cierre mensual dependía de cuatro hojas de cálculo y dos personas que sabían “el truco”. Cada diferencia se rastreaba a mano contra el kárdex.</p>
        <blockquote class="border-l-2 border-primary pl-5 py-1 text-text-primary">“El 80 % del tiempo no era contar: era explicar por qué los números no cuadraban.”</blockquote>
        <p>Mapeamos el flujo real con los operarios de bodega y encontramos que el 60 % de las diferencias nacía en transferencias sin confirmar.</p>
      </div>
    </article>`)}
  `)
