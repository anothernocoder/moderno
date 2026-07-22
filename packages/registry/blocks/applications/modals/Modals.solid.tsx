import { For, Show, type JSX } from 'solid-js'
import { Badge, Dialog } from '@moderno/solid'

export interface ModalAction {
  id: string
  label: string
  description: string
  tone?: 'default' | 'danger'
  triggerLabel: string
  dialogTitle: string
  dialogDescription: string
  closeLabel?: string
}

export interface ModalsProps {
  title?: string
  description?: string
  actions?: ModalAction[]
}

const DEFAULT_ACTIONS: ModalAction[] = [
  {
    id: 'edit-profile',
    label: 'Editar perfil',
    description: 'Actualiza tu nombre, correo y datos de contacto.',
    triggerLabel: 'Editar perfil',
    dialogTitle: 'Editar perfil',
    dialogDescription:
      'Actualiza tu nombre, correo y datos de contacto desde el formulario de configuración. Los cambios se guardan automáticamente.',
    closeLabel: 'Listo',
  },
  {
    id: 'export-data',
    label: 'Exportar datos',
    description: 'Descarga una copia de tu información en formato CSV.',
    triggerLabel: 'Exportar datos',
    dialogTitle: 'Exportar datos',
    dialogDescription: 'Generaremos un archivo CSV con tu información y te avisaremos por correo cuando esté listo.',
    closeLabel: 'Entendido',
  },
  {
    id: 'delete-account',
    label: 'Eliminar cuenta',
    description: 'Esta acción es permanente y no se puede deshacer.',
    tone: 'danger',
    triggerLabel: 'Eliminar cuenta',
    dialogTitle: '¿Eliminar tu cuenta?',
    dialogDescription:
      'Se eliminarán todos tus datos, pedidos e historial de forma permanente. Esta acción no se puede deshacer.',
    closeLabel: 'Cancelar',
  },
]

const wrapperStyle: JSX.CSSProperties = { background: 'var(--md-surface-base)', border: '1px solid var(--md-border-default)' }
const headerStyle: JSX.CSSProperties = { padding: '20px 24px', 'border-bottom': '1px solid var(--md-border-default)' }
const titleStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': '20px',
  color: 'var(--md-text-primary)',
  margin: '0 0 4px',
}
const descriptionStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}
const rowStyle: JSX.CSSProperties = {
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'space-between',
  gap: '16px',
  padding: '16px 24px',
  'border-bottom': '1px solid var(--md-border-default)',
}
const lastRowStyle: JSX.CSSProperties = { ...rowStyle, 'border-bottom': 'none' }
const labelWrapStyle: JSX.CSSProperties = { display: 'flex', 'flex-direction': 'column', gap: '4px' }
const labelRowStyle: JSX.CSSProperties = { display: 'flex', 'align-items': 'center', gap: '8px' }
const labelStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-md)',
  'font-weight': 500,
  color: 'var(--md-text-primary)',
  margin: 0,
}
const dangerLabelStyle: JSX.CSSProperties = { ...labelStyle, color: 'var(--md-error)' }
const rowDescriptionStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}

/**
 * Moderno block — Modals (Solid). Copy-paste; edit freely.
 * Application settings panel: a list of common account actions, each opening a centered
 * Dialog — an informational confirmation, an export notice and a destructive "delete
 * account" warning. Uses the Badge + Dialog primitives + Moderno tokens.
 */
export function Modals(props: ModalsProps) {
  const title = () => props.title ?? 'Gestión de cuenta'
  const description = () =>
    props.description ?? 'Acciones comunes de administración, cada una respaldada por un diálogo modal accesible.'
  const actions = () => props.actions ?? DEFAULT_ACTIONS

  return (
    <section style={wrapperStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>{title()}</h2>
        <Show when={description()}>
          <p style={descriptionStyle}>{description()}</p>
        </Show>
      </div>
      <For each={actions()}>
        {(action, index) => (
          <div style={index() === actions().length - 1 ? lastRowStyle : rowStyle}>
            <div style={labelWrapStyle}>
              <div style={labelRowStyle}>
                <p style={action.tone === 'danger' ? dangerLabelStyle : labelStyle}>{action.label}</p>
                <Show when={action.tone === 'danger'}>
                  <Badge variant="error" dot>
                    Irreversible
                  </Badge>
                </Show>
              </div>
              <p style={rowDescriptionStyle}>{action.description}</p>
            </div>
            <Dialog
              triggerLabel={action.triggerLabel}
              title={action.dialogTitle}
              description={action.dialogDescription}
              closeLabel={action.closeLabel}
            />
          </div>
        )}
      </For>
    </section>
  )
}
