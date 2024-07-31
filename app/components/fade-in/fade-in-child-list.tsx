import type { PropsWithChildren } from 'react'
import React, { Children, useEffect, useState } from 'react'
import { useFadeInListContext } from './fade-in-list'

export function buildFadeInAnitionStyles(isVisble: boolean, duration: number) {
  return {
    transition: `opacity ${duration}s, transform ${duration}s`,
    transform: isVisble ? 'none' : 'translateY(20px)',
    opacity: isVisble ? 1 : 0,
  }
}

export interface FadeInChildListProps extends PropsWithChildren {
  /** The delay before the animation starts, default 0.2s */
  initialDelay?: number
  /** The delay between each child, default 0.05s */
  delay?: number
  /** The duration of the animation, 0.4s */
  duration?: number

  className?: string
}

export default function FadeInChildList({
  duration = 0.4,
  delay = 0.05,
  initialDelay = 0.2,
  children,
  className,
}: FadeInChildListProps) {
  const { isVisible } = useFadeInListContext()
  const delayedIsInView = useDelay(toMs(initialDelay), isVisible)

  const { maxIsVisible } = useAnimation(Children.count(children), delayedIsInView, delay)

  return (
    <>
      {Children.map(children, (child, i) => {
        // fix for rendering li items
        if (!child || child === '\n')
          return

        return (
          <div
            className={className}
            style={buildFadeInAnitionStyles(maxIsVisible > i, duration)}
          >
            {child}
          </div>
        )
      })}
    </>
  )
}

export function toMs(seconds: number) {
  return seconds * 1000
}

/** Add delay between change state */
export function useDelay(delay: number, state: boolean) {
  const [delayedState, setDelayedState] = useState(state)

  useEffect(() => {
    const timeout = setTimeout(() => setDelayedState(state), delay)
    return () => clearTimeout(timeout)
  }, [state, delay])

  return delayedState
}

export function useAnimation(childrenCount: number, isVisible: boolean, delay: number) {
  const [maxIsVisible, setMaxIsVisible] = useState(0)

  useEffect(() => {
    let count = childrenCount
    if (!isVisible) {
      // Animate all children out
      count = 0
    }

    if (count === maxIsVisible) {
      // We're done updating maxVisible
      return
    }

    // Move maxIsVisible toward count
    const increment = count > maxIsVisible ? 1 : -1
    const timeout = setTimeout(() => {
      setMaxIsVisible(maxIsVisible + increment)
    }, toMs(delay))

    return () => clearTimeout(timeout)
  }, [childrenCount, delay, maxIsVisible, isVisible])

  return { maxIsVisible }
}
