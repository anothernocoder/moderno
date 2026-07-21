import type { CSSProperties } from 'react'
import { Accordion } from '@moderno/react'

export interface FaqItem {
  question: string
  answer: string
}

export interface FaqProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  items?: FaqItem[]
  defaultValue?: string[]
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

const sectionStyle: CSSProperties = { padding: '96px 24px', background: 'var(--md-surface-base)' }
const headerStyle: CSSProperties = { textAlign: 'center', margin: '0 auto 56px', maxWidth: '640px' }
const eyebrowStyle: CSSProperties = {
  fontSize: 'var(--md-text-label-sm)',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--md-text-secondary)',
  margin: '0 0 16px',
}
const titleStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: '36px',
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
  color: 'var(--md-text-primary)',
  margin: '0 0 16px',
}
const subtitleStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-lg)',
  lineHeight: 'var(--md-text-body-lg-lh)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}
const accordionWrapStyle: CSSProperties = { maxWidth: '720px', margin: '0 auto' }

/**
 * Moderno block — Faq (React). Copy-paste; edit freely.
 * Frequently-asked-questions section: centered header above a Q&A list. Uses the Accordion
 * primitive + Moderno tokens.
 */
export function Faq({
  eyebrow = 'Preguntas frecuentes',
  title = '¿Tienes dudas?',
  subtitle = 'Encuentra respuestas a las preguntas más frecuentes.',
  items = DEFAULT_FAQS,
  defaultValue = items[0] ? ['faq-0'] : [],
}: FaqProps) {
  return (
    <section style={sectionStyle}>
      <div style={headerStyle}>
        <p style={eyebrowStyle}>{eyebrow}</p>
        <h2 style={titleStyle}>{title}</h2>
        <p style={subtitleStyle}>{subtitle}</p>
      </div>
      <div style={accordionWrapStyle}>
        <Accordion.Root defaultValue={defaultValue} collapsible>
          {items.map((item, index) => (
            <Accordion.Item key={item.question} value={`faq-${index}`}>
              <Accordion.ItemTrigger>{item.question}</Accordion.ItemTrigger>
              <Accordion.ItemContent>{item.answer}</Accordion.ItemContent>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  )
}
