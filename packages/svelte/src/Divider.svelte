<script lang="ts">
  let {
    orientation = 'horizontal',
    label,
  }: {
    orientation?: 'horizontal' | 'vertical'
    label?: string
  } = $props()
</script>

{#if label && orientation === 'horizontal'}
  <div class="md-divider-group" role="separator">{label}</div>
{:else}
  <div
    class={`md-divider md-divider--${orientation}`}
    role="separator"
    aria-orientation={orientation === 'vertical' ? 'vertical' : undefined}
  ></div>
{/if}
