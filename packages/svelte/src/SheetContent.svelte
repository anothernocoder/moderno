<script lang="ts">
  import type { Snippet } from 'svelte'
  import { portal } from '@zag-js/svelte'
  import { getSheetContext } from './sheet-context'
  import { cx, parts, type SheetSide } from '@moderno/class-contract'

  let { side = 'right', children }: { side?: SheetSide; children?: Snippet } = $props()
  const api = getSheetContext()
</script>

{#if api().open}
  <div use:portal {...api().getBackdropProps()} class={parts.sheet.backdrop}></div>
  <div use:portal {...api().getPositionerProps()} class={parts.sheet.positioner}>
    <div {...api().getContentProps()} class={cx.sheet({ side })}>{@render children?.()}</div>
  </div>
{/if}
