<script setup lang="ts">
// Moderno block — Content (Vue). Copy-paste; edit freely.
// General content/prose section: heading, subtitle, and long-form copy broken into headed
// sections. Uses the Divider primitive + Moderno tokens.
import { Divider } from '@moderno/vue'

export interface ContentSection {
  heading?: string
  body: string[]
}

withDefaults(
  defineProps<{
    kicker?: string
    title?: string
    subtitle?: string
    sections?: ContentSection[]
  }>(),
  {
    kicker: 'Contenido',
    title: 'Escrito para durar, no solo para lanzar',
    subtitle: 'Secciones de contenido largo con jerarquía tipográfica clara, listas para copiar en tu repo.',
    sections: () => [
      {
        heading: 'Diseñado para crecer con tu producto',
        body: [
          'Moderno empieza como un puñado de primitives accesibles y termina siendo el sistema de diseño completo detrás de tu producto. Los tokens --md-* viven en un solo lugar y se comparten entre React, Vue, Svelte y Solid, así que el look no diverge por framework.',
          'Cada componente está construido sobre Zag.js, lo que significa que el comportamiento — estado, teclado, foco, ARIA — es el mismo sin importar en qué framework lo uses.',
        ],
      },
      {
        heading: 'De prototipo a producción sin reescribir',
        body: [
          'Los primitives se instalan como paquetes npm versionados: los arreglos y mejoras de accesibilidad se propagan al centro sin que tengas que tocar tu código.',
          'Los blocks, en cambio, se copian a tu repo con el CLI del registry. Son tuyos desde el primer commit: edítalos, córtalos, combínalos con tus propios componentes.',
        ],
      },
      {
        heading: 'Una sola fuente de verdad para el contenido',
        body: [
          'Este block existe para secciones de contenido largo: páginas "Acerca de", posts de blog, documentación de producto o cualquier copy que necesite jerarquía tipográfica clara sin salir del sistema de diseño.',
        ],
      },
    ],
  },
)
</script>

<template>
  <section class="md-content">
    <div class="md-content__header">
      <p class="md-content__kicker">{{ kicker }}</p>
      <h2 class="md-content__title">{{ title }}</h2>
      <p class="md-content__subtitle">{{ subtitle }}</p>
    </div>
    <div class="md-content__prose">
      <div v-for="(section, index) in sections" :key="section.heading ?? index">
        <Divider v-if="index > 0" />
        <div :class="index > 0 ? 'md-content__section md-content__section--divided' : 'md-content__section'">
          <h3 v-if="section.heading" class="md-content__section-heading">{{ section.heading }}</h3>
          <p v-for="(paragraph, paragraphIndex) in section.body" :key="paragraphIndex" class="md-content__body">
            {{ paragraph }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.md-content {
  padding: 96px 24px;
  background: var(--md-surface-base);
}
.md-content__header {
  text-align: center;
  margin: 0 auto 56px;
  max-width: 640px;
}
.md-content__kicker {
  font-size: var(--md-text-label-sm);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--md-text-secondary);
  margin: 0 0 16px;
}
.md-content__title {
  font-family: var(--md-font-serif);
  font-size: 36px;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--md-text-primary);
  margin: 0 0 16px;
}
.md-content__subtitle {
  font-size: var(--md-text-body-lg);
  line-height: var(--md-text-body-lg-lh);
  color: var(--md-text-secondary);
  margin: 0;
}
.md-content__prose {
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 720px;
  margin: 0 auto;
}
.md-content__section--divided {
  margin-top: 32px;
}
.md-content__section-heading {
  font-family: var(--md-font-serif);
  font-size: 22px;
  color: var(--md-text-primary);
  margin: 0 0 12px;
}
.md-content__body {
  font-size: var(--md-text-body-md);
  line-height: var(--md-text-body-md-lh);
  color: var(--md-text-secondary);
  margin: 0 0 12px;
}
</style>
