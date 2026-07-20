<script lang="ts">
  // Moderno block — Pricing (Svelte). Copy-paste; edit freely.
  // Plan comparison section. Uses the Card + Badge + Button + Divider primitives + Moderno tokens.
  import { Card, Badge, Button, Divider } from '@moderno/svelte'

  export interface PricingPlan {
    name: string
    price: string
    period?: string
    description?: string
    features: string[]
    ctaLabel?: string
    featured?: boolean
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

  let {
    kicker = 'Precios',
    title = 'Un plan para cada etapa',
    subtitle = 'Empieza gratis y crece sin cambiar de sistema de diseño.',
    plans = defaultPlans,
    onSelect,
  }: {
    kicker?: string
    title?: string
    subtitle?: string
    plans?: PricingPlan[]
    onSelect?: (plan: PricingPlan) => void
  } = $props()
</script>

<section class="md-pricing">
  <div class="md-pricing__header">
    <p class="md-pricing__kicker">{kicker}</p>
    <h2 class="md-pricing__title">{title}</h2>
    <p class="md-pricing__subtitle">{subtitle}</p>
  </div>
  <div class="md-pricing__grid">
    {#each plans as plan (plan.name)}
      <div class="md-pricing__plan">
        {#if plan.featured}
          <span class="md-pricing__badge"><Badge variant="solid">Popular</Badge></span>
        {/if}
        <Card>
          {#snippet title()}{plan.name}{/snippet}
          <p class="md-pricing__price">
            {plan.price}
            {#if plan.period}<span class="md-pricing__period"> {plan.period}</span>{/if}
          </p>
          {#if plan.description}<p class="md-pricing__description">{plan.description}</p>{/if}
          <Divider />
          <ul class="md-pricing__features">
            {#each plan.features as feature (feature)}
              <li>{feature}</li>
            {/each}
          </ul>
          {#snippet footer()}
            <Button
              label={plan.ctaLabel ?? 'Elegir plan'}
              size="md"
              variant={plan.featured ? 'primary' : 'secondary'}
              style="width: 100%"
              onclick={() => onSelect?.(plan)}
            />
          {/snippet}
        </Card>
      </div>
    {/each}
  </div>
</section>

<style>
  .md-pricing {
    padding: 96px 24px;
    background: var(--md-surface-base);
  }
  .md-pricing__header {
    text-align: center;
    margin: 0 auto 56px;
    max-width: 640px;
  }
  .md-pricing__kicker {
    font-size: var(--md-text-label-sm);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--md-text-secondary);
    margin: 0 0 16px;
  }
  .md-pricing__title {
    font-family: var(--md-font-serif);
    font-size: 36px;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: var(--md-text-primary);
    margin: 0 0 16px;
  }
  .md-pricing__subtitle {
    font-size: var(--md-text-body-lg);
    line-height: var(--md-text-body-lg-lh);
    color: var(--md-text-secondary);
    margin: 0;
  }
  .md-pricing__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 24px;
    max-width: 1040px;
    margin: 0 auto;
  }
  .md-pricing__plan {
    position: relative;
  }
  .md-pricing__badge {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
  }
  .md-pricing__price {
    font-family: var(--md-font-serif);
    font-size: 32px;
    color: var(--md-text-primary);
    margin: 0 0 4px;
  }
  .md-pricing__period {
    font-size: var(--md-text-body-md);
    color: var(--md-text-secondary);
  }
  .md-pricing__description {
    font-size: var(--md-text-body-sm);
    color: var(--md-text-secondary);
    margin: 0 0 16px;
  }
  .md-pricing__features {
    list-style: none;
    padding: 0;
    margin: 16px 0 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: var(--md-text-body-sm);
    color: var(--md-text-primary);
  }
</style>
