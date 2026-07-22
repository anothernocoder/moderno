<script setup lang="ts">
// Moderno block — LongFormContent (Vue). Copy-paste; edit freely.
// Case-study / long-read layout: kicker, headline, dek, cover image and
// prose body sections (subheading, paragraphs, pull-quote). Uses
// Moderno tokens only (no primitives).
import { computed } from 'vue'

export interface LongFormSection {
  subheading?: string
  paragraphs: string[]
  pullQuote?: string
}

const props = withDefaults(
  defineProps<{
    kicker?: string
    readingTime?: string
    headline?: string
    dek?: string
    coverImageSrc?: string
    coverImageAlt?: string
    sections?: LongFormSection[]
  }>(),
  {
    kicker: 'Caso de estudio',
    readingTime: '12 min',
    headline: 'Rediseñando el cierre de inventario de Moderno',
    dek: 'Cómo pasamos de un proceso de tres días a una tarde, sin perder trazabilidad contable.',
    coverImageAlt: 'Imagen de portada',
    sections: () => [
      {
        subheading: 'El problema',
        paragraphs: [
          'El cierre mensual dependía de cuatro hojas de cálculo y dos personas que sabían "el truco". Cada diferencia se rastreaba a mano contra el kárdex.',
          'Mapeamos el flujo real con los operarios de bodega y encontramos que el 60% de las diferencias nacía en transferencias sin confirmar.',
        ],
        pullQuote: 'El 80% del tiempo no era contar: era explicar por qué los números no cuadraban.',
      },
    ],
  },
)

const renderedSections = computed(() =>
  props.sections.map((section) => {
    const [firstParagraph, ...restParagraphs] = section.paragraphs
    return { ...section, firstParagraph, restParagraphs }
  }),
)
</script>

<template>
  <article class="md-longform">
    <header>
      <p class="md-longform__kicker">{{ kicker }} · {{ readingTime }}</p>
      <h2 class="md-longform__headline">{{ headline }}</h2>
      <p class="md-longform__dek">{{ dek }}</p>
    </header>
    <img v-if="coverImageSrc" :src="coverImageSrc" :alt="coverImageAlt" class="md-longform__cover" />
    <div v-else class="md-longform__cover md-longform__cover--placeholder" aria-hidden="true" />
    <div v-for="(section, i) in renderedSections" :key="i" class="md-longform__body">
      <h3 v-if="section.subheading" class="md-longform__subheading">{{ section.subheading }}</h3>
      <p v-if="section.firstParagraph" class="md-longform__paragraph">{{ section.firstParagraph }}</p>
      <blockquote v-if="section.pullQuote" class="md-longform__quote">{{ section.pullQuote }}</blockquote>
      <p v-for="(paragraph, j) in section.restParagraphs" :key="j" class="md-longform__paragraph">
        {{ paragraph }}
      </p>
    </div>
  </article>
</template>

<style scoped>
.md-longform {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 42rem;
  margin: 0 auto;
}
.md-longform__kicker {
  font-size: 10px;
  line-height: 14px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--md-text-secondary);
  margin: 0;
}
.md-longform__headline {
  font-family: var(--md-font-serif);
  font-size: var(--md-text-headline-lg);
  line-height: var(--md-text-headline-lg-lh);
  color: var(--md-text-primary);
  margin: 12px 0 0;
}
.md-longform__dek {
  font-size: var(--md-text-body-md);
  line-height: var(--md-text-body-md-lh);
  color: var(--md-text-secondary);
  margin: 12px 0 0;
}
.md-longform__cover {
  display: block;
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.md-longform__cover--placeholder {
  background: var(--md-surface-muted);
}
.md-longform__body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: var(--md-text-body-md);
  line-height: var(--md-text-body-md-lh);
  color: var(--md-text-secondary);
}
.md-longform__subheading {
  font-size: var(--md-text-body-lg);
  line-height: var(--md-text-body-lg-lh);
  color: var(--md-text-primary);
  margin: 0;
}
.md-longform__paragraph {
  margin: 0;
}
.md-longform__quote {
  margin: 0;
  border-left: 2px solid var(--md-primary);
  padding: 4px 0 4px 20px;
  color: var(--md-text-primary);
}
</style>
