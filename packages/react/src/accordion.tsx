import { useId, type ReactNode } from 'react'
import * as accordion from '@zag-js/accordion'
import { useMachine, normalizeProps } from '@zag-js/react'
import { parts } from '@moderno/class-contract'
import { createPartContext } from './create-part-context'

type AccordionApi = ReturnType<typeof accordion.connect>
const { Provider: AccordionProvider, usePart: useAccordion } = createPartContext<AccordionApi>('Accordion')

interface ItemCtx {
  value: string
  disabled?: boolean
}
const { Provider: ItemProvider, usePart: useItem } = createPartContext<ItemCtx>('Accordion', 'Item')

export interface AccordionRootProps {
  /** Uncontrolled initial expanded items. */
  defaultValue?: string[]
  /** Controlled expanded items. */
  value?: string[]
  /** Allow multiple items open at once. */
  multiple?: boolean
  /** Allow closing an open item. */
  collapsible?: boolean
  onValueChange?: (value: string[]) => void
  children: ReactNode
}

function Root({ defaultValue, value, multiple, collapsible, onValueChange, children }: AccordionRootProps) {
  const service = useMachine(accordion.machine, {
    id: useId(),
    defaultValue,
    value,
    multiple,
    collapsible,
    onValueChange: onValueChange ? (d) => onValueChange(d.value) : undefined,
  })
  const api = accordion.connect(service, normalizeProps)
  return (
    <AccordionProvider value={api}>
      <div {...api.getRootProps()} className={parts.accordion.root}>
        {children}
      </div>
    </AccordionProvider>
  )
}

function Item({ value, disabled, children }: { value: string; disabled?: boolean; children: ReactNode }) {
  const api = useAccordion('Item')
  return (
    <ItemProvider value={{ value, disabled }}>
      <div {...api.getItemProps({ value, disabled })} className={parts.accordion.item}>
        {children}
      </div>
    </ItemProvider>
  )
}

function ItemTrigger({ children }: { children: ReactNode }) {
  const api = useAccordion('ItemTrigger')
  const item = useItem('ItemTrigger')
  return (
    <h3 className={parts.accordion.heading}>
      <button {...api.getItemTriggerProps(item)} className={parts.accordion.trigger}>
        <span className={parts.accordion.triggerText}>{children}</span>
        <span {...api.getItemIndicatorProps(item)} className={parts.accordion.indicator} aria-hidden="true">
          ▾
        </span>
      </button>
    </h3>
  )
}

function ItemContent({ children }: { children: ReactNode }) {
  const api = useAccordion('ItemContent')
  const item = useItem('ItemContent')
  return (
    <div {...api.getItemContentProps(item)} className={parts.accordion.content}>
      {children}
    </div>
  )
}

/** Compositional Accordion (ADR-0003): parts share one Zag machine via context. */
export const Accordion = { Root, Item, ItemTrigger, ItemContent }
