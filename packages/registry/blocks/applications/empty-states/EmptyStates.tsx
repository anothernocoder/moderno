import type { CSSProperties } from 'react'
import { Button } from '@moderno/react'

export interface EmptyStatesProps {
  icon?: string
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  secondaryLabel?: string
  secondaryHref?: string
}

const sectionStyle: CSSProperties = {
  padding: '80px 24px',
  textAlign: 'center',
  background: 'var(--md-surface-base)',
}
const iconWrapStyle: CSSProperties = {
  width: '64px',
  height: '64px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  fontSize: '28px',
  background: 'var(--md-surface-muted)',
  border: '1px solid var(--md-border-default)',
}
const titleStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: '22px',
  lineHeight: 1.3,
  letterSpacing: '-0.01em',
  color: 'var(--md-text-primary)',
  margin: '24px 0 8px',
}
const descriptionStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-md)',
  lineHeight: 'var(--md-text-body-md-lh)',
  color: 'var(--md-text-secondary)',
  margin: '0 auto 28px',
  maxWidth: '40ch',
}
const actionsStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
  flexWrap: 'wrap',
}
const secondaryLinkStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  textDecoration: 'underline',
}

/**
 * Moderno block — EmptyStates (React). Copy-paste; edit freely.
 * Zero-data / first-use empty state: an icon placeholder, a heading, a short
 * description, and a primary "create your first X" CTA. No illustration asset —
 * a bordered icon box, like Features' item icons, consistent with how Moderno's
 * blocks avoid binary image assets. Uses the Button primitive + Moderno tokens.
 */
export function EmptyStates({
  icon = '📭',
  title = 'Aún no tienes elementos',
  description = 'Cuando crees tu primer elemento, aparecerá aquí.',
  actionLabel = 'Crear el primero',
  onAction,
  secondaryLabel,
  secondaryHref,
}: EmptyStatesProps) {
  return (
    <section style={sectionStyle}>
      <div style={iconWrapStyle} aria-hidden="true">
        {icon}
      </div>
      <h3 style={titleStyle}>{title}</h3>
      <p style={descriptionStyle}>{description}</p>
      <div style={actionsStyle}>
        <Button onClick={onAction}>{actionLabel}</Button>
        {secondaryLabel && secondaryHref ? (
          <a href={secondaryHref} style={secondaryLinkStyle}>
            {secondaryLabel}
          </a>
        ) : null}
      </div>
    </section>
  )
}
