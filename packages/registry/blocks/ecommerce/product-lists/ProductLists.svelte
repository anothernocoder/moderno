<script lang="ts">
  // Moderno block — ProductLists (Svelte). Copy-paste; edit freely.
  // Grid of product tiles with a section heading and simple prev/next
  // pagination. Composes the Card + Badge + Button primitives + Moderno
  // tokens — same tile markup as the ProductCard block, duplicated here so
  // this block stays self-contained. No new primitives, no bespoke
  // interaction logic beyond local page state.
  import { Card, Badge, Button } from '@moderno/svelte'

  export interface ProductListItem {
    id?: string | number
    image?: string
    title?: string
    price?: string
    saleText?: string
  }

  const DEFAULT_PRODUCTS: ProductListItem[] = [
    { id: 'silla-nordica', title: 'Silla Nórdica', price: '$320' },
    { id: 'mesa-roble', title: 'Mesa Roble', price: '$540' },
    { id: 'lampara-arco', title: 'Lámpara de Arco', price: '$128', saleText: '-10%' },
    { id: 'cojin-lino', title: 'Cojín de Lino', price: '$45' },
    { id: 'estante-modular', title: 'Estante Modular', price: '$310' },
    { id: 'silla-escandinava', title: 'Silla Escandinava', price: '$275' },
    { id: 'mesa-auxiliar', title: 'Mesa Auxiliar', price: '$190' },
    { id: 'lampara-piso', title: 'Lámpara de Piso', price: '$210' },
    { id: 'alfombra-tejida', title: 'Alfombra Tejida', price: '$260', saleText: '-20%' },
  ]

  let {
    heading = 'Productos destacados',
    products = DEFAULT_PRODUCTS,
    pageSize = 6,
    prevLabel = 'Anterior',
    nextLabel = 'Siguiente',
    onAdd,
  }: {
    heading?: string
    products?: ProductListItem[]
    pageSize?: number
    prevLabel?: string
    nextLabel?: string
    onAdd?: (product: ProductListItem, index: number) => void
  } = $props()

  let page = $state(0)

  let totalPages = $derived(Math.max(1, Math.ceil(products.length / pageSize)))
  let currentPage = $derived(Math.min(page, totalPages - 1))
  let start = $derived(currentPage * pageSize)
  let visible = $derived(products.slice(start, start + pageSize))
</script>

<section class="md-product-lists" aria-label={heading}>
  {#if heading}
    <h2 class="md-product-lists__heading">{heading}</h2>
  {/if}
  <div class="md-product-lists__grid">
    {#each visible as product, index (product.id ?? start + index)}
      <Card>
        <div class="md-product-lists__media">
          {#if product.saleText}
            <span class="md-product-lists__sale"><Badge variant="solid">{product.saleText}</Badge></span>
          {/if}
          <div
            class="md-product-lists__image"
            style:background-image={product.image ? `url(${product.image})` : undefined}
          ></div>
        </div>
        <p class="md-product-lists__title">{product.title}</p>
        <p class="md-product-lists__price">{product.price}</p>
        {#snippet footer()}
          <Button
            label="Agregar al carrito"
            size="md"
            style="width: 100%"
            onclick={() => onAdd?.(product, start + index)}
          />
        {/snippet}
      </Card>
    {/each}
  </div>
  {#if totalPages > 1}
    <div class="md-product-lists__pagination">
      <Button
        variant="secondary"
        size="md"
        disabled={currentPage === 0}
        onclick={() => (page = currentPage - 1)}
      >
        {prevLabel}
      </Button>
      <span class="md-product-lists__page-indicator" aria-live="polite">
        {currentPage + 1} / {totalPages}
      </span>
      <Button
        variant="secondary"
        size="md"
        disabled={currentPage === totalPages - 1}
        onclick={() => (page = currentPage + 1)}
      >
        {nextLabel}
      </Button>
    </div>
  {/if}
</section>

<style>
  .md-product-lists {
    padding: 48px 24px;
    background: var(--md-surface-base);
  }
  .md-product-lists__heading {
    font-family: var(--md-font-serif);
    font-size: 28px;
    line-height: 1.15;
    color: var(--md-text-primary);
    text-align: center;
    margin: 0 0 24px;
  }
  .md-product-lists__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 24px;
    max-width: 1040px;
    margin: 0 auto;
  }
  .md-product-lists__media {
    position: relative;
    margin: 0 0 12px;
  }
  .md-product-lists__sale {
    position: absolute;
    top: 8px;
    left: 8px;
    z-index: 1;
  }
  .md-product-lists__image {
    aspect-ratio: 1 / 1;
    background-color: var(--md-surface-muted);
    border-bottom: 1px solid var(--md-border-default);
    background-size: cover;
    background-position: center;
  }
  .md-product-lists__title {
    font-size: var(--md-text-body-md);
    color: var(--md-text-primary);
    margin: 0 0 4px;
  }
  .md-product-lists__price {
    font-family: var(--md-font-serif);
    font-size: 20px;
    color: var(--md-text-primary);
    margin: 0;
  }
  .md-product-lists__pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-top: 32px;
  }
  .md-product-lists__page-indicator {
    font-size: var(--md-text-body-sm);
    color: var(--md-text-secondary);
  }
</style>
