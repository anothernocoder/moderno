import type { ComputedRef } from 'vue'
import type * as select from '@zag-js/select'
import { createPartContext, type PartContext } from './create-part-context'

export type SelectApi = ReturnType<typeof select.connect>

export interface SelectItem {
  label: string
  value: string
  disabled?: boolean
}

const selectContext: PartContext<ComputedRef<SelectApi>> = createPartContext('Select')
export const provideSelect: PartContext<ComputedRef<SelectApi>>['provide'] = selectContext.provide
export const useSelect: PartContext<ComputedRef<SelectApi>>['usePart'] = selectContext.usePart
