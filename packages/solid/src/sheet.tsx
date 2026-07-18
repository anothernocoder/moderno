import { Show, createMemo, createUniqueId, type JSX } from 'solid-js'
import { Portal } from 'solid-js/web'
import * as dialog from '@zag-js/dialog'
import { useMachine, normalizeProps } from '@zag-js/solid'
import { cx, parts, type SheetSide } from '@moderno/class-contract'
import { createPartContext } from './create-part-context'

type SheetApi = ReturnType<typeof dialog.connect>
const { Provider: SheetProvider, usePart: useSheet } = createPartContext<SheetApi>('Sheet')

export interface SheetRootProps {
  /** Uncontrolled initial open state. */
  defaultOpen?: boolean
  /** Controlled open state. */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: JSX.Element
}

function Root(props: SheetRootProps) {
  const service = useMachine(dialog.machine, {
    id: createUniqueId(),
    defaultOpen: props.defaultOpen,
    get open() {
      return props.open
    },
    onOpenChange: (d) => props.onOpenChange?.(d.open),
  })
  const api = createMemo(() => dialog.connect(service, normalizeProps))
  return (
    <SheetProvider value={api}>
      <div class={parts.sheet.root}>{props.children}</div>
    </SheetProvider>
  )
}

function Trigger(props: { children: JSX.Element }) {
  const api = useSheet('Trigger')
  return (
    <button {...api().getTriggerProps()} class={cx.button({ variant: 'primary' })}>
      {props.children}
    </button>
  )
}

export interface SheetContentProps {
  /** Edge the sheet slides in from. @default 'right' */
  side?: SheetSide
  children: JSX.Element
}

function Content(props: SheetContentProps) {
  const api = useSheet('Content')
  const side = () => props.side ?? 'right'
  return (
    <Show when={api().open}>
      <Portal>
        <div {...api().getBackdropProps()} class={parts.sheet.backdrop} />
        <div {...api().getPositionerProps()} class={parts.sheet.positioner}>
          <div {...api().getContentProps()} class={cx.sheet({ side: side() })}>
            {props.children}
          </div>
        </div>
      </Portal>
    </Show>
  )
}

function Title(props: { children: JSX.Element }) {
  const api = useSheet('Title')
  return (
    <h2 {...api().getTitleProps()} class={parts.sheet.title}>
      {props.children}
    </h2>
  )
}

function Close(props: { children?: JSX.Element; closeLabel?: string }) {
  const api = useSheet('Close')
  return (
    <button {...api().getCloseTriggerProps()} class={parts.sheet.close} aria-label={props.closeLabel ?? 'Close'}>
      {props.children ?? '✕'}
    </button>
  )
}

/**
 * Compositional Sheet (ADR-0003): a slide-in side/bottom drawer, a variant of
 * Dialog's anatomy over the same Zag `dialog` machine. Parts share one
 * machine via Solid context: Root/Trigger/Content/Title/Close.
 */
export const Sheet = { Root, Trigger, Content, Title, Close }
