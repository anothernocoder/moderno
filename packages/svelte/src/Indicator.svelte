<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    variant = 'neutral',
    pulse,
    children,
  }: {
    variant?: 'neutral' | 'success' | 'warning' | 'error' | 'info'
    pulse?: boolean
    children?: Snippet
  } = $props()

  const cls = $derived(
    ['md-indicator', `md-indicator--${variant}`, pulse ? 'md-indicator--pulse' : ''].filter(Boolean).join(' '),
  )
</script>

<span class={cls}>
  <span class="md-indicator__dot"></span>
  {@render children?.()}
</span>
