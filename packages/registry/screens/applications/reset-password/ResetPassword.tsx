import type { CSSProperties, FormEvent } from 'react'
import { Button, Input } from '@moderno/react'

export interface ResetPasswordValues {
  password: string
  confirmPassword: string
}

export interface ResetPasswordProps {
  values: ResetPasswordValues
  onChange: (values: ResetPasswordValues) => void
  onSubmit: (values: ResetPasswordValues) => void
  onBack?: () => void
  /** Server-side error (expired link, passwords don't match, etc.); shown above the form. */
  error?: string
  /** Disables the form and swaps the submit label while a request is in flight. */
  submitting?: boolean
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
 * Moderno screen — ResetPassword (React). Copy-paste; edit freely.
 * Presentational single-screen auth reset-password (ADR-0005): a typed wiring
 * contract (values/onChange/onSubmit) with no internal state and no router — the
 * consumer owns state and navigation. Composes the Input and Button primitives +
 * Moderno tokens.
 */
export function ResetPassword({
  values,
  onChange,
  onSubmit,
  onBack,
  error,
  submitting,
  title = 'Elige una nueva contraseña',
  description = 'Tu nueva contraseña debe ser distinta a las anteriores.',
}: ResetPasswordProps) {
  function set<K extends keyof ResetPasswordValues>(key: K, value: ResetPasswordValues[K]) {
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
          <p style={descriptionStyle}>{description}</p>
        </div>

        {error ? <p style={errorStyle}>{error}</p> : null}

        <form style={formStyle} onSubmit={handleSubmit}>
          <Input
            label="Nueva contraseña"
            name="password"
            type="password"
            autoComplete="new-password"
            value={values.password}
            onChange={(event) => set('password', event.currentTarget.value)}
            required
          />
          <Input
            label="Confirma tu nueva contraseña"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={values.confirmPassword}
            onChange={(event) => set('confirmPassword', event.currentTarget.value)}
            required
          />
          <Button type="submit" variant="primary" style={submitStyle} disabled={submitting}>
            {submitting ? 'Guardando…' : 'Guardar contraseña'}
          </Button>
        </form>

        <p style={footerStyle}>
          <button type="button" style={linkButtonStyle} onClick={onBack}>
            Volver a iniciar sesión
          </button>
        </p>
      </div>
    </div>
  )
}
