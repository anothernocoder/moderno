import { Button } from '@moderno/solid'
import type { JSX } from 'solid-js'

export interface StoryProps {
  kicker?: string
  title?: string
  ctaLabel?: string
  onCta?: () => void
}

/**
 * Moderno block — Story (Solid). Copy-paste; edit freely.
 * Vertical 9:16 ad / social template. Uses the Button primitive + Moderno tokens.
 */
export function Story(props: StoryProps) {
  const sectionStyle: JSX.CSSProperties = {
    'aspect-ratio': '9 / 16',
    'max-width': '360px',
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'space-between',
    padding: '48px 32px',
    background: 'var(--md-surface-base)',
    border: '1px solid var(--md-border-default)',
  }
  return (
    <section style={sectionStyle}>
      <p
        style={{
          'font-size': 'var(--md-text-label-md)',
          'letter-spacing': '0.14em',
          'text-transform': 'uppercase',
          color: 'var(--md-text-secondary)',
          margin: 0,
        }}
      >
        {props.kicker ?? 'Nueva colección'}
      </p>
      <h1
        style={{
          'font-family': 'var(--md-font-serif)',
          'font-size': '44px',
          'line-height': 1.02,
          'letter-spacing': '-0.02em',
          color: 'var(--md-text-primary)',
          margin: 0,
        }}
      >
        {props.title ?? 'Diseño que se siente moderno.'}
      </h1>
      <Button
        label={props.ctaLabel ?? 'Comprar ahora'}
        size="lg"
        onClick={() => props.onCta?.()}
        style={{ width: '100%' }}
      />
    </section>
  )
}
