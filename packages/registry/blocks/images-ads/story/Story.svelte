<script lang="ts">
  // Moderno block — Story (Svelte). Copy-paste; edit freely.
  // Vertical 9:16 ad / social template. Uses the Button primitive + Moderno tokens.
  import { Button } from '@moderno/svelte'

  let {
    kicker = 'Nueva colección',
    title = 'Diseño que se siente moderno.',
    ctaLabel = 'Comprar ahora',
    onCta,
  }: {
    kicker?: string
    title?: string
    ctaLabel?: string
    onCta?: () => void
  } = $props()
</script>

<section class="md-story">
  <p class="md-story__kicker">{kicker}</p>
  <h1 class="md-story__title">{title}</h1>
  <Button label={ctaLabel} size="lg" style="width: 100%" onclick={() => onCta?.()} />
</section>

<style>
  .md-story {
    aspect-ratio: 9 / 16;
    max-width: 360px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 48px 32px;
    background: var(--md-surface-base);
    border: 1px solid var(--md-border-default);
  }
  .md-story__kicker {
    font-size: var(--md-text-label-md);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--md-text-secondary);
    margin: 0;
  }
  .md-story__title {
    font-family: var(--md-font-serif);
    font-size: 44px;
    line-height: 1.02;
    letter-spacing: -0.02em;
    color: var(--md-text-primary);
    margin: 0;
  }
</style>
