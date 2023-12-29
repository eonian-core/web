import type { MotionValue } from 'framer-motion'
import { LayoutGroup, motion, useTransform } from 'framer-motion'
import React, { useRef } from 'react'
import InfoCard from '../../lost-funds/InfoCard'
import CardStack from '../components/CardStack'
import { StickyContainer } from '../components/StickyContainer'
import useDimensionTransform from '../../../../shared/hooks/useDimensionTransform'
import { useIsMobileOrSmaller } from '../../../../components/resize-hooks/screens'
import Heading from '../components/Heading'

interface Props {
  scrollYProgress: MotionValue<number>
}

export default function SectionCEX({ scrollYProgress }: Props) {
  const isMobile = useIsMobileOrSmaller()

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1.0], [0, 1, 1, 0])
  const translate = useTransform(scrollYProgress, [0, 0.1, 0.9, 1.0], [200, 0, 0, -100])

  const cardStackProgress = useTransform(scrollYProgress, [0.2, 1.0], [0.0, 1.0])
  const cardHeight = useTransform(scrollYProgress, [0.1, 0.2], [0, isMobile ? 230 : 300])
  const cardWidth = useTransform(scrollYProgress, [0.1, 0.2], [0, 550])

  const pRef = useRef(null)
  const pHeight = useDimensionTransform(pRef, scrollYProgress, [0.2, 0.3], [0, 'height'])
  const pOpacity = useTransform(scrollYProgress, [0.3, 0.35, 0.9, 1.0], [0, 1, 1, 0])
  const pOffset = useTransform(scrollYProgress, [0.3, 0.35, 0.9, 1.0], [50, 0, 0, -100])
  const pMarginTop = useTransform(scrollYProgress, [0.2, 0.3], ['0rem', '1rem'])

  return (
    <StickyContainer scrollYProgress={scrollYProgress}>
      <LayoutGroup>
        <motion.div
          layout
          style={{ opacity }}
          className="flex items-center flex-col desktop:flex-row laptop:p-32 desktop:gap-16 gap-8"
        >
          <div className="flex flex-col max-w-lg">
            <Heading layout style={{ translateX: translate }}>
              Where’s Your Money <br /> If <mark>Binance</mark> Goes Bankrupt?
            </Heading>

            <motion.p
              layout
              ref={pRef}
              style={{ opacity: pOpacity, translateX: pOffset, maxHeight: pHeight, marginTop: pMarginTop }}
            >
              Crypto Exchanges are great. They sometimes return the money when hacked, but they also can lock you up, go
              bankrupt or out of the country.
            </motion.p>
          </div>

          <CardStack progress={cardStackProgress} style={{ width: isMobile ? 'auto' : cardWidth, height: cardHeight }}>
            <InfoCard caption="$8.9B+" href="/" color={0} className="h-full">
              Lost digital assets due Crypto Exchanges bankruptcies
            </InfoCard>
            <InfoCard caption="5" href="/" color={1} className="h-full">
              Crypto Exchanges exited US
            </InfoCard>
          </CardStack>
        </motion.div>
      </LayoutGroup>
    </StickyContainer>
  )
}
