import { Show, type JSX } from 'solid-js'
import { Button, Input } from '@moderno/solid'

export interface VerifyValues {
  code: string
}

export interface VerifyProps {
  values: VerifyValues
  onChange: (values: VerifyValues) => void
  onSubmit: (values: VerifyValues) => void
  onResend?: () => void
  onBack?: () => void
  error?: string
  submitting?: boolean
  /** Display-only: the address the code was sent to. Carried forward by the consumer. */
  email?: string
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
 * Moderno screen — Verify (Solid). Copy-paste; edit freely.
 * Presentational single-screen auth verify / OTP (ADR-0005): a typed wiring
 * contract (values/onChange/onSubmit) with no internal state and no router — the
 * consumer owns state and navigation. Composes the Input and Button primitives +
 * Moderno tokens.
 */
export function Verify(props: VerifyProps) {
  function set<K extends keyof VerifyValues>(key: K, value: VerifyValues[K]) {
    props.onChange({ ...props.values, [key]: value })
  }

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    props.onSubmit(props.values)
  }

  function description() {
    if (props.description) return props.description
    return props.email
      ? `Ingresa el código de 6 dígitos que enviamos a ${props.email}.`
      : 'Ingresa el código de 6 dígitos que te enviamos.'
  }

  return (
    <div style={wrapperStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>{props.title ?? 'Verifica tu correo'}</h1>
          <p style={descriptionStyle}>{description()}</p>
        </div>

        <Show when={props.error}>
          <p style={errorStyle}>{props.error}</p>
        </Show>

        <form style={formStyle} onSubmit={handleSubmit}>
          <Input
            label="Código de verificación"
            name="code"
            type="text"
            inputmode="numeric"
            autocomplete="one-time-code"
            value={props.values.code}
            onInput={(event) => set('code', event.currentTarget.value)}
            required
          />
          <div style={rowStyle}>
            <button type="button" style={linkButtonStyle} onClick={() => props.onResend?.()}>
              Reenviar código
            </button>
          </div>
          <Button type="submit" variant="primary" style={submitStyle} disabled={props.submitting}>
            {props.submitting ? 'Verificando…' : 'Verificar'}
          </Button>
        </form>

        <p style={footerStyle}>
          <button type="button" style={linkButtonStyle} onClick={() => props.onBack?.()}>
            Volver
          </button>
        </p>
      </div>
    </div>
  )
}
