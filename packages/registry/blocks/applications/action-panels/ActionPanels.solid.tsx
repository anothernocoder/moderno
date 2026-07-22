import { For, type JSX } from 'solid-js'
import { Button, Card, Divider } from '@moderno/solid'

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

const rowStyle: JSX.CSSProperties = {
  display: 'flex',
  'align-items': 'flex-start',
  'justify-content': 'space-between',
  gap: '24px',
  'flex-wrap': 'wrap',
}
const textWrapStyle: JSX.CSSProperties = {
  display: 'flex',
  'flex-direction': 'column',
  gap: '4px',
  'max-width': '520px',
}
const titleStyle: JSX.CSSProperties = {
  margin: 0,
  'font-size': 'var(--md-text-body-md)',
  'font-weight': 600,
  color: 'var(--md-text-primary)',
}
const titleDestructiveStyle: JSX.CSSProperties = { ...titleStyle, color: 'var(--md-error)' }
const descriptionStyle: JSX.CSSProperties = {
  margin: 0,
  'font-size': 'var(--md-text-body-sm)',
  'line-height': 'var(--md-text-body-sm-lh)',
  color: 'var(--md-text-secondary)',
}
const actionDestructiveStyle: JSX.CSSProperties = {
  'border-color': 'var(--md-error)',
  color: 'var(--md-error)',
}

/**
 * Moderno block — ActionPanels (Solid). Copy-paste; edit freely.
 * Settings/account panel list: title + description on the left, a single action on the
 * right, with an optional "destructive" (danger-zone) style. Uses the Card + Button +
 * Divider primitives + Moderno tokens.
 */
export function ActionPanels(props: ActionPanelsProps) {
  const items = () => props.items ?? DEFAULT_ITEMS
  return (
    <Card>
      <For each={items()}>
        {(item, index) => (
          <>
            {index() > 0 ? <Divider /> : null}
            <div style={rowStyle}>
              <div style={textWrapStyle}>
                <h3 style={item.destructive ? titleDestructiveStyle : titleStyle}>{item.title}</h3>
                <p style={descriptionStyle}>{item.description}</p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                style={item.destructive ? actionDestructiveStyle : undefined}
                onClick={() => props.onAction?.(item)}
              >
                {item.actionLabel}
              </Button>
            </div>
          </>
        )}
      </For>
    </Card>
  )
}
