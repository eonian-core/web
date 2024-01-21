import { MotionValue, useScroll, useTransform } from 'framer-motion'
import React from 'react'
import RainbowFrame from './components/rainbow-frame'
import styles from './problem.module.scss'

interface ScrollContextState {
  scroll: MotionValue<number>;
  cex: MotionValue<number>;
  wallet: MotionValue<number>;
}

export const ScrollContext = React.createContext<Partial<ScrollContextState>>({ });

export const useScrollContext = () => React.useContext(ScrollContext) as ScrollContextState

export default function Problem({children}: React.PropsWithChildren) {
  const targetRef = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  const cex = useTransform(scrollYProgress, [0, 0.6], [0, 1])
  const wallet = useTransform(scrollYProgress, [0.6, 1], [0, 1])

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
