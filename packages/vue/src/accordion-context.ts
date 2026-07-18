import type { ComputedRef } from 'vue'
import type * as accordion from '@zag-js/accordion'
import { createPartContext, type PartContext } from './create-part-context'

export type AccordionApi = ReturnType<typeof accordion.connect>

export interface AccordionItemCtx {
  value: string
  disabled?: boolean
}

const accordionContext: PartContext<ComputedRef<AccordionApi>> = createPartContext('Accordion')
export const provideAccordion: PartContext<ComputedRef<AccordionApi>>['provide'] = accordionContext.provide
export const useAccordion: PartContext<ComputedRef<AccordionApi>>['usePart'] = accordionContext.usePart

export const { provide: provideAccordionItem, usePart: useAccordionItem } = createPartContext<AccordionItemCtx>(
  'Accordion',
  'Item',
)
