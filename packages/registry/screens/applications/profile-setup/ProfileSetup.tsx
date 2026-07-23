import type { CSSProperties } from 'react'
import { FormLayouts, type FormLayoutsValues } from '../../../blocks/applications/form-layouts/FormLayouts'

export type { FormLayoutsValues }

export interface ProfileSetupProps {
  /** Seed values — e.g. carried back from a later step when the user goes back to edit. */
  values?: Partial<FormLayoutsValues>
  onNext: (values: FormLayoutsValues) => void
  onBack?: () => void
  title?: string
  description?: string
  backLabel?: string
}

const wrapperStyle: CSSProperties = {
  minHeight: '100%',
  background: 'var(--md-surface-base)',
  padding: '24px',
}
const headerStyle: CSSProperties = {
  maxWidth: '640px',
  margin: '0 auto 16px',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px 12px',
}
const titleStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: 'var(--md-text-headline-lg)',
  color: 'var(--md-text-primary)',
  margin: '0 0 4px',
}
const descriptionStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: 0,
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
const formWrapStyle: CSSProperties = { maxWidth: '640px', margin: '0 auto' }

/**
 * Moderno screen — ProfileSetup (React). Copy-paste; edit freely.
 * Profile step of the Onboarding flow (ADR-0005): composes the Applications
 * FormLayouts block instead of re-implementing its grouped-section form
 * markup. The screen's own header/back-link chrome wraps the block without
 * touching its internal fields; FormLayouts' own footer ("Cancelar" /
 * "Guardar cambios") is the screen's only action — `onNext` forwards its
 * `onSave` payload, `onBack` its `onCancel`.
 */
export function ProfileSetup({
  values,
  onNext,
  onBack,
  title = 'Cuéntanos sobre ti',
  description = 'Esta información aparece en tu perfil y es visible para tu equipo.',
  backLabel = 'Volver',
}: ProfileSetupProps) {
  return (
    <div style={wrapperStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>{title}</h1>
          <p style={descriptionStyle}>{description}</p>
        </div>
        {onBack ? (
          <button type="button" style={linkButtonStyle} onClick={onBack}>
            {backLabel}
          </button>
        ) : null}
      </div>
      <div style={formWrapStyle}>
        <FormLayouts defaultValues={values} onSave={onNext} onCancel={onBack} />
      </div>
    </div>
  )
}
