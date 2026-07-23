import { Show, type JSX } from 'solid-js'
import { Button, Checkbox, Divider, Input } from '@moderno/solid'

export interface SignUpValues {
  name: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

export interface SignUpProps {
  values: SignUpValues
  onChange: (values: SignUpValues) => void
  onSubmit: (values: SignUpValues) => void
  onSignIn?: () => void
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
 * Moderno screen — SignUp (Solid). Copy-paste; edit freely.
 * Presentational single-screen auth sign-up (ADR-0005): a typed wiring contract
 * (values/onChange/onSubmit) with no internal state and no router — the consumer
 * owns state and navigation. Composes the Input, Checkbox, Divider and Button
 * primitives + Moderno tokens.
 */
export function SignUp(props: SignUpProps) {
  function set<K extends keyof SignUpValues>(key: K, value: SignUpValues[K]) {
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
          <h1 style={titleStyle}>{props.title ?? 'Crea tu cuenta'}</h1>
          <p style={descriptionStyle}>{props.description ?? 'Completa tus datos para empezar.'}</p>
        </div>

        <Show when={props.error}>
          <p style={errorStyle}>{props.error}</p>
        </Show>

        <form style={formStyle} onSubmit={handleSubmit}>
          <Input
            label="Nombre completo"
            name="name"
            type="text"
            autocomplete="name"
            value={props.values.name}
            onInput={(event) => set('name', event.currentTarget.value)}
            required
          />
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
            autocomplete="new-password"
            value={props.values.password}
            onInput={(event) => set('password', event.currentTarget.value)}
            required
          />
          <Input
            label="Confirma tu contraseña"
            name="confirmPassword"
            type="password"
            autocomplete="new-password"
            value={props.values.confirmPassword}
            onInput={(event) => set('confirmPassword', event.currentTarget.value)}
            required
          />
          <Checkbox
            label="Acepto los términos y condiciones"
            checked={props.values.acceptTerms}
            onCheckedChange={(checked) => set('acceptTerms', checked === true)}
          />
          <Button type="submit" variant="primary" style={submitStyle} disabled={props.submitting}>
            {props.submitting ? 'Creando cuenta…' : 'Crear cuenta'}
          </Button>
        </form>

        <Divider />

        <p style={footerStyle}>
          ¿Ya tienes una cuenta?{' '}
          <button type="button" style={linkButtonStyle} onClick={() => props.onSignIn?.()}>
            Inicia sesión
          </button>
        </p>
      </div>
    </div>
  )
}
