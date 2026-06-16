import { Button } from '@moderno/solid'
import type { JSX } from 'solid-js'

export interface HeroProps {
  kicker?: string
  title?: string
  subtitle?: string
  ctaLabel?: string
  onCta?: () => void
}

/**
 * Moderno block — Hero (Solid). Copy-paste; edit freely.
 * Uses the Button primitive + Moderno tokens (--md-* custom properties).
 */
export function Hero(props: HeroProps) {
  const sectionStyle: JSX.CSSProperties = {
    padding: '96px 24px',
    'text-align': 'center',
    background: 'var(--md-surface-base)',
    'border-bottom': '1px solid var(--md-border-default)',
  }
  return (
    <section style={sectionStyle}>
      <p
        style={{
          'font-size': 'var(--md-text-label-sm)',
          'letter-spacing': '0.14em',
          'text-transform': 'uppercase',
          color: 'var(--md-text-secondary)',
          margin: '0 0 16px',
        }}
      >
        {props.kicker ?? 'Moderno'}
      </p>
      <h1
        style={{
          'font-family': 'var(--md-font-serif)',
          'font-size': '48px',
          'line-height': 1.05,
          'letter-spacing': '-0.02em',
          color: 'var(--md-text-primary)',
          margin: '0 auto 16px',
          'max-width': '16ch',
        }}
      >
        {props.title ?? 'Construye productos, no componentes.'}
      </h1>
      <p
        style={{
          'font-size': 'var(--md-text-body-lg)',
          'line-height': 'var(--md-text-body-lg-lh)',
          color: 'var(--md-text-secondary)',
          margin: '0 auto 32px',
          'max-width': '52ch',
        }}
      >
        {props.subtitle ??
          'Un sistema de diseño agnóstico al framework: un comportamiento y un look, usables desde React, Vue, Svelte y Solid.'}
      </p>
      <Button label={props.ctaLabel ?? 'Empezar ahora'} size="lg" onClick={() => props.onCta?.()} />
    </section>
  )
}
