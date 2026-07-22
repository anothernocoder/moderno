import { Fragment, type CSSProperties } from 'react'
import { Button, Card, Divider } from '@moderno/react'

export interface ActionPanelItem {
  title: string
  description: string
  actionLabel: string
  /** Danger-zone styling: colors the title and action with the error token. */
  destructive?: boolean
}

export interface ActionPanelsProps {
  items?: ActionPanelItem[]
  onAction?: (item: ActionPanelItem) => void
}

const DEFAULT_ITEMS: ActionPanelItem[] = [
  {
    title: 'Descargar tus datos',
    description: 'Exporta toda tu información de la cuenta en un archivo JSON.',
    actionLabel: 'Exportar',
  },
  {
    title: 'Transferir propiedad',
    description: 'Transfiere esta cuenta a otro miembro del equipo. Perderás el acceso de administrador.',
    actionLabel: 'Transferir',
  },
  {
    title: 'Eliminar cuenta',
    description: 'Esta acción es permanente y no se puede deshacer. Se eliminarán todos tus datos.',
    actionLabel: 'Eliminar cuenta',
    destructive: true,
  },
]

const rowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '24px',
  flexWrap: 'wrap',
}
const textWrapStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  maxWidth: '520px',
}
const titleStyle: CSSProperties = {
  margin: 0,
  fontSize: 'var(--md-text-body-md)',
  fontWeight: 600,
  color: 'var(--md-text-primary)',
}
const titleDestructiveStyle: CSSProperties = { ...titleStyle, color: 'var(--md-error)' }
const descriptionStyle: CSSProperties = {
  margin: 0,
  fontSize: 'var(--md-text-body-sm)',
  lineHeight: 'var(--md-text-body-sm-lh)',
  color: 'var(--md-text-secondary)',
}
const actionStyle: CSSProperties = { flexShrink: 0 }
const actionDestructiveStyle: CSSProperties = {
  ...actionStyle,
  borderColor: 'var(--md-error)',
  color: 'var(--md-error)',
}

/**
 * Moderno block — ActionPanels (React). Copy-paste; edit freely.
 * Settings/account panel list: title + description on the left, a single action on the
 * right, with an optional "destructive" (danger-zone) style. Uses the Card + Button +
 * Divider primitives + Moderno tokens.
 */
export function ActionPanels({ items = DEFAULT_ITEMS, onAction }: ActionPanelsProps) {
  return (
    <Card>
      {items.map((item, index) => (
        <Fragment key={item.title}>
          {index > 0 ? <Divider /> : null}
          <div style={rowStyle}>
            <div style={textWrapStyle}>
              <h3 style={item.destructive ? titleDestructiveStyle : titleStyle}>{item.title}</h3>
              <p style={descriptionStyle}>{item.description}</p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              style={item.destructive ? actionDestructiveStyle : actionStyle}
              onClick={() => onAction?.(item)}
            >
              {item.actionLabel}
            </Button>
          </div>
        </Fragment>
      ))}
    </Card>
  )
}
