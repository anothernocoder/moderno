import { Show, type JSX } from 'solid-js'
import { Button, Input } from '@moderno/solid'
import { List, type ListItem } from '../../../blocks/applications/list/List.solid'

export type { ListItem }

export interface InviteTeamValues {
  email: string
}

export interface InviteTeamProps {
  /** Controlled value of the "add teammate" email field. */
  values: InviteTeamValues
  onChange: (values: InviteTeamValues) => void
  /** Fired when the invite form is submitted — the consumer appends the
   * invite to `invites` and clears `values.email`. */
  onInvite: (values: InviteTeamValues) => void
  /** Pending/accepted invites rendered by the composed List block. */
  invites?: ListItem[]
  /** Forwarded from the composed List block's `onItemAction` (its row's "…" button). */
  onRemoveInvite?: (item: ListItem) => void
  onNext: () => void
  onBack?: () => void
  title?: string
  description?: string
  emailPlaceholder?: string
  inviteLabel?: string
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
const inviteRowStyle: JSX.CSSProperties = {
  display: 'flex',
  'align-items': 'flex-end',
  gap: '12px',
  'margin-bottom': '24px',
}
const emailFieldStyle: JSX.CSSProperties = { flex: 1, 'min-width': 0 }
const listHeadingStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-label-md)',
  color: 'var(--md-text-secondary)',
  margin: '0 0 8px',
}
const footerStyle: JSX.CSSProperties = {
  'max-width': '640px',
  margin: '24px auto 0',
  display: 'flex',
  'justify-content': 'flex-end',
}

/**
 * Moderno screen — InviteTeam (Solid). Copy-paste; edit freely.
 * Final step of the Onboarding flow (ADR-0005): composes the Applications
 * List block for the invited-member rows (avatar, status badge, row action)
 * instead of re-implementing that markup. The "add teammate" email field is
 * this screen's own simple form — there's no dedicated "invite by email"
 * block to compose, so it isn't duplicating any block's internals, the same
 * allowance the Checkout ticket used for its confirmation screen. `onInvite`
 * fires on submit; `onRemoveInvite` forwards the composed List's
 * `onItemAction`; `onNext` finishes onboarding.
 */
export function InviteTeam(props: InviteTeamProps) {
  function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    if (!props.values.email) return
    props.onInvite(props.values)
  }

  return (
    <div style={wrapperStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>{props.title ?? 'Invita a tu equipo'}</h1>
          <p style={descriptionStyle}>
            {props.description ?? 'Agrega compañeros por correo — pueden aceptar la invitación después.'}
          </p>
        </div>
        <Show when={props.onBack}>
          <button type="button" style={linkButtonStyle} onClick={() => props.onBack?.()}>
            {props.backLabel ?? 'Volver'}
          </button>
        </Show>
      </div>

      <div style={bodyStyle}>
        <form style={inviteRowStyle} onSubmit={handleSubmit}>
          <div style={emailFieldStyle}>
            <Input
              label="Correo electrónico"
              name="email"
              type="email"
              placeholder={props.emailPlaceholder ?? 'nombre@empresa.com'}
              value={props.values.email}
              onInput={(event) => props.onChange({ ...props.values, email: event.currentTarget.value })}
            />
          </div>
          <Button type="submit" variant="secondary">
            {props.inviteLabel ?? 'Invitar'}
          </Button>
        </form>

        <Show when={props.invites && props.invites.length > 0}>
          <p style={listHeadingStyle}>Invitaciones enviadas</p>
          <List items={props.invites} onItemAction={props.onRemoveInvite} />
        </Show>
      </div>

      <div style={footerStyle}>
        <Button variant="primary" onClick={() => props.onNext()}>
          {props.nextLabel ?? 'Finalizar'}
        </Button>
      </div>
    </div>
  )
}
