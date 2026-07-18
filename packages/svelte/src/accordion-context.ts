import type * as accordion from '@zag-js/accordion'
import { createPartContext } from './create-part-context'

type AccordionApi = ReturnType<typeof accordion.connect>

export interface AccordionItemCtx {
  value: string
  disabled?: boolean
}

/** Root stores a getter so children read the live $derived api reactively. */
export const { set: setAccordionContext, get: getAccordionContext } = createPartContext<() => AccordionApi>('Accordion')

export const { set: setAccordionItemContext, get: getAccordionItemContext } = createPartContext<AccordionItemCtx>(
  'Accordion',
  'Item',
)
