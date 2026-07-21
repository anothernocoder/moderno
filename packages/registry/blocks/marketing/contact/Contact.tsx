import { useState, type ChangeEvent, type CSSProperties, type FormEvent } from 'react'
import { Button, Input, Textarea } from '@moderno/react'

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

const EMPTY_VALUES: ContactFormValues = { name: '', email: '', subject: '', message: '' }

const wrapperStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '48px',
  maxWidth: '1040px',
  margin: '0 auto',
  padding: '64px 24px',
  background: 'var(--md-surface-base)',
}
const infoColStyle: CSSProperties = { display: 'flex', flexDirection: 'column', gap: '24px' }
const eyebrowStyle: CSSProperties = {
  fontSize: 'var(--md-text-label-sm)',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'var(--md-primary)',
  margin: 0,
}
const titleStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: '32px',
  lineHeight: 1.15,
  color: 'var(--md-text-primary)',
  margin: 0,
}
const descriptionStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-md)',
  lineHeight: 'var(--md-text-body-md-lh)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}
const infoListStyle: CSSProperties = {
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  margin: 0,
  padding: 0,
}
const infoLabelStyle: CSSProperties = {
  fontSize: 'var(--md-text-label-sm)',
  color: 'var(--md-text-secondary)',
  margin: '0 0 4px',
}
const infoValueStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-md)',
  color: 'var(--md-text-primary)',
  textDecoration: 'none',
}
const formStyle: CSSProperties = { display: 'flex', flexDirection: 'column', gap: '16px' }
const rowStyle: CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '16px' }
const fieldStyle: CSSProperties = { flex: '1 1 200px' }

/**
 * Moderno block — Contact (React). Copy-paste; edit freely.
 * Contact section: intro copy + contact info list on the left, a name/email/subject/message
 * form on the right. Uses the Input + Textarea + Button primitives + Moderno tokens.
 */
export function Contact({
  eyebrow = 'Contacto',
  title = '¿Hablamos?',
  description = 'Escríbenos y te respondemos en menos de 24 horas.',
  contactInfo = DEFAULT_CONTACT_INFO,
  nameLabel = 'Nombre',
  emailLabel = 'Correo',
  subjectLabel = 'Asunto',
  messageLabel = 'Mensaje',
  submitLabel = 'Enviar mensaje',
  defaultValues,
  onSubmit,
}: ContactProps) {
  const [values, setValues] = useState<ContactFormValues>({ ...EMPTY_VALUES, ...defaultValues })

  function handleChange(field: keyof ContactFormValues) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((current) => ({ ...current, [field]: event.currentTarget.value }))
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit?.(values)
  }

  return (
    <div style={wrapperStyle}>
      <div style={infoColStyle}>
        {eyebrow ? <p style={eyebrowStyle}>{eyebrow}</p> : null}
        <h2 style={titleStyle}>{title}</h2>
        {description ? <p style={descriptionStyle}>{description}</p> : null}
        <ul style={infoListStyle}>
          {contactInfo.map((item) => (
            <li key={item.label}>
              <p style={infoLabelStyle}>{item.label}</p>
              {item.href ? (
                <a href={item.href} style={infoValueStyle}>
                  {item.value}
                </a>
              ) : (
                <span style={infoValueStyle}>{item.value}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <form style={formStyle} onSubmit={handleSubmit}>
        <div style={rowStyle}>
          <div style={fieldStyle}>
            <Input label={nameLabel} name="name" value={values.name} onChange={handleChange('name')} required />
          </div>
          <div style={fieldStyle}>
            <Input
              label={emailLabel}
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange('email')}
              required
            />
          </div>
        </div>
        <Input label={subjectLabel} name="subject" value={values.subject} onChange={handleChange('subject')} />
        <Textarea
          label={messageLabel}
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange('message')}
          required
        />
        <Button type="submit" variant="primary" size="lg">
          {submitLabel}
        </Button>
      </form>
    </div>
  )
}
