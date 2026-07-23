import type { JSX } from 'solid-js'
import { Button } from '@moderno/solid'

export interface WelcomeProps {
  onNext: () => void
  /** Shown in the description when set (e.g. "Configuremos Acme Inc."). */
  workspaceName?: string
  title?: string
  description?: string
  ctaLabel?: string
}

const wrapperStyle: JSX.CSSProperties = {
  'min-height': '100%',
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'center',
  padding: '24px',
  background: 'var(--md-surface-base)',
}
const cardStyle: JSX.CSSProperties = {
  width: '100%',
  'max-width': '420px',
  border: '1px solid var(--md-border-default)',
  padding: '32px',
  'text-align': 'center',
}
const badgeStyle: JSX.CSSProperties = {
  width: '56px',
  height: '56px',
  'border-radius': '50%',
  background: 'var(--md-surface-muted)',
  color: 'var(--md-text-primary)',
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'center',
  margin: '0 auto 20px',
  'font-size': '24px',
}
const titleStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': 'var(--md-text-headline-lg)',
  color: 'var(--md-text-primary)',
  margin: '0 0 8px',
}
const descriptionStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  'line-height': 'var(--md-text-body-sm-lh)',
  color: 'var(--md-text-secondary)',
  margin: '0 0 24px',
}
const ctaStyle: JSX.CSSProperties = { width: '100%' }

/**
 * Moderno screen — Welcome (Solid). Copy-paste; edit freely.
 * First step of the Onboarding flow (ADR-0005): a simple presentational
 * greeting with a single CTA. No Applications block fits a one-off welcome
 * message, so this screen composes only the Button primitive + Moderno
 * tokens — the same allowance the Checkout flow's `confirmation` screen used.
 */
export function Welcome(props: WelcomeProps) {
  return (
    <div style={wrapperStyle}>
      <div style={cardStyle}>
        <div style={badgeStyle}>👋</div>
        <h1 style={titleStyle}>{props.title ?? '¡Bienvenido a Moderno!'}</h1>
        <p style={descriptionStyle}>
          {props.description ?? 'Configuremos tu workspace en un par de minutos: tu perfil, un plan y tu equipo.'}
          {props.workspaceName ? ` Estás creando el workspace "${props.workspaceName}".` : ''}
        </p>
        <Button variant="primary" style={ctaStyle} onClick={() => props.onNext()}>
          {props.ctaLabel ?? 'Comenzar'}
        </Button>
      </div>
    </div>
  )
}
