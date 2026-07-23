import type { CSSProperties, FormEvent } from 'react'
import { Button, Input } from '@moderno/react'

export interface VerifyValues {
  code: string
}

export interface VerifyProps {
  values: VerifyValues
  onChange: (values: VerifyValues) => void
  onSubmit: (values: VerifyValues) => void
  onResend?: () => void
  onBack?: () => void
  /** Server-side error (wrong code, expired, etc.); shown above the form. */
  error?: string
  /** Disables the form and swaps the submit label while a request is in flight. */
  submitting?: boolean
  /** Display-only: the address the code was sent to. Carried forward by the consumer. */
  email?: string
  title?: string
  description?: string
}

// Fills its container's height rather than assuming the viewport (matches the
// ApplicationShells block's convention) — give it a full-height container
// (e.g. `#root { height: 100vh }`) in your own app if you want it to fill the page.
const wrapperStyle: CSSProperties = {
  minHeight: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px',
  background: 'var(--md-surface-base)',
}
const cardStyle: CSSProperties = {
  width: '100%',
  maxWidth: '400px',
  border: '1px solid var(--md-border-default)',
  padding: '32px',
}
const headerStyle: CSSProperties = { margin: '0 0 24px' }
const titleStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: 'var(--md-text-headline-lg)',
  color: 'var(--md-text-primary)',
  margin: '0 0 8px',
}
const descriptionStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  lineHeight: 'var(--md-text-body-sm-lh)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}
const errorStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-error)',
  margin: '0 0 16px',
}
const formStyle: CSSProperties = { display: 'flex', flexDirection: 'column', gap: '16px' }
const rowStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px 12px',
}
const linkButtonStyle: CSSProperties = {
  background: 'none',
  border: 'none',
  padding: 0,
  font: 'inherit',
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-primary)',
  textDecoration: 'underline',
  cursor: 'pointer',
}
const submitStyle: CSSProperties = { width: '100%' }
const footerStyle: CSSProperties = {
  marginTop: '24px',
  textAlign: 'center',
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
}

/**
 * Moderno screen — Verify (React). Copy-paste; edit freely.
 * Presentational single-screen auth verify / OTP (ADR-0005): a typed wiring
 * contract (values/onChange/onSubmit) with no internal state and no router — the
 * consumer owns state and navigation. Composes the Input and Button primitives +
 * Moderno tokens.
 */
export function Verify({
  values,
  onChange,
  onSubmit,
  onResend,
  onBack,
  error,
  submitting,
  email,
  title = 'Verifica tu correo',
  description,
}: VerifyProps) {
  function set<K extends keyof VerifyValues>(key: K, value: VerifyValues[K]) {
    onChange({ ...values, [key]: value })
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit(values)
  }

  return (
    <div style={wrapperStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>{title}</h1>
          <p style={descriptionStyle}>
            {description ??
              (email
                ? `Ingresa el código de 6 dígitos que enviamos a ${email}.`
                : 'Ingresa el código de 6 dígitos que te enviamos.')}
          </p>
        </div>

        {error ? <p style={errorStyle}>{error}</p> : null}

        <form style={formStyle} onSubmit={handleSubmit}>
          <Input
            label="Código de verificación"
            name="code"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={values.code}
            onChange={(event) => set('code', event.currentTarget.value)}
            required
          />
          <div style={rowStyle}>
            <button type="button" style={linkButtonStyle} onClick={onResend}>
              Reenviar código
            </button>
          </div>
          <Button type="submit" variant="primary" style={submitStyle} disabled={submitting}>
            {submitting ? 'Verificando…' : 'Verificar'}
          </Button>
        </form>

        <p style={footerStyle}>
          <button type="button" style={linkButtonStyle} onClick={onBack}>
            Volver
          </button>
        </p>
      </div>
    </div>
  )
}
