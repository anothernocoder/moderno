// Islas React dentro del styleguide vanilla: sileo (toasts) y liveline (charts en vivo).
// Se montan con createElement/createRoot — sin JSX, sin plugin de React en Vite.
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sileo'
import { Liveline } from 'liveline'
import 'sileo/styles.css'

/**
 * Monta el contenedor global de toasts de sileo (una sola vez por página).
 * El tema sigue el data-theme del documento.
 */
export function mountToaster(position = 'bottom-right') {
  const el = document.createElement('div')
  el.id = 'sileo-root'
  document.body.appendChild(el)
  const root = createRoot(el)
  const renderToaster = () => {
    const theme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
    root.render(createElement(Toaster, { position, theme }))
  }
  renderToaster()
  new MutationObserver(renderToaster).observe(document.documentElement, {
    attributes: true, attributeFilter: ['data-theme'],
  })
}

/**
 * Monta un chart liveline con datos simulados en streaming (random walk).
 * Devuelve un cleanup() que detiene el stream y desmonta la isla.
 */
export function mountLiveChart(el, { base = 100, tick = 600, ...props } = {}) {
  const root = createRoot(el)
  let value = base
  const data = []
  // liveline trabaja con `time` en segundos (Date.now() / 1e3)
  const now = Date.now() / 1000
  for (let i = 60; i > 0; i--) {
    value = Math.max(base * 0.4, value + (Math.random() - 0.48) * base * 0.04)
    data.push({ time: now - (i * tick) / 1000, value })
  }

  const draw = () => {
    const theme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
    root.render(createElement(Liveline, {
      data: [...data],
      value,
      theme,
      color: getComputedStyle(document.documentElement).getPropertyValue('--md-primary').trim(),
      grid: false,
      fill: true,
      showValue: true,
      ...props,
    }))
  }

  const timer = setInterval(() => {
    value = Math.max(base * 0.4, value + (Math.random() - 0.48) * base * 0.04)
    data.push({ time: Date.now() / 1000, value })
    if (data.length > 240) data.shift()
    draw()
  }, tick)

  draw()
  return () => { clearInterval(timer); root.unmount() }
}
