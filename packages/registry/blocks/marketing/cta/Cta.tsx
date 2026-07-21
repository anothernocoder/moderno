import type { CSSProperties } from 'react'
import { Button } from '@moderno/react'

export interface CtaProps {
  title?: string
  description?: string
  ctaLabel?: string
  onCta?: () => void
  secondaryLabel?: string
  onSecondary?: () => void
}

const sectionStyle: CSSProperties = {
  padding: '96px 24px',
  textAlign: 'center',
  background: 'var(--md-surface-raised)',
  borderRadius: 'var(--md-radius-none)',
}
const titleStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: '40px',
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
  color: 'var(--md-text-primary)',
  margin: '0 auto 16px',
  maxWidth: '18ch',
}
const descriptionStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-lg)',
  lineHeight: 'var(--md-text-body-lg-lh)',
  color: 'var(--md-text-secondary)',
  margin: '0 auto 32px',
  maxWidth: '52ch',
}
const actionsStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '12px',
  flexWrap: 'wrap',
}

/**
 * Moderno block — Cta (React). Copy-paste; edit freely.
 * A focused headline + CTA button section — no kicker, no subtitle-as-secondary-emphasis.
 * Uses the Button primitive + Moderno tokens (--md-* custom properties).
 */
export function Cta({
  title = '¿Listo para construir con Moderno?',
  description = 'Copia el block, instala el primitive y personaliza los tokens a tu gusto.',
  ctaLabel = 'Empezar ahora',
  onCta,
  secondaryLabel,
  onSecondary,
}: CtaProps) {
  return (
    <section style={sectionStyle}>
      <h2 style={titleStyle}>{title}</h2>
      {description ? <p style={descriptionStyle}>{description}</p> : null}
      <div style={actionsStyle}>
        <Button variant="primary" size="lg" label={ctaLabel} onClick={onCta} />
        {secondaryLabel ? (
          <Button variant="secondary" size="lg" label={secondaryLabel} onClick={onSecondary} />
        ) : null}
      </div>
    </section>
  )
}
