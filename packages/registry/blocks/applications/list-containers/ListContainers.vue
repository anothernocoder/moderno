<script setup lang="ts">
// Moderno block — List containers (Vue). Copy-paste; edit freely.
// A specialized container for lists: a fixed header, a scrollable body (overflow-y: auto
// on a bounded-height wrapper) holding the row items, and a footer with a summary + action.
// Uses the Avatar + Badge + Button + Divider primitives + Moderno tokens — no bespoke
// interaction logic, just layout.
import { Avatar, Badge, Button, Divider } from '@moderno/vue'

type ListContainerItemStatusVariant = 'neutral' | 'solid' | 'success' | 'warning' | 'error' | 'info'

interface ListContainerItem {
  id: string
  title: string
  subtitle?: string
  meta?: string
  avatarSrc?: string
  avatarInitials?: string
  status?: string
  statusVariant?: ListContainerItemStatusVariant
}

withDefaults(
  defineProps<{
    title?: string
    description?: string
    items?: ListContainerItem[]
    /** CSS `max-height` for the scrollable body, e.g. `'280px'`. */
    maxBodyHeight?: string
    footerLabel?: string
  }>(),
  {
    title: 'Tareas del sprint',
    description: 'Pendientes del equipo, ordenadas por fecha de vencimiento.',
    maxBodyHeight: '280px',
    footerLabel: 'Ver todas las tareas',
    items: () => [
      { id: '1', title: 'Diseñar el flujo de onboarding', subtitle: 'Producto', meta: 'Vence hoy', status: 'En curso', statusVariant: 'info' },
      { id: '2', title: 'Revisar copy de checkout', subtitle: 'Contenido', meta: 'Vence mañana', status: 'Pendiente', statusVariant: 'warning' },
      { id: '3', title: 'Migrar tokens de color', subtitle: 'Diseño', meta: 'Hace 1 d', status: 'Completada', statusVariant: 'success' },
      { id: '4', title: 'Auditoría de accesibilidad', subtitle: 'QA', meta: 'Hace 2 d', status: 'Bloqueada', statusVariant: 'error' },
      { id: '5', title: 'Actualizar guía de marca', subtitle: 'Marketing', meta: 'Hace 3 d', status: 'Completada', statusVariant: 'success' },
      { id: '6', title: 'Preparar demo de release', subtitle: 'Producto', meta: 'Hace 4 d', status: 'En curso', statusVariant: 'info' },
    ],
  },
)

defineEmits<{ footerAction: [] }>()
</script>

<template>
  <section class="md-list-containers">
    <div class="md-list-containers__header">
      <h2 class="md-list-containers__title">{{ title }}</h2>
      <p v-if="description" class="md-list-containers__description">{{ description }}</p>
    </div>
    <div class="md-list-containers__body" :style="{ maxHeight: maxBodyHeight }">
      <template v-for="(item, index) in items" :key="item.id">
        <div class="md-list-containers__row">
          <Avatar :src="item.avatarSrc" :initials="item.avatarInitials" :alt="item.title" size="md" />
          <div class="md-list-containers__text">
            <p class="md-list-containers__item-title">{{ item.title }}</p>
            <p v-if="item.subtitle" class="md-list-containers__subtitle">{{ item.subtitle }}</p>
          </div>
          <Badge v-if="item.status" :variant="item.statusVariant" dot>{{ item.status }}</Badge>
          <span v-if="item.meta" class="md-list-containers__meta">{{ item.meta }}</span>
        </div>
        <Divider v-if="index < items.length - 1" />
      </template>
    </div>
    <div class="md-list-containers__footer">
      <p class="md-list-containers__footer-meta">{{ items.length }} tareas</p>
      <Button variant="secondary" size="sm" @click="$emit('footerAction')">{{ footerLabel }}</Button>
    </div>
  </section>
</template>

<style scoped>
.md-list-containers {
  display: flex;
  flex-direction: column;
  background: var(--md-surface-base);
  border: 1px solid var(--md-border-default);
}
.md-list-containers__header {
  padding: 20px 24px;
  border-bottom: 1px solid var(--md-border-default);
}
.md-list-containers__title {
  font-family: var(--md-font-serif);
  font-size: 20px;
  color: var(--md-text-primary);
  margin: 0 0 4px;
}
.md-list-containers__description {
  font-size: var(--md-text-body-sm);
  color: var(--md-text-secondary);
  margin: 0;
}
.md-list-containers__body {
  overflow-y: auto;
}
.md-list-containers__row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
}
.md-list-containers__text {
  flex: 1;
  min-width: 0;
}
.md-list-containers__item-title {
  margin: 0;
  font-size: var(--md-text-body-sm);
  font-weight: 500;
  color: var(--md-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.md-list-containers__subtitle {
  margin: 0;
  font-size: var(--md-text-label-sm);
  color: var(--md-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.md-list-containers__meta {
  font-size: var(--md-text-label-sm);
  color: var(--md-text-secondary);
  white-space: nowrap;
}
.md-list-containers__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 24px;
  border-top: 1px solid var(--md-border-default);
}
.md-list-containers__footer-meta {
  font-size: var(--md-text-label-sm);
  color: var(--md-text-secondary);
  margin: 0;
}
</style>
