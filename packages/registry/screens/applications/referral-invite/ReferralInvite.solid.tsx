import type { JSX } from 'solid-js'
import { Button, Input } from '@moderno/solid'

export interface ReferralInviteValues {
  name: string
}

export interface ReferralInviteProps {
  /** Controlled value of the "your name" field, used to personalize the
   * generated referral link/message. */
  values: ReferralInviteValues
  onChange: (values: ReferralInviteValues) => void
  /** Fired on submit — the consumer generates the shareable referral link
   * from `values` and advances to the share step. */
  onNext: (values: ReferralInviteValues) => void
  title?: string
  description?: string
  namePlaceholder?: string
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
const fieldStyle: JSX.CSSProperties = { 'text-align': 'left', 'margin-bottom': '20px' }
const ctaStyle: JSX.CSSProperties = { width: '100%' }

/**
 * Moderno screen — ReferralInvite (Solid). Copy-paste; edit freely.
 * First step of the Referral flow (ADR-0005, cross-domain Applications +
 * Marketing): a presentational "start your referral" form — just a name
 * field to personalize the link and a CTA to generate it. No block fits a
 * one-off kickoff form like this, so it composes only the Input/Button
 * primitives + Moderno tokens, the same allowance the Onboarding flow's
 * `welcome` screen and the Checkout flow's `confirmation` screen used. The
 * actual link/invite UI lives on the next `share` step, which composes the
 * Share/Invite block instead of duplicating it here.
 */
export function ReferralInvite(props: ReferralInviteProps) {
  function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    props.onNext(props.values)
  }

  return (
    <div style={wrapperStyle}>
      <div style={cardStyle}>
        <div style={badgeStyle}>🎁</div>
        <h1 style={titleStyle}>{props.title ?? 'Invita a tus amigos'}</h1>
        <p style={descriptionStyle}>
          {props.description ?? 'Comparte Moderno y gana recompensas por cada persona que se una.'}
        </p>
        <form onSubmit={handleSubmit}>
          <div style={fieldStyle}>
            <Input
              label="Tu nombre"
              name="name"
              placeholder={props.namePlaceholder ?? 'Tu nombre'}
              value={props.values.name}
              onInput={(event) => props.onChange({ ...props.values, name: event.currentTarget.value })}
            />
          </div>
          <Button type="submit" variant="primary" style={ctaStyle}>
            {props.ctaLabel ?? 'Generar mi enlace'}
          </Button>
        </form>
      </div>
    </div>
  )
}
