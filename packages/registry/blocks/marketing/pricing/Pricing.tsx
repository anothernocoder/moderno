import { Card, Badge, Button, Divider } from '@moderno/react'

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
 * Moderno block — Pricing (React). Copy-paste; edit freely.
 * Plan comparison section. Uses the Card + Badge + Button + Divider primitives + Moderno tokens.
 */
export function Pricing({
  kicker = 'Precios',
  title = 'Un plan para cada etapa',
  subtitle = 'Empieza gratis y crece sin cambiar de sistema de diseño.',
  plans = defaultPlans,
  onSelect,
}: PricingProps) {
  return (
    <section style={{ padding: '96px 24px', background: 'var(--md-surface-base)' }}>
      <div style={{ textAlign: 'center', margin: '0 auto 56px', maxWidth: '640px' }}>
        <p
          style={{
            fontSize: 'var(--md-text-label-sm)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--md-text-secondary)',
            margin: '0 0 16px',
          }}
        >
          {kicker}
        </p>
        <h2
          style={{
            fontFamily: 'var(--md-font-serif)',
            fontSize: '36px',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: 'var(--md-text-primary)',
            margin: '0 0 16px',
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontSize: 'var(--md-text-body-lg)',
            lineHeight: 'var(--md-text-body-lg-lh)',
            color: 'var(--md-text-secondary)',
            margin: 0,
          }}
        >
          {subtitle}
        </p>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
          maxWidth: '1040px',
          margin: '0 auto',
        }}
      >
        {plans.map((plan) => (
          <div key={plan.name} style={{ position: 'relative' }}>
            {plan.featured ? (
              <span
                style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 1,
                }}
              >
                <Badge variant="solid">Popular</Badge>
              </span>
            ) : null}
            <Card
              title={plan.name}
              footer={
                <Button
                  label={plan.ctaLabel ?? 'Elegir plan'}
                  size="md"
                  variant={plan.featured ? 'primary' : 'secondary'}
                  onClick={() => onSelect?.(plan)}
                  style={{ width: '100%' }}
                />
              }
            >
              <p
                style={{
                  fontFamily: 'var(--md-font-serif)',
                  fontSize: '32px',
                  color: 'var(--md-text-primary)',
                  margin: '0 0 4px',
                }}
              >
                {plan.price}
                {plan.period ? (
                  <span style={{ fontSize: 'var(--md-text-body-md)', color: 'var(--md-text-secondary)' }}>
                    {' '}
                    {plan.period}
                  </span>
                ) : null}
              </p>
              {plan.description ? (
                <p style={{ fontSize: 'var(--md-text-body-sm)', color: 'var(--md-text-secondary)', margin: '0 0 16px' }}>
                  {plan.description}
                </p>
              ) : null}
              <Divider />
              <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {plan.features.map((feature) => (
                  <li key={feature} style={{ fontSize: 'var(--md-text-body-sm)', color: 'var(--md-text-primary)' }}>
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        ))}
      </div>
    </section>
  )
}
