<script setup lang="ts">
// Moderno block — Containers (Vue). Copy-paste; edit freely.
// Page layout wrappers: a set of named max-width + consistent horizontal padding
// containers (narrow, default, wide, full-bleed) for centering page content at different
// widths. Uses the Card + Badge primitives + Moderno tokens — no bespoke interaction logic,
// just layout.
import { Badge, Card } from '@moderno/vue'

interface ContainerVariant {
  id: string
  name: string
  maxWidth: string
  description: string
}

withDefaults(
  defineProps<{
    title?: string
    description?: string
    variants?: ContainerVariant[]
  }>(),
  {
    title: 'Contenedores',
    description:
      'Envoltorios de layout con ancho máximo y padding horizontal consistente para centrar el contenido de la página.',
    variants: () => [
      {
        id: 'narrow',
        name: 'Angosto',
        maxWidth: '640px',
        description: 'Contenido de lectura enfocado: artículos, formularios de un paso, páginas de configuración.',
      },
      {
        id: 'default',
        name: 'Predeterminado',
        maxWidth: '768px',
        description: 'Ancho por defecto para la mayoría de páginas de panel: detalle de registro, ajustes.',
      },
      {
        id: 'wide',
        name: 'Ancho',
        maxWidth: '1024px',
        description: 'Vistas densas en datos: tablas, layouts de varias columnas, dashboards.',
      },
      {
        id: 'full',
        name: 'Completo',
        maxWidth: 'none',
        description: 'De borde a borde; el contenido gestiona su propio espaciado interno.',
      },
    ],
  },
)
</script>

<template>
  <section class="md-containers">
    <div class="md-containers__header">
      <h2 class="md-containers__title">{{ title }}</h2>
      <p v-if="description" class="md-containers__description">{{ description }}</p>
    </div>
    <div
      v-for="(variant, index) in variants"
      :key="variant.id"
      class="md-containers__row"
      :class="{ 'md-containers__row--last': index === variants.length - 1 }"
    >
      <div class="md-containers__meta">
        <p class="md-containers__name">{{ variant.name }}</p>
        <Badge>{{ variant.maxWidth === 'none' ? 'sin límite' : variant.maxWidth }}</Badge>
      </div>
      <p class="md-containers__desc">{{ variant.description }}</p>
      <div class="md-containers__viewport">
        <div class="md-containers__container" :style="{ maxWidth: variant.maxWidth }">
          <Card>
            <template #title>Contenido de la página</template>
            Este bloque se centra dentro del contenedor y conserva un padding horizontal
            consistente en cualquier ancho de viewport.
          </Card>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.md-containers {
  background: var(--md-surface-base);
  border: 1px solid var(--md-border-default);
}
.md-containers__header {
  padding: 20px 24px;
  border-bottom: 1px solid var(--md-border-default);
}
.md-containers__title {
  font-family: var(--md-font-serif);
  font-size: 20px;
  color: var(--md-text-primary);
  margin: 0 0 4px;
}
.md-containers__description {
  font-size: var(--md-text-body-sm);
  color: var(--md-text-secondary);
  margin: 0;
}
.md-containers__row {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px 24px;
  border-bottom: 1px solid var(--md-border-default);
}
.md-containers__row--last {
  border-bottom: none;
}
.md-containers__meta {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
}
.md-containers__name {
  font-size: var(--md-text-body-md);
  font-weight: 500;
  color: var(--md-text-primary);
  margin: 0;
}
.md-containers__desc {
  font-size: var(--md-text-body-sm);
  color: var(--md-text-secondary);
  margin: 0;
  line-height: 1.5;
}
.md-containers__viewport {
  background: var(--md-surface-subtle);
  border: 1px dashed var(--md-border-default);
  padding: 16px;
}
.md-containers__container {
  margin-left: auto;
  margin-right: auto;
  padding: 0 24px;
  box-sizing: border-box;
  width: 100%;
}
</style>
