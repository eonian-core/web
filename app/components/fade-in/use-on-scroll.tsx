import type { DependencyList } from 'react'
import { useEffect, useState } from 'react'

export function useOnScrollOnce(callback: () => void, deps: DependencyList) {
  const [isScrolled, setIsScrolled] = useState(false)

  useOnScroll(() => {
    if (!isScrolled) {
      setIsScrolled(true)
      callback()
    }
  }, [isScrolled, setIsScrolled, callback, ...deps])
}

/** Trigger when user scrolling page */
export function useOnScroll(callback: () => void, deps: DependencyList) {
  useEffect(() => {
    window.addEventListener('scroll', callback)

    return () => window.removeEventListener('scroll', callback)
  }, [callback, ...deps])
}
