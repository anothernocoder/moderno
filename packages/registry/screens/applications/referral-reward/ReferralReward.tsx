import type { CSSProperties } from 'react'
import { Badge, Button } from '@moderno/react'

export type ReferralRewardStatusVariant = 'neutral' | 'solid' | 'success' | 'warning' | 'error' | 'info'

export interface ReferralRewardItem {
  id: string
  email: string
  status?: string
  statusVariant?: ReferralRewardStatusVariant
}

export interface ReferralRewardProps {
  /** Invites carried from the share step, shown with their reward status. */
  invites?: ReferralRewardItem[]
  rewardAmount?: string
  onClaim: () => void
  onBack?: () => void
  title?: string
  description?: string
  claimLabel?: string
  backLabel?: string
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
const rewardAmountStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: '32px',
  color: 'var(--md-text-primary)',
  margin: '0 0 24px',
}
const listStyle: CSSProperties = {
  textAlign: 'left',
  border: '1px solid var(--md-border-default)',
  marginBottom: '24px',
}
const rowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
  padding: '10px 16px',
  borderBottom: '1px solid var(--md-border-default)',
}
const emailStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-primary)',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}
const ctaStyle: CSSProperties = { width: '100%' }
const backLinkStyle: CSSProperties = {
  background: 'none',
  border: 'none',
  padding: 0,
  marginTop: '16px',
  font: 'inherit',
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  textDecoration: 'underline',
  cursor: 'pointer',
}

/**
 * Moderno screen — ReferralReward (React). Copy-paste; edit freely.
 * Final step of the Referral flow (ADR-0005, cross-domain Applications +
 * Marketing): a presentational reward/claim summary — the accrued reward
 * amount, the list of referred invites carried from the share step (with
 * their status), and a claim CTA. No block fits this one-off summary card,
 * so it composes only the Badge/Button primitives + Moderno tokens, the same
 * allowance the Onboarding flow's `welcome` screen used.
 */
export function ReferralReward({
  invites,
  rewardAmount = '$50',
  onClaim,
  onBack,
  title = '¡Ganaste una recompensa!',
  description = 'Gracias por compartir Moderno — esto es lo que acumulaste hasta ahora.',
  claimLabel = 'Reclamar recompensa',
  backLabel = 'Volver',
}: ReferralRewardProps) {
  return (
    <div style={wrapperStyle}>
      <div style={cardStyle}>
        <div style={badgeStyle}>🎉</div>
        <h1 style={titleStyle}>{title}</h1>
        <p style={descriptionStyle}>{description}</p>
        <p style={rewardAmountStyle}>{rewardAmount}</p>

        {invites && invites.length > 0 ? (
          <div style={listStyle}>
            {invites.map((invite, index) => (
              <div key={invite.id} style={index === invites.length - 1 ? { ...rowStyle, borderBottom: 'none' } : rowStyle}>
                <span style={emailStyle}>{invite.email}</span>
                {invite.status ? (
                  <Badge variant={invite.statusVariant} dot>
                    {invite.status}
                  </Badge>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}

        <Button variant="primary" style={ctaStyle} onClick={onClaim}>
          {claimLabel}
        </Button>
        {onBack ? (
          <button type="button" style={backLinkStyle} onClick={onBack}>
            {backLabel}
          </button>
        ) : null}
      </div>
    </div>
  )
}
