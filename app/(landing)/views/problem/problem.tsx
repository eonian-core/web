import type { MotionValue } from 'framer-motion'
import { useScroll, useTransform } from 'framer-motion'
import React from 'react'
import RainbowFrame from './components/rainbow-frame'
import styles from './problem.module.scss'
import { useIsTabletOrSmaller } from '../../../components/resize-hooks/screens'

interface ScrollContextState {
  scroll: MotionValue<number>
  cex: MotionValue<number>
  wallet: MotionValue<number>
}

export const ScrollContext = React.createContext<Partial<ScrollContextState>>({ })

export const useScrollContext = () => React.useContext(ScrollContext) as ScrollContextState

export default function Problem({ children }: React.PropsWithChildren) {
  const targetRef = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })


  const isTablet = useIsTabletOrSmaller()
  const cex = useTransform(scrollYProgress, !isTablet ? [0, 0.7] : [0, 0.6], [0, 1])
  const wallet = useTransform(scrollYProgress, !isTablet ? [0.7, 1] : [0.6, 0.9], [0, 1])

  /** offset by 0.2 cardStackProgress at the end (some kind of bug) */

  return (
    <section ref={targetRef} className={styles.problem}>
      <RainbowFrame>
        <ScrollContext.Provider value={{
          scroll: scrollYProgress,
          cex,
          wallet,
        }}>
          {children}
        </ScrollContext.Provider>
      </RainbowFrame>
    </section>
  )
}
