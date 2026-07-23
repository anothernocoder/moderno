import type { CSSProperties } from 'react'
import { Button } from '@moderno/react'

export interface WelcomeProps {
  onNext: () => void
  /** Shown in the description when set (e.g. "Configuremos Acme Inc."). */
  workspaceName?: string
  title?: string
  description?: string
  ctaLabel?: string
}

const wrapperStyle: CSSProperties = {
  minHeight: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px',
  background: 'var(--md-surface-base)',
}
const cardStyle: CSSProperties = {
  width: '100%',
  maxWidth: '420px',
  border: '1px solid var(--md-border-default)',
  padding: '32px',
  textAlign: 'center',
}
const badgeStyle: CSSProperties = {
  width: '56px',
  height: '56px',
  borderRadius: '50%',
  background: 'var(--md-surface-muted)',
  color: 'var(--md-text-primary)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 20px',
  fontSize: '24px',
}
const titleStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: 'var(--md-text-headline-lg)',
  color: 'var(--md-text-primary)',
  margin: '0 0 8px',
}
const descriptionStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  lineHeight: 'var(--md-text-body-sm-lh)',
  color: 'var(--md-text-secondary)',
  margin: '0 0 24px',
}
const ctaStyle: CSSProperties = { width: '100%' }

/**
 * Moderno screen — Welcome (React). Copy-paste; edit freely.
 * First step of the Onboarding flow (ADR-0005): a simple presentational
 * greeting with a single CTA. No Applications block fits a one-off welcome
 * message, so this screen composes only the Button primitive + Moderno
 * tokens — the same allowance the Checkout flow's `confirmation` screen used.
 */
export function Welcome({
  onNext,
  workspaceName,
  title = '¡Bienvenido a Moderno!',
  description = 'Configuremos tu workspace en un par de minutos: tu perfil, un plan y tu equipo.',
  ctaLabel = 'Comenzar',
}: WelcomeProps) {
  return (
    <div style={wrapperStyle}>
      <div style={cardStyle}>
        <div style={badgeStyle}>👋</div>
        <h1 style={titleStyle}>{title}</h1>
        <p style={descriptionStyle}>
          {description}
          {workspaceName ? ` Estás creando el workspace "${workspaceName}".` : ''}
        </p>
        <Button variant="primary" style={ctaStyle} onClick={onNext}>
          {ctaLabel}
        </Button>
      </div>
    </div>
  )
}
