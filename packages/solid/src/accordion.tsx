import { createMemo, createUniqueId, type JSX } from 'solid-js'
import * as accordion from '@zag-js/accordion'
import { useMachine, normalizeProps } from '@zag-js/solid'
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
  defaultValue?: string[]
  value?: string[]
  multiple?: boolean
  collapsible?: boolean
  onValueChange?: (value: string[]) => void
  children: JSX.Element
}

function Root(props: AccordionRootProps) {
  const service = useMachine(accordion.machine, {
    id: createUniqueId(),
    get defaultValue() {
      return props.defaultValue
    },
    get value() {
      return props.value
    },
    get multiple() {
      return props.multiple
    },
    get collapsible() {
      return props.collapsible
    },
    onValueChange: (d) => props.onValueChange?.(d.value),
  })
  const api = createMemo(() => accordion.connect(service, normalizeProps))
  return (
    <AccordionProvider value={api}>
      <div {...api().getRootProps()} class={parts.accordion.root}>
        {props.children}
      </div>
    </AccordionProvider>
  )
}

function Item(props: { value: string; disabled?: boolean; children: JSX.Element }) {
  const api = useAccordion('Item')
  const item = () => ({ value: props.value, disabled: props.disabled })
  return (
    <ItemProvider value={item}>
      <div {...api().getItemProps(item())} class={parts.accordion.item}>
        {props.children}
      </div>
    </ItemProvider>
  )
}

function ItemTrigger(props: { children: JSX.Element }) {
  const api = useAccordion('ItemTrigger')
  const item = useItem('ItemTrigger')
  return (
    <h3 class={parts.accordion.heading}>
      <button {...api().getItemTriggerProps(item())} class={parts.accordion.trigger}>
        <span class={parts.accordion.triggerText}>{props.children}</span>
        <span {...api().getItemIndicatorProps(item())} class={parts.accordion.indicator} aria-hidden="true">
          ▾
        </span>
      </button>
    </h3>
  )
}

function ItemContent(props: { children: JSX.Element }) {
  const api = useAccordion('ItemContent')
  const item = useItem('ItemContent')
  return (
    <div {...api().getItemContentProps(item())} class={parts.accordion.content}>
      {props.children}
    </div>
  )
}

/** Compositional Accordion (ADR-0003): parts share one Zag machine via Solid context. */
export const Accordion = { Root, Item, ItemTrigger, ItemContent }
