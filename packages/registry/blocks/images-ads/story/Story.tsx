import { Button } from '@moderno/react'

export interface StoryProps {
  kicker?: string
  title?: string
  ctaLabel?: string
  onCta?: () => void
}

/**
 * Moderno block — Story (React). Copy-paste; edit freely.
 * Vertical 9:16 ad / social template. Uses the Button primitive + Moderno tokens.
 */
export function Story({
  kicker = 'Nueva colección',
  title = 'Diseño que se siente moderno.',
  ctaLabel = 'Comprar ahora',
  onCta,
}: StoryProps) {
  return (
    <section
      style={{
        aspectRatio: '9 / 16',
        maxWidth: '360px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '48px 32px',
        background: 'var(--md-surface-base)',
        border: '1px solid var(--md-border-default)',
      }}
    >
      <p
        style={{
          fontSize: 'var(--md-text-label-md)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--md-text-secondary)',
          margin: 0,
        }}
      >
        {kicker}
      </p>
      <h1
        style={{
          fontFamily: 'var(--md-font-serif)',
          fontSize: '44px',
          lineHeight: 1.02,
          letterSpacing: '-0.02em',
          color: 'var(--md-text-primary)',
          margin: 0,
        }}
      >
        {title}
      </h1>
      <Button label={ctaLabel} size="lg" onClick={onCta} style={{ width: '100%' }} />
    </section>
  )
}
