import { useEffect, useState } from 'react'

export function useHideAnimtion(show: boolean, duration: number) {
  const arePeviuslyShowed = usePreviusState(show)
  return useStateDebounce(!show && arePeviuslyShowed, duration)
}

export function usePreviusState(value: boolean) {
  const [previusState, setState] = useState(value)
  useEffect(() => {
    setState(value)
  }, [value])

  return previusState
}

/** When value switches to true, will keep it for given duration time */
export function useStateDebounce(value: boolean, duration: number) {
  const [state, setState] = useState(value)
  useEffect(() => {
    if (value) {
      setState(true)
      return
    }

    const timeout = setTimeout(() => {
      setState(false)
    }, duration)

    return () => clearTimeout(timeout)
  }, [value])

  return state
}
