// Helpers de construcción del styleguide + set de iconos (1.8)

const svg = (body, s = 16, vb = 16) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 ${vb} ${vb}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`

export const icon = {
  chevronUp: (s) => svg('<path d="M4 10l4-4 4 4"/>', s),
  chevronDown: (s) => svg('<path d="M4 6l4 4 4-4"/>', s),
  chevronLeft: (s) => svg('<path d="M10 4L6 8l4 4"/>', s),
  chevronRight: (s) => svg('<path d="M6 4l4 4-4 4"/>', s),
  filters: (s) => svg('<path d="M2 4.5h12M4.5 8h7M6.5 11.5h3"/>', s),
  link: (s) => svg('<path d="M6.5 9.5l3-3M5 7L3.5 8.5a2.5 2.5 0 003.5 3.5L8.5 10.5M11 9l1.5-1.5A2.5 2.5 0 009 4L7.5 5.5"/>', s),
  email: (s) => svg('<rect x="1.5" y="3.5" width="13" height="9"/><path d="M2 4.5l6 4.5 6-4.5"/>', s),
  chat: (s) => svg('<path d="M2 3.5h12v8H8l-3 2.5v-2.5H2z"/>', s),
  phone: (s) => svg('<path d="M3 2.5h3l1 3-1.5 1.5a8 8 0 003.5 3.5L10.5 9l3 1v3a1.5 1.5 0 01-1.5 1.5C6.5 14 2 9.5 2 4A1.5 1.5 0 013 2.5z"/>', s),
  pin: (s) => svg('<path d="M8 14s-4.5-4-4.5-7.5a4.5 4.5 0 019 0C12.5 10 8 14 8 14z"/><circle cx="8" cy="6.5" r="1.5"/>', s),
  clock: (s) => svg('<circle cx="8" cy="8" r="6.25"/><path d="M8 4.5V8l2.5 1.5"/>', s),
  menu: (s) => svg('<path d="M2 4.5h12M2 8h12M2 11.5h12"/>', s),
  x: (s) => svg('<path d="M4 4l8 8M12 4l-8 8"/>', s),
  check: (s) => svg('<path d="M3 8.5l3 3 7-7.5"/>', s),
  plus: (s) => svg('<path d="M8 3v10M3 8h10"/>', s),
  minus: (s) => svg('<path d="M3 8h10"/>', s),
  dots: (s) => svg('<circle cx="3.5" cy="8" r="0.5" fill="currentColor"/><circle cx="8" cy="8" r="0.5" fill="currentColor"/><circle cx="12.5" cy="8" r="0.5" fill="currentColor"/>', s),
  search: (s) => svg('<circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5L14 14"/>', s),
  download: (s) => svg('<path d="M8 2v8m0 0L4.5 6.5M8 10l3.5-3.5M2.5 13.5h11"/>', s),
  upload: (s) => svg('<path d="M8 10V2m0 0L4.5 5.5M8 2l3.5 3.5M2.5 13.5h11"/>', s),
  copy: (s) => svg('<rect x="5.5" y="5.5" width="8" height="8"/><path d="M10.5 5.5v-3h-8v8h3"/>', s),
  cart: (s) => svg('<path d="M1.5 2h2l1.8 8h7.2l1.5-6H4"/><circle cx="6" cy="13" r="1"/><circle cx="11.5" cy="13" r="1"/>', s),
  star: (s) => svg('<path d="M8 1.5l2 4.1 4.5.6-3.3 3.2.8 4.5L8 11.8l-4 2.1.8-4.5L1.5 6.2 6 5.6z"/>', s),
  starFill: (s) => `<svg width="${s || 16}" height="${s || 16}" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 1.5l2 4.1 4.5.6-3.3 3.2.8 4.5L8 11.8l-4 2.1.8-4.5L1.5 6.2 6 5.6z"/></svg>`,
  trash: (s) => svg('<path d="M2.5 4h11M5.5 4V2.5h5V4M4 4l.7 9.5h6.6L12 4M6.5 7v4M9.5 7v4"/>', s),
  edit: (s) => svg('<path d="M11.5 2.5l2 2L6 12l-3 1 1-3z"/>', s),
  arrowRight: (s) => svg('<path d="M2.5 8h11m0 0L9 3.5M13.5 8L9 12.5"/>', s),
  arrowLeft: (s) => svg('<path d="M13.5 8h-11m0 0L7 3.5M2.5 8L7 12.5"/>', s),
  grip: (s) => `<svg width="${s || 16}" height="${s || 16}" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><circle cx="6" cy="3.5" r="1"/><circle cx="10" cy="3.5" r="1"/><circle cx="6" cy="8" r="1"/><circle cx="10" cy="8" r="1"/><circle cx="6" cy="12.5" r="1"/><circle cx="10" cy="12.5" r="1"/></svg>`,
  user: (s) => svg('<circle cx="8" cy="5" r="2.75"/><path d="M2.5 14a5.5 5.5 0 0111 0"/>', s),
  users: (s) => svg('<circle cx="6" cy="5.5" r="2.25"/><path d="M1.5 13a4.5 4.5 0 019 0M10.5 3.5a2.25 2.25 0 010 4.3M14.5 13a4.5 4.5 0 00-3-4.2"/>', s),
  calendar: (s) => svg('<rect x="2" y="3" width="12" height="11"/><path d="M2 6.5h12M5.5 1.5v3M10.5 1.5v3"/>', s),
  bell: (s) => svg('<path d="M3.5 11.5h9c-1-1-1.25-2.4-1.25-4.25a3.25 3.25 0 00-6.5 0c0 1.85-.25 3.25-1.25 4.25zM6.5 13.5a1.5 1.5 0 003 0"/>', s),
  external: (s) => svg('<path d="M6.5 3.5H2.5v10h10V9.5M9 2.5h4.5V7M13 3L7.5 8.5"/>', s),
  warn: (s) => svg('<path d="M8 2L15 13.5H1L8 2z"/><path d="M8 6.5v3M8 11.5v.1"/>', s),
  info: (s) => svg('<circle cx="8" cy="8" r="6.25"/><path d="M8 7.5v3.5M8 5.2v.1"/>', s),
  checkCircle: (s) => svg('<circle cx="8" cy="8" r="6.25"/><path d="M5.2 8.2l1.9 1.9 3.7-4.2"/>', s),
  xCircle: (s) => svg('<circle cx="8" cy="8" r="6.25"/><path d="M5.5 5.5l5 5M10.5 5.5l-5 5"/>', s),
  box: (s) => svg('<path d="M2 4.5L8 1.5l6 3v7l-6 3-6-3z"/><path d="M2 4.5l6 3 6-3M8 7.5v7"/>', s),
  truck: (s) => svg('<path d="M1.5 3.5h8v7h-8zM9.5 6h3l2 2.5v2h-5"/><circle cx="4.5" cy="12" r="1.25"/><circle cx="11.5" cy="12" r="1.25"/>', s),
  shield: (s) => svg('<path d="M8 1.5l5.5 2v4c0 3.5-2.3 5.9-5.5 7-3.2-1.1-5.5-3.5-5.5-7v-4z"/><path d="M5.5 8l1.8 1.8 3.2-3.6"/>', s),
  refresh: (s) => svg('<path d="M13.5 8a5.5 5.5 0 11-1.6-3.9M13.5 2.5V6H10"/>', s),
  heart: (s) => svg('<path d="M8 13.5S2 9.8 2 5.8A3 3 0 018 4a3 3 0 016 1.8c0 4-6 7.7-6 7.7z"/>', s),
  eye: (s) => svg('<path d="M1.5 8S4 3.75 8 3.75 14.5 8 14.5 8 12 12.25 8 12.25 1.5 8 1.5 8z"/><circle cx="8" cy="8" r="1.75"/>', s),
}

