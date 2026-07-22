import type { JSX } from 'solid-js'
import { Button } from '@moderno/solid'

export interface EmptyStatesProps {
  icon?: string
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  secondaryLabel?: string
  secondaryHref?: string
}

const sectionStyle: JSX.CSSProperties = {
  padding: '80px 24px',
  'text-align': 'center',
  background: 'var(--md-surface-base)',
}
const iconWrapStyle: JSX.CSSProperties = {
  width: '64px',
  height: '64px',
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'center',
  margin: '0 auto',
  'font-size': '28px',
  background: 'var(--md-surface-muted)',
  border: '1px solid var(--md-border-default)',
}
const titleStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': '22px',
  'line-height': 1.3,
  'letter-spacing': '-0.01em',
  color: 'var(--md-text-primary)',
  margin: '24px 0 8px',
}
const descriptionStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-md)',
  'line-height': 'var(--md-text-body-md-lh)',
  color: 'var(--md-text-secondary)',
  margin: '0 auto 28px',
  'max-width': '40ch',
}
const actionsStyle: JSX.CSSProperties = {
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'center',
  gap: '16px',
  'flex-wrap': 'wrap',
}
const secondaryLinkStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  'text-decoration': 'underline',
}

/**
 * Moderno block — EmptyStates (Solid). Copy-paste; edit freely.
 * Zero-data / first-use empty state: an icon placeholder, a heading, a short
 * description, and a primary "create your first X" CTA. No illustration asset —
 * a bordered icon box, like Features' item icons, consistent with how Moderno's
 * blocks avoid binary image assets. Uses the Button primitive + Moderno tokens.
 */
export function EmptyStates(props: EmptyStatesProps) {
  const icon = () => props.icon ?? '📭'
  const title = () => props.title ?? 'Aún no tienes elementos'
  const description = () => props.description ?? 'Cuando crees tu primer elemento, aparecerá aquí.'
  const actionLabel = () => props.actionLabel ?? 'Crear el primero'

  return (
    <section style={sectionStyle}>
      <div style={iconWrapStyle} aria-hidden="true">
        {icon()}
      </div>
      <h3 style={titleStyle}>{title()}</h3>
      <p style={descriptionStyle}>{description()}</p>
      <div style={actionsStyle}>
        <Button onClick={() => props.onAction?.()}>{actionLabel()}</Button>
        {props.secondaryLabel && props.secondaryHref ? (
          <a href={props.secondaryHref} style={secondaryLinkStyle}>
            {props.secondaryLabel}
          </a>
        ) : null}
      </div>
    </section>
  )
}
