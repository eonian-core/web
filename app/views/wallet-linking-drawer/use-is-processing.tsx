import type { DependencyList } from 'react'
import { useCallback, useEffect, useState } from 'react'

export function useProcessing<T extends Array<any> = [], R = any>(callback: (...args: T) => Promise<R>, deps: DependencyList): [(...args: T) => Promise<R | undefined>, boolean] {
  const [processing, setIsProcessing] = useState(false)

  const wrappedCallback = useCallback(async (...args: T) => {
    setIsProcessing(true)
    try {
      const result = await callback(...args)
      setIsProcessing(false)

      return result
    }
    catch (error) {
      console.error('Error during processing', error)
      setIsProcessing(false)
    }
  }, deps)

  return [wrappedCallback, processing]
}

export function useDelay(time: number, genCallback: () => ((() => void) | undefined), deps: DependencyList) {
  useEffect(() => {
    const callback = genCallback()
    if (!callback)
      return

    const timeout = setTimeout(callback, time)

    return () => clearTimeout(timeout)
  }, [time, deps])
}
