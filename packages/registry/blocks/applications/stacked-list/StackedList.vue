<script setup lang="ts">
// Moderno block — StackedList (Vue). Copy-paste; edit freely.
// Vertically stacked list of records, each rendered as its own card with an
// avatar, primary/secondary text, a status badge, meta, and a row action.
// Uses the Card + Avatar + Badge + Button primitives + Moderno tokens.
import { Avatar, Badge, Button, Card } from '@moderno/vue'

export type StackedListStatusVariant = 'neutral' | 'solid' | 'success' | 'warning' | 'error' | 'info'

export interface StackedListItem {
  id: string
  title: string
  subtitle?: string
  avatarInitials?: string
  avatarSrc?: string
  status?: string
  statusVariant?: StackedListStatusVariant
  meta?: string
}

withDefaults(
  defineProps<{
    items?: StackedListItem[]
  }>(),
  {
    items: () => [
      {
        id: 'TCK-482',
        title: 'No se puede exportar el reporte mensual',
        subtitle: 'Marina Ortiz · Soporte técnico',
        avatarInitials: 'MO',
        status: 'Abierto',
        statusVariant: 'warning',
        meta: 'Hace 12 min',
      },
      {
        id: 'TCK-481',
        title: 'Solicita cambio de plan a Enterprise',
        subtitle: 'Diego Salazar · Facturación',
        avatarInitials: 'DS',
        status: 'Resuelto',
        statusVariant: 'success',
        meta: 'Hace 1 h',
      },
      {
        id: 'TCK-480',
        title: 'Error al iniciar sesión con SSO',
        subtitle: 'Priya Nair · Seguridad',
        avatarInitials: 'PN',
        status: 'Escalado',
        statusVariant: 'error',
        meta: 'Hace 3 h',
      },
    ],
  },
)

const emit = defineEmits<{
  itemAction: [item: StackedListItem]
}>()
</script>

<template>
  <div class="md-stacked-list">
    <Card v-for="item in items" :key="item.id">
      <div class="md-stacked-list__row">
        <Avatar :initials="item.avatarInitials" :src="item.avatarSrc" :alt="item.title" />
        <div class="md-stacked-list__body">
          <p class="md-stacked-list__title">{{ item.title }}</p>
          <p v-if="item.subtitle" class="md-stacked-list__subtitle">{{ item.subtitle }}</p>
        </div>
        <div class="md-stacked-list__trailing">
          <Badge v-if="item.status" :variant="item.statusVariant" dot>{{ item.status }}</Badge>
          <span v-if="item.meta" class="md-stacked-list__meta">{{ item.meta }}</span>
          <Button
            variant="secondary"
            size="sm"
            :aria-label="`Acciones de ${item.title}`"
            @click="emit('itemAction', item)"
          >
            ⋯
          </Button>
        </div>
      </div>
    </Card>
  </div>
</template>

<style scoped>
.md-stacked-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  background: var(--md-surface-base);
}
.md-stacked-list__row {
  display: flex;
  align-items: center;
  gap: 16px;
}
.md-stacked-list__body {
  flex: 1 1 auto;
  min-width: 0;
}
.md-stacked-list__title {
  font-size: var(--md-text-body-md);
  font-weight: 500;
  color: var(--md-text-primary);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.md-stacked-list__subtitle {
  font-size: var(--md-text-body-sm);
  color: var(--md-text-secondary);
  margin: 2px 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.md-stacked-list__trailing {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 12px;
}
.md-stacked-list__meta {
  font-size: var(--md-text-label-sm);
  color: var(--md-text-secondary);
  white-space: nowrap;
}
</style>
