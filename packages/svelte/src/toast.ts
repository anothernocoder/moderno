import * as toast from '@zag-js/toast'

export type ToastOptions = toast.Options
export type Toaster = toast.Store

/** Create a toaster store: hold it in module scope and call `.create()` from anywhere. */
export function createToaster(options?: toast.StoreProps): Toaster {
  return toast.createStore(options)
}
