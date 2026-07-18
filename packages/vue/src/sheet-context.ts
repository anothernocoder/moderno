import type { ComputedRef } from 'vue'
import type * as dialog from '@zag-js/dialog'
import { createPartContext, type PartContext } from './create-part-context'

export type SheetApi = ReturnType<typeof dialog.connect>

const sheetContext: PartContext<ComputedRef<SheetApi>> = createPartContext('Sheet')
export const provideSheet: PartContext<ComputedRef<SheetApi>>['provide'] = sheetContext.provide
export const useSheet: PartContext<ComputedRef<SheetApi>>['usePart'] = sheetContext.usePart
