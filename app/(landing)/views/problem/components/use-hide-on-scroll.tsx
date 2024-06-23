import type { MotionValue } from 'framer-motion'
import { useMotionValueEvent } from 'framer-motion'
import React from 'react'

export function useSwitchOnScroll(scrollYProgress: MotionValue<number>, onValue = 1, maintainEndState = false) {
  const [isVisible, setVisible] = React.useState<boolean>(true)

  const updateState = React.useCallback((value: number) => {
    if (value >= onValue) {
      setVisible(false)
      return
    }

    if (!maintainEndState)
      setVisible(true)
  }, [setVisible, onValue, maintainEndState])

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    updateState(value)
  })

  React.useEffect(() => {
    updateState(scrollYProgress.get())
  }, [scrollYProgress, updateState])

  return { isVisible }
}
