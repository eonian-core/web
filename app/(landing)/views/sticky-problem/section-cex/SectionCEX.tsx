import type { MotionValue } from 'framer-motion'
import { LayoutGroup, motion, useScroll, useTransform } from 'framer-motion'
import React from 'react'
import { H2 } from '../../../../components/heading/heading'
import { interFont } from '../../../../shared/fonts/Inter'
import InfoCard from '../../lost-funds/InfoCard'
import CardStack from '../components/CardStack'
import { StickyContainer } from '../components/StickyContainer'
import WorldSVG from './WorldSVG'

interface Props {
  scrollYProgress: MotionValue<number>
}

export default function SectionCEX({ scrollYProgress }: Props) {
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1.0], [0, 1, 1, 0])
  const translate = useTransform(scrollYProgress, [0, 0.1, 0.9, 1.0], [200, 0, 0, -100])

  const cardHeight = useTransform(scrollYProgress, [0.1, 0.2], [0, 300])
  const cardWidth = useTransform(scrollYProgress, [0.1, 0.2], [0, 550])

  const pHeight = useTransform(scrollYProgress, [0.2, 0.3], [0, 48])
  const pOpacity = useTransform(scrollYProgress, [0.3, 0.35, 0.9, 1.0], [0, 1, 1, 0])
  const pOffset = useTransform(scrollYProgress, [0.3, 0.35, 0.9, 1.0], [50, 0, 0, -100])
  const pMarginTop = useTransform(scrollYProgress, [0.2, 0.3], ['0rem', '1rem'])

  const cardStackProgress = useTransform(scrollYProgress, [0.2, 1.0], [0.0, 1.0])

  const mapScale = useTransform(scrollYProgress, [0.6, 0.8, 0.9, 1.0], [4, 1, 1, 4])
  const mapOpacity = useTransform(scrollYProgress, [0.6, 0.8, 0.9, 1.0], [0, 0.75, 0.75, 0])

  return (
    <>
      <WorldSVG
        className="fixed w-[90vw] top-1/2 left-1/2 opacity-50 select-none pointer-events-none"
        style={{ scale: mapScale, opacity: mapOpacity, translateY: '-50%', translateX: '-50%' }}
      />
      <StickyContainer>
        <LayoutGroup>
          <motion.div layout style={{ opacity }} className="p-32 flex items-center gap-16">
            <div className="flex flex-col max-w-lg">
              <motion.h2
                className={`${interFont.className} text-4xl font-bold`}
                layout
                style={{ translateX: translate }}
              >
                Where’s Your Money <br />{' '}
                <span className="text-foreground">
                  If <H2 className="inline">Binance</H2> Goes Bankrupt?
                </span>
              </motion.h2>

              <motion.p
                layout
                style={{ opacity: pOpacity, translateX: pOffset, height: pHeight, marginTop: pMarginTop }}
              >
                Crypto Exchanges are great. They sometimes return the money when hacked, but they also can lock you up,
                go bankrupt or out of the country.
              </motion.p>
            </div>

            <CardStack progress={cardStackProgress} style={{ width: cardWidth, height: cardHeight }}>
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
    </>
  )
}
