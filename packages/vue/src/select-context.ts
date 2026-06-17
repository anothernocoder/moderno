import type { InjectionKey, ComputedRef } from 'vue'
import type * as select from '@zag-js/select'

export type SelectApi = ReturnType<typeof select.connect>
export const SelectKey: InjectionKey<ComputedRef<SelectApi>> = Symbol('moderno-select')

export interface SelectItem {
  label: string
  value: string
  disabled?: boolean
}
