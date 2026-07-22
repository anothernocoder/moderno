import { createSignal, Show, type JSX } from 'solid-js'

export interface PromoProps {
  message?: string
  ctaLabel?: string
  ctaHref?: string
  onCtaClick?: (event: MouseEvent) => void
  dismissible?: boolean
  onDismiss?: () => void
  closeLabel?: string
}

const barStyle: JSX.CSSProperties = {
  position: 'relative',
  background: 'var(--md-primary)',
  color: 'var(--md-on-primary)',
}
const rowStyle: JSX.CSSProperties = {
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'center',
  'flex-wrap': 'wrap',
  gap: '8px 16px',
  'max-width': '1040px',
  margin: '0 auto',
  padding: '10px 48px',
  'text-align': 'center',
}
const messageStyle: JSX.CSSProperties = {
  margin: 0,
  'font-size': 'var(--md-text-body-sm)',
  'line-height': 'var(--md-text-body-sm-lh)',
  'font-weight': 600,
}
const ctaLinkStyle: JSX.CSSProperties = {
  color: 'inherit',
  'font-size': 'var(--md-text-body-sm)',
  'font-weight': 600,
  'text-decoration': 'underline',
  'white-space': 'nowrap',
  'flex-shrink': 0,
}
const closeButtonStyle: JSX.CSSProperties = {
  position: 'absolute',
  top: '50%',
  right: '16px',
  transform: 'translateY(-50%)',
  background: 'transparent',
  border: 'none',
  color: 'inherit',
  font: 'inherit',
  'font-size': '18px',
  'line-height': 1,
  cursor: 'pointer',
  padding: '4px',
}

/**
 * Moderno block — Promo (Solid). Copy-paste; edit freely.
 * Sitewide promotional announcement bar: a message, an optional CTA link, and an
 * optional close button. Plain layout + `--md-*` tokens, no primitives.
 */
export function Promo(props: PromoProps) {
  const message = () => props.message ?? 'Envío gratis en pedidos mayores a $50.000. Hoy: 20% de descuento en toda la tienda.'
  const ctaLabel = () => props.ctaLabel ?? 'Ver ofertas'
  const ctaHref = () => props.ctaHref ?? '#'
  const dismissible = () => props.dismissible ?? true
  const closeLabel = () => props.closeLabel ?? 'Cerrar'

  const [visible, setVisible] = createSignal(true)

  function handleDismiss() {
    setVisible(false)
    props.onDismiss?.()
  }

  return (
    <Show when={visible()}>
      <div style={barStyle} role="region" aria-label="Promoción">
        <div style={rowStyle}>
          <p style={messageStyle}>{message()}</p>
          <Show when={ctaLabel()}>
            <a href={ctaHref()} style={ctaLinkStyle} onClick={props.onCtaClick}>
              {ctaLabel()}
            </a>
          </Show>
        </div>
        <Show when={dismissible()}>
          <button type="button" style={closeButtonStyle} aria-label={closeLabel()} onClick={handleDismiss}>
            ×
          </button>
        </Show>
      </div>
    </Show>
  )
}
