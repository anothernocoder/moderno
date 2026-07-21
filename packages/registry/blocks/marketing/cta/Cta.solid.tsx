import { Show, type JSX } from 'solid-js'
import { Button } from '@moderno/solid'

export interface CtaProps {
  title?: string
  description?: string
  ctaLabel?: string
  onCta?: () => void
  secondaryLabel?: string
  onSecondary?: () => void
}

const sectionStyle: JSX.CSSProperties = {
  padding: '96px 24px',
  'text-align': 'center',
  background: 'var(--md-surface-raised)',
  'border-radius': 'var(--md-radius-none)',
}
const titleStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': '40px',
  'line-height': 1.1,
  'letter-spacing': '-0.02em',
  color: 'var(--md-text-primary)',
  margin: '0 auto 16px',
  'max-width': '18ch',
}
const descriptionStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-lg)',
  'line-height': 'var(--md-text-body-lg-lh)',
  color: 'var(--md-text-secondary)',
  margin: '0 auto 32px',
  'max-width': '52ch',
}
const actionsStyle: JSX.CSSProperties = {
  display: 'flex',
  'justify-content': 'center',
  gap: '12px',
  'flex-wrap': 'wrap',
}

/**
 * Moderno block — Cta (Solid). Copy-paste; edit freely.
 * A focused headline + CTA button section — no kicker, no subtitle-as-secondary-emphasis.
 * Uses the Button primitive + Moderno tokens (--md-* custom properties).
 */
export function Cta(props: CtaProps) {
  const title = () => props.title ?? '¿Listo para construir con Moderno?'
  const description = () => props.description ?? 'Copia el block, instala el primitive y personaliza los tokens a tu gusto.'
  const ctaLabel = () => props.ctaLabel ?? 'Empezar ahora'

  return (
    <section style={sectionStyle}>
      <h2 style={titleStyle}>{title()}</h2>
      <Show when={description()}>
        <p style={descriptionStyle}>{description()}</p>
      </Show>
      <div style={actionsStyle}>
        <Button variant="primary" size="lg" label={ctaLabel()} onClick={() => props.onCta?.()} />
        <Show when={props.secondaryLabel}>
          <Button variant="secondary" size="lg" label={props.secondaryLabel} onClick={() => props.onSecondary?.()} />
        </Show>
      </div>
    </section>
  )
}
