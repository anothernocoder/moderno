import { useId, type ReactNode } from 'react'
import * as dialog from '@zag-js/dialog'
import { useMachine, normalizeProps, Portal } from '@zag-js/react'
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
  children: ReactNode
}

function Root({ defaultOpen, open, onOpenChange, children }: SheetRootProps) {
  const service = useMachine(dialog.machine, {
    id: useId(),
    defaultOpen,
    open,
    onOpenChange: onOpenChange ? (d) => onOpenChange(d.open) : undefined,
  })
  const api = dialog.connect(service, normalizeProps)
  return (
    <SheetProvider value={api}>
      <div className={parts.sheet.root}>{children}</div>
    </SheetProvider>
  )
}

function Trigger({ children }: { children: ReactNode }) {
  const api = useSheet('Trigger')
  return (
    <button {...api.getTriggerProps()} className={cx.button({ variant: 'primary' })}>
      {children}
    </button>
  )
}

export interface SheetContentProps {
  /** Edge the sheet slides in from. @default 'right' */
  side?: SheetSide
  children: ReactNode
}

function Content({ side = 'right', children }: SheetContentProps) {
  const api = useSheet('Content')
  if (!api.open) return null
  return (
    <Portal>
      <div {...api.getBackdropProps()} className={parts.sheet.backdrop} />
      <div {...api.getPositionerProps()} className={parts.sheet.positioner}>
        <div {...api.getContentProps()} className={cx.sheet({ side })}>
          {children}
        </div>
      </div>
    </Portal>
  )
}

function Title({ children }: { children: ReactNode }) {
  const api = useSheet('Title')
  return (
    <h2 {...api.getTitleProps()} className={parts.sheet.title}>
      {children}
    </h2>
  )
}

function Close({ children, closeLabel = 'Close' }: { children?: ReactNode; closeLabel?: string }) {
  const api = useSheet('Close')
  return (
    <button {...api.getCloseTriggerProps()} className={parts.sheet.close} aria-label={closeLabel}>
      {children ?? '✕'}
    </button>
  )
}

/**
 * Compositional Sheet (ADR-0003): a slide-in side/bottom drawer, a variant of
 * Dialog's anatomy over the same Zag `dialog` machine. Parts share one
 * machine via context: Root/Trigger/Content/Title/Close.
 */
export const Sheet = { Root, Trigger, Content, Title, Close }
