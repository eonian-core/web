'use client';
import { useState, useEffect } from "react";
import { PromiseState, getFromCache, saveToCache } from "./use-fetch-cache";


/** Simple wrapper around promise, that not trigger suspense, usefull for optional requests */
export const usePromise = <T>(promise: Promise<T>) => {
  const [state, setState] = useState<PromiseState<T>>({ isLoading: true })

  useEffect(() => {
    promise.then(
      data => setState({ data, isLoading: false }),
      error => setState({ error, isLoading: false }),
    )
  }, [promise])

  return state
}


/** 
 * Simple fetch hook, that not trigger suspense, will trigger only one reqest per url.
 * Collects all compoenent fetches and trigger real request only once.
 */
export const useFetch = <T>(url: string, fetcher: (url: string) => Promise<T>) => {
  const cached = getFromCache(url)
  if (cached) {
    return cached
  }

  const promise = usePromise(fetcher(url))
  saveToCache(url, promise)
  
  return promise
}

