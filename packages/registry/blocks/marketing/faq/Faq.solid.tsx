import { For, type JSX } from 'solid-js'
import { Accordion } from '@moderno/solid'

export interface FaqItem {
  question: string
  answer: string
}

export interface FaqProps {
  kicker?: string
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

const sectionStyle: JSX.CSSProperties = { padding: '96px 24px', background: 'var(--md-surface-base)' }
const headerStyle: JSX.CSSProperties = { 'text-align': 'center', margin: '0 auto 56px', 'max-width': '640px' }
const kickerStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-label-sm)',
  'letter-spacing': '0.14em',
  'text-transform': 'uppercase',
  color: 'var(--md-text-secondary)',
  margin: '0 0 16px',
}
const titleStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': '36px',
  'line-height': 1.1,
  'letter-spacing': '-0.02em',
  color: 'var(--md-text-primary)',
  margin: '0 0 16px',
}
const subtitleStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-lg)',
  'line-height': 'var(--md-text-body-lg-lh)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}
const accordionWrapStyle: JSX.CSSProperties = { 'max-width': '720px', margin: '0 auto' }

/**
 * Moderno block — Faq (Solid). Copy-paste; edit freely.
 * Frequently-asked-questions section: centered header above a Q&A list. Uses the Accordion
 * primitive + Moderno tokens.
 */
export function Faq(props: FaqProps) {
  const kicker = () => props.kicker ?? 'Preguntas frecuentes'
  const title = () => props.title ?? '¿Tienes dudas?'
  const subtitle = () => props.subtitle ?? 'Encuentra respuestas a las preguntas más frecuentes.'
  const items = () => props.items ?? DEFAULT_FAQS
  const defaultValue = () => props.defaultValue ?? (items()[0] ? ['faq-0'] : [])

  return (
    <section style={sectionStyle}>
      <div style={headerStyle}>
        <p style={kickerStyle}>{kicker()}</p>
        <h2 style={titleStyle}>{title()}</h2>
        <p style={subtitleStyle}>{subtitle()}</p>
      </div>
      <div style={accordionWrapStyle}>
        <Accordion.Root defaultValue={defaultValue()} collapsible>
          <For each={items()}>
            {(item, index) => (
              <Accordion.Item value={`faq-${index()}`}>
                <Accordion.ItemTrigger>{item.question}</Accordion.ItemTrigger>
                <Accordion.ItemContent>{item.answer}</Accordion.ItemContent>
              </Accordion.Item>
            )}
          </For>
        </Accordion.Root>
      </div>
    </section>
  )
}
