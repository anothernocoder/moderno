import { createContext, useContext, createMemo, createUniqueId, type JSX } from 'solid-js'
import * as accordion from '@zag-js/accordion'
import { useMachine, normalizeProps } from '@zag-js/solid'

type AccordionApi = ReturnType<typeof accordion.connect>
const AccordionContext = createContext<() => AccordionApi>()

interface ItemCtx {
  value: string
  disabled?: boolean
}
const ItemContext = createContext<() => ItemCtx>()

function useAccordion(part: string): () => AccordionApi {
  const api = useContext(AccordionContext)
  if (!api) throw new Error(`Moderno: <Accordion.${part}> must be used inside <Accordion.Root>`)
  return api
}

function useItem(part: string): () => ItemCtx {
  const ctx = useContext(ItemContext)
  if (!ctx) throw new Error(`Moderno: <Accordion.${part}> must be used inside <Accordion.Item>`)
  return ctx
}

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
    <AccordionContext.Provider value={api}>
      <div {...api().getRootProps()} class="md-accordion">
        {props.children}
      </div>
    </AccordionContext.Provider>
  )
}

function Item(props: { value: string; disabled?: boolean; children: JSX.Element }) {
  const api = useAccordion('Item')
  const item = () => ({ value: props.value, disabled: props.disabled })
  return (
    <ItemContext.Provider value={item}>
      <div {...api().getItemProps(item())} class="md-accordion-item">
        {props.children}
      </div>
    </ItemContext.Provider>
  )
}

function ItemTrigger(props: { children: JSX.Element }) {
  const api = useAccordion('ItemTrigger')
  const item = useItem('ItemTrigger')
  return (
    <h3 class="md-accordion-heading">
      <button {...api().getItemTriggerProps(item())} class="md-accordion-trigger">
        <span class="md-accordion-trigger-text">{props.children}</span>
        <span {...api().getItemIndicatorProps(item())} class="md-accordion-indicator" aria-hidden="true">
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
    <div {...api().getItemContentProps(item())} class="md-accordion-content">
      {props.children}
    </div>
  )
}

/** Compositional Accordion (ADR-0003): parts share one Zag machine via Solid context. */
export const Accordion = { Root, Item, ItemTrigger, ItemContent }
