import { Show, type JSX } from 'solid-js'
import { Button, Input } from '@moderno/solid'

export interface ForgotPasswordValues {
  email: string
}

export interface ForgotPasswordProps {
  values: ForgotPasswordValues
  onChange: (values: ForgotPasswordValues) => void
  onSubmit: (values: ForgotPasswordValues) => void
  onBack?: () => void
  error?: string
  submitting?: boolean
  /** Set once the reset email has been sent — swaps the form for a confirmation message. */
  sent?: boolean
  title?: string
  description?: string
}

// Fills its container's height rather than assuming the viewport (matches the
// ApplicationShells block's convention) — give it a full-height container
// (e.g. `#root { height: 100vh }`) in your own app if you want it to fill the page.
const wrapperStyle: JSX.CSSProperties = {
  'min-height': '100%',
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'center',
  padding: '24px',
  background: 'var(--md-surface-base)',
}
const cardStyle: JSX.CSSProperties = {
  width: '100%',
  'max-width': '400px',
  border: '1px solid var(--md-border-default)',
  padding: '32px',
}
const headerStyle: JSX.CSSProperties = { margin: '0 0 24px' }
const titleStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': 'var(--md-text-headline-lg)',
  color: 'var(--md-text-primary)',
  margin: '0 0 8px',
}
const descriptionStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  'line-height': 'var(--md-text-body-sm-lh)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}
const errorStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-error)',
  margin: '0 0 16px',
}
const formStyle: JSX.CSSProperties = { display: 'flex', 'flex-direction': 'column', gap: '16px' }
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
const submitStyle: JSX.CSSProperties = { width: '100%' }
const footerStyle: JSX.CSSProperties = {
  'margin-top': '24px',
  'text-align': 'center',
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
}
const confirmationStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  'line-height': 'var(--md-text-body-sm-lh)',
  color: 'var(--md-text-secondary)',
  margin: '0 0 24px',
}

/**
 * Moderno screen — ForgotPassword (Solid). Copy-paste; edit freely.
 * Presentational single-screen auth forgot-password (ADR-0005): a typed wiring
 * contract (values/onChange/onSubmit) with no internal state and no router — the
 * consumer owns state and navigation. Composes the Input and Button primitives +
 * Moderno tokens.
 */
export function ForgotPassword(props: ForgotPasswordProps) {
  function set<K extends keyof ForgotPasswordValues>(key: K, value: ForgotPasswordValues[K]) {
    props.onChange({ ...props.values, [key]: value })
  }

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    props.onSubmit(props.values)
  }

  return (
    <div style={wrapperStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>{props.title ?? 'Recupera tu contraseña'}</h1>
          <p style={descriptionStyle}>
            {props.description ?? 'Ingresa tu correo y te enviaremos un enlace para restablecerla.'}
          </p>
        </div>

        <Show when={props.error}>
          <p style={errorStyle}>{props.error}</p>
        </Show>

        <Show
          when={props.sent}
          fallback={
            <>
              <form style={formStyle} onSubmit={handleSubmit}>
                <Input
                  label="Correo electrónico"
                  name="email"
                  type="email"
                  autocomplete="email"
                  value={props.values.email}
                  onInput={(event) => set('email', event.currentTarget.value)}
                  required
                />
                <Button type="submit" variant="primary" style={submitStyle} disabled={props.submitting}>
                  {props.submitting ? 'Enviando…' : 'Enviar enlace'}
                </Button>
              </form>

              <p style={footerStyle}>
                <button type="button" style={linkButtonStyle} onClick={() => props.onBack?.()}>
                  Volver a iniciar sesión
                </button>
              </p>
            </>
          }
        >
          <p style={confirmationStyle}>
            Si existe una cuenta con el correo <strong>{props.values.email}</strong>, te enviamos un enlace
            para restablecer tu contraseña.
          </p>
          <Button type="button" variant="secondary" style={submitStyle} onClick={() => props.onBack?.()}>
            Volver a iniciar sesión
          </Button>
        </Show>
      </div>
    </div>
  )
}
