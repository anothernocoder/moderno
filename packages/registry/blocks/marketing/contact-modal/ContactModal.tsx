import { useState, type ChangeEvent, type CSSProperties, type FormEvent } from 'react'
import { Button, Dialog, Input, Textarea } from '@moderno/react'

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

const EMPTY_VALUES: ContactModalFormValues = { name: '', email: '', message: '' }

const sectionStyle: CSSProperties = { padding: '96px 24px', background: 'var(--md-surface-base)' }
const headerStyle: CSSProperties = { textAlign: 'center', margin: '0 auto 40px', maxWidth: '480px' }
const kickerStyle: CSSProperties = {
  fontSize: 'var(--md-text-label-sm)',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--md-text-secondary)',
  margin: '0 0 16px',
}
const titleStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: '32px',
  lineHeight: 1.15,
  letterSpacing: '-0.02em',
  color: 'var(--md-text-primary)',
  margin: '0 0 16px',
}
const subtitleStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-lg)',
  lineHeight: 'var(--md-text-body-lg-lh)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}
const formWrapStyle: CSSProperties = { maxWidth: '480px', margin: '0 auto' }
const formStyle: CSSProperties = { display: 'flex', flexDirection: 'column', gap: '16px' }
const dialogRowStyle: CSSProperties = {
  marginTop: '24px',
  paddingTop: '24px',
  borderTop: '1px solid var(--md-border-default)',
  textAlign: 'center',
}

/**
 * Moderno block — ContactModal (React). Copy-paste; edit freely.
 * Modal-based contact/lead capture: a centered header above a compact single-column
 * name/email/message form, plus a secondary "prefer to email or call?" trigger that opens the
 * `Dialog` primitive with your direct contact info. Uses the Input + Textarea + Button + Dialog
 * primitives + Moderno tokens.
 */
export function ContactModal({
  kicker = 'Contacto',
  title = '¿Hablamos?',
  subtitle = 'Cuéntanos en qué podemos ayudarte y te respondemos en menos de 24 horas.',
  nameLabel = 'Nombre',
  emailLabel = 'Correo',
  messageLabel = 'Mensaje',
  submitLabel = 'Enviar mensaje',
  dialogTriggerLabel = '¿Prefieres escribirnos directo?',
  dialogTitle = 'Contáctanos directamente',
  dialogDescription = 'Escríbenos a hola@acme.com o llámanos al +57 300 123 4567.',
  dialogCloseLabel = 'Cerrar',
  defaultValues,
  onSubmit,
}: ContactModalProps) {
  const [values, setValues] = useState<ContactModalFormValues>({ ...EMPTY_VALUES, ...defaultValues })

  function handleChange(field: keyof ContactModalFormValues) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((current) => ({ ...current, [field]: event.currentTarget.value }))
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit?.(values)
  }

  return (
    <section style={sectionStyle}>
      <div style={headerStyle}>
        {kicker ? <p style={kickerStyle}>{kicker}</p> : null}
        <h2 style={titleStyle}>{title}</h2>
        {subtitle ? <p style={subtitleStyle}>{subtitle}</p> : null}
      </div>
      <div style={formWrapStyle}>
        <form style={formStyle} onSubmit={handleSubmit}>
          <Input label={nameLabel} name="name" value={values.name} onChange={handleChange('name')} required />
          <Input
            label={emailLabel}
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange('email')}
            required
          />
          <Textarea
            label={messageLabel}
            name="message"
            rows={4}
            value={values.message}
            onChange={handleChange('message')}
            required
          />
          <Button type="submit" variant="primary" size="lg">
            {submitLabel}
          </Button>
        </form>
        <div style={dialogRowStyle}>
          <Dialog
            triggerLabel={dialogTriggerLabel}
            title={dialogTitle}
            description={dialogDescription}
            closeLabel={dialogCloseLabel}
          />
        </div>
      </div>
    </section>
  )
}
