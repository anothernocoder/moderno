import { Button } from '@moderno/react'

export interface HeroProps {
  kicker?: string
  title?: string
  subtitle?: string
  ctaLabel?: string
  onCta?: () => void
}

/**
 * Moderno block — Hero. Copy-paste; edit freely.
 * Uses the Button primitive + Moderno tokens (--md-* custom properties).
 */
export function Hero({
  kicker = 'Moderno',
  title = 'Construye productos, no componentes.',
  subtitle = 'Un sistema de diseño agnóstico al framework: un comportamiento y un look, usables desde React, Vue, Svelte y Solid.',
  ctaLabel = 'Empezar ahora',
  onCta,
}: HeroProps) {
  return (
    <section
      style={{
        padding: '96px 24px',
        textAlign: 'center',
        background: 'var(--md-surface-base)',
        borderBottom: '1px solid var(--md-border-default)',
      }}
    >
      <p
        style={{
          fontSize: 'var(--md-text-label-sm)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--md-text-secondary)',
          margin: '0 0 16px',
        }}
      >
        {kicker}
      </p>
      <h1
        style={{
          fontFamily: 'var(--md-font-serif)',
          fontSize: '48px',
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          color: 'var(--md-text-primary)',
          margin: '0 auto 16px',
          maxWidth: '16ch',
        }}
      >
        {title}
      </h1>
      <p
        style={{
          fontSize: 'var(--md-text-body-lg)',
          lineHeight: 'var(--md-text-body-lg-lh)',
          color: 'var(--md-text-secondary)',
          margin: '0 auto 32px',
          maxWidth: '52ch',
        }}
      >
        {subtitle}
      </p>
      <Button label={ctaLabel} size="lg" onClick={onCta} />
    </section>
  )
}
