import type { MotionValue } from 'framer-motion'
import { LayoutGroup, motion, useMotionValue, useTransform } from 'framer-motion'
import { H2 } from '../../../../components/heading/heading'
import { interFont } from '../../../../shared/fonts/Inter'
import InfoCard from '../../lost-funds/InfoCard'
import WorldSVG from '../section-cex/WorldSVG'
import CardStack from '../components/CardStack'
import { StickyContainer } from '../components/StickyContainer'

interface Props {
  scrollYProgress: MotionValue<number>
}

export default function SectionWallets({ scrollYProgress }: Props) {
  const blockOpacity = useTransform(scrollYProgress, [0, 0.1, 0.935, 1.0], [0, 1, 1, 0])
  const headerTranslateX = useTransform(scrollYProgress, [0, 0.1, 0.935, 1.0], [200, 0, 0, -100])

  const answerHeight = useTransform(scrollYProgress, [0.1, 0.15], [0, 52])
  const oftenOpacity = useTransform(scrollYProgress, [0.2, 0.25], [0, 1])
  const ofterTranslateX = useTransform(scrollYProgress, [0.2, 0.25], [100, 0])

  const cardHeight = useMotionValue(300)
  const cardWidth = useTransform(scrollYProgress, [0.3, 0.4], [0, 550])

  const pHeight = useTransform(scrollYProgress, [0.4, 0.5], [0, 48])
  const pMarginTop = useTransform(scrollYProgress, [0.4, 0.5], ['0rem', '1rem'])
  const pOpacity = useTransform(scrollYProgress, [0.5, 0.55, 0.935, 1.0], [0, 1, 1, 0])
  const pOffset = useTransform(scrollYProgress, [0.5, 0.55, 0.935, 1.0], [50, 0, 0, -100])

  const cardStackProgress = useTransform(scrollYProgress, [0.4, 1.0], [0.0, 1.0])

  return (
    <StickyContainer>
      <LayoutGroup>
        <motion.div layout style={{ opacity: blockOpacity }} className="p-32 flex items-center gap-16">
          <div className="flex flex-col max-w-lg">
            <motion.h2 className={`${interFont.className} text-4xl font-bold flex flex-col`} layout style={{ translateX: headerTranslateX }}>
              Were crypto wallets hacked?
              <motion.div layout style={{ height: answerHeight }} className="overflow-hidden">
                <H2 className="inline">Yes.</H2>{' '}
                <motion.div className="inline-block" style={{ opacity: oftenOpacity, translateX: ofterTranslateX }}>Pretty Often.</motion.div>
              </motion.div>
            </motion.h2>

            <motion.p layout style={{ opacity: pOpacity, translateX: pOffset, height: pHeight, marginTop: pMarginTop }}>
              Wallets are great. They cannot lock your funds. But they rarely return your money when hacked.
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
  )
}
