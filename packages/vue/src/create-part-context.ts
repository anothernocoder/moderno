import { inject, provide, type InjectionKey } from 'vue'

export interface PartContext<T> {
  provide(value: T): void
  usePart(part: string): T
}

/**
 * The provide/inject/throw triad every compositional primitive (ADR-0003)
 * needs for its parts to share state: an injection key, a provider, and a
 * reader that throws a descriptive error when a part renders outside its
 * container instead of failing on a stray `undefined`.
 */
export function createPartContext<T>(family: string, container = 'Root'): PartContext<T> {
  const key: InjectionKey<T> = Symbol(`moderno-${family.toLowerCase()}-${container.toLowerCase()}`)

  function providePart(value: T): void {
    provide(key, value)
  }

  function usePart(part: string): T {
    const value = inject(key)
    if (value == null) {
      throw new Error(`Moderno: <${family}.${part}> must be used inside <${family}.${container}>`)
    }
    return value
  }

  return { provide: providePart, usePart }
}
