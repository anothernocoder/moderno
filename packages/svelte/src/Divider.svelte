<script lang="ts">
  import { cx, parts, type DividerOrientation } from '@moderno/class-contract'

  let {
    orientation = 'horizontal',
    label,
  }: {
    orientation?: DividerOrientation
    label?: string
  } = $props()
</script>

{#if label && orientation === 'horizontal'}
  <div class={parts.divider.group} role="separator">{label}</div>
{:else}
  <div
    class={cx.divider({ orientation })}
    role="separator"
    aria-orientation={orientation === 'vertical' ? 'vertical' : undefined}
  ></div>
{/if}
