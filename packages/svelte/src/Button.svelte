<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLButtonAttributes } from 'svelte/elements'

  let {
    variant = 'primary',
    size = 'md',
    label,
    children,
    ...rest
  }: {
    variant?: 'primary' | 'secondary'
    size?: 'sm' | 'md' | 'lg'
    label?: string
    children?: Snippet
  } & HTMLButtonAttributes = $props()
</script>

<button class={['md-btn', `md-btn--${variant}`, size !== 'md' ? `md-btn--${size}` : ''].filter(Boolean).join(' ')} {...rest}>
  {#if label}{label}{:else}{@render children?.()}{/if}
</button>
