'use client'

import { useRef, useState } from 'react'
import { LayoutGroup, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { H2 } from '../../../components/heading/heading'
import { interFont } from '../../../shared/fonts/Inter'
import styles from './LostFunds.module.scss'
import InfoCard from './InfoCard'

export default function LostFunds() {
  const containerRef = useRef(null)
  const [showCard, setShowCard] = useState(true)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end end'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])
  const translate = useTransform(scrollYProgress, [0, 0.1], [200, 0])

  const cardHeight = useTransform(scrollYProgress, [0.1, 0.2], [0, 300])
  const cardWidth = useTransform(scrollYProgress, [0.1, 0.2], [0, 550])
  const cardOpacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1])
  const cardOffset = useTransform(scrollYProgress, [0.2, 0.3], [100, 0])

  const pHeight = useTransform(scrollYProgress, [0.2, 0.3], [0, 48])
  const pOpacity = useTransform(scrollYProgress, [0.3, 0.35], [0, 1])
  const pOffset = useTransform(scrollYProgress, [0.3, 0.35], [50, 0])

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    // eslint-disable-next-line no-console
    console.log('Page scroll: ', latest)
  })

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.sticky}>
        <LayoutGroup>
          <motion.div className={`${styles.innerContainer}`} layout style={{ opacity }}>
            <div className="p-32 flex items-center bg-default-400 gap-16">

              <div className="flex flex-col max-w-lg gap-4">
                <motion.h2 className={`${interFont.className} text-4xl font-bold`} layout style={{ translateX: translate }}>
                  Where’s Your Money <br />{' '}
                  <span className="text-foreground">
                    If <H2 className="inline">Binance</H2> Goes Bankrupt?
                  </span>
                </motion.h2>

                <motion.p layout style={{ opacity: pOpacity, translateX: pOffset, height: pHeight }}>
                  Crypto Exchanges are great. They sometimes return the money
                  when hacked, but they also can lock you up, go bankrupt
                  or out of the country.
                </motion.p>
              </div>

              {showCard && (
                <InfoCard
                  caption="$8.9B+"
                  href="/"
                  color={0}
                  style={{ width: cardWidth, height: cardHeight, opacity: cardOpacity, translateY: cardOffset }}
                >
                  Lost digital assets due Crypto Exchanges bankruptcies
                </InfoCard>
              )}
            </div>
          </motion.div>
        </LayoutGroup>
      </div>
    </div>
  )
}
