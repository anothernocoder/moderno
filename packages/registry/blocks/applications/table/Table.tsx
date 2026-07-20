import { useState, type CSSProperties, type ReactNode } from 'react'
import { Badge, Button, Checkbox, type CheckedState } from '@moderno/react'

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

const wrapperStyle: CSSProperties = {
  background: 'var(--md-surface-base)',
  border: '1px solid var(--md-border-default)',
  overflowX: 'auto',
}
const tableStyle: CSSProperties = { width: '100%', borderCollapse: 'collapse' }
const thStyle: CSSProperties = {
  textAlign: 'left',
  padding: '12px 16px',
  fontSize: 'var(--md-text-label-sm)',
  color: 'var(--md-text-secondary)',
  borderBottom: '1px solid var(--md-border-strong)',
  whiteSpace: 'nowrap',
}
const thNumStyle: CSSProperties = { ...thStyle, textAlign: 'right' }
const tdStyle: CSSProperties = {
  padding: '12px 16px',
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-primary)',
  borderBottom: '1px solid var(--md-border-default)',
}
const tdNumStyle: CSSProperties = { ...tdStyle, textAlign: 'right' }
const sortButtonStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  background: 'none',
  border: 'none',
  padding: 0,
  font: 'inherit',
  color: 'inherit',
  cursor: 'pointer',
}
const footerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
  padding: '12px 16px',
  borderTop: '1px solid var(--md-border-strong)',
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
}
const srOnlyStyle: CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
}

function SrOnly({ children }: { children: ReactNode }) {
  return <span style={srOnlyStyle}>{children}</span>
}

/**
 * Moderno block — Table (React). Copy-paste; edit freely.
 * Application data table: sortable order column, row selection, status badges and
 * bulk actions. Uses the Checkbox + Badge + Button primitives + Moderno tokens.
 */
export function Table({ rows = DEFAULT_ROWS, onExport, onCancelSelected, onRowAction }: TableProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const sorted = [...rows].sort((a, b) =>
    sortDir === 'asc' ? a.order.localeCompare(b.order) : b.order.localeCompare(a.order),
  )
  const selectedRows = sorted.filter((row) => selected.has(row.id))
  const allChecked: CheckedState =
    selected.size === 0 ? false : selected.size === rows.length ? true : 'indeterminate'

  function toggleAll(checked: CheckedState) {
    setSelected(checked === true ? new Set(rows.map((row) => row.id)) : new Set())
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
              <Checkbox checked={allChecked} onCheckedChange={toggleAll} label={<SrOnly>Seleccionar todo</SrOnly>} />
            </th>
            <th style={thStyle}>
              <button
                type="button"
                style={sortButtonStyle}
                onClick={() => setSortDir((dir) => (dir === 'asc' ? 'desc' : 'asc'))}
              >
                Pedido {sortDir === 'asc' ? '↓' : '↑'}
              </button>
            </th>
            <th style={thStyle}>Cliente</th>
            <th style={thStyle}>Estado</th>
            <th style={thNumStyle}>Total</th>
            <th style={{ ...thStyle, width: '48px' }} />
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <tr key={row.id}>
              <td style={tdStyle}>
                <Checkbox
                  checked={selected.has(row.id)}
                  onCheckedChange={(checked) => toggleRow(row.id, checked)}
                  label={<SrOnly>Seleccionar {row.id}</SrOnly>}
                />
              </td>
              <td style={{ ...tdStyle, color: 'var(--md-text-primary)', fontWeight: 500 }}>{row.order}</td>
              <td style={tdStyle}>{row.customer}</td>
              <td style={tdStyle}>
                <Badge variant={row.statusVariant} dot>
                  {row.status}
                </Badge>
              </td>
              <td style={tdNumStyle}>{row.total}</td>
              <td style={tdStyle}>
                <Button variant="secondary" size="sm" aria-label={`Acciones de ${row.id}`} onClick={() => onRowAction?.(row)}>
                  ⋯
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={footerStyle}>
        <span>{selected.size} seleccionados</span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="secondary" size="sm" disabled={selectedRows.length === 0} onClick={() => onExport?.(selectedRows)}>
            Exportar
          </Button>
          <Button
            variant="secondary"
            size="sm"
            disabled={selectedRows.length === 0}
            onClick={() => onCancelSelected?.(selectedRows)}
          >
            Cancelar pedidos
          </Button>
        </div>
      </div>
    </div>
  )
}
