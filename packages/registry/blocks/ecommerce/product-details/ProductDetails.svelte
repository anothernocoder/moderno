<script lang="ts">
  // Moderno block — ProductDetails (Svelte). Copy-paste; edit freely.
  // E-commerce product detail page: image gallery, rating, price with compare-at,
  // stock badge, variant selector, quantity stepper and add-to-cart. Uses the
  // Badge + Button + NumberInput primitives + Moderno tokens.
  import { Badge, Button, NumberInput } from '@moderno/svelte'

  export type ProductDetailsStockVariant = 'neutral' | 'solid' | 'success' | 'warning' | 'error' | 'info'

  export interface ProductDetailsAddPayload {
    variant?: string
    quantity: number
  }

  const DEFAULT_IMAGES = ['', '', '']
  const DEFAULT_VARIANTS = ['Roble claro', 'Roble oscuro', 'Nogal']

  function renderStars(rating: number) {
    const filled = Math.round(rating)
    return '★'.repeat(filled) + '☆'.repeat(5 - filled)
  }

  let {
    images = DEFAULT_IMAGES,
    title = 'Silla Roble Nórdica',
    rating = 4.8,
    reviewCount = 132,
    price = '$389.000',
    compareAtPrice = '$460.000',
    saleText = '-15%',
    stockLabel = 'En stock',
    stockVariant = 'success',
    description = 'Silla de comedor en madera de roble macizo con asiento tapizado en lino. Estructura robusta, acabado mate y patas torneadas a mano.',
    variantLabel = 'Acabado',
    variants = DEFAULT_VARIANTS,
    defaultVariant,
    defaultQuantity = 1,
    onAddToCart,
  }: {
    images?: string[]
    title?: string
    rating?: number
    reviewCount?: number
    price?: string
    compareAtPrice?: string
    saleText?: string
    stockLabel?: string
    stockVariant?: ProductDetailsStockVariant
    description?: string
    variantLabel?: string
    variants?: string[]
    defaultVariant?: string
    defaultQuantity?: number
    onAddToCart?: (payload: ProductDetailsAddPayload) => void
  } = $props()

  let activeImage = $state(0)
  let selectedVariant = $state(defaultVariant ?? variants[0])
  let quantity = $state(defaultQuantity)

  function onQuantityChange(_value: string, valueAsNumber: number) {
    quantity = valueAsNumber
  }
</script>

<div class="md-product-details">
  <div>
    <div
      class="md-product-details__hero"
      style={images[activeImage] ? `background-image: url(${images[activeImage]})` : undefined}
    ></div>
    <div class="md-product-details__thumbs">
      {#each images as src, index (index)}
        <button
          type="button"
          class="md-product-details__thumb"
          class:md-product-details__thumb--active={index === activeImage}
          aria-label={`Ver imagen ${index + 1}`}
          aria-pressed={index === activeImage}
          onclick={() => (activeImage = index)}
        >
          <span
            class="md-product-details__thumb-image"
            style={src ? `background-image: url(${src})` : undefined}
          ></span>
        </button>
      {/each}
    </div>
  </div>
  <div class="md-product-details__info">
    {#if saleText}
      <span class="md-product-details__sale"><Badge variant="solid">{saleText}</Badge></span>
    {/if}
    <h1 class="md-product-details__title">{title}</h1>
    <div class="md-product-details__rating">
      <span class="md-product-details__stars" aria-hidden="true">{renderStars(rating)}</span>
      <span class="md-product-details__rating-text">{rating.toFixed(1)} · {reviewCount} reseñas</span>
    </div>
    <div class="md-product-details__price-row">
      <span class="md-product-details__price">{price}</span>
      {#if compareAtPrice}
        <span class="md-product-details__compare">{compareAtPrice}</span>
      {/if}
      <Badge variant={stockVariant} dot>{stockLabel}</Badge>
    </div>
    <p class="md-product-details__description">{description}</p>
    <div class="md-product-details__variant-group">
      <span class="md-product-details__variant-label">{variantLabel}</span>
      <div class="md-product-details__variant-options" role="group" aria-label={variantLabel}>
        {#each variants as variant (variant)}
          <button
            type="button"
            class="md-product-details__variant"
            class:md-product-details__variant--active={variant === selectedVariant}
            aria-pressed={variant === selectedVariant}
            onclick={() => (selectedVariant = variant)}
          >
            {variant}
          </button>
        {/each}
      </div>
    </div>
    <div class="md-product-details__cta">
      <NumberInput label="Cantidad" defaultValue={defaultQuantity} min={1} max={10} onValueChange={onQuantityChange} />
      <Button
        variant="primary"
        size="lg"
        style="width: 100%"
        onclick={() => onAddToCart?.({ variant: selectedVariant, quantity })}
      >
        Agregar al carrito
      </Button>
    </div>
  </div>
</div>

<style>
  .md-product-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 48px;
    max-width: 1040px;
    margin: 0 auto;
    padding: 48px 24px;
    background: var(--md-surface-base);
  }
  .md-product-details__hero {
    aspect-ratio: 1 / 1;
    background: var(--md-surface-muted);
    border: 1px solid var(--md-border-default);
    background-size: cover;
    background-position: center;
  }
  .md-product-details__thumbs {
    display: flex;
    gap: 8px;
    margin-top: 12px;
  }
  .md-product-details__thumb {
    padding: 0;
    background: none;
    border: 1px solid var(--md-border-default);
    cursor: pointer;
  }
  .md-product-details__thumb--active {
    border: 2px solid var(--md-primary);
  }
  .md-product-details__thumb-image {
    display: block;
    width: 64px;
    height: 64px;
    background: var(--md-surface-muted);
    background-size: cover;
    background-position: center;
  }
  .md-product-details__info {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .md-product-details__sale {
    align-self: flex-start;
  }
  .md-product-details__title {
    font-family: var(--md-font-serif);
    font-size: 32px;
    line-height: 1.15;
    color: var(--md-text-primary);
    margin: 0;
  }
  .md-product-details__rating {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .md-product-details__stars {
    color: var(--md-warning);
    letter-spacing: 1px;
  }
  .md-product-details__rating-text {
    font-size: var(--md-text-body-sm);
    color: var(--md-text-secondary);
  }
  .md-product-details__price-row {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }
  .md-product-details__price {
    font-family: var(--md-font-serif);
    font-size: 28px;
    color: var(--md-text-primary);
  }
  .md-product-details__compare {
    font-size: var(--md-text-body-md);
    color: var(--md-text-secondary);
    text-decoration: line-through;
  }
  .md-product-details__description {
    font-size: var(--md-text-body-md);
    line-height: var(--md-text-body-md-lh);
    color: var(--md-text-secondary);
    margin: 0;
  }
  .md-product-details__variant-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .md-product-details__variant-label {
    font-size: var(--md-text-label-sm);
    color: var(--md-text-secondary);
  }
  .md-product-details__variant-options {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  .md-product-details__variant {
    padding: 8px 14px;
    font-size: var(--md-text-body-sm);
    color: var(--md-text-primary);
    background: var(--md-surface-base);
    border: 1px solid var(--md-border-default);
    cursor: pointer;
  }
  .md-product-details__variant--active {
    color: var(--md-on-primary);
    background: var(--md-primary);
    border: 1px solid var(--md-primary);
  }
  .md-product-details__cta {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 8px;
  }
</style>
