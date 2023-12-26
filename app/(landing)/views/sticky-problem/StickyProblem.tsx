import { useScroll, useTransform } from 'framer-motion'
import React from 'react'
import RainbowFrame from './components/RainbowFrame'
import CEX from './section-cex/SectionCEX'
import But from './section-but/SectionBut'
import Wallets from './section-wallets/SectionWallets'

const CEX_PROGRESS_FRAME = [0.0, 0.35]
const BUT_PROGRESS_FRAME = [0.35, 0.45]
const WALLETS_PROGRESS_FRAME = [0.45, 1.0]

export default function StickyProblem() {
  const targetRef = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start center', 'end end'],
  })

  const scrollYProgress_CEX = useTransform(scrollYProgress, CEX_PROGRESS_FRAME, [0, 1])
  const scrollYProgress_But = useTransform(scrollYProgress, BUT_PROGRESS_FRAME, [0, 1])
  const scrollYProgress_Wallets = useTransform(scrollYProgress, WALLETS_PROGRESS_FRAME, [0, 1])

  return (
    <section ref={targetRef} className="w-full h-[500vh]">
      <RainbowFrame scrollYProgress={scrollYProgress} />

      <CEX scrollYProgress={scrollYProgress_CEX} />
      <But scrollYProgress={scrollYProgress_But} />
      <Wallets scrollYProgress={scrollYProgress_Wallets} />

    </section>
  )
}
