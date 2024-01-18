import { useScroll, useTransform } from 'framer-motion'
import React from 'react'
import RainbowFrame from './components/rainbow-frame'
import CEX from './section-cex/section-cex'
import Wallets from './section-wallets/section-wallets'
import styles from './problem.module.scss'

export default function Problem() {
  const targetRef = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  const scrollYProgress_CEX = useTransform(scrollYProgress, [0, 0.7], [0, 1])
  const scrollYProgress_Wallets = useTransform(scrollYProgress, [0.7, 1], [0, 1])

  return (
    <section ref={targetRef} className={styles.problem}>
      <RainbowFrame>
        <CEX scrollYProgress={scrollYProgress_CEX} />
        <Wallets scrollYProgress={scrollYProgress_Wallets} />
      </RainbowFrame>
    </section>
  )
}
