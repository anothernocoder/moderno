import { useState, type ChangeEvent, type CSSProperties, type FormEvent } from 'react'
import { Button, Input } from '@moderno/react'

export interface NewsletterProps {
  kicker?: string
  title?: string
  subtitle?: string
  placeholder?: string
  buttonLabel?: string
  defaultEmail?: string
  onSubmit?: (email: string) => void
}

const sectionStyle: CSSProperties = { padding: '96px 24px', background: 'var(--md-surface-base)' }
const headerStyle: CSSProperties = { textAlign: 'center', margin: '0 auto 32px', maxWidth: '640px' }
const kickerStyle: CSSProperties = {
  fontSize: 'var(--md-text-label-sm)',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--md-text-secondary)',
  margin: '0 0 16px',
}
const titleStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: '36px',
  lineHeight: 1.1,
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
const formStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px',
  maxWidth: '480px',
  margin: '0 auto',
}
const fieldStyle: CSSProperties = { flex: '1 1 260px' }

/**
 * Moderno block — Newsletter (React). Copy-paste; edit freely.
 * Email signup / subscription section: centered header above an inline email form.
 * Uses the Input + Button primitives + Moderno tokens.
 */
export function Newsletter({
  kicker = 'Newsletter',
  title = 'Recibe las novedades de Moderno',
  subtitle = 'Un correo al mes con nuevos blocks, primitives y notas de diseño.',
  placeholder = 'tu@email.com',
  buttonLabel = 'Suscribirme',
  defaultEmail = '',
  onSubmit,
}: NewsletterProps) {
  const [email, setEmail] = useState(defaultEmail)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.currentTarget.value)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit?.(email)
  }

  return (
    <section style={sectionStyle}>
      <div style={headerStyle}>
        <p style={kickerStyle}>{kicker}</p>
        <h2 style={titleStyle}>{title}</h2>
        <p style={subtitleStyle}>{subtitle}</p>
      </div>
      <form style={formStyle} onSubmit={handleSubmit}>
        <div style={fieldStyle}>
          <Input
            label="Correo"
            name="email"
            type="email"
            placeholder={placeholder}
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" variant="primary">
          {buttonLabel}
        </Button>
      </form>
    </section>
  )
}
