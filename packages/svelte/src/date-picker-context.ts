import type * as datepicker from '@zag-js/date-picker'
import { createPartContext } from './create-part-context'

export type DatePickerApi = ReturnType<typeof datepicker.connect>

/** Root stores a getter so children read the live $derived api reactively. */
export const { set: setDatePickerContext, get: getDatePickerContext } =
  createPartContext<() => DatePickerApi>('DatePicker')
