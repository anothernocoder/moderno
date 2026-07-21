import { createSignal, type JSX } from 'solid-js'
import { Button, Input } from '@moderno/solid'

export interface NewsletterProps {
  kicker?: string
  title?: string
  subtitle?: string
  placeholder?: string
  buttonLabel?: string
  defaultEmail?: string
  onSubmit?: (email: string) => void
}

const sectionStyle: JSX.CSSProperties = { padding: '96px 24px', background: 'var(--md-surface-base)' }
const headerStyle: JSX.CSSProperties = { 'text-align': 'center', margin: '0 auto 32px', 'max-width': '640px' }
const kickerStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-label-sm)',
  'letter-spacing': '0.14em',
  'text-transform': 'uppercase',
  color: 'var(--md-text-secondary)',
  margin: '0 0 16px',
}
const titleStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': '36px',
  'line-height': 1.1,
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
const formStyle: JSX.CSSProperties = {
  display: 'flex',
  'flex-wrap': 'wrap',
  gap: '12px',
  'max-width': '480px',
  margin: '0 auto',
}
const fieldStyle: JSX.CSSProperties = { flex: '1 1 260px' }

/**
 * Moderno block — Newsletter (Solid). Copy-paste; edit freely.
 * Email signup / subscription section: centered header above an inline email form.
 * Uses the Input + Button primitives + Moderno tokens.
 */
export function Newsletter(props: NewsletterProps) {
  const kicker = () => props.kicker ?? 'Newsletter'
  const title = () => props.title ?? 'Recibe las novedades de Moderno'
  const subtitle = () => props.subtitle ?? 'Un correo al mes con nuevos blocks, primitives y notas de diseño.'
  const placeholder = () => props.placeholder ?? 'tu@email.com'
  const buttonLabel = () => props.buttonLabel ?? 'Suscribirme'

  const [email, setEmail] = createSignal(props.defaultEmail ?? '')

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    props.onSubmit?.(email())
  }

  return (
    <section style={sectionStyle}>
      <div style={headerStyle}>
        <p style={kickerStyle}>{kicker()}</p>
        <h2 style={titleStyle}>{title()}</h2>
        <p style={subtitleStyle}>{subtitle()}</p>
      </div>
      <form style={formStyle} onSubmit={handleSubmit}>
        <div style={fieldStyle}>
          <Input
            label="Correo"
            name="email"
            type="email"
            placeholder={placeholder()}
            value={email()}
            onInput={(event) => setEmail(event.currentTarget.value)}
            required
          />
        </div>
        <Button type="submit" variant="primary">
          {buttonLabel()}
        </Button>
      </form>
    </section>
  )
}
