import { getContext, setContext } from 'svelte'
import type * as select from '@zag-js/select'

type SelectApi = ReturnType<typeof select.connect>
const KEY = Symbol('moderno-select')

export interface SelectItem {
  label: string
  value: string
  disabled?: boolean
}

/** Root stores a getter so children read the live $derived api reactively. */
export function setSelectContext(getApi: () => SelectApi): void {
  setContext(KEY, getApi)
}

export function getSelectContext(): () => SelectApi {
  const ctx = getContext<() => SelectApi>(KEY)
  if (!ctx) throw new Error('Moderno: Select parts must be used inside <Select.Root>')
  return ctx
}
