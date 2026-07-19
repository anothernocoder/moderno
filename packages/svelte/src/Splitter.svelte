<script lang="ts">
  import type { Snippet } from 'svelte'
  import * as splitter from '@zag-js/splitter'
  import { useMachine, normalizeProps } from '@zag-js/svelte'
  import { parts } from '@moderno/class-contract'

  export interface SplitterPanelDef {
    /** Unique id for the panel; content is provided via a snippet of the same name. */
    id: string
    /** Minimum size of the panel, as a percentage. */
    minSize?: number | string
    /** Maximum size of the panel, as a percentage. */
    maxSize?: number | string
    /** Whether the panel can be collapsed to `collapsedSize`. */
    collapsible?: boolean
    /** The size of the panel when collapsed. */
    collapsedSize?: number | string
    /** How the panel behaves when the group is resized. */
    resizeBehavior?: 'preserve-relative-size' | 'preserve-pixel-size'
  }

  function defaultResizeTriggerLabel(beforeId: string, afterId: string): string {
    return `Resize ${beforeId} and ${afterId}`
  }

  interface Props {
    panels: SplitterPanelDef[]
    orientation?: 'horizontal' | 'vertical'
    size?: number[]
    defaultSize?: number[]
    onResize?: (size: number[]) => void
    onResizeStart?: () => void
    onResizeEnd?: (size: number[]) => void
    keyboardResizeBy?: number
    resizeTriggerLabel?: (beforeId: string, afterId: string) => string
    /** Panel content: pass one snippet per panel id, e.g. `{#snippet sidebar()}...{/snippet}`. */
    [panelId: string]: unknown
  }

  let {
    panels,
    orientation,
    size,
    defaultSize,
    onResize,
    onResizeStart,
    onResizeEnd,
    keyboardResizeBy,
    resizeTriggerLabel = defaultResizeTriggerLabel,
    ...panelContent
  }: Props = $props()

  const id = $props.id()
  const service = useMachine(splitter.machine, {
    id,
    get panels() {
      return panels.map(({ id, minSize, maxSize, collapsible, collapsedSize, resizeBehavior }) => ({
        id,
        minSize,
        maxSize,
        collapsible,
        collapsedSize,
        resizeBehavior,
      }))
    },
    get orientation() {
      return orientation
    },
    get size() {
      return size
    },
    get defaultSize() {
      return defaultSize
    },
    onResize(d) {
      onResize?.(d.size)
    },
    onResizeStart() {
      onResizeStart?.()
    },
    onResizeEnd(d) {
      onResizeEnd?.(d.size)
    },
    get keyboardResizeBy() {
      return keyboardResizeBy
    },
  })
  const api = $derived(splitter.connect(service, normalizeProps))
</script>

<div {...api.getRootProps()} class={parts.splitter.root}>
  {#each panels as panel, index (panel.id)}
    <div {...api.getPanelProps({ id: panel.id })} class={parts.splitter.panel}>
      {@render (panelContent[panel.id] as Snippet | undefined)?.()}
    </div>
    {#if panels[index + 1]}
      <div
        {...api.getResizeTriggerProps({ id: `${panel.id}:${panels[index + 1].id}` })}
        class={parts.splitter.resizeTrigger}
        aria-label={resizeTriggerLabel(panel.id, panels[index + 1].id)}
      >
        <div
          {...api.getResizeTriggerIndicator({ id: `${panel.id}:${panels[index + 1].id}` })}
          class={parts.splitter.resizeTriggerIndicator}
        ></div>
      </div>
    {/if}
  {/each}
</div>
