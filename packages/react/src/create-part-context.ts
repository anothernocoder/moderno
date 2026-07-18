import { createContext, useContext } from 'react'

/**
 * The create/read/throw triad every compositional primitive (ADR-0003) needs
 * for its parts to share state: a context, a hook that reads it, and a
 * descriptive throw when a part renders outside its container.
 */
export function createPartContext<T>(family: string, container = 'Root') {
  const Context = createContext<T | null>(null)

  function usePart(part: string): T {
    const value = useContext(Context)
    if (value == null) {
      throw new Error(`Moderno: <${family}.${part}> must be used inside <${family}.${container}>`)
    }
    return value
  }

  return { Provider: Context.Provider, usePart }
}
