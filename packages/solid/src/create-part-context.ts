import { createContext, useContext, type Accessor } from 'solid-js'

/**
 * The create/read/throw triad every compositional primitive (ADR-0003) needs
 * for its parts to share state: a context, a hook that reads it, and a
 * descriptive throw when a part renders outside its container.
 */
export function createPartContext<T>(family: string, container = 'Root') {
  const Context = createContext<Accessor<T>>()

  function usePart(part: string): Accessor<T> {
    const value = useContext(Context)
    if (!value) {
      throw new Error(`Moderno: <${family}.${part}> must be used inside <${family}.${container}>`)
    }
    return value
  }

  return { Provider: Context.Provider, usePart }
}
