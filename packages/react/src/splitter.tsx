import { Fragment, useId, type ReactNode } from 'react'
import * as splitter from '@zag-js/splitter'
import { useMachine, normalizeProps } from '@zag-js/react'
import { parts } from '@moderno/class-contract'

export interface SplitterPanelDef {
  /** Unique id for the panel. */
  id: string
  /** Panel content. */
  children: ReactNode
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
export function Splitter({
  panels,
  orientation,
  size,
  defaultSize,
  onResize,
  onResizeStart,
  onResizeEnd,
  keyboardResizeBy,
  resizeTriggerLabel = defaultResizeTriggerLabel,
}: SplitterProps) {
  const service = useMachine(splitter.machine, {
    id: useId(),
    panels: panels.map(({ id, minSize, maxSize, collapsible, collapsedSize, resizeBehavior }) => ({
      id,
      minSize,
      maxSize,
      collapsible,
      collapsedSize,
      resizeBehavior,
    })),
    orientation,
    size,
    defaultSize,
    onResize: onResize ? (d) => onResize(d.size) : undefined,
    onResizeStart,
    onResizeEnd: onResizeEnd ? (d) => onResizeEnd(d.size) : undefined,
    keyboardResizeBy,
  })
  const api = splitter.connect(service, normalizeProps)

  return (
    <div {...api.getRootProps()} className={parts.splitter.root}>
      {panels.map((panel, index) => {
        const next = panels[index + 1]
        return (
          <Fragment key={panel.id}>
            <div {...api.getPanelProps({ id: panel.id })} className={parts.splitter.panel}>
              {panel.children}
            </div>
            {next ? (
              <div
                {...api.getResizeTriggerProps({ id: `${panel.id}:${next.id}` })}
                className={parts.splitter.resizeTrigger}
                aria-label={resizeTriggerLabel(panel.id, next.id)}
              >
                <div
                  {...api.getResizeTriggerIndicator({ id: `${panel.id}:${next.id}` })}
                  className={parts.splitter.resizeTriggerIndicator}
                />
              </div>
            ) : null}
          </Fragment>
        )
      })}
    </div>
  )
}
