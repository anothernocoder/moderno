import type * as select from '@zag-js/select'
import { createPartContext } from './create-part-context'

type SelectApi = ReturnType<typeof select.connect>

export interface SelectItem {
  label: string
  value: string
  disabled?: boolean
}

/** Root stores a getter so children read the live $derived api reactively. */
export const { set: setSelectContext, get: getSelectContext } = createPartContext<() => SelectApi>('Select')
