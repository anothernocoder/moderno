import type * as dialog from '@zag-js/dialog'
import { createPartContext } from './create-part-context'

type SheetApi = ReturnType<typeof dialog.connect>

/** Root stores a getter so children read the live $derived api reactively. */
export const { set: setSheetContext, get: getSheetContext } = createPartContext<() => SheetApi>('Sheet')
