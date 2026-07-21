import { createSignal, Show, type JSX } from 'solid-js'
import { Button, Dialog, Input, Textarea } from '@moderno/solid'

export interface ContactModalFormValues {
  name: string
  email: string
  message: string
}

export interface ContactModalProps {
  kicker?: string
  title?: string
  subtitle?: string
  nameLabel?: string
  emailLabel?: string
  messageLabel?: string
  submitLabel?: string
  dialogTriggerLabel?: string
  dialogTitle?: string
  dialogDescription?: string
  dialogCloseLabel?: string
  defaultValues?: Partial<ContactModalFormValues>
  onSubmit?: (values: ContactModalFormValues) => void
}

const sectionStyle: JSX.CSSProperties = { padding: '96px 24px', background: 'var(--md-surface-base)' }
const headerStyle: JSX.CSSProperties = { 'text-align': 'center', margin: '0 auto 40px', 'max-width': '480px' }
const kickerStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-label-sm)',
  'letter-spacing': '0.14em',
  'text-transform': 'uppercase',
  color: 'var(--md-text-secondary)',
  margin: '0 0 16px',
}
const titleStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': '32px',
  'line-height': 1.15,
  'letter-spacing': '-0.02em',
  color: 'var(--md-text-primary)',
  margin: '0 0 16px',
}
const subtitleStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-lg)',
  'line-height': 'var(--md-text-body-lg-lh)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}
const formWrapStyle: JSX.CSSProperties = { 'max-width': '480px', margin: '0 auto' }
const formStyle: JSX.CSSProperties = { display: 'flex', 'flex-direction': 'column', gap: '16px' }
const dialogRowStyle: JSX.CSSProperties = {
  'margin-top': '24px',
  'padding-top': '24px',
  'border-top': '1px solid var(--md-border-default)',
  'text-align': 'center',
}

/**
 * Moderno block — ContactModal (Solid). Copy-paste; edit freely.
 * Modal-based contact/lead capture: a centered header above a compact single-column
 * name/email/message form, plus a secondary "prefer to email or call?" trigger that opens the
 * Dialog primitive with your direct contact info. Uses the Input + Textarea + Button + Dialog
 * primitives + Moderno tokens.
 */
export function ContactModal(props: ContactModalProps) {
  const kicker = () => props.kicker ?? 'Contacto'
  const title = () => props.title ?? '¿Hablamos?'
  const subtitle = () => props.subtitle ?? 'Cuéntanos en qué podemos ayudarte y te respondemos en menos de 24 horas.'
  const nameLabel = () => props.nameLabel ?? 'Nombre'
  const emailLabel = () => props.emailLabel ?? 'Correo'
  const messageLabel = () => props.messageLabel ?? 'Mensaje'
  const submitLabel = () => props.submitLabel ?? 'Enviar mensaje'
  const dialogTriggerLabel = () => props.dialogTriggerLabel ?? '¿Prefieres escribirnos directo?'
  const dialogTitle = () => props.dialogTitle ?? 'Contáctanos directamente'
  const dialogDescription = () =>
    props.dialogDescription ?? 'Escríbenos a hola@acme.com o llámanos al +57 300 123 4567.'
  const dialogCloseLabel = () => props.dialogCloseLabel ?? 'Cerrar'

  const [name, setName] = createSignal(props.defaultValues?.name ?? '')
  const [email, setEmail] = createSignal(props.defaultValues?.email ?? '')
  const [message, setMessage] = createSignal(props.defaultValues?.message ?? '')

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    props.onSubmit?.({ name: name(), email: email(), message: message() })
  }

  return (
    <section style={sectionStyle}>
      <div style={headerStyle}>
        <Show when={kicker()}>
          <p style={kickerStyle}>{kicker()}</p>
        </Show>
        <h2 style={titleStyle}>{title()}</h2>
        <Show when={subtitle()}>
          <p style={subtitleStyle}>{subtitle()}</p>
        </Show>
      </div>
      <div style={formWrapStyle}>
        <form style={formStyle} onSubmit={handleSubmit}>
          <Input
            label={nameLabel()}
            name="name"
            value={name()}
            onInput={(event) => setName(event.currentTarget.value)}
            required
          />
          <Input
            label={emailLabel()}
            name="email"
            type="email"
            value={email()}
            onInput={(event) => setEmail(event.currentTarget.value)}
            required
          />
          <Textarea
            label={messageLabel()}
            name="message"
            rows={4}
            value={message()}
            onInput={(event) => setMessage(event.currentTarget.value)}
            required
          />
          <Button type="submit" variant="primary" size="lg">
            {submitLabel()}
          </Button>
        </form>
        <div style={dialogRowStyle}>
          <Dialog
            triggerLabel={dialogTriggerLabel()}
            title={dialogTitle()}
            description={dialogDescription()}
            closeLabel={dialogCloseLabel()}
          />
        </div>
      </div>
    </section>
  )
}
