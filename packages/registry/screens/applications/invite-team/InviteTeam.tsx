import type { CSSProperties, FormEvent } from 'react'
import { Button, Input } from '@moderno/react'
import { List, type ListItem } from '../../../blocks/applications/list/List'

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
const inviteRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'flex-end',
  gap: '12px',
  marginBottom: '24px',
}
const emailFieldStyle: CSSProperties = { flex: 1, minWidth: 0 }
const listHeadingStyle: CSSProperties = {
  fontSize: 'var(--md-text-label-md)',
  color: 'var(--md-text-secondary)',
  margin: '0 0 8px',
}
const footerStyle: CSSProperties = {
  maxWidth: '640px',
  margin: '24px auto 0',
  display: 'flex',
  justifyContent: 'flex-end',
}

/**
 * Moderno screen — InviteTeam (React). Copy-paste; edit freely.
 * Final step of the Onboarding flow (ADR-0005): composes the Applications
 * List block for the invited-member rows (avatar, status badge, row action)
 * instead of re-implementing that markup. The "add teammate" email field is
 * this screen's own simple form — there's no dedicated "invite by email"
 * block to compose, so it isn't duplicating any block's internals, the same
 * allowance the Checkout ticket used for its confirmation screen. `onInvite`
 * fires on submit; `onRemoveInvite` forwards the composed List's
 * `onItemAction`; `onNext` finishes onboarding.
 */
export function InviteTeam({
  values,
  onChange,
  onInvite,
  invites,
  onRemoveInvite,
  onNext,
  onBack,
  title = 'Invita a tu equipo',
  description = 'Agrega compañeros por correo — pueden aceptar la invitación después.',
  emailPlaceholder = 'nombre@empresa.com',
  inviteLabel = 'Invitar',
  nextLabel = 'Finalizar',
  backLabel = 'Volver',
}: InviteTeamProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!values.email) return
    onInvite(values)
  }

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
        <form style={inviteRowStyle} onSubmit={handleSubmit}>
          <div style={emailFieldStyle}>
            <Input
              label="Correo electrónico"
              name="email"
              type="email"
              placeholder={emailPlaceholder}
              value={values.email}
              onChange={(event) => onChange({ ...values, email: event.currentTarget.value })}
            />
          </div>
          <Button type="submit" variant="secondary">
            {inviteLabel}
          </Button>
        </form>

        {invites && invites.length > 0 ? (
          <>
            <p style={listHeadingStyle}>Invitaciones enviadas</p>
            <List items={invites} onItemAction={onRemoveInvite} />
          </>
        ) : null}
      </div>

      <div style={footerStyle}>
        <Button variant="primary" onClick={onNext}>
          {nextLabel}
        </Button>
      </div>
    </div>
  )
}
