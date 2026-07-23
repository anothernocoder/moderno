import { For, Show, type JSX } from 'solid-js'
import { Badge, Button, Input } from '@moderno/solid'

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

const sectionStyle: JSX.CSSProperties = {
  padding: '32px 24px',
  background: 'var(--md-surface-raised)',
  border: '1px solid var(--md-border-default)',
}
const headerStyle: JSX.CSSProperties = { 'margin-bottom': '24px' }
const titleStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': 'var(--md-text-headline-sm)',
  color: 'var(--md-text-primary)',
  margin: '0 0 4px',
}
const descriptionStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}
const groupStyle: JSX.CSSProperties = { 'margin-bottom': '24px' }
const groupLabelStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-label-md)',
  color: 'var(--md-text-secondary)',
  margin: '0 0 8px',
}
const linkRowStyle: JSX.CSSProperties = {
  display: 'flex',
  'align-items': 'flex-end',
  gap: '12px',
}
const linkFieldStyle: JSX.CSSProperties = { flex: 1, 'min-width': 0 }
const channelsRowStyle: JSX.CSSProperties = {
  display: 'flex',
  'flex-wrap': 'wrap',
  gap: '8px',
}
const inviteRowStyle: JSX.CSSProperties = {
  display: 'flex',
  'align-items': 'flex-end',
  gap: '12px',
}
const inviteFieldStyle: JSX.CSSProperties = { flex: 1, 'min-width': 0 }
const invitesWrapperStyle: JSX.CSSProperties = { 'margin-top': '24px' }
const invitesListStyle: JSX.CSSProperties = {
  background: 'var(--md-surface-base)',
  border: '1px solid var(--md-border-default)',
}
const inviteRowItemStyle: JSX.CSSProperties = {
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'space-between',
  gap: '12px',
  padding: '10px 16px',
  'border-bottom': '1px solid var(--md-border-default)',
}
const inviteRowItemLastStyle: JSX.CSSProperties = { ...inviteRowItemStyle, 'border-bottom': 'none' }
const inviteEmailStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-primary)',
  overflow: 'hidden',
  'text-overflow': 'ellipsis',
  'white-space': 'nowrap',
}

/**
 * Moderno block — ShareInvite (Solid). Copy-paste; edit freely.
 * Data-display block (design system §2.3 "Share and Invite"): a shareable
 * link with a copy action, a row of channel share buttons, and an
 * email-invite form with a list of pending invites. Purely presentational —
 * no clipboard access or async logic lives here, just callbacks
 * (`onCopyLink`, `onShare`, `onInvite`) the consumer wires up. Uses the
 * Input/Button/Badge primitives + Moderno tokens (--md-* custom properties).
 */
export function ShareInvite(props: ShareInviteProps) {
  const title = () => props.title ?? 'Comparte e invita'
  const description = () => props.description ?? 'Comparte tu enlace o invita a colaboradores por correo.'
  const shareUrl = () => props.shareUrl ?? 'https://moderno.app/invite/abc123'
  const linkLabel = () => props.linkLabel ?? 'Tu enlace para compartir'
  const copyLabel = () => props.copyLabel ?? 'Copiar'
  const channels = () => props.channels ?? DEFAULT_CHANNELS
  const inviteEmail = () => props.inviteEmail ?? ''
  const invitesLabel = () => props.invitesLabel ?? 'Invitaciones pendientes'

  function handleInviteSubmit(event: SubmitEvent) {
    event.preventDefault()
    if (!inviteEmail()) return
    props.onInvite?.(inviteEmail())
  }

  return (
    <section style={sectionStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>{title()}</h2>
        <Show when={description()}>
          <p style={descriptionStyle}>{description()}</p>
        </Show>
      </div>

      <div style={groupStyle}>
        <p style={groupLabelStyle}>{linkLabel()}</p>
        <div style={linkRowStyle}>
          <div style={linkFieldStyle}>
            <Input readonly value={shareUrl()} aria-label={linkLabel()} />
          </div>
          <Button variant="secondary" onClick={() => props.onCopyLink?.(shareUrl())}>
            {copyLabel()}
          </Button>
        </div>
      </div>

      <Show when={channels().length > 0}>
        <div style={groupStyle}>
          <div style={channelsRowStyle}>
            <For each={channels()}>
              {(channel) => (
                <Button variant="secondary" size="sm" onClick={() => props.onShare?.(channel)}>
                  {channel.label}
                </Button>
              )}
            </For>
          </div>
        </div>
      </Show>

      <form style={inviteRowStyle} onSubmit={handleInviteSubmit}>
        <div style={inviteFieldStyle}>
          <Input
            label="Correo electrónico"
            name="email"
            type="email"
            placeholder={props.inviteEmailPlaceholder ?? 'nombre@empresa.com'}
            value={inviteEmail()}
            onInput={(event) => props.onInviteEmailChange?.(event.currentTarget.value)}
          />
        </div>
        <Button type="submit" variant="primary">
          {props.inviteLabel ?? 'Invitar'}
        </Button>
      </form>

      <Show when={props.invites && props.invites.length > 0}>
        <div style={invitesWrapperStyle}>
          <p style={groupLabelStyle}>{props.invitesLabel ?? 'Invitaciones pendientes'}</p>
          <div style={invitesListStyle}>
            <For each={props.invites}>
              {(invite, index) => (
                <div style={index() === (props.invites?.length ?? 0) - 1 ? inviteRowItemLastStyle : inviteRowItemStyle}>
                  <span style={inviteEmailStyle}>{invite.email}</span>
                  <Show when={invite.status}>
                    <Badge variant={invite.statusVariant} dot>
                      {invite.status}
                    </Badge>
                  </Show>
                </div>
              )}
            </For>
          </div>
        </div>
      </Show>
    </section>
  )
}
