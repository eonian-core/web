import { useInterval as useMantineInterval } from '@mantine/hooks'
import { useEffect } from 'react'

// of course UseIntervalOptions is not exported by mantine/hooks
export interface UseIntervalOptions {
  /** If set, the interval will start automatically when the component is mounted, `false` by default */
  autoInvoke?: boolean
}

export function useInterval(time: number, fn: () => void, options?: UseIntervalOptions) {
  const interval = useMantineInterval(fn, time, options)

  useEffect(() => {
    interval.start()
    return interval.stop
  }, [interval])
}
