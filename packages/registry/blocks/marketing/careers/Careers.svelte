<script lang="ts">
  // Moderno block — Careers (Svelte). Copy-paste; edit freely.
  // Jobs/openings section: a list of open roles with title, location, and apply CTA.
  // Uses the Badge + Button + Divider primitives + Moderno tokens.
  import { Badge, Button, Divider } from '@moderno/svelte'

  export interface CareerRole {
    title: string
    location: string
    department?: string
    type?: string
    applyLabel?: string
  }

  const DEFAULT_ROLES: CareerRole[] = [
    {
      title: 'Ingeniera/o de Producto Senior',
      location: 'Remoto (LatAm)',
      department: 'Ingeniería',
      type: 'Tiempo completo',
    },
    {
      title: 'Diseñadora/or de Producto',
      location: 'Remoto',
      department: 'Diseño',
      type: 'Tiempo completo',
    },
    {
      title: 'Developer Advocate',
      location: 'Remoto',
      department: 'Marketing',
      type: 'Tiempo completo',
    },
    {
      title: 'Ingeniera/o de Soporte',
      location: 'Remoto (LatAm)',
      department: 'Soporte',
      type: 'Medio tiempo',
    },
  ]

  let {
    kicker = 'Carreras',
    title = 'Construye el futuro de Moderno con nosotros',
    subtitle = 'Buscamos personas curiosas para un equipo pequeño y remoto.',
    roles = DEFAULT_ROLES,
    onApply,
  }: {
    kicker?: string
    title?: string
    subtitle?: string
    roles?: CareerRole[]
    onApply?: (role: CareerRole) => void
  } = $props()
</script>

<section class="md-careers">
  <div class="md-careers__header">
    <p class="md-careers__kicker">{kicker}</p>
    <h2 class="md-careers__title">{title}</h2>
    <p class="md-careers__subtitle">{subtitle}</p>
  </div>
  <div class="md-careers__list">
    {#each roles as role, index (role.title)}
      <div>
        {#if index > 0}<Divider />{/if}
        <div class="md-careers__row">
          <div>
            <h3 class="md-careers__role-title">{role.title}</h3>
            <div class="md-careers__meta">
              <Badge>{role.location}</Badge>
              {#if role.department}<Badge>{role.department}</Badge>{/if}
              {#if role.type}<Badge>{role.type}</Badge>{/if}
            </div>
          </div>
          <Button label={role.applyLabel ?? 'Aplicar'} variant="secondary" onclick={() => onApply?.(role)} />
        </div>
      </div>
    {/each}
  </div>
</section>

<style>
  .md-careers {
    padding: 96px 24px;
    background: var(--md-surface-base);
  }
  .md-careers__header {
    text-align: center;
    margin: 0 auto 56px;
    max-width: 640px;
  }
  .md-careers__kicker {
    font-size: var(--md-text-label-sm);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--md-text-secondary);
    margin: 0 0 16px;
  }
  .md-careers__title {
    font-family: var(--md-font-serif);
    font-size: 36px;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: var(--md-text-primary);
    margin: 0 0 16px;
  }
  .md-careers__subtitle {
    font-size: var(--md-text-body-lg);
    line-height: var(--md-text-body-lg-lh);
    color: var(--md-text-secondary);
    margin: 0;
  }
  .md-careers__list {
    max-width: 760px;
    margin: 0 auto;
    border: 1px solid var(--md-border-default);
    background: var(--md-surface-raised);
  }
  .md-careers__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    padding: 24px;
  }
  .md-careers__role-title {
    font-family: var(--md-font-serif);
    font-size: 20px;
    color: var(--md-text-primary);
    margin: 0 0 8px;
  }
  .md-careers__meta {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
</style>
