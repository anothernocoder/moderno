<script lang="ts">
  // Moderno block — ProductCard (Svelte). Copy-paste; edit freely.
  // Product tile. Uses the Card + Badge + Button primitives + Moderno tokens.
  import { Card, Badge, Button } from '@moderno/svelte'

  let {
    image,
    title = 'Silla Moderno',
    price = '$320',
    saleText,
    onAdd,
  }: {
    image?: string
    title?: string
    price?: string
    saleText?: string
    onAdd?: () => void
  } = $props()
</script>

<div class="md-product">
  <Card>
    <div class="md-product__media">
      {#if saleText}
        <span class="md-product__sale"><Badge variant="solid">{saleText}</Badge></span>
      {/if}
      <div
        class="md-product__image"
        style:background-image={image ? `url(${image})` : undefined}
      ></div>
    </div>
    <p class="md-product__title">{title}</p>
    <p class="md-product__price">{price}</p>
    {#snippet footer()}
      <Button label="Agregar al carrito" size="md" style="width: 100%" onclick={() => onAdd?.()} />
    {/snippet}
  </Card>
</div>

<style>
  .md-product {
    max-width: 280px;
  }
  .md-product__media {
    position: relative;
    margin: 0 0 12px;
  }
  .md-product__sale {
    position: absolute;
    top: 8px;
    left: 8px;
    z-index: 1;
  }
  .md-product__image {
    aspect-ratio: 1 / 1;
    background-color: var(--md-surface-muted);
    border-bottom: 1px solid var(--md-border-default);
    background-size: cover;
    background-position: center;
  }
  .md-product__title {
    font-size: var(--md-text-body-md);
    color: var(--md-text-primary);
    margin: 0 0 4px;
  }
  .md-product__price {
    font-family: var(--md-font-serif);
    font-size: 20px;
    color: var(--md-text-primary);
    margin: 0;
  }
</style>
