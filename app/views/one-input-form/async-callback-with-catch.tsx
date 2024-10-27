import type { DependencyList } from 'react'
import { useCallback, useState } from 'react'

type AsyncFunction = (...args: any[]) => Promise<any>

export function useAsyncCallbackWithCatch<T extends AsyncFunction>(callback: T, deps: DependencyList): [T, Error | unknown | null] {
  const [error, setError] = useState<Error | unknown | null>(null)

  const wrapperCallback = async (...args: unknown[]) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const result = await callback(...args)
      setError(null)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return result
    }
    catch (err) {
      setError(err)
    }
  }
  const handler = useCallback(wrapperCallback, deps)

  return [handler as T, error] as const
}

type BaseFunction = (...args: any[]) => any

export function useCallbackWithCatch<T extends BaseFunction>(callback: T, deps: DependencyList): [T, Error | unknown | null] {
  const [error, setError] = useState<Error | unknown | null>(null)

  const wrapperCallback = (...args: unknown[]) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const result = callback(...args)
      setError(null)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return result
    }
    catch (err) {
      setError(err)
    }
  }
  const handler = useCallback(wrapperCallback, deps)

  return [handler as unknown as T, error] as const
}
