import type { CSSProperties, FormEvent } from 'react'
import { Badge, Button, Input } from '@moderno/react'

export type ShareInviteStatusVariant = 'neutral' | 'solid' | 'success' | 'warning' | 'error' | 'info'

export interface ShareChannel {
  id: string
  label: string
}

export interface ShareInviteItem {
  id: string
  email: string
  status?: string
  statusVariant?: ShareInviteStatusVariant
}

export interface ShareInviteProps {
  title?: string
  description?: string
  /** The shareable link, rendered read-only in the copy field. */
  shareUrl?: string
  linkLabel?: string
  copyLabel?: string
  /** Fired when the copy button is clicked — the consumer performs the
   * actual clipboard write, this block has no internal async logic. */
  onCopyLink?: (url: string) => void
  /** Social/channel share buttons rendered next to the link. */
  channels?: ShareChannel[]
  onShare?: (channel: ShareChannel) => void
  /** Controlled value of the email-invite field. */
  inviteEmail?: string
  onInviteEmailChange?: (value: string) => void
  inviteEmailPlaceholder?: string
  inviteLabel?: string
  /** Fired when the invite form is submitted. */
  onInvite?: (email: string) => void
  /** Pending/accepted invites rendered below the invite form. */
  invites?: ShareInviteItem[]
  invitesLabel?: string
}

const DEFAULT_CHANNELS: ShareChannel[] = [
  { id: 'email', label: 'Correo' },
  { id: 'twitter', label: 'X / Twitter' },
  { id: 'whatsapp', label: 'WhatsApp' },
]

const sectionStyle: CSSProperties = {
  padding: '32px 24px',
  background: 'var(--md-surface-raised)',
  border: '1px solid var(--md-border-default)',
}
const headerStyle: CSSProperties = { marginBottom: '24px' }
const titleStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: 'var(--md-text-headline-sm)',
  color: 'var(--md-text-primary)',
  margin: '0 0 4px',
}
const descriptionStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}
const groupStyle: CSSProperties = { marginBottom: '24px' }
const groupLabelStyle: CSSProperties = {
  fontSize: 'var(--md-text-label-md)',
  color: 'var(--md-text-secondary)',
  margin: '0 0 8px',
}
const linkRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'flex-end',
  gap: '12px',
}
const linkFieldStyle: CSSProperties = { flex: 1, minWidth: 0 }
const channelsRowStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
}
const inviteRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'flex-end',
  gap: '12px',
}
const inviteFieldStyle: CSSProperties = { flex: 1, minWidth: 0 }
const invitesListStyle: CSSProperties = {
  background: 'var(--md-surface-base)',
  border: '1px solid var(--md-border-default)',
}
const inviteRowItemStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
  padding: '10px 16px',
  borderBottom: '1px solid var(--md-border-default)',
}
const inviteEmailStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-primary)',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}

/**
 * Moderno block — ShareInvite (React). Copy-paste; edit freely.
 * Data-display block (design system §2.3 "Share and Invite"): a shareable
 * link with a copy action, a row of channel share buttons, and an
 * email-invite form with a list of pending invites. Purely presentational —
 * no clipboard access or async logic lives here, just callbacks
 * (`onCopyLink`, `onShare`, `onInvite`) the consumer wires up. Uses the
 * Input/Button/Badge primitives + Moderno tokens (--md-* custom properties).
 */
export function ShareInvite({
  title = 'Comparte e invita',
  description = 'Comparte tu enlace o invita a colaboradores por correo.',
  shareUrl = 'https://moderno.app/invite/abc123',
  linkLabel = 'Tu enlace para compartir',
  copyLabel = 'Copiar',
  onCopyLink,
  channels = DEFAULT_CHANNELS,
  onShare,
  inviteEmail = '',
  onInviteEmailChange,
  inviteEmailPlaceholder = 'nombre@empresa.com',
  inviteLabel = 'Invitar',
  onInvite,
  invites,
  invitesLabel = 'Invitaciones pendientes',
}: ShareInviteProps) {
  function handleInviteSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!inviteEmail) return
    onInvite?.(inviteEmail)
  }

  return (
    <section style={sectionStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>{title}</h2>
        {description ? <p style={descriptionStyle}>{description}</p> : null}
      </div>

      <div style={groupStyle}>
        <p style={groupLabelStyle}>{linkLabel}</p>
        <div style={linkRowStyle}>
          <div style={linkFieldStyle}>
            <Input readOnly value={shareUrl} aria-label={linkLabel} />
          </div>
          <Button variant="secondary" onClick={() => onCopyLink?.(shareUrl)}>
            {copyLabel}
          </Button>
        </div>
      </div>

      {channels.length > 0 ? (
        <div style={groupStyle}>
          <div style={channelsRowStyle}>
            {channels.map((channel) => (
              <Button key={channel.id} variant="secondary" size="sm" onClick={() => onShare?.(channel)}>
                {channel.label}
              </Button>
            ))}
          </div>
        </div>
      ) : null}

      <form style={inviteRowStyle} onSubmit={handleInviteSubmit}>
        <div style={inviteFieldStyle}>
          <Input
            label="Correo electrónico"
            name="email"
            type="email"
            placeholder={inviteEmailPlaceholder}
            value={inviteEmail}
            onChange={(event) => onInviteEmailChange?.(event.currentTarget.value)}
          />
        </div>
        <Button type="submit" variant="primary">
          {inviteLabel}
        </Button>
      </form>

      {invites && invites.length > 0 ? (
        <div style={{ marginTop: '24px' }}>
          <p style={groupLabelStyle}>{invitesLabel}</p>
          <div style={invitesListStyle}>
            {invites.map((invite, index) => (
              <div
                key={invite.id}
                style={index === invites.length - 1 ? { ...inviteRowItemStyle, borderBottom: 'none' } : inviteRowItemStyle}
              >
                <span style={inviteEmailStyle}>{invite.email}</span>
                {invite.status ? (
                  <Badge variant={invite.statusVariant} dot>
                    {invite.status}
                  </Badge>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  )
}
