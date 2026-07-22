import { Show, type JSX } from 'solid-js'
import { Button, Checkbox, Divider, Input } from '@moderno/solid'

export interface SignInValues {
  email: string
  password: string
  remember: boolean
}

export interface SignInProps {
  values: SignInValues
  onChange: (values: SignInValues) => void
  onSubmit: (values: SignInValues) => void
  onForgotPassword?: () => void
  onSignUp?: () => void
  error?: string
  submitting?: boolean
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
const rowStyle: JSX.CSSProperties = {
  display: 'flex',
  'flex-wrap': 'wrap',
  'align-items': 'center',
  'justify-content': 'space-between',
  gap: '8px 12px',
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
const submitStyle: JSX.CSSProperties = { width: '100%' }
const footerStyle: JSX.CSSProperties = {
  'margin-top': '24px',
  'text-align': 'center',
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
}

/**
 * Moderno screen — SignIn (Solid). Copy-paste; edit freely.
 * Presentational single-screen auth sign-in (ADR-0005): a typed wiring contract
 * (values/onChange/onSubmit) with no internal state and no router — the consumer
 * owns state and navigation. Composes the Input, Checkbox, Divider and Button
 * primitives + Moderno tokens.
 */
export function SignIn(props: SignInProps) {
  function set<K extends keyof SignInValues>(key: K, value: SignInValues[K]) {
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
          <h1 style={titleStyle}>{props.title ?? 'Inicia sesión'}</h1>
          <p style={descriptionStyle}>
            {props.description ?? 'Ingresa tus credenciales para acceder a tu cuenta.'}
          </p>
        </div>

        <Show when={props.error}>
          <p style={errorStyle}>{props.error}</p>
        </Show>

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
          <Input
            label="Contraseña"
            name="password"
            type="password"
            autocomplete="current-password"
            value={props.values.password}
            onInput={(event) => set('password', event.currentTarget.value)}
            required
          />
          <div style={rowStyle}>
            <Checkbox
              label="Recordarme"
              checked={props.values.remember}
              onCheckedChange={(checked) => set('remember', checked === true)}
            />
            <button type="button" style={linkButtonStyle} onClick={() => props.onForgotPassword?.()}>
              ¿Olvidaste tu contraseña?
            </button>
          </div>
          <Button type="submit" variant="primary" style={submitStyle} disabled={props.submitting}>
            {props.submitting ? 'Ingresando…' : 'Iniciar sesión'}
          </Button>
        </form>

        <Divider />

        <p style={footerStyle}>
          ¿No tienes una cuenta?{' '}
          <button type="button" style={linkButtonStyle} onClick={() => props.onSignUp?.()}>
            Regístrate
          </button>
        </p>
      </div>
    </div>
  )
}
