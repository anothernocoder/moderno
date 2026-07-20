import { Card, Badge, Button, Divider } from '@moderno/solid'
import { For, Show } from 'solid-js'
import type { JSX } from 'solid-js'

export interface PricingPlan {
  name: string
  price: string
  period?: string
  description?: string
  features: string[]
  ctaLabel?: string
  featured?: boolean
}

export interface PricingProps {
  kicker?: string
  title?: string
  subtitle?: string
  plans?: PricingPlan[]
  onSelect?: (plan: PricingPlan) => void
}

const defaultPlans: PricingPlan[] = [
  {
    name: 'Starter',
    price: '$0',
    period: '/mes',
    description: 'Para probar Moderno en un proyecto personal.',
    features: ['1 proyecto', 'Componentes core', 'Soporte por comunidad'],
    ctaLabel: 'Empezar gratis',
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/mes',
    description: 'Para equipos que construyen producto en serio.',
    features: ['Proyectos ilimitados', 'Todos los primitives', 'Blocks del registry', 'Soporte prioritario'],
    ctaLabel: 'Probar Pro',
    featured: true,
  },
  {
    name: 'Empresa',
    price: 'A medida',
    description: 'Para organizaciones con requisitos de seguridad y soporte dedicados.',
    features: ['Todo lo de Pro', 'SSO y auditoría', 'SLA dedicado', 'Onboarding asistido'],
    ctaLabel: 'Hablar con ventas',
  },
]

/**
 * Moderno block — Pricing (Solid). Copy-paste; edit freely.
 * Plan comparison section. Uses the Card + Badge + Button + Divider primitives + Moderno tokens.
 */
export function Pricing(props: PricingProps) {
  const kicker = () => props.kicker ?? 'Precios'
  const title = () => props.title ?? 'Un plan para cada etapa'
  const subtitle = () => props.subtitle ?? 'Empieza gratis y crece sin cambiar de sistema de diseño.'
  const plans = () => props.plans ?? defaultPlans

  const priceStyle: JSX.CSSProperties = {
    'font-family': 'var(--md-font-serif)',
    'font-size': '32px',
    color: 'var(--md-text-primary)',
    margin: '0 0 4px',
  }

  return (
    <section style={{ padding: '96px 24px', background: 'var(--md-surface-base)' }}>
      <div style={{ 'text-align': 'center', margin: '0 auto 56px', 'max-width': '640px' }}>
        <p
          style={{
            'font-size': 'var(--md-text-label-sm)',
            'letter-spacing': '0.14em',
            'text-transform': 'uppercase',
            color: 'var(--md-text-secondary)',
            margin: '0 0 16px',
          }}
        >
          {kicker()}
        </p>
        <h2
          style={{
            'font-family': 'var(--md-font-serif)',
            'font-size': '36px',
            'line-height': 1.1,
            'letter-spacing': '-0.02em',
            color: 'var(--md-text-primary)',
            margin: '0 0 16px',
          }}
        >
          {title()}
        </h2>
        <p
          style={{
            'font-size': 'var(--md-text-body-lg)',
            'line-height': 'var(--md-text-body-lg-lh)',
            color: 'var(--md-text-secondary)',
            margin: 0,
          }}
        >
          {subtitle()}
        </p>
      </div>
      <div
        style={{
          display: 'grid',
          'grid-template-columns': 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
          'max-width': '1040px',
          margin: '0 auto',
        }}
      >
        <For each={plans()}>
          {(plan) => (
            <div style={{ position: 'relative' }}>
              <Show when={plan.featured}>
                <span
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    'z-index': 1,
                  }}
                >
                  <Badge variant="solid">Popular</Badge>
                </span>
              </Show>
              <Card
                title={plan.name}
                footer={
                  <Button
                    label={plan.ctaLabel ?? 'Elegir plan'}
                    size="md"
                    variant={plan.featured ? 'primary' : 'secondary'}
                    onClick={() => props.onSelect?.(plan)}
                    style={{ width: '100%' }}
                  />
                }
              >
                <p style={priceStyle}>
                  {plan.price}
                  <Show when={plan.period}>
                    <span style={{ 'font-size': 'var(--md-text-body-md)', color: 'var(--md-text-secondary)' }}>
                      {' '}
                      {plan.period}
                    </span>
                  </Show>
                </p>
                <Show when={plan.description}>
                  <p style={{ 'font-size': 'var(--md-text-body-sm)', color: 'var(--md-text-secondary)', margin: '0 0 16px' }}>
                    {plan.description}
                  </p>
                </Show>
                <Divider />
                <ul style={{ 'list-style': 'none', padding: 0, margin: '16px 0 0', display: 'flex', 'flex-direction': 'column', gap: '8px' }}>
                  <For each={plan.features}>
                    {(feature) => (
                      <li style={{ 'font-size': 'var(--md-text-body-sm)', color: 'var(--md-text-primary)' }}>{feature}</li>
                    )}
                  </For>
                </ul>
              </Card>
            </div>
          )}
        </For>
      </div>
    </section>
  )
}
