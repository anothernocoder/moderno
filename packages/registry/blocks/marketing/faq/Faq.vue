<script setup lang="ts">
// Moderno block — Faq (Vue). Copy-paste; edit freely.
// Frequently-asked-questions section: centered header above a Q&A list. Uses the Accordion
// primitive + Moderno tokens.
import { Accordion } from '@moderno/vue'

export interface FaqItem {
  question: string
  answer: string
}

const DEFAULT_FAQS: FaqItem[] = [
  {
    question: '¿Necesito tarjeta de crédito para empezar?',
    answer: 'No. Puedes probar el plan gratuito sin ingresar ningún método de pago.',
  },
  {
    question: '¿Puedo cancelar en cualquier momento?',
    answer: 'Sí, puedes cancelar tu suscripción cuando quieras desde la configuración de tu cuenta, sin penalización.',
  },
  {
    question: '¿Qué frameworks son compatibles?',
    answer: 'Moderno funciona igual en React, Vue, Svelte y Solid, con la misma API de props.',
  },
  {
    question: '¿Ofrecen soporte técnico?',
    answer: 'Sí, todos los planes incluyen soporte por correo con un tiempo de respuesta menor a 24 horas.',
  },
  {
    question: '¿Mis datos están seguros?',
    answer: 'Usamos cifrado en tránsito y en reposo, y realizamos auditorías de seguridad periódicas.',
  },
]

const props = withDefaults(
  defineProps<{
    eyebrow?: string
    title?: string
    subtitle?: string
    items?: FaqItem[]
    defaultValue?: string[]
  }>(),
  {
    eyebrow: 'Preguntas frecuentes',
    title: '¿Tienes dudas?',
    subtitle: 'Encuentra respuestas a las preguntas más frecuentes.',
  },
)

const items = props.items ?? DEFAULT_FAQS
const defaultValue = props.defaultValue ?? (items[0] ? ['faq-0'] : [])
</script>

<template>
  <section class="md-faq">
    <div class="md-faq__header">
      <p class="md-faq__eyebrow">{{ eyebrow }}</p>
      <h2 class="md-faq__title">{{ title }}</h2>
      <p class="md-faq__subtitle">{{ subtitle }}</p>
    </div>
    <div class="md-faq__accordion">
      <Accordion.Root :defaultValue="defaultValue" collapsible>
        <Accordion.Item v-for="(item, index) in items" :key="item.question" :value="`faq-${index}`">
          <Accordion.ItemTrigger>{{ item.question }}</Accordion.ItemTrigger>
          <Accordion.ItemContent>{{ item.answer }}</Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  </section>
</template>

<style scoped>
.md-faq {
  padding: 96px 24px;
  background: var(--md-surface-base);
}
.md-faq__header {
  text-align: center;
  margin: 0 auto 56px;
  max-width: 640px;
}
.md-faq__eyebrow {
  font-size: var(--md-text-label-sm);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--md-text-secondary);
  margin: 0 0 16px;
}
.md-faq__title {
  font-family: var(--md-font-serif);
  font-size: 36px;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--md-text-primary);
  margin: 0 0 16px;
}
.md-faq__subtitle {
  font-size: var(--md-text-body-lg);
  line-height: var(--md-text-body-lg-lh);
  color: var(--md-text-secondary);
  margin: 0;
}
.md-faq__accordion {
  max-width: 720px;
  margin: 0 auto;
}
</style>
