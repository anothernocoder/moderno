import { Show, type JSX } from 'solid-js'
import { FormLayouts, type FormLayoutsValues } from '../../../blocks/applications/form-layouts/FormLayouts.solid'

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

const wrapperStyle: JSX.CSSProperties = {
  'min-height': '100%',
  background: 'var(--md-surface-base)',
  padding: '24px',
}
const headerStyle: JSX.CSSProperties = {
  'max-width': '640px',
  margin: '0 auto 16px',
  display: 'flex',
  'flex-wrap': 'wrap',
  'align-items': 'center',
  'justify-content': 'space-between',
  gap: '8px 12px',
}
const titleStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': 'var(--md-text-headline-lg)',
  color: 'var(--md-text-primary)',
  margin: '0 0 4px',
}
const descriptionStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: 0,
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
const formWrapStyle: JSX.CSSProperties = { 'max-width': '640px', margin: '0 auto' }

/**
 * Moderno screen — ProfileSetup (Solid). Copy-paste; edit freely.
 * Profile step of the Onboarding flow (ADR-0005): composes the Applications
 * FormLayouts block instead of re-implementing its grouped-section form
 * markup. The screen's own header/back-link chrome wraps the block without
 * touching its internal fields; FormLayouts' own footer ("Cancelar" /
 * "Guardar cambios") is the screen's only action — `onNext` forwards its
 * `onSave` payload, `onBack` its `onCancel`.
 */
export function ProfileSetup(props: ProfileSetupProps) {
  return (
    <div style={wrapperStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>{props.title ?? 'Cuéntanos sobre ti'}</h1>
          <p style={descriptionStyle}>
            {props.description ?? 'Esta información aparece en tu perfil y es visible para tu equipo.'}
          </p>
        </div>
        <Show when={props.onBack}>
          <button type="button" style={linkButtonStyle} onClick={() => props.onBack?.()}>
            {props.backLabel ?? 'Volver'}
          </button>
        </Show>
      </div>
      <div style={formWrapStyle}>
        <FormLayouts defaultValues={props.values} onSave={props.onNext} onCancel={props.onBack} />
      </div>
    </div>
  )
}
