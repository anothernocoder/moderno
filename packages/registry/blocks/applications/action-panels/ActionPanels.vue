<script setup lang="ts">
// Moderno block — ActionPanels (Vue). Copy-paste; edit freely.
// Settings/account panel list: title + description on the left, a single action on the
// right, with an optional "destructive" (danger-zone) style. Uses the Card + Button +
// Divider primitives + Moderno tokens.
import { Button, Card, Divider } from '@moderno/vue'

interface ActionPanelItem {
  title: string
  description: string
  actionLabel: string
  /** Danger-zone styling: colors the title and action with the error token. */
  destructive?: boolean
}

withDefaults(
  defineProps<{
    items?: ActionPanelItem[]
  }>(),
  {
    items: () => [
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
    ],
  },
)

const emit = defineEmits<{ action: [item: ActionPanelItem] }>()
</script>

<template>
  <Card>
    <template v-for="(item, index) in items" :key="item.title">
      <Divider v-if="index > 0" />
      <div class="md-action-panels__row">
        <div class="md-action-panels__text">
          <h3 :class="['md-action-panels__title', { 'md-action-panels__title--destructive': item.destructive }]">
            {{ item.title }}
          </h3>
          <p class="md-action-panels__description">{{ item.description }}</p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          :style="item.destructive ? { borderColor: 'var(--md-error)', color: 'var(--md-error)' } : undefined"
          @click="emit('action', item)"
        >
          {{ item.actionLabel }}
        </Button>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.md-action-panels__row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}
.md-action-panels__text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 520px;
}
.md-action-panels__title {
  margin: 0;
  font-size: var(--md-text-body-md);
  font-weight: 600;
  color: var(--md-text-primary);
}
.md-action-panels__title--destructive {
  color: var(--md-error);
}
.md-action-panels__description {
  margin: 0;
  font-size: var(--md-text-body-sm);
  line-height: var(--md-text-body-sm-lh);
  color: var(--md-text-secondary);
}
</style>
