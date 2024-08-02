'use client'
import { useEffect, useState } from 'react'

export interface PromiseState<T> {
  data?: T
  isLoading: boolean
  error?: Error
}

/** Simple wrapper around promise, that not trigger suspense, usefull for optional requests */
export function usePromise<T>(invoker: () => Promise<T>, deps: Array<any>) {
  const [state, setState] = useState<PromiseState<T>>({ isLoading: true })

  useEffect(() => {
    invoker().then(
      data => setState({ data, isLoading: false }),
      error => setState({ error, isLoading: false }),
    )
  }, deps) // avoid inoking again on function change

  return state
}
