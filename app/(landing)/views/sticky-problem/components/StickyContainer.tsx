import { type MotionValue, useMotionValueEvent } from 'framer-motion'
import type { CSSProperties } from 'react'
import React from 'react'

interface Props {
  scrollYProgress: MotionValue<number>
}

export function StickyContainer({ children, scrollYProgress }: React.PropsWithChildren<Props>) {
  const [visible, setVisible] = React.useState<boolean>(false)

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setVisible(isInView(value))
  })

  React.useEffect(() => {
    const value = scrollYProgress.get()
    setVisible(isInView(value))
  }, [scrollYProgress])

  const style: CSSProperties = {
    visibility: visible ? 'visible' : 'hidden',
  }

  return (
    <div style={style} className="sticky w-full h-screen top-0 left-0 overflow-hidden flex flex-col justify-center items-center p-6">{children}</div>
  )
}

function isInView(value: number | MotionValue<number>) {
  value = typeof value === 'number' ? value : value.get()
  return value > 0 && value < 1
}
