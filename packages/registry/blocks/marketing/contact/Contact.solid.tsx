import { createSignal, For, Show, type JSX } from 'solid-js'
import { Button, Input, Textarea } from '@moderno/solid'

export interface ContactInfoItem {
  label: string
  value: string
  href?: string
}

export interface ContactFormValues {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactProps {
  eyebrow?: string
  title?: string
  description?: string
  contactInfo?: ContactInfoItem[]
  nameLabel?: string
  emailLabel?: string
  subjectLabel?: string
  messageLabel?: string
  submitLabel?: string
  defaultValues?: Partial<ContactFormValues>
  onSubmit?: (values: ContactFormValues) => void
}

const DEFAULT_CONTACT_INFO: ContactInfoItem[] = [
  { label: 'Email', value: 'hola@acme.com', href: 'mailto:hola@acme.com' },
  { label: 'Teléfono', value: '+57 300 123 4567', href: 'tel:+573001234567' },
  { label: 'Oficina', value: 'Bogotá, Colombia' },
]

const wrapperStyle: JSX.CSSProperties = {
  display: 'grid',
  'grid-template-columns': 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '48px',
  'max-width': '1040px',
  margin: '0 auto',
  padding: '64px 24px',
  background: 'var(--md-surface-base)',
}
const infoColStyle: JSX.CSSProperties = { display: 'flex', 'flex-direction': 'column', gap: '24px' }
const eyebrowStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-label-sm)',
  'letter-spacing': '0.06em',
  'text-transform': 'uppercase',
  color: 'var(--md-primary)',
  margin: 0,
}
const titleStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': '32px',
  'line-height': 1.15,
  color: 'var(--md-text-primary)',
  margin: 0,
}
const descriptionStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-md)',
  'line-height': 'var(--md-text-body-md-lh)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}
const infoListStyle: JSX.CSSProperties = {
  'list-style': 'none',
  display: 'flex',
  'flex-direction': 'column',
  gap: '16px',
  margin: 0,
  padding: 0,
}
const infoLabelStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-label-sm)',
  color: 'var(--md-text-secondary)',
  margin: '0 0 4px',
}
const infoValueStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-md)',
  color: 'var(--md-text-primary)',
  'text-decoration': 'none',
}
const formStyle: JSX.CSSProperties = { display: 'flex', 'flex-direction': 'column', gap: '16px' }
const rowStyle: JSX.CSSProperties = { display: 'flex', 'flex-wrap': 'wrap', gap: '16px' }
const fieldStyle: JSX.CSSProperties = { flex: '1 1 200px' }

/**
 * Moderno block — Contact (Solid). Copy-paste; edit freely.
 * Contact section: intro copy + contact info list on the left, a name/email/subject/message
 * form on the right. Uses the Input + Textarea + Button primitives + Moderno tokens.
 */
export function Contact(props: ContactProps) {
  const eyebrow = () => props.eyebrow ?? 'Contacto'
  const title = () => props.title ?? '¿Hablamos?'
  const description = () => props.description ?? 'Escríbenos y te respondemos en menos de 24 horas.'
  const contactInfo = () => props.contactInfo ?? DEFAULT_CONTACT_INFO
  const nameLabel = () => props.nameLabel ?? 'Nombre'
  const emailLabel = () => props.emailLabel ?? 'Correo'
  const subjectLabel = () => props.subjectLabel ?? 'Asunto'
  const messageLabel = () => props.messageLabel ?? 'Mensaje'
  const submitLabel = () => props.submitLabel ?? 'Enviar mensaje'

  const [name, setName] = createSignal(props.defaultValues?.name ?? '')
  const [email, setEmail] = createSignal(props.defaultValues?.email ?? '')
  const [subject, setSubject] = createSignal(props.defaultValues?.subject ?? '')
  const [message, setMessage] = createSignal(props.defaultValues?.message ?? '')

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    props.onSubmit?.({ name: name(), email: email(), subject: subject(), message: message() })
  }

  return (
    <div style={wrapperStyle}>
      <div style={infoColStyle}>
        <Show when={eyebrow()}>
          <p style={eyebrowStyle}>{eyebrow()}</p>
        </Show>
        <h2 style={titleStyle}>{title()}</h2>
        <Show when={description()}>
          <p style={descriptionStyle}>{description()}</p>
        </Show>
        <ul style={infoListStyle}>
          <For each={contactInfo()}>
            {(item) => (
              <li>
                <p style={infoLabelStyle}>{item.label}</p>
                <Show when={item.href} fallback={<span style={infoValueStyle}>{item.value}</span>}>
                  <a href={item.href} style={infoValueStyle}>
                    {item.value}
                  </a>
                </Show>
              </li>
            )}
          </For>
        </ul>
      </div>
      <form style={formStyle} onSubmit={handleSubmit}>
        <div style={rowStyle}>
          <div style={fieldStyle}>
            <Input
              label={nameLabel()}
              name="name"
              value={name()}
              onInput={(event) => setName(event.currentTarget.value)}
              required
            />
          </div>
          <div style={fieldStyle}>
            <Input
              label={emailLabel()}
              name="email"
              type="email"
              value={email()}
              onInput={(event) => setEmail(event.currentTarget.value)}
              required
            />
          </div>
        </div>
        <Input
          label={subjectLabel()}
          name="subject"
          value={subject()}
          onInput={(event) => setSubject(event.currentTarget.value)}
        />
        <Textarea
          label={messageLabel()}
          name="message"
          rows={5}
          value={message()}
          onInput={(event) => setMessage(event.currentTarget.value)}
          required
        />
        <Button type="submit" variant="primary" size="lg">
          {submitLabel()}
        </Button>
      </form>
    </div>
  )
}
