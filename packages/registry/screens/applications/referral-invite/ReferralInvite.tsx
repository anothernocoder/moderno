import type { CSSProperties, FormEvent } from 'react'
import { Button, Input } from '@moderno/react'

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
const fieldStyle: CSSProperties = { textAlign: 'left', marginBottom: '20px' }
const ctaStyle: CSSProperties = { width: '100%' }

/**
 * Moderno screen — ReferralInvite (React). Copy-paste; edit freely.
 * First step of the Referral flow (ADR-0005, cross-domain Applications +
 * Marketing): a presentational "start your referral" form — just a name
 * field to personalize the link and a CTA to generate it. No block fits a
 * one-off kickoff form like this, so it composes only the Input/Button
 * primitives + Moderno tokens, the same allowance the Onboarding flow's
 * `welcome` screen and the Checkout flow's `confirmation` screen used. The
 * actual link/invite UI lives on the next `share` step, which composes the
 * Share/Invite block instead of duplicating it here.
 */
export function ReferralInvite({
  values,
  onChange,
  onNext,
  title = 'Invita a tus amigos',
  description = 'Comparte Moderno y gana recompensas por cada persona que se una.',
  namePlaceholder = 'Tu nombre',
  ctaLabel = 'Generar mi enlace',
}: ReferralInviteProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onNext(values)
  }

  return (
    <div style={wrapperStyle}>
      <div style={cardStyle}>
        <div style={badgeStyle}>🎁</div>
        <h1 style={titleStyle}>{title}</h1>
        <p style={descriptionStyle}>{description}</p>
        <form onSubmit={handleSubmit}>
          <div style={fieldStyle}>
            <Input
              label="Tu nombre"
              name="name"
              placeholder={namePlaceholder}
              value={values.name}
              onChange={(event) => onChange({ ...values, name: event.currentTarget.value })}
            />
          </div>
          <Button type="submit" variant="primary" style={ctaStyle}>
            {ctaLabel}
          </Button>
        </form>
      </div>
    </div>
  )
}
