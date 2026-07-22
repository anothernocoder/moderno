import type { CSSProperties } from 'react'
import { Badge, Dialog } from '@moderno/react'

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

const wrapperStyle: CSSProperties = { background: 'var(--md-surface-base)', border: '1px solid var(--md-border-default)' }
const headerStyle: CSSProperties = { padding: '20px 24px', borderBottom: '1px solid var(--md-border-default)' }
const titleStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: '20px',
  color: 'var(--md-text-primary)',
  margin: '0 0 4px',
}
const descriptionStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}
const rowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '16px',
  padding: '16px 24px',
  borderBottom: '1px solid var(--md-border-default)',
}
const lastRowStyle: CSSProperties = { ...rowStyle, borderBottom: 'none' }
const labelWrapStyle: CSSProperties = { display: 'flex', flexDirection: 'column', gap: '4px' }
const labelRowStyle: CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px' }
const labelStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-md)',
  fontWeight: 500,
  color: 'var(--md-text-primary)',
  margin: 0,
}
const dangerLabelStyle: CSSProperties = { ...labelStyle, color: 'var(--md-error)' }
const rowDescriptionStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}

/**
 * Moderno block — Modals (React). Copy-paste; edit freely.
 * Application settings panel: a list of common account actions, each opening a centered
 * `Dialog` — an informational confirmation, an export notice and a destructive "delete
 * account" warning. Uses the Badge + Dialog primitives + Moderno tokens.
 */
export function Modals({
  title = 'Gestión de cuenta',
  description = 'Acciones comunes de administración, cada una respaldada por un diálogo modal accesible.',
  actions = DEFAULT_ACTIONS,
}: ModalsProps) {
  return (
    <section style={wrapperStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>{title}</h2>
        {description ? <p style={descriptionStyle}>{description}</p> : null}
      </div>
      {actions.map((action, index) => (
        <div key={action.id} style={index === actions.length - 1 ? lastRowStyle : rowStyle}>
          <div style={labelWrapStyle}>
            <div style={labelRowStyle}>
              <p style={action.tone === 'danger' ? dangerLabelStyle : labelStyle}>{action.label}</p>
              {action.tone === 'danger' ? (
                <Badge variant="error" dot>
                  Irreversible
                </Badge>
              ) : null}
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
      ))}
    </section>
  )
}
