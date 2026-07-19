import type { ComputedRef } from 'vue'
import type * as datepicker from '@zag-js/date-picker'
import { createPartContext, type PartContext } from './create-part-context'

export type DatePickerApi = ReturnType<typeof datepicker.connect>

const datePickerContext: PartContext<ComputedRef<DatePickerApi>> = createPartContext('DatePicker')
export const provideDatePicker: PartContext<ComputedRef<DatePickerApi>>['provide'] = datePickerContext.provide
export const useDatePicker: PartContext<ComputedRef<DatePickerApi>>['usePart'] = datePickerContext.usePart