// Iconos de marca / social (1.8) — marcas monocromas simplificadas
const brand = (body) =>
  `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${body}</svg>`

export const brandIcons = {
  Google: brand('<path d="M21.6 12.2c0-.7-.06-1.4-.18-2H12v3.9h5.4a4.6 4.6 0 01-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.4z" opacity=".9"/><path d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0012 22z" opacity=".7"/><path d="M6.4 14a6 6 0 010-3.9V7.4H3.1a10 10 0 000 9.2z" opacity=".5"/><path d="M12 5.9c1.5 0 2.8.5 3.8 1.5L18.7 4.6A10 10 0 003.1 7.4l3.3 2.6C7.2 7.7 9.4 5.9 12 5.9z" opacity=".8"/>'),
  Facebook: brand('<path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V5.1c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5V11H8.5v3H11v7z"/>'),
  Apple: brand('<path d="M16.4 12.6c0-2.4 2-3.5 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.8-3.5.8-.7 0-1.9-.8-3.1-.8-1.6 0-3 .9-3.9 2.4-1.6 2.9-.4 7.1 1.2 9.4.8 1.1 1.7 2.4 3 2.4 1.2 0 1.6-.8 3.1-.8s1.9.8 3.1.8c1.3 0 2.1-1.2 2.9-2.3.9-1.3 1.3-2.6 1.3-2.7 0 0-2.6-1-2.7-3.9zM14 5.6c.7-.8 1.1-1.9 1-3.1-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.8-1.4z"/>'),
  Instagram: brand('<path d="M12 4.3c2.5 0 2.8 0 3.8.06 2.5.1 3.7 1.3 3.8 3.8.05 1 .06 1.3.06 3.8s0 2.8-.06 3.8c-.1 2.5-1.3 3.7-3.8 3.8-1 .05-1.3.06-3.8.06s-2.8 0-3.8-.06c-2.5-.1-3.7-1.3-3.8-3.8-.05-1-.06-1.3-.06-3.8s0-2.8.06-3.8c.1-2.5 1.3-3.7 3.8-3.8 1-.05 1.3-.06 3.8-.06zM12 2.5c-2.6 0-2.9 0-3.9.06-3.4.16-5.4 2.1-5.5 5.5C2.5 9 2.5 9.4 2.5 12s0 2.9.06 3.9c.16 3.4 2.1 5.4 5.5 5.5 1 .06 1.3.06 3.9.06s2.9 0 3.9-.06c3.4-.16 5.4-2.1 5.5-5.5.06-1 .06-1.3.06-3.9s0-2.9-.06-3.9c-.16-3.4-2.1-5.4-5.5-5.5-1-.06-1.3-.06-3.9-.06zm0 4.6a4.9 4.9 0 100 9.8 4.9 4.9 0 000-9.8zm0 8a3.1 3.1 0 110-6.2 3.1 3.1 0 010 6.2zm5.1-9.4a1.15 1.15 0 100 2.3 1.15 1.15 0 000-2.3z"/>'),
  LinkedIn: brand('<path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.05c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4z"/>'),
  X: brand('<path d="M17.8 3h3l-6.6 7.5L22 21h-6.1l-4.8-6.2L5.6 21h-3l7-8L2.4 3h6.3l4.3 5.7zm-1.1 16.2h1.7L7.7 4.7H5.9z"/>'),
  YouTube: brand('<path d="M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 002.4 7.2 26 26 0 002 12a26 26 0 00.4 4.8 2.5 2.5 0 001.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 001.8-1.8A26 26 0 0022 12a26 26 0 00-.4-4.8zM10 15V9l5.2 3z"/>'),
  Dribbble: brand('<path d="M12 2.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19zm6.3 4.4a8.1 8.1 0 011.8 5c-2.7-.6-5.1-.6-7.1-.3-.2-.5-.4-1-.7-1.5 2.4-1 4.5-2.1 6-3.2zm-1-1.1c-1.4 1-3.3 2.1-5.6 3-1.1-2-2.3-3.7-3.4-5a8.2 8.2 0 019 2zM6.9 4.9c1.1 1.3 2.3 3 3.4 4.9-2.6.8-5.3 1.2-7.5 1.2A8.2 8.2 0 016.9 4.9zM3.8 12.7c2.5 0 5.6-.4 8.5-1.4l.6 1.3c-3.1 1-5.6 3-7.2 4.9a8.1 8.1 0 01-1.9-4.8zm3.1 5.9c1.5-1.8 3.7-3.6 6.5-4.5.7 1.9 1.3 4 1.6 6.2a8.2 8.2 0 01-8.1-1.7zm9.7.9c-.3-2-.8-4-1.5-5.8 1.8-.2 3.8-.1 6 .4a8.2 8.2 0 01-4.5 5.4z"/>'),
  Relume: brand('<path d="M5 3h8a6 6 0 012.6 11.4L19 21h-4.3l-3-5.7H9V21H5zm4 4v4.3h3.6a2.15 2.15 0 000-4.3z"/>'),
}

