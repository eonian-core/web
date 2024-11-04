import type { UseInViewOptions } from 'framer-motion'
import { useInView } from 'framer-motion'
import type { MutableRefObject } from 'react'
import { useEffect, useRef, useState } from 'react'
import { analytics } from './analytics'

export interface IsInViewEventOptions {
  'Component Name': string
}

export function useTrackIsInView<T extends Element>(ref: MutableRefObject<T | null>, event: IsInViewEventOptions, options: UseInViewOptions = {}) {
  const isInView = useInView(ref, { once: true, ...options })

  useTrackIsInViewDirectly(isInView, event)
}

/** Expect that isInView will change to true only once */
export function useTrackIsInViewDirectly(isInView: boolean, event?: IsInViewEventOptions) {
  useEffect(() => {
    if (!isInView || !event)
      return

    analytics.track('Element is in view', event)
  }, [isInView])
}
