<script lang="ts">
  // Moderno block — Table (Svelte). Copy-paste; edit freely.
  // Application data table: sortable order column, row selection, status badges and
  // bulk actions. Uses the Checkbox + Badge + Button primitives + Moderno tokens.
  import { Badge, Button, Checkbox } from '@moderno/svelte'

  export type TableStatusVariant = 'neutral' | 'solid' | 'success' | 'warning' | 'error' | 'info'

  export interface TableRow {
    id: string
    order: string
    customer: string
    status: string
    statusVariant: TableStatusVariant
    total: string
  }

  type CheckedState = boolean | 'indeterminate'

  const defaultRows: TableRow[] = [
    { id: 'PED-1104', order: 'PED-1104', customer: 'Bruno Café', status: 'Despachado', statusVariant: 'success', total: '$412.800' },
    { id: 'PED-1103', order: 'PED-1103', customer: 'Verde Logística', status: 'Preparando', statusVariant: 'info', total: '$1.208.400' },
    { id: 'PED-1102', order: 'PED-1102', customer: 'Kapital Foods', status: 'Pago pendiente', statusVariant: 'warning', total: '$96.500' },
  ]

  let {
    rows = defaultRows,
    onExport,
    onCancelSelected,
    onRowAction,
  }: {
    rows?: TableRow[]
    onExport?: (selected: TableRow[]) => void
    onCancelSelected?: (selected: TableRow[]) => void
    onRowAction?: (row: TableRow) => void
  } = $props()

  let selected = $state<Set<string>>(new Set())
  let sortDir = $state<'asc' | 'desc'>('asc')

  const sorted = $derived(
    [...rows].sort((a, b) => (sortDir === 'asc' ? a.order.localeCompare(b.order) : b.order.localeCompare(a.order))),
  )
  const selectedRows = $derived(sorted.filter((row) => selected.has(row.id)))
  const allChecked: CheckedState = $derived(
    selected.size === 0 ? false : selected.size === rows.length ? true : 'indeterminate',
  )

  function toggleAll(checked: CheckedState) {
    selected = checked === true ? new Set(rows.map((row) => row.id)) : new Set()
  }

  function toggleRow(id: string, checked: CheckedState) {
    const next = new Set(selected)
    if (checked === true) next.add(id)
    else next.delete(id)
    selected = next
  }

  function toggleSort() {
    sortDir = sortDir === 'asc' ? 'desc' : 'asc'
  }
</script>

<div class="md-table">
  <table class="md-table__table">
    <thead>
      <tr>
        <th class="md-table__th md-table__th--check">
          <Checkbox checked={allChecked} label="Seleccionar todo" onCheckedChange={toggleAll} />
        </th>
        <th class="md-table__th">
          <button type="button" class="md-table__sort" onclick={toggleSort}>
            Pedido {sortDir === 'asc' ? '↓' : '↑'}
          </button>
        </th>
        <th class="md-table__th">Cliente</th>
        <th class="md-table__th">Estado</th>
        <th class="md-table__th md-table__th--num">Total</th>
        <th class="md-table__th md-table__th--actions"></th>
      </tr>
    </thead>
    <tbody>
      {#each sorted as row (row.id)}
        <tr>
          <td class="md-table__td">
            <Checkbox
              checked={selected.has(row.id)}
              label={`Seleccionar ${row.id}`}
              onCheckedChange={(checked) => toggleRow(row.id, checked)}
            />
          </td>
          <td class="md-table__td md-table__td--strong">{row.order}</td>
          <td class="md-table__td">{row.customer}</td>
          <td class="md-table__td">
            <Badge variant={row.statusVariant} dot>{row.status}</Badge>
          </td>
          <td class="md-table__td md-table__td--num">{row.total}</td>
          <td class="md-table__td md-table__td--actions">
            <Button variant="secondary" size="sm" aria-label={`Acciones de ${row.id}`} onclick={() => onRowAction?.(row)}>
              ⋯
            </Button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  <div class="md-table__footer">
    <span>{selected.size} seleccionados</span>
    <div class="md-table__footer-actions">
      <Button variant="secondary" size="sm" disabled={selectedRows.length === 0} onclick={() => onExport?.(selectedRows)}>
        Exportar
      </Button>
      <Button
        variant="secondary"
        size="sm"
        disabled={selectedRows.length === 0}
        onclick={() => onCancelSelected?.(selectedRows)}
      >
        Cancelar pedidos
      </Button>
    </div>
  </div>
</div>

<style>
  .md-table {
    background: var(--md-surface-base);
    border: 1px solid var(--md-border-default);
    overflow-x: auto;
  }
  .md-table__table {
    width: 100%;
    border-collapse: collapse;
  }
  .md-table__th {
    text-align: left;
    padding: 12px 16px;
    font-size: var(--md-text-label-sm);
    color: var(--md-text-secondary);
    border-bottom: 1px solid var(--md-border-strong);
    white-space: nowrap;
  }
  .md-table__th--check {
    width: 40px;
  }
  .md-table__th--num {
    text-align: right;
  }
  .md-table__th--actions {
    width: 48px;
  }
  .md-table__sort {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    color: inherit;
    cursor: pointer;
  }
  .md-table__td {
    padding: 12px 16px;
    font-size: var(--md-text-body-sm);
    color: var(--md-text-primary);
    border-bottom: 1px solid var(--md-border-default);
  }
  .md-table__td--strong {
    font-weight: 500;
  }
  .md-table__td--num {
    text-align: right;
  }
  .md-table__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 16px;
    border-top: 1px solid var(--md-border-strong);
    font-size: var(--md-text-body-sm);
    color: var(--md-text-secondary);
  }
  .md-table__footer-actions {
    display: flex;
    gap: 8px;
  }
  .md-table :global(.md-checkbox-label) {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>