export const sub = (id, title, desc = '') => `
  <div class="sg-sub mt-12 mb-6" id="${id}">
    <h3 class="text-body-lg">${title}</h3>
    ${desc ? `<p class="text-body-sm text-text-secondary mt-1 max-w-2xl">${desc}</p>` : ''}
  </div>`

export const demo = (label, body, pad = true) => `
  <div class="demo ${pad ? '' : '!p-0'}">
    ${label ? `<p class="demo-label" ${pad ? '' : 'style="padding:16px 16px 0"'}>${label}</p>` : ''}
    ${body}
  </div>`

export const sectionShell = (num, id, title, desc, body) => `
  <section id="${id}" class="sg-section">
    <p class="kicker mb-2">${num}</p>
    <h2 class="sg-title">${title}</h2>
    <p class="text-body-sm text-text-secondary mt-2 mb-8 max-w-2xl">${desc}</p>
    ${body}
  </section>`

export const av = (initials, size = 32) =>
  `<span class="avatar" style="width:${size}px;height:${size}px;font-size:${Math.round(size * 0.38)}px">${initials}</span>`

export const ph = (h, label = '', cls = '') => `
  <div class="well flex items-center justify-center text-text-secondary text-size-small ${cls}" style="height:${h}px">
    ${label || ''}
  </div>`
