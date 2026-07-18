import { getContext, setContext } from 'svelte'

/**
 * The setContext/getContext/throw triad every compositional primitive
 * (ADR-0003) needs for its parts to share state: a symbol key, a setter, and
 * a reader that throws a descriptive error when a part renders outside its
 * container.
 */
export function createPartContext<T>(family: string, container = 'Root') {
  const key = Symbol(`moderno-${family.toLowerCase()}-${container.toLowerCase()}`)
  const label = container === 'Root' ? family : `${family} ${container.toLowerCase()}`

  function set(value: T): void {
    setContext(key, value)
  }

  function get(): T {
    const ctx = getContext<T>(key)
    if (!ctx) throw new Error(`Moderno: ${label} parts must be used inside <${family}.${container}>`)
    return ctx
  }

  return { set, get }
}
