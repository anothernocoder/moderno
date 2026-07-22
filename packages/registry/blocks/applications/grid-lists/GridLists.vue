<script setup lang="ts">
// Moderno block — GridLists (Vue). Copy-paste; edit freely.
// Responsive grid of item cards: thumbnail/icon, title, subtitle, and status badge with an
// action. Uses the Card + Avatar + Badge + Button primitives + Moderno tokens.
import { Card, Avatar, Badge, Button } from '@moderno/vue'

type GridListStatusVariant = 'neutral' | 'solid' | 'success' | 'warning' | 'error' | 'info'

interface GridListItem {
  id: string
  title: string
  subtitle?: string
  image?: string
  initials?: string
  status?: string
  statusVariant?: GridListStatusVariant
}

withDefaults(
  defineProps<{
    items?: GridListItem[]
  }>(),
  {
    items: () => [
      { id: '1', title: 'Rediseño de checkout', subtitle: 'Equipo de Producto', initials: 'RC', status: 'En curso', statusVariant: 'info' },
      { id: '2', title: 'Migración a Vue 3', subtitle: 'Equipo de Plataforma', initials: 'MV', status: 'Completado', statusVariant: 'success' },
      { id: '3', title: 'Campaña de verano', subtitle: 'Equipo de Marketing', initials: 'CV', status: 'Pausado', statusVariant: 'warning' },
      { id: '4', title: 'API de pagos v2', subtitle: 'Equipo de Backend', initials: 'AP', status: 'En curso', statusVariant: 'info' },
      { id: '5', title: 'Rebranding', subtitle: 'Equipo de Diseño', initials: 'RB', status: 'Bloqueado', statusVariant: 'error' },
      { id: '6', title: 'Onboarding móvil', subtitle: 'Equipo de Producto', initials: 'OM', status: 'Completado', statusVariant: 'success' },
    ],
  },
)

const emit = defineEmits<{
  'item-action': [item: GridListItem]
}>()
</script>

<template>
  <section class="md-grid-lists">
    <Card v-for="item in items" :key="item.id">
      <div class="md-grid-lists__head">
        <Avatar :src="item.image" :initials="item.initials" shape="square" size="lg" />
        <div>
          <p class="md-grid-lists__title">{{ item.title }}</p>
          <p v-if="item.subtitle" class="md-grid-lists__subtitle">{{ item.subtitle }}</p>
        </div>
      </div>
      <Badge v-if="item.status" :variant="item.statusVariant" dot>{{ item.status }}</Badge>
      <template #footer>
        <Button variant="secondary" size="sm" style="width: 100%" @click="emit('item-action', item)">
          Ver detalle
        </Button>
      </template>
    </Card>
  </section>
</template>

<style scoped>
.md-grid-lists {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  padding: 24px;
  background: var(--md-surface-base);
}
.md-grid-lists__head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}
.md-grid-lists__title {
  font-size: var(--md-text-body-md);
  color: var(--md-text-primary);
  font-weight: 500;
  margin: 0;
}
.md-grid-lists__subtitle {
  font-size: var(--md-text-body-sm);
  color: var(--md-text-secondary);
  margin: 4px 0 0;
}
</style>
