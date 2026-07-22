<script lang="ts">
  // Moderno block — EmptyStates (Svelte). Copy-paste; edit freely.
  // Zero-data / first-use empty state: an icon placeholder, a heading, a short
  // description, and a primary "create your first X" CTA. No illustration asset —
  // a bordered icon box, like Features' item icons, consistent with how Moderno's
  // blocks avoid binary image assets. Uses the Button primitive + Moderno tokens.
  import { Button } from '@moderno/svelte'

  let {
    icon = '📭',
    title = 'Aún no tienes elementos',
    description = 'Cuando crees tu primer elemento, aparecerá aquí.',
    actionLabel = 'Crear el primero',
    onAction,
    secondaryLabel,
    secondaryHref,
  }: {
    icon?: string
    title?: string
    description?: string
    actionLabel?: string
    onAction?: () => void
    secondaryLabel?: string
    secondaryHref?: string
  } = $props()
</script>

<section class="md-empty-states">
  <div class="md-empty-states__icon" aria-hidden="true">{icon}</div>
  <h3 class="md-empty-states__title">{title}</h3>
  <p class="md-empty-states__description">{description}</p>
  <div class="md-empty-states__actions">
    <Button onclick={() => onAction?.()}>{actionLabel}</Button>
    {#if secondaryLabel && secondaryHref}
      <a href={secondaryHref} class="md-empty-states__secondary">{secondaryLabel}</a>
    {/if}
  </div>
</section>

<style>
  .md-empty-states {
    padding: 80px 24px;
    text-align: center;
    background: var(--md-surface-base);
  }
  .md-empty-states__icon {
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    font-size: 28px;
    background: var(--md-surface-muted);
    border: 1px solid var(--md-border-default);
  }
  .md-empty-states__title {
    font-family: var(--md-font-serif);
    font-size: 22px;
    line-height: 1.3;
    letter-spacing: -0.01em;
    color: var(--md-text-primary);
    margin: 24px 0 8px;
  }
  .md-empty-states__description {
    font-size: var(--md-text-body-md);
    line-height: var(--md-text-body-md-lh);
    color: var(--md-text-secondary);
    margin: 0 auto 28px;
    max-width: 40ch;
  }
  .md-empty-states__actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
  }
  .md-empty-states__secondary {
    font-size: var(--md-text-body-sm);
    color: var(--md-text-secondary);
    text-decoration: underline;
  }
</style>
