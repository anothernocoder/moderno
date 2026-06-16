import type { InjectionKey, ComputedRef } from 'vue'
import type * as accordion from '@zag-js/accordion'

export type AccordionApi = ReturnType<typeof accordion.connect>
export const AccordionKey: InjectionKey<ComputedRef<AccordionApi>> = Symbol('moderno-accordion')

export interface AccordionItemCtx {
  value: string
  disabled?: boolean
}
export const AccordionItemKey: InjectionKey<AccordionItemCtx> = Symbol('moderno-accordion-item')
