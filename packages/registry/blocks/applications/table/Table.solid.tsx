import { createSignal, createMemo, For, type JSX } from 'solid-js'
import { Badge, Button, Checkbox } from '@moderno/solid'
import type { CheckedState } from '@moderno/solid'

export type TableStatusVariant = 'neutral' | 'solid' | 'success' | 'warning' | 'error' | 'info'

export interface TableRow {
  id: string
  order: string
  customer: string
  status: string
  statusVariant: TableStatusVariant
  total: string
}

export interface TableProps {
  rows?: TableRow[]
  onExport?: (selected: TableRow[]) => void
  onCancelSelected?: (selected: TableRow[]) => void
  onRowAction?: (row: TableRow) => void
}

const DEFAULT_ROWS: TableRow[] = [
  { id: 'PED-1104', order: 'PED-1104', customer: 'Bruno Café', status: 'Despachado', statusVariant: 'success', total: '$412.800' },
  { id: 'PED-1103', order: 'PED-1103', customer: 'Verde Logística', status: 'Preparando', statusVariant: 'info', total: '$1.208.400' },
  { id: 'PED-1102', order: 'PED-1102', customer: 'Kapital Foods', status: 'Pago pendiente', statusVariant: 'warning', total: '$96.500' },
]

const wrapperStyle: JSX.CSSProperties = {
  background: 'var(--md-surface-base)',
  border: '1px solid var(--md-border-default)',
  'overflow-x': 'auto',
}
const tableStyle: JSX.CSSProperties = { width: '100%', 'border-collapse': 'collapse' }
const thStyle: JSX.CSSProperties = {
  'text-align': 'left',
  padding: '12px 16px',
  'font-size': 'var(--md-text-label-sm)',
  color: 'var(--md-text-secondary)',
  'border-bottom': '1px solid var(--md-border-strong)',
  'white-space': 'nowrap',
}
const thNumStyle: JSX.CSSProperties = { ...thStyle, 'text-align': 'right' }
const tdStyle: JSX.CSSProperties = {
  padding: '12px 16px',
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-primary)',
  'border-bottom': '1px solid var(--md-border-default)',
}
const tdNumStyle: JSX.CSSProperties = { ...tdStyle, 'text-align': 'right' }
const sortButtonStyle: JSX.CSSProperties = {
  display: 'inline-flex',
  'align-items': 'center',
  gap: '4px',
  background: 'none',
  border: 'none',
  padding: 0,
  font: 'inherit',
  color: 'inherit',
  cursor: 'pointer',
}
const footerStyle: JSX.CSSProperties = {
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'space-between',
  gap: '12px',
  padding: '12px 16px',
  'border-top': '1px solid var(--md-border-strong)',
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
}
const srOnlyStyle: JSX.CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  'white-space': 'nowrap',
  border: 0,
}

function SrOnly(props: { children: JSX.Element }) {
  return <span style={srOnlyStyle}>{props.children}</span>
}

/**
 * Moderno block — Table (Solid). Copy-paste; edit freely.
 * Application data table: sortable order column, row selection, status badges and
 * bulk actions. Uses the Checkbox + Badge + Button primitives + Moderno tokens.
 */
export function Table(props: TableProps) {
  const rows = () => props.rows ?? DEFAULT_ROWS
  const [selected, setSelected] = createSignal<Set<string>>(new Set())
  const [sortDir, setSortDir] = createSignal<'asc' | 'desc'>('asc')

  const sorted = createMemo(() =>
    [...rows()].sort((a, b) => (sortDir() === 'asc' ? a.order.localeCompare(b.order) : b.order.localeCompare(a.order))),
  )
  const selectedRows = createMemo(() => sorted().filter((row) => selected().has(row.id)))
  const allChecked = createMemo<CheckedState>(() => {
    const count = selected().size
    if (count === 0) return false
    return count === rows().length ? true : 'indeterminate'
  })

  function toggleAll(checked: CheckedState) {
    setSelected(checked === true ? new Set(rows().map((row) => row.id)) : new Set())
  }

  function toggleRow(id: string, checked: CheckedState) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (checked === true) next.add(id)
      else next.delete(id)
      return next
    })
  }

  return (
    <div style={wrapperStyle}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={{ ...thStyle, width: '40px' }}>
              <Checkbox checked={allChecked()} onCheckedChange={toggleAll} label={<SrOnly>Seleccionar todo</SrOnly>} />
            </th>
            <th style={thStyle}>
              <button type="button" style={sortButtonStyle} onClick={() => setSortDir((dir) => (dir === 'asc' ? 'desc' : 'asc'))}>
                Pedido {sortDir() === 'asc' ? '↓' : '↑'}
              </button>
            </th>
            <th style={thStyle}>Cliente</th>
            <th style={thStyle}>Estado</th>
            <th style={thNumStyle}>Total</th>
            <th style={{ ...thStyle, width: '48px' }} />
          </tr>
        </thead>
        <tbody>
          <For each={sorted()}>
            {(row) => (
              <tr>
                <td style={tdStyle}>
                  <Checkbox
                    checked={selected().has(row.id)}
                    onCheckedChange={(checked) => toggleRow(row.id, checked)}
                    label={<SrOnly>Seleccionar {row.id}</SrOnly>}
                  />
                </td>
                <td style={{ ...tdStyle, color: 'var(--md-text-primary)', 'font-weight': 500 }}>{row.order}</td>
                <td style={tdStyle}>{row.customer}</td>
                <td style={tdStyle}>
                  <Badge variant={row.statusVariant} dot>
                    {row.status}
                  </Badge>
                </td>
                <td style={tdNumStyle}>{row.total}</td>
                <td style={tdStyle}>
                  <Button variant="secondary" size="sm" aria-label={`Acciones de ${row.id}`} onClick={() => props.onRowAction?.(row)}>
                    ⋯
                  </Button>
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
      <div style={footerStyle}>
        <span>{selected().size} seleccionados</span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            variant="secondary"
            size="sm"
            disabled={selectedRows().length === 0}
            onClick={() => props.onExport?.(selectedRows())}
          >
            Exportar
          </Button>
          <Button
            variant="secondary"
            size="sm"
            disabled={selectedRows().length === 0}
            onClick={() => props.onCancelSelected?.(selectedRows())}
          >
            Cancelar pedidos
          </Button>
        </div>
      </div>
    </div>
  )
}
