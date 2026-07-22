<script lang="ts">
  // Moderno block — ProductFeatures (Svelte). Copy-paste; edit freely.
  // Feature-highlight grid for a single product: icon + label + short
  // description per feature (material, warranty, shipping, care). Composes
  // the Card primitive + Moderno tokens. No new primitives, no bespoke
  // interaction logic — purely presentational.
  import { Card } from '@moderno/svelte'

  export type ProductFeatureIcon = 'material' | 'warranty' | 'shipping' | 'care'

  export interface ProductFeatureItem {
    icon?: ProductFeatureIcon
    label: string
    description: string
  }

  interface IconSpec {
    viewBox: string
    paths: string[]
    circles?: { cx: number; cy: number; r: number }[]
  }

  const ICONS: Record<ProductFeatureIcon, IconSpec> = {
    material: {
      viewBox: '0 0 24 24',
      paths: ['M12 3 3 7.5 12 12 21 7.5 12 3Z', 'M3 7.5V16.5L12 21 21 16.5V7.5', 'M12 12V21'],
    },
    warranty: {
      viewBox: '0 0 24 24',
      paths: ['M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3Z', 'M8.5 12.5l2.5 2.5 4.5-5'],
    },
    shipping: {
      viewBox: '0 0 24 24',
      paths: ['M2 7h13v9H2z', 'M15 10h4l3 3v3h-7z'],
      circles: [
        { cx: 7, cy: 18, r: 1.6 },
        { cx: 17, cy: 18, r: 1.6 },
      ],
    },
    care: {
      viewBox: '0 0 24 24',
      paths: ['M12 3c0 0 6 7.2 6 11.2A6 6 0 0 1 6 14.2C6 10.2 12 3 12 3Z'],
    },
  }

  const DEFAULT_FEATURES: ProductFeatureItem[] = [
    {
      icon: 'material',
      label: 'Roble macizo',
      description: 'Estructura en madera de roble macizo con acabado mate, resistente al uso diario.',
    },
    {
      icon: 'warranty',
      label: 'Garantía 2 años',
      description: 'Cobertura completa por defectos de fabricación durante 24 meses.',
    },
    {
      icon: 'shipping',
      label: 'Envío gratis',
      description: 'Envío sin costo en compras desde $250.000 a todo el país.',
    },
    {
      icon: 'care',
      label: 'Fácil mantenimiento',
      description: 'Se limpia con un paño húmedo, sin productos especiales.',
    },
  ]

  let {
    heading = 'Características',
    features = DEFAULT_FEATURES,
  }: {
    heading?: string
    features?: ProductFeatureItem[]
  } = $props()

  function iconSpec(icon?: ProductFeatureIcon): IconSpec {
    return ICONS[icon ?? 'material']
  }
</script>

<section class="md-product-features" aria-label={heading}>
  {#if heading}
    <h2 class="md-product-features__heading">{heading}</h2>
  {/if}
  <div class="md-product-features__grid">
    {#each features as feature, index (feature.label ?? index)}
      {#snippet cardTitle()}
        <span class="md-product-features__title-row">
          <svg
            viewBox={iconSpec(feature.icon).viewBox}
            width="28"
            height="28"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            class="md-product-features__icon"
            aria-hidden="true"
          >
            {#each iconSpec(feature.icon).circles ?? [] as c}
              <circle cx={c.cx} cy={c.cy} r={c.r} />
            {/each}
            {#each iconSpec(feature.icon).paths as d}
              <path {d}></path>
            {/each}
          </svg>
          <span>{feature.label}</span>
        </span>
      {/snippet}
      <Card title={cardTitle}>
        <p class="md-product-features__description">{feature.description}</p>
      </Card>
    {/each}
  </div>
</section>

<style>
  .md-product-features {
    padding: 48px 24px;
    background: var(--md-surface-base);
  }
  .md-product-features__heading {
    font-family: var(--md-font-serif);
    font-size: 28px;
    line-height: 1.15;
    color: var(--md-text-primary);
    text-align: center;
    margin: 0 0 24px;
  }
  .md-product-features__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 24px;
    max-width: 1040px;
    margin: 0 auto;
  }
  .md-product-features__title-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .md-product-features__icon {
    color: var(--md-primary);
    flex-shrink: 0;
  }
  .md-product-features__description {
    font-size: var(--md-text-body-sm);
    line-height: var(--md-text-body-sm-lh);
    color: var(--md-text-secondary);
    margin: 0;
  }
</style>
