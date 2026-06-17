import { sub, demo, sectionShell } from '../ui.js'

const frame = (ratio, label, inner = '') => `
  <div>
    <div class="well relative overflow-hidden" style="aspect-ratio:${ratio}">${inner}</div>
    <p class="spec mt-2">${label}</p>
  </div>`

const brandMark = `<div class="absolute inset-0 flex flex-col items-center justify-center gap-2">
  <span class="text-headline-md tracking-[-0.02em]">moderno</span>
  <span class="text-size-tiny text-text-secondary">el stack de negocio</span>
</div>`

export const toc = { num: '07', title: 'Imágenes y Ads', items: [
  ['i-mockups', 'Mockups y Post Images'], ['i-covers', 'Cover y Billboards'],
  ['i-stories', 'Stories'], ['i-wallpapers', 'Wallpapers'], ['i-backgrounds', 'Backgrounds'],
]}

export const html = sectionShell('07 · Imágenes y Ads', 'imagenes', 'Imágenes y Ads',
  'Plantillas de assets visuales para social, publicidad y superficies de marca. Mismos roles de color y tipografía del sistema.',
  `
  ${sub('i-mockups', 'Mockups y Post Images', 'Mockups de dispositivo y plantillas de post social (1:1, 4:5).')}
  ${demo('', `
    <div class="grid grid-cols-2 md:grid-cols-3 gap-5 max-w-2xl">
      ${frame('1/1', 'post · 1:1', brandMark)}
      ${frame('4/5', 'post · 4:5', brandMark)}
      ${frame('1/1', 'mockup de dispositivo', `<div class="absolute inset-6 border border-border-strong bg-surface-base"><div class="h-3 border-b border-border-default"></div><div class="p-3 space-y-2"><div class="skeleton h-2 w-2/3"></div><div class="skeleton h-2 w-1/2"></div><div class="skeleton h-10 mt-3"></div></div></div>`)}
    </div>`)}

  ${sub('i-covers', 'Cover y Billboards', 'Arte de portada y formatos grandes de banner/valla.')}
  ${demo('', `
    <div class="space-y-5 max-w-3xl">
      ${frame('3/1', 'cover · 3:1', `<div class="absolute inset-0 flex items-center px-8 justify-between"><span class="text-headline-lg tracking-[-0.02em]">Tu operación, en orden.</span><span class="badge badge-solid hidden sm:inline-flex">moderno.co</span></div>`)}
      ${frame('16/5', 'billboard · 16:5', `<div class="absolute inset-0 flex items-center justify-center gap-6"><span class="text-headline-md">moderno</span><span class="w-px h-8 bg-border-strong"></span><span class="text-size-regular text-text-secondary">El stack de negocio para founders</span></div>`)}
    </div>`)}

  ${sub('i-stories', 'Stories', 'Formato vertical 9:16 para anuncios y social.')}
  ${demo('', `
    <div class="grid grid-cols-3 gap-5 max-w-md">
      ${frame('9/16', 'story · texto', `<div class="absolute inset-0 flex flex-col justify-end p-4"><span class="kicker">Nuevo</span><span class="text-size-medium mt-1">Cierres automáticos</span><span class="badge badge-solid mt-3 w-fit !text-[10px]">Conocer más</span></div>`)}
      ${frame('9/16', 'story · stat', `<div class="absolute inset-0 flex flex-col items-center justify-center"><span class="text-headline-lg tabular-nums">−6 h</span><span class="text-size-tiny text-text-secondary mt-1 text-center px-3">de reconciliación semanal</span></div>`)}
      ${frame('9/16', 'story · marca', brandMark)}
    </div>`)}

  ${sub('i-wallpapers', 'Wallpapers', 'Wallpapers de marca para escritorio y móvil.')}
  ${demo('', `
    <div class="grid grid-cols-[2fr_1fr] gap-5 max-w-2xl">
      ${frame('16/9', 'desktop · 16:9', `<div class="absolute inset-0 flex items-center justify-center"><span class="text-display !text-[40px] text-border-strong select-none">moderno</span></div>`)}
      ${frame('9/19', 'móvil · 9:19', `<div class="absolute inset-0 flex items-end justify-center pb-6"><span class="text-size-small text-border-strong select-none">moderno</span></div>`)}
    </div>`)}

  ${sub('i-backgrounds', 'Backgrounds', 'Patrones decorativos y superficies de fondo.')}
  ${demo('', `
    <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
      ${frame('1/1', 'grid', '<div class="absolute inset-0" style="background-image:linear-gradient(var(--md-border-default) 1px, transparent 1px),linear-gradient(90deg, var(--md-border-default) 1px, transparent 1px);background-size:24px 24px"></div>')}
      ${frame('1/1', 'dots', '<div class="absolute inset-0" style="background-image:radial-gradient(var(--md-border-strong) 1px, transparent 1px);background-size:16px 16px"></div>')}
      ${frame('1/1', 'diagonal', '<div class="absolute inset-0" style="background-image:repeating-linear-gradient(45deg, var(--md-border-default) 0 1px, transparent 1px 12px)"></div>')}
      ${frame('1/1', 'degradado', '<div class="absolute inset-0" style="background:linear-gradient(160deg, var(--md-surface-base), var(--md-border-default))"></div>')}
    </div>`)}
  `)
