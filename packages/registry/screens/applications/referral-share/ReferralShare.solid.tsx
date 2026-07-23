import { Show, type JSX } from 'solid-js'
import { Button } from '@moderno/solid'
import { ShareInvite, type ShareChannel, type ShareInviteItem } from '../../../blocks/marketing/share-invite/ShareInvite.solid'

export type { ShareChannel, ShareInviteItem }

export interface ReferralShareProps {
  /** The referral link generated from the previous step. */
  shareUrl: string
  onCopyLink?: (url: string) => void
  channels?: ShareChannel[]
  onShare?: (channel: ShareChannel) => void
  /** Controlled value of the composed block's email-invite field. */
  inviteEmail: string
  onInviteEmailChange: (value: string) => void
  onInvite: (email: string) => void
  /** Pending/accepted invites rendered by the composed Share/Invite block. */
  invites?: ShareInviteItem[]
  onNext: () => void
  onBack?: () => void
  title?: string
  description?: string
  nextLabel?: string
  backLabel?: string
}

const wrapperStyle: JSX.CSSProperties = {
  'min-height': '100%',
  background: 'var(--md-surface-base)',
  padding: '24px',
}
const headerStyle: JSX.CSSProperties = {
  'max-width': '640px',
  margin: '0 auto 16px',
  display: 'flex',
  'flex-wrap': 'wrap',
  'align-items': 'center',
  'justify-content': 'space-between',
  gap: '8px 12px',
}
const titleStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': 'var(--md-text-headline-lg)',
  color: 'var(--md-text-primary)',
  margin: '0 0 4px',
}
const descriptionStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}
const linkButtonStyle: JSX.CSSProperties = {
  background: 'none',
  border: 'none',
  padding: 0,
  font: 'inherit',
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-primary)',
  'text-decoration': 'underline',
  cursor: 'pointer',
}
const bodyStyle: JSX.CSSProperties = { 'max-width': '640px', margin: '0 auto' }
const footerStyle: JSX.CSSProperties = {
  'max-width': '640px',
  margin: '24px auto 0',
  display: 'flex',
  'justify-content': 'flex-end',
}

/**
 * Moderno screen — ReferralShare (Solid). Copy-paste; edit freely.
 * Second step of the Referral flow (ADR-0005, cross-domain Applications +
 * Marketing): composes the Marketing Share/Invite block for the link,
 * channel-share buttons and email-invite form + pending-invites list,
 * instead of re-implementing any of that markup. This screen owns no state
 * of its own — `shareUrl`, `inviteEmail` and `invites` are all controlled,
 * carried by the example assembly (or your own code) from the previous
 * `referral-invite` step.
 */
export function ReferralShare(props: ReferralShareProps) {
  return (
    <div style={wrapperStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>{props.title ?? 'Comparte tu enlace'}</h1>
          <p style={descriptionStyle}>
            {props.description ?? 'Copia tu enlace, compártelo en tus redes o invita por correo.'}
          </p>
        </div>
        <Show when={props.onBack}>
          <button type="button" style={linkButtonStyle} onClick={() => props.onBack?.()}>
            {props.backLabel ?? 'Volver'}
          </button>
        </Show>
      </div>

      <div style={bodyStyle}>
        <ShareInvite
          shareUrl={props.shareUrl}
          onCopyLink={props.onCopyLink}
          channels={props.channels}
          onShare={props.onShare}
          inviteEmail={props.inviteEmail}
          onInviteEmailChange={props.onInviteEmailChange}
          onInvite={props.onInvite}
          invites={props.invites}
        />
      </div>

      <div style={footerStyle}>
        <Button variant="primary" onClick={() => props.onNext()}>
          {props.nextLabel ?? 'Continuar'}
        </Button>
      </div>
    </div>
  )
}
