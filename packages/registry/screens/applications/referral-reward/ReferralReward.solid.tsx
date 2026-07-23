import { For, Show, type JSX } from 'solid-js'
import { Badge, Button } from '@moderno/solid'

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
const rewardAmountStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': '32px',
  color: 'var(--md-text-primary)',
  margin: '0 0 24px',
}
const listStyle: JSX.CSSProperties = {
  'text-align': 'left',
  border: '1px solid var(--md-border-default)',
  'margin-bottom': '24px',
}
const rowStyle: JSX.CSSProperties = {
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'space-between',
  gap: '12px',
  padding: '10px 16px',
  'border-bottom': '1px solid var(--md-border-default)',
}
const rowLastStyle: JSX.CSSProperties = { ...rowStyle, 'border-bottom': 'none' }
const emailStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-primary)',
  overflow: 'hidden',
  'text-overflow': 'ellipsis',
  'white-space': 'nowrap',
}
const ctaStyle: JSX.CSSProperties = { width: '100%' }
const backLinkStyle: JSX.CSSProperties = {
  background: 'none',
  border: 'none',
  padding: 0,
  'margin-top': '16px',
  font: 'inherit',
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  'text-decoration': 'underline',
  cursor: 'pointer',
}

/**
 * Moderno screen — ReferralReward (Solid). Copy-paste; edit freely.
 * Final step of the Referral flow (ADR-0005, cross-domain Applications +
 * Marketing): a presentational reward/claim summary — the accrued reward
 * amount, the list of referred invites carried from the share step (with
 * their status), and a claim CTA. No block fits this one-off summary card,
 * so it composes only the Badge/Button primitives + Moderno tokens, the same
 * allowance the Onboarding flow's `welcome` screen used.
 */
export function ReferralReward(props: ReferralRewardProps) {
  return (
    <div style={wrapperStyle}>
      <div style={cardStyle}>
        <div style={badgeStyle}>🎉</div>
        <h1 style={titleStyle}>{props.title ?? '¡Ganaste una recompensa!'}</h1>
        <p style={descriptionStyle}>
          {props.description ?? 'Gracias por compartir Moderno — esto es lo que acumulaste hasta ahora.'}
        </p>
        <p style={rewardAmountStyle}>{props.rewardAmount ?? '$50'}</p>

        <Show when={props.invites && props.invites.length > 0}>
          <div style={listStyle}>
            <For each={props.invites}>
              {(invite, index) => (
                <div style={index() === (props.invites?.length ?? 0) - 1 ? rowLastStyle : rowStyle}>
                  <span style={emailStyle}>{invite.email}</span>
                  <Show when={invite.status}>
                    <Badge variant={invite.statusVariant} dot>
                      {invite.status}
                    </Badge>
                  </Show>
                </div>
              )}
            </For>
          </div>
        </Show>

        <Button variant="primary" style={ctaStyle} onClick={() => props.onClaim()}>
          {props.claimLabel ?? 'Reclamar recompensa'}
        </Button>
        <Show when={props.onBack}>
          <button type="button" style={backLinkStyle} onClick={() => props.onBack?.()}>
            {props.backLabel ?? 'Volver'}
          </button>
        </Show>
      </div>
    </div>
  )
}
