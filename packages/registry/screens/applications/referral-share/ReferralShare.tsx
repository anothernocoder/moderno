import type { CSSProperties } from 'react'
import { Button } from '@moderno/react'
import { ShareInvite, type ShareChannel, type ShareInviteItem } from '../../../blocks/marketing/share-invite/ShareInvite'

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

const wrapperStyle: CSSProperties = {
  minHeight: '100%',
  background: 'var(--md-surface-base)',
  padding: '24px',
}
const headerStyle: CSSProperties = {
  maxWidth: '640px',
  margin: '0 auto 16px',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px 12px',
}
const titleStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: 'var(--md-text-headline-lg)',
  color: 'var(--md-text-primary)',
  margin: '0 0 4px',
}
const descriptionStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}
const linkButtonStyle: CSSProperties = {
  background: 'none',
  border: 'none',
  padding: 0,
  font: 'inherit',
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-primary)',
  textDecoration: 'underline',
  cursor: 'pointer',
}
const bodyStyle: CSSProperties = { maxWidth: '640px', margin: '0 auto' }
const footerStyle: CSSProperties = {
  maxWidth: '640px',
  margin: '24px auto 0',
  display: 'flex',
  justifyContent: 'flex-end',
}

/**
 * Moderno screen — ReferralShare (React). Copy-paste; edit freely.
 * Second step of the Referral flow (ADR-0005, cross-domain Applications +
 * Marketing): composes the Marketing Share/Invite block for the link,
 * channel-share buttons and email-invite form + pending-invites list,
 * instead of re-implementing any of that markup. This screen owns no state
 * of its own — `shareUrl`, `inviteEmail` and `invites` are all controlled,
 * carried by the example assembly (or your own code) from the previous
 * `referral-invite` step.
 */
export function ReferralShare({
  shareUrl,
  onCopyLink,
  channels,
  onShare,
  inviteEmail,
  onInviteEmailChange,
  onInvite,
  invites,
  onNext,
  onBack,
  title = 'Comparte tu enlace',
  description = 'Copia tu enlace, compártelo en tus redes o invita por correo.',
  nextLabel = 'Continuar',
  backLabel = 'Volver',
}: ReferralShareProps) {
  return (
    <div style={wrapperStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>{title}</h1>
          <p style={descriptionStyle}>{description}</p>
        </div>
        {onBack ? (
          <button type="button" style={linkButtonStyle} onClick={onBack}>
            {backLabel}
          </button>
        ) : null}
      </div>

      <div style={bodyStyle}>
        <ShareInvite
          shareUrl={shareUrl}
          onCopyLink={onCopyLink}
          channels={channels}
          onShare={onShare}
          inviteEmail={inviteEmail}
          onInviteEmailChange={onInviteEmailChange}
          onInvite={onInvite}
          invites={invites}
        />
      </div>

      <div style={footerStyle}>
        <Button variant="primary" onClick={onNext}>
          {nextLabel}
        </Button>
      </div>
    </div>
  )
}
