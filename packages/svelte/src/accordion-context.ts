import { getContext, setContext } from 'svelte'
import type * as accordion from '@zag-js/accordion'

type AccordionApi = ReturnType<typeof accordion.connect>
const API_KEY = Symbol('moderno-accordion')
const ITEM_KEY = Symbol('moderno-accordion-item')

export interface AccordionItemCtx {
  value: string
  disabled?: boolean
}

/** Root stores a getter so children read the live $derived api reactively. */
export function setAccordionContext(getApi: () => AccordionApi): void {
  setContext(API_KEY, getApi)
}

export function getAccordionContext(): () => AccordionApi {
  const ctx = getContext<() => AccordionApi>(API_KEY)
  if (!ctx) throw new Error('Moderno: Accordion parts must be used inside <Accordion.Root>')
  return ctx
}

export function setAccordionItemContext(ctx: AccordionItemCtx): void {
  setContext(ITEM_KEY, ctx)
}

export function getAccordionItemContext(): AccordionItemCtx {
  const ctx = getContext<AccordionItemCtx>(ITEM_KEY)
  if (!ctx) throw new Error('Moderno: Accordion item parts must be used inside <Accordion.Item>')
  return ctx
}
