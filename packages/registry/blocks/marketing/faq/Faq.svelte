<script lang="ts">
  // Moderno block — Faq (Svelte). Copy-paste; edit freely.
  // Frequently-asked-questions section: centered header above a Q&A list. Uses the Accordion
  // primitive + Moderno tokens.
  import { Accordion } from '@moderno/svelte'

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
      answer:
        'Sí, puedes cancelar tu suscripción cuando quieras desde la configuración de tu cuenta, sin penalización.',
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

  let {
    eyebrow = 'Preguntas frecuentes',
    title = '¿Tienes dudas?',
    subtitle = 'Encuentra respuestas a las preguntas más frecuentes.',
    items = DEFAULT_FAQS,
    defaultValue = items[0] ? ['faq-0'] : [],
  }: {
    eyebrow?: string
    title?: string
    subtitle?: string
    items?: FaqItem[]
    defaultValue?: string[]
  } = $props()
</script>

<section class="md-faq">
  <div class="md-faq__header">
    <p class="md-faq__eyebrow">{eyebrow}</p>
    <h2 class="md-faq__title">{title}</h2>
    <p class="md-faq__subtitle">{subtitle}</p>
  </div>
  <div class="md-faq__accordion">
    <Accordion.Root {defaultValue} collapsible>
      {#each items as item, index (item.question)}
        <Accordion.Item value={`faq-${index}`}>
          <Accordion.ItemTrigger>{item.question}</Accordion.ItemTrigger>
          <Accordion.ItemContent>{item.answer}</Accordion.ItemContent>
        </Accordion.Item>
      {/each}
    </Accordion.Root>
  </div>
</section>

<style>
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
