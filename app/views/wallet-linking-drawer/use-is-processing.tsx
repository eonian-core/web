import type { DependencyList } from 'react'
import { useCallback, useEffect, useState } from 'react'

export function useDelay(time: number, genCallback: () => ((() => void) | undefined), deps: DependencyList) {
  useEffect(() => {
    const callback = genCallback()
    if (!callback)
      return

    const timeout = setTimeout(callback, time)

    return () => clearTimeout(timeout)
  }, [time, deps])
}
