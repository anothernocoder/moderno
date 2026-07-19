import { For, Show, createMemo, createUniqueId, type JSX } from 'solid-js'
import * as splitter from '@zag-js/splitter'
import { useMachine, normalizeProps } from '@zag-js/solid'
import { parts } from '@moderno/class-contract'

export interface SplitterPanelDef {
  /** Unique id for the panel. */
  id: string
  /** Panel content. */
  children: JSX.Element
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

export interface SplitterProps {
  /** The panels to render, in order. */
  panels: SplitterPanelDef[]
  /** @default 'horizontal' */
  orientation?: 'horizontal' | 'vertical'
  /** Controlled sizes of the panels, as percentages. */
  size?: number[]
  /** Uncontrolled initial sizes of the panels, as percentages. */
  defaultSize?: number[]
  onResize?: (size: number[]) => void
  onResizeStart?: () => void
  onResizeEnd?: (size: number[]) => void
  /** Number of pixels to resize a panel by when the keyboard is used. */
  keyboardResizeBy?: number
  /** Accessible label for the resize trigger between two panels. */
  resizeTriggerLabel?: (beforeId: string, afterId: string) => string
}

function defaultResizeTriggerLabel(beforeId: string, afterId: string): string {
  return `Resize ${beforeId} and ${afterId}`
}

/** Closed-prop Splitter (ADR-0003) over the Zag splitter machine. Resizable panes with drag handles. */
export function Splitter(props: SplitterProps) {
  const service = useMachine(splitter.machine, {
    id: createUniqueId(),
    get panels() {
      return props.panels.map(({ id, minSize, maxSize, collapsible, collapsedSize, resizeBehavior }) => ({
        id,
        minSize,
        maxSize,
        collapsible,
        collapsedSize,
        resizeBehavior,
      }))
    },
    get orientation() {
      return props.orientation
    },
    get size() {
      return props.size
    },
    get defaultSize() {
      return props.defaultSize
    },
    onResize: (d) => props.onResize?.(d.size),
    onResizeStart: () => props.onResizeStart?.(),
    onResizeEnd: (d) => props.onResizeEnd?.(d.size),
    get keyboardResizeBy() {
      return props.keyboardResizeBy
    },
  })
  const api = createMemo(() => splitter.connect(service, normalizeProps))
  const label = (beforeId: string, afterId: string) => (props.resizeTriggerLabel ?? defaultResizeTriggerLabel)(beforeId, afterId)

  return (
    <div {...api().getRootProps()} class={parts.splitter.root}>
      <For each={props.panels}>
        {(panel, index) => (
          <>
            <div {...api().getPanelProps({ id: panel.id })} class={parts.splitter.panel}>
              {panel.children}
            </div>
            <Show when={props.panels[index() + 1]}>
              {(next) => (
                <div
                  {...api().getResizeTriggerProps({ id: `${panel.id}:${next().id}` })}
                  class={parts.splitter.resizeTrigger}
                  aria-label={label(panel.id, next().id)}
                >
                  <div
                    {...api().getResizeTriggerIndicator({ id: `${panel.id}:${next().id}` })}
                    class={parts.splitter.resizeTriggerIndicator}
                  />
                </div>
              )}
            </Show>
          </>
        )}
      </For>
    </div>
  )
}
