<script setup lang="ts">
// Moderno block — Table (Vue). Copy-paste; edit freely.
// Application data table: sortable order column, row selection, status badges and
// bulk actions. Uses the Checkbox + Badge + Button primitives + Moderno tokens.
import { computed, ref } from 'vue'
import { Badge, Button, Checkbox } from '@moderno/vue'

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

const props = defineProps<{ rows?: TableRow[] }>()
const emit = defineEmits<{
  export: [selected: TableRow[]]
  cancelSelected: [selected: TableRow[]]
  rowAction: [row: TableRow]
}>()

const rows = computed(() => props.rows ?? defaultRows)
const selected = ref<Set<string>>(new Set())
const sortDir = ref<'asc' | 'desc'>('asc')

const sorted = computed(() =>
  [...rows.value].sort((a, b) =>
    sortDir.value === 'asc' ? a.order.localeCompare(b.order) : b.order.localeCompare(a.order),
  ),
)
const selectedRows = computed(() => sorted.value.filter((row) => selected.value.has(row.id)))
const allChecked = computed<CheckedState>(() => {
  const count = selected.value.size
  if (count === 0) return false
  return count === rows.value.length ? true : 'indeterminate'
})

function toggleAll(checked: CheckedState) {
  selected.value = checked === true ? new Set(rows.value.map((row) => row.id)) : new Set()
}

function toggleRow(id: string, checked: CheckedState) {
  const next = new Set(selected.value)
  if (checked === true) next.add(id)
  else next.delete(id)
  selected.value = next
}

function toggleSort() {
  sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
}
</script>

<template>
  <div class="md-table">
    <table class="md-table__table">
      <thead>
        <tr>
          <th class="md-table__th md-table__th--check">
            <Checkbox :model-value="allChecked" label="Seleccionar todo" @update:model-value="toggleAll" />
          </th>
          <th class="md-table__th">
            <button type="button" class="md-table__sort" @click="toggleSort">
              Pedido {{ sortDir === 'asc' ? '↓' : '↑' }}
            </button>
          </th>
          <th class="md-table__th">Cliente</th>
          <th class="md-table__th">Estado</th>
          <th class="md-table__th md-table__th--num">Total</th>
          <th class="md-table__th md-table__th--actions" />
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in sorted" :key="row.id">
          <td class="md-table__td">
            <Checkbox
              :model-value="selected.has(row.id)"
              :label="`Seleccionar ${row.id}`"
              @update:model-value="(checked) => toggleRow(row.id, checked)"
            />
          </td>
          <td class="md-table__td md-table__td--strong">{{ row.order }}</td>
          <td class="md-table__td">{{ row.customer }}</td>
          <td class="md-table__td">
            <Badge :variant="row.statusVariant" dot>{{ row.status }}</Badge>
          </td>
          <td class="md-table__td md-table__td--num">{{ row.total }}</td>
          <td class="md-table__td md-table__td--actions">
            <Button
              variant="secondary"
              size="sm"
              :aria-label="`Acciones de ${row.id}`"
              @click="emit('rowAction', row)"
            >
              ⋯
            </Button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="md-table__footer">
      <span>{{ selected.size }} seleccionados</span>
      <div class="md-table__footer-actions">
        <Button
          variant="secondary"
          size="sm"
          :disabled="selectedRows.length === 0"
          @click="emit('export', selectedRows)"
        >
          Exportar
        </Button>
        <Button
          variant="secondary"
          size="sm"
          :disabled="selectedRows.length === 0"
          @click="emit('cancelSelected', selectedRows)"
        >
          Cancelar pedidos
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
.md-table :deep(.md-checkbox-label) {
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
