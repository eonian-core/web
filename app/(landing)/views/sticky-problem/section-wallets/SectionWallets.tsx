import type { MotionValue } from 'framer-motion'
import { LayoutGroup, motion, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { StickyContainer } from '../components/StickyContainer'
import useDimensionTransform from '../../../../shared/hooks/useDimensionTransform'
import Heading from '../components/Heading'
import CardStack from '../components/CardStack'
import InfoCard from '../../lost-funds/InfoCard'
import { useIsMobileOrSmaller } from '../../../../components/resize-hooks/screens'

interface Props {
  scrollYProgress: MotionValue<number>
}

export default function SectionWallets({ scrollYProgress }: Props) {
  const isMobile = useIsMobileOrSmaller()

  const blockOpacity = useTransform(scrollYProgress, [0, 0.1, 0.935, 1.0], [0, 1, 1, 0])

  const answerRef = useRef(null)
  const answerHeight = useDimensionTransform(answerRef, scrollYProgress, [0.15, 0.2], [0, 'height'])
  const oftenOpacity = useTransform(scrollYProgress, [0.25, 0.3], [0, 1])
  const oftenTranslateX = useTransform(scrollYProgress, [0.25, 0.3], [100, 0])

  const cardStackProgress = useTransform(scrollYProgress, [0.4, 1.0], [0.0, 1.0])
  const cardHeight = useTransform(scrollYProgress, [0.3, 0.4], [0, isMobile ? 230 : 300])
  const cardWidth = useTransform(scrollYProgress, [0.3, 0.4], [0, 550])

  const pRef = useRef(null)
  const pHeight = useDimensionTransform(pRef, scrollYProgress, [0.4, 0.5], [0, 'height'])
  const pMarginTop = useTransform(scrollYProgress, [0.4, 0.5], ['0rem', '1rem'])
  const pOpacity = useTransform(scrollYProgress, [0.5, 0.55, 0.935, 1.0], [0, 1, 1, 0])
  const pOffset = useTransform(scrollYProgress, [0.5, 0.55, 0.935, 1.0], [50, 0, 0, -100])

  return (
    <StickyContainer scrollYProgress={scrollYProgress}>
      <LayoutGroup>
        <motion.div
          layout
          style={{ opacity: blockOpacity }}
          className="flex items-center flex-col desktop:flex-row laptop:p-32 desktop:gap-16 gap-8"
        >
          <div className="flex flex-col max-w-lg">
            <Heading>
              Were crypto wallets hacked?
              <motion.div ref={answerRef} layout style={{ height: answerHeight }} className="overflow-hidden">
                <mark>Yes.</mark>{' '}
                <motion.div className="inline-block" style={{ opacity: oftenOpacity, translateX: oftenTranslateX }}>
                  Pretty Often.
                </motion.div>
              </motion.div>
            </Heading>

            <motion.p
              ref={pRef}
              layout
              style={{ opacity: pOpacity, translateX: pOffset, height: pHeight, marginTop: pMarginTop }}
            >
              Wallets are great. They cannot lock your funds. But they rarely return your money when hacked.
            </motion.p>
          </div>

          <CardStack progress={cardStackProgress} style={{ width: isMobile ? 'auto' : cardWidth, height: cardHeight }}>
            <InfoCard caption="$100M+" href="/" color={0} className="h-full">
              Crypto stolen from wallets through different hacks
            </InfoCard>
            <InfoCard caption="0.17%" href="/" color={1} className="h-full">
              Part of lost assets that crypto wallet providers returned after hacks
            </InfoCard>
          </CardStack>
        </motion.div>
      </LayoutGroup>
    </StickyContainer>
  )
}
